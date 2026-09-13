import LevelShell from '../../components/drills/LevelShell'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L6_QUIZ } from '../../data/levelQuestions'

const PLACES = [
  { id: 'mid', label: 'Middle Colonies' },
  { id: 'south', label: 'Lower South' },
]

const TRAITS = [
  { id: 'm1', label: 'Wheat and grain exports so large the region was called the "breadbasket"', correct: 'mid',
    hint: 'Fertile soil and a moderate climate, feeding cities and the West Indies.',
    why: 'The Middle Colonies. Grain went out through Philadelphia and New York, which is why those two became the largest ports in British North America.' },
  { id: 'm2', label: 'Rice and indigo grown on large plantations in coastal lowlands', correct: 'south',
    hint: 'Two crops that need standing water and heat — and enormous, skilled labour.',
    why: 'The Lower South. Rice cultivation drew directly on West African expertise, and enslavers sought captives from rice-growing regions for that reason.' },
  { id: 'm3', label: 'Founded by Quakers on principles of religious toleration and purchasing land from Native peoples', correct: 'mid',
    hint: 'A proprietor who believed in an inner light, pacifism and fair dealing.',
    why: 'Pennsylvania, founded by William Penn in 1681. Its toleration drew Germans and Scots-Irish in numbers, making it the most diverse colony.' },
  { id: 'm4', label: 'Settled largely by English planters migrating from Barbados, who brought a ready-made slave code with them', correct: 'south',
    hint: 'Carolina was not colonised from England so much as from an island that already ran on sugar and slavery.',
    why: 'South Carolina. The Barbadian transplant explains why its slave code was the harshest on the mainland from the very start.' },
  { id: 'm5', label: 'A Black majority in the population by the early 1700s', correct: 'south',
    hint: 'Where rice plantations dominate, who outnumbers whom?',
    why: 'South Carolina, where enslaved people were a majority by about 1708 — a demography with no parallel on the mainland, and the reason for both Stono and the ferocity of the response.' },
  { id: 'm6', label: 'Dutch, German, Swedish, Scots-Irish and English settlers of many faiths living side by side', correct: 'mid',
    hint: 'One region started as somebody else’s colony and then advertised for everyone.',
    why: 'The Middle Colonies. New Netherland was already diverse before England took it in 1664, and Pennsylvania recruited across Europe.' },
  { id: 'm7', label: 'Founded as a buffer against Spanish Florida, originally banning both slavery and rum', correct: 'south',
    hint: 'The last of the thirteen, founded with a social experiment attached.',
    why: 'Georgia, 1732. The bans failed and were lifted by 1751, after which it developed on the South Carolina model.' },
  { id: 'm8', label: 'Great Hudson valley estates rented to tenant farmers alongside many independent smallholders', correct: 'mid',
    hint: 'A Dutch land-grant practice that the English kept after 1664.',
    why: 'New York. The patroon-style manors were inherited from the Dutch and gave the colony an unusual landlord-tenant structure.' },
]

