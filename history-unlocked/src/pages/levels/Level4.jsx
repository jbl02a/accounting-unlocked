import LevelShell from '../../components/drills/LevelShell'
import Sequence from '../../components/drills/Sequence'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L4_QUIZ } from '../../data/levelQuestions'

const EVENTS = [
  { id: 'c1', year: 1607, label: 'Jamestown founded', why: 'a company venture chasing gold, not a refuge' },
  { id: 'c2', year: 1612, label: 'John Rolfe plants West Indian tobacco', why: 'the colony finally has an export' },
  { id: 'c3', year: 1619, label: 'House of Burgesses meets; first Africans landed at Point Comfort', why: 'self-government and unfree labour begin the same year' },
  { id: 'c4', year: 1624, label: 'Virginia becomes a royal colony', why: 'the Virginia Company had failed' },
  { id: 'c5', year: 1662, label: 'Virginia law makes slave status follow the mother', why: 'slavery becomes hereditary' },
  { id: 'c6', year: 1676, label: 'Bacon’s Rebellion', why: 'frontier servants and freedmen against the tidewater elite' },
]

const CAUSES = [
  { id: 'r1', label: 'Former indentured servants finished their terms and found the good tidewater land already taken', correct: 'cause',
    hint: 'What does a colony do when it keeps promising land it has already given away?',
    why: 'A cause. The headright system produced a growing class of landless free men with grievances and guns.' },
  { id: 'r2', label: 'Governor Berkeley refused to attack Native peoples on the frontier, protecting a profitable fur trade',
    correct: 'cause', hint: 'Who benefited from peace on the frontier, and who paid for it?',
    why: 'A cause. Backcountry settlers wanted Native land cleared; Berkeley and his allies wanted the trade preserved.' },
  { id: 'r3', label: 'Planters shifted decisively toward enslaved African labour rather than indentured servants', correct: 'effect',
    hint: 'What kind of labour force never finishes a term and never demands land?',
    why: 'An effect — the most important one. Enslaved people never became landless freedmen, so the class of angry ex-servants stopped growing.' },
  { id: 'r4', label: 'Jamestown was burned and the governor temporarily driven out', correct: 'effect',
    hint: 'This is what the rebellion did, not what caused it.',
    why: 'An effect. It showed the tidewater elite how physically dangerous discontented poor whites could be.' },
  { id: 'r5', label: 'Tobacco prices fell while taxes stayed high', correct: 'cause',
    hint: 'An economic squeeze on the people with the least margin.',
    why: 'A cause. Falling prices and heavy taxes hit small planters and freedmen hardest.' },
  { id: 'r6', label: 'Racial lines hardened as poor whites were offered status above all Black Virginians', correct: 'effect',
    hint: 'If you cannot give the poor land, what can you give them instead?',
    why: 'An effect, and the one historians stress: race was used to split a coalition of the poor that had briefly acted together.' },
]

const meta = {
  title: 'The Chesapeake',
  era: '1607–1700',
  intro: 'Jamestown almost failed, then found tobacco — and tobacco built everything that followed: the labour system, the land hunger, the wars with the Powhatan, a rebellion, and the hardening of slavery into law.',
  cta: 'Practice — sequence, sort, then 5 questions',
  praise: 'You can trace the chain from a crop to a slave code. That is the Chesapeake in one move.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-amber-600/30 bg-amber-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-2">The chain the whole level hangs on</p>
      <p className="text-white font-semibold mb-2">Tobacco → labour hunger → land hunger → conflict → slavery in law.</p>
      <p className="text-sm text-slate-300">
        Learn it as a chain, not a list of dates. Any Chesapeake question you meet is asking you to move one link along it.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { h: 'A business, not a refuge', d: 'The Virginia Company sent men to look for gold. They starved — 1609–10 is remembered as the "starving time" — and the colony survived only when Rolfe planted West Indian tobacco in 1612.' },
        { h: 'The headright system', d: 'Pay a person’s passage, receive about 50 acres. It solved the labour problem by importing indentured servants, and quietly created a future problem: servants who survived their terms and expected land of their own.' },
        { h: '1619, twice over', d: 'The House of Burgesses — the first elected assembly in English America — met the same year the first Africans were landed at Point Comfort. Self-government and unfree labour start together, and that is worth saying out loud in an essay.' },
        { h: 'War with the Powhatan', d: 'Expanding tobacco fields meant taking Powhatan land. Uprisings in 1622 and 1644 were answered with campaigns that broke Powhatan power — displacement was not a side effect of the tobacco economy, it was built into it.' },
        { h: 'Bacon’s Rebellion, 1676', d: 'Frontier freedmen under Nathaniel Bacon attacked Native villages, then burned Jamestown and drove out Governor Berkeley. Poor whites and Black Virginians fought side by side — which is precisely what alarmed the elite.' },
        { h: 'Slavery written into law', d: 'The 1662 statute made status follow the mother; the 1705 Virginia Slave Codes completed the structure. Slavery hardened from a fluid, brutal custom into a permanent, racial and hereditary legal institution.' },
      ].map(x => (
        <div key={x.h} className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="font-bold text-white text-sm mb-1">{x.h}</p>
          <p className="text-sm text-slate-300">{x.d}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
      <p className="font-bold text-amber-300 mb-2">⚠️ Two traps</p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">1619 is not the start of legal slavery.</span> Those first Africans entered a
        society whose law had not yet defined slavery; some early arrivals gained freedom and property. The legal institution is
        built between 1640 and 1705. Say &ldquo;slavery hardened&rdquo;, not &ldquo;slavery began&rdquo;.
      </p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">Bacon was not a liberator.</span> His rebellion attacked Native peoples as well as
        the governor. Treat it as a class conflict with a violently anti-Native edge, not a democratic uprising.
      </p>
    </div>
  </>
)

export default function Level4() {
  return (
    <LevelShell
      level={4} meta={meta} lesson={lesson} nextLevel={5}
      rounds={[
        done => <Sequence events={EVENTS} level={4} taskId="L4-seq" title="Build the Chesapeake timeline"
          instruction="Six moments, earliest first. The colony has to survive before it can argue about land."
          hint="Founding, then a cash crop, then institutions, then the conflicts those institutions cause." onDone={done} />,
        done => <CardSort items={CAUSES} buckets={[{ id: 'cause', label: 'Cause of the rebellion' }, { id: 'effect', label: 'Effect of the rebellion' }]}
          level={4} taskPrefix="L4-bacon" title="Bacon’s Rebellion: cause or effect?"
          instruction="Six statements. Decide whether each one helped bring the rebellion about or followed from it." onDone={done} />,
        done => <QuizRound questions={L4_QUIZ} title="The Chesapeake" onDone={done} />,
      ]}
    />
  )
}
