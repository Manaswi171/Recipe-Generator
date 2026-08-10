import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { generateAiRecipe, detectFridgeIngredients, chatWithChef } from './src/server/gemini';
import { getWeatherRecommendation } from './src/server/mockNutrition';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '20mb' }));

  // API Routes
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', app: 'KitchenIQ', time: new Date().toISOString() });
  });

  app.post('/api/recipe/generate', async (req, res) => {
    try {
      const result = await generateAiRecipe(req.body);
      res.json(result);
    } catch (err: any) {
      console.error('Error generating recipe:', err);
      res.status(500).json({ error: 'Failed to generate recipe', message: err?.message });
    }
  });

  app.post('/api/recipe/remix', async (req, res) => {
    try {
      const { recipe, remixType } = req.body;
      const remixed = await generateAiRecipe({
        ingredients: recipe.ingredients.map((i: any) => i.name),
        dietaryPreference: remixType === 'Vegan' ? 'Vegan' : remixType === 'Jain-Friendly' ? 'Jain-Friendly' : recipe.dietaryTags[0] || 'Egg-Friendly Vegetarian',
        allergies: recipe.allergens || [],
        cuisine: recipe.cuisine,
        mealType: recipe.mealType,
        cookingTime: remixType === '15-Minute Version' ? '15 minutes' : `${recipe.cookTime} minutes`,
        nutritionGoal: remixType === 'High Protein' ? 'High Protein' : remixType === 'Low Calorie' ? 'Low Calorie' : 'Balanced',
        servings: recipe.servings,
        budget: 1500,
        difficulty: recipe.difficulty
      });
      res.json(remixed);
    } catch (err: any) {
      console.error('Error remixing recipe:', err);
      res.status(500).json({ error: 'Failed to remix recipe' });
    }
  });

  app.post('/api/recipe/chat', async (req, res) => {
    try {
      const { query, recipeContext } = req.body;
      const chatResponse = await chatWithChef(query, recipeContext);
      res.json(chatResponse);
    } catch (err: any) {
      console.error('Error in chef chat:', err);
      res.status(500).json({ error: 'Failed to chat with AI Chef' });
    }
  });

  app.post('/api/vision/detect', async (req, res) => {
    try {
      const { base64Image } = req.body;
      const detection = await detectFridgeIngredients(base64Image || '');
      res.json(detection);
    } catch (err: any) {
      console.error('Error in vision detection:', err);
      res.status(500).json({ error: 'Failed to detect ingredients' });
    }
  });

  app.get('/api/weather', (_req, res) => {
    res.json(getWeatherRecommendation());
  });

  // Vite middleware in dev, static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KitchenIQ Express + Vite Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
