// One factory per screen. Each returns
// { node, candles, atmosphere, house?, footer?, onShow?, cleanup? }.

import { COPY, QUESTIONS, TOTAL_QUESTIONS, RESULTS, SORTING_LINES } from './data.js';
import {
  el, heading, capsLabel, button, actions, nextId, candle,
  envelope, letter, progress, answerGroup, orbRing, hat, thinkingDots,
  traitCard, crest, dialog, showToast,
} from './components.js';
import { go, token, prefersReducedMotion } from './router.js';
import { store } from './store.js';
import { scoreAnswers } from './scoring.js';

// ==========================================================================
// 01 · The letter arrives (+ E2 welcome back)
// ==========================================================================

export function letterArrives({ welcomeBack = null } = {}) {
  const c = COPY.envelope;
  const titleId = nextId('arrives-title');

  const content = el('div', { class: 'arrives__content' }, [
    el('header', { class: 'arrives__heading' }, [
      capsLabel(c.eyebrow, 'arrives__eyebrow'),
      heading(c.title, 'display arrives__title', { id: titleId }),
    ]),
    envelope({
      copy: c,
      onOpen: () => go('letterOpened', {}, { transition: 'reveal' }),
    }),
    el('p', { class: 'whisper arrives__hint', text: c.hint }),
  ]);

  const node = el('section', { class: 'screen--arrives', attrs: { 'aria-labelledby': titleId } }, [content]);

  let modal = null;
  if (welcomeBack) {
    const w = COPY.welcomeBack;
    const footer = document.querySelector('[data-disclaimer]');
    modal = dialog({
      title: w.title,
      body: w.body(welcomeBack.answered, TOTAL_QUESTIONS),
      primary: { label: w.resume, onClick: welcomeBack.onResume },
      secondary: { label: w.restart, onClick: welcomeBack.onRestart },
      onEscape: welcomeBack.onResume,
      inertTargets: [content, footer],
    });
    node.append(modal.node);
    node.classList.add('has-dialog');
  }

  return {
    node,
    candles: 8,
    atmosphere: 'landing',
    focusHeading: !modal,
    onShow: () => modal?.focus(),
    cleanup: () => modal?.destroy(),
  };
}

// ==========================================================================
// 02 · The letter, opened
// ==========================================================================

export function letterOpened() {
  const node = el('section', { class: 'screen--opened' }, [
    letter({
      copy: COPY.letter,
      onStart: () => go('question', { index: 0 }),
    }),
  ]);

  return { node, candles: 8, atmosphere: 'letter' };
}

// ==========================================================================
// 03 · Question
// ==========================================================================

export function question({ index = 0 } = {}) {
  // Never skip ahead of the first unanswered question (FR-05).
  const i = Math.min(Math.max(0, index), store.firstUnanswered());
  const q = store.questions()[i];
  const c = COPY.question;
  const titleId = nextId('question-title');

  const back = button({
    label: c.back,
    variant: 'text',
    icon: 'arrowLeft',
    className: 'question__back',
    onClick: () => (i === 0
      ? go('letterOpened')
      : go('question', { index: i - 1 })),
  });

  const group = answerGroup({
    labelledBy: titleId,
    answers: q.answers,
    keys: c.answerKeys,
    selectedId: store.answerAt(i),
    onSelect: (answer) => {
      store.setAnswer(i, answer.id);
      window.setTimeout(advance, token('--dur-select') + token('--dur-advance'));
    },
  });

  function advance() {
    if (i < TOTAL_QUESTIONS - 1) {
      go('question', { index: i + 1 });
    } else if (store.isComplete()) {
      go(prefersReducedMotion() ? 'result' : 'sorting', {});
    } else {
      go('question', { index: store.firstUnanswered() });
    }
  }

  function onKey(e) {
    if (e.altKey || e.ctrlKey || e.metaKey || e.repeat) return;
    if (/^[1-4a-dA-D]$/.test(e.key) && group.selectByKey(e.key)) e.preventDefault();
  }
  document.addEventListener('keydown', onKey);

  const node = el('section', { class: 'screen--question', attrs: { 'aria-labelledby': titleId } }, [
    el('div', { class: 'question__bar' }, [
      back,
      progress({ label: c.progress(i + 1, TOTAL_QUESTIONS), current: i + 1, total: TOTAL_QUESTIONS }),
    ]),
    el('div', { class: 'question-sheet surface-light' }, [
      heading(q.prompt, 'question-sheet__prompt', { id: titleId }),
      group.node,
    ]),
  ]);

  return {
    node,
    candles: 0,
    atmosphere: 'question',
    cleanup: () => document.removeEventListener('keydown', onKey),
  };
}

// ==========================================================================
// 04 · Sorting moment
// ==========================================================================

export function sorting() {
  const house = scoreAnswers(store.answers(), store.questions());
  const line = SORTING_LINES[Math.floor(Math.random() * SORTING_LINES.length)];
  const c = COPY.sorting;

  const lineSlot = el('div', { class: 'sorting__line-slot', attrs: { 'aria-live': 'polite' } });

  const node = el('section', { class: 'screen--sorting' }, [
    el('div', { class: 'sorting__visual' }, [
      el('div', { class: 'sorting__stage', attrs: { 'aria-hidden': 'true' } }, [
        orbRing(),
        el('span', { class: 'sorting__glow' }),
      ]),
      hat({ alt: c.hatAlt, className: 'sorting__hat' }),
    ]),
    el('div', { class: 'sorting__speaks' }, [
      lineSlot,
      capsLabel(c.caption, 'sorting__caption'),
      thinkingDots(),
    ]),
  ]);

  let timer;

  return {
    node,
    candles: 0,
    atmosphere: 'sorting',
    focusHeading: false,
    onShow: () => {
      // Inserted after mount so the live region announces it.
      lineSlot.append(heading(`“${line}”`, 'sorting__line', { focusable: false }));
      timer = window.setTimeout(() => go('result', { house }), token('--dur-sorting'));
    },
    cleanup: () => window.clearTimeout(timer),
  };
}

