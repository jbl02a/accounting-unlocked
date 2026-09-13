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
    id: 'L7-q1', skill: 'Analyzing sources', stimulus: L7_NAV,
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
    id: 'L7-q2', skill: 'Developments and processes',
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
    id: 'L7-q3', skill: 'Analyzing sources', stimulus: L7_BURKE,
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
    id: 'L7-q4', skill: 'Causation',
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
    id: 'L7-q5', skill: 'Comparison',
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
    id: 'L7-q6', skill: 'Continuity and change',
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
    id: 'L8-q1', skill: 'Causation',
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
    id: 'L8-q2', skill: 'Analyzing sources', stimulus: L8_FRANKLIN,
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
    id: 'L8-q3', skill: 'Causation',
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
    id: 'L8-q4', skill: 'Developments and processes',
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
    id: 'L8-q5', skill: 'Analyzing sources', stimulus: L8_PROCLAMATION,
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
    id: 'L8-q6', skill: 'Causation',
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
    id: 'L8-q7', skill: 'Continuity and change',
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
    id: 'L8-q8', skill: 'Contextualization',
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
    id: 'L9-q1', skill: 'Analyzing sources', stimulus: L9_STAMP_CONGRESS,
    prompt: 'The delegates’ argument rests on the claim that:',
    options: [
      'As Englishmen they could be taxed only by representatives they had actually elected',
      'Colonists owed no obedience to any act of Parliament',
      'The colonies should be granted immediate independence',
      'Taxes were acceptable so long as the rates remained low',
    ],
    correctIndex: 0,
    hint: 'Read the second sentence twice. What exactly is "inseparably essential"?',
    explanation: 'This is the whole colonial case in two sentences: we are Englishmen, and Englishmen are not taxed without consent given through their own representatives. Note what it does not say — not independence, not even a refusal to obey Parliament generally. In 1765 colonists were claiming rights inside the empire, not leaving it.',
  },
  {
    id: 'L9-q2', skill: 'Developments and processes',
    prompt: 'The Stamp Act of 1765 provoked far more resistance than the Sugar Act of 1764 mainly because it:',
    options: [
      'Was a direct tax on everyday paper goods, falling visibly on nearly everyone including printers and lawyers',
      'Raised far more revenue than any previous measure',
      'Applied only to the New England colonies',
      'Had been passed without the King’s approval',
    ],
    correctIndex: 0,
    hint: 'Who has to buy stamped paper? And which of those people own a printing press or argue for a living?',
    explanation: 'A duty on imported sugar is paid by merchants and hidden in a price; a stamp tax is paid at the counter by anyone buying a newspaper, a deed, a licence or a deck of cards. It also fell hardest on printers and lawyers — the two groups best placed to organise a protest and publicise it.',
  },
  {
    id: 'L9-q3', skill: 'Comparison',
    prompt: 'Parliament defended taxing the colonies with the doctrine of "virtual representation," which held that:',
    options: [
      'Members of Parliament represented the interests of all British subjects, whether or not those subjects could vote for them',
      'Colonies would be granted their own seats in Parliament once the debt was repaid',
      'Colonial assemblies were legally part of Parliament',
      'Only property owners anywhere in the empire needed representation',
    ],
    correctIndex: 0,
    hint: 'Large English cities like Manchester elected nobody either. How did Parliament explain that?',
    explanation: 'Whole English cities had no members, so Parliament argued that members served the interests of the entire empire regardless of who elected them. Colonists rejected this flatly: representation meant someone you chose and could vote out. Watch for the trap of writing that colonists wanted seats in Parliament — most did not; they wanted their own assemblies recognised.',
  },
  {
    id: 'L9-q4', skill: 'Analyzing sources', stimulus: L9_DECLARATORY,
    prompt: 'Passing this act alongside the repeal of the Stamp Act shows that Parliament:',
    options: [
      'Retreated on the particular tax while insisting its authority over the colonies was unlimited',
      'Accepted that it had no right to legislate for the colonies',
      'Had decided to grant the colonies representation in Parliament',
      'Intended never to tax the colonies again in any form',
    ],
    correctIndex: 0,
    hint: 'One act gives something up; the other gives nothing up at all. Which one describes the principle?',
    explanation: 'Colonists celebrated the repeal and largely ignored the Declaratory Act — which had conceded nothing and claimed the power to bind them "in all cases whatsoever." The constitutional gap was never closed, only papered over, which is why the Townshend duties reopened it a year later.',
  },
  {
    id: 'L9-q5', skill: 'Causation',
    prompt: 'Non-importation agreements were an effective form of colonial protest chiefly because they:',
    options: [
      'Hurt British merchants, who then pressured Parliament to repeal the taxes',
      'Prevented the Royal Navy from entering colonial ports',
      'Deprived the British government of its main source of revenue',
      'Were enforced by colonial courts with heavy penalties',
    ],
    correctIndex: 0,
    hint: 'Colonists could not vote in Britain. What pressure could they apply on people who could?',
    explanation: 'Boycotts turned British merchants and manufacturers into a lobby for repeal — and both the Stamp Act and most Townshend duties were repealed under that pressure. They also politicised colonial households, since refusing British cloth and tea made women’s decisions part of the resistance.',
  },
  {
    id: 'L9-q6', skill: 'Analyzing sources', stimulus: L9_REVERE,
    prompt: 'This print is most useful to a historian as evidence of:',
    options: [
      'How Patriot leaders shaped public opinion, rather than as an accurate record of the event',
      'The precise sequence of events on the night of 5 March 1770',
      'British military tactics used in colonial cities',
      'Widespread colonial support for independence in 1770',
    ],
    correctIndex: 0,
    hint: 'Ask what the picture leaves out: the snowballs, the shouting crowd, the disorder. Why would the artist leave those out?',
    explanation: 'The engraving shows disciplined troops firing on command into defenceless civilians. The reality was a chaotic confrontation with a jeering crowd throwing snowballs and debris — John Adams defended the soldiers in court and most were acquitted. Revere’s print is superb evidence of propaganda and of how the event was used, which is exactly the sourcing distinction the DBQ tests.',
  },
  {
    id: 'L9-q7', skill: 'Continuity and change',
    prompt: 'Between 1765 and 1770 the usual colonial response to a new tax moved through which sequence?',
    options: [
      'Petition and constitutional argument, then organised boycott, then crowd action and intimidation',
      'Armed rebellion first, followed by petitions once fighting failed',
      'Immediate demands for independence, then negotiation',
      'Quiet compliance, followed by appeals to the French for support',
    ],
    correctIndex: 0,
    hint: 'Stamp Act Congress, then non-importation, then tarred-and-feathered stamp distributors. What is the pattern?',
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
    id: 'L10-q1', skill: 'Causation',
    prompt: 'Colonists objected to the Tea Act of 1773 even though it made tea cheaper, because the act:',
    options: [
      'Preserved the tax on tea and handed the East India Company a monopoly on selling it',
      'Banned the drinking of tea in the colonies',
      'Imposed the first direct tax ever levied on the colonies',
      'Required all tea to be purchased from French merchants',
    ],
    correctIndex: 0,
    hint: 'Cheap tea with a tax attached is still a tax — and accepting the bargain concedes something. What?',
    explanation: 'Buying the cheap tea meant paying the Townshend duty and conceding Parliament’s right to levy it; the monopoly also cut out colonial merchants and smugglers. This is a favourite exam question precisely because the cheaper price makes the protest look irrational until you see the principle.',
  },
  {
    id: 'L10-q2', skill: 'Causation',
    prompt: 'Britain’s response to the Boston Tea Party — the Coercive Acts of 1774 — backfired because the acts:',
    options: [
      'Punished Massachusetts so harshly that other colonies saw a threat to their own charters and rallied to its defence',
      'Were too mild to be taken seriously anywhere in the colonies',
      'Applied equally to every colony, so no colony felt singled out',
      'Granted Massachusetts a new elected government',
    ],
    correctIndex: 0,
    hint: 'Britain meant to isolate one colony. What did the other twelve conclude could be done to them next?',
    explanation: 'Closing Boston’s port, gutting the Massachusetts charter and moving trials to England showed every colony that its own government could be dissolved by Parliament. Instead of isolating Massachusetts, the acts produced the First Continental Congress — colonists called them the Intolerable Acts.',
  },
  {
    id: 'L10-q3', skill: 'Developments and processes',
    prompt: 'The First Continental Congress (1774) chose to:',
    options: [
      'Petition the King, assert colonial rights, and organise a comprehensive boycott — while stopping well short of independence',
      'Declare independence from Great Britain',
      'Raise a standing army and appoint Washington as its commander',
      'Accept the Coercive Acts in exchange for the reopening of Boston harbour',
    ],
    correctIndex: 0,
    hint: '1774, not 1776. What were delegates still hoping would happen?',
    explanation: 'The Congress issued a Declaration and Resolves, petitioned the King and created the Continental Association to enforce non-importation. Delegates still wanted redress within the empire. Reading 1776 backwards into 1774 is one of the most common errors in this unit.',
  },
  {
    id: 'L10-q4', skill: 'Analyzing sources', stimulus: L10_COMMON_SENSE,
    prompt: 'Common Sense changed the debate in 1776 principally because it:',
    options: [
      'Attacked monarchy itself in plain language, making independence thinkable for ordinary readers',
      'Was the first publication to object to parliamentary taxation',
      'Proposed a detailed constitution for a future United States',
      'Argued that reconciliation with Britain remained possible',
    ],
    correctIndex: 0,
    hint: 'Earlier writers blamed Parliament or the ministers. Who does Paine blame?',
    explanation: 'Until Paine, colonists blamed Parliament and bad ministers while professing loyalty to the King. Common Sense attacked hereditary monarchy as absurd on principle, in language written for a tavern rather than a courtroom, and sold enormously. It moved independence from unthinkable to obvious in six months.',
  },
  {
    id: 'L10-q5', skill: 'Analyzing sources', stimulus: L10_DECLARATION,
    prompt: 'The passage draws most directly on the political philosophy of:',
    options: [
      'John Locke, particularly natural rights and government by consent, with a right of revolution when consent is violated',
      'Thomas Hobbes, who argued that subjects could never lawfully resist a sovereign',
      'Mercantilist economic writers of the seventeenth century',
      'Puritan covenant theology as practised in Massachusetts Bay',
    ],
    correctIndex: 0,
    hint: 'Life, liberty and property — with one word swapped. Whose formula is that?',
    explanation: 'Locke argued that government exists by consent to protect natural rights and may be replaced when it fails. Jefferson’s "pursuit of Happiness" adapts Locke’s "property." The Declaration then lists grievances against the King, not Parliament — by 1776 the argument had moved past Parliament entirely.',
  },
  {
    id: 'L10-q6', skill: 'Analyzing sources', stimulus: L10_DUNMORE,
    prompt: 'Dunmore’s proclamation is best understood as:',
    options: [
      'A military measure to weaken Patriot planters, which also exposed the contradiction between Patriot liberty and slavery',
      'An early British commitment to abolishing slavery throughout the empire',
      'An offer of freedom to every enslaved person in the colonies',
      'A policy that enslaved Virginians almost entirely ignored',
    ],
    correctIndex: 0,
    hint: 'Read the conditions closely: whose enslaved people, and on what terms?',
    explanation: 'The offer applied only to those held by rebels and only to men able to bear arms — a war measure, not abolition. Thousands nonetheless risked everything to reach British lines. It also enraged planters and sharpened the question that hangs over the Declaration: what "all men are created equal" meant in a society holding half a million people in slavery.',
  },
  {
    id: 'L10-q7', skill: 'Continuity and change',
    prompt: 'Colonial opinion shifted decisively toward independence between April 1775 and July 1776 because:',
    options: [
      'Fighting had already begun, the King rejected the Olive Branch Petition and declared the colonies in rebellion, and Common Sense reframed the argument',
      'France had promised an alliance if the colonies declared independence first',
      'The Continental Congress had always intended to declare independence in 1776',
      'Parliament repealed the Coercive Acts, which colonists read as weakness',
    ],
    correctIndex: 0,
    hint: 'Three things stack up in fifteen months: blood, a royal refusal, and a pamphlet.',
    explanation: 'Lexington and Concord made it a war; the King’s rejection of the Olive Branch Petition and the Prohibitory Act closed off reconciliation; Common Sense made separation seem natural rather than treasonous. Moderates who wanted redress in 1775 had run out of alternatives by mid-1776.',
  },
  {
    id: 'L10-q8', skill: 'Comparison',
    prompt: 'During the Revolution, colonists divided roughly into:',
    options: [
      'Patriots, Loyalists (perhaps a fifth of the population) and a large body of the uncommitted',
      'Patriots and Loyalists only, in almost equal halves',
      'A unanimous population that supported independence',
      'Loyalists in the North and Patriots in the South',
    ],
    correctIndex: 0,
    hint: 'A revolution is never unanimous. And most people, most of the time, try to stay out of it.',
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
