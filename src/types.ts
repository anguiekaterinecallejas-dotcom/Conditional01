export type ConditionalType = 'zero' | 'first';

export type MascotType = 'owl' | 'panda' | 'lion' | 'fox' | 'turtle';

export type MascotEmotion = 'idle' | 'happy' | 'cheering' | 'thinking' | 'encouraging';

export type GameChallengeType = 'quiz' | 'scramble' | 'detective';

export interface SentenceItem {
  id: string;
  type: ConditionalType;
  title: string;
  context: string;
  conditionClause: string; // e.g. "If students arrive late to class"
  conditionVerb: string;   // e.g. "arrive"
  resultClause: string;    // e.g. "they miss the morning announcements"
  resultVerb: string;       // e.g. "miss" or "will pass"
  fullSentence: string;
  explanation: string;
  teacherNote: string;
  level: number; // 1, 2, 3, 4
  // Quiz activity
  quiz: {
    prompt: string;
    targetSlot: 'condition' | 'result' | 'connector';
    sentenceWithBlank: string;
    options: {
      text: string;
      isCorrect: boolean;
      feedback: string;
    }[];
  };
  // Scramble builder activity
  scramble: {
    words: string[]; // Order to tap/assemble
    hint: string;
  };
  // Detective question
  detective: {
    prompt: string;
    scenarioQuestion: string;
    whyIsIt: string;
    ruleClue: string;
  };
}

export interface PlayerStats {
  score: number;
  streak: number;
  highestStreak: number;
  totalAnswered: number;
  correctAnswers: number;
  selectedMascot: MascotType;
  soundEnabled: boolean;
  completedSentenceIds: string[];
  badges: string[];
  levelProgress: Record<number, number>; // level -> completion count
}
