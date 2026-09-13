// The multiple-choice banks for every level live here rather than inside the level
// components, so the practice exam can re-serve a missed question without importing
// a page. Keep the IDs stable — they key the weak-area tracker.
//
// `section` and `icon` let a missed level question appear as its own group in the
// exam's "questions I got wrong" picker.

// ── Level 1 · Before Contact ──────────────────────────
export const L1_QUIZ = [
  {
    id: 'L1-q1', skill: 'Causation',
    prompt: 'Pueblo peoples built permanent settlements while Great Basin peoples lived in small mobile bands. The best explanation is that:',
    options: [
      'Environment and available resources shaped the scale and permanence of each society',
      'Pueblo peoples had arrived in North America far earlier',
      'Great Basin peoples had no knowledge of agriculture',
      'Pueblo peoples had contact with Europeans before 1491',
    ],
    correctIndex: 0,
    hint: 'Both groups were adapting intelligently. The difference is in what the land could support, not in what the people knew.',
    explanation: 'This is the central Unit 1 idea: environment shaped social organisation. Irrigable land supported permanence and density; arid, resource-poor land did not. Both were sophisticated adaptations, not stages of development.',
  },
  {
    id: 'L1-q2', skill: 'Developments and processes',
    prompt: 'The "Three Sisters" — maize, beans and squash — mattered because together they:',
    options: [
      'Formed a complementary system that replenished soil and supported larger settled populations',
      'Could only be grown in the Southwest',
      'Were introduced to the Americas by Europeans',
      'Required no labour to cultivate',
    ],
    correctIndex: 0,
    hint: 'Think about what beans do for soil, what maize gives beans to climb, and what squash does to the ground around them.',
    explanation: 'Beans fix nitrogen, maize provides a stalk for them to climb, squash shades out weeds and retains moisture. The combination sustained yields without exhausting soil — supporting denser, more settled populations across the Eastern Woodlands and beyond.',
  },
  {
    id: 'L1-q3', skill: 'Contextualization',
    prompt: 'Cahokia is significant to historians chiefly because it demonstrates that:',
    options: [
      'Complex, hierarchical urban societies existed in North America well before European contact',
      'Europeans arrived in the Mississippi valley earlier than once believed',
      'Native peoples north of Mexico did not practise agriculture',
      'All Native societies were organised the same way',
    ],
    correctIndex: 0,
    hint: 'At its height it may have held more people than London did at the same date. What assumption does that overturn?',
    explanation: 'Cahokia — a Mississippian city with monumental earthworks and a population in the tens of thousands — refutes the idea that North America held only small, simple societies before contact. Avoiding that assumption is itself an AP skill.',
  },
]

// ── Level 2 · Contact & the Columbian Exchange ────────
const L2_POPULATION = {
  kind: 'data',
  text: 'Historians’ estimates, Indigenous population of central Mexico\n\n1519 — about 22 million\n1548 — about 6.3 million\n1568 — about 2.6 million\n1595 — about 1.4 million',
  attribution: 'Estimates vary widely between scholars; the scale and direction of the decline do not.',
}

