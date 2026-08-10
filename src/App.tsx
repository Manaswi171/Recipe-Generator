import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CreatePage } from './pages/CreatePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { KitchenPage } from './pages/KitchenPage';
import { CookingModeModal } from './components/CookingModeModal';
import { AuthModal } from './components/AuthModal';
import { SettingsModal } from './components/SettingsModal';
import { appStorage } from './lib/storage';
import { Recipe, UserProfile, UserPreferences, WeatherInfo } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'create' | 'discover' | 'kitchen'>('create');

  // App State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => appStorage.getUserProfile());
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(() => appStorage.getUserPreferences());
  const [weather, setWeather] = useState<WeatherInfo | null>(null);

  // Active Cooking State
  const [cookingRecipe, setCookingRecipe] = useState<Recipe | null>(null);
  const [isCookingModeOpen, setIsCookingModeOpen] = useState(false);

  // Modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Fetch weather recommendation on mount
  useEffect(() => {
    fetch('/api/weather/recommendation')
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'ok') {
          setWeather(data.weather);
        }
      })
      .catch((err) => console.log('Weather fetch error:', err));
  }, []);

  const handleStartCooking = (recipe: Recipe) => {
    setCookingRecipe(recipe);
    setIsCookingModeOpen(true);
  };

  const handleFinishedCooking = () => {
    // Refresh user profile streak
    setUserProfile(appStorage.getUserProfile());
  };

  const handleSaveProfile = (profile: UserProfile) => {
    setUserProfile(profile);
    appStorage.saveUserProfile(profile);
  };

  const handleSavePreferences = (prefs: Partial<UserPreferences>) => {
    const updated = appStorage.updateUserPreferences(prefs);
    setUserPreferences(updated);
  };

  return (
    <div className="min-h-screen bg-[#0D111A] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950 relative">
      {/* Top Navigation */}
      <Navbar
        userProfile={userProfile}
        weather={weather}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Container Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden border-b border-slate-800">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => setActiveTab(tab)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Main Workspace Area */}
        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-[#0D111A]">
          {activeTab === 'create' && (
            <CreatePage
              userPreferences={userPreferences}
              onStartCooking={handleStartCooking}
            />
          )}

          {activeTab === 'discover' && (
            <DiscoverPage
              userPreferences={userPreferences}
              onStartCooking={handleStartCooking}
            />
          )}

          {activeTab === 'kitchen' && (
            <KitchenPage
              userProfile={userProfile}
              userPreferences={userPreferences}
              onStartCooking={handleStartCooking}
            />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className="h-8 bg-[#0B0F19] border-t border-slate-800 text-slate-400 flex items-center overflow-hidden shrink-0 z-30">
        <div className="animate-marquee text-[10px] uppercase tracking-[0.4em] font-mono font-medium opacity-80">
          <span className="px-6">KITCHENIQ • 100% VEGETARIAN & EGG FRIENDLY • AI COMPUTER VISION FRIDGE SCANNER • SMART RECIPE ENGINE • </span>
          <span className="px-6">KITCHENIQ • 100% VEGETARIAN & EGG FRIENDLY • AI COMPUTER VISION FRIDGE SCANNER • SMART RECIPE ENGINE • </span>
        </div>
      </footer>

      {/* Modals */}
      <CookingModeModal
        recipe={cookingRecipe}
        isOpen={isCookingModeOpen}
        onClose={() => setIsCookingModeOpen(false)}
        onFinishedCooking={handleFinishedCooking}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        userProfile={userProfile}
        onSaveProfile={handleSaveProfile}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        preferences={userPreferences}
        onSavePreferences={handleSavePreferences}
      />
    </div>
  );
}

export default App;