// ==========================================================================
// 05 · Result
// ==========================================================================

export function result({ house = null, preview = {} } = {}) {
  const h = house ?? scoreAnswers(store.answers(), store.questions());
  const r = RESULTS[h];
  const c = COPY.result;
  const titleId = nextId('result-title');

  if (!preview.active) store.markFinished();

    const share = button({
    label: c.share,
    onClick: () => openScreenshotPopup(node, share),
  });

  const restart = button({
    label: c.restart,
    variant: 'text',
    onClick: () => {
      if (!preview.active) store.clear();
      go('letterArrives');
    },
  });

  const node = el('section', { class: 'screen--result', attrs: { 'aria-labelledby': titleId, 'data-house': h } }, [
    crest({
      src: r.crest,
      alt: r.crestAlt,
      initial: r.initial,
      pendingCaption: c.crestPending,
      forcePending: Boolean(preview.crestMissing),
    }),
    el('div', { class: 'result__content' }, [
      capsLabel(c.eyebrow, 'result__eyebrow'),
      heading(r.headline, 'display result__headline', { id: titleId }),
      el('p', { class: 'whisper result__subheading', text: r.subheading }),
      el('p', { class: 'result__description', text: r.description }),
      el('div', { class: 'result__traits' }, [
        traitCard({ label: c.superpowerLabel, text: r.superpower }),
        traitCard({ label: c.flawLabel, text: r.flaw }),
        traitCard({ label: c.habitLabel, text: r.habit }),
      ]),
      actions([share, restart], 'result__actions'),
    ]),
  ]);

  return {
    node,
    candles: 0,
    atmosphere: 'result',
    house: h,
    footer: 'long',
        onShow: () => {
      if (preview.screenshotPopup) openScreenshotPopup(node, share);
    },
  };
}

/** E4: "Take a screenshot" opens the brewing-potion popup. */
function openScreenshotPopup(screen, trigger) {
  const p = COPY.screenshotPopup;
  const footer = document.querySelector('[data-disclaimer]');
  let modal = null;

  const shut = () => {
    modal.node.remove();
    trigger.focus();
  };

  modal = dialog({
    title: p.title,
    body: p.body,
    list: p.shortcuts,
    image: p.image,
    primary: { label: p.close, onClick: shut },
    secondary: { label: p.copyLink, onClick: () => { shut(); copyQuizLink(); } },
    onEscape: shut,
    dismissOnDim: true,
    inertTargets: [...screen.children, footer].filter(Boolean),
  });

  screen.append(modal.node);
  modal.focus();
}

async function copyQuizLink() {
  try {
    if (!navigator.clipboard || !window.isSecureContext) throw new Error('No clipboard');
    await navigator.clipboard.writeText(shareUrl());
    showToast({ text: COPY.toasts.linkCopied, icon: 'check' });
  } catch {
    showToast({ text: COPY.toasts.linkBlocked, icon: 'sparkle' });
  }
}

function shareUrl() {
  const { origin, pathname } = window.location;
  return `${origin}${pathname.replace(/(index|404)\.html$/, '')}`;
}

// ==========================================================================
// E1a / E1b · Slow load
// ==========================================================================

export function slowLoad() {
  const c = COPY.slowLoad;
  const node = el('section', { class: 'screen--loading' }, [
    candle('candle--solo'),
    el('div', { class: 'loading__content loading__content--fade' }, [
      heading(c.title, 'whisper loading__title', { focusable: false }),
      capsLabel(c.caption, 'loading__caption'),
    ]),
  ]);
  return { node, candles: 0, atmosphere: 'loading', focusHeading: false };
}

export function verySlowLoad() {
  const c = COPY.verySlowLoad;
  const node = el('section', { class: 'screen--loading' }, [
    candle('candle--solo'),
    el('div', { class: 'loading__content loading__content--fade' }, [
      heading(c.title, 'whisper loading__title', { focusable: false }),
      el('p', { class: 'loading__body', text: c.body }),
      button({ label: c.retry, onClick: () => window.location.reload() }),
    ]),
  ]);
  return { node, candles: 0, atmosphere: 'loading', focusHeading: false };
}

// ==========================================================================
// E5 · Something went wrong
// ==========================================================================

export function error({ storageFailed = store.storageFailed(), preview = false } = {}) {
  const c = COPY.error;
  const titleId = nextId('error-title');

  const node = el('section', { class: 'screen--error', attrs: { 'aria-labelledby': titleId } }, [
    hat({ alt: c.hatAlt, className: 'error__hat' }),
    heading(c.title, 'error__title', { id: titleId }),
    el('p', { class: 'error__body', text: storageFailed ? c.bodyNoStorage : c.body }),
    actions([
      button({
        label: c.retry,
        onClick: () => {
          if (!preview) store.requestResume();
          window.location.reload();
        },
      }),
      button({
        label: c.restart,
        variant: 'text',
        onClick: () => {
          if (!preview) store.clear();
          go('letterOpened');
        },
      }),
    ], 'actions--center'),
  ]);

  return { node, candles: 0, atmosphere: 'error' };
}
