import React, { useState, useEffect } from 'react';
import { PlayerStats, MascotType } from './types';
import { Navbar } from './components/Navbar';
import { GrammarGuide } from './components/GrammarGuide';
import { GameStage } from './components/GameStage';
import { StudySummary } from './components/StudySummary';
import { MascotSelector } from './components/MascotSelector';
import { VideoExplainer } from './components/VideoExplainer';
import { soundEngine } from './utils/audio';

const STORAGE_KEY = 'conditionals_safari_player_stats';

const DEFAULT_STATS: PlayerStats = {
  score: 0,
  streak: 0,
  highestStreak: 0,
  totalAnswered: 0,
  correctAnswers: 0,
  selectedMascot: 'owl',
  soundEnabled: true,
  completedSentenceIds: [],
  badges: ['academy_recruit'],
  levelProgress: { 1: 0, 2: 0, 3: 0, 4: 0 },
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<'game' | 'guide' | 'summary' | 'mascots' | 'video'>('game');
  const [stats, setStats] = useState<PlayerStats>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      } catch {
        // Fallback to default
      }
    }
    return DEFAULT_STATS;
  });

  // Keep soundEngine in sync with stats
  useEffect(() => {
    soundEngine.setMuted(!stats.soundEnabled);
  }, [stats.soundEnabled]);

  // Save stats to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // Ignore storage errors
    }
  }, [stats]);

  const handleToggleSound = () => {
    setStats((prev) => {
      const nextMuted = !prev.soundEnabled;
      soundEngine.setMuted(!nextMuted);
      return { ...prev, soundEnabled: nextMuted };
    });
  };

  const handleSelectMascot = (mascot: MascotType) => {
    setStats((prev) => ({ ...prev, selectedMascot: mascot }));
  };

  const handleResetProgress = () => {
    if (window.confirm('Reset all scores and completed sentences to start fresh?')) {
      setStats({
        ...DEFAULT_STATS,
        selectedMascot: stats.selectedMascot,
        soundEnabled: stats.soundEnabled,
      });
      setCurrentTab('game');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        stats={stats}
        onToggleSound={handleToggleSound}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-16">
        {currentTab === 'game' && (
          <GameStage
            stats={stats}
            onUpdateStats={setStats}
            onViewSummary={() => setCurrentTab('summary')}
            onOpenVideo={() => setCurrentTab('video')}
          />
        )}

        {currentTab === 'video' && (
          <div className="max-w-5xl mx-auto px-4 py-8">
            <VideoExplainer
              defaultExpanded={true}
              onContinueToGame={() => setCurrentTab('game')}
            />
          </div>
        )}

        {currentTab === 'guide' && (
          <GrammarGuide onStartPlaying={() => setCurrentTab('game')} />
        )}

        {currentTab === 'summary' && (
          <StudySummary
            stats={stats}
            onPlayAgain={() => setCurrentTab('game')}
          />
        )}

        {currentTab === 'mascots' && (
          <MascotSelector
            selectedMascot={stats.selectedMascot}
            onSelectMascot={handleSelectMascot}
            onContinue={() => setCurrentTab('game')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/70 py-6 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <span className="font-semibold text-slate-700">Conditionals Safari Academy</span> · A2 EFL Grammar Learning System
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentTab('guide')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Grammar Formulas
            </button>
            <span>·</span>
            <button
              onClick={() => setCurrentTab('summary')}
              className="hover:text-indigo-600 transition-colors cursor-pointer"
            >
              Curriculum (10 Sentences)
            </button>
            <span>·</span>
            <button
              onClick={handleResetProgress}
              className="hover:text-rose-600 transition-colors cursor-pointer"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
