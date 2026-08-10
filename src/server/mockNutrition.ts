import { INGREDIENT_NUTRITION_DB } from '../data/nutrition';
import { WeatherInfo } from '../types';

export function getIngredientNutrition(ingredientName: string) {
  const key = ingredientName.toLowerCase().replace(/[^a-z]/g, '');
  const match = INGREDIENT_NUTRITION_DB[key];
  if (match) return match;

  // Default estimate for unknown ingredients
  return {
    name: ingredientName,
    category: 'Produce',
    caloriesPer100g: 45,
    proteinPer100g: 2.5,
    carbsPer100g: 8,
    fatPer100g: 0.5,
    fiberPer100g: 2,
    sugarPer100g: 3,
    estimatedCostPer100gINR: 20
  };
}

export function getWeatherRecommendation(): WeatherInfo {
  // Simulates local ambient weather integration for intelligent recipe suggestions
  const hour = new Date().getHours();
  const isHot = hour >= 11 && hour <= 16;

  if (isHot) {
    return {
      temperatureC: 34,
      condition: 'Hot',
      location: 'Mumbai, IN',
      suggestedMealType: 'Refreshing Cucumber Mint Salad / Cold Smoothies',
      recommendationReason: '☀️ High ambient temperature detected (34°C). Recommending cool, hydrating, light vegetarian dishes.'
    };
  }

  return {
    temperatureC: 22,
    condition: 'Pleasant',
    location: 'Mumbai, IN',
    suggestedMealType: 'Warm Paneer Tikka & Spiced Soup',
    recommendationReason: '🌧️ Cool pleasant weather. Perfect for warm spiced gravies, soups, and hot egg bhurji.'
  };
}
