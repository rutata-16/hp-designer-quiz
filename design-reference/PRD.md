# Product Requirements Document
## The Designer's Sorting Hat
**Working title:** Based on Your Design Habits, Which Hogwarts House Do You Belong To?

**Version:** 1.0  
**Status:** Concept and MVP specification  
**Product type:** Interactive personality quiz  
**Primary audience:** Designers, UX practitioners, product designers and design enthusiasts

---

# 1. Product overview

## 1.1 Product vision

Create a short, entertaining personality quiz that sorts designers into one of four Hogwarts houses based on their design habits, creative preferences and working instincts.

The experience combines the nostalgia of classic Harry Potter personality quizzes with self-aware designer humour, relatable design scenarios and a playful magical reveal.

The product should feel like an internet quiz someone discovers, enjoys, shares with friends and remembers—not a formal UX assessment or professional competency test.

## 1.2 Problem statement

Designers frequently encounter personality quizzes that are either generic or focused on professional skills and career development. This concept offers a lighter alternative: a quiz that reflects the quirks, preferences and contradictions of design practice.

It does not attempt to assess design competence. It gives designers a fun way to recognise themselves in familiar situations.

## 1.3 Product promise

**Discover your Hogwarts house through the way you design, make decisions and react to the little things that other people might not even notice.**

## 1.4 Product principles

1. **Fun over function:** Entertainment is the primary value.
2. **Recognition over evaluation:** Answers reveal preferences, not competence.
3. **Equal dignity across houses:** No house is presented as the objectively superior designer.
4. **Whimsy with purpose:** Magical aesthetics support the experience rather than overwhelm it.
5. **Quick gratification:** Users can complete the quiz and see their result in approximately three minutes.
6. **Shareability by design:** Results should be amusing and visually compelling enough to share.

# 2. Target audience

### Primary audience

- UX and product designers.
- UI designers and design-system practitioners.
- Design students and early-career practitioners.
- Creative technologists and design enthusiasts.

### Audience motivations

- Nostalgia for personality quizzes.
- Curiosity about their design personality.
- Enjoyment of designer-specific humour.
- Sharing results and comparing them with colleagues.
- Taking a short, entertaining break.

### Core user story

"As a designer, I want to answer a few funny, relatable questions about how I work so that I can discover my Hogwarts house and share the result with other designers."

# 3. Scope

## 3.1 MVP features

- Introductory landing page.
- Twelve single-select questions.
- Progress indicator.
- Answer selection and navigation.
- Deterministic house-scoring engine.
- Four distinct house result pages or result states.
- Tie-breaking logic.
- Restart quiz functionality.
- Shareable result card or shareable result text.
- Responsive desktop and mobile experience.
- Accessible keyboard navigation and readable contrast.

## 3.2 Out of scope for MVP

- User accounts and login.
- Backend or database.
- Saving previous quiz attempts.
- Social leaderboards.
- Personality comparisons across teams.
- Multiple house results or hybrid-house classifications.
- AI-generated results.
- Analytics dashboards.
- User-generated questions.

# 4. Quiz structure

The quiz contains exactly 12 questions, with two questions per dimension.

| Dimension | Questions | What it explores |
|---|---|---|
| UI polish | Q1–Q2 | Visual precision versus pragmatic prioritisation |
| Design process | Q3–Q4 | Structured methods versus adaptive exploration |
| Figma love | Q5–Q6 | Tool loyalty versus tool agnosticism |
| Expertise | Q7–Q8 | Deep specialisation versus broad capabilities |
| Taste | Q9–Q10 | Aesthetic instinct versus process-led judgement |
| AI | Q11–Q12 | Traditional craft versus AI experimentation |

Each question presents four answers. Users select the answer closest to their natural instinct, not the answer they think a good designer should choose.

# 5. The four house archetypes

These are original interpretations created for this quiz.

### Gryffindor — The Bold Maker

**Core traits:** Courage, experimentation, conviction and action.

The designer who would rather test a promising idea than spend another week discussing it. Comfortable challenging assumptions, trying unfamiliar approaches and learning through making.

Design motto: *Make the leap.*

### Hufflepuff — The Thoughtful Craftsperson

**Core traits:** Empathy, diligence, collaboration and care.

The designer who considers the person on the other side of the interface. Values inclusive experiences, thoughtful collaboration and getting the details right for the right reasons.

Design motto: *Make it matter.*

### Ravenclaw — The Curious Architect

**Core traits:** Curiosity, craft, originality and intellectual rigour.

The designer who wants to understand why something works. Enjoys elegant systems, visual precision, design patterns and investigating the reasoning beneath a solution.

