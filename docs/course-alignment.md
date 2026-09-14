# Course alignment

**Read this before writing or editing any accounting content.** Several choices in
this app look arbitrary and are not — they match the student's textbook and his
professor's worksheets. Changing them to "standard" accounting would make the app
disagree with what he is graded on.

## The course

**Rich / Jones / Myers, _Financial Accounting: The Cornerstone of Business
Decision-Making_, 6th edition (Cengage, 2025).** Source material lives in the
owner's Google Drive under `Griffin's Classes/Accounting` — Chapter 1–3 slide
decks plus the assigned in-class problems. Ask the owner before assuming newer
chapters exist.

The app was cross-checked against those files in September 2026. Chapters 1–3 are
covered; Chapter 4 onward is not.

## TA practice problems (September 2026)

Four worksheets from the course TA, now in `src/data/problemSets.js`:

**There are two different Chapter 2 worksheets** — Copperline and BrightWave. They
are separate problems with separate companies, and only BrightWave came with a key.
Keep them straight: a figure from one says nothing about the other.

| Worksheet | In the app as | Covers | Key? |
|---|---|---|---|
| Chapter 1.2 WS | `ch1-terms` | definitions, the statements, 24 classifications | no |
| T-Account Worksheet (Boonville) | `boonville` | 9 entries → T-accounts → trial balance | no |
| CH2 Practice (Copperline Event Productions) | `copperline-events` | 14 transactions → unadjusted trial balance | **no** |
| CH2 Practice (BrightWave Consulting) | `brightwave` | 13 transactions, one compound → trial balance | **yes** |
| Chapter 3 Entire Practice Problem | `ch3-adjusting-closing` | deferrals, accruals, four closing entries | no |

### BrightWave — the one with an official key
Every balance in `brightwave` was checked line by line against the TA's answer key
and matches: Cash $11,800, A/R $55,000, Equipment $67,000, Notes Payable $20,000,
both columns **$467,000**. The verification script asserts the whole ledger against
the key's stated balances, so this set cannot drift from the course.

Two things it teaches that nothing else in the app did:
- **A compound entry.** 8 January buys $45,000 of equipment for $15,000 cash and a
  $30,000 note — one debit, two credits. Recording only the cash paid understates
  the asset and hides the debt.
- **A printed account that stays empty.** The trial balance template lists Utilities
  Expense and the key states it is **$0** — "no transaction affects this account in
  this version". That is the TA confirming, in their own key, that an account with a
  line and no postings simply has no balance. It is the direct evidence the
  Copperline question below was missing.

Every figure was recomputed before being written down. Two things to know:

- **Copperline's Common Stock line is unused, and that is unresolved.** Common Stock
  is printed on the T-account page and on the trial balance, but none of the fourteen
  transactions issues any stock, and both columns foot to $1,451,400 without it. The
  app reports that as fact and tells the student not to plug a figure — while flagging
  that if the class key shows an amount there, the handout is missing a transaction
  and every total shifts. **No key for Copperline has been seen.** Worth asking the TA.

  BrightWave's key settles the principle even though it is a different problem: the
  TA there prints Utilities Expense on the trial balance and states it is $0. An
  unused line is normal and is left blank.

  History worth keeping: a $150,000 opening stock issuance was briefly added to
  Copperline on the strength of an answer key that turned out to be **BrightWave's**
  — a different Chapter 2 problem entirely. It was removed. Do not add a transaction
  to a problem unless it appears in that problem's own handout or its own key.

- **Ridgeline's unearned revenue is $12,500, not $15,000.** A $120,000 four-year
  contract prepaid on 1 July straight-lines to $15,000 for six months, but the
  problem states that $12,500 of services were actually provided. Performance
  governs. This is the single most likely mark to be lost on that worksheet.

There is also a **name clash**: the app's printable worksheet at `/worksheet` uses
"Copperline Freight Co." while the TA's Chapter 2 problem is "Copperline Event
Productions, Inc." Two different Copperlines. Rename the app's one if it causes
confusion.

## Decisions that came from the slides

### The corporate form — not sole proprietorship
The course teaches **Common Stock, Retained Earnings, Dividends**. It does *not*
use Owner's Capital / Owner's Drawings. Every trial balance, closing entry and
statement in the app follows the corporate form. This was correct by luck in the
original build and confirmed by the slides.

### DEALER, not DEAD CLIC
Her Chapter 2 deck has a dedicated **DEALER** slide for normal balances —
**D**ividends, **E**xpenses, **A**ssets take debits; **L**iabilities, **E**quity,
**R**evenue take credits. The app originally taught DEAD CLIC and was changed.
The cheat sheet notes DEAD CLIC once as the same idea under another name.

### Four assumptions and four principles
Her grouping, which differs from many other texts:

| Four assumptions | Four principles |
|---|---|
| Economic entity | Historical cost |
| Going concern | Revenue recognition |
| Time-period | Expense recognition (matching) |
| Monetary unit | **Conservatism** |

**Conservatism is one of the four principles here** and is graded as such. **Full
disclosure is not** — it is presented as a policy alongside materiality and the
cost constraint. Level 11 originally had these inverted and was corrected.

### Dividends on the trial balance — two accepted placements
Her **slide** lists the order as assets, liabilities, equity (Common Stock,
Retained Earnings, then Dividends), revenues, expenses. Her **worksheet** lists
Dividends *last*, after the expenses. Both are accepted. The app teaches the slide
order and says so explicitly in Level 9 and the cheat sheet. What is never
negotiable: Dividends sits in the **debit** column.

### Terminology she uses
- **"Dividends Declared"** for the Dividends account
- **"Wages Expense"** in the Chapter 2 problem, **"Salaries Expense"** in Chapter 3
  — the app uses both and notes they are the same thing
- Journal entry worksheets are laid out **Date | Account Description | Debit | Credit**

### Interest calculation is in scope
An early decision left `Principal × Rate × Time` out as "too advanced." Her Chapter 3
in-class problem requires it (a $200,000 note at 9% from February 1, accrued at
December 31). It is now taught in Level 14 with the annual-rate mistake planted as
a distractor.

### Closing entries: three, not four
Her worksheet has exactly three closing entries — revenues, expenses, dividends,
all direct to Retained Earnings. The Income Summary variant (four entries) is
mentioned as an alternative but not drilled.

## Known to be ahead of the course

**Notes Receivable.** Level 6 teaches notes vs. accounts receivable/payable. Notes
*Payable* appears in her Chapter 2 account list; Notes *Receivable* does not appear
in Chapters 1–3 at all. Harmless and a natural pairing, but it is not on this exam.

## Parallel problems, not copies

Practice problems deliberately mirror the *structure and wording style* of her
assigned problems while using different companies and figures, so the student
learns the method rather than memorising answers he has already seen. The
companies in the app — Pinnacle-style but renamed — are Novak Consulting, Beacon
Tutoring, Bayside Landscaping, Cedar Ridge, Summit Analytics, Harbor Point Marine,
Lakeside Outfitters, Copperline Freight.
