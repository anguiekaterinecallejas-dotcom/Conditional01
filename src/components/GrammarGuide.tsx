import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, BookOpen, Sparkles, RefreshCw, Play } from 'lucide-react';
import { speakEnglish, soundEngine } from '../utils/audio';
import { VideoExplainer } from './VideoExplainer';

interface GrammarGuideProps {
  onStartPlaying: () => void;
}

export const GrammarGuide: React.FC<GrammarGuideProps> = ({ onStartPlaying }) => {
  const [selectedDemo, setSelectedDemo] = useState<'science' | 'study' | 'projector' | 'weather'>('study');
  const [activeTab, setActiveTab] = useState<'video' | 'overview' | 'comparison' | 'interactive'>('video');

  const demoScenarios = {
    science: {
      type: 'Zero Conditional' as const,
      condition: 'If you heat ice in science class',
      result: 'it melts into water.',
      conditionVerb: 'heat (Present Simple)',
      resultVerb: 'melts (Present Simple)',
      category: 'Scientific Law / Fact',
      explanation: 'Every time ice is heated, it melts. It is a universal physical truth that never changes.',
      reversed: 'Ice melts into water if you heat it in science class.',
    },
    study: {
      type: 'First Conditional' as const,
      condition: 'If you study your notes tonight',
      result: 'you will pass tomorrow\'s English quiz.',
      conditionVerb: 'study (Present Simple)',
      resultVerb: 'will pass (Future with will)',
      category: 'Real Future Consequence',
      explanation: 'This refers to a specific upcoming event (tomorrow\'s test). Studying tonight produces a real future success.',
      reversed: 'You will pass tomorrow\'s English quiz if you study your notes tonight.',
    },
    projector: {
      type: 'Zero Conditional' as const,
      condition: 'If the teacher presses the red button on the projector',
      result: 'it turns off immediately.',
      conditionVerb: 'presses (Present Simple with -es)',
      resultVerb: 'turns off (Present Simple)',
      category: 'Classroom Machine Rule',
      explanation: 'The machine is programmed to react the exact same way every single time the button is pressed.',
      reversed: 'The projector turns off immediately if the teacher presses the red button.',
    },
    weather: {
      type: 'First Conditional' as const,
      condition: 'If it rains during afternoon recess',
      result: 'the teacher will cancel outdoor sports.',
      conditionVerb: 'rains (Present Simple with -s)',
      resultVerb: 'will cancel (Future with will)',
      category: 'Future Contingency Plan',
      explanation: 'It might rain this afternoon, or it might stay sunny. If it happens, the planned action is to cancel sports.',
      reversed: 'The teacher will cancel outdoor sports if it rains during afternoon recess.',
    },
  };

  const currentDemo = demoScenarios[selectedDemo];

  const handlePronounce = (text: string) => {
    soundEngine.playPop();
    speakEnglish(text);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* Hero Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
          <BookOpen className="w-3.5 h-3.5" />
          A2 EFL Grammar Masterclass
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Zero vs. First Conditional
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Master cause and effect in English. Learn when to use timeless present facts and when to express real future outcomes.
        </p>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-slate-200/80 rounded-xl gap-1 flex-wrap justify-center">
          <button
            onClick={() => setActiveTab('video')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'video'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current text-indigo-600" />
            Video Explicativo
          </button>
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Grammar Formulas
          </button>
          <button
            onClick={() => setActiveTab('comparison')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'comparison'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Side-by-Side Matrix
          </button>
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer ${
              activeTab === 'interactive'
                ? 'bg-white text-slate-900 shadow-sm font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Interactive Sentence Lab
          </button>
        </div>
      </div>

      {/* TAB 0: VIDEO EXPLAINER */}
      {activeTab === 'video' && (
        <VideoExplainer
          defaultExpanded={true}
          onContinueToGame={onStartPlaying}
        />
      )}

      {/* TAB 1: FORMULAS OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Zero Conditional Card */}
          <div className="bg-white border-2 border-emerald-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              100% Always True
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-700 tracking-wider uppercase">Type 0</span>
              <h2 className="text-2xl font-bold text-slate-900">Zero Conditional</h2>
              <p className="text-slate-600 text-sm mt-1">
                Used for universal facts, scientific rules, habits, and permanent classroom routines.
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">The Structure</span>
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                <span className="px-2.5 py-1 bg-white text-emerald-700 rounded-lg border border-emerald-300">
                  IF + Present Simple
                </span>
                <span className="text-slate-400">,</span>
                <span className="px-2.5 py-1 bg-white text-emerald-700 rounded-lg border border-emerald-300">
                  Present Simple
                </span>
              </div>
            </div>

            {/* Classroom Example */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Classroom Example:</span>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                <div className="text-sm text-slate-800 leading-snug">
                  <span className="text-emerald-700 font-semibold">If students arrive late to class</span>,{' '}
                  <span className="text-emerald-700 font-semibold">they miss</span> the morning announcements.
                </div>
                <button
                  onClick={() => handlePronounce('If students arrive late to class, they miss the morning announcements.')}
                  title="Listen to pronunciation"
                  className="p-1.5 text-slate-500 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key takeaway bullet points */}
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Both clauses stay strictly in the <strong>Present Simple</strong>.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>You can usually replace <em>IF</em> with <em>WHEN</em> without changing meaning.</span>
              </li>
            </ul>
          </div>

          {/* First Conditional Card */}
          <div className="bg-white border-2 border-indigo-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-indigo-600 text-white text-[11px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
              Real Future Result
            </div>

            <div>
              <span className="text-xs font-bold text-indigo-700 tracking-wider uppercase">Type 1</span>
              <h2 className="text-2xl font-bold text-slate-900">First Conditional</h2>
              <p className="text-slate-600 text-sm mt-1">
                Used for specific possibilities in the future and their likely or guaranteed consequences.
              </p>
            </div>

            {/* Formula Block */}
            <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-2">
              <span className="text-[11px] font-bold text-indigo-800 uppercase tracking-wider">The Structure</span>
              <div className="flex flex-wrap items-center gap-2 text-sm font-bold">
                <span className="px-2.5 py-1 bg-white text-indigo-700 rounded-lg border border-indigo-300">
                  IF + Present Simple
                </span>
                <span className="text-slate-400">,</span>
                <span className="px-2.5 py-1 bg-white text-indigo-700 rounded-lg border border-indigo-300">
                  WILL + Base Verb
                </span>
              </div>
            </div>

            {/* Classroom Example */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-500 uppercase">Classroom Example:</span>
              <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl flex items-start justify-between gap-3">
                <div className="text-sm text-slate-800 leading-snug">
                  <span className="text-indigo-700 font-semibold">If you study your notes tonight</span>,{' '}
                  <span className="text-indigo-700 font-semibold">you will pass</span> tomorrow&apos;s English quiz.
                </div>
                <button
                  onClick={() => handlePronounce('If you study your notes tonight, you will pass tomorrow\'s English quiz.')}
                  title="Listen to pronunciation"
                  className="p-1.5 text-slate-500 hover:text-indigo-700 hover:bg-indigo-100 rounded-lg transition-colors shrink-0 cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Key takeaway bullet points */}
            <ul className="text-xs text-slate-600 space-y-1.5">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Present simple goes in the <strong>IF-clause</strong>; <strong>WILL</strong> goes in the result.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                <span>Negative forms: <em>won&apos;t + verb</em> (e.g., <em>you won&apos;t fail</em>).</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* TAB 2: SIDE-BY-SIDE MATRIX */}
      {activeTab === 'comparison' && (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <th className="py-4 px-6">Feature</th>
                  <th className="py-4 px-6 text-emerald-800 bg-emerald-50/60">Zero Conditional</th>
                  <th className="py-4 px-6 text-indigo-800 bg-indigo-50/60">First Conditional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">What it describes</td>
                  <td className="py-3.5 px-6">General facts, scientific rules, daily routines</td>
                  <td className="py-3.5 px-6">Specific future situations and realistic outcomes</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">Condition Clause</td>
                  <td className="py-3.5 px-6 font-mono text-xs text-emerald-700 bg-emerald-50/30">If + Present Simple</td>
                  <td className="py-3.5 px-6 font-mono text-xs text-indigo-700 bg-indigo-50/30">If + Present Simple</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">Result Clause</td>
                  <td className="py-3.5 px-6 font-mono text-xs text-emerald-700 bg-emerald-50/30">Present Simple</td>
                  <td className="py-3.5 px-6 font-mono text-xs text-indigo-700 bg-indigo-50/30">WILL / WON&apos;T + Base Verb</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">Timeframe</td>
                  <td className="py-3.5 px-6">Any time, always, universally true</td>
                  <td className="py-3.5 px-6">Specific future moment (tonight, tomorrow, later)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-semibold text-slate-900">Common Trap</td>
                  <td className="py-3.5 px-6 text-amber-800">
                    Don&apos;t add &quot;will&quot; when it is a regular habit!
                  </td>
                  <td className="py-3.5 px-6 text-rose-800">
                    <strong>Never</strong> put &quot;will&quot; in the IF-clause! (<em>If it will rain ❌</em>)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: INTERACTIVE SENTENCE LAB */}
      {activeTab === 'interactive' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Interactive Classroom Scenarios</h2>
            <p className="text-sm text-slate-500">
              Select an educational scenario to examine the clauses and hear proper pronunciation.
            </p>
          </div>

          {/* Scenario Selector Chips */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'study', label: 'Study & Exam Quiz' },
              { id: 'science', label: 'Science Ice Lab' },
              { id: 'projector', label: 'Projector Power' },
              { id: 'weather', label: 'Recess Sports Rain' },
            ].map((sc) => (
              <button
                key={sc.id}
                onClick={() => {
                  soundEngine.playPop();
                  setSelectedDemo(sc.id as typeof selectedDemo);
                }}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedDemo === sc.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sc.label}
              </button>
            ))}
          </div>

          {/* Interactive Inspection Card */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl space-y-5">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                currentDemo.type === 'Zero Conditional'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-indigo-100 text-indigo-800'
              }`}>
                {currentDemo.type} · {currentDemo.category}
              </span>

              <button
                onClick={() => handlePronounce(`${currentDemo.condition}, ${currentDemo.result}`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 hover:border-indigo-400 rounded-lg text-xs font-semibold text-slate-700 hover:text-indigo-600 shadow-2xs transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Listen Audio
              </button>
            </div>

            {/* Visual Clause Splitter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  1. The Condition (IF-clause)
                </span>
                <p className="text-base font-bold text-slate-900">{currentDemo.condition}</p>
                <span className="text-xs text-indigo-600 font-medium font-mono">{currentDemo.conditionVerb}</span>
              </div>

              <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-1.5">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  2. The Result (Main clause)
                </span>
                <p className="text-base font-bold text-slate-900">{currentDemo.result}</p>
                <span className="text-xs text-emerald-600 font-medium font-mono">{currentDemo.resultVerb}</span>
              </div>
            </div>

            <p className="text-sm text-slate-700 bg-white p-3.5 border border-slate-200 rounded-lg leading-relaxed">
              <strong>Grammar Insight:</strong> {currentDemo.explanation}
            </p>

            {/* Clause Inversion Note */}
            <div className="flex items-start gap-2.5 text-xs text-slate-600 bg-amber-50/70 p-3 rounded-lg border border-amber-200">
              <RefreshCw className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong>Clause Inversion Rule:</strong> You can flip the sentence without a comma!
                <div className="text-slate-800 font-medium mt-0.5 italic">
                  &quot;{currentDemo.reversed}&quot;
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3 Golden Grammar Traps for A2 Students */}
      <div className="bg-slate-100/90 border border-slate-200 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-indigo-600" />
          3 Golden Traps for A2 Learners to Avoid
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-rose-600">Trap #1: &quot;If you will...&quot;</span>
            <p className="text-slate-600">
              Never put <em>will</em> in the IF-clause. Always write <em>&quot;If it rains&quot;</em>, never <em>&quot;If it will rain&quot;</em>.
            </p>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-amber-600">Trap #2: Comma Discipline</span>
            <p className="text-slate-600">
              When <em>IF</em> begins the sentence, use a comma before the result. When the result starts the sentence, no comma!
            </p>
          </div>
          <div className="p-3.5 bg-white rounded-xl border border-slate-200 space-y-1">
            <span className="font-bold text-emerald-600">Trap #3: Third Person &quot;-s&quot;</span>
            <p className="text-slate-600">
              Remember singular subjects: <em>The teacher presses</em>, <em>it melts</em>, <em>it rains</em>.
            </p>
          </div>
        </div>
      </div>

      {/* Primary CTA: Jump into the Game */}
      <div className="text-center pt-2">
        <button
          onClick={() => {
            soundEngine.playPop();
            onStartPlaying();
          }}
          className="inline-flex items-center gap-2 px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          Start Safari Challenge
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
