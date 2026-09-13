import LevelShell from '../../components/drills/LevelShell'
import CardSort from '../../components/drills/CardSort'
import Sequence from '../../components/drills/Sequence'
import QuizRound from '../../components/drills/QuizRound'
import { L2_QUIZ } from '../../data/levelQuestions'

const DIRECTIONS = [
  { id: 'east', label: 'Old World → Americas' },
  { id: 'west', label: 'Americas → Old World' },
]

const GOODS = [
  { id: 'g1', label: 'Smallpox, measles and influenza', correct: 'east',
    hint: 'Which side had lived alongside herd animals for thousands of years, and so carried the diseases that jump from them?',
    why: 'Eurasian crowd diseases travelled west. With no prior exposure, Indigenous populations fell by an estimated 80–90% in many regions — the single largest consequence of contact.' },
  { id: 'g2', label: 'Horses', correct: 'east',
    hint: 'The mounted Plains hunter is a post-contact figure, not a pre-contact one.',
    why: 'The Spanish reintroduced horses. Plains peoples adopted them and rebuilt their societies around mounted buffalo hunting — a Native transformation caused by a European import.' },
  { id: 'g3', label: 'Sugarcane', correct: 'east',
    hint: 'An Old World crop that, once planted in the Caribbean, created an enormous demand for labour.',
    why: 'Sugarcane came from the Old World. Planting it in the Caribbean and Brazil created the plantation labour demand that drove the Atlantic slave trade.' },
  { id: 'g4', label: 'Cattle, pigs and wheat', correct: 'east',
    hint: 'European livestock and the grain Europeans wanted bread from.',
    why: 'Livestock and wheat crossed west. Free-ranging pigs and cattle trampled Native fields, making this an ecological invasion as well as an economic one.' },
  { id: 'g5', label: 'Maize and potatoes', correct: 'west',
    hint: 'Two calorie-dense staples that later fed booming European populations.',
    why: 'Maize and potatoes went east. They raised European and Asian calorie supplies so much that they are credited with a sustained population surge — Old World growth caused by American crops.' },
  { id: 'g6', label: 'Tobacco', correct: 'west',
    hint: 'The cash crop that later made one English colony solvent.',
    why: 'Tobacco went east and became the first profitable export of the Chesapeake — which is why Level 4 opens with it.' },
  { id: 'g7', label: 'Cacao, tomatoes and chili peppers', correct: 'west',
    hint: 'Foods now so associated with Italian, Indian and Swiss cooking that their origin surprises people.',
    why: 'All American in origin. Italian tomato sauce and Indian chili cooking are both post-1492 — a useful reminder that the Exchange reshaped cultures on both sides.' },
  { id: 'g8', label: 'The encomienda system of coerced labour', correct: 'east',
    hint: 'A Spanish institution, carried across and imposed on Native communities.',
    why: 'Encomienda was a Spanish import: colonists were granted the labour of Native people in exchange for a duty to convert them. It is the first Atlantic coerced-labour system.' },
]

const EVENTS = [
  { id: 'e1', year: 1492, label: 'Columbus reaches the Caribbean', why: 'sailing for Spain' },
  { id: 'e2', year: 1494, label: 'Treaty of Tordesillas divides the Atlantic', why: 'Spain and Portugal split the map' },
  { id: 'e3', year: 1521, label: 'Tenochtitlán falls to Cortés and his allies', why: 'disease and Native allies were decisive' },
  { id: 'e4', year: 1542, label: 'Spain issues the New Laws', why: 'curbing encomienda after Las Casas' },
  { id: 'e5', year: 1565, label: 'St. Augustine founded in Florida', why: 'oldest continuous European town in the US' },
  { id: 'e6', year: 1607, label: 'The English found Jamestown', why: 'a century after Spain' },
]

const meta = {
  title: 'Contact & the Columbian Exchange',
  era: '1492–1607',
  intro: 'Two biological worlds that had been separate for ten thousand years collided. Plants, animals, people and diseases crossed in both directions — and the traffic was not remotely equal in its effects.',
  cta: 'Practice — sort, sequence, then 4 questions',
  praise: 'You can run the causal chain from a crop to a labour system. That is the Unit 1 essay.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-sky-600/30 bg-sky-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">The one-sentence version</p>
      <p className="text-white font-semibold mb-2">The Columbian Exchange was a two-way biological transfer with wildly one-sided consequences.</p>
      <p className="text-sm text-slate-300">
        Europe gained calories and wealth. The Americas lost, by most estimates, 80–90% of their population to disease within a
        century. Africa lost millions of people to a slave trade the Exchange helped create. Same event, three different outcomes —
        say that and you are writing at AP level.
      </p>
    </div>

    <div className="grid sm:grid-cols-2 gap-3 mb-6">
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <p className="font-bold text-white text-sm mb-2">Old World → Americas</p>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>Smallpox, measles, influenza <span className="text-red-300">(the big one)</span></li>
          <li>Horses, cattle, pigs, sheep</li>
          <li>Wheat, rice, sugarcane, coffee</li>
          <li>Guns, Christianity, encomienda</li>
        </ul>
      </div>
      <div className="rounded-xl bg-white/5 border border-white/10 p-4">
        <p className="font-bold text-white text-sm mb-2">Americas → Old World</p>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>Maize and potatoes <span className="text-emerald-300">(population boom)</span></li>
          <li>Tomatoes, cacao, chili, vanilla</li>
          <li>Tobacco</li>
          <li>Silver — enormous quantities of it</li>
        </ul>
      </div>
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
      <p className="font-bold text-white mb-2">The chain you should be able to recite</p>
      <p className="text-sm text-slate-300">
        Sugar arrives in the Caribbean → sugar needs huge labour → disease has destroyed the Native labour force → Europeans turn to
        enslaved Africans → the Atlantic slave trade scales up. Four arrows. Nearly every Unit 1 causation question is somewhere on
        that line.
      </p>
    </div>

    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
      <p className="font-bold text-amber-300 mb-2">⚠️ Three traps</p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">Direction matters.</span> Horses and sugar went west; potatoes and tobacco went
        east. Reversing them is the most common factual error on this topic.
      </p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">Disease was not a weapon of war here.</span> It was mostly unintentional — which
        does not make it less consequential, and does not excuse what followed.
      </p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">Native peoples were not passive.</span> Catastrophe and agency coexist.
      </p>
    </div>
  </>
)

export default function Level2() {
  return (
    <LevelShell
      level={2} meta={meta} lesson={lesson} nextLevel={3}
      rounds={[
        done => <CardSort items={GOODS} buckets={DIRECTIONS} level={2} taskPrefix="L2-sort"
          title="Which way did it cross?" instruction="Eight things crossed the Atlantic. Say which direction each one went." onDone={done} />,
        done => <Sequence events={EVENTS} level={2} taskId="L2-seq" title="Put contact in order"
          instruction="Six events, earliest first. Notice how late the English arrive."
          hint="Spain had a century-long head start. Anything Spanish almost certainly comes before anything English." onDone={done} />,
        done => <QuizRound questions={L2_QUIZ} title="Contact and exchange" onDone={done} />,
      ]}
    />
  )
}
