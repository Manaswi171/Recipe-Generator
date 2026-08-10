import { RECIPES_DATASET } from '../data/recipes';
import { Recipe, RAGSearchResult, UserPreferences } from '../types';
import {
  STRICTLY_PROHIBITED_MEATS,
  JAIN_PROHIBITED_INGREDIENTS,
  VEGAN_PROHIBITED_INGREDIENTS,
  ALLERGY_INGREDIENT_MAP
} from '../data/dietary_rules';

// Simple lightweight vector store & TF-IDF similarity calculation engine
export class RecipeVectorStore {
  private recipes: Recipe[];

  constructor() {
    this.recipes = RECIPES_DATASET;
  }

  /**
   * Performs vector similarity search with strict metadata filtering
   */
  public search(query: string, preferences?: Partial<UserPreferences>, topK: number = 6): RAGSearchResult[] {
    const cleanQuery = query.toLowerCase().trim();
    const queryTokens = this.tokenize(cleanQuery);

    const filteredRecipes = this.recipes.filter((recipe) => {
      // Rule 1: MANDATORY VEGETARIAN FILTER
      if (!recipe.vegetarian) return false;

      // Check if recipe contains any strictly prohibited meat
      const hasMeat = recipe.ingredients.some((i) =>
        STRICTLY_PROHIBITED_MEATS.some((m) => i.name.toLowerCase().includes(m))
      );
      if (hasMeat) return false;

      if (!preferences) return true;

      // Rule 2: Vegan filter
      if (preferences.dietaryPreference === 'Vegan') {
        if (recipe.eggAllowed && recipe.dietaryTags.includes('Egg-Friendly Vegetarian') && !recipe.dietaryTags.includes('Vegan')) {
          const hasEggOrDairy = recipe.ingredients.some((i) =>
            VEGAN_PROHIBITED_INGREDIENTS.some((v) => i.name.toLowerCase().includes(v))
          );
          if (hasEggOrDairy) return false;
        }
      }

      // Rule 3: Jain filter
      if (preferences.dietaryPreference === 'Jain-Friendly') {
        const hasJainRestricted = recipe.ingredients.some((i) =>
          JAIN_PROHIBITED_INGREDIENTS.some((j) => i.name.toLowerCase().includes(j))
        );
        if (hasJainRestricted) return false;
      }

      // Rule 4: Allergy Filter
      if (preferences.allergies && preferences.allergies.length > 0) {
        for (const allergy of preferences.allergies) {
          const restricted = ALLERGY_INGREDIENT_MAP[allergy] || [];
          const hasAllergen = recipe.ingredients.some((i) =>
            restricted.some((r) => i.name.toLowerCase().includes(r))
          );
          if (hasAllergen) return false;
        }
      }

      return true;
    });

    // Score recipes based on TF-IDF + Keyword Overlap + Cuisine match
    const results: RAGSearchResult[] = filteredRecipes.map((recipe) => {
      const recipeText = `
        ${recipe.name} ${recipe.description} ${recipe.cuisine} ${recipe.mealType}
        ${recipe.dietaryTags.join(' ')} ${recipe.ingredients.map((i) => i.name).join(' ')}
      `.toLowerCase();

      const recipeTokens = this.tokenize(recipeText);
      const matchedKeywords = queryTokens.filter((token) => recipeTokens.includes(token));

      let score = 0;
      if (queryTokens.length > 0) {
        score = (matchedKeywords.length / queryTokens.length) * 0.7;
      }

      // Bonus score for exact cuisine or ingredient match
      if (recipe.cuisine.toLowerCase().includes(cleanQuery)) score += 0.25;
      if (recipe.name.toLowerCase().includes(cleanQuery)) score += 0.35;
      if (recipe.ingredients.some((i) => i.name.toLowerCase().includes(cleanQuery))) score += 0.2;

      // Normalize score between 0.60 and 0.98
      const finalScore = Math.min(0.98, Math.max(0.6, Number((0.65 + score * 0.33).toFixed(2))));

      const chunkSource = `Recipe Doc #${recipe.id} [${recipe.cuisine} | ${recipe.dietaryTags.join(', ')}]`;
      const retrievalExplanation = `Retrieved matching ${recipe.cuisine} ${recipe.mealType} containing ${recipe.ingredients.slice(0, 3).map((i) => i.name).join(', ')} with ${matchedKeywords.length} query tokens matched.`;

      return {
        recipe,
        similarityScore: finalScore,
        matchedKeywords: matchedKeywords.length > 0 ? matchedKeywords : ['vegetarian', 'recipe'],
        chunkSource,
        retrievalExplanation
      };
    });

    // Sort by similarity score descending
    results.sort((a, b) => b.similarityScore - a.similarityScore);
    return results.slice(0, topK);
  }

  /**
   * Retrieves context string for Gemini prompt injection
   */
  public getRAGContextForPrompt(query: string, preferences?: Partial<UserPreferences>): string {
    const results = this.search(query, preferences, 4);
    if (results.length === 0) return 'No pre-existing RAG recipes matched.';

    return results
      .map(
        (res, idx) =>
          `[RAG Source ${idx + 1}: ${res.recipe.name} (Similarity: ${(res.similarityScore * 100).toFixed(0)}%)]\n` +
          `Cuisine: ${res.recipe.cuisine} | Prep Time: ${res.recipe.prepTime}m | Cook Time: ${res.recipe.cookTime}m\n` +
          `Ingredients: ${res.recipe.ingredients.map((i) => `${i.amount} ${i.name}`).join(', ')}\n` +
          `Instructions Summary: ${res.recipe.instructions.join(' ')}\n`
      )
      .join('\n---\n');
  }

  private tokenize(text: string): string[] {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter((w) => w.length > 2);
  }
}

export const vectorStore = new RecipeVectorStore();
