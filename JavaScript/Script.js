
const originalArtifactSrcs = {};
const revealBtn = document.getElementById('reveal-btn');
const hiddenLore = document.querySelector('.hidden-lore');

if (revealBtn) 
  {
    revealBtn.addEventListener('click', () => {
      hiddenLore.classList.toggle('is-visible');
    });
  }

function updateArtifactImages() 
{
  document.querySelectorAll('[id$="-artifact"]').forEach(img => {
    const key = img.id.replace('-artifact', '');

    if (!originalArtifactSrcs[key]) {
      originalArtifactSrcs[key] = img.src;
    }

    if (localStorage.getItem(`${key}-unlocked`) === 'true') {
      img.src = img.dataset.unlocked;
    } else {
      img.src = originalArtifactSrcs[key];
    }
});
}

updateArtifactImages();

document.querySelectorAll('.interactive-rune').forEach(rune => {
  rune.addEventListener('click', () => {
    const key = rune.dataset.artifact;

    localStorage.setItem(`${key}-unlocked`, 'true');
    updateArtifactImages();
  });
});   

if (document.querySelector('.reset-artifacts')) 
  {
  document.querySelector('.reset-artifacts').addEventListener('click', () => {
    localStorage.setItem("reliquary-unlocked", "false");
    localStorage.setItem("astrolabe-unlocked", "false");
    localStorage.setItem("sigil-unlocked", "false");

    updateArtifactImages();
  }
);
}

