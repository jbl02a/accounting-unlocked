const SECTIONS = [
  {
    title: 'The Accounting Equation',
    color: 'from-indigo-600 to-purple-600',
    icon: '⚖️',
    items: [
      { term: 'Assets (A)', def: 'Everything a business OWNS — cash, equipment, buildings, receivables.' },
      { term: 'Liabilities (L)', def: 'Everything a business OWES to outsiders — loans, unpaid bills, debt.' },
      { term: 'Equity (E)', def: "The owner's stake in the business. What's left after paying all debts." },
      { term: 'The Equation', def: 'Assets = Liabilities + Equity. This ALWAYS must balance. No exceptions.' },
    ]
  },
  {
    title: 'The Big 5 Account Types',
    color: 'from-cyan-600 to-blue-600',
    icon: '🗂️',
    items: [
      { term: 'Assets', def: 'Resources owned by the business (cash, equipment, inventory, receivables).' },
      { term: 'Liabilities', def: 'Obligations owed to creditors (loans payable, accounts payable, wages owed).' },
      { term: 'Equity', def: "Owner's interest — common stock, retained earnings, owner's capital." },
      { term: 'Revenue', def: 'Income earned from business activities (sales, service fees, interest earned).' },
      { term: 'Expenses', def: 'Costs incurred to generate revenue (rent, salaries, utilities, supplies used).' },
    ]
  },
  {
    title: 'Debits & Credits',
    color: 'from-emerald-600 to-teal-600',
    icon: '↔️',
    items: [
      { term: 'Debit (Dr)', def: 'The LEFT side of any T-account entry.' },
      { term: 'Credit (Cr)', def: 'The RIGHT side of any T-account entry.' },
      { term: 'Assets — Debit increases', def: 'Assets go UP with a debit, DOWN with a credit.' },
      { term: 'Liabilities — Credit increases', def: 'Liabilities go UP with a credit, DOWN with a debit.' },
      { term: 'Equity — Credit increases', def: 'Equity goes UP with a credit, DOWN with a debit.' },
      { term: 'Revenue — Credit increases', def: 'Revenue goes UP with a credit, DOWN with a debit.' },
      { term: 'Expenses — Debit increases', def: 'Expenses go UP with a debit, DOWN with a credit.' },
      { term: 'Mnemonic: DEAD CLIC', def: 'Debits increase: Expenses, Assets, Dividends. Credits increase: Liabilities, Income, Capital.' },
    ]
  },
  {
    title: 'Journal Entries',
    color: 'from-orange-600 to-amber-600',
    icon: '📓',
    items: [
      { term: 'Journal Entry', def: 'The formal recording of a business transaction using debits and credits.' },
      { term: 'Double-Entry Rule', def: 'Every transaction has at least one debit and one credit. Total debits MUST equal total credits.' },
      { term: 'Format', def: 'Debit accounts listed first (indented left), Credit accounts second (indented right).' },
      { term: 'Example', def: 'Buy $500 supplies with cash → Debit Supplies $500, Credit Cash $500.' },
    ]
  },
  {
    title: 'Financial Statements',
    color: 'from-rose-600 to-pink-600',
    icon: '📋',
    items: [
      { term: 'Balance Sheet', def: 'A snapshot of Assets, Liabilities, and Equity at a single point in time.' },
      { term: 'Income Statement', def: 'Shows Revenue minus Expenses = Net Income over a period of time.' },
      { term: 'The Balance Sheet Rule', def: 'Assets ALWAYS equal Liabilities + Equity. If not, there is an error.' },
      { term: 'Current Assets', def: 'Assets expected to be used or converted to cash within one year (cash, inventory).' },
      { term: 'Current Liabilities', def: 'Debts due within one year (accounts payable, short-term loans).' },
      { term: 'Long-term Assets', def: 'Assets held for more than a year (equipment, buildings, land).' },
    ]
  },
  {
    title: 'Receivables vs. Payables',
    color: 'from-sky-600 to-cyan-600',
    icon: '📥',
    items: [
      { term: 'Accounts Receivable', def: 'THEY owe US. An ASSET. Created by performing work "on account." Increases with a debit.' },
      { term: 'Accounts Payable', def: 'WE owe THEM. A LIABILITY. Created by buying "on account." Increases with a credit.' },
      { term: 'Memory hook', def: 'Recei-V-able \u2192 we recei-V-e. Pa-Y-able \u2192 we pa-Y.' },
      { term: 'Performed services on account', def: 'Debit Accounts Receivable, Credit Service Revenue. Revenue is earned NOW, cash comes later.' },
      { term: 'Collected on account', def: 'Debit Cash, Credit Accounts Receivable. NEVER credit revenue again \u2014 that double-counts the income.' },
      { term: 'Purchased on account', def: 'Debit the asset or expense, Credit Accounts Payable.' },
      { term: 'Paid on account', def: 'Debit Accounts Payable, Credit Cash. NEVER record the expense again.' },
      { term: 'Unearned Revenue', def: 'Cash received BEFORE the work is done. A LIABILITY \u2014 you owe them service, not money.' },
      { term: 'Notes Receivable', def: 'An ASSET, like A/R \u2014 but backed by a signed promissory note that earns INTEREST.' },
      { term: 'Notes Payable', def: 'A LIABILITY, like A/P \u2014 but a signed promise to repay that COSTS interest.' },
      { term: 'Accounts vs. Notes', def: 'The category never changes: receivable = asset, payable = liability either way. Notes just add paperwork, interest and time.' },
      { term: 'Overdue account \u2192 note', def: 'Debit Notes Receivable, Credit Accounts Receivable. One asset becomes a stronger one \u2014 no revenue, no gain.' },
      { term: 'Collecting a receivable', def: 'Total assets do not change: Cash up, A/R down by the same amount.' },
    ]
  },
  {
    title: 'Normal Balances',
    color: 'from-lime-600 to-green-600',
    icon: '⚖️',
    items: [
      { term: 'Assets', def: 'DEBIT balance. Cash, A/R, Supplies, Prepaid Insurance, Equipment.' },
      { term: 'Contra-assets', def: 'CREDIT balance. Accumulated Depreciation \u2014 listed with assets but subtracts from them.' },
      { term: 'Liabilities', def: 'CREDIT balance. A/P, Notes Payable, Unearned Revenue, Salaries Payable.' },
      { term: 'Common Stock', def: 'CREDIT balance. The owners\u2019 investment in the business.' },
      { term: 'Retained Earnings', def: 'CREDIT balance. Profits from prior periods that stayed in the business.' },
      { term: 'Dividends', def: 'DEBIT balance. The one equity-family account that is a debit \u2014 it REDUCES equity. Not an expense.' },
      { term: 'Revenue', def: 'CREDIT balance. Essentially never debited during the period.' },
      { term: 'Expenses', def: 'DEBIT balance. Essentially never credited during the period.' },
      { term: 'Finding a balance', def: 'Add the debit side, add the credit side, subtract. The balance sits on the bigger side.' },
    ]
  },
  {
    title: 'The Trial Balance',
    color: 'from-amber-600 to-yellow-600',
    icon: '🧮',
    items: [
      { term: 'What it is', def: 'A list of every ledger account and its balance, in two columns, proving total debits = total credits.' },
      { term: 'The order \u2014 memorize it', def: '1. Assets  2. Liabilities  3. Equity (Common Stock, Retained Earnings, then Dividends)  4. Revenue  5. Expenses.' },
      { term: 'Shortcut for the order', def: 'Balance sheet accounts first (A, L, E), then income statement accounts (R, E).' },
      { term: 'Debit column', def: 'Assets, Expenses, and Dividends.' },
      { term: 'Credit column', def: 'Liabilities, Common Stock, Retained Earnings, Revenue, and contra-assets.' },
      { term: 'What it proves', def: 'ONLY that debits equal credits. It cannot catch a right amount posted to the wrong account.' },
      { term: 'What it misses', def: 'A transaction never recorded at all, or an entry recorded twice, still leaves the columns equal.' },
      { term: 'Off by a number divisible by 9', def: 'Look for a transposition \u2014 $450 written as $540.' },
      { term: 'Off by a number divisible by 2', def: 'Look for an amount in the wrong column. Half the difference is the amount to find.' },
    ]
  },
  {
    title: 'Compound Entries & The Cycle',
    color: 'from-violet-600 to-purple-600',
    icon: '🧾',
    items: [
      { term: 'Compound entry', def: 'A journal entry with three or more lines. Perfectly normal \u2014 total debits must still equal total credits.' },
      { term: 'Format', def: 'ALL debits first and flush left, then ALL credits indented below. Never alternate.' },
      { term: 'Split the payment, not the purchase', def: 'A $9,000 machine bought with $3,000 cash and a note is still a $9,000 debit to Equipment.' },
      { term: 'The accounting cycle', def: 'Transaction \u2192 journal entry \u2192 post to ledger \u2192 trial balance \u2192 financial statements.' },
      { term: 'Posting', def: 'Copying each debit and credit from the journal into the individual account (T-account).' },
      { term: 'Footing', def: 'Totaling each side of an account to find its ending balance.' },
      { term: 'Net income', def: 'Revenue \u2212 Expenses. Dividends are NOT subtracted \u2014 they are not an expense.' },
      { term: 'Ending retained earnings', def: 'Beginning R/E + Net Income \u2212 Dividends.' },
    ]
  },
  {
    title: 'Accounting Principles',
    color: 'from-teal-600 to-emerald-600',
    icon: '📜',
    items: [
      { term: 'Revenue Recognition', def: 'Record revenue when it is EARNED (work done, goods delivered) \u2014 not when the cash arrives.' },
      { term: 'Expense Recognition (Matching)', def: 'Record expenses in the same period as the revenue they helped produce \u2014 not when the bill is paid.' },
      { term: 'Accrual accounting', def: 'Those two principles together. Cash timing is irrelevant. Required by GAAP \u2014 and the reason A/R, A/P and Unearned Revenue exist.' },
      { term: 'Cash basis', def: 'Revenue when cash comes in, expenses when cash goes out. Simple, but not allowed for most companies.' },
      { term: 'Cost Principle', def: 'Assets are recorded at what you PAID and stay there \u2014 not at today\u2019s market value.' },
      { term: 'Economic Entity Assumption', def: 'The business and its owner are separate. Personal transactions never enter the company books.' },
      { term: 'Monetary Unit Assumption', def: 'Only record what can be reliably measured in dollars. A great reputation is not an asset.' },
      { term: 'Going Concern Assumption', def: 'Assume the business will keep operating \u2014 which is why assets are carried at cost and depreciated, not at fire-sale value.' },
      { term: 'Periodicity Assumption', def: 'Divide the company\u2019s life into months, quarters and years so results can be reported.' },
      { term: 'Full Disclosure', def: 'Anything that would change a reader\u2019s decision goes in the statements or the notes.' },
      { term: 'Materiality', def: 'Amounts too small to change anyone\u2019s decision can be handled the easy way (expense the $12 stapler).' },
      { term: 'Conservatism', def: 'When two treatments are equally defensible, choose the one less likely to overstate assets or income.' },
    ]
  },
  {
    title: 'Key Vocabulary',
    color: 'from-violet-600 to-fuchsia-600',
    icon: '📖',
    items: [
      { term: 'Accounts Receivable', def: 'Money OWED TO the business by customers (an Asset).' },
      { term: 'Accounts Payable', def: 'Money the business OWES to suppliers (a Liability).' },
      { term: 'Retained Earnings', def: 'Cumulative net income kept in the business (Equity).' },
      { term: 'Liquidity', def: 'How quickly an asset can be converted to cash.' },
      { term: 'Net Income', def: 'Revenue minus Expenses. The "bottom line."' },
      { term: 'T-Account', def: 'A visual tool shaped like a "T" with debits on the left and credits on the right.' },
      { term: 'Ledger', def: 'The full collection of T-accounts \u2014 every transaction sorted by account instead of by date.' },
      { term: 'Journal', def: 'The chronological record of transactions, in date order, before they are posted.' },
      { term: 'Prepaid Expense', def: 'Something paid for in advance (insurance, rent). An ASSET until it is used up.' },
      { term: 'Unearned Revenue', def: 'Cash collected before the work is done. A LIABILITY until the work is performed.' },
      { term: 'Dividends', def: 'Profit distributed to owners. Reduces equity, carries a DEBIT balance, is not an expense.' },
      { term: 'Accrual accounting', def: 'Record revenue when earned and expenses when incurred \u2014 not when cash moves.' },
      { term: 'Contra account', def: 'An account that offsets another, like Accumulated Depreciation against Equipment.' },
      { term: 'Transposition error', def: 'Digits reversed ($540 for $450). The trial balance difference is divisible by 9.' },
    ]
  }
]

