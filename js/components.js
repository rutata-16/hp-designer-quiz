// DOM builders for every reusable piece. Screens compose these; they never
// build their own buttons, cards or letters.

import { svg } from './icons.js';
import { token } from './router.js';

/**
 * Tiny element helper.
 * el('p', { class: 'x', text: 'hi', attrs: { id: 'a' }, on: { click } }, [children])
 */
export function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.class) node.className = opts.class;
  if (opts.text != null) node.textContent = opts.text;
  if (opts.attrs) {
    Object.entries(opts.attrs).forEach(([k, v]) => {
      if (v === false || v == null) return;
      node.setAttribute(k, v === true ? '' : String(v));
    });
  }
  if (opts.data) Object.entries(opts.data).forEach(([k, v]) => { node.dataset[k] = v; });
  if (opts.on) Object.entries(opts.on).forEach(([evt, fn]) => node.addEventListener(evt, fn));
  [].concat(children).filter(Boolean).forEach((c) => node.append(c));
  return node;
}

let uid = 0;
/** Unique id for aria wiring. */
export function nextId(prefix) {
  uid += 1;
  return `${prefix}-${uid}`;
}

/**
 * Screen heading: the one <h1> per screen; receives focus on arrival unless
 * `focusable` is false.
 */
export function heading(text, className, { id, focusable = true } = {}) {
  return el('h1', {
    class: className,
    text,
    attrs: {
      id,
      tabindex: focusable ? '-1' : null,
      'data-screen-heading': focusable ? true : null,
    },
  });
}

/** Caps label (Cinzel Bold 13, tracked). */
export function capsLabel(text, className = '') {
  return el('p', { class: `caps-label ${className}`.trim(), text });
}

/**
 * Button.
 * variant: 'primary' (burgundy, gold border) | 'text' (caps link-style)
 */
export function button({ label, variant = 'primary', onClick, className = '', attrs = {}, icon }) {
  const node = el('button', {
    class: `btn btn--${variant} ${className}`.trim(),
    attrs: { type: 'button', ...attrs },
    on: onClick ? { click: onClick } : undefined,
  });
  if (icon) node.append(svg(icon));
  node.append(el('span', { class: 'btn__label', text: label }));
  return node;
}

/** Row of actions: primary + text button. */
export function actions(children, className = '') {
  return el('div', { class: `actions ${className}`.trim() }, children);
}

// ==========================================================================
// Candles
// ==========================================================================

/** Floating candles. Positions come from the Figma layout (components.css). */
export function candleField(count = 8, className = '') {
  const field = el('div', { class: `candles ${className}`.trim(), attrs: { 'aria-hidden': 'true' } });
  for (let i = 0; i < count; i += 1) field.append(candle());
  return field;
}

export function candle(className = '') {
  return el('div', { class: `candle ${className}`.trim(), attrs: { 'aria-hidden': 'true' } }, [
    el('span', { class: 'candle__glow' }),
    el('span', { class: 'candle__flame' }),
    el('span', { class: 'candle__body' }),
  ]);
}

// ==========================================================================
// Envelope + letter
// ==========================================================================

/** Sealed envelope with the wax seal as the primary action. */
export function envelope({ copy, onOpen }) {
  const seal = el('button', {
    class: 'seal',
    attrs: { type: 'button', 'aria-label': copy.sealLabel },
    on: { click: onOpen },
  }, [
    svg('sealShape'),
    el('span', { class: 'seal__monogram', text: copy.monogram, attrs: { 'aria-hidden': 'true' } }),
  ]);

  const address = el('address', { class: 'envelope__address' }, [
    el('span', { class: 'envelope__to', text: copy.addressTo }),
    el('span', { class: 'envelope__name', text: copy.addressName }),
    ...copy.addressLines.map((line) => el('span', { class: 'envelope__line', text: line })),
  ]);

  return el('div', { class: 'envelope surface-light' }, [svg('envelopeFolds'), address, seal]);
}

/** The opened parchment letter. */
export function letter({ copy, onStart }) {
  const titleId = nextId('letter-title');
  return el('article', { class: 'letter surface-light', attrs: { 'aria-labelledby': titleId } }, [
    el('div', { class: 'letter__content' }, [
      heading(copy.title, 'letter__title', { id: titleId }),
      el('hr', { class: 'letter__rule' }),
      el('p', { class: 'letter__greeting', text: copy.greeting }),
      ...copy.paragraphs.map((p) => el('p', { class: 'letter__body', text: p })),
      el('p', { class: 'letter__signoff' }, [
        el('span', { class: 'letter__signoff-line', text: copy.signoff }),
        el('span', { class: 'letter__signature', text: copy.signature }),
      ]),
      button({ label: copy.cta, onClick: onStart, className: 'btn--block' }),
    ]),
  ]);
}