export const L2_QUIZ = [
  {
    id: 'L2-q1', skill: 'Causation', stimulus: L2_POPULATION,
    prompt: 'Historians attribute the pattern above primarily to:',
    options: [
      'Epidemic disease introduced from Eurasia, against which Indigenous populations had no acquired immunity',
      'Deliberate Spanish military campaigns of extermination',
      'Mass voluntary migration out of central Mexico',
      'A prolonged drought that destroyed the maize harvest',
    ],
    correctIndex: 0,
    hint: 'Warfare and forced labour both killed people, but neither operates at this speed or on this scale. What travels faster than an army?',
    explanation: 'Smallpox, measles and influenza did the overwhelming majority of the killing. Conquest and coerced labour compounded it, but the demographic collapse was primarily biological — which is exactly why the Spanish were able to conquer empires of millions with a few hundred men.',
  },
  {
    id: 'L2-q2', skill: 'Causation',
    prompt: 'The clearest causal chain running from the Columbian Exchange to the Atlantic slave trade is:',
    options: [
      'Old World crops like sugar were planted in the Americas, and the collapse of Native labour forces created a demand met by enslaved Africans',
      'Africans were the only people with the skill to farm American crops',
      'European monarchs ordered the slave trade before any colonies were planted',
      'Native peoples refused all forms of labour, so Europeans looked elsewhere',
    ],
    correctIndex: 0,
    hint: 'String three links together: a crop arrives, a labour force collapses, a replacement is sought.',
    explanation: 'Sugar (an Old World crop) in American soil demanded enormous labour; disease had destroyed the Native labour force; Africans had partial resistance to both Old World and tropical diseases and could not easily escape into familiar country. That chain — crop, collapse, replacement — is the causation answer the exam wants.',
  },
  {
    id: 'L2-q3', skill: 'Continuity and change',
    prompt: 'A student writes: "After contact, Native peoples were simply victims who did not change." The strongest correction is that:',
    options: [
      'Native peoples actively adapted — adopting horses and guns, forming alliances and reshaping their own societies',
      'Native populations were not in fact reduced by disease',
      'Europeans had almost no effect on Native societies',
      'Only the Iroquois experienced any change after 1492',
    ],
    correctIndex: 0,
    hint: 'Devastation and agency are not opposites. What did Plains peoples do with the horse?',
    explanation: 'The losses were catastrophic AND Native peoples acted: they adopted horses and firearms, played European powers against each other, traded on their own terms and rebuilt societies. Essays that describe Native peoples as passive lose the complexity point.',
  },
  {
    id: 'L2-q4', skill: 'Contextualization',
    prompt: 'The Treaty of Tordesillas (1494) is best understood as evidence that:',
    options: [
      'European powers assumed a right to divide lands already inhabited by others',
      'Spain and Portugal had agreed to leave the Americas unsettled',
      'The Pope had forbidden colonisation of the Americas',
      'England and France had been given equal shares of the Atlantic world',
    ],
    correctIndex: 0,
    hint: 'Ask who was in the room — and who was not.',
    explanation: 'Two European kingdoms drew a line through a hemisphere neither had explored, with no Indigenous party present. It is the sharpest single illustration of the European assumption of a right to claim inhabited land — and England and France simply ignored it later.',
  },
]

// ── Level 3 · Three Empires ───────────────────────────
const L3_REQUERIMIENTO = {
  kind: 'excerpt',
  text: 'I implore you to recognise the Church as ruler of the whole world, and the King and Queen as lords of this land in her name... If you do not do this, I certify that with the help of God I shall come mightily against you, and shall make war on you in every place and by every means I can, and shall subject you to the yoke of the Church and their Highnesses.',
  attribution: 'The Requerimiento, read aloud to Indigenous peoples by Spanish forces, from 1513 (adapted)',
}

export const L3_QUIZ = [
  {
    id: 'L3-q1', skill: 'Analyzing sources', stimulus: L3_REQUERIMIENTO,
    prompt: 'The document is best used as evidence that Spanish colonisation:',
    options: [
      'Sought legal and religious justification for conquest while still relying on force',
      'Was carried out without any reference to religion',
      'Depended on the freely given consent of Indigenous peoples',
      'Aimed chiefly at establishing self-governing colonial assemblies',
    ],
    correctIndex: 0,
    hint: 'Read what it offers and what it threatens. Both are in the same paragraph.',
    explanation: 'The Requerimiento demands consent and promises war if refused — the justification and the violence are inseparable. Use it to show that Spain framed conquest as a lawful, Christianising mission, not that it was peaceful.',
  },
  {
    id: 'L3-q2', skill: 'Comparison',
    prompt: 'Relations between colonists and Native peoples were generally least violent in New France primarily because:',
    options: [
      'The French economy depended on Native trappers and allies, so cooperation served French interests',
      'French colonists had no interest in profit',
      'The French sent far more settlers than the English did',
      'France had signed a treaty forbidding warfare in North America',
    ],
    correctIndex: 0,
    hint: 'Ask what each empire actually wanted out of the land. Does the French want conflict with the people supplying it?',
    explanation: 'It was structural, not moral. Furs required Native labour and knowledge, so the French needed partners; England wanted land, and land is taken from whoever lives on it. Answer this with economics, not national character.',
  },
  {
    id: 'L3-q3', skill: 'Comparison',
    prompt: 'The English colonies developed elected assemblies while New Spain and New France did not, largely because English colonies were:',
    options: [
      'Founded by chartered companies and proprietors, leaving governance loosely supervised from London',
      'Explicitly granted independence by the English Crown',
      'Populated entirely by people who had held office in England',
      'Located too close to the Caribbean for royal governors to reach',
    ],
    correctIndex: 0,
    hint: 'Who put up the money, and how much day-to-day control did the Crown therefore keep?',
    explanation: 'Private investors and proprietors ran English colonies, so local decision-making filled the gap — the House of Burgesses met in 1619. New Spain and New France were governed by Crown-appointed officials. This divergence is the seed of the self-government story in Level 9.',
  },
  {
    id: 'L3-q4', skill: 'Contextualization',
    prompt: 'Spain, France and England all pursued colonisation for overlapping reasons summarised as "God, Gold and Glory." The sharpest way to use that phrase in an essay is to:',
    options: [
      'Note that all three motives were present everywhere, but weighted differently by empire and region',
      'Assign one motive to each empire and stop there',
      'Argue that religion played no role in any colonisation',
      'Claim that economic motives appeared only after 1700',
    ],
    correctIndex: 0,
    hint: 'The phrase is a memory aid, not a filing system. What does a strong essay do with a memory aid?',
    explanation: 'Every empire had all three; the weighting differed — silver and conversion loomed largest for Spain, furs for France, land and religious refuge for much of English America. Sorting one motive per empire is exactly the oversimplification readers penalise.',
  },
]

