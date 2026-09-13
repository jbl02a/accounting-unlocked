// AP-format practice questions. Real exam questions are stimulus-based: a source
// followed by 2–4 questions that test reasoning ABOUT it — context, causation,
// comparison, continuity — rather than recall of the source itself. These follow
// that pattern deliberately, because recognising what a question is really asking
// is half the skill.
export const SECTIONS = [
  { id: 'unit1', label: 'Unit 1 · 1491–1607', icon: '🌎', blurb: 'Native societies, contact, the Columbian Exchange, Spanish empire.' },
  { id: 'unit2', label: 'Unit 2 · 1607–1754', icon: '⚓', blurb: 'The British colonies, labour systems and the Atlantic world.' },
  { id: 'unit3', label: 'Empire & War · 1650–1763', icon: '⚔️', blurb: 'Mercantilism, salutary neglect, the French and Indian War and 1763.' },
  { id: 'compare', label: 'Comparison & Causation', icon: '⚖️', blurb: 'Regions against each other, and why things changed.' },
  { id: 'skills', label: 'Sourcing a Document', icon: '🔍', blurb: 'Purpose, audience, point of view — the DBQ skill.' },
]

const LAS_CASAS = {
  kind: 'excerpt',
  text: 'The Indians were totally deprived of their freedom and were put into the harshest, fiercest, most terrible servitude and captivity… they were forced to work day and night in the mines, and the mothers, overwhelmed by labour, had neither milk to give their children nor strength to bear them.',
  attribution: 'Bartolomé de las Casas, A Short Account of the Destruction of the Indies, 1542',
}
const WINTHROP = {
  kind: 'excerpt',
  text: 'We must consider that we shall be as a city upon a hill. The eyes of all people are upon us, so that if we shall deal falsely with our God in this work we have undertaken… we shall be made a story and a byword through the world.',
  attribution: 'John Winthrop, “A Model of Christian Charity,” delivered to Massachusetts Bay colonists, 1630',
}
const BACON = {
  kind: 'excerpt',
  text: 'Consider… whether the Governor hath not been a defender of the Indians against His Majesty’s loyal subjects… and whether he hath not, for private gain, betrayed and sold His Majesty’s country and the lives of his loyal subjects to the barbarous heathen.',
  attribution: 'Nathaniel Bacon, “Declaration of the People,” Virginia, 1676',
}
const VA_LAW = {
  kind: 'excerpt',
  text: 'Whereas some doubts have arisen whether children got by any Englishman upon a negro woman should be slave or free, be it therefore enacted… that all children born in this country shall be held bond or free only according to the condition of the mother.',
  attribution: 'Virginia colonial statute, 1662',
}
const PENN = {
  kind: 'excerpt',
  text: 'I purpose… to leave myself and successors no power of doing mischief; that the will of one man may not hinder the good of a whole country. Any government is free to the people under it where the laws rule and the people are a party to those laws.',
  attribution: 'William Penn, Frame of Government of Pennsylvania, 1682',
}
const PITT_DEBT = {
  kind: 'data',
  text: 'British national debt\n\n1754 (before the war) — about £75 million\n1763 (at the peace) — about £133 million\n\nAnnual cost of garrisoning North America after 1763 — roughly £300,000',
  attribution: 'Figures as commonly given by historians of the imperial crisis; estimates vary.',
}
const GRENVILLE = {
  kind: 'secondary',
  text: 'The ministry\u2019s case ran roughly like this. The nation had run itself into an immense debt to give the colonies their protection. Now, asked to contribute a small share toward an expense arising from their own defence, the colonists called it a hardship — though they paid a fraction of what subjects in Britain paid.',
  attribution: 'A summary of the British government\u2019s argument for colonial taxation, 1764\u201365, written for this course.',
}
const PROCLAMATION = {
  kind: 'excerpt',
  text: 'And we do hereby strictly forbid... all our loving subjects from making any purchases or settlements whatever, or taking possession of any of the lands beyond the heads or sources of any of the rivers which fall into the Atlantic Ocean from the west or northwest.',
  attribution: 'Royal Proclamation of 1763 (adapted)',
}
const EDWARDS = {
  kind: 'excerpt',
  text: 'The God that holds you over the pit of hell, much as one holds a spider or some loathsome insect over the fire, abhors you, and is dreadfully provoked… and yet it is nothing but his hand that holds you from falling into the fire.',
  attribution: 'Jonathan Edwards, “Sinners in the Hands of an Angry God,” 1741',
}
const NAV_ACTS = {
  kind: 'excerpt',
  text: 'No goods shall be imported into or exported out of any lands belonging to His Majesty in Asia, Africa or America but in such ships as do truly belong only to the people of England or Ireland… and are navigated with crews of which three fourths are English.',
  attribution: 'English Navigation Act, 1660',
}
const EQUIANO = {
  kind: 'excerpt',
  text: 'The closeness of the place, and the heat of the climate, added to the number in the ship, which was so crowded that each had scarcely room to turn himself, almost suffocated us… The shrieks of the women, and the groans of the dying, rendered the whole a scene of horror almost inconceivable.',
  attribution: 'Olaudah Equiano, The Interesting Narrative of the Life of Olaudah Equiano, 1789',
}
const POWHATAN = {
  kind: 'excerpt',
  text: 'Why will you take by force what you may quietly have by love? Why will you destroy us who supply you with food? What can you get by war?… We are unarmed, and willing to give you what you ask, if you come in a friendly manner.',
  attribution: 'Attributed to Powhatan, addressing John Smith, Virginia, c. 1609',
}
const HEADRIGHT = {
  kind: 'secondary',
  text: 'Under the headright system, any colonist who paid the Atlantic passage of a labourer received fifty acres of land. Planters who imported many servants therefore accumulated both a workforce and large estates, while the servants themselves, on completing their indentures, competed for land on an increasingly crowded frontier.',
  attribution: 'Historian’s summary of Virginia land policy after 1618',
}

