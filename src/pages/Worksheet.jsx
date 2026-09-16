import { useState } from 'react'

// Copperline Freight Co. — a full-cycle problem laid out the way the course
// worksheets are: Date / Account / Debit / Credit, blank T-accounts, a blank
// trial balance grid. Printed, it is worked with a pencil; the key prints after.
const TRANSACTIONS = [
  { d: 'Jan 2', t: 'Issued common stock for $180,000 cash.', lines: [['Cash', 180000, null], ['Common Stock', null, 180000]] },
  { d: 'Jan 2', t: 'Purchased delivery trucks for $120,000 cash.', lines: [['Trucks', 120000, null], ['Cash', null, 120000]] },
  { d: 'Mar 1', t: 'Paid $14,400 for a 24-month insurance policy; coverage begins March 1.', lines: [['Prepaid Insurance', 14400, null], ['Cash', null, 14400]] },
  { d: 'Apr 1', t: 'Borrowed $90,000 on a 6%, 3-year note payable. Interest and principal are due at maturity.', lines: [['Cash', 90000, null], ['Notes Payable', null, 90000]] },
  { d: 'Apr 10', t: 'Purchased supplies on account, $9,800.', lines: [['Supplies', 9800, null], ['Accounts Payable', null, 9800]] },
  { d: 'Jun 30', t: 'Billed customers for freight services performed, $246,000.', lines: [['Accounts Receivable', 246000, null], ['Service Revenue', null, 246000]] },
  { d: 'Aug 15', t: 'Collected $198,000 from customers previously billed.', lines: [['Cash', 198000, null], ['Accounts Receivable', null, 198000]] },
  { d: 'Sep 1', t: 'Received $24,000 cash in advance for a hauling contract beginning January 1, 2026.', lines: [['Cash', 24000, null], ['Unearned Revenue', null, 24000]] },
  { d: 'Oct 5', t: 'Paid $7,200 to suppliers on account.', lines: [['Accounts Payable', 7200, null], ['Cash', null, 7200]] },
  { d: 'Dec 20', t: 'Paid wages of $88,000.', lines: [['Wages Expense', 88000, null], ['Cash', null, 88000]] },
  { d: 'Dec 28', t: 'Declared and paid a cash dividend of $12,000.', lines: [['Dividends', 12000, null], ['Cash', null, 12000]] },
  { d: 'Dec 31', t: 'Paid utilities of $5,600.', lines: [['Utilities Expense', 5600, null], ['Cash', null, 5600]] },
]

const ADJUSTMENTS = [
  { n: 'a', t: 'The insurance policy purchased March 1 has partially expired.', lines: [['Insurance Expense', 6000, null], ['Prepaid Insurance', null, 6000]], work: '$14,400 ÷ 24 months = $600/month. March–December = 10 months. 10 × $600 = $6,000.' },
  { n: 'b', t: 'A physical count on December 31 shows $2,300 of supplies still on hand.', lines: [['Supplies Expense', 7500, null], ['Supplies', null, 7500]], work: '$9,800 purchased − $2,300 on hand = $7,500 used. (No beginning balance — first year.)' },
  { n: 'c', t: 'Interest has accrued on the note payable but will not be paid until maturity.', lines: [['Interest Expense', 4050, null], ['Interest Payable', null, 4050]], work: '$90,000 × 6% × 9/12 (April–December) = $4,050. Credit Interest Payable, NOT Notes Payable.' },
  { n: 'd', t: 'The trucks have an 8-year useful life and no salvage value. Record a full year of depreciation.', lines: [['Depreciation Expense', 15000, null], ['Accumulated Depreciation — Trucks', null, 15000]], work: '$120,000 ÷ 8 years = $15,000.' },
  { n: 'e', t: 'Employees earned $6,400 of wages in late December that will be paid in January.', lines: [['Wages Expense', 6400, null], ['Wages Payable', null, 6400]], work: 'Amount given. Work performed in December belongs to December.' },
]

const UNADJUSTED = [
  ['Cash', 244800, null], ['Accounts Receivable', 48000, null], ['Supplies', 9800, null],
  ['Prepaid Insurance', 14400, null], ['Trucks', 120000, null],
  ['Accounts Payable', null, 2600], ['Unearned Revenue', null, 24000], ['Notes Payable', null, 90000],
  ['Common Stock', null, 180000], ['Dividends', 12000, null], ['Service Revenue', null, 246000],
  ['Wages Expense', 88000, null], ['Utilities Expense', 5600, null],
]