// ── Level 4 · The Chesapeake ──────────────────────────
const L4_BACON = {
  kind: 'excerpt',
  text: 'Consider... whether any public work for our safety and defence... has been advanced by the persons in power. Let us trace these men in authority and see what sponges have sucked up the public treasure, and whether it has not been privately contrived away by unworthy favourites.',
  attribution: 'Nathaniel Bacon, Declaration in the Name of the People, Virginia, 1676 (adapted)',
}

const L4_VA_1662 = {
  kind: 'excerpt',
  text: 'Whereas some doubts have arisen whether children got by any Englishman upon a negro woman should be slave or free, be it therefore enacted... that all children born in this country shall be held bond or free only according to the condition of the mother.',
  attribution: 'Virginia colonial statute, 1662 (adapted)',
}

export const L4_QUIZ = [
  {
    id: 'L4-q1', skill: 'Analyzing sources', stimulus: L4_BACON,
    prompt: 'The grievance Bacon voices here is aimed primarily at:',
    options: [
      'The colonial elite around the governor, whom he accuses of self-dealing at the public’s expense',
      'The English King, whom he blames for the colony’s poverty',
      'Enslaved Africans, whom he holds responsible for low wages',
      'Puritan ministers, whom he accuses of religious tyranny',
    ],
    correctIndex: 0,
    hint: '"Sponges [that] have sucked up the public treasure" — who holds the treasury?',
    explanation: 'This passage is class conflict inside Virginia: frontier settlers and freedmen against the entrenched tidewater elite. Bacon was also violently anti-Native, but that is not what this excerpt says — answer the document you were given.',
  },
  {
    id: 'L4-q2', skill: 'Developments and processes', stimulus: L4_VA_1662,
    prompt: 'English common law traced a child\u2019s status through the father. Reversing that rule mattered most because it:',
    options: [
      'Let the enslaved population reproduce itself and gave enslavers a direct financial stake in the children of women they held',
      'Reduced the number of enslaved people in Virginia over time',
      'Required enslavers to free any child with an English father',
      'Applied only to households where both parents were enslaved',
    ],
    correctIndex: 0,
    hint: 'Follow the money. If the rule ran through the father, who would own the children of an enslaved woman and an English man?',
    explanation: 'Under the normal rule, a child fathered by an enslaver would have been free. The reversal made every such child the enslaver\u2019s property instead \u2014 so the enslaved population grew without importation, and the sexual exploitation of enslaved women became financially rewarding. Hereditary status is the answer; this is why it was written.',
  },
  {
    id: 'L4-q3', skill: 'Comparison',
    prompt: 'The essential difference between indentured servitude and the chattel slavery that replaced it was that servitude was:',
    options: [
      'Temporary and contractual, while slavery was lifelong, hereditary and defined by race',
      'Voluntary in every case, while slavery was imposed by force',
      'Unknown in Virginia before 1700',
      'Reserved for Africans, while slavery applied to Europeans',
    ],
    correctIndex: 0,
    hint: 'Three words separate them, and the first one is about time. What happens to a servant after seven years, and to an enslaved person after seven years?',
    explanation: 'Servants served a term and were then free, with a claim to "freedom dues"; conditions were harsh and many died first, but the status ended and did not pass to children. Slavery as Virginia built it ended only at death and passed to every descendant through the mother. Temporary vs lifelong, contractual vs hereditary, open vs racial.',
  },
  {
    id: 'L4-q4', skill: 'Causation',
    prompt: 'Tobacco shaped Chesapeake society principally because it:',
    options: [
      'Demanded intense labour and exhausted soil, driving both a constant hunger for workers and for new land',
      'Could be grown only on very small plots, producing a society of equal smallholders',
      'Required no labour beyond the planter’s own family',
      'Was consumed locally rather than exported',
    ],
    correctIndex: 0,
    hint: 'Two appetites: for hands and for acres. Where do both lead?',
    explanation: 'Tobacco was labour-hungry and soil-hungry. That produced the headright system, indentured servitude and then slavery; it scattered settlement across river plantations rather than towns; and it pushed planters onto Native land — which is how you get Bacon’s Rebellion.',
  },
  {
    id: 'L4-q5', skill: 'Comparison',
    prompt: 'Compared with New England, early Chesapeake society was marked by:',
    options: [
      'A heavily male population, high mortality and fewer stable families in the first decades',
      'Longer life expectancy and larger families',
      'Settlement concentrated in compact towns around a meetinghouse',
      'Migration driven mainly by religious persecution',
    ],
    correctIndex: 0,
    hint: 'Who came to grow tobacco, and what did the disease environment do to them?',
    explanation: 'The Chesapeake drew young single men as servants into a malarial environment; mortality was brutal and families were few and fragile. New England drew whole families into a healthier climate, where people lived long and settled in towns. That contrast is a reliable comparison prompt.',
  },
]

