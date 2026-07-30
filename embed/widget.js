(function(){
  var SITE = 'https://usgoldpricepergram.com';
  var containers = document.querySelectorAll('#usgpg-widget');
  if(!containers.length) return;

  var style = document.createElement('style');
  style.textContent = [
    '.usgpg-w{display:inline-block;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;',
    'background:#fff;border:1px solid #ece1c9;border-radius:10px;padding:14px 18px;color:#241f12;text-align:center;box-shadow:0 2px 10px rgba(107,77,5,.08);}',
    '.usgpg-w .usgpg-label{font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.4px;color:#7a6f5c;margin-bottom:4px;}',
    '.usgpg-w .usgpg-price{font-size:1.4rem;font-weight:800;color:#6b4d05;}',
    '.usgpg-w .usgpg-updated{font-size:.7rem;color:#7a6f5c;margin-top:4px;}',
    '.usgpg-w .usgpg-attr{display:block;margin-top:8px;font-size:.7rem;color:#a8790a;text-decoration:none;}',
    '.usgpg-w .usgpg-attr:hover{text-decoration:underline;}',
  ].join('');
  document.head.appendChild(style);

  containers.forEach(function(el){
    el.innerHTML = '<div class="usgpg-w"><div class="usgpg-label">24K Gold / Gram (USD)</div><div class="usgpg-price">—</div><div class="usgpg-updated"></div><a class="usgpg-attr" href="' + SITE + '/" target="_blank" rel="noopener noreferrer">Gold Price Per Gram USA</a></div>';
  });

  fetch(SITE + '/gold-data.json', { cache: 'no-store' })
    .then(function(r){ return r.ok ? r.json() : null; })
    .then(function(data){
      if(!data || data.pricePerGram == null || data.pricePerGram['24k'] == null) return;
      var price = '$' + data.pricePerGram['24k'].toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      var updated = data.lastUpdated ? new Date(data.lastUpdated).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' }) : '';
      containers.forEach(function(el){
        var p = el.querySelector('.usgpg-price');
        var u = el.querySelector('.usgpg-updated');
        if(p) p.textContent = price;
        if(u) u.textContent = updated ? 'Updated ' + updated : '';
      });
    })
    .catch(function(){});
})();