Design motto: *Understand it deeply.*

### Slytherin — The Strategic Operator

**Core traits:** Resourcefulness, ambition, adaptability and strategic thinking.

The designer who understands constraints, influence and outcomes. Knows when to compromise, where to invest effort and how to make design decisions count.

Design motto: *Make it count.*

These definitions must remain balanced. The copy must not imply that one house is inherently more talented, creative or employable than another.

# 6. Final question bank and scoring matrix

The following is the proposed MVP question bank. Each answer has one internal house mapping. House names and mappings are never displayed during the quiz.

## Q1 — UI polish

**A tiny visual inconsistency survives into the final review. What bothers you most?**

A. The interface feels unfinished, even if nobody else notices.  
B. It matters if it affects comprehension, usability or accessibility.  
C. It breaks the visual system and makes the design feel less coherent.  
D. It matters only if fixing it would improve the overall outcome.

**Internal mapping:** A → Ravenclaw; B → Hufflepuff; C → Gryffindor; D → Slytherin.

## Q2 — UI polish

**You have one extra hour before handoff. Where does it go?**

A. Check the critical user flows and catch anything that could trip someone up.  
B. Fix the visual details that make the interface feel polished.  
C. Identify the highest-impact improvement and spend the hour there.  
D. Explore one bolder visual direction before the opportunity disappears.

**Internal mapping:** A → Hufflepuff; B → Ravenclaw; C → Slytherin; D → Gryffindor.

## Q3 — Design process

**Your research contradicts the direction you've already designed. What now?**

A. Revisit the assumptions and restructure the process around what you've learned.  
B. Build an alternative immediately. The fastest way to learn is to try it.  
C. Determine which insight changes the outcome and adjust strategically.  
D. Investigate what users are actually struggling with before changing direction.

**Internal mapping:** A → Ravenclaw; B → Gryffindor; C → Slytherin; D → Hufflepuff.

## Q4 — Design process

**Your ideal design process looks like…**

A. A goal-led sequence that adapts to deadlines, constraints and opportunities.  
B. A flexible loop where the next step depends on what I discover.  
C. A collaborative process with research and validation throughout.  
D. A structured sequence that gives each stage the attention it deserves.

**Internal mapping:** A → Slytherin; B → Gryffindor; C → Hufflepuff; D → Ravenclaw.

## Q5 — Figma love

**Your team announces a switch to a new design tool. Your first thought?**

A. Fine, but can it handle our collaboration and accessibility needs?  
B. New tool, new possibilities. Let me break something.  
C. Show me how this improves the workflow before we migrate everything.  
D. But my components! My variables! My lovingly organised files!

**Internal mapping:** A → Hufflepuff; B → Gryffindor; C → Slytherin; D → Ravenclaw.

## Q6 — Figma love

**You need to communicate a complex design idea. What's your first instinct?**

A. Build an interactive prototype in the tool I know inside out.  
B. Choose whichever format makes the idea clearest to the team.  
C. Try a new medium or tool if it helps communicate the idea better.  
D. Find the simplest, most effective way to get everyone aligned.

**Internal mapping:** A → Ravenclaw; B → Hufflepuff; C → Gryffindor; D → Slytherin.

## Q7 — Expertise

**A project needs a specialist skill you don't currently have. What do you do?**

A. Find an expert and collaborate rather than pretend I know everything.  
B. Go deep and learn the skill properly. I like becoming the person people call.  
C. Learn enough to experiment, connect the dots and explore possibilities.  
D. Work out whether developing the skill or bringing in expertise is the smarter investment.

**Internal mapping:** A → Hufflepuff; B → Ravenclaw; C → Gryffindor; D → Slytherin.

## Q8 — Expertise

**Which professional reputation sounds most like you?**

A. The person who can connect design decisions to product and business outcomes.  
B. The person who moves comfortably across research, UI, prototyping and new technologies.  
C. The person who makes the whole team better through collaboration and thoughtful craft.  
D. The person everyone calls for one particularly difficult design problem.

**Internal mapping:** A → Slytherin; B → Gryffindor; C → Hufflepuff; D → Ravenclaw.

## Q9 — Taste

**You encounter a product with excellent usability but mediocre visual design.**

A. I want to understand what users struggle with before deciding what to change.  
B. I immediately start imagining how I'd redesign the entire thing.  
C. I'd identify which improvements would make the greatest difference to the product.  
D. I can see the inconsistencies already. Give me the design file.

**Internal mapping:** A → Hufflepuff; B → Gryffindor; C → Slytherin; D → Ravenclaw.

