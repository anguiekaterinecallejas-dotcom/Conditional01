import React, { useState } from 'react';
import {
  Trophy,
  Sparkles,
  Flame,
  Volume2,
  Copy,
  Check,
  RotateCcw,
  BookOpen,
  Award
} from 'lucide-react';
import { PlayerStats } from '../types';
import { SENTENCES } from '../data/sentences';
import { soundEngine, speakEnglish } from '../utils/audio';

interface StudySummaryProps {
  stats: PlayerStats;
  onPlayAgain: () => void;
}

export const StudySummary: React.FC<StudySummaryProps> = ({ stats, onPlayAgain }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<'all' | 'zero' | 'first'>('all');

  const accuracy = stats.totalAnswered > 0
    ? Math.round((stats.correctAnswers / stats.totalAnswered) * 100)
    : 100;

  const handlePronounce = (text: string) => {
    soundEngine.playPop();
    speakEnglish(text);
  };

  const handleCopyNotes = () => {
    soundEngine.playPop();
    const text = SENTENCES.map((s, idx) =>
      `${idx + 1}. [${s.type.toUpperCase()} CONDITIONAL] ${s.fullSentence}\n   Rule: ${s.explanation}`
    ).join('\n\n');

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const displayedSentences = SENTENCES.filter(
    (s) => filterType === 'all' || s.type === filterType
  );

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Top Banner / Performance Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 text-amber-800 text-xs font-bold rounded-full uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Academy Performance Report
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Grammar Mastery Report Card
            </h2>
            <p className="text-sm text-slate-500">
              Review your scores, streak achievements, and the full 10-sentence curriculum.
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playPop();
              onPlayAgain();
            }}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-102 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Play Safari Again
          </button>
        </div>

        {/* 4 Performance Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1">
            <span className="text-xs font-semibold text-slate-500">Total Score</span>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-slate-900 font-mono">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
              <span>{stats.score}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1">
            <span className="text-xs font-semibold text-slate-500">Highest Streak</span>
            <div className="flex items-center justify-center gap-1.5 text-2xl font-black text-amber-600 font-mono">
              <Flame className="w-5 h-5 fill-amber-500 text-amber-500" />
              <span>{stats.highestStreak}x</span>
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1">
            <span className="text-xs font-semibold text-slate-500">Accuracy</span>
            <div className="text-2xl font-black text-emerald-600 font-mono">
              {accuracy}%
            </div>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-1">
            <span className="text-xs font-semibold text-slate-500">Mastered Sentences</span>
            <div className="text-2xl font-black text-indigo-600 font-mono">
              {stats.completedSentenceIds.length} / 10
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Section: The 10 Educational Sentences */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-900">
              The 10 Educational Curriculum Sentences
            </h3>
          </div>

          {/* Controls: Filter and Copy */}
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'all' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                All (10)
              </button>
              <button
                onClick={() => setFilterType('zero')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'zero' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                Zero Conditional (5)
              </button>
              <button
                onClick={() => setFilterType('first')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  filterType === 'first' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                }`}
              >
                First Conditional (5)
              </button>
            </div>

            <button
              onClick={handleCopyNotes}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 transition-colors shadow-2xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Study Notes'}</span>
            </button>
          </div>
        </div>

        {/* 10 Sentences Cards List */}
        <div className="space-y-3">
          {displayedSentences.map((sentence, idx) => {
            const isZero = sentence.type === 'zero';
            const globalIndex = SENTENCES.findIndex((s) => s.id === sentence.id) + 1;

            return (
              <div
                key={sentence.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:shadow-sm transition-shadow space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold font-mono text-slate-700">
                      {globalIndex}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                        isZero
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-indigo-100 text-indigo-800'
                      }`}
                    >
                      {isZero ? 'Type 0: Zero Conditional' : 'Type 1: First Conditional'}
                    </span>
                    <span className="text-xs font-medium text-slate-400 hidden sm:inline">
                      · {sentence.context}
                    </span>
                  </div>

                  <button
                    onClick={() => handlePronounce(sentence.fullSentence)}
                    title="Listen to native pronunciation"
                    className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Full Sentence with highlight */}
                <div className="text-base font-bold text-slate-900 leading-snug">
                  &quot;{sentence.fullSentence}&quot;
                </div>

                {/* Clause Syntax Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Condition Clause (Present Simple):
                    </span>
                    <span className="font-semibold text-slate-800">{sentence.conditionClause}</span>
                    <span className="text-indigo-600 font-mono block text-[11px] mt-0.5">
                      Verb: {sentence.conditionVerb}
                    </span>
                  </div>

                  <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                      Result Clause ({isZero ? 'Present Simple' : 'WILL + Base Verb'}):
                    </span>
                    <span className="font-semibold text-slate-800">{sentence.resultClause}</span>
                    <span className="text-emerald-600 font-mono block text-[11px] mt-0.5">
                      Verb: {sentence.resultVerb}
                    </span>
                  </div>
                </div>

                {/* Teacher / Educational Note */}
                <p className="text-xs text-slate-600 bg-slate-50/60 p-2.5 rounded-xl border border-slate-100">
                  <strong className="text-slate-800">Why this form?</strong> {sentence.explanation}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
