# Conditionals Safari Academy: Zero & First Conditional

An interactive, gamified English grammar learning application tailored for A2-level EFL learners (accessible for school-age students while contextually engaging for adult learners). Features an interactive visual grammar breakdown, 10 classroom-focused contextual sentences, cartoon animal mentor mascots, Web Audio sound effects, native English speech synthesis, combo scoring, and progressive difficulty tiers.

## User Review & Critical Decisions

> [!IMPORTANT]
> The clarifying questions were dismissed with default preferences selected. The implementation incorporates an **Animated Animal Academy** setting with real-world **classroom and educational scenarios**, combining multi-stage interactive challenges (Quiz, Sentence Builder, and Conditional Classifier) with both synthesized Web Audio sound effects and browser Text-to-Speech (TTS) voice pronunciation.

- **Confirmed Educational Context**: 10 high-quality sentences set in classroom, studying, and school situations (5 Zero Conditional for rules and facts; 5 First Conditional for real future outcomes).
- **Gamification Mechanics**: Dynamic score tracking, combo multiplier (1x to 3x), hearts system (optional relax mode toggle), interactive animated animal guides (Professor Owl, Penny Panda, Leo Lion, Toby Turtle, Riley Fox), and end-of-stage celebratory confetti.
- **Audio & Accessibility**: Web Audio API oscillator synthesis for snappy game sounds (success chimes, level-up fanfare, soft errors) plus Native Web Speech API button to pronounce any sentence aloud in clear English.

---

## 1. Overview & Core Concept

### What It Does
*Conditionals Safari Academy* is a responsive web application that turns A2 conditional grammar practice into an engaging adventure. It starts with an illustrated, interactive "Grammar Workshop" explaining how Zero Conditional (*If + present simple, ... present simple*) differs from First Conditional (*If + present simple, ... will + base verb*). 

Students then progress through a 4-level safari adventure containing 10 educational sentences across three gameplay styles:
1. **Clause Match & Verb Form Selector**: Complete the missing clause or correct verb conjugation.
2. **Interactive Sentence Builder**: Assemble disordered words into properly punctuated conditional sentences.
3. **Detective Mode**: Identify whether real classroom scenarios are timeless facts (Zero) or future possibilities (First) with immediate explanatory feedback.

### Target Audience & Persona
- **A2 EFL / ESL Students (School-Age & Young Adults)**: Need clear, uncluttered rules, intuitive interactive touch targets ($\ge 44\text{px}$), visual cues, and motivating feedback without boring text dumps.
- **English Teachers / Instructors**: Can project the game onto interactive whiteboards or share it with students, complete with a printable/exportable learning recap and performance report.

### Key Value
Transforms abstract grammatical rules into concrete cause-and-effect reasoning using interactive controls, delightful animal animations, audio feedback, and progressive difficulty that sustains focus and retention.

---

## 2. User Experience & Visual Design

### Key User Flows
1. **Welcome & Character Selection**: Learners are greeted at the Academy gate by *Professor Hoot* (Owl). They can pick their animal companion mascot (Owl, Panda, Lion, Fox, Turtle) and view their current progress.
2. **Grammar Workshop (Theory & Formula Explorer)**:
   - Interactive comparative cards contrasting Zero (Facts / Rules) vs. First (Future Results).
   - "Formula Machine": Interactive sentence builder where toggling causes and conditions updates visual diagrams in real time.
   - Listen button to hear native pronunciation of key examples.
3. **Safari Campaign (4 Progressive Levels)**:
   - *Level 1: School Life & Daily Truths (Zero Conditional basics)*
   - *Level 2: Science Lab & Classroom Rules (Zero Conditional negative & interrogative)*
   - *Level 3: Study Plans & Tomorrow's Exams (First Conditional affirmative with will/won't)*
   - *Level 4: The Master Challenge (Mixed Zero vs. First Conditional speed & builder rounds)*
