// All quiz content lives here. Screens never hard-code copy.
// Source: PRD §6 (questions + mappings), §8 (results), Figma frames (screen copy).
// `dimension` is for the author only and is never rendered.

export const TOTAL_QUESTIONS = 12;

export const HOUSES = ['gryffindor', 'hufflepuff', 'ravenclaw', 'slytherin'];

export const QUESTIONS = [
  {
    id: 'q1',
    dimension: 'UI polish',
    prompt: 'A tiny visual inconsistency survives into the final review. What bothers you most?',
    answers: [
      { id: 'q1a', label: 'The interface feels unfinished, even if nobody else notices.', house: 'ravenclaw' },
      { id: 'q1b', label: 'It matters if it affects comprehension, usability or accessibility.', house: 'hufflepuff' },
      { id: 'q1c', label: 'It breaks the visual system and makes the design feel less coherent.', house: 'gryffindor' },
      { id: 'q1d', label: 'It matters only if fixing it would improve the overall outcome.', house: 'slytherin' },
    ],
  },
  {
    id: 'q2',
    dimension: 'UI polish',
    prompt: 'You have one extra hour before handoff. Where does it go?',
    answers: [
      { id: 'q2a', label: 'Check the critical user flows and catch anything that could trip someone up.', house: 'hufflepuff' },
      { id: 'q2b', label: 'Fix the visual details that make the interface feel polished.', house: 'ravenclaw' },
      { id: 'q2c', label: 'Identify the highest-impact improvement and spend the hour there.', house: 'slytherin' },
      { id: 'q2d', label: 'Explore one bolder visual direction before the opportunity disappears.', house: 'gryffindor' },
    ],
  },
  {
    id: 'q3',
    dimension: 'Design process',
    prompt: 'Your research contradicts the direction you’ve already designed. What now?',
    answers: [
      { id: 'q3a', label: 'Revisit the assumptions and restructure the process around what you’ve learned.', house: 'ravenclaw' },
      { id: 'q3b', label: 'Build an alternative immediately. The fastest way to learn is to try it.', house: 'gryffindor' },
      { id: 'q3c', label: 'Determine which insight changes the outcome and adjust strategically.', house: 'slytherin' },
      { id: 'q3d', label: 'Investigate what users are actually struggling with before changing direction.', house: 'hufflepuff' },
    ],
  },
  {
    id: 'q4',
    dimension: 'Design process',
    prompt: 'Your ideal design process looks like…',
    answers: [
      { id: 'q4a', label: 'A goal-led sequence that adapts to deadlines, constraints and opportunities.', house: 'slytherin' },
      { id: 'q4b', label: 'A flexible loop where the next step depends on what I discover.', house: 'gryffindor' },
      { id: 'q4c', label: 'A collaborative process with research and validation throughout.', house: 'hufflepuff' },
      { id: 'q4d', label: 'A structured sequence that gives each stage the attention it deserves.', house: 'ravenclaw' },
    ],
  },
  {
    id: 'q5',
    dimension: 'Figma love',
    prompt: 'Your team announces a switch to a new design tool. Your first thought?',
    answers: [
      { id: 'q5a', label: 'Fine, but can it handle our collaboration and accessibility needs?', house: 'hufflepuff' },
      { id: 'q5b', label: 'New tool, new possibilities. Let me break something.', house: 'gryffindor' },
      { id: 'q5c', label: 'Show me how this improves the workflow before we migrate everything.', house: 'slytherin' },
      { id: 'q5d', label: 'But my components! My variables! My lovingly organised files!', house: 'ravenclaw' },
    ],
  },
  {
    id: 'q6',
    dimension: 'Figma love',
    prompt: 'You need to communicate a complex design idea. What’s your first instinct?',
    answers: [
      { id: 'q6a', label: 'Build an interactive prototype in the tool I know inside out.', house: 'ravenclaw' },
      { id: 'q6b', label: 'Choose whichever format makes the idea clearest to the team.', house: 'hufflepuff' },
      { id: 'q6c', label: 'Try a new medium or tool if it helps communicate the idea better.', house: 'gryffindor' },
      { id: 'q6d', label: 'Find the simplest, most effective way to get everyone aligned.', house: 'slytherin' },
    ],
  },
  {
    id: 'q7',
    dimension: 'Expertise',
    prompt: 'A project needs a specialist skill you don’t currently have. What do you do?',
    answers: [
      { id: 'q7a', label: 'Find an expert and collaborate rather than pretend I know everything.', house: 'hufflepuff' },
      { id: 'q7b', label: 'Go deep and learn the skill properly. I like becoming the person people call.', house: 'ravenclaw' },
      { id: 'q7c', label: 'Learn enough to experiment, connect the dots and explore possibilities.', house: 'gryffindor' },
      { id: 'q7d', label: 'Work out whether developing the skill or bringing in expertise is the smarter investment.', house: 'slytherin' },
    ],
  },
  {
    id: 'q8',
    dimension: 'Expertise',
    prompt: 'Which professional reputation sounds most like you?',
    answers: [
      { id: 'q8a', label: 'The person who can connect design decisions to product and business outcomes.', house: 'slytherin' },
      { id: 'q8b', label: 'The person who moves comfortably across research, UI, prototyping and new technologies.', house: 'gryffindor' },
      { id: 'q8c', label: 'The person who makes the whole team better through collaboration and thoughtful craft.', house: 'hufflepuff' },
      { id: 'q8d', label: 'The person everyone calls for one particularly difficult design problem.', house: 'ravenclaw' },
    ],
  },
  {
    id: 'q9',
    dimension: 'Taste',
    prompt: 'You encounter a product with excellent usability but mediocre visual design.',
    answers: [
      { id: 'q9a', label: 'I want to understand what users struggle with before deciding what to change.', house: 'hufflepuff' },
      { id: 'q9b', label: 'I immediately start imagining how I’d redesign the entire thing.', house: 'gryffindor' },
      { id: 'q9c', label: 'I’d identify which improvements would make the greatest difference to the product.', house: 'slytherin' },
      { id: 'q9d', label: 'I can see the inconsistencies already. Give me the design file.', house: 'ravenclaw' },
    ],
  },
  {
    id: 'q10',
    dimension: 'Taste',
    prompt: 'A design is technically correct, but something feels off.',
    answers: [
      { id: 'q10a', label: 'I’ll investigate the visual details until I find the thing that’s bothering me.', house: 'ravenclaw' },
      { id: 'q10b', label: 'I’ll check whether it supports the intended positioning and outcome.', house: 'slytherin' },
      { id: 'q10c', label: 'I’ll test it with people and see whether the discomfort has a real user impact.', house: 'hufflepuff' },
      { id: 'q10d', label: 'I’ll explore alternative directions until something clicks.', house: 'gryffindor' },
    ],
  },
  {
    id: 'q11',
    dimension: 'AI',
    prompt: 'AI can generate a decent first draft of your UI in seconds. Your reaction?',
    answers: [
      { id: 'q11a', label: 'I’ll evaluate whether it improves the outcome enough to justify using it.', house: 'slytherin' },
      { id: 'q11b', label: 'Interesting, but I still want to understand and control the craft myself.', house: 'ravenclaw' },
      { id: 'q11c', label: 'Let me see how far I can push this. What else can it make?', house: 'gryffindor' },
      { id: 'q11d', label: 'I’ll use it where it helps, while checking the result carefully for real user needs.', house: 'hufflepuff' },
    ],
  },
  {
    id: 'q12',
    dimension: 'AI',
    prompt: 'You have a weekend, a new tool and an idea for a tiny product. What happens?',
    answers: [
      { id: 'q12a', label: 'I use AI-assisted tools to get a working prototype into the world.', house: 'gryffindor' },
      { id: 'q12b', label: 'I choose the fastest reliable route to test whether the idea is worth pursuing.', house: 'slytherin' },
      { id: 'q12c', label: 'I build it carefully, understanding and controlling each important detail.', house: 'ravenclaw' },
      { id: 'q12d', label: 'I collaborate, gather perspectives and make something useful together.', house: 'hufflepuff' },
    ],
  },
];


