import type { FaqItem } from '@/lib/posts';

export type HubKey = 'parents' | 'senior-high' | 'university';

export interface Hub {
  path: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  startHere: string[];
  sections: { heading: string; slugs: string[] }[];
  pitch: [string, string];
  faq: FaqItem[];
}

export const HUB_ORDER: HubKey[] = ['parents', 'senior-high', 'university'];

export const HUBS: Record<HubKey, Hub> = {
  parents: {
    path: 'for-parents',
    h1: 'Math Help for Parents',
    metaTitle: 'Math Help for Parents of Struggling Students',
    metaDescription:
      'Your child is struggling or failing math. Practical guides for parents: what to do first, how to help at home, math anxiety, and when a tutor or book fits.',
    intro: [
      'If your child is failing or dreading math, start by finding out exactly where they got lost, then make homework calmer and more independent. Most struggling students have a specific gap or a study method that does not work, not a lack of ability.',
      'These guides are written for parents of teenagers. They cover what to do this week, how to help without taking over, how to spot math anxiety, and when a tutor or a book is the right call.',
    ],
    startHere: ['my-child-is-failing-math', 'how-to-help-child-with-math', 'signs-child-needs-math-tutor', 'math-tutor-vs-math-book'],
    sections: [
      { heading: 'If your child is struggling or failing', slugs: ['my-child-is-failing-math', 'my-teenager-hates-math', 'what-to-do-when-failing-math-class', 'how-to-catch-up-in-math'] },
      { heading: 'Math anxiety and confidence', slugs: ['signs-child-has-math-anxiety', 'math-anxiety-middle-school', 'how-to-overcome-math-anxiety'] },
      { heading: 'Helping at home', slugs: ['how-to-help-child-with-math', 'best-way-to-practice-math-at-home', 'how-to-stop-procrastinating-on-math-homework'] },
      { heading: 'Tutors, books and resources', slugs: ['signs-child-needs-math-tutor', 'math-tutor-vs-math-book', 'khan-academy-vs-math-book', 'best-math-books-struggling-students', 'math-resources-struggling-students'] },
    ],
    pitch: [
      'Buying this for your son or daughter?',
      'How to Win at Mathematics gives your teen a step-by-step system for mindset, study method and test day, written by an author who struggled with math in high school himself. It is a $5 ebook, risk-free for 30 days.',
    ],
    faq: [
      { q: 'What should I do first if my child is failing math?', a: 'Talk to the teacher this week to find the exact topics and assignments behind the grade, then fix the earliest gap first. Failing grades usually come from one missing foundation skill or a study method that does not work under test conditions.' },
      { q: 'Should I get my child a math tutor?', a: 'A tutor helps most when a child has specific gaps and needs someone to check their work each week. If the problem is motivation or study method, a structured book or routine at home can work for far less money. Starting with a book and adding a tutor if gaps remain is a low-cost way to find out which your child needs.' },
      { q: 'How can I help with math homework if I do not remember the math?', a: 'Ask questions instead of explaining: what is the problem asking, what have you tried, where did it stop making sense. Your job is to keep your child thinking and to notice when to involve the teacher, not to re-teach the lesson.' },
    ],
  },
  'senior-high': {
    path: 'for-high-school-students',
    h1: 'Math Help for High School Students',
    metaTitle: 'Math Help for High School Students',
    metaDescription:
      'Failing math tests, behind in precalculus or cramming for a final? Practical guides for high school students on passing classes, tests and the SAT or ACT.',
    intro: [
      'If you are failing math tests even though you study, the fix is usually how you practice, not how much. Switch from rereading notes to doing problems from scratch, find the earliest topic where things stopped making sense, and repair that first.',
      'These guides cover passing specific classes from Algebra 1 to precalculus, getting through tests and finals, the SAT and ACT, and catching up when you are behind.',
    ],
    startHere: ['how-to-stop-failing-math-tests', 'what-to-do-when-failing-math-class', 'how-to-pass-precalculus', 'how-to-pass-math-exam-last-minute'],
    sections: [
      { heading: 'Pass your class', slugs: ['how-to-pass-algebra-1-high-school', 'how-to-pass-algebra-2', 'how-to-pass-geometry', 'how-to-do-geometry-proofs', 'how-to-pass-precalculus', 'how-to-pass-trigonometry', 'how-to-memorize-the-unit-circle'] },
      { heading: 'Tests, finals and the SAT or ACT', slugs: ['how-to-stop-failing-math-tests', 'how-to-prepare-for-math-final-exam', 'how-to-pass-math-exam-last-minute', 'how-to-stop-careless-mistakes-in-math', 'how-to-pass-sat-math', 'how-to-pass-act-math', 'sat-vs-act-math'] },
      { heading: 'If you are behind', slugs: ['what-to-do-when-failing-math-class', 'how-to-catch-up-in-math', 'what-to-do-when-you-dont-understand-math', 'how-to-stop-procrastinating-on-math-homework', 'how-to-get-better-at-math-word-problems'] },
      { heading: 'Mindset', slugs: ['why-am-i-so-bad-at-math', 'how-to-overcome-math-anxiety', 'i-used-to-hate-math-heres-what-changed'] },
    ],
    pitch: [
      'Studying hard and still failing tests?',
      'How to Win at Mathematics is the study and test system Sahil Bora built after struggling with math in his final years of high school. It is a $5 ebook, risk-free for 30 days.',
    ],
    faq: [
      { q: 'Why do I fail math tests even when I study?', a: 'Most students study by rereading notes and examples, which builds recognition, not the ability to solve problems alone. Tests ask you to solve problems alone, so practice that way: work problems from scratch with the book closed and the clock running.' },
      { q: 'Can I still pass math if I am failing now?', a: 'Often, yes, if enough graded work remains. Find out exactly what is left, ask your teacher about missing work and corrections, and put most of your effort into the next test and the final.' },
      { q: 'What is the hardest high school math class?', a: 'Many students find precalculus the biggest jump, because it moves fast and assumes algebra is automatic. Weak algebra, more than the new material, is usually what makes it feel hard.' },
    ],
  },
  university: {
    path: 'for-college-students',
    h1: 'Math Help for College and University Students',
    metaTitle: 'Math Help for College and University Students',
    metaDescription:
      'Failing college algebra, calculus or statistics, or facing a placement test? Practical guides for college and university students who struggle with math.',
    intro: [
      'College math moves faster than high school and assumes the basics are solid, so most students who struggle are missing earlier skills, not intelligence. Find the gap, practice with problems instead of notes, and use office hours early.',
      'These guides cover college algebra, calculus and statistics, placement tests, coming back to math as an adult, and studying on your own. Sahil Bora wrote them after going from poor high school results to outstanding marks in university engineering mathematics.',
    ],
    startHere: ['how-to-pass-college-math', 'how-to-pass-calculus', 'college-algebra-help', 'how-to-pass-math-placement-test'],
    sections: [
      { heading: 'Your courses', slugs: ['college-algebra-help', 'how-to-pass-calculus', 'how-to-pass-statistics', 'how-to-pass-precalculus', 'how-to-pass-trigonometry'] },
      { heading: 'Exams and grades', slugs: ['how-to-prepare-for-math-final-exam', 'how-to-stop-failing-math-tests', 'what-to-do-when-failing-math-class', 'how-to-get-better-at-math-fast'] },
      { heading: 'Coming back to math', slugs: ['how-to-pass-math-placement-test', 'how-to-improve-math-skills-as-adult', 'how-to-overcome-math-anxiety', 'what-science-says-about-being-bad-at-math'] },
      { heading: 'Studying on your own', slugs: ['how-to-pass-math-without-tutor', 'how-to-remember-math-formulas', 'math-study-guide-struggling-students'] },
    ],
    pitch: [
      'From poor high school results to top marks in university engineering maths.',
      'How to Win at Mathematics is the system Sahil Bora used to make that jump: mindset, study method and exam strategy in one plan. It is a $5 ebook, risk-free for 30 days.',
    ],
    faq: [
      { q: 'Why is college math so much harder than high school math?', a: 'College courses cover material faster, test less often, and expect you to fill gaps on your own. Students who relied on in-class practice in high school feel the change most.' },
      { q: 'What should I do if I am failing a college math class?', a: "Go to office hours this week, find out what is left to earn, and check your school's withdrawal deadline before it passes. Then rebuild the earliest gap and switch to problem-based practice." },
      { q: 'Can I get better at math as an adult?', a: 'Yes. Adults improve at math the same way students do: by filling specific gaps and practicing retrieval. Anxiety left over from school is often a bigger obstacle than ability.' },
    ],
  },
};
