import LevelShell from '../../components/drills/LevelShell'
import Sequence from '../../components/drills/Sequence'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L10_QUIZ } from '../../data/levelQuestions'

const EVENTS = [
  { id: 'r1', year: 1770, label: 'Townshend duties repealed — except the one on tea', why: 'three quiet years follow' },
  { id: 'r2', year: 1772, label: 'Committees of correspondence begin', why: 'the colonies build a network' },
  { id: 'r3', year: 1773, label: 'Tea Act; the Boston Tea Party', why: 'cheap tea, refused on principle' },
  { id: 'r4', year: 1774, label: 'Coercive Acts; the First Continental Congress', why: 'punishment, then a common response' },
  { id: 'r5', year: 1775, label: 'Lexington and Concord', why: 'the argument becomes a war' },
  { id: 'r6', year: 1776, label: 'Common Sense; the Declaration of Independence', why: 'separation becomes obvious' },
]

const ACTORS = [
  { id: 'brit', label: 'British action' },
  { id: 'col', label: 'Colonial response' },
]

const MOVES = [
  { id: 'm1', label: 'Giving the East India Company a monopoly on tea sold in the colonies, tax still attached', correct: 'brit',
    hint: '1773. It made tea cheaper, which is what makes the reaction interesting.',
    why: 'A British action — the Tea Act. Cheap tea still carried the Townshend duty, so buying it conceded Parliament’s right to tax.' },
  { id: 'm2', label: 'Destroying £10,000 of tea in Boston harbour rather than let it be landed', correct: 'col',
    hint: 'December 1773, by men thinly disguised as Mohawks.',
    why: 'A colonial response — the Boston Tea Party. Deliberate destruction of property, which is why Britain felt it had to answer hard.' },
  { id: 'm3', label: 'Closing Boston’s port, rewriting the Massachusetts charter and moving some trials to England', correct: 'brit',
    hint: '1774. Colonists gave these acts a different name.',
    why: 'A British action — the Coercive Acts, which colonists called the Intolerable Acts. Meant to isolate Massachusetts; it united the colonies instead.' },
  { id: 'm4', label: 'Twelve colonies sending delegates to Philadelphia to petition the King and organise a boycott', correct: 'col',
    hint: '1774 — and note what they did NOT do there.',
    why: 'A colonial response — the First Continental Congress. It asserted rights and created the Continental Association, but stopped well short of independence.' },
  { id: 'm5', label: 'Sending troops to seize colonial weapons stored at Concord', correct: 'brit',
    hint: 'April 1775. The march that started the shooting.',
    why: 'A British action. Militia met them at Lexington and harried them all the way back to Boston — the argument was now a war.' },
  { id: 'm6', label: 'Petitioning the King one last time for peace, even after fighting had begun', correct: 'col',
    hint: 'July 1775. It shows how reluctant most colonists still were.',
    why: 'A colonial response — the Olive Branch Petition. The King refused even to receive it and declared the colonies in rebellion, which closed off reconciliation.' },
  { id: 'm7', label: 'Offering freedom to enslaved men held by rebels who would join the royal forces', correct: 'brit',
    hint: 'November 1775, from the royal governor of Virginia.',
    why: 'A British action — Dunmore’s Proclamation. A war measure rather than abolition, but thousands risked everything to reach British lines.' },
  { id: 'm8', label: 'Publishing a plain-language pamphlet attacking monarchy itself and selling it by the hundred thousand',
    correct: 'col', hint: 'January 1776. Written by a recent immigrant from England.',
    why: 'A colonial response — Paine’s Common Sense. It moved the target from Parliament to the King, and made independence thinkable for ordinary readers.' },
]

