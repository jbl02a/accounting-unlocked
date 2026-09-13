import LevelShell from '../../components/drills/LevelShell'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L5_QUIZ } from '../../data/levelQuestions'

const REGIONS = [
  { id: 'ne', label: 'New England' },
  { id: 'ch', label: 'Chesapeake' },
]

const TRAITS = [
  { id: 't1', label: 'Migrants arrived as whole families, including women and children, in a single great wave', correct: 'ne',
    hint: 'Who brings children along — someone chasing a cash crop, or someone building a community to last?',
    why: 'New England. The Great Migration of the 1630s brought families, which produced stable towns and rapid natural population growth.' },
  { id: 't2', label: 'Migrants were overwhelmingly young single men bound to terms of service', correct: 'ch',
    hint: 'A labour force, not a congregation.',
    why: 'The Chesapeake. Indentured servants came to work tobacco, and the sex ratio stayed badly skewed for decades.' },
  { id: 't3', label: 'Settlement in compact towns organised around a meetinghouse and a common', correct: 'ne',
    hint: 'Where worship is communal and land is granted to congregations, how does settlement look on a map?',
    why: 'New England. Land was granted to town congregations, so people settled together — which is what made the town meeting possible.' },
  { id: 't4', label: 'Settlement scattered along rivers on separate plantations, with almost no towns', correct: 'ch',
    hint: 'A soil-exhausting crop and river transport pull people apart, not together.',
    why: 'The Chesapeake. Plantations shipped tobacco straight from their own wharves, so towns barely developed.' },
  { id: 't5', label: 'A cold climate and clean water produced long life expectancy and large families', correct: 'ne',
    hint: 'Which environment was, by accident, the healthier one?',
    why: 'New England. Long lives and many children meant grandparents existed — a genuinely unusual thing in the 17th-century colonies.' },
  { id: 't6', label: 'A malarial environment produced staggering early mortality and fragile families', correct: 'ch',
    hint: 'Warm, swampy, and lethal to newcomers.',
    why: 'The Chesapeake. A majority of early servants died before completing their terms, and orphanhood was common.' },
  { id: 't7', label: 'A diversified economy of farming, fishing, shipbuilding and Atlantic trade', correct: 'ne',
    hint: 'Rocky soil forces a colony to earn a living some other way.',
    why: 'New England. Thin soil pushed the region toward the sea and toward trade — the basis of its later merchant wealth.' },
  { id: 't8', label: 'An economy dominated by a single export staple grown for European markets', correct: 'ch',
    hint: 'One crop, and everything else arranged around it.',
    why: 'The Chesapeake. Tobacco dominated so completely that it was used as currency.' },
]

const meta = {
  title: 'New England',
  era: '1620–1700',
  intro: 'People came here to build a community, not a business — and almost everything distinctive about New England, from the town meeting to the schoolhouse to the banishment of dissenters, follows from that.',
  cta: 'Practice — sort the two regions, then 5 questions',
  praise: 'You can contrast the regions by motive and demography. That is the essay.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-indigo-600/30 bg-indigo-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 mb-2">The contrast that earns points</p>
      <p className="text-white font-semibold mb-2">The Chesapeake was founded to make money. New England was founded to build a godly community.</p>
      <p className="text-sm text-slate-300">
        Different motive → different migrants (families, not servants) → different demography (long lives, real towns) → different
        institutions (congregations, town meetings, schools). Run that chain and you have a comparison essay.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { h: 'Pilgrims vs Puritans', d: 'Pilgrims (Plymouth, 1620) were Separatists who left the Church of England outright. Puritans (Massachusetts Bay, 1630) meant to purify it from within — Winthrop’s "city upon a hill" was a model England was supposed to copy. Both Calvinist; the difference is separation.' },
        { h: 'Covenant, all the way down', d: 'A congregation covenants with God; a town covenants to govern itself. The town meeting is that theology turned into a political institution — and it is the direct ancestor of a lot of American local government.' },
        { h: 'Literacy by necessity', d: 'If you must read Scripture yourself, everyone must read. Harvard was founded in 1636 and a 1647 law required towns of fifty families to hire a teacher. New England was the most literate society in the English-speaking world.' },
        { h: 'Dissent was not tolerated', d: 'Roger Williams argued for separation of church and state and for buying Native land, and was banished — he founded Providence. Anne Hutchinson was tried and banished for teaching in her home. Rhode Island exists because Massachusetts expelled people.' },
        { h: 'Strain by mid-century', d: 'Fewer members could testify to a conversion experience, so the Halfway Covenant (1662) let their children be baptised — evidence of declining religious intensity. The Salem witch trials of 1692 came out of a community under social and economic strain.' },
        { h: 'War over land', d: 'The Pequot War (1637) and King Philip’s War (1675–76) followed expanding towns pressing on Native land. The second was proportionally among the deadliest wars in American history and ended Native power in southern New England.' },
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
        <span className="text-white font-semibold">Puritans did not come for religious freedom in general.</span> They came for
        freedom to practise their own religion, and they banished people who disagreed. Write &ldquo;freedom for themselves&rdquo;.
      </p>
      <p className="text-sm text-slate-300">
        <span className="text-white font-semibold">The town meeting is not democracy.</span> Church membership and property
        restricted who could vote. Call it self-government with a narrow franchise.
      </p>
    </div>
  </>
)

export default function Level5() {
  return (
    <LevelShell
      level={5} meta={meta} lesson={lesson} nextLevel={6}
      rounds={[
        done => <CardSort items={TRAITS} buckets={REGIONS} level={5} taskPrefix="L5-sort"
          title="New England or Chesapeake?" instruction="Eight traits, two regions. Ask why people came — the rest follows." onDone={done} />,
        done => <QuizRound questions={L5_QUIZ} title="New England" onDone={done} />,
      ]}
    />
  )
}