4. **Interactive Game Stage**:
   - Mascot reaction area with expressive SVG animal animations (thinking, cheering, jumping, encouraging).
   - Streak combo multiplier bar (2x, 3x score boost for consecutive correct answers).
   - Instant visual and audio feedback: green glow + chime for success; amber gentle hint + explanation for mistakes.
   - "Listen Sentence" button using English speech synthesis on every question.
5. **Victory Hall & Study Summary**:
   - Final score, accuracy rate, badges earned (e.g., "Grammar Detective", "Master of Future Time").
   - Detailed review list of all 10 educational sentences with grammatical breakdown for study notes.
   - Restart and level select buttons.

### Visual Identity & Theme
- **Aesthetic Direction**: Playful, modern educational game. Clean white/soft-slate background, polished card surfaces with subtle hairline borders, vibrant accents, and cheerful SVG animal cartoon illustrations.
- **Color Palette & Mood**:
  - *Dominant Canvas (60%)*: Warm soft cream / canvas (`#F8FAFC` to `#F1F5F9`) with crisp white card surfaces (`#FFFFFF`).
  - *Structural Panels (30%)*: Slate borders (`#E2E8F0`), muted navy text (`#0F172A`), subtitle slate (`#475569`).
  - *Focal Accents (10%)*: Emerald Green (`#10B981`) for correct answers and Zero Conditional facts; Indigo/Sky Blue (`#3B82F6` / `#6366F1`) for First Conditional future actions; Amber Gold (`#F59E0B`) for stars, combos, and badges.
- **Typography & Hierarchy**:
  - *Display / Titles*: `Plus Jakarta Sans` / `Outfit` (Bold, friendly geometric sans).
  - *Body / Sentences*: `Plus Jakarta Sans` (16px–18px, generous line height for non-native reading ease).
  - *Grammar Tokens / Verbs*: Distinct highlighted inline badges (`bg-indigo-50 text-indigo-700 font-semibold`).
- **Motion & Audio**:
  - Smooth tile drop and float animations using CSS transitions and Framer Motion.
  - Mascot bounce and eye-blink animations.
  - Zero-dependency Web Audio API sound synthesizer (pleasant melodic chords for correct answers, gentle wooden pop for tiles, celebration fanfare for level completion).

---

## 3. Key Product Decisions & Trade-Offs

### 1. Curated 10 Educational Sentences
- *Zero Conditional (Facts, Routines, Rules)*:
  1. *If students arrive late to class, they miss the morning announcements.*
  2. *If you heat ice in science class, it melts into water.*
  3. *If you press the red button on the classroom projector, it turns off.*
  4. *If teachers explain the grammar rules clearly, students understand faster.*
  5. *If you do not sleep well before an exam, you feel tired in class.*
- *First Conditional (Real Future Scenarios, Consequences)*:
  6. *If you study your notes tonight, you will pass tomorrow's English quiz.*
  7. *If it rains during afternoon recess, the teacher will cancel outdoor sports.*
  8. *If you ask the teacher questions, she will help you with your homework.*
  9. *If the students finish their project early, they will present it to the school.*
  10. *If we practice our vocabulary every day, our English speaking will improve greatly.*
- *Rationale*: Perfectly calibrated for A2 students: clear subject-verb agreements, high-frequency school vocabulary, natural classroom situations, and easily recognizable distinction between unchanging facts and future outcomes.

### 2. Dual Audio Architecture: Web Audio API + SpeechSynthesis
- *Audio Effects*: Built directly with browser Web Audio API (`AudioContext`). Generates chimes, pops, and fanfares client-side with 0KB external audio assets, eliminating broken sound links.
- *Spoken Voice*: Native `window.speechSynthesis` (en-US / en-GB) allows learners to hear natural sentence pronunciation at normal or 0.85x slow speed.

### 3. Animal Mentor System
- 5 custom SVG cartoon animals with animated eyes, smiles, and accessories:
  - **Professor Hoot (Owl)**: The wise instructor.
  - **Leo (Lion)**: Energetic motivator.
  - **Penny (Panda)**: Calm and encouraging.
  - **Riley (Fox)**: Clever grammar detective.
  - **Toby (Turtle)**: Slow and steady champion.