const meta = {
  title: 'From Protest to Independence',
  era: '1770–1776',
  intro: 'For ten years colonists had argued for their rights inside the empire. In under three years that changed completely — and the turning points are specific, datable, and mostly Britain’s own doing.',
  cta: 'Practice — sequence, sort the moves, then 8 questions',
  praise: 'You can explain why 1776 happened without treating it as inevitable. That is the whole unit.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-rose-600/30 bg-rose-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-rose-300 mb-2">The question this level answers</p>
      <p className="text-white font-semibold mb-2">How did colonists who wanted their rights as Englishmen in 1770 end up declaring independence in 1776?</p>
      <p className="text-sm text-slate-300">
        Because each side’s response to the other closed off the middle. Britain stopped repealing and started punishing;
        colonists built institutions of their own; then the shooting started, the King refused to negotiate, and Paine gave people a
        way to think about separation. Escalation, not destiny.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { h: 'The quiet years, 1770–72', d: 'With the Townshend duties gone except on tea, the quarrel cooled. It did not disappear: Samuel Adams and others set up committees of correspondence from 1772, so that colonies could coordinate quickly. That network is what makes the response to 1774 so fast.' },
        { h: 'Tea Act and Tea Party, 1773', d: 'The act made tea cheaper while keeping the tax and handing the East India Company a monopoly. Buying it meant conceding the principle — and it cut out colonial merchants. In December, men disguised as Mohawks destroyed a shipload in Boston harbour.' },
        { h: 'The Coercive Acts, 1774', d: 'Boston’s port closed until the tea was paid for; the Massachusetts charter rewritten; town meetings restricted; some trials moved to England; troops quartered. Britain meant to isolate one colony. Every other colony saw that its own charter could be rewritten just as easily.' },
        { h: 'First Continental Congress, 1774', d: 'Twelve colonies met in Philadelphia, issued a Declaration and Resolves, petitioned the King and created the Continental Association to enforce a boycott. They still wanted redress inside the empire — remember that when a question asks what they sought.' },
        { h: 'Lexington and Concord, April 1775', d: 'Troops sent to seize colonial arms met militia on the green at Lexington and were harried all the way back to Boston. The Second Continental Congress then created a Continental Army under Washington — while still petitioning for peace.' },
        { h: 'The door closes, 1775', d: 'The King refused the Olive Branch Petition, declared the colonies in rebellion, and the Prohibitory Act cut off their trade. Dunmore offered freedom to enslaved men who would fight for the Crown, which enraged planters. Reconciliation now had no advocate on either side.' },
        { h: 'Common Sense and the Declaration, 1776', d: 'Paine attacked monarchy itself in language anyone could read, and it sold enormously. In July, Congress adopted Jefferson’s Declaration — Lockean natural rights, government by consent, a right of revolution, and a list of grievances aimed at the King rather than Parliament.' },
      ].map(x => (
        <div key={x.h} className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="font-bold text-white text-sm mb-1">{x.h}</p>
          <p className="text-sm text-slate-300">{x.d}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
      <p className="font-bold text-white mb-2">Who was on which side</p>
      <p className="text-sm text-slate-300">
        Loyalists were perhaps 15–20% of colonists, committed Patriots a larger minority, and a great many people tried to stay out
        of it. Most Native nations sided with Britain, which had at least tried to limit settlement. Enslaved people sided with
        whoever offered freedom — thousands with the British after Dunmore. Never write &ldquo;the colonists&rdquo; as though they
        were one group.
      </p>
    </div>

    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
      <p className="font-bold text-amber-300 mb-2">⚠️ Three traps</p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">Independence was not the goal until very late.</span> 1774 is a petition, not a
        declaration. Even after Lexington, Congress asked the King for peace.
      </p>
      <p className="text-sm text-slate-300 mb-2">
        <span className="text-white font-semibold">The Declaration blames the King, not Parliament.</span> By 1776 colonists had
        stopped recognising Parliament’s authority at all, so there was no point addressing it.
      </p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">&ldquo;All men are created equal&rdquo; was written in a society holding
        roughly half a million people in slavery.</span> Note the contradiction — and that enslaved people and women pressed it
        immediately. That earns the complexity point.
      </p>
    </div>
  </>
)

export default function Level10() {
  return (
    <LevelShell
      level={10} meta={meta} lesson={lesson} nextLevel={null}
      rounds={[
        done => <Sequence events={EVENTS} level={10} taskId="L10-seq" title="Six years to independence"
          instruction="Six moments, earliest first. Three years are quiet, then everything happens at once."
          hint="A repeal, a network, a tea ship, a punishment, a battle, a pamphlet." onDone={done} />,
        done => <CardSort items={MOVES} buckets={ACTORS} level={10} taskPrefix="L10-sort"
          title="Britain’s move, or the colonists’?" instruction="Eight moves in the escalation. Each one provoked the next." onDone={done} />,
        done => <QuizRound questions={L10_QUIZ} title="From protest to independence" onDone={done} />,
      ]}
    />
  )
}
