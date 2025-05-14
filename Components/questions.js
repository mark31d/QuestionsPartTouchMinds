/* ──────────────────────────────────────────────────────────────
 *  questions.js
 *  ‣ CATEGORY_META  – справочник категорий (id → заголовок, иконка)
 *  ‣ INITIAL_QUESTIONS – стартовая база вопросов + default-export
 *  ------------------------------------------------------------------ */

/* ------------- Category meta (id → title, icon) ---------------- */
export const CATEGORY_META = {
  identity: {
    title: 'Self & Identity',
    icon : require('../assets/cat_identity.png'),
  },
  ethics: {
    title: 'Ethics & Morality',
    icon : require('../assets/cat_ethics.png'),
  },
  love: {
    title: 'Love & Relationships',
    icon : require('../assets/cat_love.png'),
  },
  society: {
    title: 'Society & Worldview',
    icon : require('../assets/cat_society.png'),
  },
};

/* ------------- Seed questions ---------------------------------- */
/* 20 «Love & Relationships» + по 5 примеров для остальных рубрик */

export const INITIAL_QUESTIONS = [
  /* ---------- LOVE & RELATIONSHIPS (20) ------------------------ */
  {
    id: 'love-1',
    category: 'love',
    text: 'Is love a feeling or a choice?',
    viewpoints: [
      'Love is a spontaneous emotion that emerges naturally.',
      'Love is a conscious decision and commitment.',
      'It’s a combination: initial feelings evolve into deliberate choices over time.',
    ],
  },
  {
    id: 'love-2',
    category: 'love',
    text: 'Can long-distance relationships truly work?',
    viewpoints: [
      'Yes — with effort, trust and clear communication.',
      'No — physical proximity is essential for a deep connection.',
      'It depends on the individuals and their circumstances.',
    ],
  },
  {
    id: 'love-3',
    category: 'love',
    text: 'Is it better to love deeply and risk heartbreak, or to protect yourself emotionally?',
    viewpoints: [
      'Love deeply — vulnerability enriches life despite potential pain.',
      'Protecting yourself is more practical, avoiding unnecessary hurt.',
      'A balanced approach allows for passion while setting healthy boundaries.',
    ],
  },
  {
    id: 'love-4',
    category: 'love',
    text: 'Do soulmates really exist, or is it just a romantic myth?',
    viewpoints: [
      'Soulmates exist — there is one unique person destined for you.',
      'It’s a myth; relationships take work and compatibility rather than fate.',
      'Multiple people can serve as perfect matches at different times in life.',
    ],
  },
  {
    id: 'love-5',
    category: 'love',
    text: 'Should past relationships influence how we approach new ones?',
    viewpoints: [
      'Yes — previous experiences shape what we seek and need.',
      'No — every new relationship should start fresh.',
      'They provide context, but it’s important not to let the past dictate every decision.',
    ],
  },
  {
    id: 'love-6',
    category: 'love',
    text: 'Is honesty always the best policy in a relationship?',
    viewpoints: [
      'Yes — openness builds trust and authenticity.',
      'Not always — sometimes a little discretion or white lies keep harmony.',
      'It depends on the nature of the truth and its impact.',
    ],
  },
  {
    id: 'love-7',
    category: 'love',
    text: 'How important is compromise in a relationship?',
    viewpoints: [
      'Compromise is essential — both partners should meet halfway.',
      'Too much compromise can lead to resentment and loss of individuality.',
      'It should be mutual and balanced, ensuring fairness for both.',
    ],
  },
  {
    id: 'love-8',
    category: 'love',
    text: 'Can jealousy be a sign of love?',
    viewpoints: [
      'A little jealousy shows that you care deeply about the relationship.',
      'Jealousy is a sign of insecurity and should be managed carefully.',
      'It depends on the level — moderate feelings might be natural, but excessive jealousy is unhealthy.',
    ],
  },
  {
    id: 'love-9',
    category: 'love',
    text: 'Is it possible to love someone without compromising your own identity?',
    viewpoints: [
      'Yes — a healthy relationship supports individuality and growth.',
      'No — relationships naturally involve some level of compromise and change.',
      'It depends on how both partners communicate their needs and boundaries.',
    ],
  },
  {
    id: 'love-10',
    category: 'love',
    text: 'Does true love endure all challenges, or can it fade over time?',
    viewpoints: [
      'True love is enduring — it overcomes obstacles and grows stronger.',
      'Even true love can change or fade if not nurtured.',
      'Love evolves — it might transform rather than simply fade away.',
    ],
  },
  {
    id: 'love-11',
    category: 'love',
    text: 'Can people with very different values make a relationship work?',
    viewpoints: [
      'Yes — respect and communication can bridge differences.',
      'No — core values must align for long-term success.',
      'It depends — compromise works only to a certain extent.',
    ],
  },
  {
    id: 'love-12',
    category: 'love',
    text: 'Should you tell your partner everything, even your darkest thoughts?',
    viewpoints: [
      'Yes — full honesty creates deep intimacy.',
      'No — some thoughts are personal and don’t need to be shared.',
      'Only if it affects the relationship directly.',
    ],
  },
  {
    id: 'love-13',
    category: 'love',
    text: 'Is physical attraction essential for lasting love?',
    viewpoints: [
      'Yes — attraction keeps the spark alive.',
      'No — emotional and intellectual connection is more important.',
      'It matters initially, but love can grow beyond physical appearance.',
    ],
  },
  {
    id: 'love-14',
    category: 'love',
    text: 'Can trust once broken ever be fully restored?',
    viewpoints: [
      'Yes — with time, effort and transparency.',
      'No — once broken, trust is never quite the same.',
      'It depends on the people and the depth of the betrayal.',
    ],
  },
  {
    id: 'love-15',
    category: 'love',
    text: 'Is being single a better path for some people?',
    viewpoints: [
      'Yes — some people thrive in independence.',
      'No — humans are wired for connection and love.',
      'It depends on personal goals and stages in life.',
    ],
  },
  {
    id: 'love-16',
    category: 'love',
    text: 'Should love be unconditional?',
    viewpoints: [
      'Yes — real love has no conditions or limits.',
      'No — healthy relationships need boundaries.',
      'Love can be unconditional, but behaviour shouldn’t be tolerated blindly.',
    ],
  },
  {
    id: 'love-17',
    category: 'love',
    text: 'Is it okay to keep secrets in a relationship?',
    viewpoints: [
      'No — secrecy damages trust.',
      'Yes — not everything needs to be disclosed.',
      'It depends on the nature and intention of the secret.',
    ],
  },
  {
    id: 'love-18',
    category: 'love',
    text: 'Do opposites really attract in romantic relationships?',
    viewpoints: [
      'Yes — differences can create dynamic balance.',
      'No — shared values and similarities matter more.',
      'Attraction may happen, but long-term compatibility is key.',
    ],
  },
  {
    id: 'love-19',
    category: 'love',
    text: 'Can ex-partners stay friends without complications?',
    viewpoints: [
      'Yes — if both have truly moved on.',
      'No — it often brings emotional confusion or tension.',
      'Only if boundaries are clear and respected.',
    ],
  },
  {
    id: 'love-20',
    category: 'love',
    text: 'Is love more about giving or receiving?',
    viewpoints: [
      'Giving — love is shown through selflessness and care.',
      'Receiving — feeling loved is just as important.',
      'It’s about balance — both are necessary for a healthy connection.',
    ],
  },

  /* ---------- SELF & IDENTITY (5) ------------------------------ */
  {
    id: 'identity-1',
    category: 'identity',
    text: 'Who defines who you are: you or others?',
    viewpoints: [
      'I define myself, and others’ opinions don’t shape me.',
      'I think both matter — we reflect ourselves through relationships.',
      'Society defines us more than we admit.',
      'We shift our identity depending on who we’re around.',
    ],
  },
  {
    id: 'identity-2',
    category: 'identity',
    text: 'Can a person truly change their core personality?',
    viewpoints: [
      'Yes, with effort and time, anyone can change.',
      'No, the core stays the same — only behavior shifts.',
      'Change is possible, but it’s rare and takes something extreme.',
    ],
  },
  {
    id: 'identity-3',
    category: 'identity',
    text: 'Is it better to be authentic or to be liked?',
    viewpoints: [
      'Authenticity is everything — I’d rather be real than liked.',
      'Sometimes it’s wise to blend in; survival matters.',
      'It depends on the situation — both have their place.',
    ],
  },
  {
    id: 'identity-4',
    category: 'identity',
    text: 'What matters more: what you think of yourself or what others think of you?',
    viewpoints: [
      'My own opinion always comes first.',
      'Others’ opinions are mirrors — they show me blind spots.',
      'Both matter — it’s a balance between self and society.',
    ],
  },
  {
    id: 'identity-5',
    category: 'identity',
    text: 'Do our childhood experiences permanently shape who we become?',
    viewpoints: [
      'Yes, they are the foundation of our personality.',
      'They influence us, but we’re not defined by them.',
      'Some people grow past them completely — it’s possible.',
    ],
  },
  {
    id: 'identity-6',
    category: 'identity',
    text: 'Is being unique more important than fitting in?',
    viewpoints: [
      'Standing out is what gives life meaning.',
      'Belonging is a basic human need — it matters more.',
      'It depends on the context — sometimes you need both.',
    ],
  },
  {
    id: 'identity-7',
    category: 'identity',
    text: 'Can someone be truly confident and still doubt themselves?',
    viewpoints: [
      'Absolutely — confidence includes accepting doubt.',
      'No, real confidence means certainty.',
      'Doubt makes you stronger when you move through it.',
    ],
  },
  {
    id: 'identity-8',
    category: 'identity',
    text: 'Is your job a reflection of your identity?',
    viewpoints: [
      'Yes — what I do is who I am.',
      'No — a job is just a means to an end.',
      'Sometimes — it reflects part of me, but not the whole story.',
    ],
  },
  {
    id: 'identity-9',
    category: 'identity',
    text: 'Is it wrong to change yourself to fit someone’s expectations?',
    viewpoints: [
      'Yes — you lose yourself that way.',
      'No — adapting is part of being human.',
      'It depends on the person and the situation.',
    ],
  },
  {
    id: 'identity-10',
    category: 'identity',
    text: 'Are we born with purpose, or do we create it ourselves?',
    viewpoints: [
      'We create it through choices and actions.',
      'Everyone has a purpose, whether they know it or not.',
      'Life has no inherent purpose — we give it meaning.',
    ],
  },
  {
    id: 'identity-11',
    category: 'identity',
    text: 'Are we the same person throughout our life?',
    viewpoints: [
      'Yes — deep down, we remain the same.',
      'No — we change constantly with our experiences.',
      'We’re the same in essence, but our actions evolve.',
    ],
  },
  {
    id: 'identity-12',
    category: 'identity',
    text: 'Can you truly know yourself without knowing others?',
    viewpoints: [
      'Yes — self-discovery is internal.',
      'No — we learn about ourselves through relationships.',
      'You need both — solitude and interaction shape identity.',
    ],
  },
  {
    id: 'identity-13',
    category: 'identity',
    text: 'Should we embrace all our flaws or work to change them?',
    viewpoints: [
      'Embrace them — they make us human.',
      'Work on them — growth is essential.',
      'Accept them first, then change what holds you back.',
    ],
  },
  {
    id: 'identity-14',
    category: 'identity',
    text: 'Are your values truly yours or inherited from others?',
    viewpoints: [
      'I’ve chosen mine consciously.',
      'Most values are learned, even if we don’t realize it.',
      'It’s a mix — we start with what we’re taught, then refine.',
    ],
  },
  {
    id: 'identity-15',
    category: 'identity',
    text: 'Does your online self reflect your real identity?',
    viewpoints: [
      'Yes, I try to be real online.',
      'Not at all — online me is curated and filtered.',
      'It’s a version of me, but not the whole truth.',
    ],
  },
  {
    id: 'identity-16',
    category: 'identity',
    text: 'Is self-love necessary before loving someone else?',
    viewpoints: [
      'Yes — you can’t pour from an empty cup.',
      'No — love can teach you to love yourself.',
      'It helps, but it’s not a strict requirement.',
    ],
  },
  {
    id: 'identity-17',
    category: 'identity',
    text: 'Is your personality shaped more by nature or nurture?',
    viewpoints: [
      'Nature — it’s mostly genetics.',
      'Nurture — environment and experience shape us more.',
      'Both interact — it’s impossible to separate them completely.',
    ],
  },
  {
    id: 'identity-18',
    category: 'identity',
    text: 'Can you reinvent yourself completely at any stage in life?',
    viewpoints: [
      'Yes — people can start over whenever they choose.',
      'No — your past always follows you.',
      'Reinvention is possible, but traces of the old self remain.',
    ],
  },
  {
    id: 'identity-19',
    category: 'identity',
    text: 'Is it better to live by logic or intuition?',
    viewpoints: [
      'Logic — it keeps you grounded and safe.',
      'Intuition — it taps into a deeper kind of truth.',
      'A balance of both makes the best decisions.',
    ],
  },
  {
    id: 'identity-20',
    category: 'identity',
    text: 'Do labels (introvert, extrovert, etc.) help or limit us?',
    viewpoints: [
      'They help — they give clarity and self-understanding.',
      'They limit — they box us in.',
      'They’re useful, but shouldn’t define us completely.',
    ],
  },
  /* ---------- ETHICS & MORALITY (5) ---------------------------- */
  {
    id: 'ethics-1',
    category: 'ethics',
    text: 'Is it ever acceptable to lie?',
    viewpoints: [
      'Yes — if the lie protects someone.',
      'No — honesty should be absolute.',
      'It depends on the situation and the consequences.',
    ],
  },
  {
    id: 'ethics-2',
    category: 'ethics',
    text: 'Should people be forgiven no matter what they’ve done?',
    viewpoints: [
      'Everyone deserves forgiveness.',
      'Some actions are unforgivable.',
      'Forgiveness helps the forgiver more than the forgiven.',
    ],
  },
  {
    id: 'ethics-3',
    category: 'ethics',
    text: 'Is doing nothing in a moral dilemma the same as doing something wrong?',
    viewpoints: [
      'Yes — silence or inaction can cause harm.',
      'No — doing nothing isn’t the same as active harm.',
      'It depends — sometimes inaction is the safest choice.',
    ],
  },
  {
    id: 'ethics-4',
    category: 'ethics',
    text: 'Should you always follow the rules, even if they seem unfair?',
    viewpoints: [
      'Yes — rules maintain order.',
      'No — unjust rules should be questioned or broken.',
      'Only if breaking them doesn’t hurt others.',
    ],
  },
  {
    id: 'ethics-5',
    category: 'ethics',
    text: 'Is it better to be good or to appear good?',
    viewpoints: [
      'Being good is all that matters.',
      'How people perceive you affects your impact.',
      'Ideally both — but if I had to choose, I’d rather be good.',
    ],
  },
  {
    id: 'ethics-6',
    category: 'ethics',
    text: 'Can the end justify the means?',
    viewpoints: [
      'Yes — the result matters more than the path.',
      'No — the process defines who we are.',
      'Only if no one is harmed along the way.',
    ],
  },
  {
    id: 'ethics-7',
    category: 'ethics',
    text: 'Should people be rewarded for doing the right thing?',
    viewpoints: [
      'Yes — good behavior should be encouraged.',
      'No — doing right should be its own reward.',
      'Occasionally — it depends on the context.',
    ],
  },
  {
    id: 'ethics-8',
    category: 'ethics',
    text: 'Is stealing always wrong?',
    viewpoints: [
      'Yes — property rights must be respected.',
      'No — if it’s to survive, it can be justified.',
      'Morality isn’t black and white — it depends on intent.',
    ],
  },
  {
    id: 'ethics-9',
    category: 'ethics',
    text: 'Can someone be a good person and still do bad things?',
    viewpoints: [
      'Yes — we all make mistakes.',
      'No — your actions define your character.',
      'We’re all a mix of both — no one is purely good or bad.',
    ],
  },
  {
    id: 'ethics-10',
    category: 'ethics',
    text: 'Should we help others even if it harms our own well-being?',
    viewpoints: [
      'Yes — self-sacrifice is noble.',
      'No — your well-being must come first.',
      'It depends — sometimes helping is worth the cost.',
    ],
  },
  {
    id: 'ethics-11',
    category: 'ethics',
    text: 'Is it wrong to benefit from someone else\'s mistake?',
    viewpoints: [
      'Yes — it’s taking advantage of someone.',
      'No — if you didn’t cause the mistake, it’s fair.',
      'It depends on the scale and context.',
    ],
  },
  {
    id: 'ethics-12',
    category: 'ethics',
    text: 'Should people be judged by their intentions or their actions?',
    viewpoints: [
      'Actions matter more — results affect others.',
      'Intentions show the real heart of a person.',
      'Both should be considered to understand someone fully.',
    ],
  },
  {
    id: 'ethics-13',
    category: 'ethics',
    text: 'Is loyalty more important than honesty?',
    viewpoints: [
      'Loyalty — it builds strong bonds.',
      'Honesty — truth creates real trust.',
      'They should go hand-in-hand, but honesty wins in the long run.',
    ],
  },
  {
    id: 'ethics-14',
    category: 'ethics',
    text: 'Do we have a moral responsibility to help strangers in need?',
    viewpoints: [
      'Yes — we’re all connected as humans.',
      'No — you can’t save everyone.',
      'Only if you\'re in a position to help without harming yourself.',
    ],
  },
  {
    id: 'ethics-15',
    category: 'ethics',
    text: 'Should people be punished for their thoughts if they never act on them?',
    viewpoints: [
      'No — thoughts aren’t crimes.',
      'Yes — dangerous thoughts can lead to dangerous behavior.',
      'It depends — some thoughts can reveal harmful intent.',
    ],
  },
  {
    id: 'ethics-16',
    category: 'ethics',
    text: 'Is it ethical to manipulate someone for their own good?',
    viewpoints: [
      'Yes — if the outcome benefits them.',
      'No — manipulation is wrong no matter the intention.',
      'Sometimes — but transparency is better.',
    ],
  },
  {
    id: 'ethics-17',
    category: 'ethics',
    text: 'Can money and morality ever go together?',
    viewpoints: [
      'Yes — ethical business is possible.',
      'No — profit often comes at someone’s expense.',
      'Only with clear values and accountability.',
    ],
  },
  {
    id: 'ethics-18',
    category: 'ethics',
    text: 'Is it more ethical to save one loved one or five strangers?',
    viewpoints: [
      'Save the loved one — emotional bonds matter.',
      'Save the five — more lives are more important.',
      'There’s no right answer — both are human choices.',
    ],
  },
  {
    id: 'ethics-19',
    category: 'ethics',
    text: 'Should past mistakes define a person forever?',
    viewpoints: [
      'No — people can grow and change.',
      'Yes — actions have lasting consequences.',
      'It depends on the mistake and whether they’ve made amends.',
    ],
  },
  {
    id: 'ethics-20',
    category: 'ethics',
    text: 'Is telling a painful truth better than a comforting lie?',
    viewpoints: [
      'Always tell the truth — people deserve it.',
      'Sometimes lies protect people from unnecessary pain.',
      'Only tell the truth if the person is ready for it.',
    ],
  },

  /* ---------- SOCIETY & WORLDVIEW (5) -------------------------- */
  {
    id: 'society-1',
    category: 'society',
    text: 'Is it possible to have true freedom in a society with laws?',
    viewpoints: [
      'Yes — freedom doesn’t mean lawlessness; it means choice within structure.',
      'No — laws always restrict freedom in some way.',
      'Some freedom must be sacrificed for collective safety and order.',
    ],
  },
  {
    id: 'society-2',
    category: 'society',
    text: 'Should people be treated equally or equitably?',
    viewpoints: [
      'Equally — same rules and opportunities for everyone.',
      'Equitably — support should be adjusted based on needs and challenges.',
      'A balance of both is necessary in a fair society.',
    ],
  },
  {
    id: 'society-3',
    category: 'society',
    text: 'Does technology connect us or isolate us?',
    viewpoints: [
      'It connects — we can communicate across the world instantly.',
      'It isolates — digital interaction can replace real connection.',
      'It depends on how we choose to use it.',
    ],
  },
  {
    id: 'society-4',
    category: 'society',
    text: 'Can one person truly make a difference in the world?',
    viewpoints: [
      'Yes — many movements started with one passionate individual.',
      'No — systems are too large for one person to change.',
      'One person can inspire others, creating ripple effects.',
    ],
  },
  {
    id: 'society-5',
    category: 'society',
    text: 'Should success be measured by wealth and achievement?',
    viewpoints: [
      'Yes — results and accomplishments matter in the real world.',
      'No — success is personal and can’t be reduced to money or status.',
      'Success should be measured by impact and inner fulfillment.',
    ],
  },
  {
    id: 'society-6',
    category: 'society',
    text: 'Is cancel culture a form of accountability or public shaming?',
    viewpoints: [
      'Accountability — people must face consequences for harmful actions.',
      'Public shaming — it often goes too far and lacks forgiveness.',
      'It depends on how it’s used — there\'s a fine line.',
    ],
  },
  {
    id: 'society-7',
    category: 'society',
    text: 'Should cultural traditions always be preserved?',
    viewpoints: [
      'Yes — traditions connect us to our roots and identity.',
      'No — some traditions can be outdated or harmful.',
      'Preserve what’s meaningful, evolve what no longer serves.',
    ],
  },
  {
    id: 'society-8',
    category: 'society',
    text: 'Is social media a force for good or harm?',
    viewpoints: [
      'Good — it empowers voices and spreads ideas.',
      'Harm — it fuels comparison, misinformation, and addiction.',
      'Both — it’s a tool that reflects how we use it.',
    ],
  },
  {
    id: 'society-9',
    category: 'society',
    text: 'Is competition more helpful or harmful to society?',
    viewpoints: [
      'Helpful — it drives innovation and excellence.',
      'Harmful — it creates stress, division, and inequality.',
      'It can be healthy if it\'s balanced with cooperation.',
    ],
  },
  {
    id: 'society-10',
    category: 'society',
    text: 'Do we have a responsibility to care about global issues, even if they don’t affect us directly?',
    viewpoints: [
      'Yes — we’re all part of a global community.',
      'No — local issues should come first.',
      'Awareness is important, but action should be realistic and focused.',
    ],
  },
  {
    id: 'society-11',
    category: 'society',
    text: 'Can violence ever be justified in pursuit of justice?',
    viewpoints: [
      'Yes — sometimes it’s the only way to fight oppression.',
      'No — justice built on violence isn’t true justice.',
      'It depends — in extreme cases, it may be the last resort.',
    ],
  },
  {
    id: 'society-12',
    category: 'society',
    text: 'Is education a right or a privilege?',
    viewpoints: [
      'A right — everyone deserves access to knowledge.',
      'A privilege — not all systems can afford to give it equally.',
      'Ideally a right, but in practice it often behaves like a privilege.',
    ],
  },
  {
    id: 'society-13',
    category: 'society',
    text: 'Should people be obligated to vote in democratic societies?',
    viewpoints: [
      'Yes — participation is a civic duty.',
      'No — forcing people to vote can be counterproductive.',
      'Encourage, but never mandate — choice is part of democracy.',
    ],
  },
  {
    id: 'society-14',
    category: 'society',
    text: 'Is poverty more a result of personal choices or systemic issues?',
    viewpoints: [
      'Systemic — structures and inequality play a huge role.',
      'Personal — responsibility and effort still matter.',
      'Both — it’s complex and deeply interconnected.',
    ],
  },
  {
    id: 'society-15',
    category: 'society',
    text: 'Should people be allowed to say anything, even if it’s offensive?',
    viewpoints: [
      'Yes — freedom of speech is absolute.',
      'No — hate speech and harm should have limits.',
      'Expression should be free, but not without consequences.',
    ],
  },
  {
    id: 'society-16',
    category: 'society',
    text: 'Does progress always mean improvement?',
    viewpoints: [
      'Not necessarily — some progress causes unintended harm.',
      'Yes — even flawed progress moves us forward.',
      'Only if progress is ethical and inclusive.',
    ],
  },
  {
    id: 'society-17',
    category: 'society',
    text: 'Should the rich have a moral obligation to give back to society?',
    viewpoints: [
      'Yes — wealth comes with responsibility.',
      'No — people should choose what to do with their earnings.',
      'It’s not an obligation, but it’s the right thing to do.',
    ],
  },
  {
    id: 'society-18',
    category: 'society',
    text: 'Is fame more of a burden than a privilege?',
    viewpoints: [
      'A burden — it invades privacy and distorts life.',
      'A privilege — it offers influence and opportunity.',
      'It depends on how fame is handled and used.',
    ],
  },
  {
    id: 'society-19',
    category: 'society',
    text: 'Can diversity and unity truly coexist in society?',
    viewpoints: [
      'Yes — unity doesn’t mean sameness.',
      'No — too much diversity leads to conflict.',
      'With empathy and shared values, they can complement each other.',
    ],
  },
  {
    id: 'society-20',
    category: 'society',
    text: 'Is it possible to live a moral life without religion?',
    viewpoints: [
      'Yes — morality comes from empathy and reason.',
      'No — religion provides a clear moral foundation.',
      'Both paths are valid — it depends on the person’s values.',
    ],
  },
];

/* ---------- default-export (удобно не менять в импортах) ------- */
export default INITIAL_QUESTIONS;
