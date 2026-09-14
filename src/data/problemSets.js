// The TA's practice problems, worked as interactive problems rather than hosted PDFs.
//
// Every figure here was recomputed in node before it was written down (see
// docs/testing.md): Copperline's trial balance foots to $1,451,400 on both sides,
// Boonville's to $80,800, Bulldog's net income is $42,500 and its ending retained
// earnings $111,150.
//
// Step shape:
//   { id, kind, prompt, ...answer, why, watchFor?, hint? }
// `why` states the answer outright — it is the feedback register.
// `hint` stops one reasoning step short and never names the answer (CLAUDE.md #7).
// `watchFor` is the exam-technique note: the trap, not the arithmetic.
//
// IDs are namespaced `P{set}-{step}` so they can never collide with exam (`c1`),
// reinforcement (`xa1`) or level (`L6-q1`) IDs.

export const ACCOUNT_SETS = {
  boonville: [
    'Cash', 'Accounts Receivable', 'Office Furniture', 'Accounts Payable', 'Notes Payable',
    'Common Stock', 'Retained Earnings', 'Service Revenue', 'Rent Expense', 'Salaries Expense',
    'Catering Expense',
  ],
  copperline: [
    'Cash', 'Notes Receivable', 'Accounts Receivable', 'Supplies', 'Prepaid Insurance', 'Equipment',
    'Accounts Payable', 'Notes Payable', 'Unearned Revenue', 'Common Stock', 'Service Revenue',
    'Wages Expense', 'Rent Expense', 'Utilities Expense', 'Dividends',
  ],
  brightwave: [
    'Cash', 'Accounts Receivable', 'Supplies', 'Prepaid Advertising', 'Land', 'Equipment',
    'Accounts Payable', 'Notes Payable', 'Unearned Revenue', 'Common Stock',
    'Consulting Revenue', 'Salaries Expense', 'Utilities Expense', 'Dividends',
  ],
  chapter3: [
    'Cash', 'Accounts Receivable', 'Supplies', 'Prepaid Insurance', 'Equipment',
    'Accumulated Depreciation', 'Accounts Payable', 'Salaries Payable', 'Utilities Payable',
    'Interest Payable', 'Unearned Revenue', 'Notes Payable', 'Common Stock', 'Retained Earnings',
    'Dividends', 'Income Summary', 'Service Revenue', 'Rent Expense', 'Utilities Expense',
    'Salaries Expense', 'Insurance Expense', 'Depreciation Expense', 'Supplies Expense',
    'Interest Expense',
  ],
}

// ── 1 · Chapter 1: accounting terms ─────────────────────────────────
const CHAPTER1 = {
  id: 'ch1-terms',
  title: 'Chapter 1 — Accounting Terms',
  source: "TA worksheet · Chapter 1.2",
  icon: '📘',
  blurb: 'Definitions, the statements, and classifying twenty-four accounts two ways.',
  topics: ['principles', 'classify', 'statements'],
  minutes: 15,
  steps: [
    {
      id: 'P1-1', kind: 'mc',
      prompt: 'Which of the following best defines accounting?',
      options: [
        'The process of identifying, measuring, recording and communicating economic information for effective decision making',
        'The process of only recording cash transactions for tax purposes',
        'A legal requirement for filing annual reports with the SEC',
        'The process of forecasting stock prices for investors',
      ],
      correctIndex: 0,
      why: 'Four verbs, in order: identify, measure, record, communicate — and the point of all four is a decision someone has to make. Accounting is not tax filing, not an SEC rule, and not forecasting.',
      hint: 'Three of these describe a narrow use of accounting information. One describes the process itself.',
    },
    {
      id: 'P1-2', kind: 'mc',
      prompt: "Which financial statement reports a company's assets, liabilities and stockholders' equity at a specific point in time?",
      options: ['Balance Sheet', 'Income Statement', 'Statement of Cash Flows', 'Retained Earnings Statement'],
      correctIndex: 0,
      why: 'The balance sheet is the accounting equation on a page, dated at one instant — "as of December 31". The other three cover a span of time — "for the year ended December 31".',
      watchFor: 'Read the date line on any statement. "As of" means balance sheet. "For the period ended" means one of the other three. Exams test that distinction constantly.',
      hint: 'Which one is a photograph rather than a film?',
    },
    {
      id: 'P1-3', kind: 'mc',
      prompt: 'The Retained Earnings Statement is calculated as:',
      options: ['Net Income − Dividends', 'Revenues − Expenses', 'Assets − Liabilities', 'Current Assets − Current Liabilities'],
      correctIndex: 0,
      why: 'Beginning Retained Earnings + Net Income − Dividends = Ending Retained Earnings. It is the bridge from the income statement to the balance sheet.',
      watchFor: 'Revenues − Expenses is net income, which is only the middle term. Assets − Liabilities is total equity, not retained earnings. Current Assets − Current Liabilities is working capital.',
      hint: 'Which number arrives from the income statement, and what does the company hand back to its owners?',
    },
    {
      id: 'P1-4', kind: 'mc',
      prompt: 'What does a current ratio below 1.00 mean?',
      options: [
        'Current liabilities exceed current assets — the company may not be able to cover what is due within a year',
        'The company is unprofitable this period',
        'The company has more debt than equity',
        'The company has negative retained earnings',
      ],
      correctIndex: 0,
      why: 'Current ratio = Current Assets ÷ Current Liabilities. Below 1.00 means the denominator is bigger: short-term obligations outweigh the short-term resources available to pay them. Working capital is negative.',
      watchFor: 'Liquidity is not profitability. A company can be highly profitable and still fail this test, and a loss-making company can pass it. The ratio says nothing about net income.',
      hint: 'A ratio below one means the bottom number is the bigger one. Which is on the bottom?',
    },
    {
      id: 'P1-5', kind: 'mc',
      prompt: 'What is the formula for Gross Margin?',
      options: [
        'Net Sales − Cost of Goods Sold',
        'Net Sales − Total Expenses',
        'Revenues − Dividends',
        'Net Income ÷ Net Sales',
      ],
      correctIndex: 0,
      why: 'Gross margin strips out only the cost of the goods themselves. Operating expenses come off afterwards to give income from operations. That is why a multiple-step income statement shows the subtotal at all.',
      watchFor: 'Subtracting every expense gives net income, not gross margin. The whole reason for the subtotal is to stop after cost of goods sold.',
      hint: 'Gross comes before operating costs. Which single cost is taken out first?',
    },
    {
      id: 'P1-6', kind: 'classify',
      prompt: 'Part 1 — Classify each item as an asset, a liability, or stockholders’ equity.',
      buckets: ['Asset', 'Liability', "Stockholders' Equity"],
      items: [
        { label: 'Accounts Payable', answer: 'Liability' },
        { label: 'Prepaid Insurance', answer: 'Asset' },
        { label: 'Salaries Payable', answer: 'Liability' },
        { label: 'Buildings', answer: 'Asset' },
        { label: 'Retained Earnings', answer: "Stockholders' Equity" },
        { label: 'Accounts Receivable', answer: 'Asset' },
        { label: 'Bonds Payable', answer: 'Liability' },
        { label: 'Common Stock', answer: "Stockholders' Equity" },
        { label: 'Cash', answer: 'Asset' },
        { label: 'Unearned Revenue', answer: 'Liability' },
        { label: 'Supplies', answer: 'Asset' },
        { label: 'Land', answer: 'Asset' },
      ],
      why: 'Anything ending in "Payable" is owed to an outsider, so it is a liability. Prepaid Insurance is an asset because coverage is still owed TO you. Unearned Revenue is a liability despite the word revenue — you owe the customer service.',
      watchFor: 'Unearned Revenue and Prepaid Insurance are the two that catch people. Both have a word in them that points the wrong way. Ask who owes whom, not what the account is called.',
      hint: 'For each one, ask: does this bring something in, does someone have a claim on it, or is it the owners’ stake?',
    },
    {
      id: 'P1-7', kind: 'classify2',
      prompt: 'Part 2 — For each item, say which statement it appears on and how it is classified.',
      axes: [
        { key: 'statement', label: 'Statement', options: ['Income Statement', 'Balance Sheet'] },
        { key: 'category', label: 'Classified as', options: ['Revenue', 'Expense', 'Asset', 'Liability', 'Equity'] },
      ],
      items: [
        { label: 'Rent Expense', statement: 'Income Statement', category: 'Expense' },
        { label: 'Land', statement: 'Balance Sheet', category: 'Asset' },
        { label: 'Cash', statement: 'Balance Sheet', category: 'Asset' },
        { label: 'Service Revenue', statement: 'Income Statement', category: 'Revenue' },
        { label: 'Prepaid Insurance', statement: 'Balance Sheet', category: 'Asset' },
        { label: 'Utilities Expense', statement: 'Income Statement', category: 'Expense' },
        { label: 'Equipment', statement: 'Balance Sheet', category: 'Asset' },
        { label: 'Common Stock', statement: 'Balance Sheet', category: 'Equity' },
        { label: 'Sales', statement: 'Income Statement', category: 'Revenue' },
        { label: 'Retained Earnings', statement: 'Balance Sheet', category: 'Equity' },
        { label: 'Cost of Goods Sold', statement: 'Income Statement', category: 'Expense' },
        { label: 'Accounts Receivable', statement: 'Balance Sheet', category: 'Asset' },
      ],
      why: 'The two axes move together: revenues and expenses are the income statement; assets, liabilities and equity are the balance sheet. Get the category right and the statement follows automatically.',
      watchFor: 'Cost of Goods Sold is an expense — the word "cost" makes people reach for asset. And Retained Earnings does appear on its own statement as well, but on this worksheet the answer wanted is the balance sheet.',
      hint: 'Five categories, but only two statements. Which three categories always travel together?',
    },
  ],
}

