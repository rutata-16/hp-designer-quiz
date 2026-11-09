# The Designer's Sorting Hat · Build Prompt

## Prompt

You are building a **static, desktop-first HTML/CSS/JS quiz** called
*The Designer's Sorting Hat*: a fan-made, Harry Potter-inspired
personality quiz that sorts designers into a Hogwarts house based on
their design habits. It is a just-for-fun project. Whimsy and nostalgia
matter more than features.

This folder contains:

- **`PRD.md`**: the product requirements. It is the source of truth for
  the question bank, house mappings, scoring, tie-breaking and result
  copy.
- **Screen images** (PNG) exported from Figma: the source of truth for
  layout, typography, colour and spacing.
- **`assets/`**: the hat illustration, the parchment letter paper and
  the four house crests (see "Assets").
- Optionally, access to the Figma file through the Figma MCP server
  (see "Figma reference").

Read `PRD.md`, look at every screen image, and (if the Figma MCP is
available) inspect the frames listed below before you write code. If
something is in the PRD but not in the designs, or the other way round,
reconcile it and name the decision in the README.

### Non-negotiable principles

Everything below applies to the whole build. Do not relax a rule to
save time; call out gaps in the README instead.

#### 1. Tech surface

- **No framework.** No React, Vue, Svelte, Tailwind, jQuery, Bootstrap,
  etc. Vanilla HTML, CSS and ES modules only.
- **No build step.** The project must run from `python3 -m http.server`
  and from GitHub Pages with zero changes. No npm, no bundling.
- **No runtime dependencies** beyond Google Fonts. No CDN script tags.
- **No inline CSS or JS.** Styles live in `.css` files, logic in `.js`
  modules. The only inline markup allowed is SVG, and it comes from a
  single `icons.js` module.
- **All quiz content lives in `data.js`**: questions, answers, house
  mappings, result copy and sorting lines. Screens never hard-code copy.
- **Scoring is a pure function** in `scoring.js`, independent of the UI,
  implementing PRD section 7 exactly (one point per answer, ties broken
  by walking answers from Q12 backwards).
- **Quiz progress lives in `store.js`**, backed by `sessionStorage`
  with a silent in-memory fallback. A refresh mid-quiz resumes on the
  same question. Restart clears everything.

#### 2. Desktop-first layout

- The reference frame is **1440 × 1024**. Build to that first and make
  it pixel-faithful to the screen images.
- Content sits in a centred stage. Between 1280px and 1920px wide, the
  stage stays centred and the atmospheric background fills the rest.
- Below 1024px, degrade gracefully: the result screen stacks the crest
  above the content, the question sheet goes full-width with a side
  gutter, and the decorative candles reduce in number. There is no
  separate mobile design; it only has to remain usable and readable
  down to 375px, with no horizontal scroll.

#### 3. GitHub Pages hard rules

- **All paths relative, no leading slash**, in HTML, CSS `url()` and JS.
- **Lowercase, kebab-case filenames**; every import matches exactly.
- **`<script type="module" src="js/app.js">`** with `.js` extensions.
- **Add `.nojekyll`** at the root.
- **Add `404.html`** as a byte-for-byte copy of `index.html`.
- **No service worker, no Node APIs, no `process.env`.**
- **Document deployment** in the README: push to `main`, enable Pages
  on `main` / root, open `https://<user>.github.io/<repo>/`.

#### 4. File layout to produce

```
<repo-root>/
├── index.html
├── 404.html                 byte-for-byte copy of index.html
├── tests.html               runs scoring tests in the browser
├── .nojekyll
├── README.md                run, deploy, what's built, decisions, assets
├── css/
│   ├── reset.css            reset + prefers-reduced-motion guard
│   ├── variables.css        all design tokens
│   ├── base.css             body, stage, atmosphere layers, fonts
│   ├── components.css       button, answer card, progress, trait card,
│   │                        letter, envelope, wax seal, candle, toast
│   ├── screens.css          per-screen layouts; composes components
│   └── animations.css       every keyframe in the project, and nothing else
├── js/
│   ├── icons.js             inline SVG (arrows, share, etc.)
│   ├── data.js              questions, results, sorting lines, house tokens
│   ├── scoring.js           pure scoring + tie-break function
│   ├── store.js             sessionStorage adapter + in-memory fallback
│   ├── components.js        DOM builders for every reusable piece
│   ├── router.js            screen switching + transitions + focus management
│   ├── screens.js           one factory per screen, returning a DOM node
│   ├── tests.js             assertions used by tests.html
│   └── app.js               entry: routes, initial screen, resume logic
└── assets/
    ├── hat.png
    ├── parchment.jpg
    └── crests/
        ├── gryffindor.png
        ├── hufflepuff.png
        ├── ravenclaw.png
        └── slytherin.png
```

