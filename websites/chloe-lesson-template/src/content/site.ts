import {demoVideo} from './DemoVideo';
import type {Chapter, Site} from './types';

// ---------------------------------------------------------------------------
// Everything a new site needs lives in this file. Copy the folder, then edit:
//   1. the site details (id, title, source, intro)
//   2. one entry in `sections` per question or topic from the source
//   3. each section's video, chapters, follow-up and practice questions
// Questions are shown three at a time (questionsPerSet). The tutor notes only
// appear once every question in the set has been answered and checked.
// ---------------------------------------------------------------------------

const abcd = (...labels: string[]) => labels.map((label, i) => ({key: 'ABCDE'[i], label}));

/** Chapters that start every `seconds`; the chapter at `guessIndex` pauses near its end for a guess. */
const evenChapters = (titles: string[], seconds: number, guessIndex?: number): Chapter[] =>
	titles.map((title, i) => ({
		title,
		start: i * seconds,
		...(i === guessIndex ? {pauseForGuessAt: i * seconds + seconds - 1} : {}),
	}));

const q14Chapters = evenChapters(
	['The puzzle', 'Your guess', 'Fold the tube', 'The upside-down trap', 'Find the opposite', 'Roll the short way', 'Check Question 14', 'Your turn (8-sided)', 'Octagon proof', 'Pocket rule'],
	4,
	1,
);

const q18Chapters = evenChapters(
	['The puzzle', 'Your guess', 'The sticky-paint trap', 'Track the shapes', 'Track the shades', 'Build the answer', 'Check Question 18', 'Your turn (new rule)', 'New puzzle proof', 'Pocket rule'],
	4,
	1,
);

