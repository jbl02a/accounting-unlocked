// A deliberately condensed, ink-friendly one-pager. This is NOT the full cheat
// sheet — it is only what gets tested, sized to print on two sides of paper.
const NORMAL = [
  ['Assets', 'DEBIT', 'Cash, A/R, Supplies, Prepaid, Equipment'],
  ['Contra-assets', 'CREDIT', 'Accumulated Depreciation'],
  ['Liabilities', 'CREDIT', 'A/P, Notes Payable, Unearned Revenue, any ...Payable'],
  ['Common Stock', 'CREDIT', 'Owner investment'],
  ['Retained Earnings', 'CREDIT', 'Profits kept from prior periods'],
  ['Dividends', 'DEBIT', 'The equity-family exception — reduces equity'],
  ['Revenue', 'CREDIT', 'Service Revenue, Sales Revenue, Interest Income'],
  ['Expenses', 'DEBIT', 'Every single one, no exceptions'],
]

const ADJUSTMENTS = [
  ['Deferred expense', 'Prepaid → used up', 'Dr Insurance Expense / Cr Prepaid Insurance', 'Total ÷ months × months USED'],
  ['Deferred revenue', 'Unearned → earned', 'Dr Unearned Revenue / Cr Service Revenue', 'Total ÷ periods × periods DELIVERED'],
  ['Accrued revenue', 'Earned, not billed', 'Dr Accounts Receivable / Cr Service Revenue', 'Amount is given'],
  ['Accrued expense', 'Incurred, not paid', 'Dr Salaries Expense / Cr Salaries Payable', 'Amount is given'],
  ['Depreciation', 'Asset used up', 'Dr Depreciation Expense / Cr Accumulated Depreciation', '(Cost − salvage) ÷ useful life'],
  ['Supplies', 'Consumed', 'Dr Supplies Expense / Cr Supplies', 'Begin + Purchased − On hand'],
  ['Interest', 'Owed, not paid', 'Dr Interest Expense / Cr Interest Payable', 'Principal × Rate × Time'],
]

const FORMULAS = [
  ['Net income', 'Revenues − Expenses', 'Dividends are NOT subtracted'],
  ['Ending retained earnings', 'Beginning R/E + Net Income − Dividends', ''],
  ['Interest', 'Principal × Rate × Time', 'Time = months ÷ 12'],
  ['Straight-line depreciation', '(Cost − salvage) ÷ useful life', 'Partial year × months ÷ 12'],
  ['Book value', 'Cost − Accumulated Depreciation', ''],
  ['Supplies used', 'Beginning + Purchased − On hand', 'The count is what is LEFT'],
  ['Working capital', 'Current Assets − Current Liabilities', 'A dollar amount'],
  ['Current ratio', 'Current Assets ÷ Current Liabilities', 'A plain number; under 1.00 is a warning'],
  ['Net profit margin', 'Net Income ÷ Sales Revenue', ''],
]

const TRAPS = [
  'Collecting an account receivable is NOT revenue — Dr Cash / Cr A/R. The revenue was recorded when the work was done.',
  'Paying an account payable is NOT an expense — Dr A/P / Cr Cash. The expense was recorded when the goods arrived.',
  'Dividends are NOT an expense. No such account as “Dividend Expense.” They never touch the income statement.',
  'Unearned Revenue is a LIABILITY, not revenue. Cash came in but the work is still owed.',
  'Supplies are an ASSET until used. Supplies Expense is only the portion consumed.',
  'An adjusting entry NEVER touches Cash.',
  'Accumulated Depreciation is a contra-ASSET (credit balance), listed with assets — never a liability.',
  'A balanced trial balance does NOT prove correctness — a wrong account still balances.',
  'Credit Interest PAYABLE when accruing interest, not Notes Payable. The principal has not changed.',
]