// Variant B for each slot (PRD §6A). QUESTIONS_B[i] is the alternative to QUESTIONS[i]:
// same dimension, one answer per house. Ids end in "-alt" so they never clash with variant A.
export const QUESTIONS_B = [
  {
    id: 'q1-alt',
    dimension: 'UI polish',
    prompt: 'A developer ships your design with the spacing slightly off. You notice at 11pm. What do you do?',
    answers: [
      { id: 'q1-alt-a', label: 'Leave it till morning and mention it kindly. They’ve had a long week.', house: 'hufflepuff' },
      { id: 'q1-alt-b', label: 'Raise a ticket with annotated screenshots and the exact values.', house: 'ravenclaw' },
      { id: 'q1-alt-c', label: 'Let it ride along with the next release, alongside something that matters more.', house: 'slytherin' },
      { id: 'q1-alt-d', label: 'Fix it in the code yourself. Asking would take longer.', house: 'gryffindor' },
    ],
  },
  {
    id: 'q2-alt',
    dimension: 'UI polish',
    prompt: 'Your favourite kind of design compliment is…',
    answers: [
      { id: 'q2-alt-a', label: '“How did you even think of that?”', house: 'gryffindor' },
      { id: 'q2-alt-b', label: '“Leadership approved it in one meeting.”', house: 'slytherin' },
      { id: 'q2-alt-c', label: '“This is so easy to use.”', house: 'hufflepuff' },
      { id: 'q2-alt-d', label: '“Every pixel here is exactly where it should be.”', house: 'ravenclaw' },
    ],
  },
  {
    id: 'q3-alt',
    dimension: 'Design process',
    prompt: 'A stakeholder wants a brand-new feature by Friday. It’s Tuesday.',
    answers: [
      { id: 'q3-alt-a', label: 'Map the flow and the edge cases first, so nothing surprises you on Thursday.', house: 'ravenclaw' },
      { id: 'q3-alt-b', label: 'Ask who it’s for and what problem it solves before opening Figma.', house: 'hufflepuff' },
      { id: 'q3-alt-c', label: 'Sketch three rough directions tonight and show them tomorrow.', house: 'gryffindor' },
      { id: 'q3-alt-d', label: 'Negotiate it down to something that can actually ship well by Friday.', house: 'slytherin' },
    ],
  },
  {
    id: 'q4-alt',
    dimension: 'Design process',
    prompt: 'After a workshop, your sticky notes are…',
    answers: [
      { id: 'q4-alt-a', label: 'Quietly narrowed down to the three that will win the room at the readout.', house: 'slytherin' },
      { id: 'q4-alt-b', label: 'Everywhere. Some on the wall, one on your laptop, one possibly on your shoe.', house: 'gryffindor' },
      { id: 'q4-alt-c', label: 'Already clustered, labelled and colour-coded by theme.', house: 'ravenclaw' },
      { id: 'q4-alt-d', label: 'Photographed and shared with everyone who came, with a thank-you.', house: 'hufflepuff' },
    ],
  },
  {
    id: 'q5-alt',
    dimension: 'Figma love',
    prompt: 'Someone sends you a file with 40 unnamed layers called “Frame 2847”.',
    answers: [
      { id: 'q5-alt-a', label: 'Start a fresh file. Untangling it would take longer than rebuilding.', house: 'gryffindor' },
      { id: 'q5-alt-b', label: 'Use it as the perfect case for finally funding a proper design system.', house: 'slytherin' },
      { id: 'q5-alt-c', label: 'Kindly send them a short guide to naming and auto layout.', house: 'hufflepuff' },
      { id: 'q5-alt-d', label: 'Rename them. All of them. It’s calming.', house: 'ravenclaw' },
    ],
  },
  {
    id: 'q6-alt',
    dimension: 'Figma love',
    prompt: 'Your plugins list looks like…',
    answers: [
      { id: 'q6-alt-a', label: 'Whatever the team uses, so everyone’s files behave the same way.', house: 'hufflepuff' },
      { id: 'q6-alt-b', label: 'Small and deeply understood. You know exactly what each one does to your layers.', house: 'ravenclaw' },
      { id: 'q6-alt-c', label: 'Whatever gets you from brief to sign-off fastest. The rest get uninstalled.', house: 'slytherin' },
      { id: 'q6-alt-d', label: 'Forty plugins, mostly tried once, two used daily.', house: 'gryffindor' },
    ],
  },
  {
    id: 'q7-alt',
    dimension: 'Expertise',
    prompt: 'At a design conference, which talk do you pick?',
    answers: [
      { id: 'q7-alt-a', label: 'Something completely outside design. Robotics? Perfumery? Yes.', house: 'gryffindor' },
      { id: 'q7-alt-b', label: 'A deep dive into one niche topic you already know a lot about.', house: 'ravenclaw' },
      { id: 'q7-alt-c', label: 'How a design leader earned a seat at the table.', house: 'slytherin' },
      { id: 'q7-alt-d', label: 'Designing for the people products usually leave out.', house: 'hufflepuff' },
    ],
  },
  {
    id: 'q8-alt',
    dimension: 'Expertise',
    prompt: 'A junior designer asks for career advice. You tell them…',
    answers: [
      { id: 'q8-alt-a', label: '“Talk to users and engineers. Often.”', house: 'hufflepuff' },
      { id: 'q8-alt-b', label: '“Learn how the business makes money, then design for that.”', house: 'slytherin' },
      { id: 'q8-alt-c', label: '“Try everything. You’ll find your thing by doing.”', house: 'gryffindor' },
      { id: 'q8-alt-d', label: '“Pick one thing and get really, really good at it.”', house: 'ravenclaw' },
    ],
  },
  {
    id: 'q9-alt',
    dimension: 'Taste',
    prompt: 'You walk into a beautifully designed café. What do you notice first?',
    answers: [
      { id: 'q9-alt-a', label: 'The typeface on the menu. You may have already identified it.', house: 'ravenclaw' },
      { id: 'q9-alt-b', label: 'How they get people to queue happily for overpriced coffee.', house: 'slytherin' },
      { id: 'q9-alt-c', label: 'Three ideas you want to steal for something completely unrelated.', house: 'gryffindor' },
      { id: 'q9-alt-d', label: 'Whether the menu is easy to read and the staff seem happy.', house: 'hufflepuff' },
    ],
  },
  {
    id: 'q10-alt',
    dimension: 'Taste',
    prompt: 'Someone calls your work “clean”. You feel…',
    answers: [
      { id: 'q10-alt-a', label: 'Pleased, if it means it was easy to understand.', house: 'hufflepuff' },
      { id: 'q10-alt-b', label: 'Curious what they meant exactly. Spacing? Hierarchy? Restraint?', house: 'ravenclaw' },
      { id: 'q10-alt-c', label: 'Fine, as long as clean is what the brief needed.', house: 'slytherin' },
      { id: 'q10-alt-d', label: 'Suspicious. “Clean” is what people say when there’s no personality.', house: 'gryffindor' },
    ],
  },
  {
    id: 'q11-alt',
    dimension: 'AI',
    prompt: 'A colleague’s AI-generated design wins the review. You…',
    answers: [
      { id: 'q11-alt-a', label: 'Note that the review rewarded results, not methods, and adjust accordingly.', house: 'slytherin' },
      { id: 'q11-alt-b', label: 'Check whether it actually works for the people who’ll use it.', house: 'hufflepuff' },
      { id: 'q11-alt-c', label: 'Ask them to walk you through their prompts. Immediately.', house: 'gryffindor' },
      { id: 'q11-alt-d', label: 'Look closely at what it got right, and what it quietly got wrong.', house: 'ravenclaw' },
    ],
  },
  {
    id: 'q12-alt',
    dimension: 'AI',
    prompt: 'If AI could take one part of your job forever, you’d hand over…',
    answers: [
      { id: 'q12-alt-a', label: 'Every boring task, so you can try ten more ideas a week.', house: 'gryffindor' },
      { id: 'q12-alt-b', label: 'Redlines and specs. You’d keep the actual craft.', house: 'ravenclaw' },
      { id: 'q12-alt-c', label: 'Note-taking in research sessions, so you can properly listen.', house: 'hufflepuff' },
      { id: 'q12-alt-d', label: 'Rewriting the same deck for the fifth audience.', house: 'slytherin' },
    ],
  },
];

