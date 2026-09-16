import { Link } from 'react-router-dom'
import { useScrollTop } from '../lib/useScrollTop'
import { PROBLEM_SETS } from '../data/problemSets'

// A printable answer key for the TA's problems, generated from the SAME data the
// interactive version grades against — so the paper key can never disagree with
// the site. Nothing here is retyped.

const money = n => '$' + Number(n).toLocaleString('en-US')

function EntryLines({ answer }) {
  return (
    <table style={{ width: '100%' }}>
      <tbody>
        {answer.debits.map(([acct, amt], i) => (
          <tr key={`d${i}`}>
            <td style={{ width: 34 }}><span className="tag-dr">DR</span></td>
            <td>{acct}</td>
            <td className="mono" style={{ textAlign: 'right', width: 90 }}>{money(amt)}</td>
            <td style={{ width: 90 }} />
          </tr>
        ))}
        {answer.credits.map(([acct, amt], i) => (
          <tr key={`c${i}`}>
            <td style={{ width: 34 }}><span className="tag-cr">CR</span></td>
            <td style={{ paddingLeft: 22 }}>{acct}</td>
            <td style={{ width: 90 }} />
            <td className="mono" style={{ textAlign: 'right', width: 90 }}>{money(amt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

function StepRow({ step, n }) {
  return (
    <div className="cram-section" style={{ marginBottom: 11 }}>
      <p style={{ margin: '0 0 3px', fontWeight: 700, fontSize: 11.5 }}>
        {n}. {step.date ? <span style={{ color: '#4b5563', fontWeight: 600 }}>{step.date} — </span> : null}
        {step.prompt}
      </p>

      {step.kind === 'entry' && <EntryLines answer={step.answer} />}

      {step.kind === 'numeric' && (
        <p className="mono" style={{ margin: '2px 0', fontWeight: 700 }}>{money(step.answer)}</p>
      )}

      {step.kind === 'mc' && (
        <p style={{ margin: '2px 0', fontWeight: 700 }}>{step.options[step.correctIndex]}</p>
      )}

      {step.kind === 'classify' && (
        <table style={{ marginTop: 3 }}>
          <tbody>
            {step.items.map((it, i) => (
              <tr key={i}>
                <td style={{ width: '55%' }}>{it.label}</td>
                <td style={{ fontWeight: 700 }}>{it.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {step.kind === 'classify2' && (
        <table style={{ marginTop: 3 }}>
          <thead>
            <tr><th>Item</th><th>Statement</th><th>Classified as</th></tr>
          </thead>
          <tbody>
            {step.items.map((it, i) => (
              <tr key={i}>
                <td>{it.label}</td>
                <td style={{ fontWeight: 700 }}>{it.statement}</td>
                <td style={{ fontWeight: 700 }}>{it.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <p className="cram-note" style={{ margin: '3px 0 0' }}>{step.why}</p>
      {step.watchFor && (
        <p className="cram-note" style={{ margin: '2px 0 0', fontWeight: 600, color: '#92400e' }}>
          ⚠ {step.watchFor}
        </p>
      )}
    </div>
  )
}

export default function ProblemKey() {
  useScrollTop([])

  return (
    <div className="cram">
      <div className="cram-toolbar no-print">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Answer Key — TA Problem Sets</h1>
          <p className="text-sm text-dim">
            Every one of the TA's four problems worked in full, with the reason and the trap for each
            step. Generated from the same data the site grades against, so it cannot disagree with it.
            Print it to check paper work — or keep it face down and use the site instead.
          </p>
        </div>
        <div className="flex gap-2 shrink-0">
          <Link to="/problems" className="px-4 py-2.5 rounded-xl bg-white/10 text-white font-semibold hover:bg-white/20">
            Back to problems
          </Link>
          <button onClick={() => window.print()} className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold hover:opacity-90">
            🖨️ Print
          </button>
        </div>
      </div>

      <div className="cram-page key-page">
        <header className="cram-head">
          <h1>Answer Key — TA Practice Problems</h1>
          <p>
            Accounting Unlocked · every figure recomputed from the journal entries ·
            Copperline foots to $1,451,400 · Boonville to $80,800 · Bulldog net income $42,500
          </p>
        </header>

        {PROBLEM_SETS.map((set, si) => (
          <section key={set.id} className={si > 0 ? 'break-before' : undefined}>
            <div className="cram-section">
              <h2>{set.title}</h2>
              <p className="cram-lead cram-small">
                {set.source} · {set.steps.length} steps{set.intro ? ` · ${set.intro}` : ''}
              </p>
            </div>
            {set.steps.map((step, i) => <StepRow key={step.id} step={step} n={i + 1} />)}
          </section>
        ))}

        <div className="cram-foot">
          Worked answers for the course TA's practice problems · check them against your own working,
          then drill whatever you missed at /problems
        </div>
      </div>
    </div>
  )
}
