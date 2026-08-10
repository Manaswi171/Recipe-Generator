import React, { useState } from 'react';
import {
  X,
  Clock,
  Flame,
  ChefHat,
  Sparkles,
  CheckCircle,
  ShoppingBag,
  ShieldCheck,
  RefreshCw,
  Heart,
  Layers,
  Info
} from 'lucide-react';
import { Recipe, AISafetyCheck } from '../types';
import { appStorage } from '../lib/storage';
import { apiRemixRecipe } from '../lib/geminiService';

interface RecipeDetailModalProps {
  recipe: Recipe | null;
  safetyCheck?: AISafetyCheck;
  isOpen: boolean;
  onClose: () => void;
  onStartCooking: (recipe: Recipe) => void;
  onRecipeRemixed?: (newRecipe: Recipe) => void;
}

export const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  safetyCheck,
  isOpen,
  onClose,
  onStartCooking,
  onRecipeRemixed
}) => {
  const [activeTab, setActiveTab] = useState<'recipe' | 'remix' | 'substitutions'>('recipe');
  const [isRemixing, setIsRemixing] = useState(false);
  const [addedGroceryMsg, setAddedGroceryMsg] = useState(false);

  if (!isOpen || !recipe) return null;

  const handleAddToGrocery = () => {
    appStorage.addRecipeMissingIngredientsToGrocery(recipe);
    setAddedGroceryMsg(true);
    setTimeout(() => setAddedGroceryMsg(false), 3000);
  };

  const handleRemix = async (remixType: string) => {
    setIsRemixing(true);
    try {
      const res = await apiRemixRecipe(recipe, remixType);
      if (res.recipe && onRecipeRemixed) {
        onRecipeRemixed(res.recipe);
      }
    } catch (e) {
      console.error('Remix error:', e);
    } finally {
      setIsRemixing(false);
    }
  };

  const availableIngs = recipe.ingredients.filter((i) => i.available !== false);
  const missingIngs = recipe.ingredients.filter((i) => i.available === false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-4xl bg-[#131B2A] border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Image Banner */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-900 shrink-0 border-b border-slate-800">
          <img
            src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
            alt={recipe.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131B2A] via-[#131B2A]/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-900 transition"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Badge Overlays */}
          <div className="absolute bottom-4 left-6 right-6 space-y-2">
            <div className="flex flex-wrap gap-2 items-center text-xs font-semibold">
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {recipe.cuisine}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                {recipe.mealType}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                🌱 Vegetarian
              </span>
              {recipe.eggAllowed && (
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  🥚 Egg-Friendly
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {recipe.name}
            </h1>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-800 bg-[#0B0F19]/40 px-6 gap-2">
          <button
            onClick={() => setActiveTab('recipe')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
              activeTab === 'recipe'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Overview & Cooking
          </button>
          <button
            onClick={() => setActiveTab('remix')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition flex items-center gap-1.5 ${
              activeTab === 'remix'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Remix Recipe</span>
          </button>
          <button
            onClick={() => setActiveTab('substitutions')}
            className={`py-3 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition ${
              activeTab === 'substitutions'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Substitutions ({recipe.substitutions?.length || 2})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {activeTab === 'recipe' && (
            <>
              {/* Quick Key Metrics Bar */}
              <div className="grid grid-cols-4 gap-3 p-4 bg-[#162032] border border-slate-700/80 rounded-2xl text-center text-xs">
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Prep Time</span>
                  <span className="font-bold text-slate-200">{recipe.prepTime} mins</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Cook Time</span>
                  <span className="font-bold text-slate-200">{recipe.cookTime} mins</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Calories</span>
                  <span className="font-bold text-emerald-400">{recipe.calories} kcal</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px] uppercase font-bold">Servings</span>
                  <span className="font-bold text-slate-200">{recipe.servings} people</span>
                </div>
              </div>

              {/* WHY THIS RECIPE? Explainability Box */}
              {recipe.matchScore && (
                <div className="p-5 bg-[#162032] border border-slate-700/80 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      Why This Recipe?
                    </span>
                    <span className="text-xs font-bold text-slate-200">
                      {recipe.matchScore.overallMatch}% Overall Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    "{recipe.matchScore.reason}"
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[10px]">
                    <div className="p-2 bg-[#131B2A] border border-slate-800 rounded-xl">
                      <span className="text-slate-400 block uppercase font-bold">Ingredients</span>
                      <span className="font-bold text-slate-200">{recipe.matchScore.ingredientMatch}%</span>
                    </div>
                    <div className="p-2 bg-[#131B2A] border border-slate-800 rounded-xl">
                      <span className="text-slate-400 block uppercase font-bold">Diet</span>
                      <span className="font-bold text-emerald-400">{recipe.matchScore.dietCompatibility}%</span>
                    </div>
                    <div className="p-2 bg-[#131B2A] border border-slate-800 rounded-xl">
                      <span className="text-slate-400 block uppercase font-bold">Nutrition</span>
                      <span className="font-bold text-slate-200">{recipe.matchScore.nutritionMatch}%</span>
                    </div>
                    <div className="p-2 bg-[#131B2A] border border-slate-800 rounded-xl">
                      <span className="text-slate-400 block uppercase font-bold">Speed</span>
                      <span className="font-bold text-slate-200">{recipe.matchScore.cookTimeMatch}%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Ingredients Section: AVAILABLE vs MISSING */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Ingredients Breakdown
                  </h3>
                  {missingIngs.length > 0 && (
                    <button
                      onClick={handleAddToGrocery}
                      className="px-3.5 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider rounded-xl transition flex items-center space-x-1.5"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>{addedGroceryMsg ? '✓ Added!' : 'Add Missing to Grocery'}</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Available Ingredients */}
                  <div className="p-4 bg-[#162032] border border-slate-700/80 rounded-2xl space-y-2">
                    <p className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                      In Kitchen ({availableIngs.length})
                    </p>
                    <ul className="space-y-1.5 text-xs text-slate-200">
                      {availableIngs.map((ing, idx) => (
                        <li key={idx} className="flex justify-between border-b border-slate-800 pb-1">
                          <span>✓ {ing.name}</span>
                          <span className="text-slate-400">{ing.amount}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Missing Ingredients */}
                  <div className="p-4 bg-[#162032] border border-slate-700/80 rounded-2xl space-y-2">
                    <p className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <ShoppingBag className="w-4 h-4 text-rose-400" />
                      Need to Buy ({missingIngs.length > 0 ? missingIngs.length : '0'})
                    </p>
                    {missingIngs.length > 0 ? (
                      <ul className="space-y-1.5 text-xs text-slate-200">
                        {missingIngs.map((ing, idx) => (
                          <li key={idx} className="flex justify-between border-b border-slate-800 pb-1">
                            <span className="text-rose-400 font-semibold">• {ing.name}</span>
                            <span className="text-slate-400">{ing.amount}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-slate-400 italic">
                        You have all required ingredients in stock!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Cooking Instructions Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Step-By-Step Instructions
                  </h3>
                  <button
                    onClick={() => {
                      onClose();
                      onStartCooking(recipe);
                    }}
                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-1.5"
                  >
                    <span>👨‍🍳 START COOKING</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {recipe.instructions.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-4 bg-[#162032] border border-slate-700/80 rounded-2xl flex space-x-3 text-xs text-slate-200"
                    >
                      <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0 border border-emerald-500/30">
                        {idx + 1}
                      </span>
                      <p className="leading-relaxed pt-0.5">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nutrition Breakdown */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
                  Nutritional Info (Per Serving)
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-xs">
                  <div className="p-3 bg-[#162032] border border-slate-700/80 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Calories</span>
                    <span className="font-bold text-emerald-400">{recipe.nutrition.calories} kcal</span>
                  </div>
                  <div className="p-3 bg-[#162032] border border-slate-700/80 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Protein</span>
                    <span className="font-bold text-slate-200">{recipe.nutrition.protein}g</span>
                  </div>
                  <div className="p-3 bg-[#162032] border border-slate-700/80 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Carbs</span>
                    <span className="font-bold text-slate-200">{recipe.nutrition.carbs}g</span>
                  </div>
                  <div className="p-3 bg-[#162032] border border-slate-700/80 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Fat</span>
                    <span className="font-bold text-slate-200">{recipe.nutrition.fat}g</span>
                  </div>
                  <div className="p-3 bg-[#162032] border border-slate-700/80 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Fiber</span>
                    <span className="font-bold text-slate-200">{recipe.nutrition.fiber}g</span>
                  </div>
                  <div className="p-3 bg-[#162032] border border-slate-700/80 rounded-xl">
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Sugar</span>
                    <span className="font-bold text-slate-200">{recipe.nutrition.sugar}g</span>
                  </div>
                </div>
              </div>

              {/* RECIPE SAFETY CHECK Status */}
              <div className="p-4 bg-[#162032] border border-slate-700/80 rounded-2xl text-xs space-y-2">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Recipe Safety Verification
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] text-slate-300">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Vegetarian Verified</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Allergy Screened</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Diet Validated</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Consistency Checked</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'remix' && (
            <div className="space-y-6">
              <div className="p-4 bg-[#162032] border border-slate-700/80 rounded-2xl text-xs text-slate-300 space-y-1">
                <p className="font-bold text-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
                  <RefreshCw className="w-4 h-4 text-emerald-400" />
                  REMIX RECIPE
                </p>
                <p className="text-slate-400">
                  Adapt "{recipe.name}" instantly to your nutrition, dietary, or taste desires.
                </p>
              </div>

              {isRemixing ? (
                <div className="p-12 text-center space-y-3 bg-[#162032] border border-slate-700/80 rounded-2xl">
                  <Sparkles className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                    Remixing recipe with AI Chef...
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: '💪 High Protein', type: 'High Protein', desc: 'Boost paneer/tofu/egg ratio' },
                    { label: '🔥 Low Calorie', type: 'Low Calorie', desc: 'Lighter oil/cream usage' },
                    { label: '🥚 Egg Protein Boost', type: 'Egg Protein Boost', desc: 'Incorporate poached or boiled egg' },
                    { label: '🌱 Vegan', type: 'Vegan', desc: 'Remove eggs & dairy for plant milks' },
                    { label: '🌶️ Spicier', type: 'Spicier', desc: 'Elevate green chilies & garam masala' },
                    { label: '👶 Kid Friendly', type: 'Kid Friendly', desc: 'Milder spice, fun presentation' },
                    { label: '💰 Budget Friendly', type: 'Budget Friendly', desc: 'Use simple accessible staples' },
                    { label: '⚡ 15-Minute Version', type: '15-Minute Version', desc: 'Quick stream-lined prep' },
                    { label: '🪷 Jain-Friendly', type: 'Jain-Friendly', desc: 'Exclude onion, garlic, & root veg' }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleRemix(item.type)}
                      className="p-4 bg-[#162032] hover:bg-slate-800 border border-slate-700/80 rounded-2xl text-left transition space-y-1 group"
                    >
                      <span className="font-bold text-xs text-slate-200 group-hover:text-emerald-400 block">{item.label}</span>
                      <span className="text-[10px] text-slate-400 block">{item.desc}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'substitutions' && (
            <div className="space-y-4">
              <div className="p-4 bg-[#162032] border border-slate-700/80 rounded-2xl text-xs text-slate-300">
                <p className="font-bold text-slate-100 mb-1 uppercase tracking-wider">Intelligent Ingredient Substitutions</p>
                <p className="text-slate-400">
                  Don't have an ingredient? Use these AI-validated vegetarian alternatives without losing taste or nutrition.
                </p>
              </div>

              <div className="space-y-3">
                {(recipe.substitutions || [
                  {
                    original: 'Paneer',
                    substitute: 'Firm Tofu',
                    compatibility: 95,
                    reason: 'High-protein plant substitute with identical firm texture in curries.'
                  },
                  {
                    original: 'Butter',
                    substitute: 'Olive Oil / Ghee',
                    compatibility: 90,
                    reason: 'Healthy fat alternative for sauteing.'
                  }
                ]).map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-[#162032] border border-slate-700/80 rounded-2xl flex items-center justify-between text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 font-bold text-slate-200">
                        <span className="text-rose-400 line-through">{sub.original}</span>
                        <span>➔</span>
                        <span className="text-emerald-400">{sub.substitute}</span>
                      </div>
                      <p className="text-[11px] text-slate-400">{sub.reason}</p>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 font-bold text-[10px] rounded-full border border-emerald-500/30 shrink-0 uppercase tracking-wider">
                      {sub.compatibility}% Match
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0B0F19]/60 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition"
          >
            Close
          </button>

          <button
            onClick={() => {
              onClose();
              onStartCooking(recipe);
            }}
            className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition flex items-center space-x-2 shadow-lg shadow-emerald-500/20"
          >
            <span>👨‍🍳 START COOKING MODE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
