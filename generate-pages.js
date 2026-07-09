const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const CONFIG = JSON.parse(fs.readFileSync(path.join(ROOT, 'site.config.json'), 'utf8'));
const SITE_URL = CONFIG.siteUrl;
const UK_URL = CONFIG.sisterSiteUrl;

const KARAT_KEYS = ['24k', '22k', '18k', '14k', '10k'];

// hreflang counterpart on the UK site — only for karats that genuinely exist on both sites.
// 10k has no UK equivalent (UK's low end is 9ct, a different purity), so it gets no hreflang pair.
const UK_HREFLANG_PATH = {
  '24k': '24-carat-gold-price-per-gram-uk',
  '22k': '22-carat-gold-price-per-gram-uk',
  '18k': '18-carat-gold-price-per-gram-uk',
  '14k': '14k-gold-price-per-gram-uk',
};

// Per-page content — each karat has a genuinely distinct US-market angle, not a translated UK page.
const KARATS = {
  '24k': {
    slug: '24k-gold-price-per-gram',
    label: '24K', hallmark: '24K',
    title: '24K Gold Price Per Gram Today — Live Calculator',
    metaDesc: 'Live 24K gold price per gram today, updated 3x daily. Pure investment-grade gold, stamped 24K — calculator in USD.',
    keywords: '24k gold price per gram, 24 karat gold price per gram, pure gold price per gram',
    h1: '24K Gold Price Per Gram Today',
    intro: 'The gold price per gram today for 24K — the purest form, stamped 24K — is the closest figure to the raw international spot price, with no purity discount applied. This is the rate used for gold bullion, American Gold Eagle and Buffalo coins.',
    angleTitle: 'Why 24K Gold Is for Investment, Not Jewelry',
    angleBody: 'At 99.9% pure, 24K gold is too soft for everyday jewelry — it scratches and bends easily, which is why rings and bracelets are almost always a lower karat alloyed with other metals. 24K gold is instead the standard for investment products: American Gold Eagle and Buffalo coins, bullion bars, and gold certificates. If you\'re pricing an investment coin or bar rather than a piece of jewelry, this is the karat you want.',
    faq: [
      { q: 'Why is 24K gold too soft for jewelry?', a: '24K gold is 99.9% pure with almost no alloy metals to add hardness, so rings and bracelets made from it deform and scratch easily. Jewelry is usually made from 22K, 18K, 14K or 10K gold instead, which is alloyed with metals like copper and silver for strength.' },
      { q: 'What US coins are made of 24K gold?', a: 'The American Gold Buffalo is 24K (.9999 fine). The American Gold Eagle, despite being widely called "24K" in casual use, is actually 22K (.9167) alloyed for durability — check the coin\'s specification before assuming purity.' },
    ],
  },
  '22k': {
    slug: '22k-gold-price-per-gram',
    label: '22K', hallmark: '22K',
    title: '22K Gold Price Per Gram Today — Live Calculator',
    metaDesc: 'Live 22K gold price per gram today, updated 3x daily. The standard for South Asian and Middle Eastern-American wedding jewelry — calculator in USD.',
    keywords: '22k gold price per gram, 22 karat gold price per gram',
    h1: '22K Gold Price Per Gram Today',
    intro: 'The gold price per gram today for 22K is the benchmark most often quoted for South Asian and Middle Eastern-American bridal and wedding jewelry, valued for its rich color and high gold content.',
    angleTitle: '22K Gold in Wedding & Bridal Jewelry',
    angleBody: '22K gold is the traditional standard for South Asian and Middle Eastern-American wedding jewelry — bridal sets, dowry pieces and festival gold in immigrant and diaspora communities across the US are almost always this karat, prized for its rich yellow color and high gold content while still being workable enough for intricate designs. Many US jewelers serving these communities stock 22K specifically alongside the more typical American 14K/10K lines.',
    faq: [
      { q: 'Is 22K gold common in the US?', a: 'Less common as a mainstream US retail standard (which favors 14K and 10K), but widely stocked by jewelers serving South Asian and Middle Eastern-American communities, where 22K is the traditional wedding and bridal jewelry karat.' },
      { q: 'Why is 22K gold popular for wedding jewelry?', a: 'It balances a high gold content (and rich yellow color) with enough alloy strength to hold intricate bridal designs, making it the traditional standard for South Asian and Middle Eastern wedding and dowry jewelry.' },
    ],
  },
  '18k': {
    slug: '18k-gold-price-per-gram',
    label: '18K', hallmark: '18K',
    title: '18K Gold Price Per Gram Today — Live Calculator',
    metaDesc: 'Live 18K gold price per gram today, updated 3x daily. The standard for engagement rings and fine jewelry in the US — calculator in USD.',
    keywords: '18k gold price per gram, 18 karat gold price per gram',
    h1: '18K Gold Price Per Gram Today',
    intro: 'The gold price per gram today for 18K is the karat most US fine jewelers use for engagement rings — a balance of rich gold color and everyday durability.',
    angleTitle: '18K Gold in Engagement Rings & Fine Jewelry',
    angleBody: '18K gold is 75% pure gold alloyed with metals like copper, silver or palladium — strong enough for a ring worn daily, while keeping noticeably more gold color and value than 14K or 10K. US fine jewelers commonly recommend 18K for engagement and wedding rings set with diamonds or other stones, since it holds prong settings securely without excessive wear over years of daily wear.',
    faq: [
      { q: 'Is 18K gold better than 14K for a ring in the US?', a: 'Neither is objectively "better" — 18K has more gold and color but is softer, while 14K is more scratch-resistant, cheaper, and the more common US default. 18K is preferred for fine jewelry and engagement rings with stone settings; 14K suits everyday, budget-conscious pieces.' },
      { q: 'Is 18K gold common in US jewelry stores?', a: 'Yes, though less dominant than 14K — most US fine jewelry and bridal collections offer 18K as a premium option alongside the more standard 14K line.' },
    ],
  },
  '14k': {
    slug: '14k-gold-price-per-gram',
    label: '14K', hallmark: '14K',
    title: '14K Gold Price Per Gram Today — Live Calculator',
    metaDesc: 'Live 14K gold price per gram today, updated 3x daily. America\'s most common jewelry karat — calculator in USD.',
    keywords: '14k gold price per gram, 14 karat gold price per gram',
    h1: '14K Gold Price Per Gram Today',
    intro: 'The gold price per gram today for 14K matters most to US shoppers — it\'s by far the most common gold karat sold in American jewelry stores, valued for being durable and affordable.',
    angleTitle: '14K Gold — America\'s Everyday Jewelry Standard',
    angleBody: '14K gold (58.5% pure) is the dominant purity in US jewelry — chains, rings, earrings and watches from most American retailers are 14K unless stated otherwise, since it balances a reasonable gold content with strong scratch and wear resistance for daily use. This is the US equivalent role that 9ct plays in the UK market, though at a meaningfully higher purity (58.5% vs 37.5%).',
    faq: [
      { q: 'Why is most US jewelry 14K gold?', a: '14K balances a reasonable gold content with strong durability for daily wear, at a lower cost than 18K or 22K — making it the default purity stamped on the majority of US-made chains, rings and earrings.' },
      { q: 'Is 14K gold the same purity as UK 9ct gold?', a: 'No — they play a similar "everyday" market role but are different purities. 14K is 58.5% pure gold; UK\'s 9ct is only 37.5% pure. If you\'re comparing a US 14K price to a UK price, use our 9ct-equivalent figure with care, or check our sister site\'s <a href="https://goldpricepergram.co.uk/9ct-gold-price-per-gram-uk/">9ct page</a> for the true UK low-end purity.' },
    ],
  },
  '10k': {
    slug: '10k-gold-price-per-gram',
    label: '10K', hallmark: '10K',
    title: '10K Gold Price Per Gram Today — Live Calculator',
    metaDesc: 'Live 10K gold price per gram today, updated 3x daily. The lowest karat still sold as gold in most US states — calculator in USD.',
    keywords: '10k gold price per gram, 10 karat gold price per gram',
    h1: '10K Gold Price Per Gram Today',
    intro: 'The gold price per gram today for 10K matters if you\'re pricing budget jewelry or checking an older US piece — 10K (41.7% pure) is the lowest karat that can still legally be sold and stamped as "gold" in most US states.',
    angleTitle: '10K Gold — The US Legal Minimum',
    angleBody: '10K gold is only 41.7% pure gold, alloyed heavily with copper, silver and other metals — the legal minimum purity that can still be stamped and sold as "gold" in most US states (some states set the bar even lower, but 10K is the common floor in practice). That lower gold content makes it the most affordable and scratch-resistant option, which is why it shows up on the cheapest end of chain and class-ring jewelry. This plays a similar market role to the UK\'s 9ct gold, but at a genuinely different purity (41.7% vs 37.5%) — not the same karat under a different name.',
    faq: [
      { q: 'What does 10K mean on gold jewelry?', a: '10K means the item is 41.7% pure gold by weight — the standard stamp for 10K gold, the lowest purity commonly recognized as "gold" for retail sale in most US states.' },
      { q: 'Is 10K gold the same as UK 9ct gold?', a: 'No. They serve a similar role as each market\'s lowest common purity, but 10K is 41.7% pure gold while UK\'s 9ct is 37.5% pure — a genuinely different purity, not a renamed equivalent. Compare using each site\'s own figure rather than treating them as interchangeable.' },
    ],
  },
};

