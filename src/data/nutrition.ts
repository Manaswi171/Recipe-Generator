export interface IngredientNutrition {
  name: string;
  category: string;
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  fiberPer100g: number;
  sugarPer100g: number;
  estimatedCostPer100gINR: number; // in Rupees
}

export const INGREDIENT_NUTRITION_DB: Record<string, IngredientNutrition> = {
  paneer: {
    name: 'Paneer',
    category: 'Dairy',
    caloriesPer100g: 265,
    proteinPer100g: 18.3,
    carbsPer100g: 3.4,
    fatPer100g: 20.8,
    fiberPer100g: 0,
    sugarPer100g: 2.5,
    estimatedCostPer100gINR: 45
  },
  tofu: {
    name: 'Tofu',
    category: 'Produce',
    caloriesPer100g: 76,
    proteinPer100g: 8,
    carbsPer100g: 1.9,
    fatPer100g: 4.8,
    fiberPer100g: 0.3,
    sugarPer100g: 0.5,
    estimatedCostPer100gINR: 30
  },
  eggs: {
    name: 'Eggs',
    category: 'Eggs',
    caloriesPer100g: 155,
    proteinPer100g: 13,
    carbsPer100g: 1.1,
    fatPer100g: 11,
    fiberPer100g: 0,
    sugarPer100g: 1.1,
    estimatedCostPer100gINR: 12
  },
  spinach: {
    name: 'Spinach',
    category: 'Produce',
    caloriesPer100g: 23,
    proteinPer100g: 2.9,
    carbsPer100g: 3.6,
    fatPer100g: 0.4,
    fiberPer100g: 2.2,
    sugarPer100g: 0.4,
    estimatedCostPer100gINR: 10
  },
  tomato: {
    name: 'Tomato',
    category: 'Produce',
    caloriesPer100g: 18,
    proteinPer100g: 0.9,
    carbsPer100g: 3.9,
    fatPer100g: 0.2,
    fiberPer100g: 1.2,
    sugarPer100g: 2.6,
    estimatedCostPer100gINR: 5
  },
  onion: {
    name: 'Onion',
    category: 'Produce',
    caloriesPer100g: 40,
    proteinPer100g: 1.1,
    carbsPer100g: 9.3,
    fatPer100g: 0.1,
    fiberPer100g: 1.7,
    sugarPer100g: 4.2,
    estimatedCostPer100gINR: 4
  },
  chickpeas: {
    name: 'Chickpeas',
    category: 'Pulses',
    caloriesPer100g: 164,
    proteinPer100g: 8.9,
    carbsPer100g: 27.4,
    fatPer100g: 2.6,
    fiberPer100g: 7.6,
    sugarPer100g: 4.8,
    estimatedCostPer100gINR: 15
  },
  rice: {
    name: 'Rice',
    category: 'Grains',
    caloriesPer100g: 130,
    proteinPer100g: 2.7,
    carbsPer100g: 28,
    fatPer100g: 0.3,
    fiberPer100g: 0.4,
    sugarPer100g: 0.1,
    estimatedCostPer100gINR: 8
  },
  mushrooms: {
    name: 'Mushrooms',
    category: 'Produce',
    caloriesPer100g: 22,
    proteinPer100g: 3.1,
    carbsPer100g: 3.3,
    fatPer100g: 0.3,
    fiberPer100g: 1,
    sugarPer100g: 2,
    estimatedCostPer100gINR: 25
  },
  butter: {
    name: 'Butter',
    category: 'Dairy',
    caloriesPer100g: 717,
    proteinPer100g: 0.9,
    carbsPer100g: 0.1,
    fatPer100g: 81,
    fiberPer100g: 0,
    sugarPer100g: 0.1,
    estimatedCostPer100gINR: 55
  },
  oliveoil: {
    name: 'Olive Oil',
    category: 'Pantry',
    caloriesPer100g: 884,
    proteinPer100g: 0,
    carbsPer100g: 0,
    fatPer100g: 100,
    fiberPer100g: 0,
    sugarPer100g: 0,
    estimatedCostPer100gINR: 120
  }
};
