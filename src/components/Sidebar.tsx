import React from 'react';
import {
  Sparkles,
  Search,
  ShoppingBag,
  Heart,
  History,
  Calendar,
  ListCheck,
  BarChart2,
  Trophy,
  Settings,
  User,
  LogOut,
  ChefHat,
  Crown
} from 'lucide-react';

interface SidebarProps {
  activeTab: 'create' | 'discover' | 'kitchen';
  onSelectTab: (tab: 'create' | 'discover' | 'kitchen') => void;
  onOpenSettings: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  onOpenSettings
}) => {
  return (
    <aside className="w-full lg:w-64 bg-[#0B0F19] border-r border-slate-800/80 p-5 flex flex-col justify-between shrink-0 min-h-screen">
      <div className="space-y-6">
        {/* Brand Logo Header */}
        <div className="flex items-center space-x-3 px-2 py-1">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
            <ChefHat className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-1">
              KitchenIQ
            </h1>
            <p className="text-[11px] text-slate-400 font-medium">
              Your Intelligent Kitchen Companion
            </p>
          </div>
        </div>

        {/* Main Nav Items */}
        <nav className="space-y-1.5 pt-2">
          {/* Create Button (Primary Action) */}
          <button
            onClick={() => onSelectTab('create')}
            className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center space-x-3 font-semibold text-sm ${
              activeTab === 'create'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300 shadow-lg shadow-emerald-950/20'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Create</span>
          </button>

          {/* Discover Button */}
          <button
            onClick={() => onSelectTab('discover')}
            className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center space-x-3 font-medium text-sm ${
              activeTab === 'discover'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <Search className="w-4 h-4 text-slate-400" />
            <span>Discover</span>
          </button>

          {/* My Kitchen Button */}
          <button
            onClick={() => onSelectTab('kitchen')}
            className={`w-full text-left px-4 py-3 rounded-2xl transition-all flex items-center space-x-3 font-medium text-sm ${
              activeTab === 'kitchen'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-300'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShoppingBag className="w-4 h-4 text-slate-400" />
            <span>My Kitchen</span>
          </button>
        </nav>

        {/* PERSONAL Section */}
        <div className="space-y-1 pt-3 border-t border-slate-800/60">
          <p className="px-4 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            PERSONAL
          </p>
          <div className="space-y-1 pt-1">
            <button
              onClick={() => onSelectTab('kitchen')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <Heart className="w-4 h-4" />
              <span>Favorites</span>
            </button>
            <button
              onClick={() => onSelectTab('kitchen')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <History className="w-4 h-4" />
              <span>History</span>
            </button>
            <button
              onClick={() => onSelectTab('kitchen')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Meal Planner</span>
            </button>
            <button
              onClick={() => onSelectTab('kitchen')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <ListCheck className="w-4 h-4" />
              <span>Grocery List</span>
            </button>
            <button
              onClick={() => onSelectTab('kitchen')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <BarChart2 className="w-4 h-4" />
              <span>Nutrition</span>
            </button>
            <button
              onClick={() => onSelectTab('kitchen')}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <Trophy className="w-4 h-4" />
              <span>Achievements</span>
            </button>
          </div>
        </div>

        {/* SETTINGS Section */}
        <div className="space-y-1 pt-3 border-t border-slate-800/60">
          <p className="px-4 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            SETTINGS
          </p>
          <div className="space-y-1 pt-1">
            <button
              onClick={onOpenSettings}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <User className="w-4 h-4" />
              <span>Profile</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="w-full text-left px-4 py-2.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 text-xs font-medium flex items-center space-x-3 transition"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* User Profile Footer Card */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120"
              alt="Ananya Profile"
              className="w-9 h-9 rounded-full object-cover border border-slate-700"
            />
            <div>
              <p className="text-xs font-bold text-slate-100">Ananya</p>
              <p className="text-[10px] text-slate-400">Premium User</p>
            </div>
          </div>
          <Crown className="w-4 h-4 text-amber-400 fill-amber-400/20" />
        </div>
      </div>
    </aside>
  );
};
