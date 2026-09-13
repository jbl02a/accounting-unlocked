// The history analogue of the accounting app's EntryTable. AP questions are
// stimulus-based — a source followed by questions about it — so this is the
// component the whole exam format hangs on.
const KIND_META = {
  excerpt: { icon: '📜', label: 'Primary source' },
  secondary: { icon: '📖', label: 'Secondary source' },
  image: { icon: '🖼️', label: 'Image' },
  map: { icon: '🗺️', label: 'Map' },
  data: { icon: '📊', label: 'Data' },
}

export default function SourceCard({ text, attribution, kind = 'excerpt', dense = false }) {
  const meta = KIND_META[kind] || KIND_META.excerpt
  return (
    <figure className={`rounded-xl border border-amber-700/40 bg-amber-950/30 ${dense ? 'p-3' : 'p-4'} m-0`}>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm">{meta.icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400/80">{meta.label}</span>
      </div>
      <blockquote className={`${dense ? 'text-xs' : 'text-sm'} text-amber-50/90 leading-relaxed italic`}>
        {text.split('\n').map((line, i) => <p key={i} className={i ? 'mt-2' : ''}>{line}</p>)}
      </blockquote>
      {attribution && (
        <figcaption className="mt-3 pt-2 border-t border-amber-700/30 text-[11px] text-amber-300/70 not-italic">
          — {attribution}
        </figcaption>
      )}
    </figure>
  )
}
