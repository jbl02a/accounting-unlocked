import LevelShell from '../../components/drills/LevelShell'
import Sequence from '../../components/drills/Sequence'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L9_QUIZ } from '../../data/levelQuestions'

const EVENTS = [
  { id: 't1', year: 1764, label: 'Sugar Act', why: 'a duty on molasses, enforced for the first time' },
  { id: 't2', year: 1765, label: 'Stamp Act; the Stamp Act Congress meets', why: 'a direct tax — and nine colonies answer together' },
  { id: 't3', year: 1766, label: 'Stamp Act repealed; Declaratory Act passed', why: 'the tax goes, the claim of authority stays' },
  { id: 't4', year: 1767, label: 'Townshend Acts', why: 'duties on glass, paint, paper and tea' },
  { id: 't5', year: 1768, label: 'British troops occupy Boston', why: 'a standing army in a peaceful city' },
  { id: 't6', year: 1770, label: 'Boston Massacre', why: 'five dead, and a print that travelled everywhere' },
]

const SIDES = [
  { id: 'brit', label: 'Britain’s argument' },
  { id: 'col', label: 'The colonists’ argument' },
]

const CLAIMS = [
  { id: 'a1', label: 'Parliament represents the interests of every British subject, whether or not they voted for it', correct: 'brit',
    hint: 'Manchester and Birmingham elected nobody either. How did London explain that?',
    why: 'Britain’s doctrine of virtual representation. Colonists rejected it flatly: representation meant someone you chose and could vote out.' },
  { id: 'a2', label: 'No tax may be imposed except by representatives the taxed have actually elected', correct: 'col',
    hint: 'This is the sentence the whole decade turns on.',
    why: 'The colonial case, stated at the Stamp Act Congress in 1765 — and the origin of "no taxation without representation."' },
  { id: 'a3', label: 'The colonies were defended at enormous expense and should contribute to the cost', correct: 'brit',
    hint: 'Look back at Level 8 and the debt.',
    why: 'Britain’s case, and a reasonable one: the war had been fought largely in America and the debt had roughly doubled.' },
  { id: 'a4', label: 'Colonial assemblies, not Parliament, have taxed the colonies for more than a century', correct: 'col',
    hint: 'Precedent. What had actually happened during salutary neglect?',
    why: 'The colonial appeal to custom — a century of self-taxation under neglect had become, in colonial eyes, a constitutional right.' },
  { id: 'a5', label: 'Parliament is sovereign and may legislate for the colonies “in all cases whatsoever”', correct: 'brit',
    hint: 'These exact words were written into an act of 1766.',
    why: 'The Declaratory Act. Britain gave up the Stamp Act while conceding nothing at all on the principle.' },
  { id: 'a6', label: 'Trying smugglers in vice-admiralty courts without juries denies the rights of Englishmen', correct: 'col',
    hint: 'Britain’s fix for juries that would not convict. What did colonists say it cost them?',
    why: 'A colonial objection — and proof that the quarrel was never only about money. Trial by jury was a right they claimed as Englishmen.' },
  { id: 'a7', label: 'Colonists pay a small fraction of the taxes borne by subjects living in Britain', correct: 'brit',
    hint: 'This one is simply true. It also entirely misses the colonial point.',
    why: 'Britain’s argument, and factually correct — which is why you must answer it with principle, not arithmetic.' },
  { id: 'a8', label: 'Keeping a standing army among us in peacetime is a threat to liberty', correct: 'col',
    hint: 'After 1768 there were regulars in Boston. What did colonists conclude they were for?',
    why: 'A colonial objection with deep roots in English political thought — and it turned Boston into the place where soldiers and civilians collided in 1770.' },
]

