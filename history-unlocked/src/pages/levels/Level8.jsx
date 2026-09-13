import LevelShell from '../../components/drills/LevelShell'
import Sequence from '../../components/drills/Sequence'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L8_QUIZ } from '../../data/levelQuestions'

const EVENTS = [
  { id: 'w1', year: 1754, label: 'Washington is defeated at Fort Necessity', why: 'a Virginian skirmish starts a world war' },
  { id: 'w2', year: 1755, label: 'Braddock’s army is destroyed near Fort Duquesne', why: 'British regulars, European tactics, disaster' },
  { id: 'w3', year: 1757, label: 'William Pitt takes charge of the war', why: 'British money and troops pour in' },
  { id: 'w4', year: 1759, label: 'Quebec falls', why: 'the turning point in North America' },
  { id: 'w5', year: 1763, label: 'Treaty of Paris ends the war', why: 'France leaves the mainland' },
  { id: 'w6', year: 1765, label: 'The Stamp Act', why: 'the bill arrives' },
]

const SIDES = [
  { id: 'cause', label: 'Cause of the war' },
  { id: 'result', label: 'Result of the war' },
]

const ITEMS = [
  { id: 'i1', label: 'British colonists and French traders both claimed the Ohio River valley', correct: 'cause',
    hint: 'Where do the two empires physically meet?',
    why: 'A cause. Virginia land speculators wanted the valley; France was building forts to link Canada with Louisiana.' },
  { id: 'i2', label: 'Britain’s national debt roughly doubled', correct: 'result',
    hint: 'Winning a global war is not free. Who ends up being asked to help pay?',
    why: 'A result — and the most consequential one. The debt is the direct road to the Sugar Act, the Stamp Act and the end of salutary neglect.' },
  { id: 'i3', label: 'Most Native nations allied with France, whose traders wanted pelts rather than farmland', correct: 'cause',
    hint: 'Which empire’s victory would cost them their land?',
    why: 'A cause of how the war was fought and who fought it. Fur traders are neighbours; farm families are a front line.' },
  { id: 'i4', label: 'France surrendered Canada and everything east of the Mississippi', correct: 'result',
    hint: 'The peace terms of 1763.',
    why: 'A result. France kept its Caribbean sugar islands, which it valued more — but its mainland empire was finished.' },
  { id: 'i5', label: 'The Proclamation of 1763 closed land west of the Appalachians to settlement', correct: 'result',
    hint: 'Issued after the fighting, in response to Pontiac’s uprising.',
    why: 'A result. Colonists thought they had fought for that land; Britain wanted to avoid another expensive Native war. Most settlers ignored the line.' },
  { id: 'i6', label: 'Colonial assemblies refused the Albany Plan of Union rather than give up any of their own authority',
    correct: 'cause', hint: '1754 — the same year the fighting began. A refusal, not a consequence.',
    why: 'A cause, or at least part of the war’s opening context: it shows how separate the colonies still were when the war started.' },
  { id: 'i7', label: 'Colonists gained military confidence while British officers came away scornful of colonial troops',
    correct: 'result', hint: 'Two impressions formed during the fighting, pointing in opposite directions.',
    why: 'A result. Mutual contempt, plus the debt, plus a removed French threat, is what makes 1765 explosive.' },
  { id: 'i8', label: 'With France gone, the colonies no longer needed British troops for protection', correct: 'result',
    hint: 'What happens to a protector’s leverage when the threat disappears?',
    why: 'A result, and the quiet one that matters most. Britain thought victory bought it authority; it had actually removed the main reason colonists needed Britain.' },
]