/** QUESTION_POOL[slot] = [variant A, variant B]. */
export const QUESTION_POOL = QUESTIONS.map((q, i) => [q, QUESTIONS_B[i]]);

export const RESULTS = {
  gryffindor: {
    house: 'gryffindor',
    name: 'Gryffindor',
    initial: 'G',
    headline: 'You belong in Gryffindor',
    subheading: 'Your best ideas have a suspicious tendency to become actual things.',
    description: 'You thrive on momentum. Give you a half-formed idea, a tight deadline and a prototype tool, and you’ll find a way to make something happen. You’re willing to experiment, challenge assumptions and learn through doing. Sometimes you ship before you’ve fully thought it through. Sometimes that’s exactly the point.',
    superpower: 'Turning uncertainty into momentum.',
    flaw: 'You occasionally mistake starting for finishing.',
    habit: 'Your prototype is already clickable while everyone else is still discussing the brief.',
    crest: 'assets/crests/gryffindor.jpg',
    crestAlt: 'The Gryffindor crest: a lion on a red and gold shield',
  },
  hufflepuff: {
    house: 'hufflepuff',
    name: 'Hufflepuff',
    initial: 'H',
    headline: 'You belong in Hufflepuff',
    subheading: 'Someone has to remember the actual humans using this thing.',
    description: 'You care about the details that make an experience feel considered. You listen, collaborate and notice the friction that other people overlook. You want your designs to work for people in the real world, not just look impressive in a presentation.',
    superpower: 'Making people feel considered.',
    flaw: 'You may try to accommodate everyone until the design has lost its nerve.',
    habit: 'You’re the person asking whether the error state makes sense to someone who has never seen the interface before.',
    crest: 'assets/crests/hufflepuff.jpg',
    crestAlt: 'The Hufflepuff crest: a badger on a yellow and black shield',
  },
  ravenclaw: {
    house: 'ravenclaw',
    name: 'Ravenclaw',
    initial: 'R',
    headline: 'You belong in Ravenclaw',
    subheading: 'You’ve opened 17 tabs to investigate a button.',
    description: 'You want to know why things work, why they fail and whether there’s a more elegant way to solve the problem. You appreciate craft, coherent systems and the tiny details that make a design feel inevitable. You may occasionally overthink a decision that was perfectly fine three iterations ago.',
    superpower: 'Finding the pattern beneath the problem.',
    flaw: 'You can spend longer perfecting the solution than the problem deserves.',
    habit: 'Your component library has a naming convention. Your naming convention has documentation.',
    crest: 'assets/crests/ravenclaw.jpg',
    crestAlt: 'The Ravenclaw crest: an eagle on a blue and bronze shield',
  },
  slytherin: {
    house: 'slytherin',
    name: 'Slytherin',
    initial: 'S',
    headline: 'You belong in Slytherin',
    subheading: 'You didn’t just design the interface. You considered who needed to approve it.',
    description: 'You understand that design happens within constraints. You know when to push, when to compromise and where to invest your effort. You’re resourceful, adaptable and interested in what a design decision actually achieves. Your ability to navigate complexity is a strength—just remember that not every decision needs a stakeholder strategy.',
    superpower: 'Making every design decision work harder.',
    flaw: 'You can optimise the fun out of a perfectly good experiment.',
    habit: 'You already have a backup plan for the backup plan, and the deck is immaculate.',
    crest: 'assets/crests/slytherin.jpg',
    crestAlt: 'The Slytherin crest: a serpent on a green and silver shield',
  },
};

