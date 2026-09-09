// Practice-exam question bank.
// kind: 'text'  → options are plain strings
// kind: 'entry' → options are journal-entry line arrays rendered as mini tables
export const SECTIONS = [
  { id: 'classify', label: 'Classifying Accounts', icon: '🗂️', blurb: 'Asset, liability, equity, revenue or expense?' },
  { id: 'dr-cr', label: 'Debits & Credits', icon: '↔️', blurb: 'Normal balances and which side moves an account.' },
  { id: 'ar-ap', label: 'Receivables & Payables', icon: '📥', blurb: 'Who owes whom, and what happens when they pay.' },
  { id: 'journal', label: 'Journal Entries', icon: '📓', blurb: 'Transactions in words → the entry that records them.' },
  { id: 'trial', label: 'Trial Balance', icon: '🧮', blurb: 'Column, order, totals and what it really proves.' },
  { id: 'principles', label: 'Accounting Principles', icon: '📜', blurb: 'Name the rule behind the transaction.' },
]

export const QUESTIONS = [
  // ── Classifying accounts ────────────────────────────────────────────
  {
    id: 'c1', section: 'classify', kind: 'text',
    prompt: 'Which of these is an ASSET?',
    options: ['Accounts Receivable', 'Accounts Payable', 'Unearned Revenue', 'Common Stock'],
    correctIndex: 0,
    explanation: 'Accounts Receivable is money customers owe the company — a future inflow of cash the company controls, which is the definition of an asset. The other three are claims against the company.',
  },
  {
    id: 'c2', section: 'classify', kind: 'text',
    prompt: 'A customer owes your company $2,000 for consulting work you already completed. On your books that is:',
    options: ['Accounts Receivable — an asset', 'Accounts Payable — a liability', 'Unearned Revenue — a liability', 'Service Revenue — revenue'],
    correctIndex: 0,
    explanation: 'The work is done and they owe you, so you hold a receivable. (You also recorded Service Revenue when the work was performed, but the $2,000 still sitting unpaid is the receivable.)',
  },
  {
    id: 'c3', section: 'classify', kind: 'text',
    prompt: 'Your company owes a vendor $800 for supplies purchased on account. That obligation is:',
    options: ['Accounts Payable — a liability', 'Accounts Receivable — an asset', 'Supplies Expense — an expense', 'Notes Receivable — an asset'],
    correctIndex: 0,
    explanation: 'You owe an outsider, so it is a payable — a liability. Payables increase with credits.',
  },
  {
    id: 'c4', section: 'classify', kind: 'text',
    prompt: 'Unearned Revenue is best described as:',
    options: [
      'A liability — cash was collected before the work was done',
      'Revenue — the cash is already in the bank',
      'An asset — the company holds the customer’s cash',
      'Equity — it belongs to the owners',
    ],
    correctIndex: 0,
    explanation: 'Taking money before delivering creates an obligation to perform. Until the work is done, the company owes the customer service (or a refund), which is a liability. Revenue is recorded later, as it is earned.',
  },
  {
    id: 'c5', section: 'classify', kind: 'text',
    prompt: 'A company pays $1,200 today for twelve months of insurance coverage. Prepaid Insurance is:',
    options: ['An asset', 'An expense', 'A liability', 'A contra-revenue account'],
    correctIndex: 0,
    explanation: 'Paying in advance buys something of future value — coverage the company is owed. That is an asset. It becomes Insurance Expense a month at a time as the coverage is used.',
  },
  {
    id: 'c6', section: 'classify', kind: 'text',
    prompt: 'Dividends are:',
    options: [
      'A distribution that reduces equity, with a normal DEBIT balance',
      'An operating expense of the business',
      'A liability until they are paid',
      'A reduction of revenue on the income statement',
    ],
    correctIndex: 0,
    explanation: 'Dividends hand profit back to owners, so they shrink equity — and you shrink equity with a debit. They are not an expense and never appear on the income statement.',
  },
  {
    id: 'c7', section: 'classify', kind: 'text',
    prompt: 'Which account does NOT appear on the balance sheet?',
    options: ['Service Revenue', 'Cash', 'Accounts Payable', 'Common Stock'],
    correctIndex: 0,
    explanation: 'The balance sheet holds only assets, liabilities and equity. Revenue and expense accounts live on the income statement.',
  },
  {
    id: 'c8', section: 'classify', kind: 'text',
    prompt: 'Your company buys $900 of supplies and has not used any of them yet. Supplies is:',
    options: [
      'An asset — it becomes an expense as the supplies get used up',
      'An expense the moment they are purchased',
      'A liability until the supplies are paid for',
      'Equity, because the company owns them outright',
    ],
    correctIndex: 0,
    explanation: 'Unused supplies are a resource the company owns, so they are an asset. Supplies Expense is recorded later, for the portion actually consumed.',
  },

  // ── Debits & credits ────────────────────────────────────────────────
  {
    id: 'd1', section: 'dr-cr', kind: 'text',
    prompt: 'Assets increase with a:',
    options: ['Debit', 'Credit', 'Either, depending on the account', 'Neither — assets only change at year-end'],
    correctIndex: 0,
    explanation: 'Assets, Expenses and Dividends all increase with debits. Remember DEAD: Debits increase Expenses, Assets, Dividends.',
  },
  {
    id: 'd2', section: 'dr-cr', kind: 'text',
    prompt: 'Liabilities increase with a:',
    options: ['Credit', 'Debit', 'Either one', 'Only an adjusting entry'],
    correctIndex: 0,
    explanation: 'Liabilities, Revenue and Capital (equity) increase with credits — the CLIC half of DEAD CLIC.',
  },
  {
    id: 'd3', section: 'dr-cr', kind: 'text',
    prompt: 'Revenue accounts normally carry a:',
    options: ['Credit balance', 'Debit balance', 'Zero balance all period', 'Debit balance until year-end'],
    correctIndex: 0,
    explanation: 'Revenue increases equity, and equity increases with credits — so revenue carries a credit balance all period long.',
  },
  {
    id: 'd4', section: 'dr-cr', kind: 'text',
    prompt: 'Expenses increase with a:',
    options: ['Debit', 'Credit', 'Either one', 'Debit only if paid in cash'],
    correctIndex: 0,
    explanation: 'Expenses reduce equity. Because equity decreases with debits, expense accounts are debited when they grow.',
  },
  {
    id: 'd5', section: 'dr-cr', kind: 'text',
    prompt: 'Which account has a normal DEBIT balance?',
    options: ['Dividends', 'Retained Earnings', 'Unearned Revenue', 'Notes Payable'],
    correctIndex: 0,
    explanation: 'Dividends is the one equity-family account with a debit balance, because it reduces equity. Retained Earnings, Unearned Revenue and Notes Payable all normally sit on the credit side.',
  },
  {
    id: 'd6', section: 'dr-cr', kind: 'text',
    prompt: 'Your company pays off $700 of Accounts Payable. What happens to that account?',
    options: [
      'It is debited $700, which reduces the liability',
      'It is credited $700, which reduces the liability',
      'It is debited $700, which increases the liability',
      'It is untouched — only Cash changes',
    ],
    correctIndex: 0,
    explanation: 'A liability grows with a credit, so it shrinks with a debit. Paying it off means debit Accounts Payable, credit Cash.',
  },
  {
    id: 'd7', section: 'dr-cr', kind: 'text',
    prompt: 'You see a $1,500 credit posted to the Cash account. That means:',
    options: ['Cash went down by $1,500', 'Cash went up by $1,500', 'The company earned $1,500', 'The company owes $1,500'],
    correctIndex: 0,
    explanation: 'Cash is an asset, so it increases with debits and decreases with credits. Money left the business.',
  },
  {
    id: 'd8', section: 'dr-cr', kind: 'text',
    prompt: 'The owner invests cash in the business in exchange for stock. Common Stock is:',
    options: ['Credited — equity increased', 'Debited — equity increased', 'Credited — equity decreased', 'Not affected; only Cash changes'],
    correctIndex: 0,
    explanation: 'Equity increases with credits. Cash is debited (asset up) and Common Stock is credited (equity up).',
  },
  {
    id: 'd9', section: 'dr-cr', kind: 'text',
    prompt: 'A T-account shows $9,400 of debits and $3,100 of credits. Its ending balance is:',
    options: ['$6,300 debit', '$6,300 credit', '$12,500 debit', '$3,100 credit'],
    correctIndex: 0,
    explanation: 'Foot both sides and subtract: $9,400 − $3,100 = $6,300. The balance goes on the larger side, which here is the debit side.',
  },

  // ── Receivables & payables ──────────────────────────────────────────
  {
    id: 'r1', section: 'ar-ap', kind: 'text',
    prompt: 'Which statement is TRUE?',
    options: [
      'Accounts Receivable is an asset; Accounts Payable is a liability',
      'Accounts Receivable is a liability; Accounts Payable is an asset',
      'Both are assets, because both involve money',
      'Both are liabilities until the cash actually moves',
    ],
    correctIndex: 0,
    explanation: 'Recei-V-able → we receive (asset). Pa-Y-able → we pay (liability). They are mirror images of each other.',
  },
  {
    id: 'r2', section: 'ar-ap', kind: 'text',
    prompt: 'A customer pays you $3,500 that they were already billed for. Your TOTAL assets:',
    options: ['Stay exactly the same', 'Increase by $3,500', 'Decrease by $3,500', 'Increase by $7,000'],
    correctIndex: 0,
    explanation: 'Cash goes up $3,500, Accounts Receivable goes down $3,500. One asset simply became another — the total, and the accounting equation, are unchanged.',
  },
  {
    id: 'r3', section: 'ar-ap', kind: 'text',
    prompt: '"Performed $6,000 of services on account" means:',
    options: [
      'Revenue is recorded now; the cash will come later',
      'Nothing is recorded until the customer pays',
      'Cash was received and revenue is recorded now',
      'A liability is recorded because the work is not finished',
    ],
    correctIndex: 0,
    explanation: 'Revenue is recorded when it is earned, not when cash arrives. Debit Accounts Receivable $6,000, credit Service Revenue $6,000.',
  },
  {
    id: 'r4', section: 'ar-ap', kind: 'text',
    prompt: 'When you collect cash from a customer on account, which account is CREDITED?',
    options: ['Accounts Receivable', 'Service Revenue', 'Cash', 'Accounts Payable'],
    correctIndex: 0,
    explanation: 'Debit Cash, credit Accounts Receivable. Crediting Service Revenue instead would count the same income twice — it was already recorded when the work was done.',
  },
  {
    id: 'r5', section: 'ar-ap', kind: 'text',
    prompt: 'When you pay a vendor an amount you owed on account, which account is DEBITED?',
    options: ['Accounts Payable', 'Cash', 'Supplies Expense', 'Accounts Receivable'],
    correctIndex: 0,
    explanation: 'Debit Accounts Payable to shrink the liability, credit Cash as it leaves. No expense is recorded — that happened when the goods were received.',
  },
  {
    id: 'r6', section: 'ar-ap', kind: 'text',
    prompt: 'Recording revenue when the service is performed rather than when the cash arrives is required by:',
    options: [
      'The revenue recognition principle (accrual accounting)',
      'The cash basis of accounting',
      'The matching of debits and credits',
      'The going-concern assumption',
    ],
    correctIndex: 0,
    explanation: 'Accrual accounting recognizes revenue when it is earned and expenses when they are incurred, regardless of when cash moves. That is exactly why Accounts Receivable and Accounts Payable exist.',
  },

  // ── Journal entries ─────────────────────────────────────────────────
  {
    id: 'j1', section: 'journal', kind: 'entry',
    prompt: 'On May 3, Ridge Co. performs $4,000 of services and bills the client, who will pay next month.',
    options: [
      [{ account: 'Accounts Receivable', dr: 4000 }, { account: 'Service Revenue', cr: 4000 }],
      [{ account: 'Cash', dr: 4000 }, { account: 'Service Revenue', cr: 4000 }],
      [{ account: 'Service Revenue', dr: 4000 }, { account: 'Accounts Receivable', cr: 4000 }],
      [{ account: 'Accounts Receivable', dr: 4000 }, { account: 'Unearned Revenue', cr: 4000 }],
    ],
    correctIndex: 0,
    explanation: 'The work is done, so revenue is earned and credited. No cash came in, so the debit goes to Accounts Receivable.',
  },
  {
    id: 'j2', section: 'journal', kind: 'entry',
    prompt: 'On June 12, that client pays Ridge Co. the $4,000 they owed.',
    options: [
      [{ account: 'Cash', dr: 4000 }, { account: 'Accounts Receivable', cr: 4000 }],
      [{ account: 'Cash', dr: 4000 }, { account: 'Service Revenue', cr: 4000 }],
      [{ account: 'Accounts Receivable', dr: 4000 }, { account: 'Cash', cr: 4000 }],
      [{ account: 'Cash', dr: 4000 }, { account: 'Accounts Payable', cr: 4000 }],
    ],
    correctIndex: 0,
    explanation: 'The revenue was already recorded in May. This entry only converts the receivable into cash — crediting revenue again would double-count the income.',
  },
  {
    id: 'j3', section: 'journal', kind: 'entry',
    prompt: 'Purchased $1,500 of supplies on account.',
    options: [
      [{ account: 'Supplies', dr: 1500 }, { account: 'Accounts Payable', cr: 1500 }],
      [{ account: 'Supplies', dr: 1500 }, { account: 'Cash', cr: 1500 }],
      [{ account: 'Supplies Expense', dr: 1500 }, { account: 'Accounts Payable', cr: 1500 }],
      [{ account: 'Accounts Payable', dr: 1500 }, { account: 'Supplies', cr: 1500 }],
    ],
    correctIndex: 0,
    explanation: '"On account" means a payable, not a cash payment. And supplies on hand are an asset — they become Supplies Expense only as they are used.',
  },
  {
    id: 'j4', section: 'journal', kind: 'entry',
    prompt: 'Paid the vendor the $1,500 owed for those supplies.',
    options: [
      [{ account: 'Accounts Payable', dr: 1500 }, { account: 'Cash', cr: 1500 }],
      [{ account: 'Supplies Expense', dr: 1500 }, { account: 'Cash', cr: 1500 }],
      [{ account: 'Supplies', dr: 1500 }, { account: 'Cash', cr: 1500 }],
      [{ account: 'Cash', dr: 1500 }, { account: 'Accounts Payable', cr: 1500 }],
    ],
    correctIndex: 0,
    explanation: 'Paying a bill removes a debt. Debit the liability to shrink it, credit Cash as it leaves. Nothing is expensed here.',
  },
  {
    id: 'j5', section: 'journal', kind: 'entry',
    prompt: 'The owner invests $10,000 cash in the business in exchange for common stock.',
    options: [
      [{ account: 'Cash', dr: 10000 }, { account: 'Common Stock', cr: 10000 }],
      [{ account: 'Cash', dr: 10000 }, { account: 'Service Revenue', cr: 10000 }],
      [{ account: 'Common Stock', dr: 10000 }, { account: 'Cash', cr: 10000 }],
      [{ account: 'Cash', dr: 10000 }, { account: 'Retained Earnings', cr: 10000 }],
    ],
    correctIndex: 0,
    explanation: 'An owner investment is equity, never revenue. Cash (asset) up with a debit, Common Stock (equity) up with a credit.',
  },
  {
    id: 'j6', section: 'journal', kind: 'entry',
    prompt: 'Paid a $2,000 cash dividend to the owner.',
    options: [
      [{ account: 'Dividends', dr: 2000 }, { account: 'Cash', cr: 2000 }],
      [{ account: 'Dividend Expense', dr: 2000 }, { account: 'Cash', cr: 2000 }],
      [{ account: 'Common Stock', dr: 2000 }, { account: 'Cash', cr: 2000 }],
      [{ account: 'Cash', dr: 2000 }, { account: 'Dividends', cr: 2000 }],
    ],
    correctIndex: 0,
    explanation: 'Dividends get their own debit-balance account. They reduce equity but are not an expense, so they never hit the income statement.',
  },
  {
    id: 'j7', section: 'journal', kind: 'entry',
    prompt: 'Bought equipment for $9,000: paid $3,000 in cash and signed a note payable for the rest.',
    options: [
      [{ account: 'Equipment', dr: 9000 }, { account: 'Cash', cr: 3000 }, { account: 'Notes Payable', cr: 6000 }],
      [{ account: 'Equipment', dr: 3000 }, { account: 'Cash', cr: 3000 }],
      [{ account: 'Equipment', dr: 9000 }, { account: 'Cash', cr: 9000 }],
      [{ account: 'Equipment', dr: 6000 }, { account: 'Notes Payable', cr: 6000 }],
    ],
    correctIndex: 0,
    explanation: 'The asset is recorded at its full $9,000 cost regardless of how it was financed. The credits split between cash paid and the new liability. Three lines, still balanced.',
  },
  {
    id: 'j8', section: 'journal', kind: 'entry',
    prompt: 'Received $2,400 cash from a client for a project that begins next month.',
    options: [
      [{ account: 'Cash', dr: 2400 }, { account: 'Unearned Revenue', cr: 2400 }],
      [{ account: 'Cash', dr: 2400 }, { account: 'Service Revenue', cr: 2400 }],
      [{ account: 'Accounts Receivable', dr: 2400 }, { account: 'Service Revenue', cr: 2400 }],
      [{ account: 'Unearned Revenue', dr: 2400 }, { account: 'Cash', cr: 2400 }],
    ],
    correctIndex: 0,
    explanation: 'Nothing has been earned yet, so no revenue. The company now owes the client work — a liability called Unearned Revenue.',
  },
  {
    id: 'j9', section: 'journal', kind: 'entry',
    prompt: 'Received the $300 electric bill for the month; it will be paid next month.',
    options: [
      [{ account: 'Utilities Expense', dr: 300 }, { account: 'Accounts Payable', cr: 300 }],
      [{ account: 'Utilities Expense', dr: 300 }, { account: 'Cash', cr: 300 }],
      [{ account: 'Accounts Payable', dr: 300 }, { account: 'Utilities Expense', cr: 300 }],
      [{ account: 'Prepaid Utilities', dr: 300 }, { account: 'Accounts Payable', cr: 300 }],
    ],
    correctIndex: 0,
    explanation: 'The electricity was used this month, so the expense belongs to this month even though cash has not moved. The unpaid amount is a payable.',
  },
  {
    id: 'j10', section: 'journal', kind: 'entry',
    prompt: 'Paid $1,200 cash for a one-year insurance policy starting today.',
    options: [
      [{ account: 'Prepaid Insurance', dr: 1200 }, { account: 'Cash', cr: 1200 }],
      [{ account: 'Insurance Expense', dr: 1200 }, { account: 'Cash', cr: 1200 }],
      [{ account: 'Cash', dr: 1200 }, { account: 'Prepaid Insurance', cr: 1200 }],
      [{ account: 'Prepaid Insurance', dr: 1200 }, { account: 'Accounts Payable', cr: 1200 }],
    ],
    correctIndex: 0,
    explanation: 'Paying up front buys an asset: twelve months of coverage you are owed. Each month, an adjusting entry moves one-twelfth into Insurance Expense.',
  },

  // ── Trial balance ───────────────────────────────────────────────────
  {
    id: 't1', section: 'trial', kind: 'text',
    prompt: 'On a trial balance, accounts are listed in this order:',
    options: [
      'Assets, Liabilities, Equity, Revenue, Expenses',
      'Revenue, Expenses, Assets, Liabilities, Equity',
      'Debits first in any order, then all credits',
      'Alphabetically by account name',
    ],
    correctIndex: 0,
    explanation: 'Balance-sheet accounts come first in accounting-equation order (A, L, E), then the income-statement accounts (revenue, then expenses).',
  },
  {
    id: 't2', section: 'trial', kind: 'text',
    prompt: 'Dividends appear on the trial balance:',
    options: [
      'In the DEBIT column, listed with the equity accounts',
      'In the CREDIT column, listed with the equity accounts',
      'In the DEBIT column, listed with the expenses',
      'Not at all — dividends are not a trial balance account',
    ],
    correctIndex: 0,
    explanation: 'Dividends belongs to the equity group by position but carries a debit balance because it reduces equity. It is not an expense, so it does not sit with them.',
  },
  {
    id: 't3', section: 'trial', kind: 'text',
    prompt: 'Retained Earnings appears on the trial balance in the:',
    options: ['Credit column', 'Debit column', 'Either column, depending on profit', 'Debit column only in the first year'],
    correctIndex: 0,
    explanation: 'Retained Earnings is equity — accumulated profits the company kept — so it normally carries a credit balance. (Only an accumulated deficit would flip it.)',
  },
  {
    id: 't4', section: 'trial', kind: 'text',
    prompt: 'A trial balance shows $58,400 in both columns. This proves:',
    options: [
      'Only that total debits equal total credits',
      'That every transaction was recorded in the correct account',
      'That the company earned a profit',
      'That no transactions were left out',
    ],
    correctIndex: 0,
    explanation: 'A trial balance is an arithmetic check only. A rent payment debited to Utilities Expense — or a transaction never recorded at all — leaves it perfectly balanced and still wrong.',
  },
  {
    id: 't5', section: 'trial', kind: 'text',
    prompt: 'Your trial balance is out of balance by $540, a number divisible by 9. The most likely cause is:',
    options: [
      'A transposition error — digits reversed, such as $450 entered as $540',
      'A transaction that was never recorded',
      'An amount posted to the wrong account',
      'Recording an expense as an asset',
    ],
    correctIndex: 0,
    explanation: 'Differences divisible by 9 point to transposed digits. If the difference is divisible by 2, look instead for an amount posted in the wrong column — half the difference is the amount to hunt for.',
  },
  {
    id: 't6', section: 'trial', kind: 'text',
    prompt: 'Which error would NOT throw the trial balance out of balance?',
    options: [
      'Debiting Utilities Expense instead of Rent Expense for a rent payment',
      'Posting a $600 debit but only a $60 credit',
      'Posting a debit twice and the credit once',
      'Forgetting to post the credit side of an entry',
    ],
    correctIndex: 0,
    explanation: 'Using the wrong account still puts a debit of the right size on the debit side, so the columns still match. That is why balanced columns never prove the entries are correct.',
  },
  {
    id: 't7', section: 'trial', kind: 'text',
    prompt: 'Cash $8,000 · Accounts Receivable $3,000 · Accounts Payable $2,500 · Common Stock $6,000 · Service Revenue $7,500 · Rent Expense $2,000 · Salaries Expense $3,000. What is TOTAL DEBITS?',
    options: ['$16,000', '$13,000', '$18,500', '$11,000'],
    correctIndex: 0,
    explanation: 'The debit-balance accounts are Cash $8,000, Accounts Receivable $3,000, Rent Expense $2,000 and Salaries Expense $3,000 = $16,000. Credits are $2,500 + $6,000 + $7,500 = $16,000 too, so it balances.',
  },
  {
    id: 't8', section: 'trial', kind: 'text',
    prompt: 'Accumulated Depreciation — Equipment appears on the trial balance:',
    options: [
      'With the assets, but in the CREDIT column',
      'With the assets, in the debit column',
      'With the liabilities, in the credit column',
      'With the expenses, in the debit column',
    ],
    correctIndex: 0,
    explanation: 'It is a contra-asset: it is listed with the assets because it belongs to Equipment, but it carries a credit balance because it subtracts from that asset.',
  },
  {
    id: 't9', section: 'trial', kind: 'text',
    prompt: 'Where does Unearned Revenue belong on the trial balance?',
    options: [
      'In the liabilities section, credit column',
      'In the revenue section, credit column',
      'In the assets section, debit column',
      'In the equity section, credit column',
    ],
    correctIndex: 0,
    explanation: 'Despite the word "Revenue" in its name, it is an obligation to deliver work — a liability. It is listed with the liabilities, in the credit column.',
  },
  // ── Accounting principles ───────────────────────────────────────────
  {
    id: 'p1', section: 'principles', kind: 'text',
    prompt: 'A company completes a $7,000 job in September and is paid in October. It records the revenue in September. This follows:',
    options: ['The revenue recognition principle', 'The cost principle', 'The matching principle', 'The monetary unit assumption'],
    correctIndex: 0,
    explanation: 'Revenue is recorded when it is EARNED — when the work is done — not when the cash arrives. This is exactly why Accounts Receivable exists.',
  },
  {
    id: 'p2', section: 'principles', kind: 'text',
    prompt: 'Employees earn $5,000 of wages in the last week of June but are not paid until July 2. Recording the $5,000 as a June expense follows:',
    options: [
      'The expense recognition (matching) principle',
      'The revenue recognition principle',
      'The full disclosure principle',
      'The going concern assumption',
    ],
    correctIndex: 0,
    explanation: 'Expenses belong in the period they helped earn revenue, regardless of when the bill is paid. The unpaid $5,000 sits in Salaries Payable until July 2.',
  },
  {
    id: 'p3', section: 'principles', kind: 'text',
    prompt: 'Land bought in 2016 for $95,000 is worth $240,000 today, but the balance sheet still reports $95,000. This is:',
    options: ['The cost principle', 'Conservatism', 'The periodicity assumption', 'The economic entity assumption'],
    correctIndex: 0,
    explanation: 'Assets are carried at historical cost because a purchase price is objective and verifiable. A market value is an estimate that would change every year.',
  },
  {
    id: 'p4', section: 'principles', kind: 'text',
    prompt: 'The owner pays for a personal cruise with her own money and it is never entered in the company books. This applies:',
    options: [
      'The economic entity assumption',
      'The monetary unit assumption',
      'The full disclosure principle',
      'The matching principle',
    ],
    correctIndex: 0,
    explanation: 'A business is a separate economic entity from its owner. Mixing personal transactions in would make it impossible to tell whether the business itself is profitable.',
  },
  {
    id: 'p5', section: 'principles', kind: 'text',
    prompt: 'A company has an outstanding reputation and a talented staff, but neither appears on its balance sheet. Why not?',
    options: [
      'The monetary unit assumption — only items measurable in dollars are recorded',
      'The cost principle — they were not purchased',
      'Conservatism — good news is never recorded',
      'The periodicity assumption — they cannot be assigned to one period',
    ],
    correctIndex: 0,
    explanation: 'Accounting records only what can be reliably measured in money, so results can be added together. A reputation is genuinely valuable and still stays off the books.',
  },
  {
    id: 'p6', section: 'principles', kind: 'text',
    prompt: 'A company describes a pending $3 million lawsuit in the notes to its financial statements even though nothing has been paid. This is:',
    options: ['The full disclosure principle', 'The cost principle', 'The revenue recognition principle', 'Materiality'],
    correctIndex: 0,
    explanation: 'Anything that would change how a lender or investor reads the statements must be disclosed — in the notes if not in the numbers. The notes are part of the financial statements.',
  },
  {
    id: 'p7', section: 'principles', kind: 'text',
    prompt: 'Which pair of principles together define ACCRUAL accounting?',
    options: [
      'Revenue recognition and expense recognition (matching)',
      'Cost principle and going concern',
      'Economic entity and monetary unit',
      'Full disclosure and materiality',
    ],
    correctIndex: 0,
    explanation: 'Record revenue when earned and expenses when incurred — cash timing is irrelevant. Those two rules are the whole basis of accrual accounting, and the reason A/R, A/P and Unearned Revenue exist.',
  },
  {
    id: 'p8', section: 'principles', kind: 'text',
    prompt: 'Under the CASH basis of accounting (not GAAP), a company that performs $10,000 of work in May and collects the cash in June would report the revenue in:',
    options: ['June, when the cash is received', 'May, when the work was performed', 'Both months, split evenly', 'Neither month until the year closes'],
    correctIndex: 0,
    explanation: 'Cash basis records revenue only when cash moves — which is exactly why it is not allowed for most companies. Under accrual accounting (what you are learning), the revenue belongs to May.',
  },
  {
    id: 'p9', section: 'principles', kind: 'text',
    prompt: 'A company reports financial statements every quarter even though it intends to operate for decades. This reflects:',
    options: [
      'The periodicity (time period) assumption',
      'The going concern assumption',
      'The cost principle',
      'The economic entity assumption',
    ],
    correctIndex: 0,
    explanation: 'Business life is divided into artificial time periods so results can be reported regularly. Going concern is the related but separate idea that the company will keep operating.',
  },
  {
    id: 'p10', section: 'principles', kind: 'text',
    prompt: 'A company reports its equipment at cost less accumulated depreciation rather than at the amount it would fetch in an immediate liquidation sale. This is justified by:',
    options: [
      'The going concern assumption',
      'The full disclosure principle',
      'Materiality',
      'The periodicity assumption',
    ],
    correctIndex: 0,
    explanation: 'We assume the company will stay in business long enough to use the equipment up, so what it would sell for tomorrow does not matter. If a company is about to shut down, the assumption breaks and its assets must be restated at liquidation value — something auditors are required to flag.',
  },
  {
    id: 'p11', section: 'principles', kind: 'text',
    prompt: 'Two accounting treatments are equally defensible: one reports higher income, the other lower. Choosing the one less likely to overstate assets or income reflects:',
    options: ['Conservatism', 'The cost principle', 'The economic entity assumption', 'The revenue recognition principle'],
    correctIndex: 0,
    explanation: 'Conservatism breaks a genuine tie in the direction that avoids making the company look better than it is. It does not mean deliberately understating results — only that when in real doubt, you do not paint the rosier picture.',
  },
]

export function questionsFor(scope) {
  if (scope === 'full') return QUESTIONS
  if (scope === 'quick') return shuffle(QUESTIONS).slice(0, 15)
  return QUESTIONS.filter(q => q.section === scope)
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