export const QUESTIONS = [
  // ── Unit 1 ──────────────────────────────────────────────────────────
  {
    id: 'u1-1', section: 'unit1', skill: 'Contextualization', stimulus: LAS_CASAS,
    prompt: 'Las Casas wrote this account primarily in order to:',
    options: [
      'Persuade the Spanish Crown to reform its treatment of Native peoples',
      'Encourage further Spanish settlement of the Caribbean',
      'Defend the encomienda system against its critics',
      'Document Native religious practices for the Church',
    ],
    correctIndex: 0,
    hint: 'He was a Dominican friar writing TO the Spanish Crown. Ask what someone in that position wants a king to DO after reading this.',
    explanation: 'Las Casas was a reforming friar arguing to the Crown against the encomienda. His campaign contributed to the New Laws of 1542. Note the giveaway: an author this graphic about Spanish cruelty is not writing to recruit settlers — he is writing to provoke royal action.',
  },
  {
    id: 'u1-2', section: 'unit1', skill: 'Causation', stimulus: LAS_CASAS,
    prompt: 'The labour conditions Las Casas describes were most directly a consequence of:',
    options: [
      'The encomienda system, which granted colonists the labour of Native peoples',
      'The transatlantic slave trade from West Africa',
      'The Spanish Crown’s prohibition on Native labour',
      'The establishment of Spanish mission schools',
    ],
    correctIndex: 0,
    hint: 'The date is 1542 and the workers are Native, not African. Which Spanish institution handed colonists the right to Native labour in exchange for supposedly Christianizing them?',
    explanation: 'The encomienda granted Spanish colonists the labour of Native peoples in a given area in return for nominal protection and Christianization. African slavery expanded in Spanish America partly BECAUSE Native populations collapsed — so it is the consequence, not the cause, of what Las Casas describes.',
  },
  {
    id: 'u1-3', section: 'unit1', skill: 'Continuity and change',
    prompt: 'Which was the most significant demographic consequence of contact between Europe and the Americas?',
    options: [
      'Epidemic disease killed a large majority of the Native population within roughly a century',
      'Native populations grew rapidly because of new European crops',
      'European populations in the Americas exceeded Native populations by 1550',
      'Native peoples migrated in large numbers to Europe',
    ],
    correctIndex: 0,
    hint: 'Think about what Europeans carried that nobody in the Americas had any immunity to. It killed far more people than any weapon did.',
    explanation: 'Smallpox, measles, influenza and typhus devastated populations with no acquired immunity — estimates commonly run to 80–90% mortality in the worst-hit regions. This demographic collapse is the precondition for almost everything else in the colonial period, including the demand for African labour.',
  },
  {
    id: 'u1-4', section: 'unit1', skill: 'Developments and processes',
    prompt: 'Maize, potatoes and tomatoes moved from the Americas to Europe; horses, cattle, wheat and smallpox moved the other way. This exchange most directly contributed to:',
    options: [
      'Substantial population growth in Europe, Asia and Africa from new high-calorie crops',
      'A decline in European agricultural output',
      'The end of long-distance trade between Europe and Asia',
      'The isolation of African societies from Atlantic commerce',
    ],
    correctIndex: 0,
    hint: 'Potatoes and maize yield far more calories per acre than the grains Europe already grew. What happens to a population when its food supply expands like that?',
    explanation: 'American crops — especially the potato and maize — raised caloric yields per acre and supported sustained population growth across the Old World. The exchange ran both ways, but the demographic effects were opposite: growth in the Old World, catastrophe in the New.',
  },
  {
    id: 'u1-5', section: 'unit1', skill: 'Comparison',
    prompt: 'Before European contact, Native societies in the Southwest such as the Pueblo differed from those of the Great Plains chiefly in that the Pueblo:',
    options: [
      'Built permanent settlements supported by irrigated maize agriculture',
      'Relied entirely on hunting bison from horseback',
      'Had no contact with neighbouring peoples',
      'Practised no agriculture of any kind',
    ],
    correctIndex: 0,
    hint: 'One of these regions is arid but farmable with engineering; the other is grassland. And remember when horses actually arrived in North America.',
    explanation: 'Pueblo peoples irrigated maize in an arid environment and built permanent adobe settlements. Plains peoples were largely nomadic — and the horseback bison hunting we picture came only AFTER the Spanish reintroduced horses. Environment shaping social structure is a favourite AP theme (GEO).',
  },
  {
    id: 'u1-6', section: 'unit1', skill: 'Causation',
    prompt: 'The Pueblo Revolt of 1680 is best understood as:',
    options: [
      'A successful Native rebellion that expelled the Spanish from New Mexico for over a decade',
      'A failed uprising crushed within weeks',
      'A conflict between rival Spanish factions',
      'A war fought primarily over control of the fur trade',
    ],
    correctIndex: 0,
    hint: 'Popé led it, and the Spanish did not return for twelve years. That length tells you how it went.',
    explanation: 'Led by Popé, the revolt drove the Spanish out of New Mexico until 1692 — the most successful Native uprising against a European power in North America. It was triggered largely by suppression of Pueblo religious practice, and it forced Spain to govern more accommodatingly afterwards.',
  },

  // ── Unit 2 · Chesapeake ─────────────────────────────────────────────
  {
    id: 'u2-1', section: 'unit2', skill: 'Sourcing', stimulus: POWHATAN,
    prompt: 'Powhatan’s argument rests most directly on the claim that:',
    options: [
      'Trade and cooperation would serve the English better than violence would',
      'The English had a legitimate claim to Powhatan land',
      'His people intended to abandon the Chesapeake',
      'The English should convert to Native religious practices',
    ],
    correctIndex: 0,
    hint: 'Read what he is offering and what he is warning against. He asks two questions about what war would actually get them.',
    explanation: 'He offers exchange and warns that violence destroys the very people feeding the English — a pragmatic argument aimed at English self-interest. Early Jamestown depended heavily on Powhatan food supplies, which is exactly why the argument had force.',
  },
  {
    id: 'u2-2', section: 'unit2', skill: 'Causation', stimulus: HEADRIGHT,
    prompt: 'The system described most directly contributed to which development in seventeenth-century Virginia?',
    options: [
      'Growing tension between landless freed servants and established planters',
      'The rapid development of urban manufacturing centres',
      'A decline in tobacco cultivation',
      'The abolition of indentured servitude by royal decree',
    ],
    correctIndex: 0,
    hint: 'Follow the servants after their indentures end. They are free, they want land, and the good land near the coast is already taken. Where does that pressure go?',
    explanation: 'Headrights concentrated land among planters who imported labour, while freed servants faced a crowded frontier. That resentment is the fuel behind Bacon’s Rebellion in 1676 — a causal chain the exam asks about constantly.',
  },
  {
    id: 'u2-3', section: 'unit2', skill: 'Causation', stimulus: BACON,
    prompt: 'Bacon’s central grievance against Governor Berkeley was that Berkeley:',
    options: [
      'Refused to wage aggressive war against Native peoples on the frontier',
      'Had imposed heavy taxes on tobacco exports',
      'Supported the immediate abolition of indentured servitude',
      'Had allied Virginia with the Dutch against England',
    ],
    correctIndex: 0,
    hint: 'Read what he accuses Berkeley of defending. The complaint is about whose side the governor took in frontier conflict.',
    explanation: 'Bacon accused Berkeley of protecting Native peoples — Berkeley wanted to preserve the fur trade and avoid costly war — while frontier settlers demanded land and protection. The rebellion burned Jamestown and frightened the planter elite badly.',
  },
  {
    id: 'u2-4', section: 'unit2', skill: 'Continuity and change', stimulus: BACON,
    prompt: 'Historians often connect the rebellion described here to which longer-term change?',
    options: [
      'An accelerating shift from indentured servitude to African chattel slavery',
      'The end of tobacco as Virginia’s principal export',
      'The immediate extension of voting rights to landless men',
      'The dissolution of the House of Burgesses',
    ],
    correctIndex: 0,
    hint: 'The rebellion showed planters what armed, landless, formerly indentured Englishmen could do. What kind of labour force would frighten them less?',
    explanation: 'Bacon’s Rebellion demonstrated the danger of a large class of armed, landless former servants. Enslaved Africans never became free competitors for land, and racial division split poor whites from enslaved Blacks. This is a causal claim to state carefully — historians debate its weight — but it is the standard AP connection.',
  },
  {
    id: 'u2-5', section: 'unit2', skill: 'Developments and processes', stimulus: VA_LAW,
    prompt: 'This 1662 statute is most significant because it:',
    options: [
      'Made slave status hereditary through the mother, turning slavery into a permanent, inheritable condition',
      'Granted freedom to children of enslaved women',
      'Prohibited the importation of enslaved Africans',
      'Required enslaved people to be baptised as Christians',
    ],
    correctIndex: 0,
    hint: 'English common law normally traced a child’s status through the FATHER. This law deliberately reverses that. Ask who benefits from the reversal.',
    explanation: 'Reversing the usual common-law rule made slavery hereditary and self-reproducing, and it meant children fathered by enslavers were born enslaved. This is a key step in turning a fluid labour status into permanent racial chattel slavery.',
  },

  // ── Unit 2 · New England ────────────────────────────────────────────
  {
    id: 'u2-6', section: 'unit2', skill: 'Sourcing', stimulus: WINTHROP,
    prompt: 'Winthrop’s speech reflects the Puritan belief that the colony:',
    options: [
      'Was bound by a covenant with God and would be judged by its success or failure',
      'Should tolerate all religious practices equally',
      'Existed chiefly to generate profit for investors',
      'Should remain politically loyal to the Church of England',
    ],
    correctIndex: 0,
    hint: 'Note the conditional — "if we shall deal falsely… we shall be made a byword." That is the language of an agreement with consequences.',
    explanation: 'The covenant idea — a binding agreement with God, with communal consequences for failure — shaped New England law, town organization and the sense of mission. "City upon a hill" is a warning about being watched, not simply a boast.',
  },
  {
    id: 'u2-7', section: 'unit2', skill: 'Comparison', stimulus: WINTHROP,
    prompt: 'Compared with the Chesapeake colonies in the same decades, New England settlement was distinguished by:',
    options: [
      'Migration in family groups, producing balanced sex ratios and rapid natural population growth',
      'A much heavier reliance on enslaved labour',
      'An economy centred on a single staple export crop',
      'The absence of any representative political institutions',
    ],
    correctIndex: 0,
    hint: 'Who actually got on the ships? One region drew young single men chasing tobacco profits; the other drew households.',
    explanation: 'New England migrants came as families seeking religious community, giving balanced sex ratios, long life expectancy and fast natural increase. The Chesapeake drew mostly young single male servants into a disease-ridden staple economy with high mortality. This regional comparison is among the most frequently tested items in the whole course.',
  },
  {
    id: 'u2-8', section: 'unit2', skill: 'Causation',
    prompt: 'Roger Williams and Anne Hutchinson were both banished from Massachusetts Bay primarily because they:',
    options: [
      'Challenged the authority of the colony’s Puritan leadership',
      'Advocated a return to the Church of England',
      'Refused to participate in the fur trade',
      'Were accused of practising witchcraft',
    ],
    correctIndex: 0,
    hint: 'Their specific arguments differed — one on church and state and Native land, the other on grace and clerical authority — but ask what both had in common from the leadership’s point of view.',
    explanation: 'Williams argued for separation of church and state and that the colony had no valid title to Native land; Hutchinson taught that salvation came through grace without clerical mediation, and did so as a woman in mixed gatherings. Both threatened the leadership’s authority — which shows the limits of a colony founded on religious liberty for itself.',
  },
  {
    id: 'u2-9', section: 'unit2', skill: 'Causation',
    prompt: 'King Philip’s War (1675–76) is best characterised as:',
    options: [
      'A devastating conflict that broke organised Native resistance in southern New England',
      'A minor skirmish with few casualties on either side',
      'A war fought between English and French colonists',
      'A successful Native campaign that halted English expansion permanently',
    ],
    correctIndex: 0,
    hint: 'Metacom led a broad coalition, and proportionally it was among the bloodiest wars in American history. Ask who was left standing.',
    explanation: 'Metacom (King Philip) led a coalition against English expansion. Proportional casualties were enormous on both sides, but the defeat shattered organised Native power in southern New England and opened the region to further English settlement.',
  },

  // ── Unit 2 · Middle & Lower South ───────────────────────────────────
  {
    id: 'u2-10', section: 'unit2', skill: 'Sourcing', stimulus: PENN,
    prompt: 'Penn’s Frame of Government reflects which distinctive feature of Pennsylvania?',
    options: [
      'A Quaker commitment to limited government, religious toleration and rule by law',
      'A rigid established church supported by taxation',
      'An economy built on large rice plantations',
      'Rejection of any elected representative assembly',
    ],
    correctIndex: 0,
    hint: 'Look at what he deliberately denies himself — "no power of doing mischief." What religious group prized conscience and distrusted coercive authority?',
    explanation: 'Quaker beliefs about the inner light and the equality of souls produced unusual religious toleration and deliberately limited executive power. Pennsylvania’s toleration also attracted diverse migration — Germans, Scots-Irish — making it the most ethnically mixed of the colonies.',
  },
  {
    id: 'u2-11', section: 'unit2', skill: 'Comparison',
    prompt: 'By the early eighteenth century, South Carolina differed from every other British mainland colony in that it:',
    options: [
      'Had a Black majority population, largely enslaved and concentrated on rice plantations',
      'Prohibited slavery entirely',
      'Had no staple export crop',
      'Was governed directly by the Crown from its founding',
    ],
    correctIndex: 0,
    hint: 'Think about rice cultivation, the expertise it required, and where planters and their labour model came from — many came via Barbados.',
    explanation: 'Rice cultivation — drawing on West African agricultural knowledge — and the Barbadian planter model produced a Black majority in South Carolina by around 1708. That demographic fact shaped its brutal slave codes and the fear behind reactions to the Stono Rebellion in 1739.',
  },
  {
    id: 'u2-12', section: 'unit2', skill: 'Developments and processes',
    prompt: 'Georgia was founded in 1732 with which original purpose?',
    options: [
      'As a buffer against Spanish Florida and a refuge for debtors, initially banning slavery',
      'As a Puritan religious colony',
      'As a Dutch trading post',
      'As a royal colony devoted to tobacco from the outset',
    ],
    correctIndex: 0,
    hint: 'Look at the map: what lies immediately south of Georgia, and who held it? Oglethorpe had two aims, one military and one philanthropic.',
    explanation: 'Oglethorpe intended a military buffer protecting Carolina from Spanish Florida and a fresh start for the "worthy poor." The bans on slavery and rum were abandoned by 1751 under pressure from settlers who wanted the plantation economy next door.',
  },

  // ── Unit 2 · Slavery and the Atlantic world ─────────────────────────
  {
    id: 'u2-13', section: 'unit2', skill: 'Sourcing', stimulus: EQUIANO,
    prompt: 'A historian evaluating this source for evidence about the Middle Passage should note that it:',
    options: [
      'Was published decades later as part of the British abolitionist campaign, which shaped how it was written',
      'Was written by a slave trader defending the voyage',
      'Was a government document with no particular audience',
      'Describes conditions in the Caribbean rather than aboard ship',
    ],
    correctIndex: 0,
    hint: 'Check the date against the events. Then ask what Equiano wanted readers to DO — that is purpose, and purpose shapes emphasis.',
    explanation: 'Equiano published in 1789 in support of abolition. That does not make it false — it is among the few first-person accounts we have — but purpose and audience shaped its emphases. Recognising that is exactly the sourcing point on the DBQ rubric.',
  },
  {
    id: 'u2-14', section: 'unit2', skill: 'Causation', stimulus: NAV_ACTS,
    prompt: 'The Navigation Acts were intended primarily to:',
    options: [
      'Ensure colonial trade enriched England under mercantilist principles',
      'Encourage free trade between the colonies and all of Europe',
      'Raise revenue to pay down colonial war debts',
      'Grant the colonies control over their own commerce',
    ],
    correctIndex: 0,
    hint: 'Mercantilism assumes a fixed amount of wealth in the world. Under that assumption, what are colonies FOR?',
    explanation: 'Mercantilism treated colonies as sources of raw materials and captive markets, with trade carried in English ships to keep wealth within the empire. Revenue-raising is the later story — the Sugar and Stamp Acts of the 1760s — and confusing the two eras is a common error.',
  },
  {
    id: 'u2-15', section: 'unit2', skill: 'Continuity and change', stimulus: NAV_ACTS,
    prompt: 'Before 1763, enforcement of these laws was characterised by:',
    options: [
      'Salutary neglect — loose enforcement that let colonial self-government and smuggling flourish',
      'Rigorous enforcement by a large standing army',
      'Complete colonial compliance',
      'Their formal repeal by Parliament',
    ],
    correctIndex: 0,
    hint: 'The laws were on the books for a century before the crisis. If they had been enforced hard the whole time, the 1760s would not have felt like such a shock.',
    explanation: 'Loose enforcement — later named salutary neglect — allowed colonial assemblies real power and made smuggling routine. The shock of the 1760s comes precisely from the contrast: Britain began enforcing rules colonists had long evaded.',
  },
  {
    id: 'u2-16', section: 'unit2', skill: 'Causation',
    prompt: 'The Stono Rebellion of 1739 led most directly to:',
    options: [
      'Harsher slave codes in South Carolina restricting movement, assembly and literacy',
      'The abolition of slavery in the Lower South',
      'A ban on rice cultivation',
      'The immediate end of the transatlantic slave trade to Carolina',
    ],
    correctIndex: 0,
    hint: 'Ask how a frightened slaveholding majority-Black colony responds to an armed uprising. Rebellion almost always produces tightening, not loosening.',
    explanation: 'The largest slave uprising in the mainland colonies before the Revolution prompted the Negro Act of 1740, restricting movement, assembly, education and manumission. Resistance and repression escalate together — a pattern worth carrying through the whole course.',
  },

  // ── Unit 2 · Colonial minds ─────────────────────────────────────────
  {
    id: 'u2-17', section: 'unit2', skill: 'Sourcing', stimulus: EDWARDS,
    prompt: 'This sermon is most characteristic of which development?',
    options: [
      'The First Great Awakening, an emotional religious revival emphasising personal conversion',
      'The Enlightenment emphasis on reason and natural law',
      'The Anglican establishment’s defence of church hierarchy',
      'Quaker teaching on the inner light',
    ],
    correctIndex: 0,
    hint: 'The style is the clue as much as the content — vivid, terrifying, aimed at producing an emotional response in the listener rather than a reasoned assent.',
    explanation: 'Edwards is the classic Great Awakening text: emotional, conversion-focused preaching. The Awakening split congregations into New Lights and Old Lights, undermined deference to established clergy, and — because it crossed colonial boundaries — is often read as an early shared intercolonial experience.',
  },
  {
    id: 'u2-18', section: 'unit2', skill: 'Comparison',
    prompt: 'The Great Awakening and the Enlightenment differed most fundamentally in that the Awakening emphasised:',
    options: [
      'Emotional religious experience, while the Enlightenment emphasised reason and observation',
      'Royal authority, while the Enlightenment emphasised obedience to the Church',
      'Scientific experiment, while the Enlightenment emphasised revelation',
      'Withdrawal from public life, while the Enlightenment emphasised religious revival',
    ],
    correctIndex: 0,
    hint: 'One movement asks you to FEEL your way to truth, the other to THINK your way there. Both, incidentally, undercut inherited authority.',
    explanation: 'Different methods, overlapping political effect: both encouraged individuals to judge for themselves rather than defer to established authority. That shared consequence is what makes them useful together in an essay on the roots of revolutionary thinking.',
  },
  {
    id: 'u2-19', section: 'unit2', skill: 'Developments and processes',
    prompt: 'The 1735 trial of John Peter Zenger is significant because it:',
    options: [
      'Advanced the principle that truthful criticism of officials was not libel, strengthening press freedom',
      'Established universal male suffrage in New York',
      'Ended the Navigation Acts in the middle colonies',
      'Created the first colonial postal system',
    ],
    correctIndex: 0,
    hint: 'Zenger printed criticism of the royal governor. The jury acquitted him. What principle does an acquittal on those facts establish?',
    explanation: 'The jury acquitted despite the law as it then stood, advancing the idea that truth is a defence against libel. It is a milestone in press freedom and an example of colonial juries asserting themselves against royal officials.',
  },
  {
    id: 'u2-20', section: 'unit2', skill: 'Continuity and change',
    prompt: 'Colonial assemblies such as the Virginia House of Burgesses mattered in the long run chiefly because they:',
    options: [
      'Gave colonists extensive practice in representative self-government',
      'Had authority over British foreign policy',
      'Were appointed directly by Parliament',
      'Governed without any property qualifications for voting',
    ],
    correctIndex: 0,
    hint: 'Think about what a century and a half of running your own taxes and laws does to expectations — and what happens when someone tries to take it back.',
    explanation: 'Established in 1619 and mirrored elsewhere, these assemblies controlled taxation and local law for generations. The habit of self-rule — protected by salutary neglect — is why Parliamentary assertions in the 1760s felt like the removal of established rights rather than a new policy.',
  },

  // ── Comparison & causation ──────────────────────────────────────────
  {
    id: 'c-1', section: 'compare', skill: 'Comparison',
    prompt: 'Compared with English colonization, French colonization in North America was distinguished by:',
    options: [
      'Fewer settlers, a focus on the fur trade, and more extensive alliances with Native peoples',
      'Far larger settler populations displacing Native communities',
      'An economy based on plantation agriculture and enslaved labour',
      'A refusal to engage in any trade with Native peoples',
    ],
    correctIndex: 0,
    hint: 'Which economy needs land, and which needs partners? Fur requires Native hunters and trade routes; farming requires the land they live on.',
    explanation: 'The fur trade needed Native partners rather than their land, so the French built alliances and intermarried, with far fewer settlers. English agricultural settlement needed land, which made displacement and conflict structural. Economy drives the relationship — that is the analytical move to make.',
  },
  {
    id: 'c-2', section: 'compare', skill: 'Comparison',
    prompt: 'Spanish colonization differed from both French and English patterns most clearly in its:',
    options: [
      'Coerced labour of large Native populations under encomienda, and a rigid racial caste system',
      'Complete avoidance of Native labour',
      'Reliance on representative assemblies',
      'Refusal to establish Catholic missions',
    ],
    correctIndex: 0,
    hint: 'Spain conquered densely populated empires with existing labour systems. What do you do with a large subject population you already control?',
    explanation: 'Spain conquered populous societies and extracted labour through the encomienda, organising society by the casta system based on descent. The differing Native population densities each empire encountered largely explain the differing colonial models.',
  },
  {
    id: 'c-3', section: 'compare', skill: 'Causation',
    prompt: 'Which best explains why enslaved African labour became central to the southern colonies but not to New England?',
    options: [
      'Southern staple crops demanded large year-round labour forces that the southern climate and soil made profitable',
      'New England colonists were legally forbidden to own enslaved people',
      'Enslaved Africans could not be transported north of Virginia',
      'New England had no commercial connections to the Atlantic slave economy',
    ],
    correctIndex: 0,
    hint: 'Compare what each region grew. Tobacco and rice need continuous gang labour; a mixed family farm and a fishing fleet do not.',
    explanation: 'Tobacco and rice rewarded large coerced workforces; New England’s mixed farming, fishing and shipping did not. But note the trap in the last option — New England merchants were deeply tied to the slave economy through shipping, rum and provisioning the West Indies. Slavery existed in New England; it simply was not the basis of production.',
  },
  {
    id: 'c-4', section: 'compare', skill: 'Comparison',
    prompt: 'Which statement best compares the Chesapeake and New England colonies in the seventeenth century?',
    options: [
      'The Chesapeake was shaped by staple-crop profit and high mortality; New England by religious community and family migration',
      'Both were founded primarily as religious refuges',
      'Both relied on rice cultivation as their principal export',
      'Neither developed any form of representative government',
    ],
    correctIndex: 0,
    hint: 'Ask what each group was actually FOR when they got on the ship — and notice that both, in the end, did build assemblies.',
    explanation: 'Motive shaped everything downstream: demography, labour, religion, town structure. Note that the last option is wrong for both — the House of Burgesses and New England town meetings are both early representative institutions, which is why self-government grew everywhere.',
  },

  // ── Sourcing skill ──────────────────────────────────────────────────
  {
    id: 's-1', section: 'skills', skill: 'HIPP — purpose', stimulus: WINTHROP,
    prompt: 'Identifying the PURPOSE of this source would involve noting that Winthrop:',
    options: [
      'Sought to bind the colonists to a shared religious mission before they landed',
      'Wanted to record the colony’s laws for later governors',
      'Was petitioning the king for a new charter',
      'Was writing a private diary entry',
    ],
    correctIndex: 0,
    hint: 'Purpose asks what the author wanted to ACHIEVE. He is speaking to colonists, at the outset, about what they owe each other and God.',
    explanation: 'Purpose is what the author wanted to accomplish, distinct from what the source says. Winthrop was shaping a community before it existed. On the DBQ, sourcing earns a point only when you explain HOW purpose, audience, point of view or context affects the document’s meaning — not merely that it has one.',
  },
  {
    id: 's-2', section: 'skills', skill: 'HIPP — audience', stimulus: PENN,
    prompt: 'Penn’s intended AUDIENCE for the Frame of Government most plausibly included:',
    options: [
      'Prospective settlers deciding whether to migrate, as well as the colony’s own governing class',
      'Only the English Parliament',
      'Spanish officials in Florida',
      'Native leaders negotiating land sales',
    ],
    correctIndex: 0,
    hint: 'Penn needed to fill a colony. What would a document promising rule by law and limited power do for someone weighing emigration?',
    explanation: 'Penn was recruiting. Promises of toleration and limited government were both sincere Quaker conviction and effective advertising — and Pennsylvania did attract unusually diverse migration. Recognising a document doing two jobs at once is strong analysis.',
  },
  {
    id: 's-3', section: 'skills', skill: 'HIPP — point of view',
    prompt: 'Why does an author’s point of view matter when using a source as evidence?',
    options: [
      'It shapes what the author noticed, emphasised or omitted, which affects what the source can reliably show',
      'It proves the source is false',
      'It matters only for secondary sources',
      'It determines the date of composition',
    ],
    correctIndex: 0,
    hint: 'Point of view is not a way of dismissing a source. It is a way of working out what the source is good evidence FOR.',
    explanation: 'Point of view limits and directs a source; it does not invalidate it. Equiano’s abolitionist purpose does not make the Middle Passage less brutal — it tells you what he emphasised and why. Treating bias as disqualifying is the most common misuse of this skill.',
  },
  {
    id: 's-4', section: 'skills', skill: 'Contextualization',
    prompt: 'On the DBQ, the contextualization point is earned by:',
    options: [
      'Situating the argument within broader historical developments beyond the immediate topic',
      'Quoting at least four documents',
      'Listing the dates of every relevant event',
      'Restating the prompt in the introduction',
    ],
    correctIndex: 0,
    hint: 'Contextualization zooms OUT. It answers "what else was going on that makes this question make sense?"',
    explanation: 'Contextualization requires broader events, developments or processes before, during or after the topic — usually several sentences, not a clause. It is one of the most commonly missed easy points on the rubric.',
  },
  {
    id: 'u3-1', section: 'unit3', skill: 'Developments and processes',
    prompt: 'Mercantilist theory held that:',
    options: [
      'The world\u2019s wealth was fixed, so a nation gained only by exporting more than it imported',
      'Free trade between all nations enriched every participant',
      'Colonies should develop independent manufacturing economies',
      'Precious metals had no bearing on national strength',
    ],
    correctIndex: 0,
    hint: 'If the pie is a fixed size, the only way to get a bigger slice is to take it from someone else.',
    explanation: 'A zero-sum theory: wealth is finite, so empires compete for a fixed pool. Colonies existed to supply raw materials and buy finished goods, keeping the balance of trade — and the gold — at home. This is the assumption behind every Navigation Act.',
  },
  {
    id: 'u3-2', section: 'unit3', skill: 'Causation',
    prompt: 'The Navigation Acts most directly benefited which colonial industry?',
    options: [
      'New England shipbuilding and the carrying trade, because colonial ships counted as British',
      'Southern textile manufacturing, which was given protected status',
      'Colonial iron finishing, which Parliament actively encouraged',
      'Colonial wool exports to continental Europe',
    ],
    correctIndex: 0,
    hint: 'Read the definition of an "English ship" carefully — who else fits inside it?',
    explanation: 'Because colonial-built ships and colonial crews satisfied the Acts, New England yards supplied a large share of the empire\u2019s merchant fleet. Meanwhile the Wool, Hat and Iron Acts restricted exactly the finished manufacturing the wrong answers describe.',
  },
  {
    id: 'u3-3', section: 'unit3', skill: 'Continuity and change',
    prompt: 'The practical effect of salutary neglect on colonial politics was that:',
    options: [
      'Colonial assemblies accumulated real power, including control of governors\u2019 salaries',
      'Royal governors gained near-absolute authority over local affairs',
      'Colonial assemblies were dissolved for most of the period',
      'Parliament reviewed each colonial statute before it took effect',
    ],
    correctIndex: 0,
    hint: 'When nobody in London is watching for decades, who fills the space?',
    explanation: 'Assemblies used the power of the purse — especially over salaries — to bend royal governors to local interests. By 1763 colonists regarded self-government as a right long possessed, not a privilege recently granted, which is why reasserting control provoked so much more than grumbling.',
  },
  {
    id: 'u3-4', section: 'unit3', skill: 'Analyzing sources', stimulus: PROCLAMATION,
    prompt: 'The British government issued this measure primarily to:',
    options: [
      'Avoid another costly war with Native nations after Pontiac\u2019s uprising',
      'Punish colonists for their conduct during the recent war',
      'Return the Ohio valley to French control',
      'Encourage rapid settlement of the western territories',
    ],
    correctIndex: 0,
    hint: 'Ask what Britain had just spent money on, and what it could not afford to spend money on again.',
    explanation: 'Britain was broke and had just watched Pontiac\u2019s coalition take most western posts. Separating settlers from Native nations was cheaper than garrisoning a frontier. Colonists read the same document as a betrayal of what they had fought for — a good example of one policy with two entirely coherent readings.',
  },
  {
    id: 'u3-5', section: 'unit3', skill: 'Analyzing sources', stimulus: PITT_DEBT,
    prompt: 'These figures are most useful for explaining:',
    options: [
      'Why Parliament began taxing the colonies directly in the 1760s',
      'Why Britain withdrew its army from North America after 1763',
      'Why the colonies were granted seats in Parliament',
      'Why Britain returned Canada to France',
    ],
    correctIndex: 0,
    hint: 'A doubled debt and a standing garrison. Who did Parliament decide should help pay?',
    explanation: 'The debt roughly doubled and the garrison added an annual charge, so Parliament looked to the colonies that the war had defended: Sugar Act 1764, Stamp Act 1765, Quartering Act 1765. The numbers are the hinge between the war and the imperial crisis.',
  },
  {
    id: 'u3-6', section: 'unit3', skill: 'Analyzing sources', stimulus: GRENVILLE,
    prompt: 'Colonists rejected the argument summarised here mainly on the grounds that:',
    options: [
      'Only their own elected assemblies could tax them, whatever the sum involved',
      'They had contributed nothing to the recent war and felt no obligation',
      'The amounts demanded exceeded what any colony could possibly pay',
      'They denied that Britain had fought any war in North America',
    ],
    correctIndex: 0,
    hint: 'The colonial objection is about who is asking, not how much is being asked.',
    explanation: 'Colonists paid far less tax than Britons and knew it. The objection was constitutional: taxation required the consent of a body they had elected, and Parliament was not one. Answering this question with "the taxes were too high" is the classic error.',
  },
  {
    id: 'u3-7', section: 'unit3', skill: 'Causation',
    prompt: 'The removal of France from mainland North America in 1763 weakened Britain\u2019s position with its colonies because:',
    options: [
      'Colonists no longer depended on British troops for protection against a rival empire',
      'Britain lost access to colonial ports',
      'The colonies immediately lost their most important trading partner',
      'France had previously collected taxes on Britain\u2019s behalf',
    ],
    correctIndex: 0,
    hint: 'Protection is leverage. What happens to the leverage when the danger disappears?',
    explanation: 'For a century the French threat made British protection indispensable. With France gone, the colonies needed Britain far less at precisely the moment Britain began demanding more of them. This is the irony at the centre of the period: victory dissolved the tie it was meant to strengthen.',
  },
  {
    id: 'u3-8', section: 'unit3', skill: 'Comparison',
    prompt: 'Compared with the Albany Plan of 1754, colonial responses to the Stamp Act in 1765 showed that colonists:',
    options: [
      'Were far more willing to act jointly when they saw a common threat from Britain itself',
      'Had abandoned all interest in intercolonial cooperation',
      'Preferred to negotiate individually with the Crown rather than together',
      'Had accepted Parliament\u2019s right to tax them internally',
    ],
    correctIndex: 0,
    hint: 'Compare a plan every assembly refused with a congress nine colonies attended eleven years later.',
    explanation: 'In 1754 no assembly would yield an inch of authority to a union for defence. In 1765 nine colonies sent delegates to the Stamp Act Congress and merchants coordinated a boycott. What changed was not colonial affection for each other but a shared antagonist.',
  },
  {
    id: 'u3-9', section: 'unit3', skill: 'Contextualization',
    prompt: 'For Native nations, the outcome of the war was disastrous chiefly because:',
    options: [
      'They lost the ability to play rival empires against one another, leaving only Britain to bargain with',
      'They were formally expelled from all territory east of the Mississippi by treaty',
      'They had taken no part in the fighting and were excluded from the peace',
      'The French had been their only trading partners for firearms and cloth',
    ],
    correctIndex: 0,
    hint: 'Their leverage had come from there being two empires. How much leverage is left with one?',
    explanation: 'Balancing France against Britain had been the foundation of Native diplomacy for a century. In 1763 that ended: Britain cut back gift-giving, settlers pushed west, and Pontiac\u2019s War followed. No Native nation was party to the Treaty of Paris, which divided their land between two European powers.',
  },
  {
    id: 'u3-10', section: 'unit3', skill: 'Causation',
    prompt: 'A student writes: "The French and Indian War caused the American Revolution." The best refinement of that claim is that the war:',
    options: [
      'Created the debt and removed the threat that led Britain to make the decisions colonists rebelled against',
      'Had no meaningful connection to the Revolution at all',
      'Convinced colonists in 1763 that they should seek immediate independence',
      'Left Britain too weak militarily to govern its colonies',
    ],
    correctIndex: 0,
    hint: 'A cause that works through other people\u2019s decisions is still a cause — but say how it works.',
    explanation: 'Almost nobody wanted independence in 1763. The war produced conditions — debt, a garrison, a vanished French threat, an appetite for enforcement — and Parliament\u2019s response to those conditions produced the crisis. Naming the intermediate steps is what separates a top essay from a slogan.',
  },
]

export function questionsFor(scope) {
  if (scope === 'full') return QUESTIONS
  if (scope === 'quick') return shuffle(QUESTIONS).slice(0, 15)
  return QUESTIONS.filter(q => q.section === scope)
}

export function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
