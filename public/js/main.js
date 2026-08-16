// ============================================================
// This file is intentionally small. The scavenger hunt itself is
// server logic now (see routes/unlock.js) — runes are real <form>
// submissions, so the site works even with JS disabled. Everything
// here is presentational: dust motes, a toast after a rune is found,
// and a dev-only "show me the hotspots" helper.
// ============================================================

function initDust(){
  const layer = document.querySelector('.dust');
  if (!layer) return;
  const corruption = Number(document.documentElement.dataset.corruption || 0);
  const base = window.innerWidth < 780 ? 12 : 22;
  const count = base + corruption * 4;
  for (let i = 0; i < count; i++){
    const m = document.createElement('div');
    m.className = 'mote';
    m.style.left = (Math.random()*100) + 'vw';
    m.style.bottom = '-10px';
    m.style.setProperty('--dx', (Math.random()*60-30)+'px');
    m.style.animationDuration = (14 + Math.random()*12) + 's';
    m.style.animationDelay = (Math.random()*14) + 's';
    layer.appendChild(m);
  }
}

// After routes/unlock.js redirects back with ?found=<name>, show a
// toast, then clean the query string out of the URL bar.
function showFoundToast(){
  const params = new URLSearchParams(window.location.search);
  const found = params.get('found');
  if (!found) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = `The seal breaks — ${found} is revealed.`;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => toast.classList.remove('show'), 3200);

  const url = new URL(window.location.href);
  url.searchParams.delete('found');
  window.history.replaceState({}, '', url);
}

// dev-only: outlines every rune hotspot so you can find them while
// building/testing. Safe to delete this whole function before shipping.
function initDevToggle(){
  const btn = document.createElement('button');
  btn.className = 'dev-toggle';
  btn.type = 'button';
  btn.textContent = 'SHOW RUNE HINTS';
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dev-reveal');
    btn.textContent = document.body.classList.contains('dev-reveal') ? 'HIDE RUNE HINTS' : 'SHOW RUNE HINTS';
  });
  document.body.appendChild(btn);
}

document.addEventListener('DOMContentLoaded', () => {
  initDust();
  showFoundToast();
  initDevToggle();
});
