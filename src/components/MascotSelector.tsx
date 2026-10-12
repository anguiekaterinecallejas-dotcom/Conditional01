import React from 'react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { MascotType } from '../types';
import { MASCOTS } from '../data/sentences';
import { Mascot } from './Mascot';
import { soundEngine } from '../utils/audio';

interface MascotSelectorProps {
  selectedMascot: MascotType;
  onSelectMascot: (mascot: MascotType) => void;
  onContinue: () => void;
}

export const MascotSelector: React.FC<MascotSelectorProps> = ({
  selectedMascot,
  onSelectMascot,
  onContinue,
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Choose Your Animal Study Mentor
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Select Your Academy Mascot
        </h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto">
          Pick an animal partner to cheer you on, give helpful grammar clues, and celebrate your high score streaks!
        </p>
      </div>

      {/* Grid of 5 cartoon animal mascots */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {MASCOTS.map((m) => {
          const isSelected = selectedMascot === m.id;

          return (
            <div
              key={m.id}
              onClick={() => {
                soundEngine.playPop();
                onSelectMascot(m.id);
              }}
              className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center text-center cursor-pointer relative ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/40 shadow-sm ring-2 ring-indigo-300'
                  : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center">
                  <Check className="w-4 h-4 stroke-[3]" />
                </div>
              )}

              <Mascot
                type={m.id}
                emotion={isSelected ? 'happy' : 'idle'}
                size="md"
                className="mb-3"
              />

              <h3 className="text-base font-bold text-slate-900">{m.name}</h3>
              <span className="text-xs font-semibold text-indigo-600 mb-1">{m.role}</span>
              <span className="text-[11px] text-slate-500 mb-2">{m.species}</span>
              <p className="text-xs text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100 w-full">
                &quot;{m.motto}&quot;
              </p>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={() => {
            soundEngine.playPop();
            onContinue();
          }}
          className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl shadow-xs transition-transform hover:scale-102 cursor-pointer"
        >
          <span>Continue with Selected Mascot</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
