import { useState } from 'react'
import { Link } from 'react-router-dom'

// A scannable spine for Periods 1–2. Dates alone are worth little on the AP exam,
// so every entry carries a "why it matters" line — that is the part that earns
// points, and the part this page exists to rehearse.
const ERAS = [
  { id: 'contact', label: 'Contact', range: '1491–1607' },
  { id: 'settle', label: 'Settlement', range: '1607–1700' },
  { id: 'mature', label: 'Maturing colonies', range: '1700–1754' },
  { id: 'war', label: 'Empire & war', range: '1754–1765' },
]

const ENTRIES = [
  { year: '1491', era: 'contact', level: 1, title: 'North America before contact',
    what: 'Hundreds of societies, each adapted to its environment — Pueblo irrigation, Chinook fishing villages, Plains hunting, Iroquois confederation, Mississippian cities.',
    why: 'Establishes that the continent was populated and complex. Every "empty wilderness" framing is wrong from here on.' },
  { year: '1492', era: 'contact', level: 2, title: 'Columbus reaches the Caribbean',
    what: 'Four voyages for Spain, beginning the permanent connection between hemispheres.',
    why: 'Opens the Columbian Exchange — the biological event that shapes everything in Period 1.' },
  { year: '1494', era: 'contact', level: 3, title: 'Treaty of Tordesillas',
    what: 'Spain and Portugal divide the Atlantic world between themselves.',
    why: 'Two European kingdoms partition a hemisphere with no Indigenous party present — and England and France later ignore it entirely.' },
  { year: '1519–21', era: 'contact', level: 2, title: 'Fall of Tenochtitlán',
    what: 'Cortés, with tens of thousands of Native allies and a smallpox epidemic, brings down the Mexica empire.',
    why: 'Shows how conquest actually worked: disease plus Native alliances, not a few hundred Spaniards defeating millions.' },
  { year: '1542', era: 'contact', level: 3, title: 'The New Laws',
    what: 'Spain restricts encomienda after sustained criticism, much of it from Bartolomé de las Casas.',
    why: 'Evidence that the morality of conquest was contested inside Spain — useful for any "were Europeans monolithic?" prompt.' },
  { year: '1565', era: 'contact', level: 3, title: 'St. Augustine founded',
    what: 'Spanish Florida; the oldest continuously occupied European settlement in what became the United States.',
    why: 'A reminder of how much earlier Spain arrived — Jamestown is still forty-two years away.' },

  { year: '1607', era: 'settle', level: 4, title: 'Jamestown',
    what: 'The Virginia Company lands men looking for gold. Most die; the colony nearly fails.',
    why: 'English colonisation begins as a business venture, and that motive explains the Chesapeake’s whole development.' },
  { year: '1612', era: 'settle', level: 4, title: 'Rolfe plants tobacco',
    what: 'A West Indian strain succeeds in Virginia soil.',
    why: 'The first link in the chain: tobacco → labour hunger → land hunger → conflict → slavery in law.' },
  { year: '1619', era: 'settle', level: 4, title: 'Burgesses meet; first Africans landed',
    what: 'The first elected assembly in English America sits, and a ship sells the first Africans at Point Comfort — in the same year.',
    why: 'Self-government and unfree labour begin together. Note that slavery is not yet defined in law; it hardens over the next century.' },
  { year: '1620', era: 'settle', level: 5, title: 'Plymouth and the Mayflower Compact',
    what: 'Separatists land outside their patent and agree among themselves to form a "civil body politic."',
    why: 'Government by consent when no authority reaches you — an early root of American self-rule.' },
  { year: '1630', era: 'settle', level: 5, title: 'Massachusetts Bay',
    what: 'Winthrop leads the Great Migration; "a city upon a hill."',
    why: 'Family migration and covenant theology produce towns, schools and the town meeting.' },
  { year: '1636–37', era: 'settle', level: 5, title: 'Williams, Hutchinson, Harvard, Pequot War',
    what: 'Roger Williams is banished and founds Providence; Anne Hutchinson is tried and exiled; Harvard is founded; the Pequot War devastates a Native nation.',
    why: 'Puritan New England in one frame: literate, self-governing, intolerant of dissent, and expanding onto Native land.' },
  { year: '1662', era: 'settle', level: 4, title: 'Slave status follows the mother',
    what: 'Virginia reverses English common law so that a child’s status follows the mother.',
    why: 'The moment slavery becomes hereditary and self-reproducing. Pair it with 1705.' },
  { year: '1664', era: 'settle', level: 6, title: 'New Netherland becomes New York',
    what: 'England takes the Dutch colony without much of a fight.',
    why: 'England inherits an already diverse, commercial colony — the reason the Middle Colonies start out unlike anywhere else.' },
  { year: '1670', era: 'settle', level: 6, title: 'Carolina settled',
    what: 'Planters from Barbados arrive with a working slave system already in hand.',
    why: 'Explains why the Lower South’s codes were the harshest on the mainland from the very beginning.' },
  { year: '1675–76', era: 'settle', level: 5, title: 'King Philip’s War',
    what: 'Metacom leads a coalition against expanding New England towns; both sides are devastated.',
    why: 'Proportionally among the deadliest wars in American history, and the end of Native power in southern New England.' },
  { year: '1676', era: 'settle', level: 4, title: 'Bacon’s Rebellion',
    what: 'Frontier freedmen attack Native villages, burn Jamestown and drive out Governor Berkeley.',
    why: 'Poor whites and Black Virginians fought together — which is exactly why the elite turned to enslaved labour and hardened racial lines.' },
  { year: '1681', era: 'settle', level: 6, title: 'Pennsylvania chartered',
    what: 'William Penn founds a Quaker colony on toleration, pacifism and payment for Lenape land.',
    why: 'The clearest colonial contrast with Puritan Massachusetts, and the magnet that made the Middle Colonies diverse.' },
  { year: '1688', era: 'settle', level: null, title: 'Glorious Revolution',
    what: 'James II is deposed in England; the Dominion of New England collapses and colonists rise in Boston, New York and Maryland.',
    why: 'Colonists claim the rights of Englishmen — the constitutional argument they will make again in the 1760s.' },
  { year: '1692', era: 'settle', level: 5, title: 'Salem witch trials',
    what: 'Nineteen executions in a community strained by war, land pressure and social division.',
    why: 'Best used as evidence of stress inside a Puritan society whose religious intensity was already fading.' },

  { year: '1705', era: 'mature', level: 4, title: 'Virginia Slave Codes',
    what: 'A comprehensive legal framework defining enslaved people as property and stripping their rights.',
    why: 'Completes what 1662 began. Chattel slavery is now fully built in law — hereditary, lifelong and racial.' },
  { year: '1730s–40s', era: 'mature', level: null, title: 'First Great Awakening',
    what: 'Edwards and Whitefield preach emotional, personal conversion; congregations split into New Lights and Old Lights.',
    why: 'A religious movement with political consequences: it taught ordinary colonists to judge established authority for themselves.' },
  { year: '1732', era: 'mature', level: 6, title: 'Georgia chartered',
    what: 'A buffer against Spanish Florida and a colony for the deserving poor, with slavery and rum banned.',
    why: 'Both bans collapse by 1751 — a neat case study in economic pressure overriding founding intent.' },
  { year: '1739', era: 'mature', level: 6, title: 'Stono Rebellion',
    what: 'About sixty enslaved people march toward Spanish Florida, which had promised freedom. The uprising is crushed.',
    why: 'Followed by the Negro Act of 1740. The pattern repeats: resistance produced repression, not reform.' },
  { year: '1651–1733', era: 'mature', level: 7, title: 'The Navigation Acts',
    what: 'A series of laws requiring colonial trade to move in British ships and routing "enumerated" goods through Britain first.',
    why: 'Mercantilism in legal form. Loosely enforced for a century, which is the whole point — the laws were old; the enforcement after 1763 was new.' },
  { year: '1686–89', era: 'mature', level: 7, title: 'Dominion of New England',
    what: 'James II merges the northern colonies, suspends their assemblies and enforces the trade laws; the Glorious Revolution topples him and colonists overthrow Governor Andros.',
    why: 'A full rehearsal for 1763–65, eighty years early: tighten control, meet resistance, revert to neglect.' },
  { year: '1754', era: 'war', level: 8, title: 'Fort Necessity; the Albany Plan',
    what: 'Washington surrenders in the Ohio valley, starting the French and Indian War. Franklin proposes colonial union for defence and every assembly refuses.',
    why: 'A frontier skirmish becomes a world war — and the refusal shows how separate the colonies still were in 1754.' },
  { year: '1755', era: 'war', level: 8, title: 'Braddock’s defeat',
    what: 'A British regular army is destroyed near Fort Duquesne.',
    why: 'Early British disasters — and a lesson colonists drew about the invincibility of regular troops.' },
  { year: '1757–59', era: 'war', level: 8, title: 'Pitt takes over; Quebec falls',
    what: 'William Pitt pours money and troops into North America; Quebec falls in 1759.',
    why: 'The turning point. Britain wins the continent — and borrows enormously to do it.' },
  { year: '1763', era: 'war', level: 8, title: 'Treaty of Paris',
    what: 'France cedes Canada and everything east of the Mississippi; Spain gives up Florida and takes Louisiana; France keeps its sugar islands.',
    why: 'France leaves the mainland, so the colonies no longer need British protection — at the exact moment Britain starts asking more of them.' },
  { year: '1763', era: 'war', level: 8, title: 'Pontiac’s War; the Proclamation Line',
    what: 'A Native coalition takes most British posts beyond the Appalachians; Britain then forbids settlement west of the mountains.',
    why: 'For Native nations, the end of playing two empires off each other. For colonists, a betrayal of what they thought they had won.' },
  { year: '1764–65', era: 'war', level: 8, title: 'Sugar Act, Stamp Act, Quartering Act',
    what: 'Parliament taxes the colonies directly and enforces customs in earnest; nine colonies send delegates to the Stamp Act Congress.',
    why: 'The end of salutary neglect. Compare that joint response with the flat refusal of the Albany Plan eleven years earlier.' },
]