const CASH_PAGE = {
  slug: 'cash-for-gold-price-per-gram',
  title: 'Cash for Gold Price Per Gram Today — Selling Calculator',
  metaDesc: 'Estimate what cash-for-gold buyers and pawn shops pay per gram today. Live spot-based calculator with an adjustable buyer discount — in USD.',
  keywords: 'cash for gold price per gram, sell gold price per gram, cash for gold calculator',
  h1: 'Cash for Gold Price Per Gram Today',
  intro: 'If you\'re looking for cash for gold — selling broken chains, mismatched earrings or old jewelry to a pawn shop or gold buyer — the figure you need isn\'t the raw spot price. Buyers pay a discount to cover refining, testing and their margin. This page estimates that price by karat.',
  angleTitle: 'Why Cash-for-Gold Offers Are Below the Spot Price',
  angleBody: 'When you sell gold for cash, a pawn shop or gold buyer isn\'t paying the live spot rate — they\'re paying spot minus a margin that covers refining costs, testing, and their own profit. This calculator applies an adjustable estimate factor to the live per-gram price by karat, clearly labeled as an <strong>estimate, not a quote</strong> — actual buyer offers vary by karat, weight sold, and which buyer you use. Always get a second quote before selling, and ask whether the buyer tests purity in front of you.',
  faq: [
    { q: 'Will I get the full spot price for cash for gold?', a: 'No. Pawn shops and gold buyers pay below the live spot price to cover refining costs and their margin. The exact discount varies by buyer, karat and the weight you\'re selling — this calculator shows an adjustable estimate, not a guaranteed quote.' },
    { q: 'How can I get the best price when selling gold for cash?', a: 'Get quotes from at least two or three buyers (pawn shops, jewelers, and dedicated gold-buying services), ask them to test purity in front of you, and sell items separated by karat rather than as a mixed lot, since mixed-karat gold is often valued at the lowest karat present.' },
    { q: 'Do pawn shops and gold-buying services pay differently?', a: 'Often yes — dedicated gold-buying services and refiners sometimes pay closer to spot than a general pawn shop, since gold is their core business rather than a side category. Comparing at least one of each type before selling is worthwhile.' },
  ],
};