// ── 2 · Boonville: nine entries to a trial balance ──────────────────
const BOONVILLE = {
  id: 'boonville',
  title: 'Boonville — T-Accounts & Trial Balance',
  source: 'TA worksheet · T-Account Practice',
  icon: '🧮',
  blurb: 'Nine December transactions, journalized, posted and footed to a trial balance.',
  topics: ['journal', 'dr-cr', 'trial'],
  minutes: 25,
  accounts: 'boonville',
  intro: 'Boonville is a delivery company that opened in December. Journalize each transaction, then foot the trial balance at December 31.',
  steps: [
    {
      id: 'P2-1', kind: 'entry', date: 'December 1',
      prompt: 'Boonville issues $32,000 of common stock to investors to raise initial capital for operations.',
      answer: { debits: [['Cash', 32000]], credits: [['Common Stock', 32000]] },
      why: 'Cash comes in, so debit Cash. The owners’ stake goes up, so credit Common Stock. Equity increases with credits.',
      watchFor: 'Issuing stock is not revenue. The company sold ownership, not a service.',
      hint: 'Two things happened: the company received something, and someone acquired a claim on it.',
    },
    {
      id: 'P2-2', kind: 'entry', date: 'December 2',
      prompt: 'Boonville borrows funds of $20,000 from Warrick National Bank to support startup expenses.',
      answer: { debits: [['Cash', 20000]], credits: [['Notes Payable', 20000]] },
      why: 'Debit Cash for the money received; credit Notes Payable for the obligation to repay. Borrowing never touches revenue or equity.',
      watchFor: 'Both this entry and the last one debit Cash, but the credits are completely different in kind: one is a debt, one is ownership.',
      hint: 'The company must give this money back. Where do obligations live?',
    },
    {
      id: 'P2-3', kind: 'entry', date: 'December 2',
      prompt: 'Boonville pays rent of $8,000 for the package sorting facility for the current month.',
      answer: { debits: [['Rent Expense', 8000]], credits: [['Cash', 8000]] },
      why: 'The benefit is used up this month, so it is an expense now — not prepaid. Debit Rent Expense, credit Cash.',
      watchFor: '"For the current month" is doing the work. Had it said "for the next six months" this would be Prepaid Rent, an asset.',
      hint: 'Has the company already consumed what it paid for, or does it still have it coming?',
    },
    {
      id: 'P2-4', kind: 'entry', date: 'December 6',
      prompt: 'Boonville acquires office furniture on account for $7,000.',
      answer: { debits: [['Office Furniture', 7000]], credits: [['Accounts Payable', 7000]] },
      why: 'Furniture lasts beyond this period, so it is an asset, not an expense. "On account" means no cash moved — credit Accounts Payable.',
      watchFor: 'Two traps in one line: furniture is capitalised rather than expensed, and "on account" means Cash is untouched.',
      hint: 'Will this still be useful next month? And did any money actually change hands?',
    },
    {
      id: 'P2-5', kind: 'entry', date: 'December 20',
      prompt: 'Boonville completes a delivery contract and invoices Tornado Corporation for $15,000.',
      answer: { debits: [['Accounts Receivable', 15000]], credits: [['Service Revenue', 15000]] },
      why: 'The work is done, so the revenue is earned and recorded now. No cash yet, so the debit is a receivable.',
      watchFor: 'Revenue recognition keys on performance, not payment. Waiting for the cash to record the revenue is the classic error.',
      hint: 'The obligation to the customer has been satisfied. Does it matter that nobody has paid yet?',
    },
    {
      id: 'P2-6', kind: 'entry', date: 'December 24',
      prompt: 'Boonville performs a rush delivery and receives immediate payment of $5,300.',
      answer: { debits: [['Cash', 5300]], credits: [['Service Revenue', 5300]] },
      why: 'Performed and paid at the same moment, so one entry does both: debit Cash, credit Service Revenue.',
      hint: 'Two events collapsed into one. What came in, and what was earned?',
    },
    {
      id: 'P2-7', kind: 'entry', date: 'December 28',
      prompt: 'Tornado Corporation settles its outstanding invoice for delivery services.',
      answer: { debits: [['Cash', 15000]], credits: [['Accounts Receivable', 15000]] },
      why: 'The revenue was already recorded on the 20th. Collecting just swaps one asset for another — receivable down, cash up.',
      watchFor: 'Crediting Service Revenue here would count the same $15,000 twice. This is the single most common mistake on a problem like this.',
      hint: 'Look back at the 20th. Has this revenue already been recorded once?',
    },
    {
      id: 'P2-8', kind: 'entry', date: 'December 29',
      prompt: "Boonville receives a bill of $1,500 from Mac’s Catering for services at a client event that will be paid later.",
      answer: { debits: [['Catering Expense', 1500]], credits: [['Accounts Payable', 1500]] },
      why: 'The service has been received, so the expense belongs to December even though payment comes later. Debit Catering Expense, credit Accounts Payable.',
      watchFor: 'Expenses are recorded when incurred, not when paid — the mirror image of the revenue rule two entries ago.',
      hint: 'The catering already happened. Does the payment date change which month owns the cost?',
    },
    {
      id: 'P2-9', kind: 'entry', date: 'December 31',
      prompt: 'Boonville pays salaries of $2,600 to its secretarial staff for work performed in December.',
      answer: { debits: [['Salaries Expense', 2600]], credits: [['Cash', 2600]] },
      why: 'Work performed and paid in the same period: debit Salaries Expense, credit Cash. No payable is involved because nothing is left owing.',
      hint: 'Earned in December, paid in December. Is anything still outstanding?',
    },
    {
      id: 'P2-10', kind: 'numeric',
      prompt: 'Foot the trial balance. What is the total of the DEBIT column at December 31?',
      answer: 80800,
      why: 'Cash $61,700 + Office Furniture $7,000 + Catering Expense $1,500 + Rent Expense $8,000 + Salaries Expense $2,600 = $80,800. Accounts Receivable is zero — billed $15,000 on the 20th and collected all of it on the 28th.',
      watchFor: 'Accounts Receivable nets to nothing. An account can appear in your ledger and still have no balance to carry to the trial balance.',
      hint: 'Work out Cash first by running every entry that touched it. Then ask which accounts still carry a balance at all.',
    },
    {
      id: 'P2-11', kind: 'numeric',
      prompt: 'What is the total of the CREDIT column?',
      answer: 80800,
      why: 'Accounts Payable $8,500 + Notes Payable $20,000 + Common Stock $32,000 + Service Revenue $20,300 = $80,800 — equal to the debit column, as it must be.',
      watchFor: 'Accounts Payable is $8,500, not $7,000: the furniture on the 6th and the catering bill on the 29th both sit there unpaid.',
      hint: 'Every entry you made put the same amount on both sides. What does that guarantee about the two totals?',
    },
  ],
}

