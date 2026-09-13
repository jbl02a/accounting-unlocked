import LevelShell from '../../components/drills/LevelShell'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L7_QUIZ } from '../../data/levelQuestions'

const EFFECTS = [
  { id: 'good', label: 'Worked in the colonies’ favour' },
  { id: 'bad', label: 'Worked against the colonies' },
]

const POLICIES = [
  { id: 'p1', label: 'Colonial-built ships counted as British, so New England could sell into the whole empire', correct: 'good',
    hint: 'The Navigation Acts said "English ships." Who else did that definition cover?',
    why: 'In the colonies’ favour. Colonial yards counted as British, and by the 1770s roughly a third of the empire’s merchant fleet was colonial-built.' },
  { id: 'p2', label: 'The Royal Navy protected colonial shipping from pirates and from rival powers, at British expense',
    correct: 'good', hint: 'Protection is expensive. Who was paying for it before 1763?',
    why: 'In the colonies’ favour — and the reason Parliament later felt entitled to ask the colonies to contribute.' },
  { id: 'p3', label: 'Tobacco, sugar and indigo had to be shipped to Britain first, even when sold on to Europe', correct: 'bad',
    hint: 'An extra stop on the route means an extra hand taking a cut.',
    why: 'Against them. "Enumerated" goods routed through Britain paid British middlemen and freight, lowering what planters received.' },
  { id: 'p4', label: 'Guaranteed British buyers for colonial tobacco, rice and naval stores, with bounties on some goods',
    correct: 'good', hint: 'A protected market is a market nobody can undercut you in.',
    why: 'In the colonies’ favour. Protected demand and bounties on indigo and naval stores made whole colonial industries viable.' },
  { id: 'p5', label: 'The Wool, Hat and Iron Acts restricted colonial manufacturing that competed with British industry',
    correct: 'bad', hint: 'Mercantilism wants the colonies producing raw material, not finished goods.',
    why: 'Against them. Britain wanted the profitable processing step for itself, so colonial manufacturing was deliberately capped.' },
  { id: 'p6', label: 'Loose enforcement meant cheap smuggled molasses from the French West Indies flowed in anyway',
    correct: 'good', hint: 'The law on paper and the law in practice were not the same thing before 1763.',
    why: 'In the colonies’ favour — while it lasted. New England rum distilling ran on smuggled French molasses, which is why the Sugar Act of 1764 hit so hard.' },
  { id: 'p7', label: 'Colonists had no representation in the Parliament that wrote the trade laws', correct: 'bad',
    hint: 'This one costs nothing in money and everything in principle.',
    why: 'Against them — and the seed of "no taxation without representation." It mattered little while the laws went unenforced, and enormously once they did not.' },
  { id: 'p8', label: 'Colonial assemblies kept control of local taxes and the governors’ salaries', correct: 'good',
    hint: 'Who pays the governor has a great deal of say over the governor.',
    why: 'In the colonies’ favour. Assemblies used salary control to bend royal governors — the practical substance of self-government under neglect.' },
]

const meta = {
  title: 'The Atlantic World',
  era: '1650–1754',
  intro: 'Britain had a theory about what colonies were for, and a set of laws to enforce it. For a century it barely enforced them — and that habit of being left alone is what made the 1760s explode.',
  cta: 'Practice — sort the policies, then 6 questions',
  praise: 'You can explain salutary neglect as a cause, not just define it. That is the exam answer.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-cyan-600/30 bg-cyan-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">Say this out loud before the test</p>
      <p className="text-white font-semibold mb-2">Salutary neglect = Britain had the laws, and mostly did not enforce them.</p>
      <p className="text-sm text-slate-300">
        &ldquo;Salutary&rdquo; means beneficial. Beneficial neglect: leaving the colonies to run themselves and to trade (and smuggle)
        more or less freely, because they were prospering and the arrangement paid. It lasts until 1763. Everything that goes wrong
        afterwards goes wrong because colonists had spent a century getting used to it.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { h: 'Mercantilism, in one sentence', d: 'Wealth is finite, so an empire gets rich by exporting more than it imports — and colonies exist to supply cheap raw materials and to buy finished goods back. Every cargo carried in a Dutch ship was treated as wealth leaking out of the empire.' },
        { h: 'The Navigation Acts (from 1651)', d: 'Colonial trade must move in British or colonial ships with mostly British crews; "enumerated" goods — tobacco, sugar, indigo, later rice — must go to Britain first, even if they were headed for Europe. Foreign goods bound for the colonies had to pass through Britain too.' },
        { h: 'What the colonies got out of it', d: 'Guaranteed buyers, bounties on indigo and naval stores, Royal Navy protection paid for in London, and — because colonial ships counted as British — a shipbuilding and carrying trade that made New England merchants rich.' },
        { h: 'What it cost them', d: 'Restricted manufacturing (the Wool, Hat and Iron Acts), compelled middlemen taking a cut, and no representation in the Parliament writing the rules. The point is not which side wins the ledger; it is that you can argue both.' },
        { h: 'The triangular trades', d: 'There was no single triangle. Rum and manufactured goods to West Africa; enslaved people across the Middle Passage to the West Indies and mainland; sugar and molasses north to New England to be distilled into rum. The colonial economy was tied to slavery even where slavery was small.' },
        { h: 'The one rehearsal: the Dominion of New England', d: 'In 1686 James II merged the northern colonies, suspended their assemblies and enforced the trade laws. The Glorious Revolution deposed him in 1688; colonists overthrew Governor Andros and the Dominion collapsed. Britain went back to neglect — an exact preview of 1763–65, eighty years early.' },
      ].map(x => (
        <div key={x.h} className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="font-bold text-white text-sm mb-1">{x.h}</p>
          <p className="text-sm text-slate-300">{x.d}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
      <p className="font-bold text-white mb-2">Why smuggling was normal</p>
      <p className="text-sm text-slate-300">
        French molasses was cheaper than British, customs officers were few and bribable, and colonial juries would not convict their
        neighbours. Britain’s later fix — vice-admiralty courts that sat without juries — is why colonists framed a customs dispute
        as a denial of the right to trial by jury.
      </p>
    </div>

    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
      <p className="font-bold text-amber-300 mb-2">⚠️ The trap</p>
      <p className="text-sm text-slate-300">
        Do not write that mercantilism simply oppressed the colonies. It constrained them and enriched parts of them, and colonists
        largely tolerated it for a century.{' '}
        <span className="text-white font-semibold">What changed in 1763 was enforcement, not the laws.</span> Get that straight and
        the whole imperial crisis makes sense.
      </p>
    </div>
  </>
)

export default function Level7() {
  return (
    <LevelShell
      level={7} meta={meta} lesson={lesson} nextLevel={8}
      rounds={[
        done => <CardSort items={POLICIES} buckets={EFFECTS} level={7} taskPrefix="L7-sort"
          title="Good for the colonies, or bad?" instruction="Eight features of the imperial trade system. Both columns are real — that is the point." onDone={done} />,
        done => <QuizRound questions={L7_QUIZ} title="The Atlantic world" onDone={done} />,
      ]}
    />
  )
}