// ── Level 5 · New England ─────────────────────────────
const L5_MAYFLOWER = {
  kind: 'excerpt',
  text: 'We whose names are underwritten... do by these presents solemnly and mutually in the presence of God and one another, covenant and combine ourselves together into a civil body politic, for our better ordering and preservation... and by virtue hereof to enact, constitute and frame such just and equal laws... as shall be thought most meet and convenient for the general good of the colony, unto which we promise all due submission and obedience.',
  attribution: 'The Mayflower Compact, Plymouth, 1620 (adapted)',
}

const L5_HUTCHINSON = {
  kind: 'excerpt',
  text: 'COURT: Your course is not to be suffered. You have maintained a meeting and an assembly in your house that has been condemned... and you do adhere unto them and do endeavour to set forward this faction, and so you do dishonour us.\nHUTCHINSON: I conceive there lies a clear rule in Titus, that the elder women should instruct the younger.',
  attribution: 'From the trial of Anne Hutchinson, Massachusetts Bay, 1637 (adapted)',
}

export const L5_QUIZ = [
  {
    id: 'L5-q1', skill: 'Analyzing sources', stimulus: L5_MAYFLOWER,
    prompt: 'The Mayflower Compact is most useful to a historian as evidence of:',
    options: [
      'Early self-government by mutual consent among colonists lacking a legal charter for that place',
      'A demand for independence from England',
      'The establishment of universal adult suffrage in Plymouth',
      'A rejection of religion in colonial government',
    ],
    correctIndex: 0,
    hint: 'They had landed outside the territory their patent covered. What do you do when no authority reaches you?',
    explanation: 'Blown off course and outside their patent, the Pilgrims created a government by agreement among themselves — an early instance of consent-based self-rule. It is not independence (they still name the King elsewhere in the document) and it is certainly not democracy for all.',
  },
  {
    id: 'L5-q2', skill: 'Analyzing sources', stimulus: L5_HUTCHINSON,
    prompt: 'The exchange best illustrates that in Massachusetts Bay:',
    options: [
      'Religious dissent was treated as a political threat, and gender shaped who was permitted to teach',
      'Colonists enjoyed complete freedom of conscience',
      'Women held equal authority with ministers in church affairs',
      'The colony had no established church',
    ],
    correctIndex: 0,
    hint: 'Notice what the court objects to: her theology, or the fact that she was gathering people in her house and teaching them?',
    explanation: 'Puritans fled persecution and then practised it. Hutchinson was banished for challenging clerical authority — and the court’s outrage that a woman "maintained a meeting" shows the gender dimension. Her exile, and Roger Williams’s, led to Rhode Island.',
  },
  {
    id: 'L5-q3', skill: 'Comparison',
    prompt: 'The most important difference between the Pilgrims of Plymouth and the Puritans of Massachusetts Bay was that the Pilgrims:',
    options: [
      'Were Separatists who broke entirely with the Church of England, while the Puritans hoped to purify it from within',
      'Were Catholics seeking refuge from Protestant persecution',
      'Arrived a full century before the Puritans',
      'Rejected any form of written agreement about government',
    ],
    correctIndex: 0,
    hint: 'The name "Puritan" contains the whole distinction — purify what, exactly?',
    explanation: 'Both were Calvinists; the split was over whether the Church of England could be reformed. Separatists left it; Puritans meant to model a purified version of it — Winthrop’s "city upon a hill" was supposed to be an example England would follow.',
  },
  {
    id: 'L5-q4', skill: 'Causation',
    prompt: 'New England developed town meetings and widespread public schooling largely because Puritan belief:',
    options: [
      'Held that communities were bound by covenant and that every believer must read Scripture personally',
      'Rejected any role for religion in public life',
      'Required all political decisions to be made in England',
      'Discouraged literacy among ordinary people',
    ],
    correctIndex: 0,
    hint: 'If salvation depends on reading the Bible yourself, what does a town have to build?',
    explanation: 'Covenant theology made the congregation a self-governing body, which translated directly into the town meeting; the duty to read Scripture produced Harvard (1636) and a 1647 law requiring towns to fund schools. New England had the highest literacy rate in the English-speaking world.',
  },
  {
    id: 'L5-q5', skill: 'Causation',
    prompt: 'King Philip’s War (1675–76) is significant chiefly because it:',
    options: [
      'Was proportionally one of the deadliest wars in American history and broke Native power in southern New England',
      'Ended English settlement in New England for a generation',
      'Was won by the Wampanoag and their allies',
      'Established a lasting alliance between Puritans and Native nations',
    ],
    correctIndex: 0,
    hint: 'Measure it by what it destroyed on both sides, not by who fought it.',
    explanation: 'Metacom (King Philip) led a coalition that destroyed a dozen English towns; the English response devastated Native communities and ended organised resistance in the region. Expanding towns pressing on Native land caused it — the same land hunger you saw in the Chesapeake, in a different regional key.',
  },
]

