export type DietaryPreference =
  | 'Egg-Friendly Vegetarian'
  | 'Vegan'
  | 'Dairy-Free'
  | 'Gluten-Free'
  | 'Jain-Friendly'
  | 'High-Protein Vegetarian'
  | 'Low-Calorie'
  | 'Low-Carb'
  | 'Diabetic-Friendly';

export type Allergy =
  | 'Nuts'
  | 'Peanuts'
  | 'Dairy'
  | 'Eggs'
  | 'Gluten'
  | 'Soy'
  | 'Sesame';

export type Cuisine =
  | 'Indian'
  | 'Italian'
  | 'Chinese'
  | 'Japanese'
  | 'Korean'
  | 'Mexican'
  | 'Thai'
  | 'Mediterranean'
  | 'American';

export type MealType = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Dessert';

export type NutritionGoal =
  | 'Balanced'
  | 'Low Calorie'
  | 'High Protein'
  | 'Low Carb'
  | 'Muscle Building'
  | 'Weight Management';

export type CookingTimeOption = '10 minutes' | '20 minutes' | '30 minutes' | '45 minutes' | '60+ minutes';

export type DifficultyLevel = 'Easy' | 'Medium' | 'Advanced';

export interface IngredientItem {
  name: string;
  amount: string;
  category: string;
  available?: boolean;
}

export interface SubstitutionItem {
  original: string;
  substitute: string;
  compatibility: number; // percentage e.g. 95
  reason: string;
}

export interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sugar: number;
  isEstimate?: boolean;
}

export interface MatchScore {
  ingredientMatch: number;
  dietCompatibility: number;
  nutritionMatch: number;
  cookTimeMatch: number;
  cuisineMatch: number;
  overallMatch: number;
  reason: string;
}

export interface Recipe {
  id: string;
  name: string;
  description: string;
  cuisine: string;
  mealType: string;
  prepTime: number; // minutes
  cookTime: number; // minutes
  totalTime: number; // minutes
  servings: number;
  calories: number;
  difficulty: DifficultyLevel;
  ingredients: IngredientItem[];
  instructions: string[];
  dietaryTags: string[];
  allergens: string[];
  nutrition: NutritionData;
  matchScore?: MatchScore;
  missingIngredients?: string[];
  availableIngredients?: string[];
  substitutions?: SubstitutionItem[];
  imageUrl?: string;
  vegetarian: boolean;
  eggAllowed: boolean;
  isFavorite?: boolean;
  userRating?: number;
  createdByAi?: boolean;
  createdAt?: string;
}

export interface UserPreferences {
  dietaryPreference: DietaryPreference;
  allergies: string[];
  favoriteCuisines: string[];
  nutritionGoal: NutritionGoal;
  defaultServings: number;
  defaultBudget: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  preferences: UserPreferences;
  cookingStreak: number;
  lastCookedDate?: string;
  achievements: Achievement[];
}

export interface DayMealPlan {
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snack?: Recipe;
}

export interface WeeklyMealPlan {
  Monday: DayMealPlan;
  Tuesday: DayMealPlan;
  Wednesday: DayMealPlan;
  Thursday: DayMealPlan;
  Friday: DayMealPlan;
  Saturday: DayMealPlan;
  Sunday: DayMealPlan;
}

export type GroceryCategory =
  | 'Produce'
  | 'Dairy'
  | 'Eggs'
  | 'Grains'
  | 'Pulses'
  | 'Pantry'
  | 'Spices'
  | 'Other';

export interface GroceryItem {
  id: string;
  name: string;
  amount: string;
  category: GroceryCategory;
  checked: boolean;
  estimatedCost?: number;
  addedFromRecipe?: string;
}

export interface RAGSearchResult {
  recipe: Recipe;
  similarityScore: number;
  matchedKeywords: string[];
  chunkSource: string;
  retrievalExplanation: string;
}

export interface AISafetyCheck {
  isVegetarianCompliant: boolean;
  allergyCheckPassed: boolean;
  dietaryCheckPassed: boolean;
  ingredientsValidated: boolean;
  recipeConsistencyPassed: boolean;
  flaggedItems: string[];
  logs: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'chef';
  text: string;
  timestamp: string;
  ragContext?: {
    recipesUsed: string[];
    reasoning: string;
  };
}

export interface VisionDetectionResult {
  detectedIngredients: string[];
  confidenceScore: number;
  prohibitedItemsDetected: string[];
  rawAnalysis: string;
}

export interface WeatherInfo {
  temperatureC: number;
  condition: 'Sunny' | 'Rainy' | 'Cold' | 'Hot' | 'Cloudy' | 'Pleasant';
  location: string;
  suggestedMealType: string;
  recommendationReason: string;
}