- Reacts dynamically to student actions with speech bubble hints and celebration poses.

---

## 4. Technical Architecture & Data Strategy

### Architecture & Component Diagram

```
┌────────────────────────────────────────────────────────────────────────┐
│                        App Root (src/App.tsx)                          │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   Global State: Screen, Current Level, Score, Mascot, Streak   │   │
│   │   Audio Engine: Web Audio SFX + SpeechSynthesis Pronunciation │   │
│   └────────────────────────────────────────────────────────────────┘   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
       ┌────────────────────────────┼───────────────────────────┐
       ▼                            ▼                           ▼
┌───────────────┐           ┌───────────────┐           ┌───────────────┐
│ GrammarGuide  │           │  SafariGame   │           │ VictoryScreen │
│ (Theory &     │           │  (Active Play │           │ (Results &    │
│  Interactive  │           │   Stage)      │           │  Grammar Note │
│  Formula Deck)│           └───────┬───────┘           │  Summary)     │
└───────────────┘                   │                   └───────────────┘
                                    │
           ┌────────────────────────┴───────────────────────┐
           ▼                                                ▼
┌───────────────────────┐                        ┌──────────────────────┐
│ MascotCompanion (SVG) │                        │ Activity Mechanics:  │
│ - Expressive Pose     │                        │ - Multiple Choice    │
│ - Speech Bubble Hint  │                        │ - Word Scramble Tile │
│ - Motion reactions    │                        │ - Detective Match    │
└───────────────────────┘                        └──────────────────────┘
```

### Data Model & Types

```typescript
export type ConditionalType = 'zero' | 'first';

export interface SentenceItem {
  id: string;
  type: ConditionalType;
  conditionClause: string;
  resultClause: string;
  fullSentence: string;
  explanation: string;
  level: number;
  grammarFocus: string;
  quizOptions: {
    question: string;
    options: string[];
    correctIndex: number;
  };
  scrambleWords: string[];
}

export interface PlayerStats {
  score: number;
  streak: number;
  highestStreak: number;
  correctCount: number;
  mascot: 'owl' | 'panda' | 'lion' | 'fox' | 'turtle';
  soundEnabled: boolean;
  completedLevels: number[];
}
```

### Interactive State Transitions
- **Select Option / Place Tile**: Immediately checks answer correctness.
- **Correct**: Triggers Web Audio chime + mascot jump animation + streak counter increment (+100 * streakMultiplier) + celebration particles.
- **Incorrect**: Plays gentle tone + mascot encouragement bubble + displays friendly explanation ("Remember: First conditional uses 'will' for the future outcome!"). Allows retry or proceed.
- **Level Completion**: Unlocks next safari badge and advances stage seamlessly.

---

## Implementation Steps & Verification

1. **Setup & Dependencies**:
   - Verify lucide-react and motion packages.
   - Configure metadata.json with descriptive app title and details.
2. **Audio & Asset Engine**:
   - Implement synthesized sound engine (`src/utils/audio.ts`) using Web Audio API for zero-latency, cross-browser reliable sound.
   - Implement speech pronunciation helper using `window.speechSynthesis`.
3. **Mascot & Visual Design**:
   - Design vector SVG cartoon animals with responsive animation states (happy, thinking, cheering).
4. **Grammar Curriculum & Exercises**:
   - Build 10 meticulously crafted classroom-context sentences in structured data format.
   - Create interactive comparison cards and rule slider.
5. **Gameplay Modes**:
   - Implement Level 1-4 progression, quiz selector, drag/tap sentence builder, and conditional detective.
6. **Victory & Study Review**:
   - Score calculation, achievement badges, printable summary of all 10 sentences.
7. **Verification**:
   - Run `compile_applet` to verify TypeScript builds cleanly.
   - Verify UI responsiveness across desktop and tablet views.
