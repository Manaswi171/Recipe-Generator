import { Recipe, AISafetyCheck, WeatherInfo } from '../types';

export async function apiGenerateRecipe(params: {
  ingredients: string[];
  dietaryPreference: string;
  allergies: string[];
  cuisine: string;
  mealType: string;
  cookingTime: string;
  nutritionGoal: string;
  servings: number;
  budget: number;
  difficulty: string;
}): Promise<{ recipe: Recipe; safetyCheck: AISafetyCheck; ragUsed: boolean }> {
  try {
    const res = await fetch('/api/recipe/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error('Client apiGenerateRecipe error:', err);
    throw err;
  }
}

export async function apiRemixRecipe(recipe: Recipe, remixType: string) {
  const res = await fetch('/api/recipe/remix', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipe, remixType })
  });
  if (!res.ok) throw new Error('Remix failed');
  return await res.json();
}

export async function apiDetectFridgeIngredients(base64Image: string) {
  const res = await fetch('/api/vision/detect', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ base64Image })
  });
  if (!res.ok) throw new Error('Vision scan failed');
  return await res.json();
}

export async function apiChatWithChef(query: string, recipeContext?: Recipe) {
  const res = await fetch('/api/recipe/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, recipeContext })
  });
  if (!res.ok) throw new Error('Chef chat failed');
  return await res.json();
}

export async function apiGetWeatherRecommendation(): Promise<WeatherInfo> {
  try {
    const res = await fetch('/api/weather');
    if (!res.ok) throw new Error('Weather request failed');
    return await res.json();
  } catch {
    return {
      temperatureC: 28,
      condition: 'Sunny',
      location: 'Local Kitchen',
      suggestedMealType: 'Refreshing Paneer Salad',
      recommendationReason: '☀️ Sunny weather! Perfect for cool high-protein salads.'
    };
  }
}
