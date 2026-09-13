// The multiple-choice banks for every level live here rather than inside the level
// components, so the practice exam can re-serve a missed question without importing
// a page. Keep the IDs stable — they key the weak-area tracker.
//
// `section` and `icon` let a missed level question appear as its own group in the
// exam's "questions I got wrong" picker.

// ── Level 1 · Before Contact ──────────────────────────
export const L1_QUIZ = [
  {
    id: 'L1-q1', difficulty: 1, skill: 'Causation',
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
    id: 'L1-q2', difficulty: 1, skill: 'Developments and processes',
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
    id: 'L1-q3', difficulty: 2, skill: 'Contextualization',
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
  {
    id: 'L1-h1', difficulty: 3, skill: 'Argumentation',
    prompt: "A textbook describes North America before 1492 as \"a sparsely populated wilderness.\" Which single piece of evidence most directly refutes that description?",
    options: [
      "Cahokia sustained a population in the tens of thousands — larger than London at the same date",
      "Pueblo peoples engineered irrigation systems to farm maize in an arid climate",
      "The Iroquois Confederacy united five nations in a durable political federation",
      "Plains peoples hunted buffalo on foot and in organised drives before horses arrived",
    ],
    correctIndex: 0,
    optionWhy: [
      "The claim has two words in it — \"sparsely populated\" — and this is the only option that speaks to population. A city of that size is a direct contradiction.",
      "True, and impressive, but it is evidence of sophistication rather than of numbers. A small population can irrigate.",
      "True, and evidence of political complexity — again not of density. The claim under attack was about how many people lived here.",
      "True, and entirely compatible with the textbook: mobile hunting is what a sparsely populated wilderness would look like. This option quietly supports the claim.",
    ],
    hints: [
      "Read the claim word by word. It says two things — sparsely POPULATED, and WILDERNESS. The question asks which evidence hits it most directly.",
      "Evidence refutes a claim when it contradicts what the claim actually asserts. Sophistication and population are different assertions.",
      "Three options are impressive facts about pre-contact societies, and impressiveness is not the test. One of them is even consistent with the textbook.",
    ],
    trap: "Students pick the fact that best proves Native societies were advanced, because that feels like the right argument to make. The prompt asked about population, and only one option is about population.",
    explanation: "Estimates put Cahokia at 10,000–20,000 at its height, with monumental earthworks and long-distance trade. Irrigation, confederacy and buffalo drives all show sophistication, but only population figures answer a claim about how many people were here.",
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
    id: 'L2-q1', difficulty: 2, skill: 'Causation', stimulus: L2_POPULATION,
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
    id: 'L2-q2', difficulty: 2, skill: 'Causation',
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
    id: 'L2-q3', difficulty: 2, skill: 'Continuity and change',
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
    id: 'L2-q4', difficulty: 2, skill: 'Contextualization',
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
  {
    id: 'L2-h1', difficulty: 3, skill: 'Argumentation',
    prompt: "Which finding would most strengthen the argument that epidemic disease, rather than European military superiority, explains the speed of the Spanish conquest?",
    options: [
      "Epidemics repeatedly devastated regions months or years before any European reached them",
      "Spanish forces possessed steel weapons, firearms and horses that Native armies lacked",
      "Cortés was joined by tens of thousands of Native allies hostile to the Mexica",
      "Tenochtitlán fell only after a siege lasting many weeks",
    ],
    correctIndex: 0,
    optionWhy: [
      "Disease arriving ahead of the army is the cleanest possible evidence: populations were already collapsing where no Spanish soldier had yet been. Military superiority cannot explain that.",
      "The opposite direction — this is evidence FOR the military explanation the argument is trying to displace.",
      "Tempting and genuinely important, but it supports a third explanation (Native alliances), not the disease one. Undercutting a rival is not the same as supporting your own.",
      "If anything this weakens the disease argument: a long siege suggests the defenders were still capable of resisting.",
    ],
    hints: [
      "You are strengthening one specific explanation — disease — against one specific rival. Both halves matter.",
      "The strongest evidence for a cause is a case where the cause operated and the rival could not have. Where could disease act with no army present?",
      "One option damages the military explanation without doing anything for the disease explanation. Attacking the rival is not the same as supporting your claim.",
    ],
    trap: "\"It weakens the other side, so it must strengthen mine\" is the most common error on strengthen questions. With three competing explanations in play, an option can hurt one rival and help a different one.",
    explanation: "Smallpox ran ahead of the conquistadors through Native trade and travel networks, emptying towns before Europeans arrived. Alliances and steel mattered too — but only disease explains collapse in places no Spaniard had reached.",
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
    id: 'L3-q1', difficulty: 2, skill: 'Analyzing sources', stimulus: L3_REQUERIMIENTO,
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
    id: 'L3-q2', difficulty: 2, skill: 'Comparison',
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
    id: 'L3-q3', difficulty: 2, skill: 'Comparison',
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
    id: 'L3-q4', difficulty: 3, skill: 'Contextualization',
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
  {
    id: 'L3-h1', difficulty: 3, skill: 'Argumentation',
    prompt: "A student writes: \"The French treated Native peoples better because the French were more tolerant people.\" Which is the strongest correction?",
    options: [
      "French wealth came from furs, which required Native trappers and allies, so cooperation served French interests directly",
      "The French were in fact just as violent toward Native peoples as the English were",
      "France sent far more settlers to North America than England did, so conflict was unnecessary",
      "The French sent no missionaries and therefore made no attempt to change Native societies",
    ],
    correctIndex: 0,
    optionWhy: [
      "It replaces a claim about national character with a claim about material interest — which is both true and the move the AP exam rewards throughout this unit.",
      "An overcorrection. Relations in New France really were less violent on the whole; denying the pattern is as wrong as explaining it by character.",
      "False, and backwards: New France had a small population precisely because the fur trade needed traders, not farm families.",
      "False. Jesuit missionaries were central to New France and worked hard to convert Native peoples.",
    ],
    hints: [
      "The student’s claim has a factual half (relations were less violent) and an explanatory half (because the French were nicer). Which half needs correcting?",
      "The rule running through this whole unit: explain difference by interest, not by character. What did each empire want from the land?",
      "One option corrects the student by denying the pattern altogether. Over-correction is still an error — and here it contradicts the evidence.",
    ],
    trap: "Students either accept the character explanation or swing to denying the difference existed. The good answer keeps the observation and replaces the explanation.",
    explanation: "Furs required Native trappers, Native knowledge and Native goodwill; farmland required Native removal. That is why New France negotiated and allied while English colonies expanded onto the land — interest, not temperament.",
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
    id: 'L4-q1', difficulty: 2, skill: 'Analyzing sources', stimulus: L4_BACON,
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
    id: 'L4-q2', difficulty: 3, skill: 'Developments and processes', stimulus: L4_VA_1662,
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
    id: 'L4-q3', difficulty: 1, skill: 'Comparison',
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
    id: 'L4-q4', difficulty: 1, skill: 'Causation',
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
    id: 'L4-q5', difficulty: 1, skill: 'Comparison',
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
  {
    id: 'L4-h1', difficulty: 3, skill: 'Argumentation',
    prompt: "Bacon’s Rebellion is usually called a turning point toward enslaved African labour. Which finding would most weaken that claim?",
    options: [
      "Planters had already been importing enslaved Africans in rising numbers before 1676, and the rate of increase barely changed afterward",
      "Bacon’s followers burned Jamestown and drove Governor Berkeley out of the capital",
      "Governor Berkeley was recalled to England shortly after the rebellion was suppressed",
      "Virginia’s tobacco exports continued to grow through the 1680s and 1690s",
    ],
    correctIndex: 0,
    optionWhy: [
      "A turning point requires a turn. If the trend was already running and did not accelerate, the rebellion stops being the cause and becomes a coincidence in the middle of a longer process.",
      "True, and dramatic — but it describes how violent the rebellion was, not whether it changed the labour system.",
      "True and irrelevant to the labour question. What happened to one governor says nothing about what happened to the workforce.",
      "True and neutral. Tobacco growing throughout is consistent with either story.",
    ],
    hints: [
      "The claim is that 1676 CHANGED the direction of something. To weaken it, attack the change, not the event.",
      "Think about what evidence would show for a real turning point: a trend line that bends at the date. What would show there was no bend?",
      "Three options are true facts about the rebellion and its aftermath. Being about the rebellion is not the same as being about whether it turned anything.",
    ],
    trap: "Students look for the option that makes the rebellion sound less important. The one that actually does the work is quantitative and boring: the trend was already moving and did not change pace.",
    explanation: "Historians still debate the size of the turn — the shift was under way before 1676 and driven partly by a falling supply of English servants. The rebellion belongs in the explanation, but an essay that treats it as the sole cause is overclaiming.",
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
    id: 'L5-q1', difficulty: 2, skill: 'Analyzing sources', stimulus: L5_MAYFLOWER,
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
    id: 'L5-q2', difficulty: 2, skill: 'Analyzing sources', stimulus: L5_HUTCHINSON,
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
    id: 'L5-q3', difficulty: 1, skill: 'Comparison',
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
    id: 'L5-q4', difficulty: 2, skill: 'Causation',
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
    id: 'L5-q5', difficulty: 2, skill: 'Causation',
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
  {
    id: 'L5-h1', difficulty: 3, skill: 'Analyzing sources',
    prompt: "Which is the strongest evidence that Puritan religious intensity was fading in New England by the later seventeenth century?",
    options: [
      "The Halfway Covenant of 1662, admitting to baptism the children of members who could not testify to a conversion experience",
      "The Salem witch trials of 1692, in which nineteen people were executed",
      "King Philip’s War of 1675–76, which devastated both English towns and Native communities",
      "The founding of Harvard College in 1636 to train ministers",
    ],
    correctIndex: 0,
    optionWhy: [
      "The covenant was a concession: too few members could testify to conversion, so the requirement was relaxed to keep the churches full. Changing a rule because people cannot meet it is direct evidence of decline.",
      "The most tempting option, and it points the other way — a community executing people for witchcraft is not a community indifferent to religion. Historians read Salem as social and economic strain, not as fading faith.",
      "A war over land. Devastating, and not evidence about religious commitment either way.",
      "Earlier, and evidence of intensity rather than decline — it is what a fervent society builds, not what a fading one does.",
    ],
    hints: [
      "You are looking for evidence of DECLINE. Ask of each option whether it shows people caring less, or caring differently.",
      "The clearest sign that a standard is slipping is the standard itself being lowered. Which option is a rule being relaxed?",
      "One option is dramatic and religious and therefore feels like evidence about religion — check which direction it actually points.",
    ],
    trap: "Salem looks like the answer because it is the most religious-sounding event on the list. Dramatic religious violence is evidence of strain, not of indifference; the boring administrative change is the real evidence.",
    explanation: "By the 1660s, second-generation New Englanders were not converting in the numbers their parents had, and the churches faced a membership problem. The Halfway Covenant solved it by lowering the bar — which is exactly why historians cite it.",
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
    id: 'L6-q1', difficulty: 2, skill: 'Analyzing sources', stimulus: L6_PENN_FRAME,
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
    id: 'L6-q2', difficulty: 2, skill: 'Causation',
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
    id: 'L6-q3', difficulty: 2, skill: 'Causation',
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
    id: 'L6-q4', difficulty: 1, skill: 'Causation',
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
    id: 'L6-q5', difficulty: 1, skill: 'Contextualization',
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
  {
    id: 'L6-h1', difficulty: 3, skill: 'Causation',
    prompt: "South Carolina’s slave code was the harshest on the mainland almost from its founding. The best explanation is that the colony:",
    options: [
      "Was settled largely from Barbados by planters who arrived with an existing slave system, and soon held a Black majority",
      "Grew rice, which is simply more difficult to cultivate than tobacco",
      "Was founded later than Virginia and so had more time to develop detailed law",
      "Was pressured into severity by Georgia, which had banned slavery at its founding",
    ],
    correctIndex: 0,
    optionWhy: [
      "Both halves do work: the code was imported ready-made from a sugar island, and a Black majority by about 1708 made enslavers exceptionally fearful of revolt.",
      "True that rice was demanding, but difficulty of cultivation does not by itself produce legal severity. This names a real fact and the wrong mechanism.",
      "Backwards: South Carolina (1670) was settled after Virginia but codified slavery far faster, because it did not have to invent the system.",
      "False on chronology and direction — Georgia was chartered in 1732, decades later, and its ban collapsed under pressure from the South Carolina model, not the reverse.",
    ],
    hints: [
      "Ask where the colonists came from, not only what they grew. Settlers bring institutions with them.",
      "A legal code that appears fully formed at founding usually was not invented there. Which option explains where it came from?",
      "One option offers a true fact about rice with a mechanism that does not follow. Check that each option connects its cause to its effect.",
    ],
    trap: "\"Rice was harder\" sounds like an economic explanation and economic explanations are usually right in this unit — but the link from crop difficulty to legal harshness is missing. The demography and the Barbadian transplant supply the actual mechanism.",
    explanation: "Carolina was in effect colonised from Barbados, and its 1696 code was adapted from the Barbadian one. Add a Black majority by roughly 1708 and you get both the severity and, later, the ferocity of the response to Stono.",
  },
]

// ── Level 7 · The Atlantic World ────────────────────────
const L7_BURKE = {
  kind: 'excerpt',
  text: 'A wise and salutary neglect. Not having been born under the shadow of any power, the colonies have grown to a strength and a commerce that no other people ever reached in so short a space... it was the pattern of a wise and prudent conduct to let them govern themselves.',
  attribution: 'Edmund Burke, Speech on Conciliation with America, House of Commons, 1775 (adapted). Burke coined the phrase looking back on the policy Britain had abandoned.',
}
const L7_NAV = {
  kind: 'excerpt',
  text: 'No goods shall be imported into or exported out of any colony or plantation belonging to His Majesty... but in such ships as do truly belong to the people of England, Ireland or the plantations, and whereof the master and three fourths of the mariners at least are English.',
  attribution: 'Navigation Act, 1660 (adapted)',
}

export const L7_QUIZ = [
  {
    id: 'L7-q1', difficulty: 2, skill: 'Analyzing sources', stimulus: L7_NAV,
    prompt: 'The requirement described here served British mercantilist policy primarily by:',
    options: [
      'Reserving colonial trade and the shipping profits from it for British subjects rather than foreign rivals',
      'Forbidding the colonies to trade with one another',
      'Guaranteeing colonists the same prices as merchants in London',
      'Ending all taxation of colonial goods',
    ],
    correctIndex: 0,
    hint: 'Ask who is excluded by the rule, not who is included. Which nation\u2019s merchants lose the business?',
    explanation: 'Mercantilism treats wealth as finite: every cargo carried in a Dutch ship is wealth leaving the empire. Requiring English ships and crews kept the freight, the insurance and the middleman\u2019s cut inside the empire. Note it also built the New England shipbuilding industry, since colonial ships counted as English.',
  },
  {
    id: 'L7-q2', difficulty: 1, skill: 'Developments and processes',
    prompt: 'Under mercantilism, the colonies were expected to:',
    options: [
      'Supply raw materials to Britain and buy finished British manufactures in return',
      'Develop their own manufacturing to compete with Britain',
      'Trade freely with whichever European power offered the best price',
      'Pay for their own defence without any British military support',
    ],
    correctIndex: 0,
    hint: 'Draw the arrows. What flows toward London, and what flows back?',
    explanation: 'Raw materials out, manufactured goods in — with Britain capturing the profitable processing step. Parliament reinforced this by restricting colonial manufacturing directly (the Wool Act, Hat Act and Iron Act), which is worth naming as evidence rather than just asserting the theory.',
  },
  {
    id: 'L7-q3', difficulty: 1, skill: 'Analyzing sources', stimulus: L7_BURKE,
    prompt: 'Burke uses the phrase "salutary neglect" to describe a policy in which Britain:',
    options: [
      'Left the colonies largely to govern and trade as they pleased, enforcing its own laws only loosely',
      'Deliberately abandoned the colonies to foreign invasion',
      'Governed the colonies more tightly than any other European power governed its own',
      'Granted the colonies formal independence in matters of trade',
    ],
    correctIndex: 0,
    hint: '"Salutary" means beneficial. Beneficial neglect — neglect of what, and good for whom?',
    explanation: 'For decades Britain left the Navigation Acts loosely enforced and colonial assemblies largely alone, because the arrangement was profitable and the colonies were prospering. Colonists came to treat self-government and cheap smuggled goods as normal — which is exactly why enforcement after 1763 felt like a new tyranny rather than an old law.',
  },
  {
    id: 'L7-q4', difficulty: 2, skill: 'Causation',
    prompt: 'Smuggling was widespread in the colonies before 1763 chiefly because:',
    options: [
      'Enforcement was lax and colonial juries rarely convicted their neighbours, so the profit outweighed the risk',
      'The Navigation Acts had been formally repealed',
      'Britain had no navy capable of reaching North America',
      'Colonial merchants were forbidden to trade in any legal goods',
    ],
    correctIndex: 0,
    hint: 'The law existed. What was missing was the second half of any law.',
    explanation: 'Molasses from the French West Indies was cheaper than the British article, customs officials were few and often bribed, and local juries acquitted. When Britain later tried vice-admiralty courts without juries to fix this, colonists read it as a denial of the right to trial by jury.',
  },
  {
    id: 'L7-q5', difficulty: 3, skill: 'Comparison',
    prompt: 'Historians debate whether mercantilism helped or hurt the colonies. The strongest answer notes that it:',
    options: [
      'Did both — guaranteed markets, naval protection and a shipbuilding boom, while restricting manufacturing and forcing trade through British middlemen',
      'Hurt every colony equally and provided no benefit of any kind',
      'Was purely beneficial, which is why colonists never objected to it',
      'Had no measurable economic effect on the colonies at all',
    ],
    correctIndex: 0,
    hint: 'A question that says "historians debate" is asking you to hold two things at once.',
    explanation: 'Protected markets, Royal Navy protection and the fact that colonial ships counted as British were real benefits — New England\u2019s merchant fleet grew on them. The costs were restricted manufacturing, compelled middlemen and prices set elsewhere. Say both, then weigh them; that is what earns complexity.',
  },
  {
    id: 'L7-q6', difficulty: 2, skill: 'Continuity and change',
    prompt: 'The Dominion of New England (1686–89) matters to this story because it showed that:',
    options: [
      'When Britain did try to govern the colonies directly, colonists resisted and reasserted their assemblies',
      'Colonists preferred royal governors to their own elected assemblies',
      'Britain had permanently abandoned the idea of colonial self-government',
      'New England colonies had never possessed representative government',
    ],
    correctIndex: 0,
    hint: 'It consolidated the New England colonies, suspended their assemblies — and then what happened to it?',
    explanation: 'James II merged the northern colonies, suspended their assemblies and enforced the Navigation Acts. When the Glorious Revolution deposed him in 1688, colonists overthrew Governor Andros and the Dominion collapsed. Britain reverted to neglect — a rehearsal, eighty years early, for the crisis after 1763.',
  },
  {
    id: 'L7-h1', difficulty: 3, skill: 'Argumentation',
    prompt: "Which finding would most weaken the claim that salutary neglect was a deliberate British policy rather than simple administrative failure?",
    options: [
      "Customs posts were chronically under-staffed, riddled with bribery and three thousand miles from anyone who could supervise them",
      "Edmund Burke praised \"a wise and salutary neglect\" in a speech to the House of Commons",
      "Robert Walpole is said to have preferred to let colonial trade flourish unhindered",
      "Parliament passed a series of Navigation Acts regulating colonial trade in detail",
    ],
    correctIndex: 0,
    optionWhy: [
      "If enforcement failed because nobody could enforce it, then \"policy\" is a label applied afterward to what was really incapacity and distance. That is the cleanest attack on deliberateness.",
      "Points the other way — Burke describes it as wise conduct, which is evidence of intention. Note also that he was speaking in 1775, looking back.",
      "Also evidence FOR deliberateness: a first minister choosing not to enforce is a decision.",
      "Neutral on the question. Detailed laws on the books say nothing about whether the failure to enforce them was chosen or merely suffered.",
    ],
    hints: [
      "The dispute is about INTENT: was the lax enforcement chosen, or did it just happen? Sort the options by what they show about intent.",
      "Evidence of a decision — a minister’s preference, a statesman’s praise — supports deliberateness. What kind of evidence would suggest nobody decided anything?",
      "Two options are quotations that sound like evidence about policy, and both support the claim under attack rather than weakening it.",
    ],
    trap: "Famous quotations feel like strong evidence, so students grab them without checking direction. Burke and Walpole are the reason historians call it a policy at all — they are on the other side of this argument.",
    explanation: "Historians genuinely disagree here. \"Salutary neglect\" is Burke’s phrase from 1775, applied in retrospect; how much was deliberate restraint and how much was an under-funded customs service failing at distance is a live question. Knowing that a term is partly a later label is itself an AP-level move.",
  },
]

// ── Level 8 · The French & Indian War ───────────────────
const L8_PROCLAMATION = {
  kind: 'excerpt',
  text: 'And we do hereby strictly forbid... all our loving subjects from making any purchases or settlements whatever, or taking possession of any of the lands beyond the heads or sources of any of the rivers which fall into the Atlantic Ocean from the west or northwest... and we do hereby command all persons who have seated themselves upon such lands forthwith to remove themselves.',
  attribution: 'Royal Proclamation of 1763 (adapted)',
}
const L8_FRANKLIN = {
  kind: 'excerpt',
  text: 'That the said general government be administered by a President-General, to be appointed and supported by the crown; and a Grand Council, to be chosen by the representatives of the people of the several Colonies... who shall meet to consider matters of general concern, particularly defence and relations with the Indian nations.',
  attribution: 'Benjamin Franklin, the Albany Plan of Union, 1754 (adapted)',
}

export const L8_QUIZ = [
  {
    id: 'L8-q1', difficulty: 1, skill: 'Causation',
    prompt: 'The immediate cause of the French and Indian War was:',
    options: [
      'A collision between British colonial and French claims to the Ohio River valley',
      'A French invasion of New England towns',
      'Britain\u2019s attempt to tax the colonies to pay for earlier wars',
      'A dispute between Spain and Britain over Florida',
    ],
    correctIndex: 0,
    hint: 'Follow the land speculators and fur traders west. Where do the two empires actually touch?',
    explanation: 'Virginians (Washington among them) wanted the Ohio valley; France was building forts to link Canada to Louisiana; the Native nations living there wanted neither. Washington\u2019s defeat at Fort Necessity in 1754 started a war that spread to Europe as the Seven Years\u2019 War — a colonial dispute that grew into a global one.',
  },
  {
    id: 'L8-q2', difficulty: 2, skill: 'Analyzing sources', stimulus: L8_FRANKLIN,
    prompt: 'The Albany Plan of 1754 is significant chiefly because it:',
    options: [
      'Proposed intercolonial union for defence — and was rejected by every colonial assembly',
      'Was adopted immediately and governed the colonies through the war',
      'Called for immediate independence from Britain',
      'Was written by Parliament to tighten control over the colonies',
    ],
    correctIndex: 0,
    hint: 'Note who wrote it, what it asked for, and what happened to it. The last part is the point.',
    explanation: 'Franklin proposed a common council for defence and Indian relations; every assembly refused to surrender any of its own authority. The rejection shows how separate the colonies still felt in 1754 — which is the baseline that makes their cooperation a decade later so striking.',
  },
  {
    id: 'L8-q3', difficulty: 2, skill: 'Causation',
    prompt: 'Most Native nations that took sides in the war allied with France because:',
    options: [
      'France wanted trade and posts, while British colonists wanted farmland their settlement would take',
      'France had a far larger colonial population than Britain',
      'Britain had refused to trade with any Native nation',
      'France promised to grant them representation in the French government',
    ],
    correctIndex: 0,
    hint: 'Same logic as Level 3. Which empire\u2019s victory costs you your land?',
    explanation: 'Fur traders are neighbours; farm families are a front line. Most nations backed France, while the Iroquois Confederacy mostly leaned British or stayed neutral. Native nations acted on their own strategic interests — never write them as pawns of either empire.',
  },
  {
    id: 'L8-q4', difficulty: 1, skill: 'Developments and processes',
    prompt: 'By the Treaty of Paris of 1763, France:',
    options: [
      'Surrendered Canada and its claims east of the Mississippi, effectively ending its North American empire',
      'Gained Canada while ceding the Caribbean to Britain',
      'Kept the Ohio valley but lost Louisiana to Spain',
      'Was expelled from the Americas entirely, including the Caribbean',
    ],
    correctIndex: 0,
    hint: 'Britain took the mainland. France kept its sugar islands, which it valued more than furs.',
    explanation: 'Britain took Canada and everything east of the Mississippi; Spain (France\u2019s ally) gave up Florida and received Louisiana in compensation. France retained its profitable Caribbean sugar islands. The strategic consequence is the one that matters: with France gone from the mainland, the colonists no longer needed British protection.',
  },
  {
    id: 'L8-q5', difficulty: 2, skill: 'Analyzing sources', stimulus: L8_PROCLAMATION,
    prompt: 'Colonists objected to this proclamation mainly because it:',
    options: [
      'Closed to settlement the western land many had just fought a war to secure',
      'Imposed a direct tax on land purchases in the colonies',
      'Handed the Ohio valley back to France',
      'Required colonial assemblies to be dissolved',
    ],
    correctIndex: 0,
    hint: 'Ask what a Virginia veteran or land speculator expected as the reward for winning.',
    explanation: 'Britain drew the line to prevent another costly Native war after Pontiac\u2019s uprising — a defensible aim. But colonists had understood the war as opening the west, and speculators (Washington included) held claims beyond the line. Most simply ignored it, which taught them that British authority could be ignored.',
  },
  {
    id: 'L8-q6', difficulty: 2, skill: 'Causation',
    prompt: 'The most important long-term consequence of the war for Britain\u2019s relationship with its colonies was that:',
    options: [
      'An enormous war debt ended salutary neglect, as Britain began taxing and enforcing in earnest',
      'Britain granted the colonies representation in Parliament',
      'Britain withdrew all troops from North America',
      'The colonies were left with no defence against Native nations',
    ],
    correctIndex: 0,
    hint: 'Britain won. What does winning a world war cost, and who did Parliament think should help pay?',
    explanation: 'The national debt roughly doubled, and keeping ten thousand troops in America cost more still. Parliament concluded the colonies should contribute: Sugar Act 1764, Stamp Act 1765, and real customs enforcement. To colonists used to running themselves, that was not a new bill — it was an attack on rights they already held.',
  },
  {
    id: 'L8-q7', difficulty: 2, skill: 'Continuity and change',
    prompt: 'The war also changed how colonists and British officials saw each other, in that:',
    options: [
      'Colonists gained military confidence and a sense of common cause, while British officers came away contemptuous of colonial troops',
      'Both sides emerged with a deepened respect for one another',
      'Colonists concluded they could not survive without British troops',
      'British officials decided colonial assemblies should be given more power',
    ],
    correctIndex: 0,
    hint: 'Two impressions formed, and they pointed in opposite directions.',
    explanation: 'Colonists fought together, saw British regulars up close and grew confident; British officers thought colonial militia undisciplined and colonial merchants disloyal for trading with the enemy. Mutual contempt plus a debt plus a removed French threat is the combination that makes 1765 explosive.',
  },
  {
    id: 'L8-q8', difficulty: 2, skill: 'Contextualization',
    prompt: 'Pontiac\u2019s War (1763) is best understood as:',
    options: [
      'Native resistance to British occupation of former French posts and to colonial settlement pressing west',
      'A French attempt to reconquer Canada',
      'A revolt of colonial settlers against the Proclamation Line',
      'A conflict between the Iroquois and the Cherokee over hunting grounds',
    ],
    correctIndex: 0,
    hint: 'When France left, the balance Native nations had played between two empires disappeared. What follows?',
    explanation: 'With France gone, Britain stopped the gift-giving diplomacy Native nations expected and settlers pushed west. A coalition under Pontiac took most British posts west of the Appalachians. The Proclamation of 1763 was Britain\u2019s response — which is why the war and the line belong in the same sentence.',
  },
  {
    id: 'L8-h1', difficulty: 3, skill: 'Argumentation',
    prompt: "Which finding would most strengthen the argument that the Proclamation of 1763 was a practical response to frontier war rather than an attempt to punish the colonies?",
    options: [
      "It was drafted within months of Pontiac’s uprising and justified in terms of preventing further conflict with Native nations",
      "Colonists across the backcountry ignored the line and settled beyond it anyway",
      "George Washington and other prominent Virginians held land claims west of the line",
      "Parliament imposed the Stamp Act on the colonies two years later",
    ],
    correctIndex: 0,
    optionWhy: [
      "Timing plus stated rationale is exactly what an argument about motive needs: the measure follows the crisis immediately and is explained by it.",
      "About colonial compliance, not about British intent. How a policy was received says nothing about why it was made.",
      "Evidence about why colonists resented it — which is the argument on the other side of this question.",
      "A later and separate measure. It might suggest a pattern of imposition, so if anything it leans toward the punishment reading.",
    ],
    hints: [
      "The argument is about British MOTIVE. Evidence about colonial reaction is on a different subject.",
      "To show a measure was a response to an event, look at timing and stated purpose — did it follow the crisis, and was it explained by it?",
      "Two options are about what colonists thought or did. Those are excellent evidence for a different claim, and no evidence at all for this one.",
    ],
    trap: "Every colonist-focused option feels relevant because the Proclamation is remembered through colonial anger. The question asked about British intent, and intent is shown by timing, drafting and stated aims.",
    explanation: "Britain was broke and had just watched a Native coalition take most of its western posts. Separating settlers from Native nations was cheaper than garrisoning a frontier — which is why the same document reads as prudence in London and betrayal in Virginia.",
  },
]

// ── Level 9 · No Taxation Without Representation ────────
const L9_STAMP_CONGRESS = {
  kind: 'excerpt',
  text: 'That His Majesty’s subjects in these colonies are entitled to all the inherent rights and liberties of his natural born subjects within the kingdom of Great Britain.\nThat it is inseparably essential to the freedom of a people, and the undoubted right of Englishmen, that no taxes be imposed on them but with their own consent, given personally or by their representatives.',
  attribution: 'Declarations of the Stamp Act Congress, New York, October 1765 (adapted)',
}
const L9_DECLARATORY = {
  kind: 'excerpt',
  text: 'That the said colonies and plantations in America have been, are, and of right ought to be, subordinate unto and dependent upon the imperial crown and parliament of Great Britain; and that the King’s Majesty... had, hath, and of right ought to have, full power and authority to make laws and statutes of sufficient force and validity to bind the colonies and people of America in all cases whatsoever.',
  attribution: 'The Declaratory Act, passed by Parliament in 1766 on the same day the Stamp Act was repealed (adapted)',
}
const L9_REVERE = {
  kind: 'image',
  text: 'Description of the print (the image itself is not reproduced here): a line of British soldiers stands in formation, firing in unison on the command of an officer whose sword is raised. Facing them is a loose crowd of unarmed townspeople; several lie bleeding on the ground. A dog stands in the foreground. Above the soldiers, a building is labelled "Butcher’s Hall." Verses beneath describe "fierce barbarians grinning o’er their prey."',
  attribution: 'Paul Revere, "The Bloody Massacre perpetrated in King Street," engraving, Boston, 1770',
}

export const L9_QUIZ = [
  {
    id: 'L9-q1', difficulty: 2, skill: 'Analyzing sources', stimulus: L9_STAMP_CONGRESS,
    prompt: 'The delegates’ argument rests on the claim that:',
    options: [
      'As Englishmen they could be taxed only by representatives they had actually elected',
      'Colonists owed no obedience to any act of Parliament',
      'The colonies should be granted immediate independence',
      'Taxes were acceptable so long as the rates remained low',
    ],
    correctIndex: 0,
    hints: [
      "The question asks what the delegates’ argument RESTS ON — its foundation, not its tone or its consequences.",
      "Their claim is conditional on identity: we are Englishmen, therefore English constitutional rules apply to us. Find the option that keeps both halves.",
      "One option overstates into refusing Parliament entirely, and one drifts into independence. In 1765 colonists are claiming rights INSIDE the empire — anything stronger is a later position read backwards.",
    ],
    optionWhy: [
      "Exactly the two-step argument in the text: we hold the rights of natural-born Englishmen, and one of those rights is that taxes require consent through elected representatives.",
      "Too strong. The delegates accepted Parliament’s authority to regulate imperial trade; it was taxation without consent they denied. Overstating the colonial position is the classic error here.",
      "Eleven years too early. These delegates petitioned the King as loyal subjects; nothing in the text points toward separation.",
      "The opposite of what they argue. Their objection is constitutional and is indifferent to the rate — which is why a cheaper tax two years later provoked the same response.",
    ],
    trap: "Students pick the strongest-sounding anti-British option. In 1765 the colonial argument was narrow and legalistic on purpose — the delegates wanted to be recognised as Englishmen, not to be released from the empire.",
    explanation: 'This is the whole colonial case in two sentences: we are Englishmen, and Englishmen are not taxed without consent given through their own representatives. Note what it does not say — not independence, not even a refusal to obey Parliament generally. In 1765 colonists were claiming rights inside the empire, not leaving it.',
  },
  {
    id: 'L9-q2', difficulty: 2, skill: 'Developments and processes',
    prompt: 'The Stamp Act of 1765 provoked far more resistance than the Sugar Act of 1764 mainly because it:',
    options: [
      'Was a direct tax on everyday paper goods, falling visibly on nearly everyone including printers and lawyers',
      'Raised far more revenue than any previous measure',
      'Applied only to the New England colonies',
      'Had been passed without the King’s approval',
    ],
    correctIndex: 0,
    hints: [
      "Both acts raised revenue, so the answer is about the FORM the tax took and who felt it, not about which raised more money.",
      "A trade duty is paid by importers at the water’s edge and buried in a price. A stamp tax is paid at the counter by whoever buys the paper. Who notices each one?",
      "One option is about revenue totals — a plausible-sounding measure that has nothing to do with why people took to the streets.",
    ],
    optionWhy: [
      "Visibility plus reach. Everyone buying a newspaper, deed, licence or pack of cards paid it — and printers and lawyers, who paid most, were the people best equipped to organise and publicise resistance.",
      "False, and beside the point: the Stamp Act was not projected to raise the largest sums. Amount was never the driver of the protest.",
      "False. It applied to all the colonies, which is precisely why nine of them could send delegates to a common congress.",
      "False. Royal assent was given as usual — and a procedural irregularity was never the colonial complaint.",
    ],
    trap: "\"It raised more money\" feels like a serious answer because it sounds quantitative. The Stamp Act mattered because of who paid it and how visibly — a distributional fact, not a fiscal one.",
    explanation: 'A duty on imported sugar is paid by merchants and hidden in a price; a stamp tax is paid at the counter by anyone buying a newspaper, a deed, a licence or a deck of cards. It also fell hardest on printers and lawyers — the two groups best placed to organise a protest and publicise it.',
  },
  {
    id: 'L9-q3', difficulty: 2, skill: 'Comparison',
    prompt: 'Parliament defended taxing the colonies with the doctrine of "virtual representation," which held that:',
    options: [
      'Members of Parliament represented the interests of all British subjects, whether or not those subjects could vote for them',
      'Colonies would be granted their own seats in Parliament once the debt was repaid',
      'Colonial assemblies were legally part of Parliament',
      'Only property owners anywhere in the empire needed representation',
    ],
    correctIndex: 0,
    hints: [
      "Define the doctrine before judging the options: whose interests did Parliament claim to represent, and did electing anyone matter to that claim?",
      "Britain’s own system is the key: whole cities like Manchester elected no member at all, and Parliament still claimed to represent them.",
      "One option describes what colonists supposedly wanted — seats at Westminster. Most did not want that, and it was never what \"virtual representation\" meant.",
    ],
    optionWhy: [
      "The doctrine exactly: a member sat for the whole empire’s interests, so colonists were represented whether or not any of them had voted.",
      "Never offered and never the doctrine. Actual colonial seats were floated only at the margins and wanted by almost nobody on either side.",
      "False. Colonial assemblies were separate bodies — the colonial argument was that they, not Parliament, held the taxing power.",
      "A description of the property franchise, not of virtual representation. Related vocabulary, different concept.",
    ],
    trap: "Students remember that colonists said \"no taxation without representation\" and conclude they wanted representation in Parliament. They wanted the opposite: their own assemblies recognised as the only bodies that could tax them.",
    explanation: 'Whole English cities had no members, so Parliament argued that members served the interests of the entire empire regardless of who elected them. Colonists rejected this flatly: representation meant someone you chose and could vote out. Watch for the trap of writing that colonists wanted seats in Parliament — most did not; they wanted their own assemblies recognised.',
  },
  {
    id: 'L9-q4', difficulty: 3, skill: 'Analyzing sources', stimulus: L9_DECLARATORY,
    prompt: 'Passing this act alongside the repeal of the Stamp Act shows that Parliament:',
    options: [
      'Retreated on the particular tax while insisting its authority over the colonies was unlimited',
      'Accepted that it had no right to legislate for the colonies',
      'Had decided to grant the colonies representation in Parliament',
      'Intended never to tax the colonies again in any form',
    ],
    correctIndex: 0,
    hints: [
      "Two acts pass on the same day. The question asks what passing BOTH reveals about Parliament’s position.",
      "Separate the specific measure from the underlying claim of authority. Which one did Parliament give up, and which did it restate?",
      "The tempting wrong answer treats repeal as surrender. Read what the second act actually claims before deciding who conceded what.",
    ],
    optionWhy: [
      "Precisely the manoeuvre: withdraw the tax under commercial pressure, and simultaneously enact a claim to unlimited legislative authority so that nothing of principle is conceded.",
      "The reverse of the text. The Declaratory Act asserts full authority \"in all cases whatsoever\" — it concedes nothing.",
      "Not on the table. Representation at Westminster was never Parliament’s offer nor the colonies’ demand.",
      "Contradicted within two years by the Townshend duties — and nothing in the Declaratory Act promises restraint.",
    ],
    trap: "Repeal looks like a colonial victory, and colonists celebrated it as one. The act passed the same day is the reason the quarrel resumed almost immediately — reading only the good news is the trap.",
    explanation: 'Colonists celebrated the repeal and largely ignored the Declaratory Act — which had conceded nothing and claimed the power to bind them "in all cases whatsoever." The constitutional gap was never closed, only papered over, which is why the Townshend duties reopened it a year later.',
  },
  {
    id: 'L9-q5', difficulty: 2, skill: 'Causation',
    prompt: 'Non-importation agreements were an effective form of colonial protest chiefly because they:',
    options: [
      'Hurt British merchants, who then pressured Parliament to repeal the taxes',
      'Prevented the Royal Navy from entering colonial ports',
      'Deprived the British government of its main source of revenue',
      'Were enforced by colonial courts with heavy penalties',
    ],
    correctIndex: 0,
    hints: [
      "Ask what leverage colonists actually possessed. They could not vote in Britain and could not lobby Parliament directly.",
      "A boycott works by creating a domestic constituency for repeal inside Britain. Who in Britain lost money, and what could those people do that colonists could not?",
      "Two options describe effects boycotts did not have — on the navy and on government revenue. Check whether each mechanism is even plausible before judging its importance.",
    ],
    optionWhy: [
      "The mechanism exactly: lost colonial orders hurt British merchants and manufacturers, who then petitioned Parliament — supplying the political pressure colonists themselves could not apply.",
      "Confuses a boycott with a blockade. Non-importation was a refusal to buy, not a closing of ports, and the Royal Navy came and went freely.",
      "False. Colonial duties were a small share of British revenue; the pressure was political, not fiscal.",
      "Backwards. Enforcement came from committees, crowds and public shaming, not from courts — colonial courts had no authority over a private decision not to buy.",
    ],
    trap: "The question is about MECHANISM. Several options describe impressive-sounding damage; only one describes a chain that actually connects a colonial decision to a vote in Parliament.",
    explanation: 'Boycotts turned British merchants and manufacturers into a lobby for repeal — and both the Stamp Act and most Townshend duties were repealed under that pressure. They also politicised colonial households, since refusing British cloth and tea made women’s decisions part of the resistance.',
  },
  {
    id: 'L9-q6', difficulty: 3, skill: 'Analyzing sources', stimulus: L9_REVERE,
    prompt: 'This print is most useful to a historian as evidence of:',
    options: [
      'How Patriot leaders shaped public opinion, rather than as an accurate record of the event',
      'The precise sequence of events on the night of 5 March 1770',
      'British military tactics used in colonial cities',
      'Widespread colonial support for independence in 1770',
    ],
    correctIndex: 0,
    hints: [
      "Note the phrasing: \"most useful as evidence OF.\" A source can be inaccurate and still be first-rate evidence — of something else.",
      "The rule: a distorted source is excellent evidence for the distortion, and poor evidence for the events it distorts.",
      "The trap is answering as though \"biased\" meant \"useless.\" Ask instead what this object proves simply by existing and circulating.",
    ],
    optionWhy: [
      "The print is a masterpiece of persuasion and a poor record of events — so it is most useful for how Patriots shaped opinion, which is what it directly demonstrates.",
      "The weakest use of this source. Adams defended the soldiers successfully; the courtroom evidence and the engraving do not match.",
      "Not what the image shows. There were no tactics on display worth studying — that framing treats propaganda as documentation.",
      "False as history: in 1770 support for independence was negligible, and a print about a street confrontation could not establish it anyway.",
    ],
    trap: "Sourcing questions are not asking whether a document is reliable in general. They are asking what THIS document is good evidence for — and a piece of propaganda is superb evidence about the propagandist.",
    explanation: 'The engraving shows disciplined troops firing on command into defenceless civilians. The reality was a chaotic confrontation with a jeering crowd throwing snowballs and debris — John Adams defended the soldiers in court and most were acquitted. Revere’s print is superb evidence of propaganda and of how the event was used, which is exactly the sourcing distinction the DBQ tests.',
  },
  {
    id: 'L9-q7', difficulty: 2, skill: 'Continuity and change',
    prompt: 'Between 1765 and 1770 the usual colonial response to a new tax moved through which sequence?',
    options: [
      'Petition and constitutional argument, then organised boycott, then crowd action and intimidation',
      'Armed rebellion first, followed by petitions once fighting failed',
      'Immediate demands for independence, then negotiation',
      'Quiet compliance, followed by appeals to the French for support',
    ],
    correctIndex: 0,
    hints: [
      "You are being asked for a PATTERN across five years, not for the single most dramatic event in them.",
      "Trace the tools colonists reached for in order: words first, then money, then bodies. Each step came after the previous one failed.",
      "One option inserts independence into a decade when almost nobody wanted it. Check any option that mentions independence against the date.",
    ],
    optionWhy: [
      "The actual escalation: resolutions and petitions claiming English rights, then non-importation, then crowds making enforcement impossible. Each step follows the failure of the one before.",
      "Inverted. Armed rebellion is 1775; the petitions came first and continued right through the fighting.",
      "False on the chronology. Independence had almost no support before 1775, and there was no negotiation to follow it.",
      "False on both halves. There was no quiet compliance, and the French alliance is 1778 — after independence, not before.",
    ],
    trap: "Two options sound revolutionary and one of them may feel right because you know how the story ends. The pattern question rewards putting yourself in 1767, when nobody knew.",
    explanation: 'Colonists escalated: resolutions and petitions claiming the rights of Englishmen, then economic pressure through non-importation, then the Sons of Liberty making it physically impossible to enforce the law. Independence is not on this list — in 1770 almost nobody wanted it.',
  },
]

// ── Level 10 · From Protest to Independence ─────────────
const L10_COMMON_SENSE = {
  kind: 'excerpt',
  text: 'Everything that is right or reasonable pleads for separation. The blood of the slain, the weeping voice of nature cries, TIS TIME TO PART... There is something absurd in supposing a continent to be perpetually governed by an island. In England a king hath little more to do than to make war and give away places; which in plain terms is to impoverish the nation and set it together by the ears.',
  attribution: 'Thomas Paine, Common Sense, January 1776 (adapted)',
}
const L10_DECLARATION = {
  kind: 'excerpt',
  text: 'We hold these truths to be self-evident, that all men are created equal, that they are endowed by their Creator with certain unalienable Rights, that among these are Life, Liberty and the pursuit of Happiness. That to secure these rights, Governments are instituted among Men, deriving their just powers from the consent of the governed. That whenever any Form of Government becomes destructive of these ends, it is the Right of the People to alter or to abolish it.',
  attribution: 'The Declaration of Independence, 4 July 1776',
}
const L10_DUNMORE = {
  kind: 'excerpt',
  text: 'I do hereby further declare all indented servants, Negroes, or others (appertaining to Rebels) free, that are able and willing to bear arms, they joining His Majesty’s troops, as soon as may be, for the more speedily reducing this colony to a proper sense of their duty to His Majesty’s crown and dignity.',
  attribution: 'Lord Dunmore, royal governor of Virginia, November 1775 (adapted)',
}

export const L10_QUIZ = [
  {
    id: 'L10-q1', difficulty: 3, skill: 'Causation',
    prompt: 'Colonists objected to the Tea Act of 1773 even though it made tea cheaper, because the act:',
    options: [
      'Preserved the tax on tea and handed the East India Company a monopoly on selling it',
      'Banned the drinking of tea in the colonies',
      'Imposed the first direct tax ever levied on the colonies',
      'Required all tea to be purchased from French merchants',
    ],
    correctIndex: 0,
    hints: [
      "Start from the fact that makes this question famous: the Tea Act made tea CHEAPER. Any answer resting on cost is already gone.",
      "Ask what buying the cheap tea would have meant in practice. The duty was still attached to it — so what does paying it concede?",
      "The trap is assuming a protest must be about price. Here the protest is precisely against an attractive offer, because accepting it settles the constitutional question by default.",
    ],
    optionWhy: [
      "Both halves matter: the Townshend duty stayed attached, so buying conceded the right to tax; and the monopoly cut colonial merchants and smugglers out of the trade entirely.",
      "False — no such ban existed, and colonists went on drinking smuggled tea throughout.",
      "False. The first direct tax was the Stamp Act, eight years earlier, and the tea duty was an external trade duty.",
      "False, and backwards: the act favoured the British East India Company, not French merchants.",
    ],
    trap: "\"They dumped the tea because it was too expensive\" is the single most common misconception about 1773. The tea was cheap, and that was the problem — a bargain that would have been accepted, and acceptance would have conceded the principle.",
    explanation: 'Buying the cheap tea meant paying the Townshend duty and conceding Parliament’s right to levy it; the monopoly also cut out colonial merchants and smugglers. This is a favourite exam question precisely because the cheaper price makes the protest look irrational until you see the principle.',
  },
  {
    id: 'L10-q2', difficulty: 2, skill: 'Causation',
    prompt: 'Britain’s response to the Boston Tea Party — the Coercive Acts of 1774 — backfired because the acts:',
    options: [
      'Punished Massachusetts so harshly that other colonies saw a threat to their own charters and rallied to its defence',
      'Were too mild to be taken seriously anywhere in the colonies',
      'Applied equally to every colony, so no colony felt singled out',
      'Granted Massachusetts a new elected government',
    ],
    correctIndex: 0,
    hints: [
      "The question asks why the acts BACKFIRED. Britain had a goal; name it, then ask what actually happened instead.",
      "The acts fell on one colony. Work out what the other twelve concluded about their own charters from watching Massachusetts lose its.",
      "One option claims the acts applied everywhere. Check that against what they actually did — the punishment was targeted, and that targeting is the point.",
    ],
    optionWhy: [
      "Rewriting the Massachusetts charter showed every colony that self-government was revocable by Parliament. A threat to one charter was a threat to all of them — so twelve colonies sent delegates.",
      "The opposite of the record. Colonists renamed them the Intolerable Acts and sent food and money to Boston; nobody thought them mild.",
      "False. They targeted Massachusetts specifically, which is exactly why the other colonies read them as a precedent rather than a shared burden.",
      "Backwards. The Massachusetts Government Act gutted the elected government — appointed council, restricted town meetings.",
    ],
    trap: "Students know these acts were harsh and grab the harshest-sounding option. The question is about the MECHANISM of unity: not that the punishment was severe, but that it was a precedent every other colony could see being set.",
    explanation: 'Closing Boston’s port, gutting the Massachusetts charter and moving trials to England showed every colony that its own government could be dissolved by Parliament. Instead of isolating Massachusetts, the acts produced the First Continental Congress — colonists called them the Intolerable Acts.',
  },
  {
    id: 'L10-q3', difficulty: 2, skill: 'Developments and processes',
    prompt: 'The First Continental Congress (1774) chose to:',
    options: [
      'Petition the King, assert colonial rights, and organise a comprehensive boycott — while stopping well short of independence',
      'Declare independence from Great Britain',
      'Raise a standing army and appoint Washington as its commander',
      'Accept the Coercive Acts in exchange for the reopening of Boston harbour',
    ],
    correctIndex: 0,
    hints: [
      "Date discipline first. This is 1774 — before Lexington, before Common Sense, before the Declaration.",
      "The Congress did two kinds of thing: it made constitutional claims and petitioned, and it built an enforcement apparatus. The best answer will contain both, and stop short of independence.",
      "Two options describe things the SECOND Continental Congress did in 1775. Check which Congress each belongs to before choosing.",
    ],
    optionWhy: [
      "Exactly 1774: the Declaration and Resolves, a petition to the King, and the Continental Association enforcing non-importation through local committees — loyal language, serious machinery, no independence.",
      "Two years early. Independence is July 1776, and by then a great deal had changed.",
      "Belongs to the Second Continental Congress in 1775, which created the Continental Army under Washington.",
      "Backwards — and the Congress had no power to accept anything of the kind. It demanded repeal.",
    ],
    trap: "The two Continental Congresses blur together under one remembered name. Anchor them separately: First (1774) = resolves, petition, boycott. Second (1775) = army, Olive Branch Petition, then the Declaration.",
    explanation: 'The Congress issued a Declaration and Resolves, petitioned the King and created the Continental Association to enforce non-importation. Delegates still wanted redress within the empire. Reading 1776 backwards into 1774 is one of the most common errors in this unit.',
  },
  {
    id: 'L10-q4', difficulty: 2, skill: 'Analyzing sources', stimulus: L10_COMMON_SENSE,
    prompt: 'Common Sense changed the debate in 1776 principally because it:',
    options: [
      'Attacked monarchy itself in plain language, making independence thinkable for ordinary readers',
      'Was the first publication to object to parliamentary taxation',
      'Proposed a detailed constitution for a future United States',
      'Argued that reconciliation with Britain remained possible',
    ],
    correctIndex: 0,
    hints: [
      "The question asks how Common Sense changed the DEBATE — what argument became available that had not been before.",
      "Until January 1776 colonists blamed Parliament and the ministers while professing loyalty to the King. Paine moved the target. To what?",
      "Two options are simply false about the pamphlet — it was neither a constitutional blueprint nor an argument for reconciliation. Beware options that sound like reasonable things a famous pamphlet might contain.",
    ],
    optionWhy: [
      "Paine attacked hereditary monarchy itself, in prose written for a tavern rather than a courtroom, and sold in enormous numbers. That made separation thinkable to people who had never questioned the King.",
      "False. Objections to parliamentary taxation had been in print since 1764 — Dickinson’s Letters alone predate Paine by eight years.",
      "False. Common Sense is a polemic, not a plan of government; constitution-drafting comes later.",
      "The opposite of its argument. Paine held reconciliation to be absurd — \"TIS TIME TO PART.\"",
    ],
    trap: "Students remember Common Sense as \"important\" without remembering its specific move. The move was shifting blame from Parliament to monarchy as an institution — which is what made independence, rather than redress, the obvious remedy.",
    explanation: 'Until Paine, colonists blamed Parliament and bad ministers while professing loyalty to the King. Common Sense attacked hereditary monarchy as absurd on principle, in language written for a tavern rather than a courtroom, and sold enormously. It moved independence from unthinkable to obvious in six months.',
  },
  {
    id: 'L10-q5', difficulty: 2, skill: 'Analyzing sources', stimulus: L10_DECLARATION,
    prompt: 'The passage draws most directly on the political philosophy of:',
    options: [
      'John Locke, particularly natural rights and government by consent, with a right of revolution when consent is violated',
      'Thomas Hobbes, who argued that subjects could never lawfully resist a sovereign',
      'Mercantilist economic writers of the seventeenth century',
      'Puritan covenant theology as practised in Massachusetts Bay',
    ],
    correctIndex: 0,
    hints: [
      "The question asks whose political philosophy the passage draws on, so work from the ideas in the text, not from the document’s fame.",
      "Rights that exist before government, government created by consent to protect them, and a right to replace it when it fails — that combination belongs to one thinker.",
      "One option names a philosopher who argued the exact opposite about resistance. Recognising a name is not the same as recognising an argument.",
    ],
    optionWhy: [
      "Locke throughout: natural rights, government by consent, and dissolution when government turns destructive. Jefferson substitutes \"the pursuit of Happiness\" for Locke’s \"property.\"",
      "Hobbes argued subjects could not lawfully resist a sovereign — the reverse of this passage’s conclusion.",
      "Covenant theology binds a community to God and to each other; it is not a theory of natural rights held by individuals against a government.",
      "Mercantilism is an economic doctrine about trade and national wealth. Nothing in this passage concerns either.",
    ],
    trap: "Hobbes and Locke sit together in memory as \"the social contract philosophers,\" and students pick whichever name surfaces first. They reached opposite conclusions about the right to resist — which is the whole point of the passage.",
    explanation: 'Locke argued that government exists by consent to protect natural rights and may be replaced when it fails. Jefferson’s "pursuit of Happiness" adapts Locke’s "property." The Declaration then lists grievances against the King, not Parliament — by 1776 the argument had moved past Parliament entirely.',
  },
  {
    id: 'L10-q6', difficulty: 3, skill: 'Analyzing sources', stimulus: L10_DUNMORE,
    prompt: 'Dunmore’s proclamation is best understood as:',
    options: [
      'A military measure to weaken Patriot planters, which also exposed the contradiction between Patriot liberty and slavery',
      'An early British commitment to abolishing slavery throughout the empire',
      'An offer of freedom to every enslaved person in the colonies',
      'A policy that enslaved Virginians almost entirely ignored',
    ],
    correctIndex: 0,
    hints: [
      "Read the conditions in the proclamation closely before judging its meaning: whose enslaved people, and what must they do to qualify?",
      "A measure that frees only the enslaved people of your ENEMIES, and only those who will fight for you, is a weapon of war rather than a policy about slavery.",
      "The trap is treating a limited wartime offer as either abolition or an empty gesture. Both overshoot — hold the two truths together.",
    ],
    optionWhy: [
      "Both halves are right: militarily it aimed to strip rebel planters of labour, and rhetorically it forced the contradiction in the Patriot cause into the open.",
      "False. Britain did not abolish the slave trade until 1807 or slavery in most colonies until the 1830s, and this document is about Virginia in wartime.",
      "False on the text. It covered those held by rebels, not Loyalists, and only men able to bear arms.",
      "False. Thousands took the risk — some reaching British lines, many dying of disease in the attempt. Treating them as passive misses the most important thing here.",
    ],
    trap: "The two easy readings are \"Britain freed the slaves\" and \"it was meaningless propaganda.\" Both are wrong. It was a narrow war measure with enormous consequences for the people who acted on it and for the rhetoric of liberty.",
    explanation: 'The offer applied only to those held by rebels and only to men able to bear arms — a war measure, not abolition. Thousands nonetheless risked everything to reach British lines. It also enraged planters and sharpened the question that hangs over the Declaration: what "all men are created equal" meant in a society holding half a million people in slavery.',
  },
  {
    id: 'L10-q7', difficulty: 2, skill: 'Continuity and change',
    prompt: 'Colonial opinion shifted decisively toward independence between April 1775 and July 1776 because:',
    options: [
      'Fighting had already begun, the King rejected the Olive Branch Petition and declared the colonies in rebellion, and Common Sense reframed the argument',
      'France had promised an alliance if the colonies declared independence first',
      'The Continental Congress had always intended to declare independence in 1776',
      'Parliament repealed the Coercive Acts, which colonists read as weakness',
    ],
    correctIndex: 0,
    hints: [
      "The window is April 1775 to July 1776 — fifteen months. The answer must be about what happened INSIDE that window.",
      "Three things stack up: blood is shed, the King refuses the last petition and declares rebellion, and Paine reframes the target. Find the option holding all three.",
      "One option claims Congress intended independence all along, which contradicts the Olive Branch Petition of July 1775. Check every option against the documents colonists actually wrote.",
    ],
    optionWhy: [
      "The three causes together: fighting made neutrality untenable, the King’s refusal closed off redress, and Common Sense supplied a way to think about separation.",
      "Reversed. The French alliance follows independence — France signed in 1778, once there was a plausible winner to back.",
      "Contradicted by the Olive Branch Petition, which Congress sent in July 1775 asking for peace. Delegates were still hoping for redress after Lexington.",
      "False. Parliament did not repeal the Coercive Acts; it passed the Prohibitory Act, cutting off colonial trade.",
    ],
    trap: "Knowing that independence arrived makes it feel like it was always coming. The documents say otherwise, and the exam rewards students who can name the specific events that closed the middle ground.",
    explanation: 'Lexington and Concord made it a war; the King’s rejection of the Olive Branch Petition and the Prohibitory Act closed off reconciliation; Common Sense made separation seem natural rather than treasonous. Moderates who wanted redress in 1775 had run out of alternatives by mid-1776.',
  },
  {
    id: 'L10-q8', difficulty: 2, skill: 'Comparison',
    prompt: 'During the Revolution, colonists divided roughly into:',
    options: [
      'Patriots, Loyalists (perhaps a fifth of the population) and a large body of the uncommitted',
      'Patriots and Loyalists only, in almost equal halves',
      'A unanimous population that supported independence',
      'Loyalists in the North and Patriots in the South',
    ],
    correctIndex: 0,
    hints: [
      "The question asks how colonists DIVIDED — so the answer is about proportions, and about whether everyone chose a side at all.",
      "In most revolutions, a committed minority acts, a smaller minority opposes, and a large number try to keep their heads down. Which option allows for that third group?",
      "Two options assume everyone had a position. One also assumes the split ran along regional lines — test that against what you know about Loyalist strongholds.",
    ],
    optionWhy: [
      "The standard estimate, and it leaves room for the largest group of all: people who shifted with whichever army was nearby, or stayed out of it entirely.",
      "Overstates Loyalist numbers and, more importantly, erases the uncommitted — the group that made the war so bitter and so local.",
      "False. Loyalists were numerous enough to raise regiments, and tens of thousands left for Canada and Britain after 1783.",
      "False. Loyalist strength was concentrated in New York, the Carolina backcountry and among recent immigrants and officeholders — not neatly by region.",
    ],
    trap: "\"The colonists\" invites you to imagine one people making one decision. The safest habit for this whole unit is to ask, every time: which colonists, where, and what did the people who disagreed do?",
    explanation: 'Historians usually estimate Loyalists at 15–20%, committed Patriots a larger minority, and many colonists trying to stay out of it or shifting with whichever army was nearby. Most Native nations sided with Britain, which had tried to limit settlement; enslaved people sided with whoever offered freedom. "The colonists" is never one group.',
  },
]

const LEVEL_META = {
  1: { section: 'L1', icon: '🌽', label: 'Before Contact' },
  2: { section: 'L2', icon: '⛵', label: 'Contact & the Columbian Exchange' },
  3: { section: 'L3', icon: '🏴', label: 'Three Empires' },
  4: { section: 'L4', icon: '🚬', label: 'The Chesapeake' },
  5: { section: 'L5', icon: '⛪', label: 'New England' },
  6: { section: 'L6', icon: '🌾', label: 'Middle Colonies & Lower South' },
  7: { section: 'L7', icon: '🧭', label: 'The Atlantic World' },
  8: { section: 'L8', icon: '⚔️', label: 'The French & Indian War' },
  9: { section: 'L9', icon: '📜', label: 'No Taxation Without Representation' },
  10: { section: 'L10', icon: '🔔', label: 'From Protest to Independence' }
}

const BY_LEVEL = { 1: L1_QUIZ, 2: L2_QUIZ, 3: L3_QUIZ, 4: L4_QUIZ, 5: L5_QUIZ, 6: L6_QUIZ, 7: L7_QUIZ, 8: L8_QUIZ, 9: L9_QUIZ, 10: L10_QUIZ }

// Flattened and tagged, which is the shape the practice exam consumes.
export const LEVEL_QUESTIONS = Object.entries(BY_LEVEL).flatMap(([level, qs]) =>
  qs.map(q => ({ ...q, level: Number(level), ...LEVEL_META[level] }))
)

export function quizFor(level) {
  return BY_LEVEL[level] || []
}
