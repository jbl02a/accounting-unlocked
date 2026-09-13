// An ink-friendly one-pager for the colonial test: Periods 1 and 2 only, sized
// to print on two sides of paper. The dark app chrome drops away when printing.
const REGIONS = [
  ['New England', 'Religion — a godly community', 'Families, whole towns', 'Mixed farming, fishing, shipbuilding, trade', 'Town meeting, schools, covenant; dissenters banished'],
  ['Middle', 'Land, trade, toleration', 'Very mixed: Dutch, German, Scots-Irish, English', 'Wheat and grain — the "breadbasket"', 'Most diverse and most tolerant; biggest ports'],
  ['Chesapeake', 'Profit — a company venture', 'Young single men as indentured servants', 'Tobacco', 'Scattered plantations; slavery hardened into law'],
  ['Lower South', 'Profit, by way of Barbados', 'Planters from Barbados; enslaved Africans', 'Rice and indigo', 'Black majority by ~1708; harshest slave codes'],
]

const EMPIRES = [
  ['Spain', 'Silver, souls, labour', 'Encomienda, missions, casta system; direct Crown rule', 'Conquest of dense empires; large mixed population'],
  ['France', 'Furs', 'Few settlers, mostly male; Jesuit missions', 'Alliance and intermarriage with Huron/Algonquian'],
  ['England', 'Land', 'Chartered companies and proprietors; elected assemblies early', 'Family migration → displacement of Native peoples'],
  ['Netherlands', 'Trade', 'New Netherland: commercial, diverse, thinly settled', 'Taken by England in 1664 → New York'],
]

const DATES = [
  ['1491', 'Diverse Native societies shaped by environment — Pueblo, Chinook, Plains, Iroquois, Mississippian (Cahokia)'],
  ['1492', 'Columbus reaches the Caribbean — the Columbian Exchange begins'],
  ['1494', 'Treaty of Tordesillas — Spain and Portugal divide a hemisphere neither had explored'],
  ['1521', 'Tenochtitlán falls — disease and Native allies were decisive'],
  ['1542', 'New Laws curb encomienda, after Las Casas'],
  ['1565', 'St. Augustine founded — oldest continuous European town in the US'],
  ['1607', 'Jamestown — a business venture, and it nearly failed'],
  ['1612', 'Rolfe plants tobacco — the Chesapeake finally has an export'],
  ['1619', 'House of Burgesses meets AND first Africans landed at Point Comfort — the same year'],
  ['1620', 'Plymouth; Mayflower Compact — government by mutual consent'],
  ['1630', 'Massachusetts Bay; Winthrop’s "city upon a hill"; the Great Migration'],
  ['1636', 'Roger Williams banished → Providence. Harvard founded'],
  ['1637', 'Pequot War. Anne Hutchinson tried and banished'],
  ['1662', 'Virginia: slave status follows the mother — slavery becomes hereditary. Halfway Covenant in New England'],
  ['1664', 'England takes New Netherland → New York'],
  ['1670', 'Carolina settled, largely from Barbados'],
  ['1675–76', 'King Philip’s War — proportionally among the deadliest in American history'],
  ['1676', 'Bacon’s Rebellion — and the turn toward enslaved labour'],
  ['1681', 'Pennsylvania chartered to William Penn'],
  ['1688', 'Glorious Revolution in England → colonial uprisings; Dominion of New England collapses'],
  ['1692', 'Salem witch trials'],
  ['1705', 'Virginia Slave Codes complete the legal structure'],
  ['1730s–40s', 'First Great Awakening — Edwards, Whitefield; New Lights vs Old Lights'],
  ['1732', 'Georgia chartered — buffer against Spanish Florida; slavery banned at first'],
  ['1739', 'Stono Rebellion → Negro Act of 1740'],
  ['1754', 'French and Indian War begins; Albany Plan of Union proposed and rejected'],
]

