import React, { useState } from 'react';
import {
  ShoppingBag,
  Calendar,
  Activity,
  Heart,
  History,
  Plus,
  Trash2,
  DollarSign,
  Flame,
  Check
} from 'lucide-react';
import {
  WeeklyMealPlan,
  GroceryItem,
  Recipe,
  UserProfile,
  UserPreferences
} from '../types';
import { appStorage } from '../lib/storage';
import { MealPlannerGrid } from '../components/MealPlannerGrid';
import { GroceryListManager } from '../components/GroceryListManager';
import { NutritionCharts } from '../components/NutritionCharts';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeDetailModal } from '../components/RecipeDetailModal';

interface KitchenPageProps {
  userProfile: UserProfile;
  userPreferences: UserPreferences;
  onStartCooking: (recipe: Recipe) => void;
}

export const KitchenPage: React.FC<KitchenPageProps> = ({
  userProfile,
  userPreferences,
  onStartCooking
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'planner' | 'grocery' | 'nutrition' | 'favorites' | 'history'>('planner');

  const [mealPlan, setMealPlan] = useState<WeeklyMealPlan>(() => appStorage.getMealPlan());
  const [groceryItems, setGroceryItems] = useState<GroceryItem[]>(() => appStorage.getGroceryList());
  const [favorites, setFavorites] = useState<Recipe[]>(() => appStorage.getFavorites());
  const [history, setHistory] = useState<Recipe[]>(() => appStorage.getHistory());

  // Slot Assignment Modal State
  const [assigningSlot, setAssigningSlot] = useState<{ day: keyof WeeklyMealPlan; mealType: 'breakfast' | 'lunch' | 'dinner' } | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Slot Selection Handler
  const handleSelectSlot = (day: keyof WeeklyMealPlan, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setAssigningSlot({ day, mealType });
  };

  const handleAssignRecipeToSlot = (recipe: Recipe) => {
    if (assigningSlot) {
      const updated = appStorage.assignMealPlanSlot(assigningSlot.day, assigningSlot.mealType, recipe);
      setMealPlan(updated);
      setAssigningSlot(null);
    }
  };

  const handleClearSlot = (day: keyof WeeklyMealPlan, mealType: 'breakfast' | 'lunch' | 'dinner') => {
    const updated = appStorage.clearMealPlanSlot(day, mealType);
    setMealPlan(updated);
  };

  // Grocery Handlers
  const handleToggleGroceryCheck = (id: string) => {
    const updated = appStorage.toggleGroceryItem(id);
    setGroceryItems(updated);
  };

  const handleDeleteGroceryItem = (id: string) => {
    const updated = appStorage.deleteGroceryItem(id);
    setGroceryItems(updated);
  };

  const handleAddGroceryItem = (item: Partial<GroceryItem>) => {
    const updated = appStorage.addGroceryItem(item);
    setGroceryItems(updated);
  };

  const handleToggleFav = (recipe: Recipe, e: React.MouseEvent) => {
    e.stopPropagation();
    appStorage.toggleFavorite(recipe);
    setFavorites(appStorage.getFavorites());
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-black text-white tracking-tight">
          My Kitchen & Culinary Hub
        </h1>
        <p className="text-sm text-slate-400">
          Weekly meal planner, smart grocery list manager, and nutrition streak dashboard.
        </p>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="flex border border-slate-800 bg-[#131B2A] p-1.5 rounded-2xl gap-2 overflow-x-auto no-scrollbar shadow-lg">
        {[
          { id: 'planner', label: '🗓️ Meal Planner', count: null },
          { id: 'grocery', label: '🛒 Grocery List', count: groceryItems.length },
          { id: 'nutrition', label: '📊 Nutrition & Streaks', count: null },
          { id: 'favorites', label: '❤️ Favorites', count: favorites.length },
          { id: 'history', label: '📜 Cook History', count: history.length }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`py-2 px-4 text-xs font-bold rounded-xl whitespace-nowrap transition flex items-center space-x-2 ${
              activeSubTab === tab.id
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                activeSubTab === tab.id ? 'bg-slate-950 text-emerald-400' : 'bg-slate-800 text-slate-300'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Main Tab Views */}
      {activeSubTab === 'planner' && (
        <MealPlannerGrid
          mealPlan={mealPlan}
          onSelectSlot={handleSelectSlot}
          onClearSlot={handleClearSlot}
          weeklyBudgetINR={userPreferences.defaultBudget}
        />
      )}

      {activeSubTab === 'grocery' && (
        <GroceryListManager
          items={groceryItems}
          onToggleCheck={handleToggleGroceryCheck}
          onDeleteItem={handleDeleteGroceryItem}
          onAddItem={handleAddGroceryItem}
        />
      )}

      {activeSubTab === 'nutrition' && <NutritionCharts />}

      {activeSubTab === 'favorites' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
            Your Favorite Vegetarian Recipes ({favorites.length})
          </h3>

          {favorites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((rec) => (
                <RecipeCard
                  key={rec.id}
                  recipe={rec}
                  isFavorite={true}
                  onSelect={(r) => {
                    setSelectedRecipe(r);
                    setIsDetailOpen(true);
                  }}
                  onToggleFavorite={handleToggleFav}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#131B2A] border border-slate-800 rounded-3xl text-slate-400 text-xs">
              No favorite recipes saved yet. Click the heart icon on any recipe to save it here!
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'history' && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
            Recently Generated & Cooked History ({history.length})
          </h3>

          {history.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {history.map((rec) => (
                <RecipeCard
                  key={rec.id}
                  recipe={rec}
                  isFavorite={favorites.some((f) => f.id === rec.id)}
                  onSelect={(r) => {
                    setSelectedRecipe(r);
                    setIsDetailOpen(true);
                  }}
                  onToggleFavorite={handleToggleFav}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-[#131B2A] border border-slate-800 rounded-3xl text-slate-400 text-xs">
              No cook history yet. Generated recipes will appear here automatically.
            </div>
          )}
        </div>
      )}

      {/* Slot Assignment Picker Modal */}
      {assigningSlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-lg bg-[#131B2A] border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                Select Recipe for {assigningSlot.day} - {assigningSlot.mealType.toUpperCase()}
              </h3>
              <button
                onClick={() => setAssigningSlot(null)}
                className="text-slate-400 hover:text-white font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-400">
              Pick a recipe from your favorites or history to assign to this meal slot:
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {[...favorites, ...history].map((r, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAssignRecipeToSlot(r)}
                  className="w-full p-3 bg-[#162032] hover:bg-slate-800 border border-slate-700/80 rounded-xl text-left transition flex items-center justify-between text-xs group"
                >
                  <span className="font-bold text-slate-200 group-hover:text-emerald-400">{r.name}</span>
                  <span className="text-emerald-400 font-bold">{r.calories} kcal</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recipe Detail Modal */}
      <RecipeDetailModal
        recipe={selectedRecipe}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onStartCooking={onStartCooking}
        onRecipeRemixed={(newRec) => setSelectedRecipe(newRec)}
      />
    </div>
  );
};
