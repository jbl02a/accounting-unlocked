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

Then check page count with `pypdf`. The cram sheet should stay at 2 pages.

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

The pattern in all three: the check confirmed the happy path instead of asserting
the property that actually mattered.
