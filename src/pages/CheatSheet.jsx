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
        <p className="text-slate-400">Every key term and rule, all in one place. Bookmark this page.</p>
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