const meta = {
  title: 'The French & Indian War',
  era: '1754–1763',
  intro: 'Britain won the war and lost the empire. The Seven Years’ War removed France from North America, doubled Britain’s debt, and ended the century of salutary neglect — which is why it is the hinge the whole Revolution turns on.',
  cta: 'Practice — sequence, sort, then 8 questions',
  praise: 'You can explain why winning a war cost Britain its colonies. That is the whole Period 3 opener.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-red-600/30 bg-red-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-red-300 mb-2">The sentence to write in an essay</p>
      <p className="text-white font-semibold mb-2">Britain won the war, and the victory is what broke the relationship.</p>
      <p className="text-sm text-slate-300">
        Three consequences do the work: an enormous <span className="text-white font-semibold">debt</span> (so Parliament starts
        taxing), the removal of the <span className="text-white font-semibold">French threat</span> (so the colonies stop needing
        protection), and the end of <span className="text-white font-semibold">salutary neglect</span> (so laws that had been
        ignored start being enforced). Debt, threat, enforcement.
      </p>
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
      <p className="font-bold text-white mb-2">The names, sorted out</p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">French and Indian War</span> is the American name for the North American
        fighting, 1754–63 — and it means the war against the French <em>and</em> their Native allies, not a war between the French
        and the Indians.
      </p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">The Seven Years’ War</span> is the same conflict seen globally, 1756–63, fought
        in Europe, India, West Africa and the Caribbean too. Same war, wider frame — and it started in the Ohio valley, which is
        genuinely remarkable.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { h: 'Why it started: the Ohio valley', d: 'Virginia speculators wanted the land; France was building forts to connect Canada to Louisiana; the Native nations living there wanted to keep both out. A 22-year-old George Washington was sent to warn the French off, and in 1754 surrendered at Fort Necessity. That skirmish became a world war.' },
        { h: 'The Albany Plan, 1754', d: 'Franklin proposed a joint council for defence and Indian relations — and every colonial assembly refused to give up any authority. Remember the rejection: it is the baseline that makes colonial cooperation ten years later look so different.' },
        { h: 'Native nations chose by interest', d: 'Most allied with France, whose traders wanted furs rather than farms; the Iroquois Confederacy mostly leaned British or stayed neutral. They were acting on their own strategy, not being used — and with France gone in 1763, the balance they had played between two empires disappeared.' },
        { h: 'Britain wins, expensively', d: 'Early disasters (Braddock, 1755) gave way to victory once William Pitt poured in money and troops from 1757. Quebec fell in 1759. The Treaty of Paris in 1763 gave Britain Canada and everything east of the Mississippi; Spain ceded Florida and took Louisiana; France kept its sugar islands.' },
        { h: 'Pontiac’s War and the Proclamation Line, 1763', d: 'With French gift-giving diplomacy gone and settlers pushing west, a coalition under Pontiac took most British posts beyond the Appalachians. Britain answered with the Proclamation of 1763, forbidding settlement west of the mountains — sensible in London, an insult in Virginia, and widely ignored.' },
        { h: 'The bill', d: 'The debt roughly doubled, and garrisoning North America cost more. Parliament concluded the colonies should contribute: Sugar Act 1764, Stamp Act 1765, and customs enforcement that actually bit. To colonists, this was not a new bill — it was an attack on rights a century of neglect had taught them they already had.' },
      ].map(x => (
        <div key={x.h} className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="font-bold text-white text-sm mb-1">{x.h}</p>
          <p className="text-sm text-slate-300">{x.d}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
      <p className="font-bold text-amber-300 mb-2">⚠️ Three traps</p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">The war did not cause the Revolution by itself.</span> It created the debt and
        removed the threat; the decisions Parliament then made are what turned that into a crisis. Write the chain, not a leap.
      </p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">The taxes were not unusually heavy.</span> Colonists paid far less tax than
        Britons did. The objection was to being taxed by a Parliament they had not elected — principle, not amount.
      </p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">Native nations were not bystanders.</span> They fought for their own interests
        throughout, and 1763 was a catastrophe for them precisely because it left only one empire to bargain with.
      </p>
    </div>
  </>
)

export default function Level8() {
  return (
    <LevelShell
      level={8} meta={meta} lesson={lesson} nextLevel={null}
      rounds={[
        done => <Sequence events={EVENTS} level={8} taskId="L8-seq" title="From a frontier skirmish to the Stamp Act"
          instruction="Six moments, earliest first. Notice how short the gap is between winning the war and taxing the colonies."
          hint="Fighting starts badly, Pitt turns it around, the peace is signed — and then the bill arrives." onDone={done} />,
        done => <CardSort items={ITEMS} buckets={SIDES} level={8} taskPrefix="L8-sort"
          title="Cause of the war, or result?" instruction="Eight statements. Anything dated 1763 or later is almost certainly a result — but read each one." onDone={done} />,
        done => <QuizRound questions={L8_QUIZ} title="The French & Indian War" onDone={done} />,
      ]}
    />
  )
}