## Q10 — Taste

**A design is technically correct, but something feels off.**

A. I'll investigate the visual details until I find the thing that's bothering me.  
B. I'll check whether it supports the intended positioning and outcome.  
C. I'll test it with people and see whether the discomfort has a real user impact.  
D. I'll explore alternative directions until something clicks.

**Internal mapping:** A → Ravenclaw; B → Slytherin; C → Hufflepuff; D → Gryffindor.

## Q11 — AI

**AI can generate a decent first draft of your UI in seconds. Your reaction?**

A. I'll evaluate whether it improves the outcome enough to justify using it.  
B. Interesting, but I still want to understand and control the craft myself.  
C. Let me see how far I can push this. What else can it make?  
D. I'll use it where it helps, while checking the result carefully for real user needs.

**Internal mapping:** A → Slytherin; B → Ravenclaw; C → Gryffindor; D → Hufflepuff.

## Q12 — AI

**You have a weekend, a new tool and an idea for a tiny product. What happens?**

A. I use AI-assisted tools to get a working prototype into the world.  
B. I choose the fastest reliable route to test whether the idea is worth pursuing.  
C. I build it carefully, understanding and controlling each important detail.  
D. I collaborate, gather perspectives and make something useful together.

**Internal mapping:** A → Gryffindor; B → Slytherin; C → Ravenclaw; D → Hufflepuff.

---

# 7. Scoring algorithm

## 7.1 Scoring rule

Every selected answer awards exactly one point to its mapped house.

Initial scores:

- Gryffindor = 0
- Hufflepuff = 0
- Ravenclaw = 0
- Slytherin = 0

After each answer, the system records the selection. The final result is calculated after the twelfth answer.

For each question:

`houseScores[mappedHouse] += 1`

No dimension-specific points, secondary-house points, penalties or bonus multipliers are used.

## 7.2 Result calculation

1. Calculate the total score for each house.
2. Identify the house or houses with the highest score.
3. If one house has the highest score, assign that house.
4. If there is a tie, apply the tie-breaking rules below.

The maximum possible score for a house is 12. Since every question offers exactly one answer mapped to each house, all houses have equal scoring opportunities.

## 7.3 Tie-breaking rules

To preserve the 12-question limit:

1. If the highest-scoring house is unique, return it immediately.
2. If two or more houses tie, examine the user's answer to Q12. If that answer maps to one of the tied houses, that house wins.
3. If Q12 does not resolve the tie, examine the remaining answers in reverse order, starting with Q11, until an answer maps to one of the tied houses.
4. Return the house identified by that answer.

This is a deterministic rule: the same set of answers always produces the same result.

The final answer's tie-breaking priority is a product-design choice, not evidence that AI preferences reveal someone's deepest personality. We should test whether it creates a satisfying experience.

## 7.4 Pseudocode

```js
const scores = {
  gryffindor: 0,
  hufflepuff: 0,
  ravenclaw: 0,
  slytherin: 0
};

answers.forEach((answer) => {
  scores[answer.house] += 1;
});

const maxScore = Math.max(...Object.values(scores));

let winners = Object.keys(scores).filter(
  (house) => scores[house] === maxScore
);

let result;

if (winners.length === 1) {
  result = winners[0];
} else {
  const tieBreakOrder = [11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  for (const index of tieBreakOrder) {
    const house = answers[index].house;

    if (winners.includes(house)) {
      result = house;
      break;
    }
  }
}
```

Implementation note: `answers` is an array of the 12 selected answer objects in question order. The array is zero-indexed, so index 11 is Q12.

# 8. Result experience

Each result page must feel like a satisfying reveal rather than a score report.

## Gryffindor — The Bold Maker

**Headline:** You belong in Gryffindor.

**Subheading:** Your best ideas have a suspicious tendency to become actual things.

**Result description:** You thrive on momentum. Give you a half-formed idea, a tight deadline and a prototype tool, and you'll find a way to make something happen. You're willing to experiment, challenge assumptions and learn through doing. Sometimes you ship before you've fully thought it through. Sometimes that's exactly the point.

**Your design superpower:** Turning uncertainty into momentum.

**Your designer flaw:** You occasionally mistake starting for finishing.

**Your Hogwarts design habit:** Your prototype is already clickable while everyone else is still discussing the brief.

## Hufflepuff — The Thoughtful Craftsperson

**Headline:** You belong in Hufflepuff.

**Subheading:** Someone has to remember the actual humans using this thing.

**Result description:** You care about the details that make an experience feel considered. You listen, collaborate and notice the friction that other people overlook. You want your designs to work for people in the real world, not just look impressive in a presentation.

