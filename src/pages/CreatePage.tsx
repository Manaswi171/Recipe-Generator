import React, { useState } from 'react';
import {
  Sparkles,
  Camera,
  Plus,
  X,
  Clock,
  Egg,
  Utensils,
  Flame,
  Users,
  Wallet,
  Gauge,
  ChevronDown,
  Leaf,
  ArrowRight,
  Zap,
  Recycle,
  DollarSign,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import {
  Recipe,
  UserPreferences,
  DietaryPreference,
  Cuisine,
  MealType,
  CookingTimeOption,
  NutritionGoal,
  DifficultyLevel,
  AISafetyCheck
} from '../types';
import { apiGenerateRecipe } from '../lib/geminiService';
import { FridgeScannerModal } from '../components/FridgeScannerModal';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import { appStorage } from '../lib/storage';

interface CreatePageProps {
  userPreferences: UserPreferences;
  onStartCooking: (recipe: Recipe) => void;
}

export const CreatePage: React.FC<CreatePageProps> = ({
  userPreferences,
  onStartCooking
}) => {
  // Ingredient Chips
  const [ingredients, setIngredients] = useState<string[]>([
    'Paneer',
    'Spinach',
    'Tomato',
    'Onion',
    'Capsicum',
    'Eggs'
  ]);
  const [inputVal, setInputVal] = useState('');

  // Preferences State
  const [dietary, setDietary] = useState<DietaryPreference>(userPreferences.dietaryPreference);
  const [allergies, setAllergies] = useState<string[]>(userPreferences.allergies);
  const [cuisine, setCuisine] = useState<Cuisine>('Indian');
  const [mealType, setMealType] = useState<MealType>('Dinner');
  const [cookingTime, setCookingTime] = useState<CookingTimeOption>('30 minutes');
  const [nutritionGoal, setNutritionGoal] = useState<NutritionGoal>('High Protein');
  const [servings, setServings] = useState(userPreferences.defaultServings);
  const [budget, setBudget] = useState(userPreferences.defaultBudget);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('Easy');

  // Modals & Generation State
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);
  const [safetyCheck, setSafetyCheck] = useState<AISafetyCheck | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getEmoji = (ing: string) => {
    const lower = ing.toLowerCase();
    if (lower.includes('paneer') || lower.includes('cheese')) return '🧀';
    if (lower.includes('spinach')) return '🥬';
    if (lower.includes('tomato')) return '🍅';
    if (lower.includes('onion')) return '🧅';
    if (lower.includes('capsicum') || lower.includes('pepper')) return '🫑';
    if (lower.includes('egg')) return '🥚';
    if (lower.includes('garlic')) return '🧄';
    if (lower.includes('rice')) return '🍚';
    if (lower.includes('milk')) return '🥛';
    if (lower.includes('tofu')) return '🥢';
    if (lower.includes('mushroom')) return '🍄';
    return '🌱';
  };

  const addIngredient = () => {
    if (inputVal.trim() && !ingredients.includes(inputVal.trim())) {
      setIngredients([...ingredients, inputVal.trim()]);
      setInputVal('');
    }
  };

  const removeIngredient = (ing: string) => {
    setIngredients(ingredients.filter((i) => i !== ing));
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    setGeneratedRecipe(null);
    try {
      const result = await apiGenerateRecipe({
        ingredients,
        dietaryPreference: dietary,
        allergies,
        cuisine,
        mealType,
        cookingTime,
        nutritionGoal,
        servings,
        budget,
        difficulty
      });

      setGeneratedRecipe(result.recipe);
      setSafetyCheck(result.safetyCheck);
      appStorage.addToHistory(result.recipe);
      setIsModalOpen(true);
    } catch (e) {
      console.error('Generation error:', e);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* 1. HERO BANNER CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 p-8 sm:p-10 text-white shadow-2xl shadow-teal-950/30">
        {/* Decorative background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 space-y-4">
            {/* Top Leaf Badge */}
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] font-bold tracking-wider uppercase">
              <Leaf className="w-3.5 h-3.5 fill-white/80" />
              <span>100% VEGETARIAN + EGG FRIENDLY</span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
              What's hiding in your kitchen today?
            </h1>

            {/* Subtitle */}
            <p className="text-emerald-100 text-sm sm:text-base font-medium">
              Turn your ingredients into delicious possibilities.
            </p>

            {/* Embedded Search / Scan Bar */}
            <div className="pt-2">
              <div className="bg-[#0B0F19]/90 backdrop-blur-md border border-slate-700/80 rounded-2xl p-2 flex items-center gap-2 max-w-xl shadow-2xl">
                <input
                  type="text"
                  placeholder="Type ingredients or scan your fridge..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
                  className="bg-transparent text-white placeholder-slate-400 text-sm font-medium focus:outline-none flex-1 px-3 py-1"
                />
                <button
                  onClick={() => setIsScannerOpen(true)}
                  className="bg-gradient-to-r from-emerald-400 to-teal-400 hover:brightness-105 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center space-x-2 shrink-0 shadow-md"
                >
                  <Camera className="w-4 h-4 text-slate-950" />
                  <span>Scan Fridge</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Floating Food Image */}
          <div className="md:col-span-5 flex justify-center md:justify-end">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600"
                alt="Appetizing Fresh Dish"
                className="w-64 h-64 sm:w-72 sm:h-72 rounded-3xl object-cover shadow-2xl border-4 border-white/20 transform rotate-2 hover:rotate-0 transition duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. ADD YOUR INGREDIENTS SECTION */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-base font-bold text-slate-100">Add Your Ingredients</h2>
          <span className="text-xs font-semibold text-emerald-400">{ingredients.length} items added</span>
        </div>

        {/* Ingredients Chips Row */}
        <div className="flex flex-wrap gap-2.5 items-center">
          {ingredients.map((ing, idx) => (
            <div
              key={idx}
              className="px-4 py-2 rounded-2xl bg-[#162032] border border-slate-700/80 hover:border-slate-600 text-xs text-slate-200 font-semibold flex items-center space-x-2 shadow-sm transition"
            >
              <span className="text-base">{getEmoji(ing)}</span>
              <span>{ing}</span>
              <button
                onClick={() => removeIngredient(ing)}
                className="text-slate-400 hover:text-rose-400 transition ml-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* Input chip inline */}
          <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-[#162032]/60 border border-dashed border-slate-700">
            <input
              type="text"
              placeholder="+ Add ingredient..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addIngredient()}
              className="bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none w-28"
            />
            {inputVal && (
              <button onClick={addIngredient} className="text-emerald-400 hover:text-emerald-300 text-xs font-bold">
                Add
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 3. PREFERENCES 2x4 GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. Dietary Preference */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Egg className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Dietary Preference</span>
              <select
                value={dietary}
                onChange={(e) => setDietary(e.target.value as DietaryPreference)}
                className="bg-transparent text-sm font-bold text-slate-100 focus:outline-none cursor-pointer border-none p-0 pr-2"
              >
                <option value="Egg-Friendly Vegetarian" className="bg-[#131B2A] text-slate-100">Egg Friendly</option>
                <option value="Vegan" className="bg-[#131B2A] text-slate-100">Vegan</option>
                <option value="Dairy-Free" className="bg-[#131B2A] text-slate-100">Dairy-Free</option>
                <option value="Gluten-Free" className="bg-[#131B2A] text-slate-100">Gluten-Free</option>
                <option value="Jain-Friendly" className="bg-[#131B2A] text-slate-100">Jain-Friendly</option>
              </select>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>

        {/* 2. Cuisine */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Cuisine</span>
              <select
                value={cuisine}
                onChange={(e) => setCuisine(e.target.value as Cuisine)}
                className="bg-transparent text-sm font-bold text-slate-100 focus:outline-none cursor-pointer border-none p-0 pr-2"
              >
                {['Indian', 'Italian', 'Chinese', 'Japanese', 'Mexican', 'Thai'].map((c) => (
                  <option key={c} value={c} className="bg-[#131B2A] text-slate-100">{c}</option>
                ))}
              </select>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>

        {/* 3. Meal Type */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Meal Type</span>
              <select
                value={mealType}
                onChange={(e) => setMealType(e.target.value as MealType)}
                className="bg-transparent text-sm font-bold text-slate-100 focus:outline-none cursor-pointer border-none p-0 pr-2"
              >
                {['Breakfast', 'Lunch', 'Dinner', 'Snack'].map((m) => (
                  <option key={m} value={m} className="bg-[#131B2A] text-slate-100">{m}</option>
                ))}
              </select>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>

        {/* 4. Cooking Time */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Cooking Time</span>
              <select
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value as CookingTimeOption)}
                className="bg-transparent text-sm font-bold text-slate-100 focus:outline-none cursor-pointer border-none p-0 pr-2"
              >
                <option value="10 minutes" className="bg-[#131B2A] text-slate-100">10 Minutes</option>
                <option value="20 minutes" className="bg-[#131B2A] text-slate-100">20 Minutes</option>
                <option value="30 minutes" className="bg-[#131B2A] text-slate-100">30 Minutes</option>
                <option value="45 minutes" className="bg-[#131B2A] text-slate-100">45 Minutes</option>
              </select>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>

        {/* 5. Nutrition Goal */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20 shrink-0">
              <Flame className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Nutrition Goal</span>
              <select
                value={nutritionGoal}
                onChange={(e) => setNutritionGoal(e.target.value as NutritionGoal)}
                className="bg-transparent text-sm font-bold text-slate-100 focus:outline-none cursor-pointer border-none p-0 pr-2"
              >
                {['Balanced', 'Low Calorie', 'High Protein', 'Low Carb'].map((g) => (
                  <option key={g} value={g} className="bg-[#131B2A] text-slate-100">{g}</option>
                ))}
              </select>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>

        {/* 6. Servings */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 shrink-0">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Servings</span>
              <select
                value={servings}
                onChange={(e) => setServings(Number(e.target.value))}
                className="bg-transparent text-sm font-bold text-slate-100 focus:outline-none cursor-pointer border-none p-0 pr-2"
              >
                {[1, 2, 4, 6, 8].map((s) => (
                  <option key={s} value={s} className="bg-[#131B2A] text-slate-100">{s} {s === 1 ? 'Person' : 'People'}</option>
                ))}
              </select>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>

        {/* 7. Budget */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Budget (Optional)</span>
              <select
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="bg-transparent text-sm font-bold text-slate-100 focus:outline-none cursor-pointer border-none p-0 pr-2"
              >
                {[150, 300, 500, 800, 1000].map((b) => (
                  <option key={b} value={b} className="bg-[#131B2A] text-slate-100">₹{b}</option>
                ))}
              </select>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>

        {/* 8. Difficulty */}
        <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex items-center justify-between hover:border-slate-700 transition cursor-pointer group">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium block">Difficulty</span>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                className="bg-transparent text-sm font-bold text-slate-100 focus:outline-none cursor-pointer border-none p-0 pr-2"
              >
                {['Easy', 'Medium', 'Hard'].map((d) => (
                  <option key={d} value={d} className="bg-[#131B2A] text-slate-100">{d}</option>
                ))}
              </select>
            </div>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition" />
        </div>
      </div>

      {/* 4. CREATE MY RECIPE CTA BUTTON */}
      <div className="pt-2">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || ingredients.length === 0}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:brightness-105 transition font-black text-slate-950 flex items-center justify-between px-8 shadow-xl shadow-teal-500/10 disabled:opacity-50 group cursor-pointer"
        >
          <div className="flex-1 text-center">
            <div className="inline-flex items-center space-x-2 text-base sm:text-lg tracking-wider uppercase font-extrabold">
              <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950/20" />
              <span>CREATE MY RECIPE</span>
            </div>
            <p className="text-xs font-semibold text-slate-900/80 block mt-0.5">
              AI will create the perfect recipe just for you!
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-950/20 text-slate-950 flex items-center justify-center group-hover:translate-x-1 transition shrink-0">
            <ArrowRight className="w-5 h-5" />
          </div>
        </button>
      </div>

      {/* 5. BOTTOM FEATURES BADGES BAR */}
      <div className="bg-[#131B2A] border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center justify-between text-xs text-slate-400 font-medium gap-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-emerald-400" />
          <span>AI Powered</span>
        </div>
        <div className="flex items-center space-x-2">
          <Utensils className="w-4 h-4 text-amber-400" />
          <span>Personalized Recipes</span>
        </div>
        <div className="flex items-center space-x-2">
          <Flame className="w-4 h-4 text-rose-400" />
          <span>Nutrition Focused</span>
        </div>
        <div className="flex items-center space-x-2">
          <Leaf className="w-4 h-4 text-teal-400" />
          <span>Smart Substitutions</span>
        </div>
        <div className="flex items-center space-x-2">
          <Recycle className="w-4 h-4 text-emerald-400" />
          <span>Zero Waste</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-cyan-400" />
          <span>Budget Friendly</span>
        </div>
      </div>

      {/* Modals */}
      <FridgeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onConfirmIngredients={(scanned) => {
          const merged = Array.from(new Set([...ingredients, ...scanned]));
          setIngredients(merged);
        }}
      />

      <RecipeDetailModal
        recipe={generatedRecipe}
        safetyCheck={safetyCheck}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStartCooking={onStartCooking}
        onRecipeRemixed={(newRec) => {
          setGeneratedRecipe(newRec);
        }}
      />
    </div>
  );
};
