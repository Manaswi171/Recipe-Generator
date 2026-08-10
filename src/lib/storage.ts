import {
  UserProfile,
  UserPreferences,
  Recipe,
  WeeklyMealPlan,
  GroceryItem,
  Achievement
} from '../types';
import { RECIPES_DATASET } from '../data/recipes';

const STORAGE_KEYS = {
  USER_PROFILE: 'kitcheniq_user_profile',
  FAVORITES: 'kitcheniq_favorites',
  HISTORY: 'kitcheniq_history',
  MEAL_PLAN: 'kitcheniq_meal_plan',
  GROCERY_LIST: 'kitcheniq_grocery_list'
};

const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach_first',
    title: 'First Recipe',
    description: 'Created or generated your very first recipe in KitchenIQ',
    icon: '✨',
    progress: 1,
    maxProgress: 1
  },
  {
    id: 'ach_10_recipes',
    title: '10 Recipes Cooked',
    description: 'Cooked 10 delicious vegetarian recipes',
    icon: '👨‍🍳',
    progress: 0,
    maxProgress: 10
  },
  {
    id: 'ach_healthy',
    title: 'Healthy Eater',
    description: 'Generated 5 High-Protein or Low-Calorie recipes',
    icon: '🥗',
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'ach_zero_waste',
    title: 'Zero Waste Hero',
    description: 'Rescued expiring kitchen ingredients using Zero-Waste mode',
    icon: '♻️',
    progress: 0,
    maxProgress: 3
  },
  {
    id: 'ach_world_explorer',
    title: 'World Cuisine Explorer',
    description: 'Explored recipes across 5 different world cuisines',
    icon: '🌎',
    progress: 0,
    maxProgress: 5
  },
  {
    id: 'ach_streak_7',
    title: '7-Day Cooking Streak',
    description: 'Cooked meals on 7 consecutive days',
    icon: '🔥',
    progress: 0,
    maxProgress: 7
  }
];

const DEFAULT_PROFILE: UserProfile = {
  id: 'usr_101',
  name: 'Vegetarian Gourmet',
  email: 'chef@kitcheniq.ai',
  preferences: {
    dietaryPreference: 'Egg-Friendly Vegetarian',
    allergies: [],
    favoriteCuisines: ['Indian', 'Italian', 'Mexican'],
    nutritionGoal: 'High Protein',
    defaultServings: 2,
    defaultBudget: 1500
  },
  cookingStreak: 5,
  lastCookedDate: new Date().toISOString(),
  achievements: INITIAL_ACHIEVEMENTS
};

const EMPTY_MEAL_PLAN: WeeklyMealPlan = {
  Monday: {},
  Tuesday: {},
  Wednesday: {},
  Thursday: {},
  Friday: {},
  Saturday: {},
  Sunday: {}
};

