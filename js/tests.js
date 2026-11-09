// Scoring tests, rendered by tests.html.

import { QUESTIONS, QUESTIONS_B, QUESTION_POOL, HOUSES, RESULTS, TOTAL_QUESTIONS } from './data.js';
import { scoreAnswers, tally } from './scoring.js';

const results = [];

function test(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
  } catch (err) {
    results.push({ name, ok: false, message: err.message });
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function equal(actual, expected, label = '') {
  assert(actual === expected, `${label} expected "${expected}", got "${actual}"`);
}

/** Pick the answer id for question i that maps to `house`. */
function pick(i, house) {
  return QUESTIONS[i].answers.find((a) => a.house === house).id;
}

/** Build a full answer set from a list of 12 houses. */
function fromHouses(houses) {
  return houses.map((h, i) => pick(i, h));
}

const G = 'gryffindor';
const H = 'hufflepuff';
const R = 'ravenclaw';
const S = 'slytherin';

// ---- Data integrity ----

test(`There are exactly ${TOTAL_QUESTIONS} questions`, () => {
  equal(QUESTIONS.length, TOTAL_QUESTIONS, 'question count');
});

test('Every question has 4 answers, one per house', () => {
  QUESTIONS.forEach((q) => {
    equal(q.answers.length, 4, `${q.id} answer count`);
    const houses = q.answers.map((a) => a.house).sort().join();
    equal(houses, [...HOUSES].sort().join(), `${q.id} houses`);
  });
});

test('Every answer maps to exactly one valid house and has a unique id', () => {
  const ids = new Set();
  QUESTIONS.forEach((q) => q.answers.forEach((a) => {
    assert(HOUSES.includes(a.house), `${a.id} has invalid house "${a.house}"`);
    assert(!ids.has(a.id), `duplicate answer id ${a.id}`);
    ids.add(a.id);
  }));
});

test('Every house has complete result copy', () => {
  HOUSES.forEach((h) => {
    const r = RESULTS[h];
    ['headline', 'subheading', 'description', 'superpower', 'flaw', 'habit', 'crest', 'initial']
      .forEach((field) => assert(r && r[field], `${h} missing ${field}`));
  });
});

// ---- Every house can win ----

HOUSES.forEach((house) => {
  test(`All-${house} answers → ${house}`, () => {
    equal(scoreAnswers(fromHouses(Array(12).fill(house))), house);
  });
});

// ---- Clear winner ----

test('Clear winner (5 R, 3 G, 2 H, 2 S) → ravenclaw', () => {
  const set = fromHouses([R, G, R, H, R, S, G, R, H, S, R, G]);
  const scores = tally(set);
  equal(scores.ravenclaw, 5, 'ravenclaw score');
  equal(scoreAnswers(set), R);
});

test('Clear winner wins even when Q12 points elsewhere', () => {
  const set = fromHouses([S, S, S, S, S, G, H, R, G, H, R, G]);
  equal(scoreAnswers(set), S);
});

// ---- Ties ----

test('Two-way tie resolved by Q12', () => {
  // G 4, H 4, R 2, S 2; Q12 = H
  const set = fromHouses([G, G, G, G, R, R, S, S, H, H, H, H]);
  equal(scoreAnswers(set), H);
});

test('Two-way tie where Q12 is not tied → walks back to Q11', () => {
  // G 4, H 4, R 3, S 1; Q12 = R (not tied), Q11 = G
  const set = fromHouses([H, H, H, H, G, G, G, R, R, S, G, R]);
  const scores = tally(set);
  equal(scores.gryffindor, 4, 'G');
  equal(scores.hufflepuff, 4, 'H');
  equal(scoreAnswers(set), G);
});

test('Three-way tie (G 4, H 4, R 4) → Q12 house wins', () => {
  // G 4, H 4, R 4, S 0 → Q12 = R
  const set = fromHouses([G, H, R, G, H, R, G, H, R, G, H, R]);
  equal(scoreAnswers(set), R);
});

test('Three-way tie (G 4, H 4, S 4), different Q12 → that house wins', () => {
  // With 12 questions a three-way tie is always 4/4/4/0, so Q12 is always a tied house.
  const set = fromHouses([G, G, S, S, H, G, S, H, G, H, S, H]);
  const scores = tally(set);
  equal(scores.gryffindor, 4, 'G');
  equal(scores.hufflepuff, 4, 'H');
  equal(scores.slytherin, 4, 'S');
  equal(scoreAnswers(set), H);
});

test('Four-way tie (3/3/3/3) → Q12 house wins', () => {
  const set = fromHouses([G, H, R, S, G, H, R, S, G, H, R, S]);
  equal(scoreAnswers(set), S);
});

test('Four-way tie, different Q12 → that house wins', () => {
  const set = fromHouses([S, R, H, G, S, R, H, G, S, R, H, G]);
  equal(scoreAnswers(set), G);
});

// ---- Determinism ----

test('Same answers always return the same house (100 runs)', () => {
  const set = fromHouses([G, H, R, S, G, H, R, S, G, H, R, S]);
  const first = scoreAnswers(set);
  for (let i = 0; i < 100; i += 1) equal(scoreAnswers(set), first, `run ${i}`);
});

test('Random answer sets are deterministic and always return a valid house', () => {
  let seed = 42;
  const rand = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  for (let n = 0; n < 500; n += 1) {
    const set = QUESTIONS.map((q) => q.answers[Math.floor(rand() * 4)].id);
    const a = scoreAnswers(set);
    assert(HOUSES.includes(a), `invalid house ${a}`);
    equal(scoreAnswers(set), a, 'repeat');
  }
});

// ---- Question pool (variant B) ----

test(`There are exactly ${TOTAL_QUESTIONS} variant B questions`, () => {
  equal(QUESTIONS_B.length, TOTAL_QUESTIONS, 'variant B count');
});

test('Every variant B question has 4 answers, one per house', () => {
  QUESTIONS_B.forEach((q) => {
    equal(q.answers.length, 4, `${q.id} answer count`);
    const houses = q.answers.map((a) => a.house).sort().join();
    equal(houses, [...HOUSES].sort().join(), `${q.id} houses`);
  });
});

test('All 24 questions have unique question and answer ids', () => {
  const ids = new Set();
  [...QUESTIONS, ...QUESTIONS_B].forEach((q) => {
    assert(!ids.has(q.id), `duplicate question id ${q.id}`);
    ids.add(q.id);
    q.answers.forEach((a) => {
      assert(!ids.has(a.id), `duplicate answer id ${a.id}`);
      ids.add(a.id);
    });
  });
});

test('Each slot pairs two questions from the same dimension', () => {
  QUESTION_POOL.forEach(([a, b], slot) => {
    equal(b.dimension, a.dimension, `slot ${slot + 1} dimension`);
  });
});

test('Every random mix has 12 questions, two per dimension', () => {
  for (let n = 0; n < 200; n += 1) {
    const mix = QUESTION_POOL.map((pair) => pair[Math.random() < 0.5 ? 0 : 1]);
    equal(mix.length, TOTAL_QUESTIONS, 'mix length');
    const counts = {};
    mix.forEach((q) => { counts[q.dimension] = (counts[q.dimension] || 0) + 1; });
    Object.values(counts).forEach((c) => equal(c, 2, 'per dimension'));
  }
});

test('Mixed quizzes score correctly, including ties', () => {
  const mix = QUESTION_POOL.map((pair, i) => pair[i % 2]); // A, B, A, B…
  const byHouse = (house) => mix.map((q) => q.answers.find((a) => a.house === house).id);
  HOUSES.forEach((house) => equal(scoreAnswers(byHouse(house), mix), house, `all-${house}`));

  // 3 each, ordered G H R S G H R S…: slot 12 is Slytherin, so Slytherin wins the tie.
  const order = ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'];
  const tied = mix.map((q, i) => q.answers.find((a) => a.house === order[i % 4]).id);
  equal(scoreAnswers(tied, mix), 'slytherin', 'four-way tie');
});

// ---- Validation ----

test('Incomplete answers are rejected (FR-05)', () => {
  let threw = false;
  try { scoreAnswers(Array(11).fill('q1a')); } catch { threw = true; }
  assert(threw, 'expected an error for 11 answers');
});

test('Unknown answer ids are rejected', () => {
  let threw = false;
  const set = fromHouses(Array(12).fill(G));
  set[3] = 'nope';
  try { scoreAnswers(set); } catch { threw = true; }
  assert(threw, 'expected an error for unknown id');
});

// ---- Render ----

const list = document.querySelector('[data-test-list]');
const summary = document.querySelector('[data-test-summary]');

results.forEach((r) => {
  const li = document.createElement('li');
  li.className = r.ok ? 'test test--pass' : 'test test--fail';
  li.textContent = `${r.ok ? 'PASS' : 'FAIL'} · ${r.name}${r.ok ? '' : ` — ${r.message}`}`;
  list.append(li);
});

const failed = results.filter((r) => !r.ok).length;
summary.textContent = failed
  ? `${failed} of ${results.length} tests failed`
  : `All ${results.length} tests passed`;
summary.className = failed ? 'test-summary test-summary--fail' : 'test-summary test-summary--pass';
document.title = `${failed ? '✗' : '✓'} Scoring tests`;
