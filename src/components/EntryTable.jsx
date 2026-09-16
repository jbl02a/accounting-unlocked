export function money(n) {
  return '$' + Number(n).toLocaleString()
}

// Renders a journal entry the way a textbook prints it: debits first and flush left,
// credits below and indented, amounts in their own columns.
//
// Pass `date` to include the Date column the course worksheets use
// (Date | Account Description | Debit | Credit). The date shows on the first line
// only, which is the convention.
export default function EntryTable({ lines, dense = false, date = null }) {
  const pad = dense ? 'px-3 py-1.5' : 'px-4 py-2'
  const cols = date
    ? 'grid-cols-[3.6rem_1fr_5.5rem_5.5rem]'
    : 'grid-cols-[1fr_5.5rem_5.5rem]'
  return (
    <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
      <div className={`grid ${cols} bg-slate-800 text-[10px] font-bold text-dim uppercase tracking-wider ${pad}`}>
        {date && <span>Date</span>}
        <span>Account</span>
        <span className="text-right">Debit</span>
        <span className="text-right">Credit</span>
      </div>
      {lines.map((line, i) => (
        <div
          key={i}
          className={`grid ${cols} text-sm ${pad} ${i % 2 ? 'bg-white/[0.03]' : ''}`}
        >
          {date && <span className="text-dim text-xs">{i === 0 ? date : ''}</span>}
          <span className={line.cr ? 'text-slate-300 pl-5' : 'text-white'}>{line.account}</span>
          <span className="text-right font-mono text-white">{line.dr ? money(line.dr) : ''}</span>
          <span className="text-right font-mono text-slate-300">{line.cr ? money(line.cr) : ''}</span>
        </div>
      ))}
    </div>
  )
}
