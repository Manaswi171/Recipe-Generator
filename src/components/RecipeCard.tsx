import React from 'react';
import { Clock, Flame, Heart, Sparkles, ChefHat } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: (recipe: Recipe) => void;
  onToggleFavorite: (recipe: Recipe, e: React.MouseEvent) => void;
  isFavorite?: boolean;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelect,
  onToggleFavorite,
  isFavorite = false
}) => {
  return (
    <div
      onClick={() => onSelect(recipe)}
      className="group relative bg-[#131B2A] border border-slate-800 rounded-2xl overflow-hidden cursor-pointer hover:border-emerald-500/50 transition-all duration-300 flex flex-col justify-between shadow-xl shadow-slate-950/40"
    >
      {/* Thumbnail Image */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-900 border-b border-slate-800">
        <img
          src={recipe.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
          alt={recipe.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131B2A] via-transparent to-transparent opacity-90" />

        {/* Favorite Button */}
        <button
          onClick={(e) => onToggleFavorite(recipe, e)}
          className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/80 text-slate-200 hover:text-rose-400 hover:bg-slate-900 transition"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
        </button>

        {/* Match Score Badge */}
        {recipe.matchScore && (
          <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-emerald-400" />
            <span>{recipe.matchScore.overallMatch}% Match</span>
          </div>
        )}

        {/* Cuisine & Difficulty Pill */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2 text-[10px] uppercase tracking-wider font-bold text-slate-300">
          <span className="px-2 py-0.5 rounded-md bg-slate-900/80 border border-slate-700 backdrop-blur-md">
            {recipe.cuisine}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            {recipe.difficulty}
          </span>
        </div>
      </div>

      {/* Card Details */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition line-clamp-1">
            {recipe.name}
          </h3>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {recipe.description}
          </p>
        </div>

        {/* Key Metrics */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-1">
            <Clock className="w-3.5 h-3.5 text-emerald-400" />
            <span>{recipe.totalTime}m</span>
          </div>

          <div className="flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>{recipe.calories} kcal</span>
          </div>

          <div className="flex items-center space-x-1 font-semibold text-slate-300">
            <ChefHat className="w-3.5 h-3.5 text-teal-400" />
            <span>{recipe.servings} Servings</span>
          </div>
        </div>
      </div>
    </div>
  );
};
