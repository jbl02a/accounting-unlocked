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
  ['1754', 'Fort Necessity: the French and Indian War begins. Albany Plan of Union proposed and rejected by every assembly'],
  ['1755', 'Braddock\u2019s army destroyed near Fort Duquesne'],
  ['1757–59', 'Pitt takes charge; Quebec falls in 1759'],
  ['1763', 'Treaty of Paris: France leaves the mainland. Pontiac\u2019s War. Proclamation Line closes the west'],
  ['1764', 'Sugar Act — a duty finally enforced, smuggling tried without juries'],
  ['1765', 'Stamp Act (first direct tax); Stamp Act Congress; Sons of Liberty; Quartering Act'],
  ['1766', 'Stamp Act repealed — and the Declaratory Act claims authority "in all cases whatsoever"'],
  ['1767', 'Townshend Acts; Dickinson\u2019s Letters from a Farmer; non-importation'],
  ['1770', 'Boston Massacre (5 dead); Townshend duties repealed except on tea'],
  ['1772', 'Committees of correspondence organised'],
  ['1773', 'Tea Act; Boston Tea Party'],
  ['1774', 'Coercive/Intolerable Acts; First Continental Congress — petition, rights, boycott, NOT independence'],
  ['1775', 'Lexington and Concord; Second Continental Congress; Olive Branch Petition rejected; Dunmore\u2019s Proclamation'],
  ['1776', 'Common Sense (January); Declaration of Independence (4 July)'],
]

const EMPIRE = [
  ['Mercantilism', 'Wealth is finite: colonies supply cheap raw materials and buy finished British goods, keeping the balance of trade at home.'],
  ['Navigation Acts (from 1651)', 'Colonial trade in British or colonial ships with mostly British crews; "enumerated" goods (tobacco, sugar, indigo, later rice) to Britain first; foreign goods routed through Britain.'],
  ['Helped the colonies', 'Guaranteed buyers and bounties · Royal Navy protection at British expense · colonial ships counted as British, which built New England\u2019s merchant fleet.'],
  ['Hurt the colonies', 'Wool, Hat and Iron Acts capped manufacturing · compelled middlemen took a cut · no representation in the Parliament writing the rules.'],
  ['Salutary neglect', 'Britain had the laws and barely enforced them, roughly 1690s–1763. Assemblies gained real power (they paid the governors); smuggling was routine. The laws were old — the ENFORCEMENT after 1763 was new.'],
  ['Dominion of New England (1686–89)', 'The one attempt at direct rule before 1763: assemblies suspended, trade laws enforced. Colonists overthrew Governor Andros after the Glorious Revolution. A rehearsal for 1765.'],
  ['Triangular trades', 'No single triangle. Rum and goods to West Africa · enslaved people on the Middle Passage to the West Indies and mainland · sugar and molasses north to be distilled. Every region was tied to slavery, including those with little of it.'],
]

const WAR = [
  ['The two names', 'French and Indian War = the North American fighting, 1754–63, against the French AND their Native allies. Seven Years\u2019 War = the same conflict globally, 1756–63. Same war, wider frame.'],
  ['Why it started', 'British colonial and French claims collided in the Ohio valley. Washington\u2019s surrender at Fort Necessity (1754) began it.'],
  ['Albany Plan (1754)', 'Franklin\u2019s proposal for colonial union for defence — rejected by every assembly. The baseline that makes 1765 cooperation striking.'],
  ['Native nations', 'Most allied with France (traders, not settlers); the Iroquois mostly leaned British or stayed neutral. They acted on their own interests — never as pawns.'],
  ['How it turned', 'Braddock destroyed near Fort Duquesne (1755) → Pitt pours in money and troops (1757) → Quebec falls (1759).'],
  ['Treaty of Paris (1763)', 'France cedes Canada and everything east of the Mississippi; Spain gives up Florida and receives Louisiana; France keeps its sugar islands.'],
  ['Pontiac\u2019s War (1763)', 'With France gone, gift-giving diplomacy ended and settlers pushed west. A Native coalition took most western posts.'],
  ['Proclamation of 1763', 'No settlement west of the Appalachians — cheaper than another frontier war. Colonists thought they had just fought for that land, and largely ignored the line.'],
  ['The bill', 'Debt roughly doubled (about £75m → £133m) plus a garrison to pay for → Sugar Act 1764, Stamp Act 1765, Quartering Act 1765, real customs enforcement.'],
]

const ACTS = [
  ['Sugar Act, 1764', 'Duty on molasses — lower rate, but enforced, with smuggling tried in vice-admiralty courts without juries.', 'Protests by merchants; the jury issue begins.'],
  ['Stamp Act, 1765', 'Direct tax on paper: newspapers, deeds, licences, cards. Touched everyone; hit printers and lawyers hardest.', 'Stamp Act Congress (9 colonies), Sons of Liberty, non-importation. Repealed 1766.'],
  ['Declaratory Act, 1766', 'Parliament may bind the colonies "in all cases whatsoever."', 'Largely ignored in the celebration over repeal — but nothing had been conceded.'],
  ['Townshend Acts, 1767', 'Duties on glass, lead, paint, paper, tea; writs of assistance; NY assembly suspended.', 'Dickinson\u2019s Letters; Massachusetts Circular Letter; non-importation, led in households by women. Repealed 1770 except tea.'],
  ['Troops to Boston, 1768', 'Regulars stationed in a city at peace; soldiers competed for local jobs.', 'Two years of friction → the Boston Massacre, 1770 (5 dead; Adams defends the soldiers; Revere\u2019s print).'],
  ['Tea Act, 1773', 'Cheaper tea, tax retained, monopoly to the East India Company.', 'Boston Tea Party, December 1773.'],
  ['Coercive (Intolerable) Acts, 1774', 'Boston port closed; Massachusetts charter rewritten; some trials moved to England; quartering.', 'First Continental Congress: Declaration and Resolves, petition to the King, Continental Association boycott.'],
  ['War and the break, 1775–76', 'Lexington and Concord (April 1775); King rejects the Olive Branch Petition; Prohibitory Act; Dunmore\u2019s Proclamation.', 'Second Continental Congress; Common Sense (Jan 1776); Declaration of Independence (July 1776).'],
]