**Your design superpower:** Making people feel considered.

**Your designer flaw:** You may try to accommodate everyone until the design has lost its nerve.

**Your Hogwarts design habit:** You're the person asking whether the error state makes sense to someone who has never seen the interface before.

## Ravenclaw — The Curious Architect

**Headline:** You belong in Ravenclaw.

**Subheading:** You've opened 17 tabs to investigate a button.

**Result description:** You want to know why things work, why they fail and whether there's a more elegant way to solve the problem. You appreciate craft, coherent systems and the tiny details that make a design feel inevitable. You may occasionally overthink a decision that was perfectly fine three iterations ago.

**Your design superpower:** Finding the pattern beneath the problem.

**Your designer flaw:** You can spend longer perfecting the solution than the problem deserves.

**Your Hogwarts design habit:** Your component library has a naming convention. Your naming convention has documentation.

## Slytherin — The Strategic Operator

**Headline:** You belong in Slytherin.

**Subheading:** You didn't just design the interface. You considered who needed to approve it.

**Result description:** You understand that design happens within constraints. You know when to push, when to compromise and where to invest your effort. You're resourceful, adaptable and interested in what a design decision actually achieves. Your ability to navigate complexity is a strength—just remember that not every decision needs a stakeholder strategy.

**Your design superpower:** Making every design decision work harder.

**Your designer flaw:** You can optimise the fun out of a perfectly good experiment.

**Your Hogwarts design habit:** You already have a backup plan for the backup plan, and the deck is immaculate.

These descriptions are initial copy and should be refined during usability testing.

## 8.1 Result page components

Every result should contain:

1. House crest or original house-inspired illustration.
2. Animated or theatrical reveal.
3. House name and headline.
4. Personality description.
5. Design superpower.
6. Designer flaw.
7. Relatable design habit.
8. Primary share action.
9. Restart action.

# 9. User journey

1. **Landing:** User discovers the quiz and sees the promise.
2. **Start:** User selects "Get sorted".
3. **Question flow:** One question appears at a time, with four selectable answers.
4. **Progress:** The interface shows progress through 12 questions.
5. **Completion:** User submits the final answer.
6. **Reveal:** The sorting animation transitions into the assigned house.
7. **Result:** User reads their personality description and designer-specific jokes.
8. **Share or restart:** User shares the result or takes the quiz again.

# 10. Functional requirements

### FR-01: Start quiz

The landing page must provide a clear primary CTA that starts the quiz.

### FR-02: Single-select questions

Each question must permit exactly one selected answer.

### FR-03: Answer navigation

Users can select an answer and proceed. They can navigate backwards without losing previous selections.

### FR-04: Progress indicator

The interface must display the current question number and total number of questions.

### FR-05: Completion validation

Users cannot complete the quiz with unanswered questions.

### FR-06: Scoring

Every answer must map to exactly one valid house identifier.

### FR-07: Tie resolution

The same complete answer set must always return the same house, including tied results.

### FR-08: Result rendering

The result screen must display the correct content for the assigned house.

### FR-09: Restart

Restarting must clear all previous answers and scores.

### FR-10: Sharing

The result screen must offer a share action using the available browser sharing mechanism, with a copy-to-clipboard fallback.

### FR-11: Responsive layout

The experience must work on mobile, tablet and desktop viewports.

### FR-12: Accessibility

The quiz must support keyboard interaction, visible focus states, semantic labels, sufficient contrast and reduced-motion preferences.

# 11. Non-functional requirements

- No account creation required.
- No personal information required.
- No backend required for core quiz functionality.
- No external AI calls required.
- Question and result content should be stored in structured data rather than hard-coded into separate page components.
- Scoring logic must be independent of presentation.
- Animations should not block access to the result.
- The interface must remain usable when animations are disabled.
- The quiz must avoid presenting its result as a scientifically validated assessment.

# 12. Visual and interaction direction

## 12.1 Overall aesthetic

A nostalgic, magical, slightly irreverent quiz experience inspired by classic personality quizzes and the atmosphere of a wizarding school.

Visual ingredients:

- Dark midnight backgrounds and rich jewel tones.
- Warm parchment surfaces.
- Antique gold accents.
- Editorial typography paired with a highly readable body font.
- Illustrated crests, books, stars, quills and magical details.
- Subtle particles, glows and reveal animations.
- Clear answer cards with generous touch targets.

The design should feel atmospheric, not cluttered. Avoid making every element glow or animate.

## 12.2 Interaction principles

