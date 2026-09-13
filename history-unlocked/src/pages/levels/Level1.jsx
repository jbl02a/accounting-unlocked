import LevelShell from '../../components/drills/LevelShell'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L1_QUIZ } from '../../data/levelQuestions'

const REGIONS = [
  { id: 'sw', label: 'Southwest' },
  { id: 'nw', label: 'Pacific NW / California' },
  { id: 'plains', label: 'Great Plains' },
  { id: 'east', label: 'Eastern Woodlands' },
  { id: 'se', label: 'Southeast / Mississippi' },
]

const SOCIETIES = [
  { id: 's1', label: 'Irrigated maize farming supporting permanent adobe settlements in an arid climate', correct: 'sw',
    hint: 'Dry land, but farmable if you can move water to it. Which region needed engineering to grow food?',
    why: 'Pueblo peoples engineered irrigation to farm maize in the desert, allowing permanent towns.' },
  { id: 's2', label: 'Abundant salmon and marine life supported large permanent villages without farming', correct: 'nw',
    hint: 'A region so rich in food from the water that agriculture was never necessary.',
    why: 'Chinook and neighbouring peoples built permanent plank-house villages on fishing, not farming — abundance without agriculture.' },
  { id: 's3', label: 'Mobile hunting bands following buffalo herds, with some river-valley farming villages', correct: 'plains',
    hint: 'Grassland with a huge migratory food source. Note this was true BEFORE horses arrived.',
    why: 'Plains peoples mixed nomadic buffalo hunting with settled farming along rivers. Horseback hunting came only after the Spanish reintroduced horses.' },
  { id: 's4', label: 'Three-Sisters agriculture combined with hunting, organised into confederations such as the Iroquois',
    correct: 'east', hint: 'Maize, beans and squash grown together, plus a famous political league of five nations.',
    why: 'Eastern Woodlands peoples farmed the Three Sisters and hunted; the Iroquois Confederacy united five nations politically.' },
  { id: 's5', label: 'Large mound-building urban centres such as Cahokia, supported by maize surpluses', correct: 'se',
    hint: 'A city of perhaps 10,000–20,000 people near modern St. Louis, centuries before Columbus.',
    why: 'Mississippian societies built Cahokia — evidence of complex, hierarchical urban life in North America long before contact.' },
  { id: 's6', label: 'Small kinship bands moving constantly across a harsh, resource-poor interior', correct: 'plains',
    hint: 'Careful — this describes the driest, least productive interior land, where groups had to stay small and mobile.',
    why: 'The Great Basin within the Plains/interior West supported only small mobile bands — environment set a hard ceiling on social scale.' },
]

const meta = {
  title: 'Before Contact',
  era: '1491',
  intro: 'North America in 1491 was not empty, and it was not uniform. Hundreds of societies had adapted to wildly different environments — and those environments shaped how people lived, farmed, traded and governed themselves.',
  cta: 'Practice — sort the regions, then 3 questions',
  praise: 'You can place a society by its environment. That is the Unit 1 move.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-emerald-600/30 bg-emerald-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">The idea the whole unit turns on</p>
      <p className="text-white font-semibold mb-2">Environment shaped social organisation.</p>
      <p className="text-sm text-slate-300">
        Where food was abundant and reliable, people built permanent settlements, grew dense and developed hierarchy. Where it was
        scarce or mobile, people stayed mobile too. None of this is a ladder from primitive to advanced — it is adaptation. The AP
        exam tests this as <span className="text-white font-semibold">GEO</span>: geography and the environment.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { r: 'Southwest', p: 'Pueblo peoples', d: 'Irrigated maize in an arid climate. Permanent multi-storey adobe settlements. Engineering made density possible.' },
        { r: 'Pacific Northwest & California', p: 'Chinook, Chumash', d: 'Salmon and marine abundance supported large permanent villages with no agriculture at all — wealth without farming.' },
        { r: 'Great Plains', p: 'Sioux, Cheyenne, Pawnee', d: 'Mostly mobile buffalo hunting, with settled farming villages along river valleys. Horses came only after the Spanish.' },
        { r: 'Eastern Woodlands', p: 'Iroquois, Algonquian', d: 'Three-Sisters farming plus hunting. Longhouses, and the Iroquois Confederacy — a genuine political federation of five nations.' },
        { r: 'Southeast & Mississippi valley', p: 'Mississippian peoples', d: 'Maize surpluses supported mound-building cities. Cahokia may have held 10,000–20,000 people at its height.' },
      ].map(x => (
        <div key={x.r} className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            <p className="font-bold text-white text-sm">{x.r}</p>
            <p className="text-xs text-emerald-300">{x.p}</p>
          </div>
          <p className="text-sm text-slate-300">{x.d}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
      <p className="font-bold text-amber-300 mb-2">⚠️ Two traps</p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">There was no single "Native American culture."</span> Essays that treat Native peoples as
        one undifferentiated group lose credit. Diversity is the point.
      </p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">Horses are not pre-contact.</span> The mounted Plains buffalo hunter is a post-1600
        development, made possible by animals the Spanish brought. Getting this backwards is a common error.
      </p>
    </div>
  </>
)

export default function Level1() {
  return (
    <LevelShell
      level={1} meta={meta} lesson={lesson} nextLevel={2}
      rounds={[
        done => <CardSort items={SOCIETIES} buckets={REGIONS} level={1} taskPrefix="L1-sort"
          title="Which region?" instruction="Each description belongs to one region. Environment is always the clue." onDone={done} />,
        done => <QuizRound questions={L1_QUIZ} title="Before contact" onDone={done} />,
      ]}
    />
  )
}