const METHODOLOGY_PAGE = {
  slug: 'methodology',
  title: 'Methodology — How Gold Price Per Gram (USD) Is Calculated',
  metaDesc: 'How usgoldpricepergram.com calculates its live gold price per gram in USD: data sources, FX conversion, update frequency, and a live worked example.',
  h1: 'Methodology',
};

function relatedKaratLinks(excludeKey) {
  return KARAT_KEYS.filter(k => k !== excludeKey).map(k => {
    const c = KARATS[k];
    return `<a class="link-card" href="/${c.slug}/"><div class="t">${c.label} Gold</div><div class="sub">Stamped ${c.hallmark}</div></a>`;
  }).join('\n    ');
}

function hreflangTags(karatKey) {
  const ukPath = karatKey ? UK_HREFLANG_PATH[karatKey] : '';
  if (karatKey && !ukPath) return ''; // no UK counterpart (e.g. 10k) — no hreflang pair
  const usPath = karatKey ? KARATS[karatKey].slug + '/' : '';
  const ukHref = ukPath ? `${UK_URL}/${ukPath}/` : `${UK_URL}/`;
  const usHref = `${SITE_URL}/${usPath}`;
  return `<link rel="alternate" hreflang="en-US" href="${usHref}">
<link rel="alternate" hreflang="en-GB" href="${ukHref}">`;
}