function Section({ title, children, className = '' }) {
  return (
    <section className={`cram-section ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default function CramSheet() {
  return (
    <div className="cram">
      <div className="cram-toolbar no-print">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Exam-Day Cram Sheet</h1>
          <p className="text-sm text-dim">
            Condensed to what actually gets tested. Prints clean on two sides — the app’s dark theme is dropped automatically.
          </p>
        </div>
        <button onClick={() => window.print()} className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90">
          🖨️ Print
        </button>
      </div>

      <div className="cram-page">
        <header className="cram-head">
          <h1>Accounting — Exam Cram Sheet</h1>
          <p>Chapters 1–3 · the accounting cycle, adjusting entries, closing, financial statements</p>
        </header>

        <Section title="DEALER — normal balances">
          <p className="cram-lead">
            <strong>D</strong>ividends, <strong>E</strong>xpenses, <strong>A</strong>ssets carry DEBIT balances ·{' '}
            <strong>L</strong>iabilities, <strong>E</strong>quity, <strong>R</strong>evenue carry CREDIT balances.
            An account <em>increases</em> on its normal side and <em>decreases</em> on the other.
          </p>
          <table>
            <tbody>
              {NORMAL.map(([a, side, ex]) => (
                <tr key={a}>
                  <td className="w-40"><strong>{a}</strong></td>
                  <td className="w-20"><span className={side === 'DEBIT' ? 'tag-dr' : 'tag-cr'}>{side}</span></td>
                  <td>{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Trial balance — the order">
          <p className="cram-lead">
            <strong>1.</strong> Assets → <strong>2.</strong> Liabilities → <strong>3.</strong> Equity (Common Stock, Retained Earnings, then Dividends)
            → <strong>4.</strong> Revenue → <strong>5.</strong> Expenses.
          </p>
          <p className="cram-note">
            Balance-sheet accounts first in accounting-equation order, then income-statement accounts.
            Each account sits in the column of its normal balance. Some worksheets place Dividends last, after the expenses —
            either is accepted, but it is always a DEBIT.
          </p>
          <p className="cram-note">
            <strong>You prepare three of these, in this order.</strong>{' '}
            <strong>Unadjusted</strong> — straight from the ledger, before any adjusting entries ·{' '}
            <strong>Adjusted</strong> — after the adjustments, and the one the financial statements are built from ·{' '}
            <strong>Post-closing</strong> — after closing, so <em>permanent accounts only</em>, with Retained Earnings at its
            new balance. All three must balance, and a balanced trial balance still does not prove the entries are right.
          </p>
        </Section>

        <Section title="Adjusting entries — never touch Cash">
          <p className="cram-lead">
            <strong>Why adjustments exist at all:</strong> under <strong>cash basis</strong> you record when cash moves; under{' '}
            <strong>accrual basis</strong> you record revenue when it is <em>earned</em> and expenses when they are{' '}
            <em>incurred</em>, whenever the cash happens to move. GAAP requires accrual — revenue recognition and matching —
            and adjusting entries are what drags the books from one to the other at period end.
          </p>
          <p className="cram-lead">
            Cash moved <strong>first</strong> = DEFERRAL. Cash comes <strong>later</strong> = ACCRUAL.
            Every adjustment hits one income-statement account and one balance-sheet account.
          </p>
          <table>
            <thead><tr><th>Type</th><th>What happened</th><th>Entry</th><th>Compute</th></tr></thead>
            <tbody>
              {ADJUSTMENTS.map(([t, w, e, c]) => (
                <tr key={t}><td><strong>{t}</strong></td><td>{w}</td><td className="mono">{e}</td><td className="mono">{c}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Closing entries" className="break-before">
          <p className="cram-lead">
            <strong>Temporary</strong> (closed to zero): Revenues, Expenses, <strong>Dividends</strong>.{' '}
            <strong>Permanent</strong> (carry forward): Assets, Liabilities, Common Stock, Retained Earnings.
          </p>
          <ol className="cram-list">
            <li><span className="mono">Dr Service Revenue / Cr Retained Earnings</span> — revenue has a credit balance, so debit it to zero</li>
            <li><span className="mono">Dr Retained Earnings / Cr each expense</span> — expenses have debit balances, so credit them</li>
            <li><span className="mono">Dr Retained Earnings / Cr Dividends</span> — never routed through income</li>
          </ol>
          <p className="cram-note">
            Some texts route revenues and expenses through <em>Income Summary</em> first, then close it to Retained Earnings — four entries instead of three, same result.
            The <strong>post-closing trial balance</strong> lists permanent accounts only, with Retained Earnings at its new balance.
          </p>
        </Section>

        <Section title="The four statements — in preparation order">
          <ol className="cram-list">
            <li><strong>Income Statement</strong> — Revenues − Expenses = Net Income · <em>for a period</em></li>
            <li><strong>Retained Earnings Statement</strong> — Beginning R/E + Net Income − Dividends · <em>for a period</em></li>
            <li><strong>Balance Sheet</strong> — Assets = Liabilities + Equity · <em>as of a point in time</em> (the only snapshot)</li>
            <li><strong>Statement of Cash Flows</strong> — Operating + Investing + Financing · <em>for a period</em></li>
          </ol>
          <p className="cram-note">
            Each feeds the next: net income → retained earnings → balance sheet. That chain is <strong>articulation</strong>.
            Classified balance sheet splits current from long-term on the <strong>one-year test</strong>.
          </p>
        </Section>

        <Section title="Formulas">
          <table>
            <tbody>
              {FORMULAS.map(([n, f, note]) => (
                <tr key={n}><td className="w-56"><strong>{n}</strong></td><td className="mono">{f}</td><td className="cram-small">{note}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Four assumptions · four principles">
          <p className="cram-lead">
            <strong>Assumptions:</strong> economic entity · going concern · time-period · monetary unit.{' '}
            <strong>Principles:</strong> historical cost · revenue recognition · expense recognition (matching) · conservatism.
          </p>
          <p className="cram-note">
            Revenue recognition + matching together = <strong>accrual accounting</strong>, which is why A/R, A/P and Unearned Revenue exist.
            Also named: full disclosure, materiality, cost constraint.
          </p>
        </Section>

        <Section title="Traps that cost marks">
          <ul className="cram-list">
            {TRAPS.map((t, i) => <li key={i}>{t}</li>)}
          </ul>
        </Section>

        <footer className="cram-foot">Accounting Unlocked · print this, fold it, read it twice before the exam.</footer>
      </div>
    </div>
  )
}
