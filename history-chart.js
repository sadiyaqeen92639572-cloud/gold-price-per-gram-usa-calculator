// Shared by generate-pages.js (initial build) and update-data.js (each refresh) so the
// baked-in SVG chart on /gold-price-history/ never drifts from history.json.
const W = 760, H = 260, PAD = 34;

function buildSVG(history, field) {
  const pts = history.filter(h => h[field] != null);
  if (pts.length < 2) {
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Price history chart building up — not enough data points yet."><text x="${W/2}" y="${H/2}" text-anchor="middle" fill="#7a6f5c" font-size="14">Chart building up — check back soon.</text></svg>`;
  }
  const values = pts.map(p => p[field]);
  const min = Math.min(...values), max = Math.max(...values);
  const range = (max - min) || 1;
  const stepX = (W - 2 * PAD) / (pts.length - 1);
  const coords = pts.map((p, i) => {
    const x = PAD + i * stepX;
    const y = H - PAD - ((p[field] - min) / range) * (H - 2 * PAD);
    return [x, y];
  });
  const path = coords.map((c, i) => (i === 0 ? 'M' : 'L') + c[0].toFixed(1) + ',' + c[1].toFixed(1)).join(' ');
  const areaPath = path + ` L${coords[coords.length - 1][0].toFixed(1)},${H - PAD} L${coords[0][0].toFixed(1)},${H - PAD} Z`;
  const firstDate = new Date(pts[0].t).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  const lastDate = new Date(pts[pts.length - 1].t).toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Gold price per gram history chart from ${firstDate} to ${lastDate}, range $${min.toFixed(2)} to $${max.toFixed(2)}">
  <defs><linearGradient id="hgrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#a8790a" stop-opacity="0.35"/><stop offset="100%" stop-color="#a8790a" stop-opacity="0"/></linearGradient></defs>
  <path d="${areaPath}" fill="url(#hgrad)" stroke="none"/>
  <path d="${path}" fill="none" stroke="#a8790a" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
  <text x="${PAD}" y="${H - 10}" font-size="11" fill="#7a6f5c">${firstDate}</text>
  <text x="${W - PAD}" y="${H - 10}" font-size="11" fill="#7a6f5c" text-anchor="end">${lastDate}</text>
  <text x="${PAD}" y="${PAD - 12}" font-size="11" fill="#7a6f5c">$${max.toFixed(2)}/g</text>
  <text x="${PAD}" y="${H - PAD + 14}" font-size="11" fill="#7a6f5c">$${min.toFixed(2)}/g</text>
</svg>`;
}

function buildStats(history, field) {
  const pts = history.filter(h => h[field] != null);
  if (pts.length < 2) return null;
  const values = pts.map(p => p[field]);
  const min = Math.min(...values), max = Math.max(...values);
  const first = pts[0], latest = pts[pts.length - 1];
  const changeAbs = latest[field] - first[field];
  const changePct = (changeAbs / first[field]) * 100;
  const days = Math.max(1, Math.round((new Date(latest.t) - new Date(first.t)) / 86400000));
  return {
    min, max, days,
    latest: latest[field],
    changeAbs, changePct,
    fromDate: new Date(first.t).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    toDate: new Date(latest.t).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
    points: pts.length,
  };
}

module.exports = { buildSVG, buildStats };
