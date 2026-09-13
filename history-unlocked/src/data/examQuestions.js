// AP-format practice questions. Real exam questions are stimulus-based: a source
// followed by 2–4 questions that test reasoning ABOUT it — context, causation,
// comparison, continuity — rather than recall of the source itself. These follow
// that pattern deliberately, because recognising what a question is really asking
// is half the skill.
export const SECTIONS = [
  { id: 'unit1', label: 'Unit 1 · 1491–1607', icon: '🌎', blurb: 'Native societies, contact, the Columbian Exchange, Spanish empire.' },
  { id: 'unit2', label: 'Unit 2 · 1607–1754', icon: '⚓', blurb: 'The British colonies, labour systems and the Atlantic world.' },
  { id: 'unit3', label: 'Empire & War · 1650–1763', icon: '⚔️', blurb: 'Mercantilism, salutary neglect, the French and Indian War and 1763.' },
  { id: 'revolution', label: 'Road to Independence · 1763–1776', icon: '🔔', blurb: 'Stamp Act to the Declaration — taxation, resistance and the break.' },
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
const DICKINSON = {
  kind: 'excerpt',
  text: 'Let these truths be indelibly impressed on our minds: that we cannot be happy without being free; that we cannot be free without being secure in our property; that we cannot be secure in our property if without our consent others may take it away... Upon the whole, the single question is whether Parliament can legally take money out of our pockets without our consent.',
  attribution: 'John Dickinson, Letters from a Farmer in Pennsylvania, 1768 (adapted)',
}
const CONTINENTAL_CONGRESS = {
  kind: 'excerpt',
  text: 'That the inhabitants of the English colonies in North America, by the immutable laws of nature, the principles of the English constitution, and the several charters, are entitled to life, liberty and property; and they have never ceded to any sovereign power whatever a right to dispose of either without their consent... that the foundation of English liberty, and of all free government, is a right in the people to participate in their legislative council.',
  attribution: 'Declaration and Resolves of the First Continental Congress, October 1774 (adapted)',
}
const JEFFERSON = {
  kind: 'excerpt',
  text: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness. That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed.',
  attribution: 'The Declaration of Independence, 4 July 1776',
}
const DECLARATORY_HARD = {
  kind: 'excerpt',
  text: 'That the said colonies and plantations in America have been, are, and of right ought to be, subordinate unto and dependent upon the imperial crown and parliament of Great Britain; and that the King\u2019s Majesty... had, hath, and of right ought to have, full power and authority to make laws and statutes of sufficient force and validity to bind the colonies and people of America in all cases whatsoever.',
  attribution: 'The Declaratory Act, 1766 — passed on the same day the Stamp Act was repealed (adapted)',
}
const REVERE_HARD = {
  kind: 'image',
  text: 'Description of the print (the image itself is not reproduced here): a line of British soldiers stands in formation, firing in unison on the command of an officer whose sword is raised. Facing them is a loose crowd of unarmed townspeople; several lie bleeding on the ground. A building behind the soldiers is labelled "Butcher\u2019s Hall." Verses beneath describe "fierce barbarians grinning o\u2019er their prey."',
  attribution: 'Paul Revere, "The Bloody Massacre perpetrated in King Street," engraving, Boston, 1770',
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
    id: 'u1-1', difficulty: 2, section: 'unit1', skill: 'Contextualization', stimulus: LAS_CASAS,
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
    id: 'u1-2', difficulty: 2, section: 'unit1', skill: 'Causation', stimulus: LAS_CASAS,
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
    id: 'u1-3', difficulty: 1, section: 'unit1', skill: 'Continuity and change',
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
    id: 'u1-4', difficulty: 1, section: 'unit1', skill: 'Developments and processes',
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
    id: 'u1-5', difficulty: 1, section: 'unit1', skill: 'Comparison',
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
    id: 'u1-6', difficulty: 2, section: 'unit1', skill: 'Causation',
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
    id: 'u2-1', difficulty: 2, section: 'unit2', skill: 'Sourcing', stimulus: POWHATAN,
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
    id: 'u2-2', difficulty: 2, section: 'unit2', skill: 'Causation', stimulus: HEADRIGHT,
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
    id: 'u2-3', difficulty: 2, section: 'unit2', skill: 'Causation', stimulus: BACON,
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
    id: 'u2-4', difficulty: 2, section: 'unit2', skill: 'Continuity and change', stimulus: BACON,
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
    id: 'u2-5', difficulty: 1, section: 'unit2', skill: 'Developments and processes', stimulus: VA_LAW,
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
    id: 'u2-6', difficulty: 1, section: 'unit2', skill: 'Sourcing', stimulus: WINTHROP,
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
    id: 'u2-7', difficulty: 2, section: 'unit2', skill: 'Comparison', stimulus: WINTHROP,
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
    id: 'u2-8', difficulty: 1, section: 'unit2', skill: 'Causation',
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
    id: 'u2-9', difficulty: 2, section: 'unit2', skill: 'Causation',
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
    id: 'u2-10', difficulty: 1, section: 'unit2', skill: 'Sourcing', stimulus: PENN,
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
    id: 'u2-11', difficulty: 1, section: 'unit2', skill: 'Comparison',
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
    id: 'u2-12', difficulty: 1, section: 'unit2', skill: 'Developments and processes',
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
    id: 'u2-13', difficulty: 2, section: 'unit2', skill: 'Sourcing', stimulus: EQUIANO,
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
    id: 'u2-14', difficulty: 1, section: 'unit2', skill: 'Causation', stimulus: NAV_ACTS,
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
    id: 'u2-15', difficulty: 1, section: 'unit2', skill: 'Continuity and change', stimulus: NAV_ACTS,
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
    id: 'u2-16', difficulty: 1, section: 'unit2', skill: 'Causation',
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
    id: 'u2-17', difficulty: 1, section: 'unit2', skill: 'Sourcing', stimulus: EDWARDS,
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
    id: 'u2-18', difficulty: 2, section: 'unit2', skill: 'Comparison',
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
    id: 'u2-19', difficulty: 2, section: 'unit2', skill: 'Developments and processes',
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
    id: 'u2-20', difficulty: 2, section: 'unit2', skill: 'Continuity and change',
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
    id: 'c-1', difficulty: 2, section: 'compare', skill: 'Comparison',
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
    id: 'c-2', difficulty: 2, section: 'compare', skill: 'Comparison',
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
    id: 'c-3', difficulty: 2, section: 'compare', skill: 'Causation',
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
    id: 'c-4', difficulty: 2, section: 'compare', skill: 'Comparison',
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
    id: 's-1', difficulty: 2, section: 'skills', skill: 'HIPP — purpose', stimulus: WINTHROP,
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
    id: 's-2', difficulty: 2, section: 'skills', skill: 'HIPP — audience', stimulus: PENN,
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
    id: 's-3', difficulty: 2, section: 'skills', skill: 'HIPP — point of view',
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
    id: 's-4', difficulty: 1, section: 'skills', skill: 'Contextualization',
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
    id: 'u3-1', difficulty: 1, section: 'unit3', skill: 'Developments and processes',
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
    id: 'u3-2', difficulty: 2, section: 'unit3', skill: 'Causation',
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
    id: 'u3-3', difficulty: 2, section: 'unit3', skill: 'Continuity and change',
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
    id: 'u3-4', difficulty: 2, section: 'unit3', skill: 'Analyzing sources', stimulus: PROCLAMATION,
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
    id: 'u3-5', difficulty: 2, section: 'unit3', skill: 'Analyzing sources', stimulus: PITT_DEBT,
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
    id: 'u3-6', difficulty: 2, section: 'unit3', skill: 'Analyzing sources', stimulus: GRENVILLE,
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
    id: 'u3-7', difficulty: 2, section: 'unit3', skill: 'Causation',
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
    id: 'u3-8', difficulty: 2, section: 'unit3', skill: 'Comparison',
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
    id: 'u3-9', difficulty: 2, section: 'unit3', skill: 'Contextualization',
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
    id: 'u3-10', difficulty: 3, section: 'unit3', skill: 'Causation',
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
  {
    id: 'r-1', difficulty: 2, section: 'revolution', skill: 'Analyzing sources', stimulus: DICKINSON,
    prompt: 'Dickinson\u2019s argument here rests on linking:',
    options: [
      'Property and consent — taxation without consent is a loss of liberty, whatever the amount',
      'Independence and prosperity — the colonies would be richer once free',
      'Religion and government — Parliament had violated colonial religious liberty',
      'Trade and empire — the colonies should be permitted to trade with France',
    ],
    correctIndex: 0,
    hint: 'He builds a chain: happy \u2192 free \u2192 secure in property \u2192 consent. Where does it end?',
    explanation: 'Dickinson made the case that would carry the decade: property taken without consent is not taxation but confiscation, and a people whose property is insecure is not free. He also argued the internal/external tax distinction was meaningless if the purpose was revenue — while still writing as a loyal subject seeking redress.',
  },
  {
    id: 'r-2', difficulty: 2, section: 'revolution', skill: 'Developments and processes',
    prompt: 'The Stamp Act differed from earlier colonial taxes because it was:',
    options: [
      'A direct tax on goods and documents used inside the colonies, rather than a duty on trade',
      'The first tax Parliament had ever passed',
      'Levied only on merchants engaged in the West Indies trade',
      'Collected by colonial assemblies on Parliament\u2019s behalf',
    ],
    correctIndex: 0,
    hint: 'Trade duties are paid at the water\u2019s edge. Where was this one paid?',
    explanation: 'Earlier revenue came from duties on trade; the Stamp Act reached inside the colonies to tax newspapers, licences, deeds and playing cards. That made it visible to everyone and sharpened the constitutional objection — Parliament was no longer regulating an empire\u2019s commerce but taxing a people who had not elected it.',
  },
  {
    id: 'r-3', difficulty: 2, section: 'revolution', skill: 'Causation',
    prompt: 'Parliament repealed the Stamp Act in 1766 primarily because:',
    options: [
      'Colonial boycotts hurt British merchants, who lobbied hard for repeal',
      'It accepted the colonial argument that it had no right to tax them',
      'The King ordered the repeal over Parliament\u2019s objection',
      'The tax had already raised more revenue than expected',
    ],
    correctIndex: 0,
    hint: 'Who in Britain had both a grievance and a vote?',
    explanation: 'Non-importation turned British merchants into an interest group for repeal. Parliament conceded the tax while passing the Declaratory Act the same day, asserting authority to bind the colonies "in all cases whatsoever" — so the principle remained exactly where it had been.',
  },
  {
    id: 'r-4', difficulty: 2, section: 'revolution', skill: 'Causation',
    prompt: 'The Coercive Acts of 1774 produced intercolonial unity because they:',
    options: [
      'Showed every colony that Parliament could rewrite a colonial charter at will',
      'Imposed new taxes on all thirteen colonies simultaneously',
      'Closed every colonial port to trade',
      'Required all colonies to send representatives to Parliament',
    ],
    correctIndex: 0,
    hint: 'The acts hit one colony. Why did the other twelve take it personally?',
    explanation: 'Rewriting the Massachusetts charter and closing Boston\u2019s port demonstrated that self-government was revocable. Colonies with their own charters drew the obvious conclusion, sent delegates to the First Continental Congress and organised the Continental Association. Punishing one colony created twelve allies for it.',
  },
  {
    id: 'r-5', difficulty: 2, section: 'revolution', skill: 'Analyzing sources', stimulus: CONTINENTAL_CONGRESS,
    prompt: 'This document shows that as late as October 1774, the assembled colonies were:',
    options: [
      'Claiming rights within the British constitutional order rather than seeking independence',
      'Formally declaring the colonies independent of Britain',
      'Rejecting the idea that colonists possessed any inherited English rights',
      'Requesting seats in the British Parliament',
    ],
    correctIndex: 0,
    hint: 'Look at what they appeal to: nature, the English constitution, and their charters. Is that the language of leaving?',
    explanation: 'They ground their claims in the English constitution and their own charters — arguments for rights inside the empire. Independence is nearly two years away, and reading it backwards into 1774 is the standard error in this unit.',
  },
  {
    id: 'r-6', difficulty: 2, section: 'revolution', skill: 'Causation',
    prompt: 'Common Sense (1776) contributed to the decision for independence chiefly by:',
    options: [
      'Attacking hereditary monarchy itself, in plain language aimed at ordinary readers',
      'Providing the first detailed plan for a federal constitution',
      'Persuading France to enter the war on the American side',
      'Documenting the financial cost of British taxation',
    ],
    correctIndex: 0,
    hint: 'Before Paine, who did colonists blame — and who did they still profess loyalty to?',
    explanation: 'Colonists had blamed Parliament and bad ministers while remaining loyal to the King. Paine argued monarchy itself was absurd and that an island could not sensibly govern a continent, in language written for taverns rather than courts. It sold in enormous numbers and made separation thinkable within months.',
  },
  {
    id: 'r-7', difficulty: 2, section: 'revolution', skill: 'Analyzing sources', stimulus: JEFFERSON,
    prompt: 'The political theory in this passage derives most directly from:',
    options: [
      'John Locke\u2019s natural rights and the idea that government rests on the consent of the governed',
      'Thomas Hobbes\u2019s argument that subjects may never resist a sovereign',
      'Calvinist covenant theology as practised in New England',
      'Mercantilist theories of national wealth',
    ],
    correctIndex: 0,
    hint: 'Life, liberty and property — with the third term swapped for something broader.',
    explanation: 'Locke held that government exists by consent to protect natural rights and may be replaced when it fails to. Jefferson substitutes "the pursuit of Happiness" for Locke\u2019s "property." The grievances that follow are addressed to the King, not Parliament, because by 1776 colonists denied Parliament had any authority over them at all.',
  },
  {
    id: 'r-8', difficulty: 2, section: 'revolution', skill: 'Continuity and change',
    prompt: 'Which best describes colonial opinion on independence across this period?',
    options: [
      'Almost nonexistent before 1775, then growing rapidly after fighting began and the King refused to negotiate',
      'A settled goal from the Stamp Act crisis onward',
      'Universal by the time of the First Continental Congress',
      'Confined to Massachusetts until after the Declaration was signed',
    ],
    correctIndex: 0,
    hint: 'Track the petitions. When do colonists stop asking the King for anything?',
    explanation: 'Colonists petitioned in 1765, 1774 and again in July 1775 after Lexington. The King\u2019s refusal of the Olive Branch Petition, the Prohibitory Act and Common Sense together closed the middle ground. Treating independence as the goal all along is the most common distortion of this unit.',
  },
  {
    id: 'r-9', difficulty: 2, section: 'revolution', skill: 'Comparison',
    prompt: 'Most Native nations that took sides in the Revolutionary War supported Britain because:',
    options: [
      'Britain had tried to limit colonial settlement west of the Appalachians, while independent colonists would not',
      'Britain had promised them representation in Parliament',
      'They had been allied with Britain against France in the previous war',
      'Colonial assemblies had already granted them full citizenship',
    ],
    correctIndex: 0,
    hint: 'Ask which outcome threatened their land more.',
    explanation: 'The Proclamation of 1763 was feeble in practice but pointed in the right direction, and a victorious settler republic clearly meant unchecked expansion. As in every earlier conflict, Native nations chose by their own strategic interest — not out of loyalty to either side.',
  },
  {
    id: 'r-10', difficulty: 2, section: 'revolution', skill: 'Causation',
    prompt: 'Lord Dunmore\u2019s Proclamation (1775) is best characterised as:',
    options: [
      'A wartime measure offering freedom to enslaved men of rebel masters who would fight for the Crown',
      'Britain\u2019s formal abolition of slavery in its colonies',
      'A general emancipation of all enslaved people in the thirteen colonies',
      'A colonial law restricting the movement of enslaved people',
    ],
    correctIndex: 0,
    hint: 'Read the conditions: whose enslaved people, and what must they do?',
    explanation: 'It applied only to those held by rebels and only to men who would bear arms — a military measure, not a moral one. Thousands still risked everything to reach British lines, and it hardened Virginia planters against the Crown while exposing the contradiction at the centre of the Patriot cause.',
  },
  {
    id: 'r-11', difficulty: 3, section: 'revolution', skill: 'Contextualization',
    prompt: 'The phrase "all men are created equal" is best analysed by noting that:',
    options: [
      'It was written in a society holding roughly half a million people in slavery, and was immediately invoked by those excluded from it',
      'It was understood in 1776 to include all inhabitants of the colonies',
      'It had no influence on later American reform movements',
      'It was added to the Declaration in the nineteenth century',
    ],
    correctIndex: 0,
    hint: 'Two things are true at once: who was excluded, and what they then did with the sentence.',
    explanation: 'The men who wrote and signed it largely meant propertied white men, and many enslaved people. But the words outran their authors immediately — enslaved petitioners in Massachusetts, Abigail Adams, and later abolitionists and suffragists all turned the sentence back on the republic. Say both halves.',
  },
  {
    id: 'r-12', difficulty: 2, section: 'revolution', skill: 'Comparison',
    prompt: 'Compared with the colonial response to the Stamp Act in 1765, the response to the Coercive Acts in 1774 showed:',
    options: [
      'Far more developed intercolonial organisation, built on committees of correspondence and a continental congress',
      'Much weaker coordination between the colonies',
      'A complete abandonment of economic boycotts as a tactic',
      'A new willingness to accept parliamentary taxation',
    ],
    correctIndex: 0,
    hint: 'In 1765 nine colonies sent delegates to one congress. By 1774 what permanent machinery existed?',
    explanation: 'The Stamp Act Congress was ad hoc; by 1774 committees of correspondence linked the colonies continuously, and the Continental Association enforced a boycott through local committees. The institutions built during the argument became the institutions that fought the war.',
  },
  // ── Hard mode ──────────────────────────────────────────────────────────
  // Questions where more than one option is factually true and only one answers
  // the question asked. Every one carries three-step hints, a rationale for each
  // option, and a note on why students miss it. This is the section built for a
  // teacher who grades AP essays and writes tests students think they have passed.
  {
    id: 'h-1', difficulty: 3, section: 'revolution', hard: true, skill: 'Analyzing sources', stimulus: DECLARATORY_HARD,
    prompt: 'Which of the following is the strongest evidence that repealing the Stamp Act settled nothing?',
    options: [
      'Parliament asserted in the same breath that it could legislate for the colonies in every case without exception',
      'Colonists in New York erected a statue honouring William Pitt, who had argued for repeal',
      'Repeal came only after British merchants petitioned Parliament about lost trade',
      'Colonial assemblies continued to meet and legislate as they had before the crisis',
    ],
    correctIndex: 0,
    optionWhy: [
      'The Declaratory Act conceded the tax and kept the principle — the exact question in dispute was left exactly where it had been. That is what "settled nothing" means.',
      'True, and it happened — but statues of Pitt are evidence that colonists thought the dispute WAS over. It points the opposite way.',
      'True, and it explains WHY repeal happened. But the cause of a repeal is a different question from whether the underlying dispute was resolved.',
      'True, and entirely unremarkable — assemblies had been meeting for a century. A fact that would be true either way cannot be evidence for either way.',
    ],
    hints: [
      'The question is not "why was the Stamp Act repealed" and not "how did colonists react." It asks for evidence that the underlying disagreement survived the repeal.',
      'The disagreement was about authority: may Parliament tax and legislate for colonies that did not elect it? Evidence that it survived must be about that claim of authority, not about taxes or celebrations.',
      'Three of these are true statements about 1766. Being true is not the same as being responsive — ask of each one, "does this show the dispute continuing?"',
    ],
    trap: 'Students eliminate on truth rather than on relevance. All four options are accurate; three of them answer a question that was not asked. On a stimulus question, keep returning to the exact wording of the prompt.',
    explanation: 'The Declaratory Act claimed authority to bind the colonies "in all cases whatsoever" — the whole matter in dispute, restated as a parliamentary statute on the day the tax was withdrawn. Colonists were too busy celebrating to notice, which is precisely why the Townshend duties reopened the wound a year later.',
  },
  {
    id: 'h-2', difficulty: 3, section: 'revolution', hard: true, skill: 'Argumentation',
    prompt: 'A student argues: "Colonists opposed the Stamp Act mainly because it cost them money." Which fact most weakens that argument?',
    options: [
      'They objected just as fiercely to the Townshend duties, which were lower and levied as ordinary trade duties',
      'The Stamp Act taxed newspapers, licences and legal documents used by nearly everyone',
      'Parliament repealed the Stamp Act after British merchants complained of lost colonial trade',
      'Many colonial merchants had grown wealthy smuggling goods in defiance of the Navigation Acts',
    ],
    correctIndex: 0,
    optionWhy: [
      'If the objection tracked the cost, a cheaper tax should have provoked a milder response. It did not — which points at principle rather than expense.',
      'True, and it explains why the protest was broad. But breadth of cost is an economic explanation; this option supports the student rather than weakening them.',
      'True, and it shows the boycott worked. It says nothing about the colonists\u2019 own motive, which is what the argument is about.',
      'True, and if anything it strengthens the economic reading — smugglers had money at stake. Wrong direction.',
    ],
    hints: [
      'You are being asked to weaken a claim about MOTIVE, not to judge whether the claim is popular or whether the tax was costly.',
      'To weaken a "because it cost money" claim, find a case where the cost changed but the reaction did not. That pattern breaks the proposed link.',
      'Two options here are about money and quietly support the student. Watch for options that feel relevant because they share a topic with the argument.',
    ],
    trap: 'Weaken/strengthen questions are answered by direction, not by topic. An option about money feels connected to an argument about money — and half the time it props the argument up.',
    explanation: 'The Townshend duties were lighter and took the form colonists had supposedly accepted, yet met the same resistance; Dickinson said outright that what mattered was whether the purpose was revenue, not what the tax was called. Cost cannot explain a reaction that stays constant while the cost falls.',
  },
  {
    id: 'h-3', difficulty: 3, section: 'unit3', hard: true, skill: 'Analyzing sources', stimulus: PITT_DEBT,
    prompt: 'These figures support which conclusion most directly?',
    options: [
      'The British government had a powerful fiscal reason to seek new sources of revenue after 1763',
      'The colonies had refused to contribute anything to their own defence during the war',
      'North America was the most expensive territory Britain governed anywhere in the world',
      'Parliament had no alternative available to it other than taxing the colonies',
    ],
    correctIndex: 0,
    optionWhy: [
      'A debt that nearly doubles, plus a standing annual charge, is exactly a fiscal motive. It is the most the numbers show — and the question asks what they support.',
      'Colonial assemblies did vote men and money during the war, and in any case these figures say nothing about colonial contributions. The data do not reach this claim.',
      'The table gives one garrison cost with nothing to compare it against. You cannot rank an expense you have only measured once.',
      '"No alternative" is a claim about British politics — Parliament could have taxed at home, cut the garrison or borrowed more. Numbers alone never establish that something was the only option.',
    ],
    hints: [
      'The question is what the DATA support, not what you happen to know about the period. Read only what is in the table.',
      'Evidence supports a claim when the claim cannot be much larger than the evidence. Test each option by asking: could I prove this using only these four numbers?',
      'One option is a true statement about the period but is not shown here; one is a comparison with nothing to compare to; one is an "only possible" claim. Overreach is the trap in every data question.',
    ],
    trap: 'Students answer from memory instead of from the source. An option can be historically defensible and still be unsupported by the evidence in front of you — on the AP exam that is a wrong answer.',
    explanation: 'Stimulus questions test the distance between evidence and claim. These figures establish motive and nothing more: not colonial behaviour, not a comparison with other territories, and certainly not that taxation was inevitable.',
  },
  {
    id: 'h-4', difficulty: 3, section: 'revolution', hard: true, skill: 'Causation',
    prompt: 'Which pair is both in the correct chronological order and genuinely causally linked?',
    options: [
      'Coercive Acts → First Continental Congress',
      'Declaratory Act → Stamp Act',
      'Common Sense → Lexington and Concord',
      'Boston Massacre → Townshend Acts',
    ],
    correctIndex: 0,
    optionWhy: [
      'The Coercive Acts (spring 1774) produced the Congress that September — colonies met precisely because Massachusetts had been punished. Order right, causation real.',
      'Reversed. The Stamp Act came in 1765; the Declaratory Act was passed in 1766 alongside its repeal.',
      'Reversed. Lexington and Concord were April 1775; Common Sense appeared in January 1776. The fighting helped create the audience for the pamphlet, not the other way round.',
      'Reversed. The Townshend Acts came in 1767 and helped bring troops to Boston; the Massacre followed in 1770.',
    ],
    hints: [
      'Two things are being tested at once: did A happen before B, and did A actually bring B about? An option fails if either half fails.',
      'Fix the anchor dates first — 1765 Stamp, 1766 Declaratory, 1767 Townshend, 1770 Massacre, 1773 Tea, 1774 Coercive and Congress, 1775 Lexington, 1776 Common Sense and Declaration.',
      'Three of these are familiar pairings that students have seen together, written backwards. Familiarity is what makes a reversed pair feel right.',
    ],
    trap: 'Recognising that two events belong together is not the same as knowing which came first. Reversed pairs read as correct because the association is real — check the direction before the association.',
    explanation: 'Causal claims have a direction, and the AP exam tests it constantly. If you cannot place these eight moments on a line from memory, that is the highest-value thing to fix before this test.',
  },
  {
    id: 'h-5', difficulty: 3, section: 'skills', hard: true, skill: 'Analyzing sources', stimulus: REVERE_HARD,
    prompt: 'This print is LEAST reliable as evidence for which of the following?',
    options: [
      'What actually happened in King Street on the night of 5 March 1770',
      'How Patriot leaders wished the confrontation to be understood',
      'The techniques colonial printers used to shape public opinion',
      'The existence of serious hostility between Bostonians and British troops',
    ],
    correctIndex: 0,
    optionWhy: [
      'The image is demonstrably inaccurate as reportage: an orderly volley on command, unarmed victims, no snowballs, no shouting crowd. As a record of events it is the weakest thing in the room.',
      'It is excellent evidence for this. What an author wanted believed is exactly what a piece of propaganda proves.',
      'Also excellent evidence — the print IS an example of the technique, so it demonstrates the method directly.',
      'Reliable enough: nobody makes propaganda like this about a city at peace. The hostility is attested by the print\u2019s existence and reception.',
    ],
    hints: [
      'Note the word LEAST. You are looking for the claim the source is worst at supporting, not the claim that is false.',
      'A biased source is still strong evidence — for the bias. Ask of each option: is this about the event, or about how the event was being used?',
      'Three options are about persuasion and one is about facts on the ground. A distorted picture is nearly useless for the second and nearly ideal for the first.',
    ],
    trap: 'Students treat "biased" as "worthless" and eliminate everything. Bias narrows what a source proves; it does not empty it. Misreading LEAST/EXCEPT costs more points on this exam than any single fact.',
    explanation: 'John Adams defended the soldiers and most were acquitted, which tells you how far the engraving sits from the evidence presented in court. It remains a superb source — for Patriot persuasion, not for the sequence of events.',
  },
  {
    id: 'h-6', difficulty: 3, section: 'unit2', hard: true, skill: 'Argumentation',
    prompt: 'Which finding would most weaken the argument that racial ideology in Virginia came first and produced chattel slavery, rather than developing alongside it?',
    options: [
      'Records from the 1640s and 1650s showing some Africans completing terms of service, acquiring land and winning lawsuits',
      'The 1662 statute providing that a child\u2019s status followed that of the mother',
      'The 1705 slave codes barring marriage between white and Black Virginians',
      'Evidence that enslaved Africans outnumbered indentured servants in Virginia by 1700',
    ],
    correctIndex: 0,
    optionWhy: [
      'If Africans could become free, hold property and sue successfully, then the rigid racial order cannot have been fully in place beforehand. It shows the ideology hardening over time.',
      'Strengthens the opposite side — it is a legal step in building racial slavery, and it comes after the period in question.',
      'Also on the other side, and later still. 1705 is the culmination of the process, not evidence about its origin.',
      'A fact about labour numbers, with nothing to say about when racial ideology took hold. Chronology of population, not of ideas.',
    ],
    hints: [
      'The claim under attack is about SEQUENCE: ideology first, then slavery. To weaken it, you need evidence about what the early period actually looked like.',
      'Evidence from AFTER the system hardened cannot settle a dispute about what came before it. Check the date on every option before judging its content.',
      'Two options are real evidence — for the other side of this argument. An option that is important and relevant can still be pointed the wrong way.',
    ],
    trap: 'Students pick the option that is most clearly about race, and the most clearly racial evidence here is the evidence that the argument was RIGHT. For weaken questions, direction beats topical fit every time.',
    explanation: 'Anthony Johnson and others in early Virginia held land and went to law; the law had not yet closed. That fluidity is the historian\u2019s main reason for saying slavery hardened between roughly 1640 and 1705 rather than arriving fully formed — and the reason the app never says slavery "began" in 1619.',
  },
  {
    id: 'h-7', difficulty: 3, section: 'unit3', hard: true, skill: 'Comparison',
    prompt: 'Which comparison between the Navigation Acts before 1763 and British policy after 1763 is most accurate?',
    options: [
      'The laws changed less than the enforcement did, which is why old arrangements suddenly felt like new tyranny',
      'Parliament repealed the Navigation Acts after 1763 and replaced them with direct taxes',
      'Before 1763 the Acts were rigorously enforced, and after 1763 enforcement collapsed',
      'The Acts had applied only to New England, and after 1763 they were extended to every colony',
    ],
    correctIndex: 0,
    optionWhy: [
      'This is the heart of the period: mercantilist law was a century old, but customs enforcement, vice-admiralty courts and new revenue acts made it bite for the first time.',
      'False. The Navigation Acts stayed in force; the Sugar and Stamp Acts were added to them, not substituted for them.',
      'Exactly backwards. Loose enforcement before 1763 is the definition of salutary neglect.',
      'False. The Acts applied empire-wide from the start; New England was affected distinctively because of shipping, not because it was singled out.',
    ],
    hints: [
      'The question asks what CHANGED in 1763. Separate two different things: the rules on the books, and whether anyone was made to follow them.',
      'Salutary neglect means the law existed and was not enforced. Whatever you answer must be consistent with that definition.',
      'One option is the right idea stated backwards. Reversed options are the most tempting kind, because every word in them is familiar.',
    ],
    trap: 'A reversal reads as correct because all the vocabulary matches. Before eliminating, say each option out loud as a claim about direction: did enforcement go up or down after 1763?',
    explanation: 'Colonists were not objecting to novel laws — they were objecting to laws they had spent a lifetime ignoring being enforced against them, along with new revenue acts and juryless courts. "What changed was enforcement, not the statute book" is the sentence to carry into the essay.',
  },
  {
    id: 'h-8', difficulty: 3, section: 'revolution', hard: true, skill: 'Contextualization',
    prompt: 'The First Continental Congress is best described as a body that:',
    options: [
      'Claimed rights under the English constitution while building machinery capable of coordinated resistance',
      'Declared the colonies independent and began raising a continental army',
      'Rejected the idea of economic coercion in favour of purely legal petitions',
      'Represented all thirteen colonies in a formal union with binding legislative authority',
    ],
    correctIndex: 0,
    optionWhy: [
      'Exactly the tension of 1774: the language is loyal and constitutional, while the Continental Association created local committees that could enforce a boycott — the apparatus of a government in waiting.',
      'Two years early. Independence is July 1776, and the Continental Army is created by the SECOND Congress in 1775.',
      'The Congress did petition — and it also created the Association, a comprehensive boycott. "Purely legal" misses half of what it did.',
      'Georgia sent no delegates, and the Congress had no legal authority to bind anyone. It worked through persuasion and local committees.',
    ],
    hints: [
      'Ask what the Congress SAID and what it BUILT. The best answer will account for both, because they pointed in different directions.',
      'Date discipline: 1774 is petition and boycott; 1775 is army and one last petition; 1776 is independence. Anything that collapses those years is wrong.',
      'Two options are true of a Continental Congress — just not this one. The exam relies on students remembering "Continental Congress" without remembering which.',
    ],
    trap: 'The First and Second Congresses blur together in revision. Anchor them: First = Declaration and Resolves, petition, Association, twelve colonies. Second = Washington, the army, the Olive Branch Petition, then the Declaration.',
    explanation: 'The Congress asserted rights "by the immutable laws of nature, the principles of the English constitution, and the several charters" — while its Association put enforcement in the hands of local committees. Loyal words, revolutionary infrastructure.',
  },
  {
    id: 'h-9', difficulty: 3, section: 'revolution', hard: true, skill: 'Causation',
    prompt: 'Which best explains why the Tea Act provoked destruction of property when earlier taxes had produced petitions and boycotts?',
    options: [
      'Landing the tea would itself have conceded the tax, so preventing it from being unloaded became the whole point',
      'The Tea Act raised the price of tea beyond what most colonists could afford',
      'The Tea Act was the first tax Parliament had imposed without any colonial consultation',
      'Colonists had by 1773 already committed themselves to seeking independence',
    ],
    correctIndex: 0,
    optionWhy: [
      'Once the cargo was landed and duty paid, the principle was surrendered in practice. Boycotting cheap tea was unreliable, so the tea could not be allowed ashore at all.',
      'False, and it is the famous inversion: the Tea Act made tea cheaper. If you answered this, the question has caught the right misconception.',
      'False. No revenue act had been passed with colonial consultation — that was the entire grievance since 1764.',
      'False, and it fails the chronology. In 1773 independence was still a fringe position.',
    ],
    hints: [
      'Start from the fact that trips most people: the tea was CHEAPER. Any answer resting on expense is already out.',
      'A boycott works when refusing to buy is easy. What happens to a boycott when the boycotted product becomes the cheapest on the market?',
      'The response escalated because the usual weapon had been blunted — think about what tactics remained once buying the tea was attractive.',
    ],
    trap: 'Nearly everyone remembers the Boston Tea Party as a protest against expensive tea. It was a protest against cheap tea, because cheap tea would have been bought, and buying it would have conceded Parliament\u2019s right to tax.',
    explanation: 'The Tea Act undercut smugglers and made the legal, taxed article the best deal in the market — which would have made the constitutional point moot in practice. Destroying the cargo was the only way to stop a concession by consumption.',
  },
  {
    id: 'h-10', difficulty: 3, section: 'compare', hard: true, skill: 'Comparison',
    prompt: 'Both Bacon\u2019s Rebellion (1676) and the Stamp Act crisis (1765) involved colonists resisting authority. The most significant difference is that:',
    options: [
      'Bacon\u2019s followers demanded a share of what the colonial elite held, while the Stamp Act protests united colonists across class against an external authority',
      'Bacon\u2019s Rebellion was peaceful, while the Stamp Act crisis involved violence',
      'Bacon\u2019s Rebellion was directed at Parliament, while the Stamp Act crisis targeted the colonial governor',
      'Bacon\u2019s Rebellion produced no lasting consequences, while the Stamp Act crisis changed colonial policy',
    ],
    correctIndex: 0,
    optionWhy: [
      'One is conflict inside colonial society — frontier freedmen against the tidewater elite. The other is colonial society, elite very much included, against London. Different axis entirely.',
      'Backwards on both counts. Bacon burned Jamestown; the Stamp Act protests included crowds destroying officials\u2019 houses.',
      'Both halves are wrong. Bacon\u2019s target was Governor Berkeley; the Stamp Act protests were aimed at Parliament and its stamp distributors.',
      'Bacon\u2019s Rebellion had enormous consequences — it is the standard explanation for the turn toward enslaved labour. Saying otherwise contradicts Level 4.',
    ],
    hints: [
      'Both were resistance. Ask a sharper question: in each case, who was resisting WHOM?',
      'Draw the line of conflict. Does it run between colonists, or between the colonies and Britain? That is the axis the best answer names.',
      'Three options make factual claims you can test against what you know. Test them — two are simply reversed.',
    ],
    trap: 'Comparison questions reward naming the dimension of difference, not listing details. "One was internal conflict, the other external" is the kind of sentence that earns points; a pile of facts about each is not.',
    explanation: 'This is the comparison an essay prompt is really asking for. Bacon\u2019s Rebellion exposed class fracture within Virginia and pushed elites toward slavery and racial solidarity; the Stamp Act crisis, by contrast, temporarily bound merchants, lawyers, artisans and crowds together against Parliament.',
  },
  {
    id: 'h-11', difficulty: 3, section: 'revolution', hard: true, skill: 'Continuity and change',
    prompt: 'Which statement about colonial aims between 1765 and 1775 is best supported by the documents colonists themselves produced?',
    options: [
      'They consistently claimed the rights of Englishmen and sought redress within the empire, even after fighting began',
      'They demanded independence from the Stamp Act crisis onward but concealed it for tactical reasons',
      'They sought representation in the House of Commons as their primary objective',
      'They rejected the authority of the King while accepting that of Parliament',
    ],
    correctIndex: 0,
    optionWhy: [
      'The Stamp Act Congress resolutions, the Declaration and Resolves and the Olive Branch Petition all argue from English rights and ask for redress — the last of them in July 1775, after Lexington.',
      'A conspiracy reading with no documentary support. Historians work from what people wrote, and what they wrote was petitions.',
      'The reverse of the colonial position: most colonists did not want seats at Westminster, they wanted their own assemblies recognised as the only bodies able to tax them.',
      'Precisely backwards. Colonists denied Parliament\u2019s authority while professing loyalty to the King — which is why the Declaration\u2019s grievances are addressed to him.',
    ],
    hints: [
      'Note the qualifier: "best supported by the documents." Base the answer on what colonists actually wrote, not on how the story ends.',
      'Line up the three big petitions — 1765, 1774, July 1775 — and ask what all three have in common.',
      'One option inverts King and Parliament. That inversion is the single most common error on the Declaration, so check the direction carefully.',
    ],
    trap: 'Knowing the outcome makes the earlier evidence look like it was heading there. Historians call it hindsight bias, the AP exam tests it constantly, and the fix is to date every document and read it as its author meant it.',
    explanation: 'Right up to mid-1775 the documentary record is a record of subjects asking for their rights. That is what makes 1776 a genuine rupture rather than the end of a plan — and saying so with evidence is what a high-scoring essay does.',
  },
  {
    id: 'h-12', difficulty: 3, section: 'unit3', hard: true, skill: 'Causation',
    prompt: 'Which claim about the French and Indian War and the Revolution is most defensible?',
    options: [
      'The war created the conditions — debt, a garrison and a vanished French threat — within which British ministers made the decisions colonists rebelled against',
      'The war caused the Revolution directly, since colonists resolved on independence as soon as peace was signed',
      'The war was irrelevant to the Revolution, which arose entirely from the ideas of the Enlightenment',
      'The war prevented revolution for a decade by uniting colonists and British troops in a common cause',
    ],
    correctIndex: 0,
    optionWhy: [
      'It names the mechanism and leaves room for human choice: conditions plus decisions. That structure is what "most defensible" is asking for.',
      'Too strong, and false in fact. In 1763 colonists were celebrating a British victory; independence had almost no constituency.',
      'Too weak. The debt and the removal of France are causally central, and Enlightenment ideas had circulated for decades without producing a revolution.',
      'Half-true and misleading: the war did produce shared service, and also mutual contempt. Either way, "prevented revolution" makes a claim the decade does not support.',
    ],
    hints: [
      'The words "most defensible" mean the answer should be the one you could hold against a sharp challenge — not the boldest and not the most cautious.',
      'A strong causal claim names the mechanism between cause and effect. Check whether each option says HOW the war led to anything.',
      'Two options fail by overstatement, one by understatement. Extremes are usually wrong on a "most defensible" question — but only usually, so test the mechanism rather than trusting the pattern.',
    ],
    trap: 'Students learn "the French and Indian War caused the Revolution" as a slogan and then choose the option that states it most forcefully. The exam rewards the version with the intermediate steps in it.',
    explanation: 'Debt → taxation, threat removed → reduced dependence, victory → an appetite for enforcement. Parliament then chose the Sugar Act, the Stamp Act and real customs enforcement. Conditions did not compel those choices, which is exactly why the causal claim needs its middle terms.',
  },
]

export function questionsFor(scope) {
  if (scope === 'full') return QUESTIONS
  if (scope === 'hard') return QUESTIONS.filter(q => q.hard)
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
