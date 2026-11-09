// Every piece of inline SVG in the project. Colours come from CSS via
// currentColor or CSS classes, never hard-coded here.

// Star positions from Figma frame 01 (x, y, r). Mirrored lower so the sky fills.
const STARS = [
  [808, 65, 1], [113, 492, 1], [1125, 368, 1], [968, 88, 1], [72, 526, 1], [1376, 106, 1],
  [404, 95, 1], [788, 185, 1], [504, 45, 1], [679, 134, 1.75], [940, 76, 1], [69, 231, 1],
  [470, 247, 1.75], [649, 246, 1], [190, 151, 1], [1336, 483, 1.75], [35, 181, 1], [988, 413, 1],
  [518, 328, 1], [659, 490, 1.75], [1142, 502, 1], [1018, 391, 1], [1196, 94, 1], [773, 465, 1],
  [75, 157, 1], [332, 166, 1], [2, 349, 1], [688, 232, 1], [1064, 189, 1], [386, 201, 1],
  [98, 104, 1], [633, 211, 1], [607, 67, 1], [1305, 380, 1], [600, 280, 1.75], [787, 556, 1.75],
  [109, 545, 1], [1081, 438, 1], [1041, 31, 1.75], [950, 88, 1.75], [760, 176, 1], [51, 218, 1],
  [1066, 171, 1], [1196, 100, 1], [820, 49, 1.75], [579, 286, 1], [1068, 255, 1], [583, 125, 1],
  [1049, 477, 1], [497, 130, 1], [904, 497, 1], [1157, 232, 1.75], [1042, 329, 1], [462, 89, 1],
  [1019, 155, 1], [1385, 341, 1], [817, 69, 1], [759, 295, 1], [204, 212, 1], [649, 485, 1.75],
  [497, 140, 1.75], [499, 547, 1], [76, 259, 1], [349, 292, 1], [952, 275, 1], [660, 2, 1],
  [440, 242, 1], [242, 3, 1.75], [1081, 319, 1], [886, 35, 1],
];

function starCircles() {
  const upper = STARS.map(([x, y, r], i) =>
    `<circle cx="${x}" cy="${y}" r="${r}" class="${i % 3 === 0 ? 'star star--dim' : 'star'}"/>`);
  const lower = STARS.filter((_, i) => i % 2 === 0).map(([x, y, r], i) =>
    `<circle cx="${1440 - x}" cy="${y + 470}" r="${r}" class="${i % 2 === 0 ? 'star star--dim' : 'star'}"/>`);
  return upper.concat(lower).join('');
}

export const icons = {
  starfield: () => `
    <svg class="starfield" viewBox="0 0 1440 1024" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      ${starCircles()}
    </svg>`,

  envelopeFolds: () => `
    <svg class="envelope__folds" viewBox="0 0 720 440" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path class="envelope__crease" d="M0 440L300 210M720 440L420 210"/>
      <path class="envelope__flap" d="M0 0L360 250L720 0H0Z"/>
    </svg>`,

  sealShape: () => `
    <svg class="seal__shape" viewBox="0 0 112 112" aria-hidden="true" focusable="false">
      <path class="seal__wax" d="M56 4C70 6 74 2 84 10C96 16 100 24 104 34C110 46 106 54 108 66C106 80 100 88 90 96C80 104 70 106 58 108C44 110 34 104 24 98C12 90 8 80 4 68C2 54 6 46 6 36C10 22 20 14 30 8C40 4 46 2 56 4Z"/>
      <circle class="seal__rim-outer" cx="56" cy="56" r="36"/>
      <circle class="seal__rim-inner" cx="56" cy="56" r="30"/>
    </svg>`,

  shield: () => `
    <svg class="crest__shield" viewBox="0 0 200 240" aria-hidden="true" focusable="false">
      <path d="M100 6L190 34C192 112 170 186 100 234C30 186 8 112 10 34Z"/>
    </svg>`,

  arrowLeft: () => `
    <svg class="icon icon--arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
      <path d="M14 8H3M7 4L3 8l4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  check: () => `
    <svg class="icon icon--toast" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M4 11l4 4L16 4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`,

  letter: () => `
    <svg class="icon icon--toast" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <rect x="2.5" y="4.5" width="15" height="11" rx="1" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <path d="M3 5.5l7 5 7-5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,

  sparkle: () => `
    <svg class="icon icon--toast" viewBox="0 0 20 20" aria-hidden="true" focusable="false">
      <path d="M10 2c.6 4.2 3.8 7.4 8 8-4.2.6-7.4 3.8-8 8-.6-4.2-3.8-7.4-8-8 4.2-.6 7.4-3.8 8-8z" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
    </svg>`,
};

/** Turn an SVG string into a DOM node. */
export function svg(name) {
  const tpl = document.createElement('template');
  tpl.innerHTML = icons[name]().trim();
  return tpl.content.firstElementChild;
}
