// Entry point: wires the router, registers screens, handles slow loads,
// resume, ?preview= and the global error catch.

import { COPY } from './data.js';
import { svg } from './icons.js';
import { candleField, toastRegion } from './components.js';
import { initRouter, register, go, reset } from './router.js';
import { store } from './store.js';
import * as screens from './screens.js';

const SLOW_AFTER = 3000;       // E1a
const VERY_SLOW_AFTER = 10000; // E1b

const app = document.getElementById('app');
const sky = document.querySelector('[data-sky]');
const candleSlot = document.querySelector('[data-candles]');
const footer = document.querySelector('[data-disclaimer]');

sky.append(svg('starfield'));
const candles = candleField(8);
candleSlot.replaceWith(candles);
document.body.append(toastRegion());

// ---- E5: catch-all ----

let failing = false;
function handleFailure(err) {
  console.error(err); // eslint-disable-line no-console
  if (failing) return;
  failing = true;
  try {
    reset();
    go('error', {}, { transition: 'none' });
  } catch {
    app.textContent = `${COPY.error.title} ${COPY.error.bodyNoStorage}`;
  }
}

window.addEventListener('error', (e) => handleFailure(e.error ?? e.message));
window.addEventListener('unhandledrejection', (e) => handleFailure(e.reason));

initRouter({ appRoot: app, candles, footer, copy: COPY, onError: handleFailure });

register('letterArrives', screens.letterArrives);
register('letterOpened', screens.letterOpened);
register('question', screens.question);
register('sorting', screens.sorting);
register('result', screens.result);
register('slowLoad', screens.slowLoad);
register('verySlowLoad', screens.verySlowLoad);
register('error', screens.error);

// ---- First screen ----

function welcomeBack(answered, { preview = false } = {}) {
  return {
    answered,
    onResume: () => go('question', { index: preview ? answered : store.firstUnanswered() }),
    onRestart: () => {
      if (!preview) store.clear();
      go('letterOpened');
    },
  };
}

function start() {
  if (store.takeResumeRequest() && store.hasUnfinished()) {
    go('question', { index: store.firstUnanswered() }, { focus: false });
  } else if (store.hasUnfinished()) {
    go('letterArrives', { welcomeBack: welcomeBack(store.answeredCount()) });
  } else {
    if (store.isFinished()) store.clear();
    go('letterArrives', {}, { focus: false });
  }
}

// ---- ?preview= (shows a state, never touches stored answers) ----

function startPreview(kind, params) {
  const house = params.get('house') || 'ravenclaw';
  const previews = {
    slow: () => go('slowLoad'),
    'very-slow': () => go('verySlowLoad'),
    'welcome-back': () => go('letterArrives', { welcomeBack: welcomeBack(6, { preview: true }) }),
    'crest-missing': () => go('result', { house, preview: { active: true, crestMissing: true } }),
    'screenshot-popup': () => go('result', { house, preview: { active: true, screenshotPopup: true } }),
    error: () => go('error', { preview: true }),
    result: () => go('result', { house, preview: { active: true } }),
  };
  if (!previews[kind]) return false;
  previews[kind]();
  return true;
}

// ---- Boot: wait for fonts + key images; show E1a/E1b if slow ----

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve; // a missing image must never block the letter
    img.src = src;
  });
}

function assetsReady() {
  const fonts = document.fonts
    ? Promise.all([
      '700 64px "Cinzel Decorative"',
      '700 13px "Cinzel"',
      'italic 500 32px "Cormorant Garamond"',
      '600 40px "Cormorant Garamond"',
      '400 18px "EB Garamond"',
      'italic 400 18px "EB Garamond"',
    ].map((f) => document.fonts.load(f).catch(() => null)))
    : Promise.resolve();
  return Promise.all([fonts, loadImage('assets/parchment.jpg')]);
}

function boot() {
  const params = new URLSearchParams(window.location.search);
  const preview = params.get('preview');
  if (preview && startPreview(preview, params)) return;

  let settled = false;
  const slowTimer = window.setTimeout(() => { if (!settled) go('slowLoad'); }, SLOW_AFTER);
  const verySlowTimer = window.setTimeout(() => { if (!settled) go('verySlowLoad'); }, VERY_SLOW_AFTER);

  assetsReady().then(() => {
    settled = true;
    window.clearTimeout(slowTimer);
    window.clearTimeout(verySlowTimer);
    start();
  });
}

boot();
