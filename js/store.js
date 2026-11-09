// Quiz progress, backed by sessionStorage with a silent in-memory fallback.

import { TOTAL_QUESTIONS } from './data.js';

const KEY = 'designers-sorting-hat:v1';
const RESUME_KEY = 'designers-sorting-hat:resume';

const blank = () => ({ answers: Array(TOTAL_QUESTIONS).fill(null), finished: false });

let memory = blank();
let storageOk = true;

function read() {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.answers) || parsed.answers.length !== TOTAL_QUESTIONS) {
      return blank();
    }
    return { answers: parsed.answers, finished: Boolean(parsed.finished) };
  } catch {
    storageOk = false;
    return memory;
  }
}

function write(state) {
  memory = state;
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    storageOk = false;
  }
}

memory = read();

export const store = {
  answers() {
    return [...memory.answers];
  },
  answerAt(index) {
    return memory.answers[index] ?? null;
  },
  setAnswer(index, answerId) {
    const answers = [...memory.answers];
    answers[index] = answerId;
    write({ answers, finished: false });
  },
  answeredCount() {
    return memory.answers.filter(Boolean).length;
  },
  firstUnanswered() {
    const i = memory.answers.findIndex((a) => !a);
    return i === -1 ? TOTAL_QUESTIONS - 1 : i;
  },
  isComplete() {
    return memory.answers.every(Boolean);
  },
  isFinished() {
    return memory.finished;
  },
  markFinished() {
    write({ ...memory, finished: true });
  },
  /** True when a quiz was started but not finished (drives E2). */
  hasUnfinished() {
    return !memory.finished && memory.answers.some(Boolean);
  },
  clear() {
    write(blank());
  },
  storageFailed() {
    return !storageOk;
  },
  /** E5 "Try again": remember to skip the welcome-back card after reload. */
  requestResume() {
    try { window.sessionStorage.setItem(RESUME_KEY, '1'); } catch { /* in-memory only */ }
  },
  takeResumeRequest() {
    try {
      const v = window.sessionStorage.getItem(RESUME_KEY) === '1';
      window.sessionStorage.removeItem(RESUME_KEY);
      return v;
    } catch {
      return false;
    }
  },
};