const EXCHANGE = [
  ['Old World → Americas', 'Smallpox, measles, influenza · horses, cattle, pigs, sheep · wheat, rice, sugarcane, coffee · guns, Christianity, encomienda'],
  ['Americas → Old World', 'Maize, potatoes (→ European population boom) · tomatoes, cacao, chili, vanilla · tobacco · silver'],
]

const CHAINS = [
  ['Why slavery in the Chesapeake?', 'Tobacco needs labour → headright brings indentured servants → servants survive and demand land → Bacon’s Rebellion (1676) shows landless freedmen are dangerous → planters switch to enslaved Africans, who never become freedmen → race is used to split poor whites from Black Virginians → 1705 slave codes.'],
  ['Why the Atlantic slave trade?', 'Sugar (an Old World crop) planted in the Americas → immense labour demand → Native labour force destroyed by disease → Europeans turn to enslaved Africans → trade scales up.'],
  ['Why did New England build towns and schools?', 'Covenant theology makes the congregation self-governing → town meeting. Salvation requires reading Scripture yourself → Harvard 1636, school law 1647, highest literacy in the English-speaking world.'],
  ['Why was France least violent toward Native peoples?', 'Furs required Native trappers and allies → cooperation served French interests. England wanted the land itself → displacement was structural. Explain by interest, never by character.'],
  ['Why did colonial self-government develop?', 'Private charters and distance → weak royal supervision → assemblies fill the gap (Burgesses 1619) → salutary neglect after 1688 lets the habit harden → enforcement after 1763 feels like a violation of rights already held.'],
]

const TERMS = [
  ['Encomienda', 'Spanish grant of Native labour, with a duty to convert. Attacked by Las Casas; curbed by the New Laws (1542).'],
  ['Headright', 'About 50 acres for paying a person’s passage — the engine of indentured migration to the Chesapeake.'],
  ['Indentured servitude', 'Passage in exchange for a term of years (often 4–7). Temporary and not racial — unlike slavery.'],
  ['Mercantilism', 'Wealth is finite; colonies exist to enrich the mother country. Enforced by the Navigation Acts.'],
  ['Navigation Acts', 'From 1651: colonial trade in English ships, key goods through England. Loosely enforced before 1763.'],
  ['Salutary neglect', 'Britain’s long stretch of lax enforcement. Colonies grew used to running themselves.'],
  ['Covenant', 'A binding agreement — with God, and among townspeople. The root of the New England town meeting.'],
  ['Halfway Covenant (1662)', 'Baptism for the children of unconverted members — evidence of fading Puritan intensity.'],
  ['First Great Awakening', 'Emotional revival, 1730s–40s. Split congregations (New Lights vs Old Lights), undercut deference to established clergy.'],
  ['Enlightenment', 'Reason, natural rights, government by consent — Locke. Feeds Jefferson.'],
  ['Middle Passage', 'The Atlantic crossing of the slave trade; mortality routinely 15% or more.'],
  ['Task system', 'Rice labour assigned by task rather than gang — left time that helped Gullah culture survive.'],
  ['Chattel slavery', 'People held as inheritable property: lifelong, hereditary, racial. Built in law between 1640 and 1705.'],
  ['Albany Plan (1754)', 'Franklin’s proposal for colonial union. Rejected by every colony — but the idea stuck.'],
]

const TRAPS = [
  'Slavery did not "begin" in 1619. Those first Africans entered a society whose law had not yet defined slavery. Write "slavery hardened", and point to 1662 and 1705.',
  'Puritans did not want religious freedom in general — they wanted it for themselves, and banished Williams and Hutchinson.',
  'There was no single "Native American culture." Treating Native peoples as one group loses the complexity point; so does treating them as passive victims.',
  'Horses are post-contact. The mounted Plains buffalo hunter exists because the Spanish brought horses.',
  'Slavery was legal in all thirteen colonies. The difference was scale and role, not presence.',
  'The town meeting was not democracy — church membership and property limited the franchise.',
  'Bacon was not a liberator. His rebellion attacked Native peoples as well as the governor.',
  'Direction matters in the Columbian Exchange: horses and sugar went west; potatoes and tobacco went east.',
  'The Great Awakening was religious, not political — but it taught colonists to question authority, which had political effects.',
]