// ── 3 · Copperline: fourteen transactions ───────────────────────────
const COPPERLINE = {
  id: 'copperline-events',
  title: 'Copperline Event Productions — Comprehensive',
  source: 'TA worksheet · Chapter 2',
  icon: '🎪',
  blurb: 'Fourteen transactions across a full year, ending in an unadjusted trial balance.',
  topics: ['journal', 'dr-cr', 'trial', 'ar-ap'],
  minutes: 40,
  accounts: 'copperline',
  intro: 'Copperline Event Productions began operations during 2025. Each event below aggregates many individual transactions. Journalize each one, then foot the unadjusted trial balance at 12/31/25.',
  steps: [
    {
      id: 'P3-1', kind: 'entry', date: 'January 5, 2025',
      prompt: 'Copperline issued a note receivable, lending $75,000 to a business partner. Principal and interest are due in six months.',
      answer: { debits: [['Notes Receivable', 75000]], credits: [['Cash', 75000]] },
      why: 'Copperline is the lender here. Cash goes out, and a formal right to be repaid comes in: debit Notes Receivable, credit Cash.',
      watchFor: 'Read the direction carefully. Lending money creates a receivable — an asset. Four days later the company borrows, which creates a payable. Same problem, opposite sides.',
      hint: 'Who handed over the money in this one?',
    },
    {
      id: 'P3-2', kind: 'entry', date: 'January 9, 2025',
      prompt: 'The company borrowed $450,000 on a 5-year, 6% note payable from Summit Bank. Interest and principal are due at maturity.',
      answer: { debits: [['Cash', 450000]], credits: [['Notes Payable', 450000]] },
      why: 'Cash in, obligation out: debit Cash $450,000, credit Notes Payable $450,000. Record only the principal — no interest has accrued on day one.',
      watchFor: 'The 6% is not part of this entry. Interest accrues over time and is picked up by an adjusting entry, which is Chapter 3 work, not this.',
      hint: 'What has actually changed hands today, and has any interest been earned yet?',
    },
    {
      id: 'P3-3', kind: 'entry', date: 'January 31, 2025',
      prompt: 'The company paid rent for office, warehouse and studio space totalling $54,000.',
      answer: { debits: [['Rent Expense', 54000]], credits: [['Cash', 54000]] },
      why: 'Rent for space already occupied is an expense of the period: debit Rent Expense, credit Cash.',
      hint: 'Is this paying for something used up, or something still to come?',
    },
    {
      id: 'P3-4', kind: 'entry', date: 'April 1, 2025',
      prompt: 'Copperline purchased event supplies on account for $96,400.',
      answer: { debits: [['Supplies', 96400]], credits: [['Accounts Payable', 96400]] },
      why: 'Supplies are an ASSET when bought — they become Supplies Expense only as they are consumed. "On account" means credit Accounts Payable.',
      watchFor: 'Debiting Supplies Expense straight away is the usual slip. Nothing has been used yet.',
      hint: 'Have the supplies been used, or are they sitting in a cupboard?',
    },
    {
      id: 'P3-5', kind: 'entry', date: 'May 1, 2025',
      prompt: 'The company purchased sound and lighting equipment for $410,000 cash.',
      answer: { debits: [['Equipment', 410000]], credits: [['Cash', 410000]] },
      why: 'Equipment has a life beyond this period, so it is capitalised: debit Equipment, credit Cash. It is expensed gradually through depreciation later.',
      hint: 'Will this still be here next year?',
    },
    {
      id: 'P3-6', kind: 'entry', date: 'August 15, 2025',
      prompt: 'The company paid $85,000 toward amounts previously owed to suppliers.',
      answer: { debits: [['Accounts Payable', 85000]], credits: [['Cash', 85000]] },
      why: 'Settling a payable reduces a liability and reduces cash. No expense is recorded — the expense (or asset) went in back on April 1.',
      watchFor: 'Paying a bill is not an expense. Recording one here would double-count the April purchase.',
      hint: 'What was recorded when the supplies arrived? Does paying for them change that?',
    },
    {
      id: 'P3-7', kind: 'entry', date: 'November 1, 2025',
      prompt: 'Copperline purchased with cash a 12-month equipment insurance policy for $18,000. Coverage begins on January 1, 2026.',
      answer: { debits: [['Prepaid Insurance', 18000]], credits: [['Cash', 18000]] },
      why: 'Cash left the business now, so the entry is made now — but coverage has not started, so nothing is expense yet. The whole $18,000 sits in Prepaid Insurance.',
      watchFor: 'Coverage begins NEXT year. At 12/31/25 not a cent has expired, so there is no adjusting entry for it either. Pro-rating two months here would be wrong.',
      hint: 'The money is gone, but has any of the coverage been used?',
    },
    {
      id: 'P3-8', kind: 'entry', date: 'November 15, 2025',
      prompt: 'The company received $120,000 cash from Harborview Corp. for a one-year event production contract beginning January 1, 2026.',
      answer: { debits: [['Cash', 120000]], credits: [['Unearned Revenue', 120000]] },
      why: 'Cash arrived, so debit Cash. Nothing has been performed, so the credit is a liability — an obligation to deliver. Unearned Revenue is a liability despite its name.',
      watchFor: 'This is the mirror image of the insurance entry: there, Copperline prepaid; here, a customer prepaid Copperline. Neither one produces revenue or expense in 2025.',
      hint: 'The contract starts in January. What does Copperline owe Harborview right now?',
    },
    {
      id: 'P3-9', kind: 'entry', date: 'December 31, 2025',
      prompt: 'Employee wages earned and paid totalled $268,000.',
      answer: { debits: [['Wages Expense', 268000]], credits: [['Cash', 268000]] },
      why: 'Earned and paid in the same period, so expense and cash move together. No payable remains.',
      hint: 'Is anything still owed to employees afterwards?',
    },
    {
      id: 'P3-10', kind: 'entry', date: 'December 31, 2025',
      prompt: 'The company billed clients on account for event production services totalling $742,000.',
      answer: { debits: [['Accounts Receivable', 742000]], credits: [['Service Revenue', 742000]] },
      why: 'Services performed, so revenue is earned. Billed rather than collected, so the debit is Accounts Receivable.',
      hint: 'Has the work been done? Has the money arrived?',
    },
    {
      id: 'P3-11', kind: 'entry', date: 'December 31, 2025',
      prompt: 'The company provided services and immediately collected $128,000 cash from clients.',
      answer: { debits: [['Cash', 128000]], credits: [['Service Revenue', 128000]] },
      why: 'Performed and collected at once: debit Cash, credit Service Revenue. Total revenue for the year is this plus the billed $742,000.',
      hint: 'Both halves of the transaction happened today.',
    },
    {
      id: 'P3-12', kind: 'entry', date: 'December 31, 2025',
      prompt: 'The company collected $610,000 from clients who had previously been billed on account.',
      answer: { debits: [['Cash', 610000]], credits: [['Accounts Receivable', 610000]] },
      why: 'The revenue was recorded when the work was billed. Collecting converts a receivable into cash: debit Cash, credit Accounts Receivable.',
      watchFor: 'Crediting Service Revenue would count $610,000 of the $742,000 twice and inflate revenue to $1.48m. Always ask whether the revenue is already on the books.',
      hint: 'These clients were billed a moment ago. What was recorded then?',
    },
    {
      id: 'P3-13', kind: 'entry', date: 'December 31, 2025',
      prompt: 'Utilities expense incurred and paid totalled $24,600.',
      answer: { debits: [['Utilities Expense', 24600]], credits: [['Cash', 24600]] },
      why: 'Incurred and paid together: debit Utilities Expense, credit Cash.',
      hint: 'Nothing outstanding here.',
    },
    {
      id: 'P3-14', kind: 'entry', date: 'December 31, 2025',
      prompt: 'The company declared and paid $28,000 in dividends.',
      answer: { debits: [['Dividends', 28000]], credits: [['Cash', 28000]] },
      why: 'Dividends are a distribution to owners, not a cost of doing business. Debit Dividends (a debit-balance equity account), credit Cash.',
      watchFor: 'Dividends never appear on the income statement. They reduce Retained Earnings at closing, not net income.',
      hint: 'Is this a cost of earning revenue, or a payout of profit already earned?',
    },
    {
      id: 'P3-15', kind: 'numeric',
      prompt: 'What is the balance of CASH at 12/31/25?',
      answer: 345400,
      why: 'Running the twelve entries that touched Cash: −75,000 + 450,000 − 54,000 − 410,000 − 85,000 − 18,000 + 120,000 − 268,000 + 128,000 + 610,000 − 24,600 − 28,000 = $345,400.',
      watchFor: 'Cash dips deeply negative in the middle of the year and is rescued by the December collections. Do not assume a running balance is wrong just because it goes red part-way.',
      hint: 'Twelve of the fourteen entries touch Cash. Take them in date order and keep a running total.',
    },
    {
      id: 'P3-16', kind: 'numeric',
      prompt: 'What is the balance of ACCOUNTS RECEIVABLE at 12/31/25?',
      answer: 132000,
      why: '$742,000 billed − $610,000 collected = $132,000 still owed by clients.',
      hint: 'Only two entries touched it.',
    },
    {
      id: 'P3-17', kind: 'numeric',
      prompt: 'What is the total of the trial balance (each column) at 12/31/25?',
      answer: 1451400,
      why: 'Both columns foot to $1,451,400. Debits: Cash 345,400 + Notes Receivable 75,000 + A/R 132,000 + Supplies 96,400 + Prepaid Insurance 18,000 + Equipment 410,000 + Wages 268,000 + Rent 54,000 + Utilities 24,600 + Dividends 28,000. Credits: A/P 11,400 + Notes Payable 450,000 + Unearned Revenue 120,000 + Service Revenue 870,000.',
      watchFor: 'Common Stock has a line on the worksheet, but no transaction in this handout issues any, so it carries no balance — and the columns still foot, because every entry you made put equal amounts on both sides. Do not plug a figure to force a balance. One caveat worth raising with your TA: if the class answer key shows an amount in Common Stock, then a transaction is missing from the printed sheet and every total shifts by that amount.',
      hint: 'Total the debit column first. Then check: does any account on the worksheet have no entries at all?',
    },
  ],
}