export class AppStorage {
  // User Profile
  public getUserProfile(): UserProfile {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load profile', e);
    }
    return DEFAULT_PROFILE;
  }

  public saveUserProfile(profile: UserProfile): void {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  }

  public getUserPreferences(): UserPreferences {
    return this.getUserProfile().preferences;
  }

  public updateUserPreferences(preferences: Partial<UserPreferences>): UserPreferences {
    const profile = this.getUserProfile();
    profile.preferences = { ...profile.preferences, ...preferences };
    this.saveUserProfile(profile);
    return profile.preferences;
  }

  public updatePreferences(preferences: Partial<UserPreferences>): UserProfile {
    const profile = this.getUserProfile();
    profile.preferences = { ...profile.preferences, ...preferences };
    this.saveUserProfile(profile);
    return profile;
  }

  // Favorites
  public getFavorites(): Recipe[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load favorites', e);
    }
    return [RECIPES_DATASET[0], RECIPES_DATASET[2]]; // default favorites
  }

  public toggleFavorite(recipe: Recipe): boolean {
    const favorites = this.getFavorites();
    const index = favorites.findIndex((r) => r.id === recipe.id);
    let isFav = false;

    if (index >= 0) {
      favorites.splice(index, 1);
      isFav = false;
    } else {
      favorites.push({ ...recipe, isFavorite: true });
      isFav = true;
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
    return isFav;
  }

  // History
  public getHistory(): Recipe[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load history', e);
    }
    return RECIPES_DATASET.slice(0, 4);
  }

  public addToHistory(recipe: Recipe): void {
    const history = this.getHistory();
    const filtered = history.filter((r) => r.id !== recipe.id);
    filtered.unshift(recipe);
    localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(filtered.slice(0, 20)));
  }

  // Meal Plan
  public getMealPlan(): WeeklyMealPlan {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.MEAL_PLAN);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load meal plan', e);
    }
    // Default pre-populated meal plan for rich initial display
    return {
      Monday: { breakfast: RECIPES_DATASET[2], lunch: RECIPES_DATASET[8], dinner: RECIPES_DATASET[0] },
      Tuesday: { breakfast: RECIPES_DATASET[5], lunch: RECIPES_DATASET[4], dinner: RECIPES_DATASET[1] },
      Wednesday: { breakfast: RECIPES_DATASET[2], lunch: RECIPES_DATASET[6], dinner: RECIPES_DATASET[7] },
      Thursday: { lunch: RECIPES_DATASET[10], dinner: RECIPES_DATASET[3] },
      Friday: { breakfast: RECIPES_DATASET[5], lunch: RECIPES_DATASET[11], dinner: RECIPES_DATASET[9] },
      Saturday: { breakfast: RECIPES_DATASET[2], dinner: RECIPES_DATASET[0] },
      Sunday: { lunch: RECIPES_DATASET[6], dinner: RECIPES_DATASET[1] }
    };
  }

  public saveMealPlan(plan: WeeklyMealPlan): void {
    localStorage.setItem(STORAGE_KEYS.MEAL_PLAN, JSON.stringify(plan));
  }

  public assignToMealPlan(day: keyof WeeklyMealPlan, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipe: Recipe): WeeklyMealPlan {
    const plan = this.getMealPlan();
    if (!plan[day]) plan[day] = {};
    plan[day][mealType] = recipe;
    this.saveMealPlan(plan);
    return plan;
  }

  public assignMealPlanSlot(day: keyof WeeklyMealPlan, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack', recipe: Recipe): WeeklyMealPlan {
    return this.assignToMealPlan(day, mealType, recipe);
  }

  public clearMealPlanSlot(day: keyof WeeklyMealPlan, mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack'): WeeklyMealPlan {
    const plan = this.getMealPlan();
    if (plan[day] && plan[day][mealType]) {
      delete plan[day][mealType];
      this.saveMealPlan(plan);
    }
    return plan;
  }

  // Grocery List
  public getGroceryList(): GroceryItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GROCERY_LIST);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Failed to load grocery list', e);
    }
    // Default smart grocery list
    return [
      { id: 'g_1', name: 'Fresh Paneer', amount: '450g', category: 'Dairy', checked: false, estimatedCost: 120 },
      { id: 'g_2', name: 'Organic Spinach', amount: '300g', category: 'Produce', checked: true, estimatedCost: 30 },
      { id: 'g_3', name: 'Tomatoes', amount: '9 medium', category: 'Produce', checked: false, estimatedCost: 45 },
      { id: 'g_4', name: 'Farm Fresh Eggs', amount: '12 large', category: 'Eggs', checked: false, estimatedCost: 90 },
      { id: 'g_5', name: 'Basmati Rice', amount: '1 kg', category: 'Grains', checked: true, estimatedCost: 110 },
      { id: 'g_6', name: 'Chickpeas (Kabuli Chana)', amount: '500g', category: 'Pulses', checked: false, estimatedCost: 65 },
      { id: 'g_7', name: 'Garam Masala & Spices', amount: '1 pack', category: 'Spices', checked: false, estimatedCost: 50 }
    ];
  }

  public saveGroceryList(list: GroceryItem[]): void {
    localStorage.setItem(STORAGE_KEYS.GROCERY_LIST, JSON.stringify(list));
  }

  public toggleGroceryItem(id: string): GroceryItem[] {
    const list = this.getGroceryList();
    const item = list.find((i) => i.id === id);
    if (item) {
      item.checked = !item.checked;
      this.saveGroceryList(list);
    }
    return list;
  }

  public deleteGroceryItem(id: string): GroceryItem[] {
    const list = this.getGroceryList().filter((i) => i.id !== id);
    this.saveGroceryList(list);
    return list;
  }

  public addGroceryItem(item: Partial<GroceryItem>): GroceryItem[] {
    const list = this.getGroceryList();
    const newItem: GroceryItem = {
      id: `g_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      name: item.name || 'Grocery Item',
      amount: item.amount || '1 pack',
      category: item.category || 'Pantry',
      checked: false,
      estimatedCost: item.estimatedCost || 30
    };
    list.unshift(newItem);
    this.saveGroceryList(list);
    return list;
  }

  public addRecipeMissingIngredientsToGrocery(recipe: Recipe): GroceryItem[] {
    const list = this.getGroceryList();
    const missing = recipe.ingredients.filter((i) => !i.available) || recipe.ingredients;

    for (const item of missing) {
      const existing = list.find((g) => g.name.toLowerCase() === item.name.toLowerCase());
      if (existing) {
        existing.amount = `${existing.amount} + ${item.amount}`;
      } else {
        list.push({
          id: `g_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
          name: item.name,
          amount: item.amount,
          category: (item.category as any) || 'Pantry',
          checked: false,
          estimatedCost: 40,
          addedFromRecipe: recipe.name
        });
      }
    }

    this.saveGroceryList(list);
    return list;
  }

  // Streak & Achievements
  public incrementCookedStreak(): UserProfile {
    const profile = this.getUserProfile();
    profile.cookingStreak += 1;
    profile.lastCookedDate = new Date().toISOString();

    // Check achievement progress
    for (const ach of profile.achievements) {
      if (ach.id === 'ach_10_recipes') {
        ach.progress = Math.min(10, (ach.progress || 0) + 1);
      }
      if (ach.id === 'ach_streak_7') {
        ach.progress = Math.min(7, profile.cookingStreak);
      }
      if (ach.progress && ach.maxProgress && ach.progress >= ach.maxProgress) {
        ach.unlockedAt = ach.unlockedAt || new Date().toISOString();
      }
    }

    this.saveUserProfile(profile);
    return profile;
  }
}

export const appStorage = new AppStorage();
