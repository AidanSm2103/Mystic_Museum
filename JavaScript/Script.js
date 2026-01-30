
/*
localStorage.setItem("reliquary-unlocked", "false");
localStorage.setItem("astrolabe-unlocked", "false");
localStorage.setItem("sigil-unlocked", "false");
*/

const revealBtn = document.getElementById('reveal-btn');
const hiddenLore = document.querySelector('.hidden-lore');

if (revealBtn) 
  {
    revealBtn.addEventListener('click', () => {
      hiddenLore.classList.toggle('is-visible');
    });
  }

document.querySelectorAll('.interactive-rune').forEach(rune => {
  rune.addEventListener('click', () => {
    const key = rune.dataset.artifact;

    localStorage.setItem(`${key}-unlocked`, 'true');
  });
});   

document.querySelectorAll('[id$="-artifact"]').forEach(img => {
  const key = img.id.replace('-artifact', '');

  if (localStorage.getItem(`${key}-unlocked`) === 'true') {
    img.src = img.dataset.unlocked;
  }
});

