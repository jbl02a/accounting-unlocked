# Testing

There is no test suite. `npm run build` catches syntax and nothing else. Everything
behavioural is verified by driving the built app in a real browser, and everything
numeric is verified in `node` before it reaches a component.

That is not a preference — it is what caught the bugs listed at the bottom.

## Browser testing

```bash
npm run build
npm run preview -- --port 4200 &
```

Playwright is not a project dependency; install it in a scratch directory and
point it at the container's Chromium:

```js
const b = await chromium.launch({
  executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome'
})
```

The exact path is environment-specific — check `ls /opt/pw-browsers` if it fails.

### Things that bite

- Use `waitUntil: 'domcontentloaded'`, **not** `networkidle`. The Google Fonts
  stylesheet may never settle in a sandboxed container and `networkidle` hangs.
- `:has-text("A")` matches case-insensitively and will also match *"Stuck? Get **a**
  hint"*. Use `button:has(span:text-is("A"))` to hit an option letter.
- Tailwind classes containing `/` need escaping in selectors: `div.bg-sky-500\\/30`.
- Dismiss the "Ready to use offline" toast before clicking bottom-of-screen
  buttons, or add a wait — it auto-clears after 5s.

### Verify print output by rendering PDFs

```js
await page.emulateMedia({ media: 'print' })
await page.pdf({ path: 'cram.pdf', format: 'Letter', printBackground: true })
```

Then check page count with `pypdf`. The cram sheet should stay at 2 pages; the
answer key at `/problems/key` runs to 7.

Also grep the extracted PDF text for on-screen furniture that should never print —
`Dismiss`, `Ready to use offline`, `A new version is ready`. The offline and update
toasts once printed on every printable page because they were missing `no-print`,
and a page-count check alone would never have caught it.

## Verify the accounting, always

Before writing figures into a lesson, prove them in `node`: trial balances balance,
net income reconciles, adjustments recompute, follow-up balances follow. Several
lessons carry deliberately awkward numbers (partial-period insurance over 10 months,
interest over 9) precisely because those are where marks get lost — so they have to
be right.

## Bugs that got through, and what would have caught them

| Bug | Why it survived |
|---|---|
| **Correct answer was always option A** — all 79 exam and 38 level questions | Tests clicked "A" every time and scored 100%. That was read as the tests passing rather than as the bug it was announcing. A test that asserts *"answering A scores ~25%"* would have caught it on day one. |
| The offline toast swallowed taps on the button beneath it | Only surfaced because a Playwright click timed out with an interception log. Nothing was checking that overlays don't block. |
| Level quizzes never fed the weak-area tracker | The feature was built for the exam page and assumed to cover "quizzes". Nobody asserted it end-to-end from a level. |

| Best score inflated by a two-question drill | `recordExam` applied `Math.max` to every attempt regardless of size. Never caught because no test compared a drill's effect on `best` against a full exam's. Found by auditing the *class* of bug rather than re-running the suite. |
| A run of drills evicted the graded 79-question attempt from history | The attempts array was one list capped at 10. Adding more drill types made it reachable in a single sitting. |

The pattern in all three: the check confirmed the happy path instead of asserting
the property that actually mattered.

## The audit suite

Living in the scratch directory rather than the repo, but worth recreating when
touching the progress model. Four layers, in order of what they can prove:

1. **Static** — ID uniqueness across all three banks, `correctIndex: 0`, four
   distinct options, an explanation on every question, and the shuffle properties
   over thousands of rounds: the answer never lost, every position used, a stored
   permutation replaying identically.
2. **Dedupe** — two prompts exist in both the exam bank and a level bank. A served
   round must contain only one twin, and *both* must still get served across many
   rounds, or one is stranded on the "to work on" list forever.
3. **State** — seed a real save, load the new build, and diff `localStorage`
   field by field: the migration must be purely **additive**, never altering or
   removing anything. Then assert the fields the grader does not own (`hold`,
   `task`, `label`, `level`) survive a full re-grade, that a drill cannot raise
   `best` or evict a graded exam, and that a resumed run keeps its `scopeKind`.
4. **Routes** — all 22 pages render, no console errors, no horizontal overflow at
   desktop or 390px.

The always-A property is asserted in *every* mode, not just one: full exam, Quick
15, focus test and misses drill each have to score far below 100%.
