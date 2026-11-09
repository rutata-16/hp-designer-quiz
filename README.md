# The Designer’s Sorting Hat

A fan-made, Harry Potter-inspired quiz that sorts designers into a Hogwarts house by their design habits. Twelve questions, one house, about three minutes.

Plain HTML, CSS and ES modules. No framework, no build step, no runtime dependencies apart from Google Fonts.

---

## Run it locally

```bash
python3 -m http.server
```

Then open <http://localhost:8000/>. The scoring tests are at <http://localhost:8000/tests.html>.

> ES modules don't load from `file://`, so a local server is needed.

## Deploy to GitHub Pages

1. Push this folder to the `main` branch of a GitHub repository.
2. In the repository, go to **Settings → Pages**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. Open `https://<user>.github.io/<repo>/`.

Every path is relative, `.nojekyll` stops Jekyll from touching the files, and `404.html` is a byte-for-byte copy of `index.html`, so an unknown URL boots the quiz from the sealed letter.

The `design-reference/` folder (Figma exports, PRD, original images) isn't used by the site. Leave it out of the repository if you don't want it published.

---

## What’s built

| # | Screen | Notes |
|---|---|---|
| 01 | Letter arrives | Sealed envelope. The wax seal is a real `<button>` (“Break the seal and open your letter”). |
| 02 | Letter opened | Parchment letter; “Get sorted” starts the quiz. |
| 03 | Question × 12 | One question per screen, 12-segment progress, Back, no Next button. Picking an answer advances after ~300ms. |
| 04 | Sorting moment | Hat, four house-colour orbs on a slowly turning ring, one random sorting line typed out, thinking dots, then the result after ~3s. |
| 05 | Result | One layout for all four houses, themed by `[data-house]`. Share + Sort me again. |
| E1a / E1b | Slow / really slow load | Shown after 3s / 10s if fonts and the parchment aren’t ready. The letter still appears by itself once loading finishes. |
| E2 | Welcome back | Modal over a dimmed screen 01 when an unfinished quiz is in `sessionStorage`. |
| E3 | Crest slow or failed | A dashed shield with the house initial shows immediately; the crest fades in over it. |
| E4 | Sharing | Native share sheet where available; otherwise copy + toast (copied / offline / blocked). |
| E5 | Something went wrong | Catches `error`, `unhandledrejection` and screen render failures. |

### Files

```
index.html  404.html  tests.html  favicon.svg  .nojekyll
css/   reset · variables · base · components · screens · animations · tests
js/    icons · data · scoring · store · components · router · screens · tests · app
assets/ hat.png · parchment.jpg · crests/<house>.jpg
```

- **`js/data.js`** holds every question, answer, mapping, result and line of screen copy.
- **`js/scoring.js`** is a pure function implementing PRD §7. Each answer gives one point to its house. A tie goes to the tied house picked at Q12; if Q12 isn't one of them, it checks Q11, then Q10, and so on.
- **`js/store.js`** keeps answers in `sessionStorage`, falling back silently to memory. A refresh mid-quiz offers to resume.
- **`css/variables.css`** holds every colour, size, radius, shadow and duration. No other stylesheet hard-codes them.
- **`css/animations.css`** holds every keyframe.

### Keyboard

- **Answer cards:** arrow keys move between them. Space or Enter picks one, and so do `1`–`4` or `A`–`D`.
- **Focus:** when a new question appears, focus moves to its heading. Every control shows a gold focus ring.
- **Welcome back:** Escape is the same as “Carry on”.

### Reduced motion

With `prefers-reduced-motion: reduce`:

- The candles and orbs stay still.
- Screen changes are instant.
- The sorting screen is skipped and the result appears straight away.

---

## Previewing edge cases

Add `?preview=<value>` to the URL. Previews only change what's shown and never touch saved answers.

| Value | Shows |
|---|---|
| `slow` | E1a · Lighting the candles… |
| `very-slow` | E1b · The owl is taking the scenic route |
| `welcome-back` | E2 · Welcome back, with 6 fake answers |
| `crest-missing` | E3 · Result with the shield outline and “on its way by owl” caption |
| `share-copied` | E4 · Result + “Copied!” toast |
| `share-offline` | E4 · Result + offline toast |
| `share-blocked` | E4 · Result + copy-blocked toast |
| `error` | E5 · Something went wrong |
| `result` | Any result without taking the quiz |

Result previews take an optional `&house=gryffindor|hufflepuff|ravenclaw|slytherin`; the default is `ravenclaw`. For example: `index.html?preview=crest-missing&house=slytherin`.

---

## Decisions where PRD, prompt and Figma disagreed