export default function CheatSheet() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
          Accounting Cheat Sheet
        </h1>
        <p className="text-slate-400">Every key term and rule from all ten levels, in one place. Bookmark this page.</p>
      </div>

      <div className="space-y-6">
        {SECTIONS.map((section) => (
          <div key={section.title} className="rounded-2xl border border-white/10 overflow-hidden">
            <div className={`bg-gradient-to-r ${section.color} px-6 py-4 flex items-center gap-3`}>
              <span className="text-2xl">{section.icon}</span>
              <h2 className="text-lg font-bold text-white">{section.title}</h2>
            </div>
            <div className="divide-y divide-white/5">
              {section.items.map((item, i) => (
                <div key={i} className="px-6 py-4 flex flex-col sm:flex-row sm:gap-6 hover:bg-white/5 transition-colors">
                  <div className="sm:w-56 shrink-0 font-semibold text-white mb-1 sm:mb-0">{item.term}</div>
                  <div className="text-slate-400 text-sm leading-relaxed">{item.def}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 p-6 text-center">
        <p className="text-indigo-300 font-semibold mb-1">The golden rule of accounting:</p>
        <p className="text-2xl font-bold text-white">Assets = Liabilities + Equity</p>
        <p className="text-slate-400 text-sm mt-2">This equation must always balance. When in doubt, come back to this.</p>
      </div>
    </div>
  )
}
