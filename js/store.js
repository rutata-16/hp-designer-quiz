// Quiz progress, backed by sessionStorage with a silent in-memory fallback.

import { TOTAL_QUESTIONS, QUESTION_POOL } from './data.js';

const KEY = 'designers-sorting-hat:v2';
const RESUME_KEY = 'designers-sorting-hat:resume';

// picks[slot] is 0 (variant A) or 1 (variant B), chosen at random per quiz.
const randomPicks = () => QUESTION_POOL.map(() => (Math.random() < 0.5 ? 0 : 1));
const blank = () => ({ answers: Array(TOTAL_QUESTIONS).fill(null), picks: randomPicks(), finished: false });

let memory = blank();
let storageOk = true;

function read() {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    if (!raw) return blank();
    const parsed = JSON.parse(raw);
        if (
      !parsed
      || !Array.isArray(parsed.answers) || parsed.answers.length !== TOTAL_QUESTIONS
      || !Array.isArray(parsed.picks) || parsed.picks.length !== TOTAL_QUESTIONS
    ) {
      return blank();
    }
    return { answers: parsed.answers, picks: parsed.picks, finished: Boolean(parsed.finished) };
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
    write({ ...memory, answers, finished: false });
  },
  /** The 12 questions chosen for this quiz, in slot order. */
  questions() {
    return QUESTION_POOL.map((pair, slot) => pair[memory.picks[slot]]);
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