export default function Timeline() {
  const [era, setEra] = useState('all')
  const shown = era === 'all' ? ENTRIES : ENTRIES.filter(e => e.era === era)

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold text-white mb-2">Colonial Timeline</h1>
        <p className="text-slate-400">
          1491 to 1765. Dates by themselves earn nothing on this exam — the line that matters is{' '}
          <span className="text-amber-300">why it matters</span>. Read those first.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setEra('all')}
          className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
            era === 'all' ? 'border-amber-500 bg-amber-900/40 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-amber-400'}`}>
          All · 1491–1765
        </button>
        {ERAS.map(x => (
          <button key={x.id} onClick={() => setEra(x.id)}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold border transition-colors ${
              era === x.id ? 'border-amber-500 bg-amber-900/40 text-white' : 'border-slate-700 bg-slate-800 text-slate-400 hover:border-amber-400'}`}>
            {x.label} <span className="font-mono text-xs opacity-70">{x.range}</span>
          </button>
        ))}
      </div>

      <ol className="relative border-l border-amber-700/40 ml-3 space-y-5">
        {shown.map(e => (
          <li key={e.year + e.title} className="ml-6">
            <span className="absolute -left-[7px] mt-2 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-[#14100c]" />
            <div className="rounded-xl bg-white/5 border border-white/10 p-4">
              <div className="flex items-baseline gap-3 flex-wrap mb-1">
                <span className="font-mono text-sm font-bold text-amber-400">{e.year}</span>
                <h2 className="font-bold text-white">{e.title}</h2>
                {e.level && (
                  <Link to={`/level/${e.level}`} className="text-[11px] text-slate-500 hover:text-amber-300 transition-colors">
                    Level {e.level} →
                  </Link>
                )}
              </div>
              <p className="text-sm text-slate-300 mb-2">{e.what}</p>
              <p className="text-sm text-amber-200/90">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500/70 mr-2">Why it matters</span>
                {e.why}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <p className="text-xs text-slate-600 mt-8 text-center">
        {shown.length} of {ENTRIES.length} entries · Periods 1–2 and the opening of Period 3
      </p>
    </div>
  )
}