export const SORTING_LINES = [
  'Hmm… difficult. Very difficult…',
  'Ah… a tidy layers panel, but a reckless streak, I see…',
  'Plenty of opinions on kerning… now where to put you?',
  'Hmm… ‘final_v3_FINAL’… yes, that tells me a great deal.',
  'Not a bad eye… a stubborn one, though…',
];

export const COPY = {
  appName: 'The Designer’s Sorting Hat',
  disclaimer: 'An unofficial, fan-made quiz for designers. Not affiliated with the Harry Potter franchise.',
  disclaimerLong: 'An unofficial, fan-made quiz for designers, built for fun using publicly available resources. Not affiliated with or endorsed by Warner Bros., J.K. Rowling or the Harry Potter franchise.',

  envelope: {
    eyebrow: 'An owl has delivered something for you',
    title: 'The Designer’s Sorting Hat',
    addressTo: 'To,',
    addressName: 'The Designer,',
    addressLines: ['The Second Monitor from the Left,', 'A Desk Covered in Sticky Notes.'],
    monogram: 'DS',
    sealLabel: 'Break the seal and open your letter',
    hint: 'Break the seal to begin',
  },

  letter: {
    title: 'Yer A Designer!',
    greeting: 'Dear Designer,',
    paragraphs: [
      'We are pleased to inform you that you have been selected for sorting.',
      'Twelve questions stand between you and your house. Answer the way you actually work, not the way your portfolio says you should. The Hat can tell.',
    ],
    signoff: 'Yours, with excessive kerning,',
    signature: 'The Sorting Committee',
    cta: 'Get sorted',
  },

  question: {
    back: 'Back',
    progress: (n, total) => `Question ${n} of ${total}`,
    answerKeys: ['A', 'B', 'C', 'D'],
  },

  sorting: {
    caption: 'The Hat is considering your answers',
    hatAlt: 'The Sorting Hat',
  },

  result: {
    eyebrow: 'The Hat has spoken',
    superpowerLabel: 'Your superpower',
    flawLabel: 'Your designer flaw',
    habitLabel: 'Your design habit',
    share: 'Take a screenshot',
    restart: 'Sort me again',
    crestPending: 'The crest is still on its way by owl',
    shareText: (name, subheading, url) => `I’m a ${name} designer: ‘${subheading}’ Get sorted: ${url}`,
  },

    toasts: {
    linkCopied: 'Link copied. Send it by owl.',
    linkBlocked: 'Your browser wouldn’t let us copy. The address bar works too.',
  },

  screenshotPopup: {
    title: 'This potion is still brewing!',
    body: 'A proper result card is on its way. Until then, the old-fashioned spell works best:',
    shortcuts: ['Cmd + Shift + 4 (Mac)', 'Win + Shift + S (Windows)'],
    image: 'assets/cauldron.png',
    close: 'Got it',
    copyLink: 'Copy quiz link',
  },

  slowLoad: {
    title: 'Lighting the candles…',
    caption: 'Fetching your letter from the owlery',
  },

  verySlowLoad: {
    title: 'The owl is taking the scenic route.',
    body: 'Your connection seems slow. Keep waiting, or send another owl.',
    retry: 'Try again',
  },

  welcomeBack: {
    title: 'Welcome back, Designer.',
    body: (n, total) => `The Hat kept your seat warm. You’d answered ${n} of ${total} questions.`,
    resume: 'Carry on',
    restart: 'Start fresh',
  },

  error: {
    title: 'Well, that wasn’t supposed to happen.',
    body: 'A spell misfired somewhere in the castle. Not your fault, and your answers are safe.',
    bodyNoStorage: 'A spell misfired somewhere in the castle. Not your fault.',
    retry: 'Try again',
    restart: 'Start over',
    hatAlt: 'The Sorting Hat, tipped over',
  },
};