const ARGUMENTS = [
  ['Britain', 'Virtual representation: MPs represent every subject whether or not they voted · the colonies were defended at enormous expense · Parliament is sovereign "in all cases whatsoever" · colonists pay a fraction of British tax rates (true, and beside the point).'],
  ['The colonists', 'Taxes require consent through representatives actually elected · colonial assemblies have taxed the colonies for a century · trials without juries deny the rights of Englishmen · a standing army in peacetime threatens liberty.'],
  ['The pattern', 'Britain taxes → colonists petition → colonists boycott → British merchants complain → Parliament repeals, conceding nothing. It runs twice (1766, 1770). In 1774 Britain stops repealing and starts punishing.'],
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
  ['Why did winning the war cost Britain the colonies?', 'Debt roughly doubles → Parliament decides the colonies must contribute → salutary neglect ends and enforcement begins → meanwhile France is gone, so the colonies no longer need protection → demands rise exactly as dependence falls → resistance is constitutional, about who may tax, not about the amount.'],
  ['Why did protest turn into independence?', 'Britain stops repealing and starts punishing (Coercive Acts 1774) → colonies build common institutions (committees of correspondence, Continental Congress, Association) → fighting begins at Lexington (April 1775) → the King rejects the Olive Branch Petition and declares rebellion → Common Sense moves the blame from Parliament to monarchy itself → Declaration, July 1776. Escalation, not destiny.'],
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
  'The war did not cause the Revolution on its own. It produced the debt and removed the French threat; Parliament\u2019s decisions turned that into a crisis. Write the chain, not a leap.',
  'The taxes were not crushing — colonists paid far less than Britons. The objection was constitutional: taxation required consent from a body they had elected.',
  '"French and Indian War" means the war against the French AND their Native allies — not a war between the French and Native nations.',
  'Independence was not the goal until very late. 1774 is a petition; even after Lexington, Congress asked the King for peace. Do not read 1776 backwards.',
  'Colonists did not want seats in Parliament — offered them, most would have refused. They wanted their own assemblies recognised as the only bodies that could tax them.',
  'The Declaration lists grievances against the KING, not Parliament: by 1776 colonists denied Parliament had any authority over them at all.',
  '"All men are created equal" was written in a society holding roughly half a million people in slavery — and enslaved petitioners, Abigail Adams and later reformers turned the sentence back on the republic immediately. Say both halves.',
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
          <h1 className="text-2xl font-extrabold text-white">Colonial &amp; Revolution Cram Sheet</h1>
          <p className="text-sm text-slate-400">
            Periods 1 and 2 and the road to independence — 1491 to 1776. Prints clean on two sides; the dark theme is dropped automatically.
          </p>
        </div>
        <button onClick={() => window.print()} className="shrink-0 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold hover:opacity-90">
          🖨️ Print
        </button>
      </div>

      <div className="cram-page">
        <header className="cram-head">
          <h1>AP U.S. History — Colonial Cram Sheet</h1>
          <p>Periods 1–3 · 1491–1776 · contact, three empires, four regions, the imperial system, the French & Indian War and the road to independence</p>
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

        <Section title="Running the empire: mercantilism and salutary neglect" className="break-before">
          <table>
            <tbody>
              {EMPIRE.map(([k, d]) => (
                <tr key={k}><td className="w-44"><strong>{k}</strong></td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="The French & Indian War, 1754–1763">
          <table>
            <tbody>
              {WAR.map(([k, d]) => (
                <tr key={k}><td className="w-44"><strong>{k}</strong></td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="cram-note">
            <strong>The sentence to write:</strong> Britain won the war, and the victory is what broke the relationship —{' '}
            <strong>debt</strong> (so Parliament taxes), <strong>threat removed</strong> (so the colonies stop needing protection),{' '}
            <strong>enforcement</strong> (so old laws suddenly bite).
          </p>
        </Section>

        <Section title="The road to independence: act by act, 1764–1776">
          <table>
            <thead><tr><th>Measure</th><th>What it did</th><th>Colonial response</th></tr></thead>
            <tbody>
              {ACTS.map(([a, w, r]) => (
                <tr key={a}><td className="w-40"><strong>{a}</strong></td><td>{w}</td><td>{r}</td></tr>
              ))}
            </tbody>
          </table>
        </Section>

        <Section title="The constitutional argument">
          <table>
            <tbody>
              {ARGUMENTS.map(([k, d]) => (
                <tr key={k}><td className="w-28"><strong>{k}</strong></td><td>{d}</td></tr>
              ))}
            </tbody>
          </table>
          <p className="cram-note">
            <strong>Never</strong> answer with &ldquo;the taxes were too high.&rdquo; Colonists paid far less than Britons and knew
            it. The objection was about <em>who</em> was doing the taxing.
          </p>
        </Section>

        <Section title="Causal chains worth memorising">
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
