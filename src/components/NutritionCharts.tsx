import React from 'react';
import { Activity, Flame, PieChart, TrendingUp, Award, Zap } from 'lucide-react';

export const NutritionCharts: React.FC = () => {
  const macros = [
    { label: 'Calories', current: 1840, target: 2000, unit: 'kcal', color: 'bg-emerald-500' },
    { label: 'Protein', current: 82, target: 90, unit: 'g', color: 'bg-teal-400' },
    { label: 'Carbs', current: 195, target: 220, unit: 'g', color: 'bg-cyan-400' },
    { label: 'Healthy Fat', current: 58, target: 65, unit: 'g', color: 'bg-amber-400' },
    { label: 'Dietary Fiber', current: 32, target: 35, unit: 'g', color: 'bg-purple-400' }
  ];

  const weeklyData = [
    { day: 'Mon', cal: 1820, prot: 84 },
    { day: 'Tue', cal: 1950, prot: 88 },
    { day: 'Wed', cal: 1780, prot: 79 },
    { day: 'Thu', cal: 1890, prot: 85 },
    { day: 'Fri', cal: 2050, prot: 92 },
    { day: 'Sat', cal: 1840, prot: 82 },
    { day: 'Sun', cal: 1910, prot: 86 }
  ];

  return (
    <div className="space-y-6">
      {/* Daily Macro Progress Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {macros.map((m, idx) => {
          const pct = Math.min(100, Math.round((m.current / m.target) * 100));
          return (
            <div key={idx} className="p-4 bg-[#131B2A] border border-slate-800 rounded-2xl space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-bold uppercase">{m.label}</span>
                <span className="font-bold text-emerald-400">{pct}%</span>
              </div>

              <div className="text-base font-bold text-slate-100">
                {m.current} <span className="text-xs text-slate-400 font-normal">/ {m.target} {m.unit}</span>
              </div>

              <div className="w-full bg-[#162032] h-2 rounded-full overflow-hidden">
                <div className={`h-full ${m.color} transition-all duration-500`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Weekly Trends Visualizer */}
      <div className="p-6 bg-[#131B2A] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-5 h-5 text-emerald-400" />
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
              Weekly Nutrition Intake Trends
            </h3>
          </div>
          <span className="text-xs text-slate-400">Target: 2,000 kcal & 90g High-Protein</span>
        </div>

        {/* Visual Bar Chart */}
        <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-800">
          {weeklyData.map((d, idx) => {
            const barHeightPct = Math.round((d.cal / 2200) * 100);
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full bg-[#162032] border border-slate-700/60 rounded-xl h-32 flex items-end p-1 relative overflow-hidden">
                  <div
                    className="w-full bg-emerald-500 group-hover:bg-emerald-400 transition-all duration-300 rounded-lg"
                    style={{ height: `${barHeightPct}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-300">{d.day}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