| Topic | Decision |
|---|---|
| Footer disclaimer | The short Figma line (“…Not affiliated with the Harry Potter franchise.”) is on every screen. The longer Warner Bros./J.K. Rowling version replaces it on the result screen. *(Author’s call.)* |
| Footer on 03/04/05 | Figma leaves it out on these screens, but the prompt says every screen. It's included, small and quiet. |
| Q1 mapping | Built exactly as the PRD has it: A (“feels unfinished”) → Ravenclaw, C (“breaks the visual system”) → Gryffindor. These read as if they might be swapped. **Flagged for review.** |
| Result headline | No trailing full stop (Figma), not “You belong in Ravenclaw.” (PRD). |
| Back on Q1 | Visible and returns to the open letter with answers kept (Figma notes), not hidden or disabled (prompt). |
| Quotes and apostrophes | Curly quotes as set in Figma, e.g. `’` and `“ ”` around the sorting line. |
| Crest images | Saved as `crests/<house>.jpg` rather than `.png`. They have solid square backgrounds, so JPEG gets them from ~500KB to 60–80KB each. |
| Typing effect | The sorting line is revealed left-to-right in 36 steps with CSS `clip-path` over 1.5s, so the animation stays in `animations.css`. |
| E5 “Try again” | Reloads and resumes straight on the next unanswered question, skipping the welcome-back card. |
| `404.html` deep paths | Relative paths work for one-level-deep unknown URLs, e.g. `/<repo>/old-link`. Deeper broken links may load without styles; absolute paths were ruled out by the prompt. |
| Extras | `css/tests.css` styles `tests.html`. `.claude/launch.json` is local preview config and can be deleted. |

## Contrast adjustments (WCAG AA)

Every text pair was checked; these needed changing. Ratios are against the actual background, including the atmospheric glow.

| Text | Figma | Built | Ratio before → after |
|---|---|---|---|
| Footer disclaimer, `--parchment-mid` on midnight | 55% opacity | 70% opacity | 4.34 → 6.44 |
| Letter sign-off “Yours, with excessive kerning,” on parchment stains | `#6B5440` | `#594332` (`--ink-faded-strong`) | 3.94 → 5.14 |
| Ravenclaw “The Hat has spoken” on the blue glow | `#B07D4F` | `#C08D5F` | 4.16 → 5.09 |
| Hufflepuff “The Hat has spoken” on the gold glow | `#C9962E` | `#D6A43F` | 4.28 → 5.01 |
| Hufflepuff trait-card labels on parchment | house colour `#C9962E` | house accent `#2B2118` | 1.54 → 9.13 |

Passing as designed, for the record:

| Text | Ratio |
|---|---|
| Gold caps on midnight | 8.30 |
| Envelope address | 4.52 |
| Gold on burgundy buttons | ≥ 5.65 |
| Burgundy text button on parchment | 6.36 |
| Other houses' trait labels | ≥ 5.84 |

The two pairs above are adjusted through the `--house-text` (on dark) and `--house-ink` (on parchment) tokens. `--house` and `--house-accent` keep the Figma values.

## Assets

| Where | Path | Source (Figma Assets page) | Format | Size |
|---|---|---|---|---|
| Sorting / error hat | `assets/hat.png` | Sorting hat 1 | PNG, transparent, 760 × 692 | **333KB, over the 300KB target**: no PNG quantiser was available. Run it through TinyPNG or `pngquant` to bring it down. |
| Letter paper | `assets/parchment.jpg` | parchment paper 1 | JPEG q72, 857 × 1190 | 193KB |
| Crests | `assets/crests/<house>.jpg` | Gryffindor 1 / Hufflepuff 1 / Ravenclaw 1 / Slytherin 1 | JPEG q80, 575 × 575 (edges cropped) | 60–80KB each |
| Favicon | `favicon.svg` | Drawn: wax seal with “DS” | SVG | 1KB |

**Crests still have solid square backgrounds, not transparent ones.** They're shown as square tiles, as in Figma frame 05.

The parchment includes a Hogwarts watermark and the crests are franchise-style art. That's fine for a personal fan project, but see PRD §16 before a wider public launch.

## Tests

`tests.html` runs 20 checks:

- **Data:** 12 questions with 4 answers each, one answer per house, valid and unique ids, complete result copy.
- **Winners:** every house can win, and a clear winner beats a different Q12.
- **Ties:** two-, three- and four-way ties, including walking back past Q12 to Q11.
- **Determinism:** 100 repeat runs and 500 random answer sets always give the same, valid house.
- **Validation:** incomplete or unknown answers are rejected.
