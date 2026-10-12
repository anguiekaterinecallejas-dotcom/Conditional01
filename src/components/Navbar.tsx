import React from 'react';
import { Volume2, VolumeX, Sparkles, Play } from 'lucide-react';
import { PlayerStats, MascotType } from '../types';
import { MASCOTS } from '../data/sentences';

interface NavbarProps {
  currentTab: 'guide' | 'game' | 'summary' | 'mascots' | 'video';
  setCurrentTab: (tab: 'guide' | 'game' | 'summary' | 'mascots' | 'video') => void;
  stats: PlayerStats;
  onToggleSound: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  stats,
  onToggleSound,
}) => {
  const currentMascot = MASCOTS.find((m) => m.id === stats.selectedMascot) || MASCOTS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <button
          onClick={() => setCurrentTab('game')}
          className="text-left group flex items-center gap-2.5 whitespace-nowrap shrink-0 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm font-bold text-lg group-hover:scale-105 transition-transform">
            IF
          </div>
          <div>
            <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
              Conditionals Safari Academy
            </span>
          </div>
        </button>

        {/* Zone 2: 5 single-line nav links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentTab('game')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'game' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Play Safari
          </button>
          <button
            onClick={() => setCurrentTab('video')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer flex items-center gap-1.5 ${
              currentTab === 'video' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            Video Lesson
          </button>
          <button
            onClick={() => setCurrentTab('guide')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'guide' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Grammar Workshop
          </button>
          <button
            onClick={() => setCurrentTab('summary')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'summary' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            10 Sentences
          </button>
          <button
            onClick={() => setCurrentTab('mascots')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 cursor-pointer ${
              currentTab === 'mascots' ? 'text-indigo-600 font-semibold' : 'hover:text-slate-900'
            }`}
          >
            Mascots
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action Area */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={stats.soundEnabled ? 'Mute audio' : 'Unmute audio'}
            aria-label="Toggle sound"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            {stats.soundEnabled ? (
              <Volume2 className="w-5 h-5 text-indigo-600" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-400" />
            )}
          </button>

          {/* Player Score Display */}
          <div className="flex items-center gap-2 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-mono text-sm font-bold text-slate-800 tabular-nums">
              {stats.score}
            </span>
          </div>

          {/* Quick Mascot Avatar Icon */}
          <button
            onClick={() => setCurrentTab('mascots')}
            title={`Companion: ${currentMascot.name}`}
            className="w-9 h-9 rounded-full border-2 border-indigo-400 p-0.5 bg-indigo-50 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
          >
            <span className="text-xs font-bold text-indigo-700">
              {currentMascot.name.slice(0, 2).toUpperCase()}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar row */}
      <div className="flex md:hidden border-t border-slate-200 px-2 py-1.5 justify-around bg-slate-50 text-xs font-medium text-slate-600 overflow-x-auto">
        <button
          onClick={() => setCurrentTab('game')}
          className={`py-1 px-2 rounded whitespace-nowrap ${currentTab === 'game' ? 'text-indigo-600 font-bold bg-white' : ''}`}
        >
          Play
        </button>
        <button
          onClick={() => setCurrentTab('video')}
          className={`py-1 px-2 rounded whitespace-nowrap ${currentTab === 'video' ? 'text-indigo-600 font-bold bg-white' : ''}`}
        >
          Video
        </button>
        <button
          onClick={() => setCurrentTab('guide')}
          className={`py-1 px-2 rounded whitespace-nowrap ${currentTab === 'guide' ? 'text-indigo-600 font-bold bg-white' : ''}`}
        >
          Grammar
        </button>
        <button
          onClick={() => setCurrentTab('summary')}
          className={`py-1 px-2 rounded whitespace-nowrap ${currentTab === 'summary' ? 'text-indigo-600 font-bold bg-white' : ''}`}
        >
          10 Sentences
        </button>
        <button
          onClick={() => setCurrentTab('mascots')}
          className={`py-1 px-2 rounded whitespace-nowrap ${currentTab === 'mascots' ? 'text-indigo-600 font-bold bg-white' : ''}`}
        >
          Mascots
        </button>
      </div>
    </header>
  );
};