Rules this layout enforces:

- Every reusable piece has one builder in `components.js` and one rule
  set in `components.css`. Screens never redefine buttons or cards.
- Design values live only in `variables.css`. No hard-coded colour,
  radius, duration or spacing anywhere else.
- House theming is driven by a `data-house="ravenclaw"` attribute that
  swaps a small set of house tokens. One result layout serves all four
  houses.

#### 5. Motion: minimal, on purpose

This is a calm, candlelit experience. **Only the motion listed here is
allowed.** Everything else is static. Every animation lives in
`animations.css` and uses tokens from `variables.css`.

| Where | Motion | Spec |
| --- | --- | --- |
| Candles (screens 01, 02, and any screen that shows them) | Gentle hover | `translateY` 0 → −6px → 0, 4–6s per cycle, `ease-in-out`, infinite. Stagger each candle with a different duration and negative `animation-delay` so they never move in sync. The glow moves with the candle. No flame flicker. |
| Sorting screen (04) | House-colour orbs rotate | The four orbs (red, gold, blue, green) sit on a shared ring centred behind the hat and the whole ring rotates slowly: one full turn every ~12s, `linear`, infinite. The orbs keep their blur. The hat itself does not move. |
| Sorting screen (04) | Sorting line types out | One line is picked at random per visit from the five in `data.js` and typed out over ~1.5s, followed by the three "thinking" dots fading in sequence. After ~3s total, go to the result. |
| Screen changes | Crossfade | 300ms opacity crossfade between screens. No slides. |
| Envelope → letter (01 → 02) | Reveal | Clicking the wax seal fades the envelope down and fades the letter in, ~400ms. No 3D fold. |
| Answer selection | State change | The selected card switches to its Selected state (burgundy badge, gold border, glow) over ~150ms, then the next question appears ~300ms later. No "Next" button. |
| Result crest (E3) | Fade in | When the crest image finishes loading, it fades in over the shield outline, 300ms. |
| Toasts (E4) | Fade + rise | Fade in while rising 8px, 200ms; fade out after 3s. |
| Welcome back (E2) | Fade | Dim layer and card fade in, 200ms. |
| Slow-load copy (E1a/E1b) | Fade | Copy fades in once when its timer fires. |

Not allowed: parallax, twinkling stars, particle systems, hover
wobbles, bouncing buttons, scroll-triggered animation, page-load
staggers, cursor effects.

**`prefers-reduced-motion: reduce`**: candles and orbs are still; the
sorting line appears instantly; screen changes are instant; and the
sorting screen is skipped entirely, going straight to the result (PRD
section 11).

#### 6. Screens to build

| # | Screen | Figma node | Notes |
| --- | --- | --- | --- |
| 01 | Landing: letter arrives | `5:13` | Sealed envelope, wax seal is the primary action (a real `<button>` with an accessible name like "Break the seal and open your letter"). |
| 02 | Landing: letter opened | `5:138` | Letter uses the parchment image as its background. "Get sorted" starts the quiz. |
| 03 | Question | `6:3` | One question at a time, four answer cards, 12-segment progress bar, "Question N of 12", Back control (hidden or disabled on Q1). |
| 04 | Sorting moment | `6:93` | Hat, rotating orbs, typed sorting line. Not focusable; announce the line in an `aria-live="polite"` region. |
| 05 | Result | `6:196` | Designed for Ravenclaw. Build all four houses from the same layout using house tokens, the matching crest and the PRD copy. Includes "Share my house" and "Sort me again". |

Edge-case screens (Figma page "Flow & edge cases", see section 8):
E1a slow load, E1b really slow load, E2 welcome back, E3 crest
fallback, E4 share toasts, E5 something went wrong. The same page has a
happy-path flow map at the top showing how all the screens connect.

Supporting Figma nodes: `3:34` Foundations (colour + type),
`5:2` Button/Primary, `5:12` Answer Card (Default / Selected),
`6:188` the sorting lines note.

#### 7. Copy rules

