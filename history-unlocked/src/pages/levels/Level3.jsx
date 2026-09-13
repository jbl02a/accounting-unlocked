import LevelShell from '../../components/drills/LevelShell'
import CardSort from '../../components/drills/CardSort'
import QuizRound from '../../components/drills/QuizRound'
import { L3_QUIZ } from '../../data/levelQuestions'

const EMPIRES = [
  { id: 'sp', label: 'Spain' },
  { id: 'fr', label: 'France' },
  { id: 'en', label: 'England' },
]

const FEATURES = [
  { id: 'f1', label: 'Encomienda: colonists granted the labour of Native villages in exchange for a duty to convert them', correct: 'sp',
    hint: 'Which empire arrived first, conquered dense populated empires, and needed labour immediately?',
    why: 'Encomienda is Spanish. It fused extraction with the stated religious mission, and Las Casas attacked it from inside the Church.' },
  { id: 'f2', label: 'A fur trade built on alliance and intermarriage with Native nations, with very few European settlers', correct: 'fr',
    hint: 'Which empire wanted a commodity that only Native hunters could supply in quantity?',
    why: 'France. Beaver pelts required Native trappers and Native goodwill, so the French sent traders and missionaries rather than farm families — and generally coexisted.' },
  { id: 'f3', label: 'Large-scale migration of whole families intending to farm the land permanently', correct: 'en',
    hint: 'Which empire sent women and children in numbers, and wanted land rather than labour or pelts?',
    why: 'England. Family migration meant England wanted the land itself — which made displacement of Native peoples structural rather than incidental.' },
  { id: 'f4', label: 'A formal caste hierarchy ranking people by ancestry, with terms such as mestizo and mulatto', correct: 'sp',
    hint: 'Which empire produced a large mixed population and then built an official ranking for it?',
    why: 'Spain’s casta system. Large-scale intermarriage produced a mixed population, which the Crown then sorted into a legal hierarchy — peninsulares at the top.' },
  { id: 'f5', label: 'Military alliance with the Huron and Algonquian against the Iroquois Confederacy', correct: 'fr',
    hint: 'Trade partners became military partners — and inherited their partners’ enemies.',
    why: 'France. Allying with the Huron made the Iroquois enemies of New France, which shaped a century of imperial warfare.' },
  { id: 'f6', label: 'Colonies chartered to joint-stock companies and proprietors rather than run directly by the Crown', correct: 'en',
    hint: 'Which colonies were founded by investors chasing a return, not by a royal governor?',
    why: 'England. Private funding meant looser royal control from the start — which is one root of colonial self-government.' },
  { id: 'f7', label: 'The Requerimiento, read aloud to Native peoples demanding submission to Crown and Church', correct: 'sp',
    hint: 'A legal document meant to make conquest lawful — often read in a language nobody present spoke.',
    why: 'Spain. It shows an empire that cared about legal and religious justification even while conquering — the debate at Valladolid comes out of the same impulse.' },
  { id: 'f8', label: 'Representative assemblies such as the House of Burgesses appearing within a decade of founding', correct: 'en',
    hint: 'Which empire’s colonies were making their own local law by 1619?',
    why: 'England. Neither New Spain nor New France developed elected colonial assemblies — this difference compounds all the way to 1776.' },
]

const meta = {
  title: 'Three Empires',
  era: '1500s–1600s',
  intro: 'Spain, France and England all crossed the Atlantic, and all three claimed God, gold and glory. What they actually built looked nothing alike — and the difference comes down to what each one wanted from the land.',
  cta: 'Practice — sort by empire, then 4 questions',
  praise: 'You can explain the differences by interest rather than by character. That is the comparison point.',
}

const lesson = (
  <>
    <div className="rounded-2xl border border-violet-600/30 bg-violet-600/10 p-5 mb-6">
      <p className="text-xs font-bold uppercase tracking-wider text-violet-300 mb-2">The question that unlocks this level</p>
      <p className="text-white font-semibold mb-2">What did each empire want out of North America?</p>
      <p className="text-sm text-slate-300">
        Spain wanted labour and silver. France wanted furs. England wanted land. Almost every difference in how they treated Native
        peoples, who they sent, and how their colonies were governed follows from that one answer.
      </p>
    </div>

    <div className="space-y-3 mb-6">
      {[
        { e: 'Spain', want: 'Silver, souls, labour', color: 'text-amber-300', d: 'Conquered dense empires, extracted silver, imposed encomienda, built missions, and produced a large mixed population sorted by the casta system. Governed directly by Crown officials.' },
        { e: 'France', want: 'Furs', color: 'text-sky-300', d: 'Few settlers, mostly male traders and Jesuits. Allied and intermarried with the Huron and Algonquian, inherited the Iroquois as enemies. Relatively little land taken, relatively little conflict.' },
        { e: 'England', want: 'Land', color: 'text-emerald-300', d: 'Whole families migrated to farm permanently. Chartered companies and proprietors, not the Crown, ran the colonies — so elected assemblies appeared early. Wanting the land made displacement structural.' },
      ].map(x => (
        <div key={x.e} className="rounded-xl bg-white/5 border border-white/10 p-4">
          <div className="flex items-baseline gap-2 flex-wrap mb-1">
            <p className="font-bold text-white text-sm">{x.e}</p>
            <p className={`text-xs ${x.color}`}>wanted: {x.want}</p>
          </div>
          <p className="text-sm text-slate-300">{x.d}</p>
        </div>
      ))}
    </div>

    <div className="rounded-xl bg-white/5 border border-white/10 p-5 mb-6">
      <p className="font-bold text-white mb-2">Don&rsquo;t forget the Dutch</p>
      <p className="text-sm text-slate-300">
        New Netherland (Manhattan, the Hudson) was a trading colony like New France — commercial, diverse, tolerant, thinly settled.
        England took it in 1664 and renamed it New York, which is why the Middle Colonies start out unusually diverse. You will meet
        that again in Level 6.
      </p>
    </div>

    <div className="rounded-xl bg-amber-500/10 border border-amber-500/30 p-5 mb-8">
      <p className="font-bold text-amber-300 mb-2">⚠️ The trap</p>
      <p className="text-sm text-slate-300">
        &ldquo;The French were nicer to Native peoples.&rdquo; Written that way it earns nothing. Written as{' '}
        <span className="text-white font-semibold">&ldquo;French economic interests required Native alliance, while English land
        hunger required Native displacement&rdquo;</span> it earns the point. Always explain difference by interest, not by character.
      </p>
    </div>
  </>
)

export default function Level3() {
  return (
    <LevelShell
      level={3} meta={meta} lesson={lesson} nextLevel={4}
      rounds={[
        done => <CardSort items={FEATURES} buckets={EMPIRES} level={3} taskPrefix="L3-sort"
          title="Whose colony is this?" instruction="Eight features, three empires. Ask what each empire wanted out of the land." onDone={done} />,
        done => <QuizRound questions={L3_QUIZ} title="Three empires" onDone={done} />,
      ]}
    />
  )
}
