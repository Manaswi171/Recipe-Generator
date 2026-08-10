import React from 'react';
import { Sun, Bell, Flame, ShieldCheck } from 'lucide-react';
import { UserProfile, WeatherInfo } from '../types';

interface NavbarProps {
  userProfile: UserProfile;
  weather: WeatherInfo | null;
  onOpenAuth: () => void;
  onOpenSettings: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  userProfile,
  weather,
  onOpenAuth,
  onOpenSettings
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B0F19]/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      {/* Title & Guidelines Subtitle */}
      <div>
        <h1 className="text-base sm:text-lg font-black tracking-tight text-white uppercase flex items-center gap-2">
          KITCHENIQ – MODERN UI DESIGN REQUIREMENTS
        </h1>
        <p className="text-xs text-slate-400 font-medium hidden sm:block">
          The application UI must look ultra modern, unique, premium and 2025 standard. Do NOT use old layouts, borders, boxes or outdated components.
        </p>
      </div>

      {/* Right Action Icons */}
      <div className="flex items-center space-x-3 shrink-0">
        {/* Cooking Streak Counter Pill */}
        <div className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
          <Flame className="w-3.5 h-3.5 fill-emerald-400" />
          <span>{userProfile.cookingStreak} Day Streak</span>
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={onOpenSettings}
          title="Toggle Theme"
          className="p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <Sun className="w-5 h-5" />
        </button>

        {/* Bell Notification Button with Red Badge */}
        <button
          onClick={onOpenAuth}
          title="Notifications"
          className="relative p-2.5 rounded-full text-slate-300 hover:text-white hover:bg-slate-800 transition"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-[#0B0F19]">
            3
          </span>
        </button>
      </div>
    </header>
  );
};