- One question per screen.
- Four clear answer cards.
- Immediate visual feedback on selection.
- No unnecessary confirmation dialogue between questions.
- A visible back control.
- Smooth transitions that respect reduced-motion preferences.
- A result reveal that feels special without making users wait unnecessarily.

## 12.3 Suggested screen inventory

1. Landing page.
2. Question screen.
3. Result reveal.
4. Gryffindor result.
5. Hufflepuff result.
6. Ravenclaw result.
7. Slytherin result.

The four result states can share one reusable layout component with house-specific content and visual tokens.

# 13. Technical implementation

## 13.1 Suggested architecture

For a lightweight, AI-assisted web build:

- React with TypeScript.
- A simple Vite setup.
- CSS variables for colours, spacing and typography.
- Local component state for current question and selected answers.
- A static question-data file.
- A pure scoring function.
- A reusable result component.
- Browser-native sharing and clipboard APIs.

A framework or database is not necessary for this MVP.

## 13.2 Data model

Each question should have:

- `id`
- `dimension`
- `prompt`
- `answers`

Each answer should have:

- `id`
- `label`
- `house`

The scoring function should receive the selected answer IDs, resolve their house mappings and return the final result.

The UI must not contain duplicated scoring rules.

# 14. Success metrics

This is an entertainment experiment, so initial success should be judged by completion, delight and sharing rather than revenue.

### Primary indicators

- Quiz completion rate.
- Average time to completion.
- Result share-action usage.
- Restart rate.
- Qualitative feedback on result accuracy and humour.

### Initial hypotheses

- Most users will complete the 12-question quiz in under four minutes.
- Scenario-based questions will feel more relatable than direct personality questions.
- Designer-specific humour will encourage sharing.
- Results will feel more satisfying when each house has distinct, balanced descriptions.

These are hypotheses to test, not established benchmarks.

# 15. Testing plan

Before launch, test the following:

### Logic testing

- All 12 questions have four valid answers.
- Every answer maps to exactly one house.
- Every house can win.
- A single highest score produces the correct result.
- Every tie scenario resolves deterministically.
- Back navigation preserves answers.
- Restart clears all state.

### Content testing

- Questions are understandable without explanation.
- Answers feel distinct and plausible.
- No answer is obviously the "best designer" choice.
- Each house description feels affectionate rather than insulting.
- Humour is recognisable to designers without requiring insider knowledge of one particular tool.

### Usability testing

Ask a small group of designers to complete the quiz and answer:

1. Did the questions feel like situations you've encountered?
2. Did your result feel plausible?
3. Which answer was hardest to choose?
4. Would you share the result?
5. Did any question or result feel judgemental?

# 16. Risks and mitigations

| Risk | Mitigation |
|---|---|
| Results feel arbitrary | Test mappings against contrasting designer personas and revise copy and mappings. |
| One house becomes a default winner | Ensure every question offers one answer per house and test representative answer combinations. |
| Questions feel repetitive | Give each dimension two distinct contexts: one situation and one broader preference. |
| Quiz feels like a skills assessment | Use behavioural scenarios and avoid right/wrong feedback. |
| Humour alienates users | Use gentle self-aware jokes rather than insulting competence or personality. |
| Copyright or trademark confusion | Make the project clearly unofficial; consider original wizard-school-inspired branding and artwork before public release. |
| Tie-breaking feels artificial | Keep the rules consistent, test tied profiles and avoid claiming the result is scientifically definitive. |

# 17. MVP acceptance criteria

The MVP is ready for release when:

- The user can start and complete exactly 12 questions.
- Each question offers four selectable answers.
- Every answer is mapped to one house.
- All four houses can be returned by the scoring engine.
- Ties resolve consistently.
- All four result descriptions render correctly.
- Users can go backwards and restart.
- Sharing and copying work where supported.
- Mobile and desktop layouts are usable.
- Keyboard navigation and reduced-motion behaviour are supported.
- The experience works without login, backend services or external AI calls.

# 18. Future opportunities

Only consider these after the core experience is working:

- A downloadable, branded result card.
- A more elaborate sorting ceremony.
- Original house-inspired sound design.
- A shareable link encoding quiz answers or result state.
- Optional "Which design archetype are you?" mode independent of Hogwarts.
- Additional playful quizzes built on the same reusable quiz engine.

# 19. Final product principle

This is a small creative project, and it should stay small enough to be fun to build.

The first release should focus on one excellent experience: twelve relatable questions, a dependable scoring system, four charming results and a reveal worth sharing.

**Definition of done: A designer finishes the quiz, laughs at least once, recognises something about their working habits and wants to send their result to another designer.**