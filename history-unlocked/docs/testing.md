# Testing

There is no test suite. `npm run build` catches syntax and nothing else. Behaviour is
verified by driving the built app in a real browser; question banks are verified in
`node`.

## Checking the banks in node

The data modules are plain ESM and can be imported directly:

```bash
node -e "import('./src/data/levelQuestions.js').then(m => console.log(m.LEVEL_QUESTIONS.length))"
```

What is worth asserting, and has been:

- IDs are unique across `examQuestions.js` and `levelQuestions.js`.
- Every question has four options, `correctIndex: 0`, a prompt and an explanation.
- After `shuffleOptions`, the correct answer lands on each position ~25% of the time,
  and `options[correctIndex]` still equals the originally authored answer.
- Every card-sort item's `correct` matches a bucket id; sequence years are unique.
- **`optionWhy` survives shuffling.** For thousands of shuffles, every option still
  sits beside the rationale written for it, and `optionWhy[correctIndex]` is the
  authored first entry. Re-running `shuffleOptions` with a stored `optionOrder`
  reproduces the same pairing, so a resumed exam explains the right options.
  This is the same class of bug as the fixed-answer-position one: silent, plausible
  on screen, and wrong.
- Every `hard: true` question carries three hints, a trap and a full set of rationales.
- **Tier selection never serves outside the pool it settled on**, and Reader's cut never
  serves a tier-1 question unless the whole bank had to be opened. Check every level at
  every tier — the banks are small enough that one re-tiered question changes the
  outcome.

## Browser testing

```bash
npm run build
npm run preview -- --port 4300 &
```

Playwright is not a project dependency; install it in a scratch directory and point it
at the container's Chromium:

```js
const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
})
```

The exact path is environment-specific — check `ls /opt/pw-browsers` if it fails.

A walk that has earned its keep: load every level, click through every round to the
results screen, and assert that a run which always picks option A does **not** score
100%.

For difficulty, drive each tier end to end and assert the differences you expect:
question count changes, the hint button is absent at Reader's cut, "Answer locked in"
appears instead of feedback, and the end-of-round review renders. That walk caught a
crash on the exam page after a field was renamed (`pool` → `pools`) and one call site
was left behind — the build was clean and the page was white.

### Things that bite

- Use `waitUntil: 'domcontentloaded'`, **not** `networkidle`. The Google Fonts
  stylesheet never settles in this sandbox (it fails with `ERR_CONNECTION_RESET`, which
  is expected here and not a bug) and `networkidle` hangs.
- `:has-text("A")` matches case-insensitively and will also match *"Stuck? Get **a**
  hint"*. Use `button:has(span:text-is("A"))` to hit an option letter.
- Tailwind classes containing `/` need escaping in selectors: `div.bg-sky-500\\/30`.
- Check the phone width too: `setViewportSize({ width: 390, height: 780 })`, then
  assert `scrollWidth - clientWidth === 0`.

### Verify print output by rendering PDFs

```js
await page.emulateMedia({ media: 'print' })
await page.pdf({ path: 'cram.pdf', format: 'Letter', printBackground: true })
```

Then check the page count with `pypdf`. The cram sheet currently runs to 5 pages.
The printable pages are the ones most likely to break the phone-width check, since
they are laid out for paper — test `/cram` at 390px whenever you add a table to it.

## Bugs that got through in the sibling app, and what would have caught them

| Bug | Why it survived |
|---|---|
| **Correct answer was always option A** | Tests clicked "A" every time and scored 100%. That was read as passing rather than as the bug it was announcing. A test asserting *"answering A scores ~25%"* would have caught it on day one. |
| An offline toast swallowed taps on the button beneath it | Only surfaced because a Playwright click timed out with an interception log. Nothing checked that overlays don't block. |
| Level quizzes never fed the weak-area tracker | Built for the exam page and assumed to cover "quizzes". Nobody asserted it end-to-end from a level. |

The pattern in all three: the check confirmed the happy path instead of asserting the
property that actually mattered.
