import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, CheckCircle, ChevronLeft, ChevronRight, Timer, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe } from '../types';
import { appStorage } from '../lib/storage';

interface CookingModeModalProps {
  recipe: Recipe | null;
  isOpen: boolean;
  onClose: () => void;
  onFinishedCooking: () => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onFinishedCooking
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<boolean[]>([]);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (recipe) {
      setCurrentStep(0);
      setCompletedSteps(new Array(recipe.instructions.length).fill(false));
      setTimerSeconds(null);
      setIsTimerRunning(false);
    }
  }, [recipe]);

  // Active Timer Effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds !== null && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => (prev !== null && prev > 0 ? prev - 1 : 0));
      }, 1000);
    } else if (timerSeconds === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Play timer alarm audio chime
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5 note
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.8);
      } catch (e) {
        console.log('Audio chime error:', e);
      }
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isOpen || !recipe) return null;

  const totalSteps = recipe.instructions.length;
  const isLastStep = currentStep === totalSteps - 1;

  const toggleStepDone = (index: number) => {
    const updated = [...completedSteps];
    updated[index] = !updated[index];
    setCompletedSteps(updated);

    if (updated.every(Boolean)) {
      triggerCompletion();
    }
  };

  const startPresetTimer = (minutes: number) => {
    setTimerSeconds(minutes * 60);
    setIsTimerRunning(true);
  };

  const triggerCompletion = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    appStorage.incrementCookedStreak();
    onFinishedCooking();
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl bg-[#131B2A] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-[#0B0F19]/60">
          <div>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest block">
              👨‍🍳 Interactive Cooking Mode
            </span>
            <h2 className="text-lg font-bold text-slate-100">{recipe.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-900 h-2 flex border-b border-slate-800">
          {recipe.instructions.map((_, idx) => (
            <div
              key={idx}
              className={`flex-1 transition-all border-r border-slate-800 last:border-r-0 ${
                idx < currentStep
                  ? 'bg-emerald-500'
                  : idx === currentStep
                  ? 'bg-teal-400'
                  : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Content Body */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Step Counter Badge */}
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-xs uppercase tracking-wider border border-emerald-500/30 rounded-full">
                Step {currentStep + 1} of {totalSteps}
              </span>
              <button
                onClick={() => toggleStepDone(currentStep)}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider rounded-xl transition ${
                  completedSteps[currentStep]
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-[#162032] text-slate-300 border border-slate-700 hover:bg-slate-800'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{completedSteps[currentStep] ? 'Completed' : 'Mark as Done'}</span>
              </button>
            </div>

            {/* Instruction Text */}
            <div className="p-6 bg-[#162032] border border-slate-700/80 rounded-2xl text-slate-100 text-lg leading-relaxed font-medium shadow-inner">
              {recipe.instructions[currentStep]}
            </div>

            {/* Quick Timer Presets */}
            <div className="p-4 bg-[#162032] border border-slate-700/80 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
                  <Timer className="w-4 h-4 text-emerald-400" />
                  Step Timers
                </span>
                {timerSeconds !== null && (
                  <span
                    className={`text-sm font-bold ${
                      timerSeconds === 0 ? 'text-rose-400 animate-ping' : 'text-emerald-400'
                    }`}
                  >
                    ⏱️ {formatTimer(timerSeconds)}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={() => startPresetTimer(2)}
                  className="px-3 py-1.5 bg-[#131B2A] hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition"
                >
                  ⏱️ 2 Mins
                </button>
                <button
                  onClick={() => startPresetTimer(5)}
                  className="px-3 py-1.5 bg-[#131B2A] hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition"
                >
                  ⏱️ 5 Mins
                </button>
                <button
                  onClick={() => startPresetTimer(10)}
                  className="px-3 py-1.5 bg-[#131B2A] hover:bg-slate-800 text-slate-300 text-xs font-bold rounded-xl border border-slate-700 transition"
                >
                  ⏱️ 10 Mins
                </button>

                {timerSeconds !== null && (
                  <div className="flex items-center space-x-1.5 ml-auto">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="p-1.5 bg-emerald-500 text-slate-950 rounded-lg transition"
                    >
                      {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => {
                        setTimerSeconds(null);
                        setIsTimerRunning(false);
                      }}
                      className="p-1.5 bg-slate-800 text-slate-300 rounded-lg transition"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentStep === 0}
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2.5 bg-[#162032] hover:bg-slate-800 border border-slate-700/80 rounded-xl disabled:opacity-40 text-slate-300 font-bold uppercase tracking-wider text-xs flex items-center space-x-1.5 transition"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Step</span>
            </button>

            {isLastStep ? (
              <button
                onClick={triggerCompletion}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>Finish Cooking & Record Streak</span>
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep((prev) => Math.min(totalSteps - 1, prev + 1))}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-1.5 shadow-lg shadow-emerald-500/20"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