// ── 4 · Chapter 3: adjusting and closing ────────────────────────────
const CHAPTER3 = {
  id: 'ch3-adjusting-closing',
  title: 'Chapter 3 — Adjusting & Closing Entries',
  source: 'TA worksheet · Chapter 3 Entire Practice Problem',
  icon: '⏳',
  blurb: 'Deferrals, accruals, then four closing entries from an adjusted trial balance.',
  topics: ['adjusting', 'statements'],
  minutes: 35,
  accounts: 'chapter3',
  intro: 'Three companies, three stages of the cycle. Ridgeline tests deferrals, War Eagle tests accruals, and Bulldog closes the books.',
  steps: [
    {
      id: 'P4-1', kind: 'entry', date: 'December 31, 2024', group: 'Ridgeline — deferrals',
      prompt: 'Ridgeline paid $3,600 for a 3-year insurance policy on April 1, 2024, debited to Prepaid Insurance. Coverage began April 1. Record the adjustment at December 31, 2024.',
      answer: { debits: [['Insurance Expense', 900]], credits: [['Prepaid Insurance', 900]] },
      why: '$3,600 ÷ 36 months = $100 per month. April through December is 9 months, so $900 has expired. $2,700 remains on the balance sheet as an asset.',
      watchFor: 'Three years is 36 months, not 3. Dividing by 3 and taking a fraction of a year is the mistake this problem is built to catch.',
      hint: 'How many months of coverage does $3,600 buy, and how many of them are behind you?',
    },
    {
      id: 'P4-2', kind: 'entry', date: 'December 31, 2024', group: 'Ridgeline — deferrals',
      prompt: 'Supplies began 2024 at $1,800. Purchases during the year were $6,200. A physical count at year end found $2,100 on hand.',
      answer: { debits: [['Supplies Expense', 5900]], credits: [['Supplies', 5900]] },
      why: 'Beginning $1,800 + purchased $6,200 = $8,000 available; $2,100 remains, so $5,900 was used. The expense is what has gone, not what is left.',
      watchFor: 'The count tells you the ENDING balance. Recording $2,100 as the expense is the trap — that figure is what survives, not what was consumed.',
      hint: 'Work out how much was available to use all year, then compare with what is still there.',
    },
    {
      id: 'P4-3', kind: 'entry', date: 'December 31, 2024', group: 'Ridgeline — deferrals',
      prompt: 'Falcon Industries prepaid $120,000 on July 1 for a 4-year consulting contract. At year end, Ridgeline determined that $12,500 of services under the contract have been provided.',
      answer: { debits: [['Unearned Revenue', 12500]], credits: [['Service Revenue', 12500]] },
      why: 'Revenue is recognised as the obligation is satisfied, and the problem tells you exactly how much was satisfied: $12,500. Move that from the liability to revenue.',
      watchFor: 'This one punishes autopilot. Straight-lining $120,000 over 48 months gives $2,500 a month, and six months would be $15,000 — but the problem states what was actually performed. When a problem gives you the work completed, that figure governs, not the calendar.',
      hint: 'Two numbers are available here: one you could calculate, one you were given. Which one measures performance?',
    },
    {
      id: 'P4-4', kind: 'entry', date: 'December 31, 2024', group: 'War Eagle — accruals',
      prompt: 'War Eagle owed employees $5,600 for work done in December. These wages will not be paid until January 2025.',
      answer: { debits: [['Salaries Expense', 5600]], credits: [['Salaries Payable', 5600]] },
      why: 'The work was done in December, so the expense belongs to December. Nothing has been paid, so the credit is a liability.',
      watchFor: 'Never credit Cash in an adjusting entry. If cash is moving, it is not an adjustment.',
      hint: 'Which period did the company get the benefit of this work in?',
    },
    {
      id: 'P4-5', kind: 'entry', date: 'December 31, 2024', group: 'War Eagle — accruals',
      prompt: 'The company performed consulting services for a customer during the month and has not yet invoiced them. The services provided were $28,000.',
      answer: { debits: [['Accounts Receivable', 28000]], credits: [['Service Revenue', 28000]] },
      why: 'An accrued revenue: performance came first, the invoice and cash come later. Debit Accounts Receivable, credit Service Revenue.',
      watchFor: 'Waiting for the invoice would push $28,000 of earned revenue into the wrong year. The invoice is paperwork; performance is the trigger.',
      hint: 'The work is finished. Does an unsent invoice change which year earned it?',
    },
    {
      id: 'P4-6', kind: 'entry', date: 'December 31, 2024', group: 'War Eagle — accruals',
      prompt: 'The company received a December utility bill of $740 that will be paid in January 2025.',
      answer: { debits: [['Utilities Expense', 740]], credits: [['Utilities Payable', 740]] },
      why: 'The utilities were consumed in December, so the expense is December’s. Unpaid at year end, so credit Utilities Payable.',
      hint: 'Same shape as the wages accrual, different account.',
    },
    {
      id: 'P4-7', kind: 'entry', date: 'December 31, 2024', group: 'War Eagle — accruals',
      prompt: 'The company borrowed $150,000 from Regions Bank on a 4-year, 8% note payable on March 1, 2024. Accrue the interest owed at December 31.',
      answer: { debits: [['Interest Expense', 10000]], credits: [['Interest Payable', 10000]] },
      why: 'Principal × Rate × Time = $150,000 × 8% × 10/12 = $10,000. March 1 to December 31 is ten months, not a full year.',
      watchFor: 'Two traps stacked. The rate is annual, so you must pro-rate — and the note has only been outstanding since March, so the fraction is 10/12, not 12/12. Using the full $12,000 is the intended miss. The 4-year term is irrelevant to this year’s accrual.',
      hint: 'The rate is quoted per year. How much of this year has the company actually had the money?',
    },
    {
      id: 'P4-8', kind: 'numeric', group: 'Bulldog — closing',
      prompt: "From Bulldog’s adjusted trial balance, what is TOTAL EXPENSES? (Rent 1,800 · Utilities 3,900 · Salaries 5,200 · Insurance 4,300 · Depreciation 1,300 · Supplies 3,000)",
      answer: 19500,
      why: '1,800 + 3,900 + 5,200 + 4,300 + 1,300 + 3,000 = $19,500. Six expense accounts, all with debit balances.',
      watchFor: 'Dividends of $3,200 is NOT an expense and must stay out of this total. It has a debit balance like the expenses do, which is exactly why it gets swept in by mistake.',
      hint: 'Six accounts, all of them costs of running the business. One other debit-balance account is tempting and does not belong.',
    },
    {
      id: 'P4-9', kind: 'numeric', group: 'Bulldog — closing',
      prompt: 'Service Revenue is $62,000. What is NET INCOME?',
      answer: 42500,
      why: 'Net income is revenue less the expenses incurred to earn it: $62,000 − $19,500 = $42,500. This single figure is what closing entry 3 moves into Retained Earnings.',
      watchFor: 'Subtracting dividends as well would give $39,300 — a classic wrong answer. Dividends are not an expense.',
      hint: 'Revenue minus expenses. Nothing else.',
    },
    {
      id: 'P4-10', kind: 'entry', date: 'December 31, 2024', group: 'Bulldog — closing',
      prompt: 'Closing entry 1 — close the revenue account.',
      answer: { debits: [['Service Revenue', 62000]], credits: [['Income Summary', 62000]] },
      why: 'Service Revenue carries a credit balance, so you debit it to bring it to zero, with the other side to Income Summary.',
      watchFor: 'Closing always moves an account to zero by entering the OPPOSITE of its normal balance. Revenue is a credit account, so it is closed with a debit.',
      hint: 'What side does revenue normally sit on, and what would flatten it?',
    },
    {
      id: 'P4-11', kind: 'entry', date: 'December 31, 2024', group: 'Bulldog — closing',
      prompt: 'Closing entry 2 — close the six expense accounts.',
      answer: {
        debits: [['Income Summary', 19500]],
        credits: [
          ['Rent Expense', 1800], ['Utilities Expense', 3900], ['Salaries Expense', 5200],
          ['Insurance Expense', 4300], ['Depreciation Expense', 1300], ['Supplies Expense', 3000],
        ],
      },
      why: 'Expenses carry debit balances, so each is credited to zero, and Income Summary is debited for the $19,500 total.',
      watchFor: 'One debit, six credits — closing entries are often compound. And Dividends is not in this entry; it gets its own, and it does not go through Income Summary at all.',
      hint: 'Every expense has to end at zero. What single account absorbs them all?',
    },
    {
      id: 'P4-12', kind: 'entry', date: 'December 31, 2024', group: 'Bulldog — closing',
      prompt: 'Closing entry 3 — close Income Summary to Retained Earnings.',
      answer: { debits: [['Income Summary', 42500]], credits: [['Retained Earnings', 42500]] },
      why: 'Income Summary now holds $62,000 credit less $19,500 debit = $42,500 credit, which is net income. Debit it to zero and credit Retained Earnings — profit belongs to the owners.',
      watchFor: 'Had the company made a loss, this entry reverses: credit Income Summary, debit Retained Earnings. The direction follows the result, not a memorised pattern.',
      hint: 'What balance is sitting in Income Summary after the first two entries, and where does profit end up?',
    },
    {
      id: 'P4-13', kind: 'entry', date: 'December 31, 2024', group: 'Bulldog — closing',
      prompt: 'Closing entry 4 — close Dividends.',
      answer: { debits: [['Retained Earnings', 3200]], credits: [['Dividends', 3200]] },
      why: 'Dividends carries a debit balance, so credit it to zero and debit Retained Earnings. Dividends reduce what is retained.',
      watchFor: 'Dividends closes DIRECTLY to Retained Earnings, never through Income Summary. Routing it through would corrupt net income.',
      hint: 'Dividends are not a cost of earning revenue. Should they touch the account that measures profit?',
    },
    {
      id: 'P4-14', kind: 'numeric', group: 'Bulldog — closing',
      prompt: 'Retained Earnings opened at $71,850. What is the ENDING balance after closing?',
      answer: 111150,
      why: '$71,850 + $42,500 net income − $3,200 dividends = $111,150. That is the figure carried to the balance sheet and to the post-closing trial balance.',
      watchFor: 'This is the retained earnings statement in one line. If your balance sheet will not balance, this is the first number to re-check.',
      hint: 'Beginning balance, plus what the year earned, less what was paid out.',
    },
  ],
}


