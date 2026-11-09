// Screen switching, crossfades and focus management.
//
// A screen factory returns:
//   node          the screen's root element
//   candles       number of floating candles to show (0 hides the layer)
//   atmosphere    background glow name (base.css [data-atmosphere])
//   house         optional house id; themes the page via [data-house]
//   footer        'short' (default) | 'long' disclaimer
//   focusHeading  false to keep focus off the <h1> (sorting, dialogs)
//   onShow        called once the screen is in place
//   cleanup       called when the screen is removed

const factories = new Map();
let root;
let candleLayer;
let footerNode;
let disclaimers;
let current = null;
let queue = Promise.resolve();
let onFailure = () => {};

export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Read a duration token (e.g. --dur-screen) from CSS, in ms. */
export function token(name) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (raw.endsWith('ms')) return parseFloat(raw);
  if (raw.endsWith('s')) return parseFloat(raw) * 1000;
  return 0;
}

export const wait = (ms) => new Promise((resolve) => { window.setTimeout(resolve, ms); });

export function initRouter({ appRoot, candles, footer, copy, onError }) {
  root = appRoot;
  candleLayer = candles;
  footerNode = footer;
  disclaimers = copy;
  onFailure = onError;
}

export function register(name, factory) {
  factories.set(name, factory);
}

export function currentScreen() {
  return current?.name ?? null;
}

/**
 * Go to a screen.
 * transition: 'fade' (300ms crossfade) | 'reveal' (400ms envelope → letter) | 'none'
 */
export function go(name, params = {}, { transition = 'fade', focus = true } = {}) {
  queue = queue
    .then(() => swap(name, params, transition, focus))
    .catch((err) => onFailure(err));
  return queue;
}

async function swap(name, params, transition, focus) {
  const factory = factories.get(name);
  if (!factory) throw new Error(`Unknown screen "${name}"`);

  const view = factory(params);
  const previous = current;
  current = { name, ...view };

  view.node.classList.add('screen');
  applyChrome(view);

  const instant = transition === 'none' || !previous || prefersReducedMotion();
  const duration = transition === 'reveal' ? token('--dur-reveal') : token('--dur-screen');

  root.append(view.node);

  if (previous) {
    previous.node.inert = true;
    previous.node.setAttribute('aria-hidden', 'true');
  }

  if (!instant) {
    previous.node.classList.add(transition === 'reveal' ? 'is-leaving-reveal' : 'is-leaving');
    view.node.classList.add('is-entering');
    await wait(duration);
    view.node.classList.remove('is-entering');
  }

  if (previous) teardown(previous);

  if (focus && view.focusHeading !== false) {
    const h = view.node.querySelector('[data-screen-heading]');
    if (h) h.focus({ preventScroll: true });
  }
  window.scrollTo(0, 0);
  view.onShow?.();
}

function teardown(view) {
  view.cleanup?.();
  view.node.remove();
}

function applyChrome(view) {
  const count = view.candles ?? 0;
  document.body.dataset.atmosphere = view.atmosphere ?? 'landing';
  if (view.house) document.body.dataset.house = view.house;
  else delete document.body.dataset.house;
  candleLayer.dataset.count = String(count);
  candleLayer.classList.toggle('is-hidden', count === 0);
  footerNode.textContent = view.footer === 'long' ? disclaimers.disclaimerLong : disclaimers.disclaimer;
}

/** Remove whatever is on screen (used before showing E5 directly). */
export function reset() {
  if (current) teardown(current);
  current = null;
  root.replaceChildren();
}
