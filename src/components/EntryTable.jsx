export function money(n) {
  return '$' + Number(n).toLocaleString()
}

// Renders a journal entry the way a textbook prints it: debits first and flush left,
// credits below and indented, amounts in their own columns.
export default function EntryTable({ lines, dense = false }) {
  const pad = dense ? 'px-3 py-1.5' : 'px-4 py-2'
  return (
    <div className="rounded-lg border border-white/10 overflow-hidden bg-slate-900/60">
      <div className={`grid grid-cols-[1fr_5.5rem_5.5rem] bg-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider ${pad}`}>
        <span>Account</span>
        <span className="text-right">Debit</span>
        <span className="text-right">Credit</span>
      </div>
      {lines.map((line, i) => (
        <div
          key={i}
          className={`grid grid-cols-[1fr_5.5rem_5.5rem] text-sm ${pad} ${i % 2 ? 'bg-white/[0.03]' : ''}`}
        >
          <span className={line.cr ? 'text-slate-300 pl-5' : 'text-white'}>{line.account}</span>
          <span className="text-right font-mono text-white">{line.dr ? money(line.dr) : ''}</span>
          <span className="text-right font-mono text-slate-300">{line.cr ? money(line.cr) : ''}</span>
        </div>
      ))}
    </div>
  )
}