function headBoilerplate(page, karatKey) {
  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${page.title}</title>
<meta name="description" content="${page.metaDesc}">
${page.keywords ? `<meta name="keywords" content="${page.keywords}">` : ''}
<link rel="canonical" href="${SITE_URL}/${page.slug}/">
${hreflangTags(karatKey)}
<meta property="og:title" content="${page.title}">
<meta property="og:description" content="${page.metaDesc}">
<meta property="og:type" content="website">
<meta property="og:url" content="${SITE_URL}/${page.slug}/">
<meta name="twitter:card" content="summary_large_image">`;
}

const SHARED_STYLE = `<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root { --brand:#a8790a; --brand-dark:#6b4d05; --brand-light:#fbf3de; --text:#241f12; --muted:#7a6f5c; --border:#ece1c9; --bg:#faf8f2; --radius:12px; }
body { font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif; color:var(--text); background:var(--bg); font-size:16px; line-height:1.65; }
.site-banner { position:sticky; top:0; z-index:200; display:flex; justify-content:center; gap:6px; padding:7px 10px; background:#2c2408; border-bottom:1px solid rgba(255,255,255,.08); }
.sb-link { display:inline-flex; align-items:center; gap:5px; padding:5px 14px; border-radius:20px; font-size:.8rem; font-weight:600; text-decoration:none; color:#e9dcc0; border:1px solid rgba(255,255,255,.14); }
.sb-link:hover { background:rgba(255,255,255,.10); }
.sb-link.active { background:#fff; color:#2c2408; border-color:#fff; }
header { background:linear-gradient(135deg,var(--brand-dark) 0%,var(--brand) 100%); color:#fff; padding:52px 20px 88px; text-align:center; }
header .badge { display:inline-block; background:rgba(255,255,255,.15); border:1px solid rgba(255,255,255,.3); border-radius:20px; padding:4px 14px; font-size:.78rem; font-weight:600; letter-spacing:.4px; margin-bottom:16px; }
header h1 { font-size:clamp(1.5rem,4vw,2.2rem); font-weight:800; margin-bottom:12px; }
header p { color:rgba(255,255,255,.92); font-size:1rem; max-width:600px; margin:0 auto; }
.container { max-width:840px; margin:0 auto; padding:0 20px; }
.tool-wrapper { margin:-56px auto 48px; }
.tool-card { background:#fff; border-radius:var(--radius); box-shadow:0 8px 40px rgba(107,77,5,.14); border:1px solid var(--border); padding:32px 28px; }
@media (max-width:580px){ .tool-card{ padding:22px 16px; } }
.refresh-line { font-size:.78rem; color:var(--muted); text-align:center; margin-bottom:18px; }
.fallback-banner { display:none; background:#fff3cd; border:1px solid #f0c94a; color:#5c4a00; border-radius:8px; padding:10px 14px; font-size:.82rem; margin-bottom:16px; text-align:center; }
.form-grid { display:grid; grid-template-columns:1fr; gap:16px; max-width:320px; margin:0 auto; }
.form-group { display:flex; flex-direction:column; gap:6px; }
label { font-size:.79rem; font-weight:700; color:var(--muted); text-transform:uppercase; letter-spacing:.5px; }
input[type=number] { border:2px solid var(--border); border-radius:8px; padding:12px 14px; font-size:1rem; color:var(--text); background:#fff; width:100%; }
input[type=number]:focus { outline:none; border-color:var(--brand); }
.calc-btn { width:100%; margin-top:22px; padding:17px; background:var(--brand); color:#fff; border:none; border-radius:10px; font-size:1.08rem; font-weight:700; cursor:pointer; }
.calc-btn:hover { background:var(--brand-dark); }
.result { display:none; margin-top:26px; }
.result-hero { background:linear-gradient(135deg,var(--brand-dark),var(--brand)); border-radius:10px; padding:26px; color:#fff; text-align:center; margin-bottom:14px; }
.result-hero .rl { font-size:.76rem; font-weight:700; text-transform:uppercase; letter-spacing:.5px; opacity:.85; margin-bottom:4px; }
.result-hero .ra { font-size:2.5rem; font-weight:900; line-height:1.1; }
.result-hero .rs { font-size:.9rem; opacity:.9; margin-top:6px; }
.result-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
@media (max-width:480px){ .result-grid{ grid-template-columns:1fr 1fr; } }
.r-stat { background:var(--brand-light); border-radius:8px; padding:14px; text-align:center; }
.r-stat .sv { font-size:1.15rem; font-weight:800; color:var(--brand-dark); }
.r-stat .sl { font-size:.72rem; color:var(--muted); margin-top:2px; }
.content { padding-bottom:64px; }
h2.st { font-size:1.3rem; font-weight:800; margin:48px 0 16px; }
p { color:#3d3520; margin-bottom:14px; line-height:1.75; }
.link-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(190px,1fr)); gap:12px; margin:18px 0; }
.link-card { display:block; background:#fff; border:1px solid var(--border); border-radius:10px; padding:16px; text-decoration:none; color:var(--text); }
.link-card:hover { border-color:var(--brand); }
.link-card .t { font-weight:700; font-size:.92rem; margin-bottom:3px; }
.link-card .sub { font-size:.76rem; color:var(--muted); }
.method { background:#fff; border:1px solid var(--border); border-radius:12px; padding:26px 26px 18px; margin:0 0 36px; font-size:.9rem; }
.method .code { background:#2c2408; color:#f2e3c5; border-radius:8px; padding:16px 18px; font-family:'Courier New',monospace; font-size:.82rem; line-height:1.9; margin:14px 0; overflow-x:auto; }
.faq-item { border-bottom:1px solid var(--border); }
.faq-q { width:100%; background:none; border:none; text-align:left; padding:17px 0; font-size:.92rem; font-weight:600; cursor:pointer; display:flex; justify-content:space-between; align-items:center; color:var(--text); }
.faq-q::after { content:'+'; font-size:1.3rem; color:var(--brand); flex-shrink:0; margin-left:12px; }
.faq-q.open::after { content:'−'; }
.faq-a { display:none; padding:0 0 16px; font-size:.88rem; color:#4b4326; line-height:1.75; }
.faq-a.open { display:block; }
.disc { background:#3a2f0e; border-radius:8px; padding:13px 18px; margin-bottom:16px; font-size:.78rem; color:#d9c9a3; line-height:1.6; }
footer { background:#2c2408; color:#c9bd9c; text-align:center; padding:30px 20px; font-size:.8rem; }
footer p { color:#c9bd9c; }
footer a { color:#e9dcc0; }
.eeat-section { background:#fff; border:1px solid var(--border); border-radius:var(--radius); padding:32px; margin-top:32px; box-shadow:0 4px 20px rgba(107,77,5,.05); }
.eeat-title { font-size:1.3rem; font-weight:800; color:var(--brand-dark); margin-bottom:24px; display:flex; align-items:center; gap:10px; border-bottom:2px solid var(--brand-light); padding-bottom:12px; }
.eeat-grid { display:grid; grid-template-columns:1.2fr 1fr; gap:32px; }
@media (max-width:768px) { .eeat-grid { grid-template-columns:1fr; gap:24px; } }
.eeat-author-card { display:flex; gap:16px; align-items:flex-start; }
.eeat-avatar { width:60px; height:60px; border-radius:50%; background:linear-gradient(135deg,var(--brand) 0%,var(--brand-dark) 100%); display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:1.4rem; flex-shrink:0; box-shadow:0 4px 10px rgba(107,77,5,.15); }
.eeat-author-info h3 { font-size:1.1rem; font-weight:700; color:var(--brand-dark); margin-bottom:2px; }
.eeat-author-subtitle { font-size:.82rem; font-weight:700; color:var(--brand); text-transform:uppercase; letter-spacing:.5px; margin-bottom:10px; }
.eeat-author-info p { font-size:.92rem; color:var(--muted); line-height:1.6; }
.eeat-compliance { display:flex; flex-direction:column; gap:18px; }
.eeat-badge-list { display:flex; flex-wrap:wrap; gap:8px; }
.eeat-badge { display:inline-flex; align-items:center; gap:6px; background:var(--brand-light); color:var(--brand-dark); font-size:.78rem; font-weight:700; padding:6px 12px; border-radius:20px; border:1px solid rgba(107,77,5,.1); }
.eeat-compliance-item { display:flex; gap:12px; align-items:flex-start; }
.eeat-compliance-icon { color:var(--brand); flex-shrink:0; margin-top:3px; }
.eeat-compliance-text h4 { font-size:.95rem; font-weight:700; color:var(--brand-dark); margin-bottom:2px; }
.eeat-compliance-text p { font-size:.88rem; color:var(--muted); line-height:1.5; margin-bottom:0; }
.eeat-compliance-text a { color:var(--brand); text-decoration:underline; }
.eeat-compliance-text a:hover { color:var(--brand-dark); }
</style>`;

function faqJsonLd(faq) {
  return faq.map(f => `        { "@type": "Question", "name": ${JSON.stringify(f.q)}, "acceptedAnswer": { "@type": "Answer", "text": ${JSON.stringify(f.a.replace(/<[^>]+>/g, ''))} } }`).join(',\n');
}

function faqHtml(faq) {
  return faq.map(f => `  <div class="faq-item"><button class="faq-q" onclick="toggleFaq(this)">${f.q}</button>
    <div class="faq-a">${f.a}</div></div>`).join('\n');
}

function siteBanner() {
  return `<div class="site-banner"><a href="https://usgoldpricepergram.com/" class="sb-link active">🇺🇸 US site · USD</a><a href="https://goldpricepergram.co.uk/" class="sb-link">🇬🇧 UK site · GBP</a></div>`;
}

// US-market E-E-A-T block, mirroring the UK site's eeatBlock() structure but with US-specific
// verifiable sources: CME Group/COMEX as the US benchmark gold market (parallel to UK's LBMA),
// and the FTC's Jewelry Guides (16 CFR Part 23) as the federal authority on karat quality marks
// — directly relevant since this site explains karat stamps (24K/22K/18K/14K/10K) throughout.
function eeatBlock() {
  return `<div class="container" style="padding-top:0;">
  <div class="eeat-section">
    <h2 class="eeat-title">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:var(--brand);"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
      Transparency &amp; Methodology
    </h2>
    <div class="eeat-grid">
      <div class="eeat-author-card">
        <div class="eeat-avatar">GP</div>
        <div class="eeat-author-info">
          <h3>Gold Price Per Gram USA</h3>
          <div class="eeat-author-subtitle">Independent, Open-Source Live Tracker</div>
          <p>An independent calculator that reads a live gold price from its UK sister site and applies a live FX conversion and the standard troy-ounce-to-gram formula deterministically — no manual price entry, no AI estimate.</p>
        </div>
      </div>
      <div class="eeat-compliance">
        <div class="eeat-badge-list">
          <span class="eeat-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            Live UK feed + FX rate
          </span>
          <span class="eeat-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            Updated 3×/day
          </span>
        </div>
        <div class="eeat-compliance-item">
          <svg class="eeat-compliance-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
          <div class="eeat-compliance-text">
            <h4>Methodology &amp; Limitations</h4>
            <p>USD prices are derived from the live GBP spot price published by our sister site, <a href="https://goldpricepergram.co.uk/" target="_blank" rel="noopener noreferrer">Gold Price Per Gram UK</a>, converted using a live GBP→USD rate. See the full <a href="/methodology/">methodology</a> for the exact formula and update schedule.</p>
          </div>
        </div>
        <div class="eeat-compliance-item">
          <svg class="eeat-compliance-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          <div class="eeat-compliance-text">
            <h4>Not a Dealer or Adviser</h4>
            <p>This site is not a bullion dealer, refiner or financial adviser — prices are indicative only. Before selling, compare quotes from a reputable buyer; for the US benchmark gold market see <a href="https://www.cmegroup.com/markets/metals/precious/gold-futures.html" target="_blank" rel="noopener noreferrer">CME Group / COMEX Gold Futures</a>.</p>
          </div>
        </div>
        <div class="eeat-compliance-item">
          <svg class="eeat-compliance-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2 3 7v6c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V7l-9-5z"></path><path d="M12 8v4"></path><path d="M12 16h.01"></path></svg>
          <div class="eeat-compliance-text">
            <h4>US Karat Standards</h4>
            <p>Karat quality marks (24K/22K/18K/14K/10K) follow the FTC's <a href="https://www.ecfr.gov/current/title-16/chapter-I/subchapter-B/part-23" target="_blank" rel="noopener noreferrer">Jewelry Guides (16 CFR Part 23)</a> — the federal rules on gold fineness marking. See the FTC's own consumer guide, <a href="https://consumer.ftc.gov/articles/buying-platinum-gold-and-silver-jewelry" target="_blank" rel="noopener noreferrer">Buying Platinum, Gold, and Silver Jewelry</a>, for what to check before buying.</p>
          </div>
        </div>
        <div class="eeat-compliance-item">
          <svg class="eeat-compliance-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          <div class="eeat-compliance-text">
            <h4>Open Source</h4>
            <p>The fetch, formula and page-generation code is public. Inspect it or suggest improvements on <a href="https://github.com/sadiyaqeen92639572-cloud/gold-price-per-gram-usa-calculator" target="_blank" rel="noopener noreferrer">GitHub</a>.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

function buildKaratPage(key, page) {
  const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "${page.label} Gold Price Per Gram Calculator (USD)",
      "url": "${SITE_URL}/${page.slug}/",
      "description": "${page.metaDesc}",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "inLanguage": "en-US",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqJsonLd(page.faq)}
      ]
    }
  ]
}
</script>`;

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${headBoilerplate(page, key)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
</head>
<body>

${siteBanner()}

<header>
  <div class="container">
    <div class="badge">🥇 Stamped ${page.hallmark} · updated 3x/day</div>
    <h1>${page.h1}</h1>
    <p>${page.intro}</p>
  </div>
</header>

<div class="container">
<div class="tool-wrapper">
  <div class="tool-card">
    <div class="refresh-line" id="refreshLine">Last refreshed: —</div>
    <div class="fallback-banner" id="fallbackBanner">⚠ Using cached rate — live data temporarily unavailable</div>
    <div class="form-grid">
      <div class="form-group">
        <label>Weight (grams)</label>
        <input type="number" id="wGrams" min="0.1" step="0.1" value="10" placeholder="e.g. 10">
      </div>
    </div>
    <button class="calc-btn" onclick="calculate()">Calculate ${page.label} Gold Price →</button>

    <div class="result" id="result">
      <div class="result-hero">
        <div class="rl">Total value (USD)</div>
        <div class="ra" id="r-total"></div>
        <div class="rs" id="r-sub"></div>
      </div>
      <div class="result-grid">
        <div class="r-stat"><div class="sv" id="r-perGram"></div><div class="sl">Price per gram</div></div>
        <div class="r-stat"><div class="sv" id="r-perOz"></div><div class="sl">Price per troy oz</div></div>
      </div>
    </div>
  </div>
</div>

<div class="content">
  <h2 class="st">${page.angleTitle}</h2>
  <p>${page.angleBody}</p>

  <h2 class="st">Other Karats &amp; Related Pages</h2>
  <div class="link-grid">
    ${relatedKaratLinks(key)}
    <a class="link-card" href="/cash-for-gold-price-per-gram/"><div class="t">Cash for Gold</div><div class="sub">Selling &amp; buyer estimate</div></a>
    <a class="link-card" href="/"><div class="t">Main Calculator</div><div class="sub">All karats in one tool</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live rate (spot × FX), not a dealer quote — always confirm with a buyer before selling.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram USA · <a href="https://goldpricepergram.co.uk/">UK site</a></p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
  </div>
</footer>

<script>
const TROY_OZ_G = 31.1035;
const PURITY = '${key}';
function fmtUSD(n){ return '$' + n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function refreshBanner(){
  const gd = window.GOLD_DATA;
  const line = document.getElementById('refreshLine');
  const banner = document.getElementById('fallbackBanner');
  line.textContent = gd.lastUpdated ? 'Last refreshed: ' + new Date(gd.lastUpdated).toLocaleString('en-US', {dateStyle:'medium', timeStyle:'short'}) : 'Last refreshed: pending first update';
  banner.style.display = gd.isFallback ? 'block' : 'none';
}
function calculate(){
  const gd = window.GOLD_DATA;
  const grams = parseFloat(document.getElementById('wGrams').value) || 0;
  const perGram = gd.pricePerGram[PURITY];
  if(perGram == null){ alert('Live price not yet available — please check back shortly.'); return; }
  if(grams<=0){ alert('Please enter a weight in grams.'); return; }
  document.getElementById('r-total').textContent = fmtUSD(perGram*grams);
  document.getElementById('r-sub').textContent = grams+'g · ${page.label} gold';
  document.getElementById('r-perGram').textContent = fmtUSD(perGram);
  document.getElementById('r-perOz').textContent = fmtUSD(perGram*TROY_OZ_G);
  document.getElementById('result').style.display='block';
  document.getElementById('result').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function toggleFaq(b){ b.classList.toggle('open'); b.nextElementSibling.classList.toggle('open'); }
refreshBanner();
</script>
</body>
</html>
`;
}

function buildCashPage(page) {
  const jsonLd = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "name": "Cash for Gold Price Per Gram Calculator (USD)",
      "url": "${SITE_URL}/${page.slug}/",
      "description": "${page.metaDesc}",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Any",
      "inLanguage": "en-US",
      "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
${faqJsonLd(page.faq)}
      ]
    }
  ]
}
</script>`;

  const options = KARAT_KEYS.map(k => `<option value="${k}">${KARATS[k].label} Gold — ${KARATS[k].hallmark}</option>`).join('\n          ');

  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${headBoilerplate(page, null)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${jsonLd}
${SHARED_STYLE}
<style>select{border:2px solid var(--border);border-radius:8px;padding:12px 14px;font-size:1rem;color:var(--text);background:#fff;width:100%;}select:focus{outline:none;border-color:var(--brand);}</style>
</head>
<body>

${siteBanner()}

<header>
  <div class="container">
    <div class="badge">💵 Estimate only · adjustable</div>
    <h1>${page.h1}</h1>
    <p>${page.intro}</p>
  </div>
</header>

<div class="container">
<div class="tool-wrapper">
  <div class="tool-card">
    <div class="refresh-line" id="refreshLine">Last refreshed: —</div>
    <div class="fallback-banner" id="fallbackBanner">⚠ Using cached rate — live data temporarily unavailable</div>
    <div class="form-grid" style="max-width:420px;">
      <div class="form-group">
        <label>Weight (grams)</label>
        <input type="number" id="wGrams" min="0.1" step="0.1" value="10" placeholder="e.g. 10">
      </div>
      <div class="form-group">
        <label>Karat</label>
        <select id="purity">
          ${options}
        </select>
      </div>
    </div>
    <button class="calc-btn" onclick="calculate()">Estimate Cash Value →</button>

    <div class="result" id="result">
      <div class="result-hero">
        <div class="rl">Estimated cash value (USD)</div>
        <div class="ra" id="r-total"></div>
        <div class="rs" id="r-sub"></div>
      </div>
      <div class="result-grid">
        <div class="r-stat"><div class="sv" id="r-perGram"></div><div class="sl">Est. cash $/gram</div></div>
        <div class="r-stat"><div class="sv" id="r-spot"></div><div class="sl">Live spot $/gram</div></div>
      </div>
      <p style="font-size:.76rem;color:var(--muted);margin-top:10px;text-align:center;">Estimate only — not a buyer quote. Actual offers vary by karat, volume and buyer.</p>
    </div>
  </div>
</div>

<div class="content">
  <h2 class="st">${page.angleTitle}</h2>
  <p>${page.angleBody}</p>

  <h2 class="st">Other Pages</h2>
  <div class="link-grid">
    ${relatedKaratLinks('')}
    <a class="link-card" href="/"><div class="t">Main Calculator</div><div class="sub">All karats in one tool</div></a>
    <a class="link-card" href="/methodology/"><div class="t">Methodology</div><div class="sub">Data source &amp; formula</div></a>
  </div>

  <h2 class="st">Frequently Asked Questions</h2>
${faqHtml(page.faq)}
</div>
</div>

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live rate (spot × FX), not a dealer quote — always confirm with a buyer before selling.</div>
    <p><a href="/methodology/">Methodology</a> · Gold Price Per Gram USA · <a href="https://goldpricepergram.co.uk/">UK site</a></p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
  </div>
</footer>

<script>
function fmtUSD(n){ return '$' + n.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2}); }
function refreshBanner(){
  const gd = window.GOLD_DATA;
  const line = document.getElementById('refreshLine');
  const banner = document.getElementById('fallbackBanner');
  line.textContent = gd.lastUpdated ? 'Last refreshed: ' + new Date(gd.lastUpdated).toLocaleString('en-US', {dateStyle:'medium', timeStyle:'short'}) : 'Last refreshed: pending first update';
  banner.style.display = gd.isFallback ? 'block' : 'none';
}
function calculate(){
  const gd = window.GOLD_DATA;
  const grams = parseFloat(document.getElementById('wGrams').value) || 0;
  const purity = document.getElementById('purity').value;
  const spotPerGram = gd.pricePerGram[purity];
  const cashPerGram = gd.cashPricePerGram[purity];
  if(cashPerGram == null){ alert('Live price not yet available — please check back shortly.'); return; }
  if(grams<=0){ alert('Please enter a weight in grams.'); return; }
  document.getElementById('r-total').textContent = fmtUSD(cashPerGram*grams);
  document.getElementById('r-sub').textContent = grams+'g · '+purity+' gold (estimate)';
  document.getElementById('r-perGram').textContent = fmtUSD(cashPerGram);
  document.getElementById('r-spot').textContent = fmtUSD(spotPerGram);
  document.getElementById('result').style.display='block';
  document.getElementById('result').scrollIntoView({behavior:'smooth',block:'nearest'});
}
function toggleFaq(b){ b.classList.toggle('open'); b.nextElementSibling.classList.toggle('open'); }
refreshBanner();
</script>
</body>
</html>
`;
}

function buildMethodologyPage(page) {
  return `<!DOCTYPE html>
<html lang="en-US">
<head>
${headBoilerplate(page, null)}

<!-- START_PRICE_DATA -->
<script>window.GOLD_DATA = ${JSON.stringify(require('./gold-data.json'))};</script>
<!-- END_PRICE_DATA -->

${SHARED_STYLE}
</head>
<body>

${siteBanner()}

<header>
  <div class="container">
    <div class="badge">📐 Data source &amp; formula</div>
    <h1>${page.h1}</h1>
    <p>How this site's gold price per gram (USD) is sourced, converted, calculated and refreshed.</p>
  </div>
</header>

<div class="container">
<div class="content" style="padding-top:64px;">
  <h2 class="st">Why USD Here Is Derived, Not a Native Feed</h2>
  <p>This site's live gold price does not come from a US-dollar spot feed directly. It reads the already-published gold price from our sister site, <a href="https://goldpricepergram.co.uk/">Gold Price Per Gram UK</a> (in turn sourced from <a href="https://www.goldapi.io/" target="_blank" rel="noopener">goldapi.io</a>, GBP), and converts it to USD using a live GBP→USD exchange rate from <a href="https://frankfurter.dev/" target="_blank" rel="noopener">frankfurter.dev</a> (European Central Bank reference rates, no API key required). We disclose this rather than presenting the USD figure as if it came from a native dollar feed — it's a two-step calculation, and the accuracy of the USD price depends on both the UK site's gold price and the FX rate being current.</p>

  <h2 class="st">Update Frequency</h2>
  <p>The gold spot price refreshes <strong>three times per day</strong>. The GBP→USD rate is sourced from the ECB, which publishes new reference rates once per working day (around 16:00 CET) — so on a typical day, our 3x/day polling of the FX rate mostly re-reads the same daily figure, while the gold spot price itself still updates three times. Every page shows the exact "Last refreshed" timestamp of the price data currently displayed. If either upstream source is temporarily unavailable, the site falls back to the last known value for that component specifically and shows a clear "using cached rate" banner, rather than a broken or zeroed page.</p>

  <h2 class="st">Calculation Formula</h2>
  <div class="method">
    <div class="code">
<span>price_per_gram(24k, GBP) = spot_price_per_troy_oz(GBP) / 31.1035</span><br>
<span>price_per_gram(karat, GBP) = price_per_gram(24k, GBP) × karat_fraction</span><br>
<span>price_per_gram(karat, USD) = price_per_gram(karat, GBP) × GBP_to_USD_rate</span><br>
<span>cash_estimate(karat, USD) = price_per_gram(karat, USD) × buyer_discount_factor</span>
    </div>
    <p id="liveExample" style="font-size:.85rem;color:var(--muted);"></p>
  </div>

  <h2 class="st">Karat Fractions Used</h2>
  <table style="width:100%;border-collapse:collapse;margin:18px 0;font-size:.88rem;">
    <thead><tr style="background:var(--brand);color:#fff;"><th style="padding:10px 14px;text-align:left;">Karat</th><th style="padding:10px 14px;text-align:left;">Stamp</th><th style="padding:10px 14px;text-align:left;">Fine gold fraction</th></tr></thead>
    <tbody>
      ${KARAT_KEYS.map(k => `<tr><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${KARATS[k].label}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${KARATS[k].hallmark}</td><td style="padding:10px 14px;border-bottom:1px solid var(--border);">${CONFIG.purities[k].fraction}</td></tr>`).join('\n      ')}
    </tbody>
  </table>

  <h2 class="st">Cash-for-Gold Discount</h2>
  <p>The cash-for-gold estimate applies a configurable discount factor (currently ${CONFIG.dealerDiscountFactor}) to the live per-gram USD price. This is explicitly an <strong>estimate, not a market rule</strong> — real pawn shop and gold-buyer offers vary by karat, weight sold and the individual buyer. Always get a real quote before selling.</p>

  <h2 class="st">Who Runs This Site</h2>
  <p>Gold Price Per Gram USA is an independent calculator site, and the US-market companion to <a href="https://goldpricepergram.co.uk/">Gold Price Per Gram UK</a>. It is not a dealer, refiner or financial adviser, and prices shown are indicative only — always confirm with a buyer or jeweler before any transaction.</p>

  <div class="link-grid" style="margin-top:32px;">
    <a class="link-card" href="/"><div class="t">Main Calculator</div><div class="sub">All karats in one tool</div></a>
    ${relatedKaratLinks('')}
    <a class="link-card" href="/cash-for-gold-price-per-gram/"><div class="t">Cash for Gold</div><div class="sub">Selling &amp; buyer estimate</div></a>
  </div>
</div>
</div>

${eeatBlock()}

<footer>
  <div class="container">
    <div class="disc">Prices are an indicative live rate (spot × FX), not a dealer quote — always confirm with a buyer before selling.</div>
    <p>Gold Price Per Gram USA · <a href="https://goldpricepergram.co.uk/">UK site</a></p>
    <p style="font-size:.72rem;margin-top:8px;">Gold Price Per Gram calculators are part of Gesmine-Invest Limited, registered UK company number 14120136, registered office address at Hardy House, 269 Poynders Gardens, London, London, United Kingdom, SW4 8PQ.</p>
  </div>
</footer>

<script>
(function(){
  const gd = window.GOLD_DATA;
  const el = document.getElementById('liveExample');
  if(gd && gd.pricePerGram && gd.pricePerGram['24k'] != null && gd.fxRateGBPtoUSD != null){
    const g24 = gd.pricePerGram['24k'];
    el.textContent = 'Live worked example (as of last refresh): GBP spot converted at 1 GBP = ' + gd.fxRateGBPtoUSD + ' USD → $' + g24.toFixed(2) + '/g at 24K.';
  } else {
    el.textContent = 'Live worked example will appear once the first price update has run.';
  }
})();
</script>
</body>
</html>
`;
}

// --- Write files ---
for (const key of KARAT_KEYS) {
  const page = KARATS[key];
  const dir = path.join(ROOT, page.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), buildKaratPage(key, page));
  console.log(`✓ ${page.slug}/index.html`);
}

fs.mkdirSync(path.join(ROOT, CASH_PAGE.slug), { recursive: true });
fs.writeFileSync(path.join(ROOT, CASH_PAGE.slug, 'index.html'), buildCashPage(CASH_PAGE));
console.log(`✓ ${CASH_PAGE.slug}/index.html`);

fs.mkdirSync(path.join(ROOT, METHODOLOGY_PAGE.slug), { recursive: true });
fs.writeFileSync(path.join(ROOT, METHODOLOGY_PAGE.slug, 'index.html'), buildMethodologyPage(METHODOLOGY_PAGE));
console.log(`✓ ${METHODOLOGY_PAGE.slug}/index.html`);

console.log('Done. Run update-data.js next to inject live prices.');