// ── Level 6 · Middle Colonies & Lower South ───────────
const L6_PENN_FRAME = {
  kind: 'excerpt',
  text: 'All persons living in this province who confess and acknowledge the one Almighty and Eternal God to be the Creator, Upholder and Ruler of the world... shall in no ways be molested or prejudiced for their religious persuasion or practice in matters of faith and worship, nor shall they be compelled at any time to frequent or maintain any religious worship, place or ministry whatever.',
  attribution: 'Frame of Government of Pennsylvania, 1682 (adapted)',
}

export const L6_QUIZ = [
  {
    id: 'L6-q1', skill: 'Analyzing sources', stimulus: L6_PENN_FRAME,
    prompt: 'Compared with Massachusetts Bay, the policy described here is significant because it:',
    options: [
      'Protected worship for a wide range of believers and forbade compelling anyone to support an established church',
      'Established Quakerism as the colony’s official religion',
      'Extended full toleration to people of no religious belief at all',
      'Placed all religious matters under the control of the colonial assembly',
    ],
    correctIndex: 0,
    hint: 'Read the condition in the first line, and then read what is forbidden in the last. Both halves matter.',
    explanation: 'Pennsylvania protected belief and refused to tax people into a state church — a sharp contrast with Puritan Massachusetts. But note the qualifier: it covers those who acknowledge God. This is broad toleration for its century, not modern freedom of conscience, and saying so precisely is the skill.',
  },
  {
    id: 'L6-q2', skill: 'Causation',
    prompt: 'The Middle Colonies became the most ethnically and religiously diverse region of British North America chiefly because:',
    options: [
      'They began as a Dutch trading colony and their proprietors actively recruited settlers by promising toleration',
      'The English Crown forbade any established church anywhere in the colonies',
      'Their climate was unsuitable for agriculture, so only merchants settled there',
      'They were the only colonies that permitted any form of Protestant worship',
    ],
    correctIndex: 0,
    hint: 'Two causes stack here: who was there before the English, and what the new owners advertised.',
    explanation: 'New Netherland was already a polyglot trading colony when England took it in 1664, and Penn then marketed toleration and cheap land across northern Europe. Diversity was an inheritance plus a recruitment strategy.',
  },
  {
    id: 'L6-q3', skill: 'Causation',
    prompt: 'South Carolina developed a Black majority population while the Chesapeake did not, mainly because:',
    options: [
      'Rice cultivation was exceptionally labour-intensive and drew on West African agricultural expertise',
      'Virginia planters had rejected slavery by 1700',
      'South Carolina imported almost no enslaved people directly from Africa',
      'Tobacco could be grown without any labour force',
    ],
    correctIndex: 0,
    hint: 'Compare the two crops as employers. Which one needs more hands per acre — and specific knowledge?',
    explanation: 'Rice demanded huge labour in a lethal lowland environment, and enslavers deliberately sought captives from West African rice regions for their skill. Scale plus direct importation produced a Black majority by about 1708 — a demographic fact behind both the Stono Rebellion and the severity of Carolina law.',
  },
  {
    id: 'L6-q4', skill: 'Causation',
    prompt: 'The immediate consequence of the Stono Rebellion (1739) was that South Carolina:',
    options: [
      'Passed harsher slave codes restricting movement, assembly, literacy and manumission',
      'Abolished slavery within the colony',
      'Ended all further importation of enslaved Africans permanently',
      'Granted freedom to enslaved people who had joined the uprising',
    ],
    correctIndex: 0,
    hint: 'Resistance frightened enslavers. What did frightened legislatures write?',
    explanation: 'The Negro Act of 1740 tightened control over nearly every part of enslaved life. The pattern is worth memorising: resistance produced repression, not reform — the same shape as the Chesapeake’s response to Bacon’s Rebellion.',
  },
  {
    id: 'L6-q5', skill: 'Contextualization',
    prompt: 'Georgia, chartered in 1732, was intended by its trustees to serve as:',
    options: [
      'A military buffer against Spanish Florida and a fresh start for the English poor, initially without slavery',
      'A refuge for Puritans dissatisfied with Massachusetts Bay',
      'A royal colony governed directly from London from its founding',
      'A purely commercial rice colony modelled on Barbados',
    ],
    correctIndex: 0,
    hint: 'Two purposes, one strategic and one charitable — and one prohibition that did not last.',
    explanation: 'Oglethorpe and the trustees wanted a defensive buffer and a colony of small farmers, banning both slavery and rum. Pressure from settlers who wanted to compete with South Carolina ended the ban by 1751, and Georgia became a plantation colony after all.',
  },
]

const LEVEL_META = {
  1: { section: 'L1', icon: '🌽', label: 'Before Contact' },
  2: { section: 'L2', icon: '⛵', label: 'Contact & the Columbian Exchange' },
  3: { section: 'L3', icon: '🏴', label: 'Three Empires' },
  4: { section: 'L4', icon: '🚬', label: 'The Chesapeake' },
  5: { section: 'L5', icon: '⛪', label: 'New England' },
  6: { section: 'L6', icon: '🌾', label: 'Middle Colonies & Lower South' }
}

const BY_LEVEL = { 1: L1_QUIZ, 2: L2_QUIZ, 3: L3_QUIZ, 4: L4_QUIZ, 5: L5_QUIZ, 6: L6_QUIZ }

// Flattened and tagged, which is the shape the practice exam consumes.
export const LEVEL_QUESTIONS = Object.entries(BY_LEVEL).flatMap(([level, qs]) =>
  qs.map(q => ({ ...q, level: Number(level), ...LEVEL_META[level] }))
)

export function quizFor(level) {
  return BY_LEVEL[level] || []
}
