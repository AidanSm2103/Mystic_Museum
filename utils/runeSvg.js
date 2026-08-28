// Each rune is just a handful of line coordinates in a 0-100 box

const RUNE_PATHS = {
  rune1: [[50, 10, 50, 90], [50, 40, 80, 15], [50, 40, 20, 15]],
  rune2: [[50, 5, 50, 95], [50, 45, 80, 20], [50, 45, 20, 20], [50, 45, 80, 70], [50, 45, 20, 70]],
  rune3: [[40, 10, 40, 90], [40, 10, 70, 30]],
  rune4: [[30, 80, 70, 80], [50, 80, 50, 20], [50, 50, 75, 20], [50, 50, 25, 20]],
  rune5: [[20, 20, 80, 80], [20, 80, 80, 20]],
  rune6: [[50, 10, 20, 50], [50, 10, 80, 50], [20, 50, 50, 90], [80, 50, 50, 90]],
  rune7: [[50, 10, 50, 90], [30, 30, 70, 30], [30, 70, 70, 70]],
  rune8: [[50, 15, 85, 50], [85, 50, 50, 85], [50, 85, 15, 50], [15, 50, 50, 15]]
};

function runeSVG(key, color = 'var(--gold)') {
  const lines = (RUNE_PATHS[key] || [])
    .map(([x1, y1, x2, y2]) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"/>`)
    .join('');
  return `<svg viewBox="0 0 100 100"><g stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round">${lines}</g></svg>`;
}

module.exports = { runeSVG, RUNE_PATHS };