const HIPP = [
  ['H — Historical situation', 'What was happening when this was written, and how does that shape it?'],
  ['I — Intended audience', 'Who was meant to read or hear it? How would that change what the author says?'],
  ['P — Purpose', 'What was the author trying to make happen?'],
  ['P — Point of view', 'Who is the author, and what in their position shapes what they can see or admit?'],
]

function Section({ title, children, className = '' }) {
  return (
    <section className={`cram-section ${className}`}>
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default function CramSheet() {
  return (
    <div className="cram">
      <div className="cram-toolbar no-print">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Colonial Cram Sheet</h1>
          <p className="text-sm text-slate-400">
            Periods 1 and 2 only — 1491 to 1754. Prints clean on two sides; the dark theme is dropped automatically.
          </p>
        </div>
        <button onClick={() => window.print()} className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
          🖨️ Print
        </button>
      </div>

      <div className="cram-page">
        <header className="cram-head">
          <h1>AP U.S. History — Colonial Cram Sheet</h1>
          <p>Periods 1–2 · 1491–1754 · contact, three empires, four colonial regions, slavery, the Atlantic world</p>
        </header>

        <Section title="The four colonial regions">
          <table>
            <thead>
              <tr><th>Region</th><th>Founded for</th><th>Who came</th><th>Economy</th><th>Distinctive</th></tr>
            </thead>
            <tbody>
              {REGIONS.map(([r, why, who, econ, dist]) => (
                <tr key={r}>
                  <td className="w-24"><strong>{r}</strong></td>
                  <td>{why}</td><td>{who}</td><td>{econ}</td><td>{dist}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="cram-note">
            One question answers most of this table: <strong>why did people come?</strong> Religion produces families, towns and
            schools. Profit produces servants, plantations and coerced labour.
          </p>
        </Section>

        <Section title="Three empires (plus the Dutch)">
          <table>
            <thead><tr><th>Empire</th><th>Wanted</th><th>How it governed</th><th>Native relations</th></tr></thead>
            <tbody>
              {EMPIRES.map(([e, want, gov, nat]) => (
                <tr key={e}><td className="w-20"><strong>{e}</strong></td><td>{want}</td><td>{gov}</td><td>{nat}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="The Columbian Exchange">
          <table>
            <tbody>
              {EXCHANGE.map(([dir, items]) => (
                <tr key={dir}><td className="w-40"><strong>{dir}</strong></td><td>{items}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="cram-note">
            Same event, three outcomes: Europe gained calories and silver; the Americas lost 80–90% of their population to disease;
            Africa lost millions to the slave trade. Say all three.
          </p>
        </Section>

        <Section title="Causal chains worth memorising" className="break-before">
          <table>
            <tbody>
              {CHAINS.map(([q, a]) => (
                <tr key={q}><td className="w-48"><strong>{q}</strong></td><td>{a}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Dates">
          <table>
            <tbody>
              {DATES.map(([y, what]) => (
                <tr key={y}><td className="w-20 mono"><strong>{y}</strong></td><td>{what}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="Terms">
          <table>
            <tbody>
              {TERMS.map(([t, d]) => (
                <tr key={t}><td className="w-36"><strong>{t}</strong></td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="HIPP — sourcing a document">
          <table>
            <tbody>
              {HIPP.map(([k, d]) => (
                <tr key={k}><td className="w-40"><strong>{k}</strong></td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="cram-note">
            A DBQ sourcing point needs more than naming the category — explain <em>how</em> it changes the document&rsquo;s meaning
            or reliability.
          </p>
        </Section>

        <Section title="Traps that cost points">
          <ol className="cram-list">
            {TRAPS.map(t => <li key={t}>{t}</li>)}
          </ol>
        </Section>

        <footer className="cram-foot">History Unlocked · print this, fold it, read it twice before the test.</footer>
      </div>
    </div>
  )
}