// ==========================================================================
// Question pieces
// ==========================================================================

/** "Question N of 12" + 12 segments; segments up to N are lit. */
export function progress({ label, current, total }) {
  const segments = el('div', { class: 'progress__segments', attrs: { 'aria-hidden': 'true' } });
  for (let i = 1; i <= total; i += 1) {
    segments.append(el('span', { class: i <= current ? 'progress__seg is-done' : 'progress__seg' }));
  }
  return el('div', { class: 'progress' }, [
    el('p', { class: 'caps-label progress__label', text: label }),
    segments,
  ]);
}

/** A single answer card (role="radio"). */
export function answerCard({ key, label, checked }) {
  return el('div', {
    class: `answer-card${checked ? ' is-selected' : ''}`,
    attrs: { role: 'radio', 'aria-checked': checked ? 'true' : 'false', tabindex: '-1' },
  }, [
    el('span', { class: 'answer-card__badge', text: key, attrs: { 'aria-hidden': 'true' } }),
    el('span', { class: 'answer-card__label', text: label }),
  ]);
}

/**
 * Radiogroup of answer cards with roving tabindex.
 * Arrows move focus; Space/Enter select; 1–4 and A–D select from anywhere
 * on the screen (wired by the screen via `selectByKey`).
 */
export function answerGroup({ labelledBy, answers, keys, selectedId, onSelect }) {
  const group = el('div', {
    class: 'answers',
    attrs: { role: 'radiogroup', 'aria-labelledby': labelledBy },
  });

  const cards = answers.map((a, i) => {
    const card = answerCard({ key: keys[i], label: a.label, checked: a.id === selectedId });
    card.addEventListener('click', () => choose(i));
    group.append(card);
    return card;
  });

  const startIndex = Math.max(0, answers.findIndex((a) => a.id === selectedId));
  cards[startIndex].tabIndex = 0;

  let locked = false;

  function focusCard(i) {
    cards.forEach((c, j) => { c.tabIndex = j === i ? 0 : -1; });
    cards[i].focus();
  }

  function choose(i) {
    if (locked) return;
    locked = true;
    cards.forEach((c, j) => {
      const on = j === i;
      c.classList.toggle('is-selected', on);
      c.setAttribute('aria-checked', on ? 'true' : 'false');
      c.tabIndex = on ? 0 : -1;
    });
    group.setAttribute('aria-disabled', 'true');
    onSelect(answers[i]);
  }

  group.addEventListener('keydown', (e) => {
    const i = cards.indexOf(document.activeElement);
    if (i === -1) return;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      focusCard((i + 1) % cards.length);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      focusCard((i - 1 + cards.length) % cards.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      focusCard(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      focusCard(cards.length - 1);
    } else if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      choose(i);
    }
  });

  return {
    node: group,
    selectByKey(key) {
      const k = key.toUpperCase();
      let i = keys.indexOf(k);
      if (i === -1 && /^[1-4]$/.test(k)) i = Number(k) - 1;
      if (i >= 0 && i < cards.length) choose(i);
      return i >= 0;
    },
  };
}

// ==========================================================================
// Sorting pieces
// ==========================================================================

/** Four blurred house-colour orbs on one rotating ring. */
export function orbRing() {
  return el('div', { class: 'orb-ring', attrs: { 'aria-hidden': 'true' } }, [
    el('span', { class: 'orb orb--gryffindor' }),
    el('span', { class: 'orb orb--hufflepuff' }),
    el('span', { class: 'orb orb--ravenclaw' }),
    el('span', { class: 'orb orb--slytherin' }),
  ]);
}

export function hat({ alt, className = '' }) {
  return el('img', {
    class: `hat ${className}`.trim(),
    attrs: { src: 'assets/hat.png', alt, width: 760, height: 692, decoding: 'async' },
  });
}

export function thinkingDots() {
  return el('div', { class: 'thinking-dots', attrs: { 'aria-hidden': 'true' } }, [
    el('span', { class: 'thinking-dots__dot' }),
    el('span', { class: 'thinking-dots__dot' }),
    el('span', { class: 'thinking-dots__dot' }),
  ]);
}

// ==========================================================================
// Result pieces
// ==========================================================================

/** Trait card: caps label + one line of body copy. */
export function traitCard({ label, text }) {
  return el('div', { class: 'trait-card surface-light' }, [
    el('h2', { class: 'trait-card__label', text: label }),
    el('p', { class: 'trait-card__text', text }),
  ]);
}

