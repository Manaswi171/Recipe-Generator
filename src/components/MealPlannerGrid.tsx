import React from 'react';
import { WeeklyMealPlan, DayMealPlan, Recipe } from '../types';
import { Calendar, Trash2, Plus, DollarSign, Sparkles } from 'lucide-react';

interface MealPlannerGridProps {
  mealPlan: WeeklyMealPlan;
  onSelectSlot: (day: keyof WeeklyMealPlan, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
  onClearSlot: (day: keyof WeeklyMealPlan, mealType: 'breakfast' | 'lunch' | 'dinner') => void;
  weeklyBudgetINR?: number;
}

export const MealPlannerGrid: React.FC<MealPlannerGridProps> = ({
  mealPlan,
  onSelectSlot,
  onClearSlot,
  weeklyBudgetINR = 1500
}) => {
  const days: Array<keyof WeeklyMealPlan> = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  // Calculate estimated weekly cost
  let totalCost = 0;
  let totalCalories = 0;

  days.forEach((day) => {
    const d = mealPlan[day];
    ['breakfast', 'lunch', 'dinner'].forEach((m) => {
      const rec = (d as any)?.[m] as Recipe | undefined;
      if (rec) {
        totalCost += Math.round(rec.calories * 0.35); // estimated cost mapping
        totalCalories += rec.calories;
      }
    });
  });

  const remainingBudget = weeklyBudgetINR - totalCost;

  return (
    <div className="space-y-6">
      {/* Budget Summary Card */}
      <div className="p-5 bg-[#131B2A] border border-slate-800 rounded-3xl flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <DollarSign className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
              Weekly Budget Calculator
              <span className="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-widest border border-emerald-500/30 rounded-full">
                Auto-Calculated
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Estimated meal costs vs target budget ₹{weeklyBudgetINR}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-bold">
          <div className="p-2.5 rounded-xl bg-[#162032] border border-slate-700/80 text-slate-200">
            <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Total Planned</span>
            <span className="font-bold text-emerald-400 text-sm">₹{totalCost}</span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#162032] border border-slate-700/80 text-slate-200">
            <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Remaining</span>
            <span className={`font-bold text-sm ${remainingBudget >= 0 ? 'text-teal-400' : 'text-rose-400'}`}>
              ₹{remainingBudget}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-[#162032] border border-slate-700/80 text-slate-200 hidden sm:block">
            <span className="text-slate-400 block text-[9px] uppercase tracking-wider">Energy Total</span>
            <span className="font-bold text-amber-400 text-sm">{totalCalories} kcal</span>
          </div>
        </div>
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-3">
        {days.map((day) => {
          const dayPlan = mealPlan[day] || {};
          return (
            <div
              key={day}
              className="p-3 bg-[#131B2A] border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  {day.slice(0, 3)}
                </span>
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="space-y-2 flex-1">
                {(['breakfast', 'lunch', 'dinner'] as const).map((mealType) => {
                  const recipe = dayPlan[mealType];
                  return (
                    <div
                      key={mealType}
                      className="p-2 bg-[#162032] border border-slate-700/80 rounded-xl space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between text-[9px] font-bold text-slate-400 uppercase">
                        <span>{mealType}</span>
                        {recipe && (
                          <button
                            onClick={() => onClearSlot(day, mealType)}
                            className="text-slate-400 hover:text-rose-400 transition"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        )}
                      </div>

                      {recipe ? (
                        <div className="space-y-0.5">
                          <p className="font-bold text-slate-200 truncate text-[11px]">{recipe.name}</p>
                          <div className="flex justify-between text-[9px] text-slate-400">
                            <span>{recipe.calories} kcal</span>
                            <span className="text-emerald-400 font-bold">₹{Math.round(recipe.calories * 0.35)}</span>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => onSelectSlot(day, mealType)}
                          className="w-full py-1 border border-dashed border-slate-700 hover:border-solid hover:bg-emerald-500 hover:text-slate-950 text-slate-400 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center space-x-1 transition rounded-lg"
                        >
                          <Plus className="w-3 h-3" />
                          <span>Assign</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