const meta = {
  title: 'No Taxation Without Representation',
  era: '1763–1770',
  intro: 'After 1763 Britain finally started enforcing and taxing. Colonists did not object because the taxes were heavy — they were not. They objected because a Parliament they had not elected was doing the taxing.',
  cta: 'Practice — sequence, sort the arguments, then 7 questions',
  praise: 'You can argue both sides of the constitutional case. That is what separates a top essay here.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-sky-600/30 bg-sky-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-sky-300 mb-2">What the next twelve years actually were</p>
      <p className="text-white font-semibold mb-2">One long argument about who had the right to tax and govern the colonies.</p>
      <p className="text-sm text-slate-300">
        Not a slow march to independence — almost nobody wanted that before 1775. It was a constitutional quarrel: Britain insisting
        Parliament could bind the colonies in everything, colonists insisting they could only be taxed by their own assemblies. The
        argument escalated because neither side could concede the principle.
      </p>
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
      <p className="font-bold text-white mb-2">The pattern, run twice</p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">Britain taxes → colonists petition → colonists boycott → British merchants
        complain → Parliament repeals, conceding nothing.</span> Stamp Act, then Townshend duties. Each cycle left the principle
        unsettled and both sides angrier — until 1773, when Britain stopped repealing.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { h: 'Sugar Act, 1764', d: 'A duty on molasses — actually lower than the old one, but enforced for the first time, with smuggling cases tried in vice-admiralty courts without juries. The enforcement was the shock, not the rate.' },
        { h: 'Stamp Act, 1765', d: 'A direct tax on paper: newspapers, deeds, licences, playing cards. It touched everyone and fell hardest on printers and lawyers — the people best able to organise and publicise a protest. Nine colonies sent delegates to the Stamp Act Congress; the Sons of Liberty made the law unenforceable.' },
        { h: 'Repeal and the Declaratory Act, 1766', d: 'Parliament repealed the Stamp Act under pressure from British merchants — and the same day declared it could bind the colonies "in all cases whatsoever." Colonists celebrated the repeal and largely ignored the claim. Nothing had been settled.' },
        { h: 'Townshend Acts, 1767', d: 'Duties on glass, lead, paint, paper and tea, plus writs of assistance letting officers search where they liked. Dickinson’s Letters from a Farmer argued that a tax meant to raise revenue was unconstitutional whether it was called internal or external. Non-importation resumed, with women’s households at the centre of it.' },
        { h: 'Troops in Boston, 1768', d: 'Regulars were sent to a city at peace. Soldiers took local jobs in their off-hours, which made things worse. Two years of friction end in King Street.' },
        { h: 'Boston Massacre, 1770', d: 'A jeering crowd, snowballs and debris, then shots: five dead, including Crispus Attucks. John Adams defended the soldiers and most were acquitted — while Revere’s engraving turned the night into a massacre of the defenceless. The same year, all Townshend duties were repealed except the one on tea.' },
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
        <span className="text-white font-semibold">Not about the amount.</span> Colonists paid a fraction of what Britons paid, and
        they knew it. Any answer resting on &ldquo;the taxes were too high&rdquo; is wrong.
      </p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">They did not want seats in Parliament.</span> Offered representation, most
        colonists would have refused it — they wanted their own assemblies recognised as the only bodies that could tax them.
      </p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">Nobody is aiming at independence yet.</span> In 1765 and 1770 colonists are
        claiming the rights of Englishmen <em>inside</em> the empire. Writing 1776 backwards into this decade loses the whole story.
      </p>
    </div>
  </>
)

export default function Level9() {
  return (
    <LevelShell
      level={9} meta={meta} lesson={lesson} nextLevel={10}
      rounds={[
        done => <Sequence events={EVENTS} level={9} taskId="L9-seq" title="Tax, protest, repeal — twice"
          instruction="Six moments, earliest first. Watch the same cycle run through twice."
          hint="A duty, then a direct tax, then a repeal that concedes nothing, then new duties, then soldiers, then blood." onDone={done} />,
        done => <CardSort items={CLAIMS} buckets={SIDES} level={9} taskPrefix="L9-sort"
          title="Whose argument is this?" instruction="Eight claims from the 1760s. Both sides were making serious constitutional arguments — sort them." onDone={done} />,
        done => <QuizRound questions={L9_QUIZ} title="No taxation without representation" onDone={done} />,
      ]}
    />
  )
}