/**
 * House crest. A dashed shield with the house initial shows immediately;
 * the crest image fades in over it when it loads. If it fails, the outline
 * stays and the caption goes. `forcePending` keeps the loading state (preview).
 */
export function crest({ src, alt, initial, pendingCaption, forcePending = false }) {
  const caption = el('p', { class: 'crest__caption', text: pendingCaption });
  const fallback = el('div', { class: 'crest__fallback', attrs: { 'aria-hidden': 'true' } }, [
    svg('shield'),
    el('span', { class: 'crest__initial', text: initial }),
  ]);
  const frame = el('div', { class: 'crest__frame' }, [fallback]);
  const node = el('figure', { class: 'crest' }, [el('span', { class: 'crest__glow', attrs: { 'aria-hidden': 'true' } }), frame, caption]);

  if (forcePending) {
    node.setAttribute('role', 'img');
    node.setAttribute('aria-label', alt);
    return node;
  }

  const img = el('img', {
    class: 'crest__image',
    attrs: { alt, width: 575, height: 575, decoding: 'async' },
  });

  const loaded = () => {
    node.classList.add('is-loaded');
    caption.remove();
  };
  const failed = () => {
    node.classList.add('is-failed');
    caption.remove();
    img.remove();
    node.setAttribute('role', 'img');
    node.setAttribute('aria-label', alt);
  };

  img.addEventListener('load', loaded, { once: true });
  img.addEventListener('error', failed, { once: true });
  img.src = src;
  frame.append(img);

  // Cached: show at once, no fade, no caption flash.
  if (img.complete && img.naturalWidth > 0) {
    node.classList.add('is-instant');
    loaded();
  }

  return node;
}

// ==========================================================================
// Toast (one at a time, bottom-centre, 3s)
// ==========================================================================

let toastTimer;
let toastHost;

export function toastRegion() {
  toastHost = el('div', { class: 'toast-region', attrs: { role: 'status', 'aria-live': 'polite' } });
  return toastHost;
}

export function showToast({ text, icon }) {
  if (!toastHost) return;
  window.clearTimeout(toastTimer);
  toastHost.replaceChildren(el('div', { class: 'toast surface-light' }, [
    svg(icon),
    el('span', { class: 'toast__text', text }),
  ]));
  toastTimer = window.setTimeout(() => {
    const t = toastHost.firstElementChild;
    if (!t) return;
    t.classList.add('is-hiding');
    t.addEventListener('animationend', () => t.remove(), { once: true });
    window.setTimeout(() => t.remove(), token('--dur-toast') + 50); // reduced motion: no animationend guarantee
  }, token('--toast-hold'));
}

// ==========================================================================
// Dialog (modal card over a dimmed screen)
// ==========================================================================

/**
 * Modal dialog. Focus starts on the primary action, Tab is trapped,
 * Escape runs `onEscape`. Everything in `inertTargets` is made inert.
 */
export function dialog({ title, body, primary, secondary, onEscape, inertTargets = [] }) {
  const titleId = nextId('dialog-title');
  const bodyId = nextId('dialog-body');

  const primaryBtn = button({ label: primary.label, onClick: () => close(primary.onClick) });
  const secondaryBtn = button({ label: secondary.label, variant: 'text', onClick: () => close(secondary.onClick) });

  const card = el('div', {
    class: 'dialog__card surface-light',
    attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': titleId, 'aria-describedby': bodyId },
  }, [
    heading(title, 'dialog__title', { id: titleId, focusable: false }),
    el('p', { class: 'dialog__body', text: body, attrs: { id: bodyId } }),
    actions([primaryBtn, secondaryBtn], 'actions--center'),
  ]);

  const node = el('div', { class: 'dialog' }, [el('div', { class: 'dialog__dim' }), card]);

  inertTargets.forEach((t) => { t.inert = true; });

  function close(fn) {
    document.removeEventListener('keydown', onKey);
    inertTargets.forEach((t) => { t.inert = false; });
    fn();
  }

  function onKey(e) {
    if (e.key === 'Escape') {
      e.preventDefault();
      close(onEscape);
    } else if (e.key === 'Tab') {
      const items = [primaryBtn, secondaryBtn];
      const i = items.indexOf(document.activeElement);
      e.preventDefault();
      const next = e.shiftKey ? (i <= 0 ? items.length - 1 : i - 1) : (i + 1) % items.length;
      items[next].focus();
    }
  }

  document.addEventListener('keydown', onKey);

  return {
    node,
    focus: () => primaryBtn.focus(),
    destroy: () => {
      document.removeEventListener('keydown', onKey);
      inertTargets.forEach((t) => { t.inert = false; });
    },
  };
}