// ── 5 · BrightWave: the other Chapter 2 problem, and it has a key ───
// The only TA problem in this file with an official answer key attached. Every
// figure below was checked against that key line by line, and the ledger is
// re-derived from these entries in the verification script.
const BRIGHTWAVE = {
  id: 'brightwave',
  title: 'BrightWave Consulting — Comprehensive',
  source: 'TA worksheet · Chapter 2 (answer key provided)',
  icon: '🌊',
  blurb: 'Thirteen transactions, a three-account entry, and a trial balance with a line that stays empty.',
  topics: ['journal', 'dr-cr', 'trial', 'ar-ap'],
  minutes: 35,
  accounts: 'brightwave',
  intro: 'BrightWave began operations during 2026. The handout warns you directly: some transactions involve more than two accounts, and similar-looking events — a purchase on account versus a cash purchase, billed revenue versus cash revenue — hit different accounts. Journalize each one, then foot the trial balance at 12/31/26.',
  steps: [
    {
      id: 'P5-1', kind: 'entry', date: 'January 2, 2026',
      prompt: 'BrightWave Consulting Group, Inc. issued common stock for $150,000 cash.',
      answer: { debits: [['Cash', 150000]], credits: [['Common Stock', 150000]] },
      why: 'Cash in, so debit Cash. Investors receive an ownership stake, so credit Common Stock — equity increases with credits. This is the capital that funds everything that follows.',
      hint: 'A company that has just begun operations needs money before it can spend any. Where does the first money come from?',
    },
    {
      id: 'P5-2', kind: 'entry', date: 'January 8, 2026',
      prompt: 'The company purchased office equipment for $45,000, paying $15,000 cash and signing a 3-year note payable for the remaining $30,000.',
      answer: { debits: [['Equipment', 45000]], credits: [['Cash', 15000], ['Notes Payable', 30000]] },
      why: 'The asset is recorded at its full cost of $45,000 regardless of how it was paid for. The credit side splits: $15,000 of cash left, and a $30,000 obligation was created.',
      watchFor: 'A compound entry — one debit, two credits. Recording only the $15,000 paid understates the asset and hides the debt entirely. The amount you record is what the thing COST, not what you handed over today.',
      hint: 'How much equipment does the company now own? Then ask how that was funded — and whether it was funded one way or two.',
    },
    {
      id: 'P5-3', kind: 'entry', date: 'January 20, 2026',
      prompt: 'BrightWave paid $12,000 cash for a 6-month advertising campaign that will begin next month.',
      answer: { debits: [['Prepaid Advertising', 12000]], credits: [['Cash', 12000]] },
      why: 'Paying ahead of the benefit creates an asset. The campaign has not started, so nothing has been used up and no expense belongs to January.',
      watchFor: '"Will begin next month" is the whole point. Debiting Advertising Expense here reports a cost before a single advert has run.',
      hint: 'Has the company received the thing it paid for yet?',
    },
    {
      id: 'P5-4', kind: 'entry', date: 'February 5, 2026',
      prompt: 'The company purchased office supplies for $8,200 cash.',
      answer: { debits: [['Supplies', 8200]], credits: [['Cash', 8200]] },
      why: 'Supplies are an asset when bought. They become Supplies Expense only as they are consumed, which is a Chapter 3 adjustment, not a Chapter 2 transaction.',
      hint: 'Have the supplies been used yet?',
    },
    {
      id: 'P5-5', kind: 'entry', date: 'March 1, 2026',
      prompt: 'BrightWave purchased land for a future office site, paying $200,000 cash.',
      answer: { debits: [['Land', 200000]], credits: [['Cash', 200000]] },
      why: 'Land is an asset carried at cost. Note it is never depreciated, unlike the equipment bought in January.',
      watchFor: 'This single transaction drives Cash deeply negative on paper for most of the year. That is fine in an aggregated problem — do not assume you have made an error when the running balance goes red.',
      hint: 'A future office site is still something the company owns today.',
    },
    {
      id: 'P5-6', kind: 'entry', date: 'April 1, 2026',
      prompt: 'The company received $60,000 cash in advance from a client for a 12-month consulting retainer beginning in May.',
      answer: { debits: [['Cash', 60000]], credits: [['Unearned Revenue', 60000]] },
      why: 'Cash arrived, so debit Cash. Nothing has been performed, so the credit is a liability — an obligation to deliver consulting. Unearned Revenue is a liability despite the word revenue.',
      watchFor: 'This is the mirror image of the January advertising entry: there BrightWave prepaid someone else, here a client prepaid BrightWave. Neither produces revenue or expense on the day the cash moves.',
      hint: 'What does BrightWave owe the client the moment the money lands?',
    },
    {
      id: 'P5-7', kind: 'entry', date: 'May 15, 2026',
      prompt: 'BrightWave purchased additional computer equipment on account for $22,000.',
      answer: { debits: [['Equipment', 22000]], credits: [['Accounts Payable', 22000]] },
      why: 'Same asset as January, different funding: "on account" means no cash moved, so the credit is Accounts Payable. Equipment now totals $67,000.',
      watchFor: 'Compare this with the January purchase. Identical-looking events, completely different credits — that is exactly what the handout warns about in its opening paragraph.',
      hint: 'Did any money leave the business today?',
    },
    {
      id: 'P5-8', kind: 'entry', date: 'June 15, 2026',
      prompt: 'The company provided consulting services on account, billing clients $175,000.',
      answer: { debits: [['Accounts Receivable', 175000]], credits: [['Consulting Revenue', 175000]] },
      why: 'The work is done, so the revenue is earned and recorded now. Billed rather than collected, so the debit is a receivable.',
      hint: 'Performance is complete. Does an unpaid invoice change that?',
    },
    {
      id: 'P5-9', kind: 'entry', date: 'August 1, 2026',
      prompt: 'The company collected $120,000 cash from clients previously billed on account.',
      answer: { debits: [['Cash', 120000]], credits: [['Accounts Receivable', 120000]] },
      why: 'The revenue was already recorded on 15 June. Collecting swaps one asset for another: receivable down, cash up. Accounts Receivable is left at $55,000.',
      watchFor: 'Crediting Consulting Revenue here would count $120,000 twice and inflate revenue to $335,000. Always ask whether the revenue is already on the books.',
      hint: 'Look back at June. Has this revenue been recorded once already?',
    },
    {
      id: 'P5-10', kind: 'entry', date: 'September 1, 2026',
      prompt: 'BrightWave made a $10,000 principal payment on the note payable from the January equipment purchase.',
      answer: { debits: [['Notes Payable', 10000]], credits: [['Cash', 10000]] },
      why: 'A principal payment reduces the debt and reduces cash. Notes Payable falls from $30,000 to $20,000.',
      watchFor: 'The word PRINCIPAL is doing real work. Interest is not part of this entry — accruing it is a Chapter 3 adjustment, and this problem stops before adjustments.',
      hint: 'What exactly is being repaid here, and is anything else being paid alongside it?',
    },
    {
      id: 'P5-11', kind: 'entry', date: 'October 1, 2026',
      prompt: 'The company paid employee salaries totalling $95,000.',
      answer: { debits: [['Salaries Expense', 95000]], credits: [['Cash', 95000]] },
      why: 'Incurred and paid together, so expense and cash move at once. No payable remains.',
      hint: 'Is anything still owed to employees afterwards?',
    },
    {
      id: 'P5-12', kind: 'entry', date: 'November 15, 2026',
      prompt: 'BrightWave performed consulting services and immediately collected $40,000 cash from clients.',
      answer: { debits: [['Cash', 40000]], credits: [['Consulting Revenue', 40000]] },
      why: 'Performed and collected in one moment: debit Cash, credit Consulting Revenue. Revenue for the year is this plus the $175,000 billed in June.',
      watchFor: 'Compare with 15 June. Same revenue account, different debit — billed revenue creates a receivable, cash revenue does not.',
      hint: 'Both halves of this transaction happened today.',
    },
    {
      id: 'P5-13', kind: 'entry', date: 'December 31, 2026',
      prompt: 'BrightWave declared and paid $18,000 in cash dividends.',
      answer: { debits: [['Dividends', 18000]], credits: [['Cash', 18000]] },
      why: 'A distribution to owners, not a cost of doing business. Debit Dividends — a debit-balance equity account — and credit Cash.',
      watchFor: 'Dividends never touch the income statement. They reduce Retained Earnings at closing, not net income.',
      hint: 'Is this a cost of earning revenue, or a payout of profit already earned?',
    },
    {
      id: 'P5-14', kind: 'numeric',
      prompt: 'What is the balance of CASH at 12/31/26?',
      answer: 11800,
      why: 'Running every entry that touched Cash: 150,000 − 15,000 − 12,000 − 8,200 − 200,000 + 60,000 + 120,000 − 10,000 − 95,000 + 40,000 − 18,000 = $11,800.',
      watchFor: 'Cash is deeply negative from March until the August collection. That is normal for an aggregated problem and is not a signal that you have gone wrong.',
      hint: 'Eleven of the thirteen entries touch Cash. Take them in date order and keep a running total.',
    },
    {
      id: 'P5-15', kind: 'numeric',
      prompt: 'What is the balance of EQUIPMENT at 12/31/26?',
      answer: 67000,
      why: '$45,000 bought on 8 January at full cost, plus $22,000 bought on account on 15 May = $67,000.',
      watchFor: 'If you get $37,000 you recorded the January equipment at the $15,000 cash paid instead of its $45,000 cost.',
      hint: 'Two purchases. Was either one recorded at less than what the equipment cost?',
    },
    {
      id: 'P5-16', kind: 'numeric',
      prompt: 'What is the balance of NOTES PAYABLE at 12/31/26?',
      answer: 20000,
      why: '$30,000 signed on 8 January less the $10,000 principal repaid on 1 September = $20,000.',
      hint: 'One note, created once and partly repaid once.',
    },
    {
      id: 'P5-17', kind: 'numeric',
      prompt: 'What does UTILITIES EXPENSE show on the trial balance?',
      answer: 0,
      why: 'Nothing. The account has a printed line on the worksheet, but no transaction in this problem affects it — the TA’s own key states it is $0. A worksheet lists the accounts that MIGHT be used, not the ones that were.',
      watchFor: 'This is the lesson to carry into any trial balance: an account with a line and no postings has no balance, and the columns still agree because every entry you made put equal amounts on both sides. Never plug a figure to force a balance.',
      hint: 'Read back through the thirteen transactions. Does a single one of them mention utilities?',
    },
    {
      id: 'P5-18', kind: 'numeric',
      prompt: 'What is the total of the trial balance (each column) at 12/31/26?',
      answer: 467000,
      why: 'Both columns foot to $467,000. Debits: Cash 11,800 + A/R 55,000 + Supplies 8,200 + Prepaid Advertising 12,000 + Land 200,000 + Equipment 67,000 + Salaries 95,000 + Dividends 18,000. Credits: A/P 22,000 + Notes Payable 20,000 + Unearned Revenue 60,000 + Common Stock 150,000 + Consulting Revenue 215,000.',
      watchFor: 'This figure is confirmed by the TA’s answer key, so it is the one number in these problem sets you can check against the course directly.',
      hint: 'Total the debit column first, then the credit column, and remember one account contributes nothing.',
    },
  ],
}

export const PROBLEM_SETS = [CHAPTER1, BOONVILLE, COPPERLINE, BRIGHTWAVE, CHAPTER3]

export function problemSetById(id) {
  return PROBLEM_SETS.find(p => p.id === id) || null
}

// How many individually graded answers a set contains — a classify step counts
// once per item, so the progress bar reflects real work rather than screens.
export function stepWeight(step) {
  if (step.kind === 'classify') return step.items.length
  if (step.kind === 'classify2') return step.items.length
  return 1
}

export function setWeight(set) {
  return set.steps.reduce((s, st) => s + stepWeight(st), 0)
}
