const fs = require('fs');
const path = require('path');
const https = require('https');

const ROOT = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const DATA_FILE = path.join(ROOT, 'gold-data.json');
const SITEMAP_FILE = path.join(ROOT, 'sitemap.xml');

const GOLDAPI_KEY = process.env.GOLDAPI_KEY;
const MOCK_MODE = process.argv.includes('--mock');
const FORCE_FAIL_GOLD = process.argv.includes('--force-fail-gold');
const FORCE_FAIL_FX = process.argv.includes('--force-fail-fx');

function httpGetJson(urlStr, headers) {
  return new Promise((resolve, reject) => {
    const url = new URL(urlStr);
    const req = https.request(url, { headers: headers || {} }, (res) => {
      let body = '';
      res.on('data', (chunk) => { body += chunk; });
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`${urlStr} returned HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
          return;
        }
        try {
          resolve(JSON.parse(body));
        } catch (e) {
          reject(new Error(`Failed to parse response from ${urlStr}: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

function fetchGoldSpot() {
  if (FORCE_FAIL_GOLD) return Promise.reject(new Error('forced failure (--force-fail-gold test)'));
  if (MOCK_MODE) {
    return Promise.resolve({
      timestamp: Math.floor(Date.now() / 1000),
      metal: 'XAU', currency: 'GBP', price: 2380.5,
      price_gram_24k: 76.52, price_gram_22k: 70.16, price_gram_21k: 66.96,
      price_gram_20k: 63.77, price_gram_18k: 57.39, price_gram_16k: 51.01,
      price_gram_14k: 44.77, price_gram_10k: 31.93,
    });
  }
  if (!GOLDAPI_KEY) return Promise.reject(new Error('GOLDAPI_KEY env var not set'));
  return httpGetJson(CONFIG.spotApiEndpoint, { 'x-access-token': GOLDAPI_KEY });
}

function fetchFxRate() {
  if (FORCE_FAIL_FX) return Promise.reject(new Error('forced failure (--force-fail-fx test)'));
  if (MOCK_MODE) return Promise.resolve({ amount: 1, base: 'GBP', date: '2026-07-06', rates: { USD: 1.27 } });
  return httpGetJson(CONFIG.fxApi.endpoint);
}

function computeUsdPrices(goldApiResponse, fxRate) {
  const pricePerGram = {};
  const cashPricePerGram = {};
  for (const [key, purity] of Object.entries(CONFIG.purities)) {
    const gbpGramPrice = purity.apiField && goldApiResponse[purity.apiField] != null
      ? goldApiResponse[purity.apiField]
      : (goldApiResponse.price_gram_24k * purity.fraction);
    const usdGramPrice = gbpGramPrice * fxRate;
    pricePerGram[key] = Number(usdGramPrice.toFixed(2));
    cashPricePerGram[key] = Number((usdGramPrice * CONFIG.dealerDiscountFactor).toFixed(2));
  }
  return { pricePerGram, cashPricePerGram };
}

function injectIntoPage(filePath, data) {
  if (!fs.existsSync(filePath)) {
    console.warn(`  ⚠ skipped (not generated yet): ${filePath}`);
    return;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  const marker = /<!-- START_PRICE_DATA -->[\s\S]*?<!-- END_PRICE_DATA -->/;
  const block = `<!-- START_PRICE_DATA -->\n<script>window.GOLD_DATA = ${JSON.stringify(data)};</script>\n<!-- END_PRICE_DATA -->`;
  if (!marker.test(html)) {
    console.warn(`  ⚠ no price-data markers found in: ${filePath}`);
    return;
  }
  fs.writeFileSync(filePath, html.replace(marker, block));
  console.log(`  ✓ injected: ${filePath}`);
}

function updateSitemapLastmod(todayISO) {
  if (!fs.existsSync(SITEMAP_FILE)) return;
  let xml = fs.readFileSync(SITEMAP_FILE, 'utf8');
  xml = xml.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${todayISO}</lastmod>`);
  fs.writeFileSync(SITEMAP_FILE, xml);
  console.log(`  ✓ sitemap.xml lastmod → ${todayISO}`);
}

async function main() {
  console.log(`🪙 Gold Price Per Gram USA — update-data.js`);
  const previous = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

  // Two independent upstream calls: gold spot (goldapi.io, GBP) and FX rate (frankfurter.dev, GBP->USD).
  // Each can fail independently, so track them separately rather than treating the whole run as one unit.
  let goldApiResponse = null;
  let goldError = null;
  try {
    goldApiResponse = await fetchGoldSpot();
    console.log(`  ✓ gold spot fetch OK — 24k = £${goldApiResponse.price_gram_24k}/g`);
  } catch (err) {
    goldError = err;
    console.error(`  ✗ gold spot fetch failed: ${err.message}`);
  }

  let fxRate = null;
  let fxError = null;
  try {
    const fxResponse = await fetchFxRate();
    fxRate = fxResponse.rates && fxResponse.rates.USD;
    if (fxRate == null) throw new Error('frankfurter.dev response missing rates.USD');
    console.log(`  ✓ FX fetch OK — 1 GBP = ${fxRate} USD`);
  } catch (err) {
    fxError = err;
    console.error(`  ✗ FX fetch failed: ${err.message}`);
  }

  const goldOk = !goldError;
  const fxOk = !fxError;
  let data;

  if (goldOk && fxOk) {
    const { pricePerGram, cashPricePerGram } = computeUsdPrices(goldApiResponse, fxRate);
    data = {
      lastUpdated: new Date().toISOString(),
      fxLastUpdated: new Date().toISOString(),
      isFallback: false,
      fallbackComponent: null,
      spotPricePerOzGBP: goldApiResponse.price,
      fxRateGBPtoUSD: fxRate,
      pricePerGram,
      cashPricePerGram,
      note: null,
    };
  } else if (goldOk && !fxOk && previous.fxRateGBPtoUSD != null) {
    // Gold price is fresh but FX rate is stale — recompute USD prices with the last known FX rate.
    const { pricePerGram, cashPricePerGram } = computeUsdPrices(goldApiResponse, previous.fxRateGBPtoUSD);
    data = {
      lastUpdated: new Date().toISOString(),
      fxLastUpdated: previous.fxLastUpdated,
      isFallback: true,
      fallbackComponent: 'fx',
      spotPricePerOzGBP: goldApiResponse.price,
      fxRateGBPtoUSD: previous.fxRateGBPtoUSD,
      pricePerGram,
      cashPricePerGram,
      note: `Fallback: FX rate fetch failed (${fxError.message}), using last known GBP→USD rate from ${previous.fxLastUpdated}.`,
    };
  } else if (!goldOk && fxOk && previous.spotPricePerOzGBP != null) {
    // FX rate is fresh but gold price is stale — re-scale previous USD prices by the new FX rate relative to the old one.
    const scale = fxRate / previous.fxRateGBPtoUSD;
    const pricePerGram = {};
    const cashPricePerGram = {};
    for (const key of Object.keys(CONFIG.purities)) {
      pricePerGram[key] = Number((previous.pricePerGram[key] * scale).toFixed(2));
      cashPricePerGram[key] = Number((previous.cashPricePerGram[key] * scale).toFixed(2));
    }
    data = {
      lastUpdated: previous.lastUpdated,
      fxLastUpdated: new Date().toISOString(),
      isFallback: true,
      fallbackComponent: 'gold',
      spotPricePerOzGBP: previous.spotPricePerOzGBP,
      fxRateGBPtoUSD: fxRate,
      pricePerGram,
      cashPricePerGram,
      note: `Fallback: gold spot fetch failed (${goldError.message}), using last known GBP spot from ${previous.lastUpdated} with today's FX rate.`,
    };
  } else if (previous.pricePerGram && previous.pricePerGram['24k'] != null) {
    // Both failed — keep everything as-is from last successful run.
    data = {
      ...previous,
      isFallback: true,
      fallbackComponent: 'both',
      note: `Fallback: both gold spot (${goldError ? goldError.message : 'ok'}) and FX rate (${fxError ? fxError.message : 'ok'}) fetches failed — showing last known values from ${previous.lastUpdated}.`,
    };
  } else {
    console.error('  ✗ both fetches failed and no previous cached data available — aborting without touching pages.');
    process.exit(1);
  }

  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

  console.log('Injecting into pages:');
  for (const page of CONFIG.pages) {
    injectIntoPage(path.join(ROOT, page.file), data);
  }

  updateSitemapLastmod(data.lastUpdated ? data.lastUpdated.slice(0, 10) : new Date().toISOString().slice(0, 10));

  console.log('Done.');
}

main();