- **Use the copy in the Figma frames and the PRD exactly as written.**
  Do not rewrite, "improve", shorten or add copy. The author will edit
  it later. Where the Figma letter copy and the PRD differ, Figma wins.
- **Never show the PRD's dimension labels** (UI polish, Design process,
  Figma love, Expertise, Taste, AI) to the user. They exist only in
  `data.js` for the author's reference.
- **Never reveal house mappings** during the quiz (no colour hints, no
  data attributes visible in the UI).
- Every screen carries the footer disclaimer: *"An unofficial, fan-made
  quiz for designers, built for fun using publicly available resources.
  Not affiliated with or endorsed by Warner Bros., J.K. Rowling or the
  Harry Potter franchise."* Keep it small and quiet.

Sorting lines (one random per visit):

1. "Hmm… difficult. Very difficult…"
2. "Ah… a tidy layers panel, but a reckless streak, I see…"
3. "Plenty of opinions on kerning… now where to put you?"
4. "Hmm… 'final_v3_FINAL'… yes, that tells me a great deal."
5. "Not a bad eye… a stubborn one, though…"

#### 8. Edge cases and states

The edge cases are designed on the Figma page **"Flow & edge cases"**
(frames E1a to E5, each with a spec card underneath, plus a "Little
things, handled quietly" notes card). Build them as designed and use
their copy exactly.

Tone rule: these must feel like part of the story, never like an error
dashboard. No red, no warning icons, no error codes, no stack traces.
Same candlelit background, same type, same buttons.

**E1a · Taking longer than usual (first load, after 3s)**
- Only appears if fonts and images are not ready after 3s. Under 3s,
  nothing extra shows; the letter simply appears.
- One candle (hovering, same float as elsewhere), with
  "Lighting the candles…" and the caps label
  "Fetching your letter from the owlery". No spinner.
- Fonts fall back to Georgia immediately (`font-display: swap`) so text
  is never invisible.

**E1b · Really slow load (after 10s)**
- Copy: "The owl is taking the scenic route." /
  "Your connection seems slow. Keep waiting, or send another owl."
  Button: "Try again" (reloads the page).
- Loading keeps going in the background. If it finishes, the letter
  appears on its own without the user clicking anything.

**E2 · Welcome back (returning mid-quiz)**
- Shown over a dimmed screen 01 when saved answers exist for an
  unfinished quiz (refresh, or coming back in the same tab).
- Copy: "Welcome back, Designer." /
  "The Hat kept your seat warm. You'd answered N of 12 questions."
  Actions: "Carry on" (primary, goes to the next unanswered question)
  and "Start fresh" (clears answers, opens the letter).
- It is a `role="dialog"` with `aria-modal="true"`; focus starts on
  "Carry on"; Escape is the same as "Carry on".
- Not shown after a finished quiz; that just starts at the sealed letter.

**E3 · Crest slow or failed (result screen)**
- The result never waits for the crest. Text and buttons render
  immediately.
- While the crest loads: a dashed shield outline in the house colour
  with the house initial, and the caption
  "The crest is still on its way by owl".
- When it loads, the crest fades in over the outline (300ms). If it
  fails, the outline and initial stay and the caption is removed.

**E4 · Sharing**
- Where `navigator.share` exists, open the native share sheet; no toast.
- Otherwise copy this text to the clipboard: "I'm a <House> designer:
  '<subheading>' Get sorted: <url>", then show a toast:
  - Copied: "Copied! Now send it by owl (or Slack)."
  - Offline (`navigator.onLine === false`, still copies):
    "No owls flying right now (you're offline). We copied your result instead."
  - Copy blocked: "Your browser wouldn't let us copy. A screenshot works just as well."
- Toasts are parchment on gold border, bottom-centre, stay 3s, only one
  at a time, announced in an `aria-live="polite"` region.

**E5 · Something went wrong**
- A catch-all for unexpected failures: a `window` `error` or
  `unhandledrejection`, or a screen that fails to render. Replaces the
  current screen.
- The hat image, tilted −12°, static. Copy:
  "Well, that wasn't supposed to happen." /
  "A spell misfired somewhere in the castle. Not your fault, and your answers are safe."
  Actions: "Try again" (reloads and resumes) and "Start over" (clears
  answers, opens the letter).
- If storage itself failed, drop the second sentence and show only:
  "A spell misfired somewhere in the castle. Not your fault."

**No connection**
- Offline on a first visit: the browser shows its own offline page
  before the quiz loads. Do not try to handle this (no service worker).
- Offline after loading: the quiz runs fully in the browser, so nothing
  changes. **Do not show an offline banner.** The only offline-aware
  behaviour is the E4 toast.

**Little things, handled quietly (no screens)**
- After an answer is picked, input is locked for ~300ms so a
  double-click can't skip a question.
- Back on question 1 returns to the open letter (02). Answers are kept.
- Changing an answer after going Back replaces it; the quiz continues
  from there.
- Unanswered questions cannot be skipped; the result is computed only
  after all 12 answers (FR-05).
- Ties are never shown. They're resolved silently by the PRD rule, so
  everyone gets exactly one house.
- A broken or old link (404) boots the quiz from the sealed letter.
- Deep links to a result are out of scope.
- "Sort me again" has no confirmation dialog. It clears everything and
  returns to 01 (FR-09).
- Never leave a dead control. Anything not built is removed, not shown
  disabled.

#### 9. Accessibility (meet, don't skirt)

- Landmarks: `<main>`, one `<h1>` per screen, labelled sections.
- Answers are a `role="radiogroup"` with four `role="radio"` items:
  arrow keys move, Space/Enter selects. Number keys 1–4 and letters A–D
  also select. Focus moves to the question heading when a new question
  appears.
- Visible `:focus-visible` outline on every interactive element, in
  gold, that works on both parchment and dark backgrounds.
- Images: the hat and crests have meaningful `alt` text; candles, stars,
  orbs and vignettes are `aria-hidden="true"`.
- **Contrast:** the palette is risky. Gold on midnight, faded ink on
  parchment and small Cinzel caps labels are the likely failures. Check
  every text pair against WCAG AA and darken or enlarge where needed,
  staying as close to the design as possible. List every adjustment in
  the README.
- Minimum 44 × 44px targets for all controls.

#### 10. Design tokens

Use these names and values (from the Figma Foundations frame `3:34`).

```
Colour
  --base-midnight  #0D0A12   --base-night   #18121F   --base-smoke #2A2230
  --candle-amber   #E8A64A   --candle-ember #B8642A
  --gold-antique   #C9A35B   --gold-light   #EBD49B
  --parchment-light #F1E4C3  --parchment-mid #E2CC9C  --parchment-edge #B8935C
  --ink-brown      #2E2015   --ink-emerald  #1F4A36   --ink-faded  #6B5440
  --seal-burgundy  #7A1F24

House (swapped by [data-house])
  gryffindor  #7A1C24 / accent #D9A441
  hufflepuff  #C9962E / accent #2B2118
  ravenclaw   #1F2F5C / accent #B07D4F
  slytherin   #1D4A36 / accent #B9BEC2
  → exposed as --house, --house-accent

Type (Google Fonts)
  Display     Cinzel Decorative Bold   64 / 110%  (L: 44 / 115%)
  Question    Cormorant Garamond SemiBold 40 / 120%
  Whisper     Cormorant Garamond Medium Italic 32 / 130%
  Body L      EB Garamond Regular 22 / 150%
  Body M      EB Garamond Regular 18 / 150%   (Italic variant)
  Label caps  Cinzel Bold 13 / 130%, letter-spacing 0.14em
  Button      Cinzel Bold 16 / 100%, letter-spacing 0.10em

Motion
  --dur-select 150ms   --dur-screen 300ms   --dur-reveal 400ms
  --candle-float 6px   --candle-cycle 4s–6s   --orb-cycle 12s
  --ease-std cubic-bezier(0.2, 0.8, 0.2, 1)
```

Load only the font weights actually used, with `display=swap`.

#### 11. Assets

The prototype needs these images. If the Figma MCP is available, export
them from the **Assets** page of the Figma file; otherwise the author
will place them in `assets/` by hand.

| Where in the UI | Path | Figma layer (Assets page) | Format | Size |
| --- | --- | --- | --- | --- |
| Sorting screen hat | `assets/hat.png` | Sorting hat 1 | PNG, transparent | ~900px wide |
| Letter paper | `assets/parchment.jpg` | parchment paper 1 | JPG / WebP | ~1200px tall |
| Result crests | `assets/crests/<house>.png` | Gryffindor 1, Hufflepuff 1, Ravenclaw 1, Slytherin 1 | PNG | 600 × 600 |
| Favicon | `favicon.svg` | none: draw a simple wax-seal SVG | SVG | 512 × 512 |

Compress images (target under 300KB each). Note in the README if any
crest still has a solid background instead of a transparent one.

#### 12. Testing

`tests.html` loads `tests.js` and prints pass/fail for:

- All 12 questions have 4 answers, each mapped to exactly one valid house.
- Every house can win (one fixture per house).
- A clear winner returns the right house.
- Two-way, three-way and four-way ties resolve by the Q12-backwards rule.
- The same answers always return the same house.

**Previewing edge cases.** Edge states are hard to trigger by hand, so
support a `?preview=` query parameter that forces each one:
`slow` (E1a), `very-slow` (E1b), `welcome-back` (E2, with 6 fake
answers), `crest-missing` (E3), `share-offline`, `share-copied`,
`share-blocked` (E4 toasts) and `error` (E5). It only changes what is
shown, never stored data, and the README lists every value.

#### 13. "Done" definition

- `python3 -m http.server`: every screen reachable, the full flow works
  for all four houses, no console errors, no 404s.
- `tests.html` shows all tests passing.
- On GitHub Pages the live URL behaves identically.
- Lighthouse (desktop, incognito): ≥ 95 Accessibility and Best
  Practices, ≥ 90 Performance.
- Reduced motion turned on: no movement anywhere, sorting screen skipped.
- Every `?preview=` value shows its edge case, matching the
  "Flow & edge cases" frames and copy.
- Throttling the network to "Slow 3G" in DevTools shows E1a, then E1b,
  and the letter still appears once loading finishes.
- At 1440 × 1024 each screen matches its reference image closely.
- README documents: run locally, deploy, what's built, decisions made
  where PRD and Figma disagreed, contrast adjustments, and the assets
  table.

### Project context

```
<project>
App name:          The Designer's Sorting Hat
One-line pitch:    A fan-made, Harry Potter-inspired quiz that sorts
                   designers into a Hogwarts house by their design habits.
Primary colour:    Seal burgundy #7A1F24, antique gold #C9A35B
Theme:             Dark-first (candlelit night), parchment surfaces
Fonts:             Cinzel Decorative, Cinzel, Cormorant Garamond, EB Garamond

Figma file:        https://www.figma.com/design/lQpLfttB3VtzxTTeCH7q5e/
                   (Page 1 = screens, Assets page = images)

Reference material in this folder:
  Images:          01-letter-arrives.png, 02-letter-opened.png,
                   03-question.png, 04-sorting.png, 05-result-ravenclaw.png,
                   flow.png (happy-path map),
                   e1a-slow.png, e1b-very-slow.png, e2-welcome-back.png,
                   e3-crest-missing.png, e4-share-toasts.png,
                   e5-something-went-wrong.png
  Video:           none
  Requirements:    PRD.md

Screens (first-run flow):
  1. Letter arrives (sealed envelope)
  2. Letter opened ("Get sorted")
  3. Question × 12
  4. Sorting moment
  5. Result (Gryffindor | Hufflepuff | Ravenclaw | Slytherin)

Entities:
  Question = { id, dimension, prompt, answers[] }   // dimension: author-only
  Answer   = { id, label, house }
  Result   = { house, headline, subheading, description,
               superpower, flaw, habit, crest }

Out of scope:      accounts, backend, analytics, saved history,
                   downloadable share image, sound, mobile-specific design,
                   offline support / service worker, offline banners

Hosting URL:       https://<user>.github.io/<repo>/

Anything else:     This is a just-for-fun nostalgia project. When in
                   doubt, choose the calmer, warmer, more storybook option.
</project>
```

---

## How to use this prompt

1. Create a folder with this `PROMPT.md`, the PRD saved as `PRD.md`,
   the five screens from Page 1, and the flow map and six edge-case
   frames from the "Flow & edge cases" page, all exported as PNGs and
   named as in the project block.
2. Create `assets/` and export the hat, parchment and four crests from
   the Assets page, or let Claude Code export them through the Figma
   MCP if it's connected.
3. Open Claude Code in that folder and paste everything under
   **## Prompt** as your first message.
4. Ask it to work screen by screen (01 → 05) and stop for your review
   after screen 02, so you can check the look before it builds the rest.
   Edge cases (E1 to E5) come last, once the happy path works.
5. Run `python3 -m http.server`, click through the flow for each house,
   then push to a GitHub Pages repo as described in the README.
