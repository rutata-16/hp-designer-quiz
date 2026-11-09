// Pure scoring (PRD §7). No DOM, no storage, no side effects.

import { QUESTIONS, HOUSES } from './data.js';

/**
 * Resolve a list of answer ids (in question order) to their houses.
 * Throws if any id is missing or unknown.
 */
export function housesFor(answerIds, questions = QUESTIONS) {
  if (!Array.isArray(answerIds) || answerIds.length !== questions.length) {
    throw new Error(`Expected ${questions.length} answers`);
  }
  return answerIds.map((id, i) => {
    const answer = questions[i].answers.find((a) => a.id === id);
    if (!answer) throw new Error(`Unknown answer "${id}" for ${questions[i].id}`);
    return answer.house;
  });
}

/**
 * One point per answer. Highest score wins. Ties: walk answers from the last
 * question backwards; the first answer that maps to a tied house wins.
 */
export function scoreAnswers(answerIds, questions = QUESTIONS) {
  const houses = housesFor(answerIds, questions);

  const scores = Object.fromEntries(HOUSES.map((h) => [h, 0]));
  houses.forEach((house) => { scores[house] += 1; });

  const max = Math.max(...Object.values(scores));
  const winners = HOUSES.filter((h) => scores[h] === max);
  if (winners.length === 1) return winners[0];

  for (let i = houses.length - 1; i >= 0; i -= 1) {
    if (winners.includes(houses[i])) return houses[i];
  }
  // Unreachable: every winner scored at least once.
  return winners[0];
}

/** Exposed for tests and debugging. */
export function tally(answerIds, questions = QUESTIONS) {
  const scores = Object.fromEntries(HOUSES.map((h) => [h, 0]));
  housesFor(answerIds, questions).forEach((h) => { scores[h] += 1; });
  return scores;
}
