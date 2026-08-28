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

// After routes/unlock.js redirects back with ?found=<name>, show a toast, then clean the query string out of the URL bar.
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

// Outlines every rune hotspot so you can find them while
function initDevToggle(){
  const btn = document.createElement('button');
  btn.className = 'dev-toggle';
  btn.type = 'button';
  btn.textContent = 'SHOW RUNE HINTS';
  btn.addEventListener('click', () => {
    document.body.classList.toggle('dev-reveal');
    const active = document.body.classList.contains('dev-reveal');
    btn.textContent = active ? 'HIDE RUNE HINTS' : 'SHOW RUNE HINTS';
    btn.classList.toggle('expanded', active);
  });
  document.body.appendChild(btn);
}

// Replaces window.confirm() with a themed modal for the reset form.
function initResetConfirm(){
  const form = document.getElementById('reset-form');
  const modal = document.getElementById('reset-modal');
  if (!form || !modal) return;

  const cancelBtn = document.getElementById('reset-cancel');
  const confirmBtn = document.getElementById('reset-confirm');
  let confirmed = false;

  function openModal(){ modal.hidden = false; confirmBtn.focus(); }
  function closeModal(){ modal.hidden = true; }

  form.addEventListener('submit', (e) => {
    if (!confirmed){
      e.preventDefault();
      openModal();
    }
  });

  cancelBtn.addEventListener('click', closeModal);

  confirmBtn.addEventListener('click', () => {
    confirmed = true;
    closeModal();
    form.requestSubmit();
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(); // click on the dark overlay itself
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
}

function eyeSVG(){
  return `<svg viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
    <path d="M2,15 Q30,-2 58,15 Q30,32 2,15 Z" fill="none" stroke="var(--dread-bright)" stroke-width="2"/>
    <ellipse cx="30" cy="15" rx="3.2" ry="8" fill="var(--dread-bright)"/>
  </svg>`;
}
 
function initEyes(){
  const corruption = Number(document.documentElement.dataset.corruption || 0);
  const counts = { 0: 0, 1: 0, 2: 3, 3: 7, 4: 16 };
  const count = counts[corruption] || 0;
  if (count === 0) return;
 
  let layer = document.querySelector('.eyes-layer');
  if (!layer){
    layer = document.createElement('div');
    layer.className = 'eyes-layer';
    document.body.appendChild(layer);
  }
 
  for (let i = 0; i < count; i++){
    const eye = document.createElement('div');
    eye.className = 'eye';
    eye.innerHTML = eyeSVG();
    eye.style.left = (Math.random() * 92) + 'vw';
    eye.style.top = (Math.random() * 88) + 'vh';
    eye.style.animationDuration = (6 + Math.random() * 10) + 's';
    eye.style.animationDelay = (Math.random() * 3) + 's';
    layer.appendChild(eye);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initDust();
  initEyes();
  showFoundToast();
  initDevToggle();
  initResetConfirm();
});