const ADJUSTED = [
  ['Cash', 244800, null], ['Accounts Receivable', 48000, null], ['Supplies', 2300, null],
  ['Prepaid Insurance', 8400, null], ['Trucks', 120000, null],
  ['Accumulated Depreciation — Trucks', null, 15000],
  ['Accounts Payable', null, 2600], ['Wages Payable', null, 6400], ['Interest Payable', null, 4050],
  ['Unearned Revenue', null, 24000], ['Notes Payable', null, 90000],
  ['Common Stock', null, 180000], ['Dividends', 12000, null], ['Service Revenue', null, 246000],
  ['Wages Expense', 94400, null], ['Utilities Expense', 5600, null], ['Insurance Expense', 6000, null],
  ['Supplies Expense', 7500, null], ['Depreciation Expense', 15000, null], ['Interest Expense', 4050, null],
]

const T_ACCOUNTS = ['Cash', 'Accounts Receivable', 'Supplies', 'Prepaid Insurance', 'Trucks', 'Accounts Payable', 'Unearned Revenue', 'Notes Payable', 'Common Stock', 'Dividends', 'Service Revenue', 'Wages Expense']

const money = n => (n === null || n === undefined ? '' : '$' + n.toLocaleString())
const sumCol = (rows, i) => rows.reduce((s, r) => s + (r[i] || 0), 0)

function BlankEntryForm({ rows = 4, label }) {
  return (
    <table className="ws-blank">
      {label && <caption className="cram-small" style={{ textAlign: 'left', paddingBottom: 3 }}>{label}</caption>}
      <thead><tr><th style={{ width: '14%' }}>Date</th><th>Account Description</th><th style={{ width: '18%' }}>Debit</th><th style={{ width: '18%' }}>Credit</th></tr></thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i} className="ws-rule"><td></td><td></td><td></td><td></td></tr>
        ))}
      </tbody>
    </table>
  )
}

