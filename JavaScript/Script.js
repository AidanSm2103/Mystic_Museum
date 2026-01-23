
const rune1 = document.getElementById('reliquary-rune');
const artifact1 = document.getElementById('reliquary-artifact');

const rune2 = document.getElementById('astrolabe-rune');
const artifact2 = document.getElementById('astrolabe-artifact');

const rune3 = document.getElementById('sigil-rune');
const artifact3 = document.getElementById('sigil-artifact');

if (rune1)
    {
        rune1.addEventListener('click', () => {
        localStorage.setItem('reliquaryUnlocked', 'true');
    });
    }

    if (artifact1 && localStorage.getItem('reliquaryUnlocked') === 'true')
        {
        const currentSrc = artifact1.src;
        const altSrc = artifact1.getAttribute('data-alt');

        artifact1.src = altSrc;
        artifact1.setAttribute('data-alt', currentSrc);
        }

if (rune2)
    {   
  rune2.addEventListener('click', () => {
    localStorage.setItem('astrolabeUnlocked', 'true');
  });
}

if (artifact2 && localStorage.getItem('astrolabeUnlocked') === 'true')
    {
    const currentSrc = artifact2.src;
    const altSrc = artifact2.getAttribute('data-alt');

    artifact2.src = altSrc;
    artifact2.setAttribute('data-alt', currentSrc);
    }

if (rune3)
    {
  rune3.addEventListener('click', () => {
    localStorage.setItem('sigilUnlocked', 'true');
  });
    }

     if (artifact3 && localStorage.getItem('sigilUnlocked') === 'true') 
        {
            const currentSrc = artifact3.src;
            const altSrc = artifact3.getAttribute('data-alt');

            artifact3.src = altSrc;
            artifact3.setAttribute('data-alt', currentSrc);
        }