const meta = {
  title: 'Middle Colonies & Lower South',
  era: '1650–1750',
  intro: 'Two regions that fit neither of the patterns you have learned so far: one built on grain, toleration and extraordinary diversity, the other on rice, a Barbadian slave code and a Black majority.',
  cta: 'Practice — sort the regions, then 5 questions',
  praise: 'Four colonial regions, four distinct profiles. You can now compare any two of them.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-lime-600/30 bg-lime-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-lime-300 mb-2">Why this level exists</p>
      <p className="text-white font-semibold mb-2">There are four colonial regions on the exam, not two.</p>
      <p className="text-sm text-slate-300">
        New England and the Chesapeake get all the attention. The Middle Colonies and the Lower South are where the strongest
        comparison answers come from — because they break the pattern the other two set up.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { h: 'The Middle Colonies: grain and toleration', d: 'New York (taken from the Dutch in 1664), Pennsylvania (Penn, 1681), New Jersey and Delaware. Fertile soil made them the "breadbasket"; Philadelphia and New York became the biggest ports in the colonies. Penn’s Quaker toleration and cheap land pulled in Germans and Scots-Irish, giving the region a diversity nowhere else matched.' },
        { h: 'Penn’s experiment and its limits', d: 'Quakers were pacifists who believed in an inner light in every person, paid the Lenape for land, and let a wide range of Christians worship freely. Real toleration — with a stated condition of belief in God, and slavery still legal. Precision earns the point here.' },
        { h: 'The Lower South: Carolina by way of Barbados', d: 'Carolina was settled from 1670 largely by Barbadian planters who imported a working slave system, not just enslaved people. Rice and indigo demanded immense labour; enslaved people were a majority of South Carolina by about 1708.' },
        { h: 'The task system and Gullah culture', d: 'Rice was worked by task rather than by gang: finish your assigned task and the rest of the day is yours. Combined with the Black majority and absentee planters, it left room in which West African languages, foodways and religion survived — the Gullah/Geechee culture of the Sea Islands.' },
        { h: 'Stono, 1739', d: 'The largest slave uprising in the mainland colonies before the Revolution. About sixty people marched toward Spanish Florida, which had promised freedom. It was crushed, and the Negro Act of 1740 restricted movement, assembly, literacy and manumission. Resistance produced repression.' },
        { h: 'Georgia, 1732', d: 'The last of the thirteen: a buffer against Spanish Florida and a project for the deserving poor. Slavery and rum were banned at first; both bans collapsed by 1751 and Georgia followed South Carolina’s model.' },
      ].map(x => (
        <div key={x.h} className="rounded-xl bg-white/5 border border-white/10 p-4">
          <p className="font-bold text-white text-sm mb-1">{x.h}</p>
          <p className="text-sm text-slate-300">{x.d}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
      <p className="font-bold text-white mb-3">The four regions in one table</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs text-left">
          <thead className="text-slate-500 uppercase tracking-wider">
            <tr><th className="pb-2 pr-3">Region</th><th className="pb-2 pr-3">Economy</th><th className="pb-2">Distinctive</th></tr>
          </thead>
          <tbody className="text-slate-300">
            <tr className="border-t border-white/10"><td className="py-2 pr-3 font-semibold text-white">New England</td><td className="py-2 pr-3">Mixed farming, fishing, shipping</td><td className="py-2">Towns, covenant, schools, homogeneity</td></tr>
            <tr className="border-t border-white/10"><td className="py-2 pr-3 font-semibold text-white">Middle</td><td className="py-2 pr-3">Grain and trade</td><td className="py-2">Diversity and toleration; big ports</td></tr>
            <tr className="border-t border-white/10"><td className="py-2 pr-3 font-semibold text-white">Chesapeake</td><td className="py-2 pr-3">Tobacco</td><td className="py-2">Scattered plantations; slavery written into law</td></tr>
            <tr className="border-t border-white/10"><td className="py-2 pr-3 font-semibold text-white">Lower South</td><td className="py-2 pr-3">Rice and indigo</td><td className="py-2">Black majority; harshest codes; task system</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
      <p className="font-bold text-amber-300 mb-2">⚠️ The trap</p>
      <p className="text-sm text-slate-300">
        &ldquo;The North had no slavery.&rdquo; Slavery was legal in every one of the thirteen colonies. The difference was scale and
        role: roughly a tenth of New York City’s population was enslaved, while enslaved people were a majority of South
        Carolina. Write about proportion and function, never presence or absence.
      </p>
    </div>
  </>
)

export default function Level6() {
  return (
    <LevelShell
      level={6} meta={meta} lesson={lesson} nextLevel={null}
      rounds={[
        done => <CardSort items={TRAITS} buckets={PLACES} level={6} taskPrefix="L6-sort"
          title="Middle Colonies or Lower South?" instruction="Eight traits. Ask what the land grew and who was recruited to grow it." onDone={done} />,
        done => <QuizRound questions={L6_QUIZ} title="Middle Colonies and Lower South" onDone={done} />,
      ]}
    />
  )
}