function FilledEntry({ date, lines }) {
  return (
    <table>
      <tbody>
        {lines.map(([acct, dr, cr], i) => (
          <tr key={i}>
            <td style={{ width: '14%' }}>{i === 0 ? date : ''}</td>
            <td style={{ paddingLeft: cr ? 22 : 4 }}>{acct}</td>
            <td style={{ width: '18%', textAlign: 'right' }} className="mono">{money(dr)}</td>
            <td style={{ width: '18%', textAlign: 'right' }} className="mono">{money(cr)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function TrialBalance({ title, date, rows, blank }) {
  return (
    <div>
      <p style={{ textAlign: 'center', margin: '0 0 2px', fontWeight: 700 }}>Copperline Freight Co.</p>
      <p style={{ textAlign: 'center', margin: 0 }}>{title}</p>
      <p style={{ textAlign: 'center', margin: '0 0 6px' }} className="cram-small">{date}</p>
      <table className={blank ? 'ws-blank' : ''}>
        <thead><tr><th>Account</th><th style={{ width: '20%', textAlign: 'right' }}>Debit</th><th style={{ width: '20%', textAlign: 'right' }}>Credit</th></tr></thead>
        <tbody>
          {blank
            ? Array.from({ length: rows }).map((_, i) => <tr key={i} className="ws-rule"><td></td><td></td><td></td></tr>)
            : rows.map(([a, dr, cr]) => (
                <tr key={a}><td>{a}</td><td className="mono" style={{ textAlign: 'right' }}>{money(dr)}</td><td className="mono" style={{ textAlign: 'right' }}>{money(cr)}</td></tr>
              ))}
          <tr style={{ borderTop: '2px solid #111827', fontWeight: 700 }}>
            <td>Totals</td>
            <td className="mono" style={{ textAlign: 'right' }}>{blank ? '' : money(sumCol(rows, 1))}</td>
            <td className="mono" style={{ textAlign: 'right' }}>{blank ? '' : money(sumCol(rows, 2))}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default function Worksheet() {
  const [showKey, setShowKey] = useState(false)
  return (
    <div className="cram">
      <div className="cram-toolbar no-print">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Printable Practice Problem</h1>
          <p className="text-sm text-slate-300">
            A full-cycle problem in the same Date / Account / Debit / Credit layout as class — meant to be printed and worked with a pencil.
            The answer key is on its own pages, so print it all and keep the key face down.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <button onClick={() => setShowKey(k => !k)} className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">
            {showKey ? 'Hide key' : 'Show key'}
          </button>
          <button onClick={() => window.print()} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:opacity-90">
            🖨️ Print
          </button>
        </div>
      </div>

      <div className="cram-page">
        <header className="cram-head">
          <h1>Copperline Freight Co. — Comprehensive Problem</h1>
          <p>First year of operations · year ended December 31, 2025 · Name _______________________</p>
        </header>

        <section className="cram-section">
          <h2>Part A — Journalize the transactions</h2>
          <p className="cram-lead">Record each transaction below. Debits flush left, credits indented.</p>
          {TRANSACTIONS.map((tx, i) => (
            <div key={i} style={{ marginBottom: 10, breakInside: 'avoid' }}>
              <p style={{ margin: '0 0 3px' }}><strong>{i + 1}. {tx.d}</strong> — {tx.t}</p>
              <BlankEntryForm rows={tx.lines.length + 1} />
            </div>
          ))}
        </section>

        <section className="cram-section break-before">
          <h2>Part B — Post to the ledger</h2>
          <p className="cram-lead">Foot each account and write the balance on its normal side.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
            {T_ACCOUNTS.map(a => (
              <div className="t-account" key={a}>
                <div className="t-head">{a}</div>
                <div className="t-body"><div>Dr</div><div>Cr</div></div>
              </div>
            ))}
          </div>
        </section>

        <section className="cram-section break-before">
          <h2>Part C — Unadjusted trial balance</h2>
          <TrialBalance title="Unadjusted Trial Balance" date="December 31, 2025" rows={16} blank />
        </section>

        <section className="cram-section break-before">
          <h2>Part D — Adjusting entries at December 31</h2>
          {ADJUSTMENTS.map(a => (
            <div key={a.n} style={{ marginBottom: 10, breakInside: 'avoid' }}>
              <p style={{ margin: '0 0 3px' }}><strong>({a.n})</strong> {a.t}</p>
              <BlankEntryForm rows={3} />
            </div>
          ))}
        </section>

        <section className="cram-section break-before">
          <h2>Part E — Adjusted trial balance</h2>
          <TrialBalance title="Adjusted Trial Balance" date="December 31, 2025" rows={22} blank />
          <p className="cram-note">
            Then answer: Net income for the year? ________________ · Retained earnings at December 31? ________________
          </p>
        </section>
      </div>

      {showKey && (
        <div className="cram-page break-before" style={{ marginTop: 24 }}>
          <header className="cram-head">
            <h1>Answer Key — Copperline Freight Co.</h1>
            <p>Check your work only after finishing. Every total below ties.</p>
          </header>

          <section className="cram-section">
            <h2>Part A — Journal entries</h2>
            {TRANSACTIONS.map((tx, i) => (
              <div key={i} style={{ marginBottom: 6, breakInside: 'avoid' }}>
                <p style={{ margin: '0 0 2px' }} className="cram-small"><strong>{i + 1}. {tx.d}</strong></p>
                <FilledEntry date={tx.d} lines={tx.lines} />
              </div>
            ))}
          </section>

          <section className="cram-section break-before">
            <h2>Part C — Unadjusted trial balance</h2>
            <TrialBalance title="Unadjusted Trial Balance" date="December 31, 2025" rows={UNADJUSTED} />
          </section>

          <section className="cram-section">
            <h2>Part D — Adjusting entries</h2>
            {ADJUSTMENTS.map(a => (
              <div key={a.n} style={{ marginBottom: 8, breakInside: 'avoid' }}>
                <p style={{ margin: '0 0 2px' }}><strong>({a.n})</strong></p>
                <FilledEntry date="Dec 31" lines={a.lines} />
                <p className="cram-small" style={{ margin: '2px 0 0' }}>{a.work}</p>
              </div>
            ))}
          </section>

          <section className="cram-section break-before">
            <h2>Part E — Adjusted trial balance</h2>
            <TrialBalance title="Adjusted Trial Balance" date="December 31, 2025" rows={ADJUSTED} />
            <p className="cram-note">
              <strong>Net income</strong> = $246,000 revenue − $132,550 expenses = <strong>$113,450</strong>.{' '}
              <strong>Retained earnings, Dec 31</strong> = $0 beginning + $113,450 − $12,000 dividends = <strong>$101,450</strong>.{' '}
              Retained Earnings is $0 on the trial balance because this is the first year and the books have not been closed yet.
            </p>
          </section>
        </div>
      )}
    </div>
  )
}