export const site: Site = {
	id: 'week6-template-demo',
	learner: 'Chloe',
	brandLine: 'SELECTIVE / WEEK 6 THINKING SKILLS',
	source: 'Cortex Academy Week 6 Topic Test',
	title: 'Week 6 Thinking Skills',
	intro: 'Two questions from the topic test. Each one has a short video, a follow-up, and practice questions in sets of three. Your tutor explains every answer once a set is finished.',
	videoNote: 'Australian tutor voice · captions on',
	questionsPerSet: 3,
	footer: {
		left: 'WEEK 6 · Q14 & Q18',
		right: 'Cortex Academy Week 6 Topic Test + original practice · Year 5 NSW Selective prep',
	},
	sections: [
		{
			id: 'q14',
			code: 'Q14',
			short: 'Rolling tube',
			subject: 'Spatial reasoning · Prism nets',
			title: 'Roll the tube, watch the top.',
			summary: 'Fold a ten-sided net into a regular prism, dodge the upside-down trap, find the opposite face halfway round, and count each flat landing.',
			video: demoVideo({learner: 'Chloe', subject: 'Spatial reasoning', title: 'Roll the tube, watch the top.', chapters: q14Chapters}),
			chapters: q14Chapters,
			followUp: {
				rule: 'Regular, even-sided tube? Roll the shortest way to the face opposite your chosen top. Count each landing.',
				steps: [
					'Check that the tube has a regular, even-sided end so opposite faces sit halfway round.',
					'Count halfway round from your chosen top face to find which face must land flat on the ground.',
					'Roll the shortest way from the starting ground face and count every new face that lands flat.',
				],
				pitfall: 'The upside-down trap: rolling straight to the named target face puts it flat on the ground instead of on top.',
			},
			questions: [
				{
					id: 'q14-1',
					tag: 'Fewest landings · 8 sides',
					stem: 'A tube has a regular 8-sided end. Its faces go round in order R K W P L H M S, and face S joins back to face R. Face K is on the ground. Roll the tube so face R is on top. How few other faces must land flat on the ground?',
					options: abcd('1', '2', '3', '4'),
					answer: 'C',
					tutor: {
						explain: 'An 8-sided tube is 4 steps halfway round, so face L sits opposite face R. For R to be on top, L must be on the ground. From K, roll the short way: W lands, then P, then L. That’s 3 landings, and R is now on top.',
						traps: {
							A: 'Rolling once from K onto R puts R flat on the floor. That’s the upside-down trap!',
							B: 'W and P are the faces in between, but L has to land too.',
							D: '4 is the halfway distance round the tube, not the number of landings.',
						},
					},
				},
				{
					id: 'q14-2',
					tag: 'Find the top · 6 sides',
					stem: 'A tube has a regular 6-sided end with faces M N P Q R S in order, and face S joins back to face M. Face M is on the ground. Which face is flat on top?',
					options: abcd('Face P', 'Face Q', 'Face R', 'Face S'),
					answer: 'B',
					tutor: {
						explain: 'On a regular 6-sided tube, the opposite face is halfway round: 3 steps. Count from M: N is 1, P is 2, Q is 3. So face Q is flat on top.',
						traps: {
							A: 'Face P is only 2 steps from M, so it’s tilted, not on top.',
							C: 'Face R is 4 steps one way, but only 2 steps the other way (S, then R). It’s tilted too.',
							D: 'Face S touches face M along an edge, so it sits right beside the ground face.',
						},
					},
				},
				{
					id: 'q14-3',
					tag: 'Fewest landings · 6 sides',
					stem: 'Same tube: faces M N P Q R S in order round a regular 6-sided end, with face M on the ground. You want face N on top. How few other faces must land flat on the ground?',
					options: abcd('1', '2', '3', '4'),
					answer: 'B',
					tutor: {
						explain: 'Find the face opposite N first: 3 steps on from N is R. So R must finish on the ground. From M, the short way is backwards: S lands, then R lands. That’s 2 landings, and N is now on top.',
						traps: {
							A: 'One roll forward puts N on the ground. That’s the upside-down trap!',
							C: '3 is the halfway count from N to R, not the number of landings.',
							D: 'Rolling forwards (N, P, Q, R) also works, but it takes 4 landings, so it isn’t the fewest.',
						},
					},
				},
				{
					id: 'q14-4',
					tag: 'Find the top · 10 sides',
					stem: 'A tube has a regular 10-sided end with faces P Q R S T U V W X Y in order, and face Y joins back to face P. Face P is on the ground. Which face is flat on top?',
					options: abcd('Face S', 'Face T', 'Face U', 'Face V'),
					answer: 'C',
					tutor: {
						explain: 'Ten faces means halfway is 5 steps. Count from P: Q, R, S, T, U. Face U is opposite P, so it’s flat on top.',
						traps: {
							A: 'Face S is only 3 steps round, so it’s still on the side.',
							B: 'Face T is 4 steps round, one short of halfway.',
							D: 'Face V is 6 steps one way, which is only 4 steps the other way. It’s one past halfway.',
						},
					},
				},
				{
					id: 'q14-5',
					tag: 'Odd-sided tube · 5 sides',
					stem: 'A tube has a regular 5-sided end with faces F G H J K in order, and face K joins back to face F. Face F is on the ground. What is at the very top of the tube?',
					options: abcd('Face H, lying flat', 'Face J, lying flat', 'An edge where faces H and J meet', 'Faces G and K, side by side'),
					answer: 'C',
					tutor: {
						explain: 'With 5 sides there’s no face exactly halfway round. Faces H and J are both 2 steps from F, one each way, so they lean in and meet. Sketch a regular pentagon standing on one side: its top is a corner. On the tube, that corner is an edge.',
						traps: {
							A: 'Face H is 2 steps one way, but face J is also 2 steps the other way. They’re tied, so neither one lies flat on top.',
							B: 'Face J and face H are tied at 2 steps each, so neither one lies flat on top.',
							D: 'Faces G and K touch the ground face F, so they’re the lowest sloping sides, not the top.',
						},
					},
				},
				{
					id: 'q14-6',
					tag: 'Fewest landings · 8 sides',
					stem: 'A tube has a regular 8-sided end with faces K L M N P Q R S in order, and face S joins back to face K. Face K is on the ground. You want face M on top. How few other faces must land flat on the ground?',
					options: abcd('1', '2', '4', '6'),
					answer: 'B',
					tutor: {
						explain: 'Halfway round 8 faces is 4 steps, so face R is opposite M. R has to finish on the ground. From K, roll backwards: S lands, then R lands. Just 2 landings, and M is on top.',
						traps: {
							A: 'One roll backwards lands S, but R still needs to come down.',
							C: '4 is the halfway distance from M to R, not the number of landings.',
							D: 'Rolling forwards (L, M, N, P, Q, R) works too, but 6 landings isn’t the fewest.',
						},
					},
				},
			],
		},
		{
			id: 'q18',
			code: 'Q18',
			short: 'Shape analogy',
			subject: 'Abstract reasoning · Shape analogies',
			title: 'Which picture fits?',
			summary: 'Separate shapes from shades on Mr. Boris’s analogy puzzle, beat the sticky-paint trap, and check every layer from the outside in.',
			video: demoVideo({learner: 'Chloe', subject: 'Abstract reasoning', title: 'Which picture fits?', chapters: q18Chapters}),
			chapters: q18Chapters,
			followUp: {
				rule: 'Use the example to find both orders. Check shapes and shades from the outside in.',
				steps: [
					'Number the diagonal input from top left (1) to bottom right (4), and read nested layers from outside in.',
					'Track only the outlines first to see which starting position goes into each nested layer.',
					'Track the shades separately, then check every layer, not just the outer shape, against all four options.',
				],
				pitfall: 'The sticky-paint trap: assuming each shape carries its original fill colour when it moves to a new layer.',
			},
			questions: [
				{
					id: 'q18-1',
					tag: 'Shapes move, shades stay',
					stem: 'In a shape puzzle, the outlines move to new places but the shades stay where they started. Place 1 holds a black circle and place 2 holds a white square. The rule moves the square into place 1. What is in place 1 now?',
					options: abcd('A white square', 'A black square', 'A black circle', 'A white circle'),
					answer: 'B',
					tutor: {
						explain: 'Shades stay put, so place 1 keeps its black. Only the outline changes: the square moves in. Put them together and you get a black square.',
						traps: {
							A: 'That’s the sticky-paint trap: the square left its white paint behind in place 2.',
							C: 'The circle’s outline moved away. Only its black shade stayed in place 1.',
							D: 'This changes the shade and keeps the old outline, which is the opposite of the rule.',
						},
					},
				},
				{
					id: 'q18-2',
					tag: 'Read the order',
					stem: 'The shapes follow the order 2–4–1–3, read from the outside layer in. The diagonal holds: 1 triangle, 2 heart, 3 circle, 4 star. Which shape goes in the innermost layer?',
					options: abcd('Triangle', 'Heart', 'Circle', 'Star'),
					answer: 'C',
					tutor: {
						explain: 'Read 2–4–1–3 as outside to inside. The innermost layer is the 4th number, which is 3. So the shape from place 3, the circle, goes in the middle.',
						traps: {
							A: 'The triangle comes from place 1, the 3rd number, so it goes in layer 3.',
							B: 'The heart (place 2) is the first number, so it goes on the outside.',
							D: 'The star sits in place 4, but the 4th layer takes the shape from place 3.',
						},
					},
				},
				{
					id: 'q18-3',
					tag: 'Check every layer',
					stem: 'Options B and D have the same two outside layers, and every shade matches the rule in both. What should you do next?',
					options: abcd('Pick either one, they’re the same', 'Check layer 3 and the centre against both orders', 'Choose the one with more black', 'Go back and check only the shades again'),
					answer: 'B',
					tutor: {
						explain: 'When two options match on the outside, the difference is hiding deeper. Check layer 3 and the centre against the shape order and the shade order. One of them will break the rule.',
						traps: {
							A: 'Two different options can’t both be right, so look deeper for the difference.',
							C: 'The amount of black isn’t part of any rule here.',
							D: 'The shades already match in both, so they can’t tell B and D apart.',
						},
					},
				},
			],
		},
	],
};
