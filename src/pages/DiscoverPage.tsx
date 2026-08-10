import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Database,
  Shuffle,
  Heart,
  Bot,
  Flame,
  Clock,
  Layers,
  CheckCircle,
  ShieldCheck
} from 'lucide-react';
import { Recipe, RAGSearchResult, UserPreferences } from '../types';
import { vectorStore } from '../lib/vectorStore';
import { RecipeCard } from '../components/RecipeCard';
import { RecipeDetailModal } from '../components/RecipeDetailModal';
import { AIChefChat } from '../components/AIChefChat';
import { appStorage } from '../lib/storage';

interface DiscoverPageProps {
  userPreferences: UserPreferences;
  onStartCooking: (recipe: Recipe) => void;
}

export const DiscoverPage: React.FC<DiscoverPageProps> = ({
  userPreferences,
  onStartCooking
}) => {
  const [searchQuery, setSearchQuery] = useState('High protein paneer');
  const [searchResults, setSearchResults] = useState<RAGSearchResult[]>(() =>
    vectorStore.search('High protein paneer', userPreferences)
  );

  const [selectedCuisine, setSelectedCuisine] = useState<string>('All');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [favorites, setFavorites] = useState<Recipe[]>(() => appStorage.getFavorites());

  const sampleSearchPrompts = [
    'High protein paneer recipes',
    'Quick vegetarian dinner',
    'Indian recipes under 500 calories',
    'Recipes using spinach and eggs',
    'Easy meals with rice and vegetables'
  ];

  const cuisines = [
    { name: 'All', flag: '🌟' },
    { name: 'Indian', flag: '🇮🇳' },
    { name: 'Italian', flag: '🇮🇹' },
    { name: 'Chinese', flag: '🇨🇳' },
    { name: 'Japanese', flag: '🇯🇵' },
    { name: 'Mexican', flag: '🇲🇽' },
    { name: 'Thai', flag: '🇹🇭' },
    { name: 'Mediterranean', flag: '🇬🇷' },
    { name: 'American', flag: '🇺🇸' }
  ];

  const handleSearch = (queryStr: string) => {
    setSearchQuery(queryStr);
    const results = vectorStore.search(queryStr, userPreferences);
    setSearchResults(results);
  };

  const handleSurpriseMe = () => {
    const all = vectorStore.search('recipe', userPreferences, 10);
    if (all.length > 0) {
      const randomIdx = Math.floor(Math.random() * all.length);
      const picked = all[randomIdx].recipe;
      setSelectedRecipe(picked);
      setIsDetailOpen(true);
    }
  };

  const handleToggleFav = (recipe: Recipe, e: React.MouseEvent) => {
    e.stopPropagation();
    appStorage.toggleFavorite(recipe);
    setFavorites(appStorage.getFavorites());
  };

  const filteredResults = searchResults.filter((r) => {
    if (selectedCuisine === 'All') return true;
    return r.recipe.cuisine.toLowerCase() === selectedCuisine.toLowerCase();
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-16 animate-fadeIn">
      {/* Page Title Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Database className="w-3.5 h-3.5" />
          <span>Vector Database Retrieval Engine</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          Discover & Retrieve Culinary Wisdom
        </h1>
        <p className="text-sm text-slate-400">
          Explore recipes powered by your personal AI kitchen with full RAG source transparency.
        </p>
      </div>

      {/* Large RAG Search Box */}
      <div className="p-6 bg-[#131B2A] border border-slate-800 rounded-3xl space-y-4 shadow-xl">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-4 text-emerald-400" />
          <input
            type="text"
            placeholder="Search recipes, ingredients, cuisines, or cravings..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-[#162032] border border-slate-700 text-sm text-slate-100 font-medium focus:outline-none focus:border-emerald-500 rounded-2xl"
          />
        </div>

        {/* Sample Prompt Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest shrink-0">
            TRY:
          </span>
          {sampleSearchPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSearch(prompt)}
              className="px-3 py-1.5 bg-[#162032] hover:bg-slate-800 text-xs text-slate-300 font-medium border border-slate-700/80 rounded-xl whitespace-nowrap transition"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* RAG Inspection Box */}
      <div className="p-5 bg-[#131B2A] border border-slate-800 rounded-3xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-2">
          <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            AI Reasoning Context (RAG Inspection)
          </span>
          <span className="text-xs text-slate-400 font-medium">
            Retrieved {filteredResults.length} relevant documents
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
          {filteredResults.slice(0, 3).map((res, idx) => (
            <div
              key={idx}
              className="p-3 bg-[#162032] border border-slate-700/60 rounded-2xl text-xs space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 truncate">{res.recipe.name}</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded-md border border-emerald-500/30">
                  {(res.similarityScore * 100).toFixed(0)}% Match
                </span>
              </div>
              <p className="text-[11px] text-slate-400 line-clamp-2">
                {res.retrievalExplanation}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cuisine Explorer & Surprise Me Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Cuisine Selector Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar w-full sm:w-auto">
          {cuisines.map((c) => (
            <button
              key={c.name}
              onClick={() => setSelectedCuisine(c.name)}
              className={`px-3.5 py-2 text-xs font-semibold rounded-2xl whitespace-nowrap transition flex items-center space-x-1.5 ${
                selectedCuisine === c.name
                  ? 'bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/20'
                  : 'bg-[#131B2A] text-slate-300 border border-slate-800 hover:bg-slate-800'
              }`}
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Adventurous Button */}
        <button
          onClick={handleSurpriseMe}
          className="w-full sm:w-auto px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition flex items-center justify-center space-x-2 shrink-0 shadow-lg shadow-teal-500/10"
        >
          <Shuffle className="w-4 h-4 text-slate-950" />
          <span>I'm Feeling Adventurous</span>
        </button>
      </div>

      {/* Main Discover Layout: Grid + Chat */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recipe Grid (2 Columns) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Retrieved Recipes ({filteredResults.length})
            </h3>
            <span className="text-[10px] font-bold text-emerald-400">100% Veg + Eggs</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredResults.map((res) => {
              const isFav = favorites.some((f) => f.id === res.recipe.id);
              return (
                <RecipeCard
                  key={res.recipe.id}
                  recipe={res.recipe}
                  isFavorite={isFav}
                  onSelect={(rec) => {
                    setSelectedRecipe(rec);
                    setIsDetailOpen(true);
                  }}
                  onToggleFavorite={handleToggleFav}
                />
              );
            })}
          </div>
        </div>

        {/* AI Chef Chat Panel */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider pb-2 border-b border-slate-800">
            AI Chef Assistant
          </h3>
          <AIChefChat currentRecipe={selectedRecipe || undefined} />
        </div>
      </div>

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
