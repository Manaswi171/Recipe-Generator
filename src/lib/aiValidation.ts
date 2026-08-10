import { Recipe, UserPreferences, AISafetyCheck } from '../types';
import {
  STRICTLY_PROHIBITED_MEATS,
  JAIN_PROHIBITED_INGREDIENTS,
  VEGAN_PROHIBITED_INGREDIENTS,
  ALLERGY_INGREDIENT_MAP
} from '../data/dietary_rules';

export class AISafetyValidator {
  public validateRecipe(recipe: Recipe, preferences?: UserPreferences): AISafetyCheck {
    const flaggedItems: string[] = [];
    const logs: string[] = [];

    // Check 1: Vegetarian & Meat Compliance
    let isVegetarianCompliant = true;
    const allText = `${recipe.name} ${recipe.description} ${recipe.ingredients.map((i) => i.name).join(' ')} ${recipe.instructions.join(' ')}`.toLowerCase();

    for (const meat of STRICTLY_PROHIBITED_MEATS) {
      if (allText.includes(meat)) {
        isVegetarianCompliant = false;
        flaggedItems.push(`Prohibited Non-Veg Ingredient detected: "${meat}"`);
      }
    }

    if (isVegetarianCompliant) {
      logs.push('✓ Vegetarian & Egg-Friendly compliance verified.');
    } else {
      logs.push('❌ CRITICAL: Non-vegetarian element detected.');
    }

    // Check 2: Dietary Rule Validation (Vegan, Jain, etc.)
    let dietaryCheckPassed = true;
    if (preferences?.dietaryPreference === 'Vegan') {
      for (const veganForbid of VEGAN_PROHIBITED_INGREDIENTS) {
        if (allText.includes(veganForbid)) {
          dietaryCheckPassed = false;
          flaggedItems.push(`Vegan Violation: Contains "${veganForbid}"`);
        }
      }
      if (dietaryCheckPassed) {
        logs.push('✓ Vegan dietary requirements verified (0 dairy/eggs).');
      } else {
        logs.push('❌ Vegan requirement failed.');
      }
    } else if (preferences?.dietaryPreference === 'Jain-Friendly') {
      for (const jainForbid of JAIN_PROHIBITED_INGREDIENTS) {
        if (allText.includes(jainForbid)) {
          dietaryCheckPassed = false;
          flaggedItems.push(`Jain Violation: Contains "${jainForbid}"`);
        }
      }
      if (dietaryCheckPassed) {
        logs.push('✓ Jain-Friendly compliance verified (No onion, garlic, or root vegetables).');
      } else {
        logs.push('❌ Jain requirement failed.');
      }
    } else {
      logs.push('✓ Dietary preference requirements passed.');
    }

    // Check 3: Allergy Validation
    let allergyCheckPassed = true;
    if (preferences?.allergies && preferences.allergies.length > 0) {
      for (const allergy of preferences.allergies) {
        const triggers = ALLERGY_INGREDIENT_MAP[allergy] || [allergy.toLowerCase()];
        for (const trigger of triggers) {
          if (allText.includes(trigger)) {
            allergyCheckPassed = false;
            flaggedItems.push(`Allergy Hazard: Contains "${trigger}" (User allergic to ${allergy})`);
          }
        }
      }
    }

    if (allergyCheckPassed) {
      logs.push('✓ Allergy requirements checked and safe.');
    } else {
      logs.push('❌ Allergy check failed.');
    }

    // Check 4: Ingredients & Consistency Validation
    const ingredientsValidated = recipe.ingredients.length > 0;
    const recipeConsistencyPassed = recipe.instructions.length > 0 && recipe.prepTime > 0;

    if (ingredientsValidated) logs.push('✓ Ingredients structure validated.');
    if (recipeConsistencyPassed) logs.push('✓ Recipe step consistency checked.');

    return {
      isVegetarianCompliant,
      allergyCheckPassed,
      dietaryCheckPassed,
      ingredientsValidated,
      recipeConsistencyPassed,
      flaggedItems,
      logs
    };
  }

  /**
   * Sanitizes ingredient lists derived from Fridge Vision scanner
   */
  public sanitizeVisionIngredients(detectedList: string[]): {
    safeIngredients: string[];
    prohibitedDetected: string[];
  } {
    const safeIngredients: string[] = [];
    const prohibitedDetected: string[] = [];

    for (const item of detectedList) {
      const lower = item.toLowerCase().trim();
      const isMeat = STRICTLY_PROHIBITED_MEATS.some((meat) => lower.includes(meat));

      if (isMeat) {
        prohibitedDetected.push(item);
      } else {
        safeIngredients.push(item);
      }
    }

    return { safeIngredients, prohibitedDetected };
  }
}

export const aiSafetyValidator = new AISafetyValidator();
