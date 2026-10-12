import { SentenceItem } from '../types';

export const SENTENCES: SentenceItem[] = [
  // LEVEL 1: Zero Conditional Basics (School Routines & Universal Classroom Truths)
  {
    id: 'sent-1',
    type: 'zero',
    title: 'School Morning Routine',
    context: 'Classroom arrival policy & morning announcements',
    conditionClause: 'If students arrive late to class',
    conditionVerb: 'arrive (Present Simple)',
    resultClause: 'they miss the morning announcements',
    resultVerb: 'miss (Present Simple)',
    fullSentence: 'If students arrive late to class, they miss the morning announcements.',
    explanation: 'Zero Conditional expresses a routine or general rule that always happens. Both clauses use the Present Simple tense: "arrive" and "miss".',
    teacherNote: 'Notice there is NO "will" here because this is a standard classroom rule that happens every single time.',
    level: 1,
    quiz: {
      prompt: 'Complete this classroom rule with the correct verb forms:',
      targetSlot: 'result',
      sentenceWithBlank: 'If students arrive late to class, they ________ the morning announcements.',
      options: [
        { text: 'miss', isCorrect: true, feedback: 'Spot on! Both clauses use Present Simple (arrive -> miss) for established classroom routines.' },
        { text: 'will miss', isCorrect: false, feedback: 'Zero Conditional states timeless rules, so we use Present Simple "miss", not "will miss".' },
        { text: 'missed', isCorrect: false, feedback: '"Missed" is in the past tense. Zero Conditional uses Present Simple.' },
      ]
    },
    scramble: {
      words: ['If', 'students', 'arrive', 'late', 'to', 'class,', 'they', 'miss', 'the', 'morning', 'announcements.'],
      hint: 'Remember: Start with "If students..." and end with the routine result.'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Does this describe a timeless school routine or a one-time prediction for tomorrow?',
      whyIsIt: 'It describes an ongoing school regulation and regular routine, making it a Zero Conditional fact.',
      ruleClue: 'If + Present Simple, + Present Simple (Always true)'
    }
  },
  {
    id: 'sent-2',
    type: 'zero',
    title: 'Science Lab Experiment',
    context: 'Science laboratory observation with ice and heat',
    conditionClause: 'If you heat ice in science class',
    conditionVerb: 'heat (Present Simple)',
    resultClause: 'it melts into water',
    resultVerb: 'melts (Present Simple with -s)',
    fullSentence: 'If you heat ice in science class, it melts into water.',
    explanation: 'Scientific facts and physical laws are always Zero Conditional. Whenever ice is heated, it naturally melts.',
    teacherNote: 'Highlight third-person singular "-s" on "melts" for A2 learners.',
    level: 1,
    quiz: {
      prompt: 'Choose the correct verb form for this scientific fact:',
      targetSlot: 'result',
      sentenceWithBlank: 'If you heat ice in science class, it ________ into water.',
      options: [
        { text: 'melts', isCorrect: true, feedback: 'Excellent! "It melts" is Present Simple for a universal scientific law.' },
        { text: 'melt', isCorrect: false, feedback: 'Close, but "it" takes the third-person singular ending: "melts".' },
        { text: 'will melt', isCorrect: false, feedback: 'This is a natural law of physics that is always true, so we use Present Simple ("melts").' },
      ]
    },
    scramble: {
      words: ['If', 'you', 'heat', 'ice', 'in', 'science', 'class,', 'it', 'melts', 'into', 'water.'],
      hint: 'Heat the ice in class first, then observe what it does!'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Is ice melting when heated a guaranteed physical truth, or an uncertain future event?',
      whyIsIt: 'It is a permanent scientific truth. Scientific laws always use the Zero Conditional.',
      ruleClue: 'Scientific Fact: If + Present Simple, + Present Simple'
    }
  },
  {
    id: 'sent-3',
    type: 'zero',
    title: 'Classroom Equipment',
    context: 'Operating the digital video projector during lessons',
    conditionClause: 'If the teacher presses the red button on the projector',
    conditionVerb: 'presses (Present Simple with -es)',
    resultClause: 'it turns off immediately',
    resultVerb: 'turns off (Present Simple)',
    fullSentence: 'If the teacher presses the red button on the projector, it turns off immediately.',
    explanation: 'Machine instructions and direct cause-and-effect mechanisms use Zero Conditional (Present Simple in both parts).',
    teacherNote: 'Note how pressing the button directly causes the machine to switch off each time.',
    level: 2,
    quiz: {
      prompt: 'Select the correct condition verb:',
      targetSlot: 'condition',
      sentenceWithBlank: 'If the teacher ________ the red button on the projector, it turns off immediately.',
      options: [
        { text: 'presses', isCorrect: true, feedback: 'Correct! "The teacher" is third-person singular (he/she), so we add "-es" to "press".' },
        { text: 'will press', isCorrect: false, feedback: 'We never put "will" inside the IF-clause!' },
        { text: 'press', isCorrect: false, feedback: 'Don\'t forget: the subject is "the teacher", so it needs "presses".' },
      ]
    },
    scramble: {
      words: ['If', 'the', 'teacher', 'presses', 'the', 'red', 'button,', 'it', 'turns', 'off', 'immediately.'],
      hint: 'The action on the button causes the projector to power down.'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Is this an operational mechanical rule or a future guess?',
      whyIsIt: 'Pressing the power button is an operational rule that reliably produces the same result every time.',
      ruleClue: 'Cause & Effect Mechanism: Zero Conditional'
    }
  },
  {
    id: 'sent-4',
    type: 'zero',
    title: 'Effective Teaching & Learning',
    context: 'Pedagogical clarity and student understanding',
    conditionClause: 'If instructors explain the grammar rules clearly',
    conditionVerb: 'explain (Present Simple)',
    resultClause: 'students understand faster',
    resultVerb: 'understand (Present Simple)',
    fullSentence: 'If instructors explain the grammar rules clearly, students understand faster.',
    explanation: 'This expresses a general educational principle: clear explanation leads to faster comprehension.',
    teacherNote: 'Notice both verbs are base plural forms: instructors explain / students understand.',
    level: 2,
    quiz: {
      prompt: 'Fill in the blanks to complete this general learning principle:',
      targetSlot: 'result',
      sentenceWithBlank: 'If instructors explain the grammar rules clearly, students ________ faster.',
      options: [
        { text: 'understand', isCorrect: true, feedback: 'Well done! A general pedagogical truth uses Present Simple for both clauses.' },
        { text: 'will understand', isCorrect: false, feedback: 'While "will understand" is possible for a specific upcoming class, as a universal rule we use Present Simple.' },
        { text: 'understood', isCorrect: false, feedback: '"Understood" is past tense. Use Present Simple here.' },
      ]
    },
    scramble: {
      words: ['If', 'instructors', 'explain', 'grammar', 'rules', 'clearly,', 'students', 'understand', 'faster.'],
      hint: 'Start with the teachers\' clear explanation!'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Does this describe a general principle of education or an isolated prediction?',
      whyIsIt: 'It is a recognized educational reality and teaching habit, characteristic of Zero Conditional.',
      ruleClue: 'General Habit & Principle: Zero Conditional'
    }
  },
  {
    id: 'sent-5',
    type: 'zero',
    title: 'Exam Preparation & Wellness',
    context: 'Sleep habits and physiological focus during tests',
    conditionClause: 'If you do not sleep well before an exam',
    conditionVerb: 'do not sleep (Present Simple Negative)',
    resultClause: 'you feel exhausted during class',
    resultVerb: 'feel (Present Simple)',
    fullSentence: 'If you do not sleep well before an exam, you feel exhausted during class.',
    explanation: 'Negative condition in Zero Conditional uses "do not / does not + base verb". The result is a natural physical reaction.',
    teacherNote: 'Great for practicing the auxiliary "do not" with present simple.',
    level: 2,
    quiz: {
      prompt: 'Pick the correct negative condition form:',
      targetSlot: 'condition',
      sentenceWithBlank: 'If you ________ well before an exam, you feel exhausted during class.',
      options: [
        { text: 'do not sleep', isCorrect: true, feedback: 'Super! "Do not sleep" is the standard Present Simple negative for "you".' },
        { text: 'will not sleep', isCorrect: false, feedback: 'Never use "will not" in the conditional IF-clause!' },
        { text: 'not sleep', isCorrect: false, feedback: 'In English, we need the auxiliary verb "do" to make the present negative.' },
      ]
    },
    scramble: {
      words: ['If', 'you', 'do', 'not', 'sleep', 'well,', 'you', 'feel', 'exhausted', 'during', 'class.'],
      hint: 'Form the negative condition first with "do not sleep".'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Is feeling tired after lack of sleep a personal universal fact or a special prophecy?',
      whyIsIt: 'It is a direct physiological consequence that applies regularly to anyone who lacks rest.',
      ruleClue: 'Physiological Fact: Zero Conditional'
    }
  },

  // LEVEL 3 & 4: First Conditional (Specific Real Future Possibilities & Consequences)
  {
    id: 'sent-6',
    type: 'first',
    title: 'Tonight\'s Study Plan',
    context: 'Preparing for tomorrow morning\'s English quiz',
    conditionClause: 'If you study your notes tonight',
    conditionVerb: 'study (Present Simple)',
    resultClause: 'you will pass tomorrow\'s English quiz',
    resultVerb: 'will pass (Future with will)',
    fullSentence: 'If you study your notes tonight, you will pass tomorrow\'s English quiz.',
    explanation: 'First Conditional is for a specific real possibility in the future. "Tonight" (condition in present) leads to "tomorrow" (result with WILL).',
    teacherNote: 'Emphasize the contrast: Present simple in the IF-clause, WILL + base verb in the result!',
    level: 3,
    quiz: {
      prompt: 'Choose the correct form for this future possibility:',
      targetSlot: 'result',
      sentenceWithBlank: 'If you study your notes tonight, you ________ tomorrow\'s English quiz.',
      options: [
        { text: 'will pass', isCorrect: true, feedback: 'Perfect! First Conditional predicts a real future result using "will + pass".' },
        { text: 'pass', isCorrect: false, feedback: 'This refers to a specific future test ("tomorrow"), so we need "will pass".' },
        { text: 'would pass', isCorrect: false, feedback: '"Would pass" is for Second Conditional (unreal/hypothetical). Here it\'s a realistic future event!' },
      ]
    },
    scramble: {
      words: ['If', 'you', 'study', 'your', 'notes', 'tonight,', 'you', 'will', 'pass', "tomorrow's", 'quiz.'],
      hint: 'Condition: Study tonight ➔ Result: will pass tomorrow!'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Does this sentence talk about "tomorrow" or a timeless routine?',
      whyIsIt: 'It refers to a specific upcoming event ("tomorrow\'s quiz") with a real future outcome, so it is First Conditional.',
      ruleClue: 'Real Future Condition: If + Present Simple, + WILL + Verb'
    }
  },
  {
    id: 'sent-7',
    type: 'first',
    title: 'Recess Weather Alert',
    context: 'School sports schedule depending on afternoon rain',
    conditionClause: 'If it rains during afternoon recess',
    conditionVerb: 'rains (Present Simple with -s)',
    resultClause: 'the coach will cancel outdoor sports',
    resultVerb: 'will cancel (Future with will)',
    fullSentence: 'If it rains during afternoon recess, the coach will cancel outdoor sports.',
    explanation: 'A real possibility this afternoon: IF it rains (Present Simple), the coach WILL cancel (Future).',
    teacherNote: 'Watch out: Students often incorrectly say "If it will rain". Always teach: NO WILL after IF!',
    level: 3,
    quiz: {
      prompt: 'Which option correctly completes the IF-clause?',
      targetSlot: 'condition',
      sentenceWithBlank: 'If it ________ during afternoon recess, the coach will cancel outdoor sports.',
      options: [
        { text: 'rains', isCorrect: true, feedback: 'Bravo! Even though we are talking about this afternoon, the IF-clause takes Present Simple "rains".' },
        { text: 'will rain', isCorrect: false, feedback: 'Golden rule: Never put "will" inside the IF-clause! Use Present Simple "rains".' },
        { text: 'rain', isCorrect: false, feedback: 'With the subject "it", we must add "-s": "rains".' },
      ]
    },
    scramble: {
      words: ['If', 'it', 'rains', 'during', 'recess,', 'the', 'coach', 'will', 'cancel', 'outdoor', 'sports.'],
      hint: 'Start with the weather condition ("If it rains...").'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Is this an unavoidable scientific fact or a possible future weather event?',
      whyIsIt: 'It may or may not rain this afternoon. It is a genuine future possibility with a planned consequence, so it is First Conditional.',
      ruleClue: 'Future Possibility: First Conditional'
    }
  },
  {
    id: 'sent-8',
    type: 'first',
    title: 'Study Hall Support',
    context: 'Asking the tutor for homework assistance',
    conditionClause: 'If you ask questions during study hall',
    conditionVerb: 'ask (Present Simple)',
    resultClause: 'the tutor will help you with your homework',
    resultVerb: 'will help (Future with will)',
    fullSentence: 'If you ask questions during study hall, the tutor will help you with your homework.',
    explanation: 'First Conditional offers a realistic promise: if you take the action to ask, the tutor will respond in the future.',
    teacherNote: 'Demonstrates a common educational promise / advice structure.',
    level: 3,
    quiz: {
      prompt: 'Select the correct future result verb:',
      targetSlot: 'result',
      sentenceWithBlank: 'If you ask questions during study hall, the tutor ________ you with your homework.',
      options: [
        { text: 'will help', isCorrect: true, feedback: 'Brilliant! "Will help" expresses the probable future outcome of asking questions.' },
        { text: 'helps', isCorrect: false, feedback: 'While "helps" can be zero conditional, when promising future assistance we use "will help".' },
        { text: 'helping', isCorrect: false, feedback: '"Helping" is a participle and cannot stand alone as the main future verb.' },
      ]
    },
    scramble: {
      words: ['If', 'you', 'ask', 'questions,', 'the', 'tutor', 'will', 'help', 'you', 'with', 'homework.'],
      hint: 'Ask questions first, and the tutor will help!'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Does this sentence promise a specific future helpful action?',
      whyIsIt: 'It sets up a condition for upcoming study hall with a promised future response using "will help".',
      ruleClue: 'Future Promise / Consequence: First Conditional'
    }
  },
  {
    id: 'sent-9',
    type: 'first',
    title: 'Science Fair Project',
    context: 'Team presentation at the school auditorium',
    conditionClause: 'If our group finishes the project early',
    conditionVerb: 'finishes (Present Simple with -es)',
    resultClause: 'we will present it to the whole school',
    resultVerb: 'will present (Future with will)',
    fullSentence: 'If our group finishes the project early, we will present it to the whole school.',
    explanation: 'A condition that might happen this week: finishing early leads to presenting to the school.',
    teacherNote: 'Highlight "our group finishes" (singular collective noun taking -es in present simple).',
    level: 4,
    quiz: {
      prompt: 'Complete the sentence with the correct verb forms:',
      targetSlot: 'condition',
      sentenceWithBlank: 'If our group ________ the project early, we will present it to the whole school.',
      options: [
        { text: 'finishes', isCorrect: true, feedback: 'Terrific! "Our group" is treated as singular here, so we conjugate "finishes".' },
        { text: 'will finish', isCorrect: false, feedback: 'Remember: Never put "will" inside the IF-clause in English!' },
        { text: 'finish', isCorrect: false, feedback: 'Singular subject "our group" requires the third-person ending "-es" (finishes).' },
      ]
    },
    scramble: {
      words: ['If', 'our', 'group', 'finishes', 'early,', 'we', 'will', 'present', 'the', 'project', 'to', 'school.'],
      hint: 'Begin with the group condition, followed by "we will present...".'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Is presenting the project a fixed law of nature or an achievable future milestone?',
      whyIsIt: 'It is a contingent future milestone dependent on finishing the work, making it First Conditional.',
      ruleClue: 'Future Plan & Milestone: First Conditional'
    }
  },
  {
    id: 'sent-10',
    type: 'first',
    title: 'Daily Language Fluency',
    context: 'Language acquisition commitment and future progress',
    conditionClause: 'If we practice speaking English every day',
    conditionVerb: 'practice (Present Simple)',
    resultClause: 'our fluency will improve significantly',
    resultVerb: 'will improve (Future with will)',
    fullSentence: 'If we practice speaking English every day, our fluency will improve significantly.',
    explanation: 'An inspiring motivation for students: committing to daily practice now guarantees that fluency will improve in the future.',
    teacherNote: 'A wonderful capstone sentence connecting the grammar topic directly to their English journey!',
    level: 4,
    quiz: {
      prompt: 'Choose the correct form for the future outcome:',
      targetSlot: 'result',
      sentenceWithBlank: 'If we practice speaking English every day, our fluency ________ significantly.',
      options: [
        { text: 'will improve', isCorrect: true, feedback: 'Magnificent! Consistent effort today guarantees that fluency WILL improve tomorrow!' },
        { text: 'improves', isCorrect: false, feedback: 'When expressing an encouraging prediction for future growth, we use "will improve".' },
        { text: 'is improving', isCorrect: false, feedback: '"Is improving" is present continuous. For future prediction, use "will improve".' },
      ]
    },
    scramble: {
      words: ['If', 'we', 'practice', 'English', 'every', 'day,', 'our', 'fluency', 'will', 'improve', 'significantly.'],
      hint: 'Connect daily practice to future fluency improvement.'
    },
    detective: {
      prompt: 'Classify this sentence:',
      scenarioQuestion: 'Does this motivate students with a confident future prediction?',
      whyIsIt: 'It states a realistic future development ("will improve") driven by current consistent actions.',
      ruleClue: 'Encouraging Future Result: First Conditional'
    }
  }
];

