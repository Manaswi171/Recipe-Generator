import React, { useState } from 'react';
import { X, Settings as SettingsIcon, Check, Shield } from 'lucide-react';
import { UserPreferences, DietaryPreference, Allergy } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSavePreferences: (prefs: Partial<UserPreferences>) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences
}) => {
  const [diet, setDiet] = useState<DietaryPreference>(preferences.dietaryPreference);
  const [allergies, setAllergies] = useState<string[]>(preferences.allergies || []);
  const [servings, setServings] = useState(preferences.defaultServings);
  const [budget, setBudget] = useState(preferences.defaultBudget);

  if (!isOpen) return null;

  const ALLERGIES_LIST: Allergy[] = ['Nuts', 'Peanuts', 'Dairy', 'Eggs', 'Gluten', 'Soy', 'Sesame'];

  const toggleAllergy = (a: Allergy) => {
    if (allergies.includes(a)) {
      setAllergies(allergies.filter((x) => x !== a));
    } else {
      setAllergies([...allergies, a]);
    }
  };

  const handleSave = () => {
    onSavePreferences({
      dietaryPreference: diet,
      allergies,
      defaultServings: servings,
      defaultBudget: budget
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg bg-[#131B2A] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <SettingsIcon className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">KitchenIQ Settings</h2>
              <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Dietary Rules, Allergies & Servings</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-5 text-xs">
          {/* Dietary Rule Selector */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold uppercase tracking-wider block">
              Dietary Preference
            </label>
            <select
              value={diet}
              onChange={(e) => setDiet(e.target.value as DietaryPreference)}
              className="w-full p-3 bg-[#162032] border border-slate-700/80 rounded-xl text-slate-100 font-medium focus:outline-none focus:border-emerald-500"
            >
              {[
                'Egg-Friendly Vegetarian',
                'Vegan',
                'Dairy-Free',
                'Gluten-Free',
                'Jain-Friendly',
                'High-Protein Vegetarian',
                'Low-Calorie',
                'Low-Carb',
                'Diabetic-Friendly'
              ].map((d) => (
                <option key={d} value={d} className="bg-[#131B2A]">
                  {d}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-400">
              Note: KitchenIQ is application-wide 100% vegetarian + egg friendly.
            </p>
          </div>

          {/* Allergies Checklist */}
          <div className="space-y-2">
            <label className="text-slate-300 font-bold uppercase tracking-wider block">
              Allergies & Exclusions
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALLERGIES_LIST.map((a) => {
                const isChecked = allergies.includes(a);
                return (
                  <button
                    key={a}
                    type="button"
                    onClick={() => toggleAllergy(a)}
                    className={`p-2.5 rounded-xl border text-left font-bold uppercase tracking-wider text-xs transition flex items-center justify-between ${
                      isChecked
                        ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                        : 'bg-[#162032] border-slate-700/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span>{a}</span>
                    {isChecked && <Check className="w-3.5 h-3.5 text-slate-950" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Default Servings & Budget */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-800">
            <div className="space-y-1">
              <label className="text-slate-300 font-bold uppercase tracking-wider">Default Servings</label>
              <input
                type="number"
                min={1}
                max={10}
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="w-full p-3 bg-[#162032] border border-slate-700/80 rounded-xl text-slate-100 font-medium focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-300 font-bold uppercase tracking-wider">Weekly Budget (₹)</label>
              <input
                type="number"
                step={100}
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full p-3 bg-[#162032] border border-slate-700/80 rounded-xl text-slate-100 font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-800">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-lg shadow-emerald-500/20"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};
