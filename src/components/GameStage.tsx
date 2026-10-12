import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
  ArrowRight,
  Flame,
  RotateCcw,
  CheckCircle,
  HelpCircle,
  Trophy,
  Compass,
  Play
} from 'lucide-react';
import { SentenceItem, PlayerStats, GameChallengeType, MascotEmotion } from '../types';
import { SENTENCES, MASCOTS } from '../data/sentences';
import { Mascot } from './Mascot';
import { VideoExplainer } from './VideoExplainer';
import { soundEngine, speakEnglish } from '../utils/audio';

interface GameStageProps {
  stats: PlayerStats;
  onUpdateStats: (updater: (prev: PlayerStats) => PlayerStats) => void;
  onViewSummary: () => void;
  onOpenVideo?: () => void;
}

export const GameStage: React.FC<GameStageProps> = ({
  stats,
  onUpdateStats,
  onViewSummary,
  onOpenVideo,
}) => {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [activityType, setActivityType] = useState<GameChallengeType>('quiz');
  const [mascotEmotion, setMascotEmotion] = useState<MascotEmotion>('idle');
  const [speechBubble, setSpeechBubble] = useState<string>('Ready to test your conditional skills? Let\'s go!');
  const [showInlineVideo, setShowInlineVideo] = useState<boolean>(false);

  // Quiz state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  // Scramble state
  const [scrambleBank, setScrambleBank] = useState<string[]>([]);
  const [scrambleSelected, setScrambleSelected] = useState<string[]>([]);
  const [scrambleStatus, setScrambleStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');

  // Detective state
  const [detectiveChoice, setDetectiveChoice] = useState<'zero' | 'first' | null>(null);
  const [detectiveSubmitted, setDetectiveSubmitted] = useState<boolean>(false);

  // Filter sentences by level
  const levelSentences = SENTENCES.filter((s) => s.level === currentLevel);
  const currentSentence: SentenceItem = levelSentences[currentIndex] || levelSentences[0] || SENTENCES[0];
  const mascotInfo = MASCOTS.find((m) => m.id === stats.selectedMascot) || MASCOTS[0];

  // Initialize/Reset state when sentence changes
  useEffect(() => {
    setSelectedOption(null);
    setQuizSubmitted(false);
    setDetectiveChoice(null);
    setDetectiveSubmitted(false);
    setScrambleStatus('idle');

    // Shuffle scramble words for builder mode
    if (currentSentence) {
      const shuffled = [...currentSentence.scramble.words].sort(() => Math.random() - 0.5);
      setScrambleBank(shuffled);
      setScrambleSelected([]);
    }

    setMascotEmotion('idle');
    setSpeechBubble(
      `Sentence ${currentIndex + 1} of ${levelSentences.length}: ${currentSentence.title}`
    );
  }, [currentIndex, currentLevel]);

  // Handle TTS pronunciation
  const handlePronounce = (text?: string) => {
    soundEngine.playPop();
    speakEnglish(text || currentSentence.fullSentence);
  };

  // Trigger celebration confetti
  const triggerConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366F1', '#10B981', '#F59E0B', '#3B82F6'],
    });
  };

  // Score multiplier based on streak
  const getMultiplier = (streak: number) => {
    if (streak >= 5) return 3;
    if (streak >= 3) return 2;
    if (streak >= 2) return 1.5;
    return 1;
  };

  // Register Correct Answer
  const handleCorrect = () => {
    soundEngine.playCorrect();
    triggerConfetti();

    const mult = getMultiplier(stats.streak + 1);
    const addedPoints = Math.round(100 * mult);

    onUpdateStats((prev) => {
      const newStreak = prev.streak + 1;
      const highest = Math.max(prev.highestStreak, newStreak);
      const completed = prev.completedSentenceIds.includes(currentSentence.id)
        ? prev.completedSentenceIds
        : [...prev.completedSentenceIds, currentSentence.id];

      if (newStreak >= 3) {
        soundEngine.playStreak();
      }

      return {
        ...prev,
        score: prev.score + addedPoints,
        streak: newStreak,
        highestStreak: highest,
        totalAnswered: prev.totalAnswered + 1,
        correctAnswers: prev.correctAnswers + 1,
        completedSentenceIds: completed,
      };
    });

    setMascotEmotion('cheering');
    setSpeechBubble(
      `Fantastic! +${addedPoints} pts! ${
        currentSentence.type === 'zero' ? 'Zero Conditional: Fact verified!' : 'First Conditional: Future prediction locked!'
      }`
    );
  };

  // Register Incorrect Attempt
  const handleIncorrect = (reason?: string) => {
    soundEngine.playIncorrect();

    onUpdateStats((prev) => ({
      ...prev,
      streak: 0,
      totalAnswered: prev.totalAnswered + 1,
    }));

    setMascotEmotion('encouraging');
    setSpeechBubble(reason || 'Almost! Take a look at the rule and try again.');
  };

  // Quiz Option Click
  const handleQuizSelect = (index: number) => {
    if (quizSubmitted) return;
    soundEngine.playPop();
    setSelectedOption(index);
    setQuizSubmitted(true);

    const isCorrect = currentSentence.quiz.options[index].isCorrect;
    if (isCorrect) {
      handleCorrect();
    } else {
      handleIncorrect(currentSentence.quiz.options[index].feedback);
    }
  };

  // Scramble Tile Tap (Move from bank to selected)
  const handleWordTap = (word: string, fromIndex: number) => {
    soundEngine.playPop();
    const newBank = [...scrambleBank];
    newBank.splice(fromIndex, 1);
    setScrambleBank(newBank);
    setScrambleSelected([...scrambleSelected, word]);
  };

  // Deselect Tile (Return from selected to bank)
  const handleRemoveWord = (word: string, fromIndex: number) => {
    soundEngine.playPop();
    const newSelected = [...scrambleSelected];
    newSelected.splice(fromIndex, 1);
    setScrambleSelected(newSelected);
    setScrambleBank([...scrambleBank, word]);
  };

  // Verify Scrambled Sentence
  const handleCheckScramble = () => {
    const assembled = scrambleSelected.join(' ').trim();
    const target = currentSentence.scramble.words.join(' ').trim();

    if (assembled.toLowerCase() === target.toLowerCase()) {
      setScrambleStatus('correct');
      handleCorrect();
    } else {
      setScrambleStatus('incorrect');
      handleIncorrect('Word order is tricky! Tip: Start with the IF-clause.');
    }
  };

  // Detective Mode Selection
  const handleDetectiveSelect = (choice: 'zero' | 'first') => {
    if (detectiveSubmitted) return;
    soundEngine.playPop();
    setDetectiveChoice(choice);
    setDetectiveSubmitted(true);

    if (choice === currentSentence.type) {
      handleCorrect();
    } else {
      handleIncorrect(`Not quite! This is ${currentSentence.type === 'zero' ? 'Zero' : 'First'} Conditional.`);
    }
  };

  // Advance to Next Sentence or Level
  const handleNext = () => {
    soundEngine.playPop();

    if (currentIndex < levelSentences.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Completed all sentences in this level
      soundEngine.playFanfare();
      triggerConfetti();

      if (currentLevel < 4) {
        setCurrentLevel((prev) => prev + 1);
        setCurrentIndex(0);
        setSpeechBubble(`Hooray! Level ${currentLevel} cleared! Welcome to Level ${currentLevel + 1}!`);
      } else {
        // Finished Level 4
        onViewSummary();
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Level & Streak Status Header */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
        {/* Level Indicator Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            { lvl: 1, label: 'Level 1: School Routines' },
            { lvl: 2, label: 'Level 2: Lab & Habits' },
            { lvl: 3, label: 'Level 3: Future Plans' },
            { lvl: 4, label: 'Level 4: Fluency Master' },
          ].map((levelItem) => (
            <button
              key={levelItem.lvl}
              onClick={() => {
                soundEngine.playPop();
                setCurrentLevel(levelItem.lvl);
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                currentLevel === levelItem.lvl
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {levelItem.label}
            </button>
          ))}
        </div>

        {/* Dynamic Streak & Multiplier Display */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-xl">
            <Flame className={`w-4 h-4 ${stats.streak > 0 ? 'text-amber-500 fill-amber-500 animate-bounce' : 'text-slate-400'}`} />
            <span className="text-xs font-bold text-amber-800">
              Streak: <span className="font-mono text-sm">{stats.streak}</span>
            </span>
            {stats.streak >= 2 && (
              <span className="px-1.5 py-0.5 bg-amber-500 text-white rounded text-[10px] font-extrabold">
                {getMultiplier(stats.streak)}x
              </span>
            )}
          </div>

          <button
            onClick={onViewSummary}
            className="flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-800 hover:underline cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5" />
            Report Card
          </button>
        </div>
      </div>

      {/* Video Explainer Shortcut Banner */}
      <div className="bg-linear-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-2xl p-4 sm:p-5 text-white shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-xs flex items-center justify-center shrink-0">
            <Play className="w-5 h-5 fill-white text-white" />
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-bold">
              Video Explicativo de Inicio: First Conditional
            </h4>
            <p className="text-xs text-indigo-100">
              ¿Quieres repasar las reglas con un video interactivo y voz en inglés antes de jugar?
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => {
              soundEngine.playPop();
              setShowInlineVideo(!showInlineVideo);
            }}
            className="px-4 py-2 bg-white text-indigo-700 hover:bg-indigo-50 font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-102 cursor-pointer flex items-center gap-1.5"
          >
            <span>{showInlineVideo ? 'Ocultar Video' : 'Ver Video Aquí'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Render Video Explainer Inline if active */}
      {showInlineVideo && (
        <div className="space-y-2">
          <VideoExplainer
            defaultExpanded={true}
            onContinueToGame={() => setShowInlineVideo(false)}
          />
        </div>
      )}

      {/* Main Interactive Stage Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 4 Cols: Animated Mascot Companion */}
        <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            <Compass className="w-3.5 h-3.5 text-indigo-600" />
            <span>Academy Companion</span>
          </div>

          <Mascot
            type={stats.selectedMascot}
            emotion={mascotEmotion}
            size="lg"
            bubbleText={speechBubble}
          />

          <div className="pt-2">
            <h3 className="text-base font-bold text-slate-900">{mascotInfo.name}</h3>
            <span className="text-xs text-slate-500">{mascotInfo.role}</span>
            <p className="text-xs text-slate-400 italic mt-1">&quot;{mascotInfo.motto}&quot;</p>
          </div>

          {/* Quick Pronunciation Tool */}
          <button
            onClick={() => handlePronounce()}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-50 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 rounded-xl text-xs font-bold text-slate-700 hover:text-indigo-700 transition-colors cursor-pointer"
          >
            <Volume2 className="w-4 h-4 text-indigo-600" />
            Pronounce Full Sentence
          </button>

          {/* Progress bar inside level */}
          <div className="w-full space-y-1.5 pt-2">
            <div className="flex justify-between text-[11px] font-semibold text-slate-500">
              <span>Progress in Level {currentLevel}</span>
              <span>{currentIndex + 1} / {levelSentences.length}</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / levelSentences.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Exercise Arena */}
        <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-6">
          {/* Activity Mode Switcher Tabs */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                Challenge Mode:
              </span>
              <div className="inline-flex p-0.5 bg-slate-100 rounded-lg">
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    setActivityType('quiz');
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activityType === 'quiz' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Clause Quiz
                </button>
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    setActivityType('scramble');
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activityType === 'scramble' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Word Builder
                </button>
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    setActivityType('detective');
                  }}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    activityType === 'detective' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Detective
                </button>
              </div>
            </div>

            <span className="text-xs font-medium text-slate-500">
              {currentSentence.type === 'zero' ? 'Type 0: Fact / Routine' : 'Type 1: Future Possibility'}
            </span>
          </div>

          {/* Sentence Context Banner */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Educational Situation: {currentSentence.context}
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {currentSentence.title}
            </h2>
          </div>

          {/* ========================================= */}
          {/* MODE 1: CLAUSE & VERB FORM QUIZ */}
          {/* ========================================= */}
          {activityType === 'quiz' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  {currentSentence.quiz.prompt}
                </span>
                <p className="text-lg font-medium text-slate-900 leading-relaxed font-sans">
                  {currentSentence.quiz.sentenceWithBlank}
                </p>
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-1 gap-3">
                {currentSentence.quiz.options.map((opt, idx) => {
                  let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
                  if (quizSubmitted) {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-2 ring-emerald-300';
                    } else if (selectedOption === idx) {
                      btnStyle = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                    } else {
                      btnStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={quizSubmitted}
                      onClick={() => handleQuizSelect(idx)}
                      className={`w-full p-4 text-left border rounded-xl text-sm transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 font-mono">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-base font-semibold">{opt.text}</span>
                      </div>
                      {quizSubmitted && opt.isCorrect && (
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback Alert when submitted */}
              <AnimatePresence>
                {quizSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2"
                  >
                    <div className="flex items-start gap-2 text-indigo-900 text-sm">
                      <HelpCircle className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-semibold">{currentSentence.explanation}</p>
                        <p className="text-xs text-indigo-700">{currentSentence.teacherNote}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* ========================================= */}
          {/* MODE 2: INTERACTIVE SENTENCE BUILDER */}
          {/* ========================================= */}
          {activityType === 'scramble' && (
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Tap the words in the correct grammatical order:
                </span>
                <p className="text-xs text-slate-500 italic">
                  Tip: {currentSentence.scramble.hint}
                </p>
              </div>

              {/* Assembly Tray */}
              <div className="min-h-24 p-4 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl flex flex-wrap gap-2 items-center">
                {scrambleSelected.length === 0 ? (
                  <span className="text-sm text-slate-400 select-none">
                    Tap the word bubbles below to build the sentence...
                  </span>
                ) : (
                  scrambleSelected.map((word, idx) => (
                    <motion.button
                      key={`${word}-${idx}`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      onClick={() => handleRemoveWord(word, idx)}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold shadow-xs hover:bg-indigo-700 transition-colors cursor-pointer"
                    >
                      {word}
                    </motion.button>
                  ))
                )}
              </div>

              {/* Word Bank */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase">Available Words:</span>
                <div className="flex flex-wrap gap-2">
                  {scrambleBank.map((word, idx) => (
                    <button
                      key={`${word}-${idx}`}
                      onClick={() => handleWordTap(word, idx)}
                      className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-lg text-sm font-semibold text-slate-800 transition-all shadow-2xs hover:scale-105 cursor-pointer"
                    >
                      {word}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Reset & Check */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => {
                    soundEngine.playPop();
                    const shuffled = [...currentSentence.scramble.words].sort(() => Math.random() - 0.5);
                    setScrambleBank(shuffled);
                    setScrambleSelected([]);
                    setScrambleStatus('idle');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset Words
                </button>

                <button
                  disabled={scrambleSelected.length === 0 || scrambleStatus === 'correct'}
                  onClick={handleCheckScramble}
                  className={`px-5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    scrambleStatus === 'correct'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                  }`}
                >
                  {scrambleStatus === 'correct' ? 'Verified!' : 'Check Sentence'}
                </button>
              </div>

              {/* Feedback */}
              {scrambleStatus === 'correct' && (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 font-medium">
                  {currentSentence.explanation}
                </div>
              )}
            </div>
          )}

          {/* ========================================= */}
          {/* MODE 3: CONDITIONAL DETECTIVE */}
          {/* ========================================= */}
          {activityType === 'detective' && (
            <div className="space-y-6">
              <div className="p-5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase">
                  Classroom Scenario Analysis:
                </span>
                <p className="text-lg font-bold text-slate-900">
                  &quot;{currentSentence.fullSentence}&quot;
                </p>
                <p className="text-sm text-slate-600">
                  {currentSentence.detective.scenarioQuestion}
                </p>
              </div>

              {/* Detective Selection Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  disabled={detectiveSubmitted}
                  onClick={() => handleDetectiveSelect('zero')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    detectiveSubmitted && currentSentence.type === 'zero'
                      ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300'
                      : detectiveSubmitted && detectiveChoice === 'zero'
                      ? 'bg-rose-50 border-rose-300'
                      : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/20'
                  }`}
                >
                  <span className="text-xs font-bold text-emerald-700 uppercase">Type 0</span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">Zero Conditional</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    It is a permanent rule, habit, or scientific truth that happens every time.
                  </p>
                </button>

                <button
                  disabled={detectiveSubmitted}
                  onClick={() => handleDetectiveSelect('first')}
                  className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer ${
                    detectiveSubmitted && currentSentence.type === 'first'
                      ? 'bg-indigo-50 border-indigo-500 ring-2 ring-indigo-300'
                      : detectiveSubmitted && detectiveChoice === 'first'
                      ? 'bg-rose-50 border-rose-300'
                      : 'bg-white border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/20'
                  }`}
                >
                  <span className="text-xs font-bold text-indigo-700 uppercase">Type 1</span>
                  <h4 className="text-base font-bold text-slate-900 mt-1">First Conditional</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    It is a real future event, prediction, or promise with &quot;will&quot;.
                  </p>
                </button>
              </div>

              {/* Detective Clue Solution */}
              {detectiveSubmitted && (
                <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1.5 text-xs text-indigo-950">
                  <span className="font-bold uppercase tracking-wider text-indigo-700">Detective Reasoning:</span>
                  <p className="font-medium">{currentSentence.detective.whyIsIt}</p>
                  <p className="text-slate-600 font-mono text-[11px]">{currentSentence.detective.ruleClue}</p>
                </div>
              )}
            </div>
          )}

          {/* Navigation to Next Sentence / Level */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">
              Total Score: <strong className="text-slate-800 font-mono">{stats.score}</strong> pts
            </span>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-transform hover:scale-102 cursor-pointer"
            >
              <span>{currentIndex < levelSentences.length - 1 ? 'Next Sentence' : 'Complete Level'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