export const MASCOTS = [
  {
    id: 'owl' as const,
    name: 'Professor Hoot',
    species: 'Great Horned Owl',
    role: 'Grammar Master',
    motto: 'Wisdom begins with clear rules!',
    primaryColor: '#6366F1', // Indigo
    badgeColor: '#EEF2FF',
  },
  {
    id: 'panda' as const,
    name: 'Penny Panda',
    species: 'Giant Panda',
    role: 'Calm Coach',
    motto: 'One step at a time makes learning easy!',
    primaryColor: '#10B981', // Emerald
    badgeColor: '#ECFDF5',
  },
  {
    id: 'lion' as const,
    name: 'Leo Lion',
    species: 'Savanna Lion',
    role: 'Streak Champion',
    motto: 'Roar with confidence in every sentence!',
    primaryColor: '#F59E0B', // Amber
    badgeColor: '#FFFBEB',
  },
  {
    id: 'fox' as const,
    name: 'Riley Fox',
    species: 'Red Fox',
    role: 'Grammar Detective',
    motto: 'Spot the difference between facts and the future!',
    primaryColor: '#EF4444', // Coral / Red
    badgeColor: '#FEF2F2',
  },
  {
    id: 'turtle' as const,
    name: 'Toby Turtle',
    species: 'Sea Turtle',
    role: 'Patient Scholar',
    motto: 'Slow, steady, and 100% accurate!',
    primaryColor: '#0EA5E9', // Sky Blue
    badgeColor: '#F0F9FF',
  },
];
