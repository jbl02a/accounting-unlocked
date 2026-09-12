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
