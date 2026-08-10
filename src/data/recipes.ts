import { Recipe } from '../types';

export const RECIPES_DATASET: Recipe[] = [
  {
    id: 'rec_1',
    name: 'Paneer Butter Masala',
    description: 'Rich, creamy tomato gravy with soft cottage cheese cubes cooked in butter, cream, and Indian spices.',
    cuisine: 'Indian',
    mealType: 'Dinner',
    prepTime: 15,
    cookTime: 25,
    totalTime: 40,
    servings: 4,
    calories: 480,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Paneer', amount: '250g', category: 'Dairy', available: true },
      { name: 'Tomato', amount: '4 medium', category: 'Produce', available: true },
      { name: 'Onion', amount: '2 medium', category: 'Produce', available: true },
      { name: 'Butter', amount: '2 tbsp', category: 'Dairy', available: true },
      { name: 'Garlic', amount: '6 cloves', category: 'Produce', available: true },
      { name: 'Ginger', amount: '1 inch', category: 'Produce', available: true },
      { name: 'Cashews', amount: '15 pieces', category: 'Pantry', available: true },
      { name: 'Garam Masala', amount: '1 tsp', category: 'Spices', available: true },
      { name: 'Fresh Cream', amount: '3 tbsp', category: 'Dairy', available: false },
      { name: 'Kuri Methi', amount: '1 tbsp', category: 'Spices', available: false }
    ],
    instructions: [
      'Blend boiled onions, tomatoes, cashews, ginger, and garlic into a smooth puree.',
      'Heat butter in a pan, add spices and tomato-onion puree. Saute until oil separates.',
      'Add water, garam masala, salt, and bring gravy to a simmer.',
      'Add fresh paneer cubes and gently simmer for 5 minutes.',
      'Finish with crushed kasuri methi and fresh cream before serving hot with naan or rice.'
    ],
    dietaryTags: ['Egg-Friendly Vegetarian', 'High-Protein Vegetarian'],
    allergens: ['Dairy', 'Nuts'],
    nutrition: {
      calories: 480,
      protein: 18,
      carbs: 22,
      fat: 36,
      fiber: 4,
      sugar: 8
    },
    vegetarian: true,
    eggAllowed: true,
    imageUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_2',
    name: 'Palak Paneer',
    description: 'Nutritious spinach curry folded with soft paneer cubes, flavored with garlic, cumin, and mild spices.',
    cuisine: 'Indian',
    mealType: 'Dinner',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 3,
    calories: 360,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Spinach', amount: '300g', category: 'Produce', available: true },
      { name: 'Paneer', amount: '200g', category: 'Dairy', available: true },
      { name: 'Garlic', amount: '8 cloves', category: 'Produce', available: true },
      { name: 'Onion', amount: '1 medium', category: 'Produce', available: true },
      { name: 'Green Chili', amount: '2', category: 'Produce', available: true },
      { name: 'Cumin Seeds', amount: '1 tsp', category: 'Spices', available: true },
      { name: 'Ghee', amount: '1.5 tbsp', category: 'Dairy', available: true }
    ],
    instructions: [
      'Blanch spinach leaves in boiling water for 2 minutes, then plunge into cold ice water.',
      'Blend spinach with green chili into a smooth green puree.',
      'Heat ghee, saute cumin seeds and chopped garlic until golden aromatic.',
      'Add onion and spices, cook till translucent, then pour in spinach puree.',
      'Add paneer cubes, simmer for 5 minutes, adjust salt, and serve hot.'
    ],
    dietaryTags: ['Egg-Friendly Vegetarian', 'High-Protein Vegetarian', 'Low-Carb'],
    allergens: ['Dairy'],
    nutrition: {
      calories: 360,
      protein: 21,
      carbs: 14,
      fat: 26,
      fiber: 6,
      sugar: 3
    },
    vegetarian: true,
    eggAllowed: true,
    imageUrl: 'https://images.unsplash.com/photo-1617692855027-33b14f061079?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_3',
    name: 'Protein-Packed Egg Bhurji',
    description: 'Spiced Indian scrambled eggs with sautéed onions, tomatoes, green chilies, and fresh coriander.',
    cuisine: 'Indian',
    mealType: 'Breakfast',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    servings: 2,
    calories: 290,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Eggs', amount: '4 large', category: 'Eggs', available: true },
      { name: 'Onion', amount: '1 large', category: 'Produce', available: true },
      { name: 'Tomato', amount: '1 medium', category: 'Produce', available: true },
      { name: 'Green Chili', amount: '2 finely chopped', category: 'Produce', available: true },
      { name: 'Butter', amount: '1 tbsp', category: 'Dairy', available: true },
      { name: 'Turmeric', amount: '0.5 tsp', category: 'Spices', available: true },
      { name: 'Coriander', amount: '2 tbsp', category: 'Produce', available: true }
    ],
    instructions: [
      'Whisk eggs in a bowl with a pinch of salt and turmeric powder.',
      'Melt butter in a pan, add chopped onions and green chilies. Saute until light golden.',
      'Add tomatoes and red chili powder, cook until soft.',
      'Pour whisked eggs into the pan and stir continuously on medium heat until soft scrambled.',
      'Garnish with fresh chopped coriander and serve hot with buttered toast or paratha.'
    ],
    dietaryTags: ['Egg-Friendly Vegetarian', 'High-Protein Vegetarian', 'Low-Carb', 'Diabetic-Friendly'],
    allergens: ['Eggs', 'Dairy'],
    nutrition: {
      calories: 290,
      protein: 24,
      carbs: 6,
      fat: 19,
      fiber: 2,
      sugar: 3
    },
    vegetarian: true,
    eggAllowed: true,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_4',
    name: 'Jain Paneer Tomato Gravy',
    description: 'A rich, satin-smooth tomato cashew gravy without onion, garlic, or root vegetables. 100% Jain compliant.',
    cuisine: 'Indian',
    mealType: 'Dinner',
    prepTime: 10,
    cookTime: 20,
    totalTime: 30,
    servings: 3,
    calories: 380,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Paneer', amount: '200g', category: 'Dairy', available: true },
      { name: 'Tomato', amount: '5 ripe', category: 'Produce', available: true },
      { name: 'Cashews', amount: '12 pieces', category: 'Pantry', available: true },
      { name: 'Cumin Seeds', amount: '1 tsp', category: 'Spices', available: true },
      { name: 'Butter', amount: '1.5 tbsp', category: 'Dairy', available: true },
      { name: 'Coriander Powder', amount: '1 tsp', category: 'Spices', available: true },
      { name: 'Garam Masala', amount: '0.5 tsp', category: 'Spices', available: true }
    ],
    instructions: [
      'Puree ripe tomatoes and soaked cashews together into a silk-smooth paste.',
      'Heat butter or ghee in a pan, add cumin seeds until splattering.',
      'Pour in tomato-cashew puree and spice powders. Cook on low flame till butter glistens on top.',
      'Add paneer cubes and gently simmer for 4 minutes.',
      'Garnish with fresh coriander leaves and serve warm.'
    ],
    dietaryTags: ['Jain-Friendly', 'Egg-Friendly Vegetarian', 'Gluten-Free'],
    allergens: ['Dairy', 'Nuts'],
    nutrition: {
      calories: 380,
      protein: 17,
      carbs: 18,
      fat: 28,
      fiber: 3,
      sugar: 7
    },
    vegetarian: true,
    eggAllowed: true,
    imageUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_5',
    name: 'Veggie Tofu Stir-Fry',
    description: 'Crispy pan-seared tofu strips tossed with vibrant bell peppers, broccoli, and soy ginger glaze.',
    cuisine: 'Chinese',
    mealType: 'Lunch',
    prepTime: 15,
    cookTime: 12,
    totalTime: 27,
    servings: 2,
    calories: 320,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Tofu', amount: '250g firm', category: 'Produce', available: true },
      { name: 'Broccoli', amount: '1 cup florets', category: 'Produce', available: true },
      { name: 'Bell Pepper', amount: '1 sliced', category: 'Produce', available: true },
      { name: 'Soy Sauce', amount: '2 tbsp', category: 'Pantry', available: true },
      { name: 'Sesame Oil', amount: '1 tbsp', category: 'Pantry', available: true },
      { name: 'Garlic', amount: '4 cloves minced', category: 'Produce', available: true },
      { name: 'Cornstarch', amount: '1 tbsp', category: 'Pantry', available: true }
    ],
    instructions: [
      'Press tofu to remove water, cut into cubes, and dust with cornstarch.',
      'Heat oil in a wok, sear tofu cubes until golden crisp on all sides. Remove.',
      'Stir fry minced garlic, broccoli, and bell pepper slices on high heat for 3 minutes.',
      'Add soy sauce, sesame oil, cornstarch slurry, and return crisped tofu.',
      'Toss till coated in glossy savory glaze and serve over steamed jasmine rice.'
    ],
    dietaryTags: ['Vegan', 'Dairy-Free', 'High-Protein Vegetarian', 'Low-Calorie'],
    allergens: ['Soy', 'Sesame'],
    nutrition: {
      calories: 320,
      protein: 20,
      carbs: 18,
      fat: 16,
      fiber: 5,
      sugar: 4
    },
    vegetarian: true,
    eggAllowed: false,
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_6',
    name: 'Avocado & Scrambled Egg Toast',
    description: 'Toasted sourdough topped with mashed avocado, soft herb-scrambled eggs, chili flakes, and microgreens.',
    cuisine: 'American',
    mealType: 'Breakfast',
    prepTime: 8,
    cookTime: 7,
    totalTime: 15,
    servings: 2,
    calories: 350,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Eggs', amount: '3 large', category: 'Eggs', available: true },
      { name: 'Avocado', amount: '1 ripe', category: 'Produce', available: true },
      { name: 'Bread', amount: '2 sourdough slices', category: 'Grains', available: true },
      { name: 'Olive Oil', amount: '1 tbsp', category: 'Pantry', available: true },
      { name: 'Lemon Juice', amount: '1 tsp', category: 'Produce', available: true },
      { name: 'Chili Flakes', amount: '0.5 tsp', category: 'Spices', available: true }
    ],
    instructions: [
      'Mash ripe avocado with lemon juice, salt, and black pepper in a small bowl.',
      'Toast sourdough slices until crispy and golden.',
      'Soft scramble eggs in olive oil on low heat until velvety.',
      'Spread creamy avocado on toast, top with warm scrambled eggs, chili flakes, and fresh herbs.'
    ],
    dietaryTags: ['Egg-Friendly Vegetarian', 'Dairy-Free', 'High-Protein Vegetarian'],
    allergens: ['Eggs', 'Gluten'],
    nutrition: {
      calories: 350,
      protein: 16,
      carbs: 28,
      fat: 20,
      fiber: 7,
      sugar: 2
    },
    vegetarian: true,
    eggAllowed: true,
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_7',
    name: 'Vegetable Biryani',
    description: 'Aromatic basmati rice layered with spiced cauliflower, carrots, peas, paneer, saffron, and fried onions.',
    cuisine: 'Indian',
    mealType: 'Lunch',
    prepTime: 20,
    cookTime: 30,
    totalTime: 50,
    servings: 4,
    calories: 420,
    difficulty: 'Medium',
    ingredients: [
      { name: 'Basmati Rice', amount: '1.5 cups', category: 'Grains', available: true },
      { name: 'Paneer', amount: '150g cubed', category: 'Dairy', available: true },
      { name: 'Carrot', amount: '1 chopped', category: 'Produce', available: true },
      { name: 'Green Peas', amount: '0.5 cup', category: 'Produce', available: true },
      { name: 'Yogurt', amount: '0.5 cup', category: 'Dairy', available: true },
      { name: 'Biryani Masala', amount: '1.5 tbsp', category: 'Spices', available: true },
      { name: 'Mint & Coriander', amount: '0.5 cup', category: 'Produce', available: true },
      { name: 'Ghee', amount: '2 tbsp', category: 'Dairy', available: true }
    ],
    instructions: [
      'Par-boil basmati rice with whole spices (bay leaf, cardamom, cloves) until 80% cooked.',
      'Marinate paneer, carrots, peas in yogurt, biryani masala, and ginger-garlic paste.',
      'Cook marinated vegetables in ghee until tender.',
      'Layer rice over vegetables, top with mint, saffron milk, and fried onions.',
      'Cover tightly and dum-cook on lowest heat for 15 minutes before fluffing gently.'
    ],
    dietaryTags: ['Egg-Friendly Vegetarian', 'High-Protein Vegetarian', 'Gluten-Free'],
    allergens: ['Dairy'],
    nutrition: {
      calories: 420,
      protein: 15,
      carbs: 58,
      fat: 16,
      fiber: 5,
      sugar: 4
    },
    vegetarian: true,
    eggAllowed: true,
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_8',
    name: 'Creamy Mushroom Pasta',
    description: 'Al dente fettuccine tossed with sautéed cremini mushrooms, garlic, parmesan, and rich herb cream sauce.',
    cuisine: 'Italian',
    mealType: 'Dinner',
    prepTime: 10,
    cookTime: 18,
    totalTime: 28,
    servings: 2,
    calories: 460,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Pasta', amount: '200g fettuccine', category: 'Grains', available: true },
      { name: 'Mushrooms', amount: '250g sliced', category: 'Produce', available: true },
      { name: 'Garlic', amount: '5 cloves minced', category: 'Produce', available: true },
      { name: 'Heavy Cream', amount: '0.5 cup', category: 'Dairy', available: true },
      { name: 'Butter', amount: '1.5 tbsp', category: 'Dairy', available: true },
      { name: 'Parmesan', amount: '0.25 cup grated', category: 'Dairy', available: true },
      { name: 'Parsley', amount: '2 tbsp chopped', category: 'Produce', available: true }
    ],
    instructions: [
      'Boil pasta in salted water until al dente. Reserve 0.5 cup pasta water.',
      'Sauté mushrooms in melted butter until deeply golden and caramelized.',
      'Add minced garlic and cook 1 minute. Pour in cream and parmesan cheese.',
      'Toss drained pasta in mushroom cream sauce, adjusting consistency with pasta water.',
      'Season with black pepper and fresh parsley.'
    ],
    dietaryTags: ['Egg-Friendly Vegetarian'],
    allergens: ['Dairy', 'Gluten'],
    nutrition: {
      calories: 460,
      protein: 14,
      carbs: 52,
      fat: 22,
      fiber: 4,
      sugar: 3
    },
    vegetarian: true,
    eggAllowed: true,
    imageUrl: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_9',
    name: 'High-Protein Chole Masala',
    description: 'Classic North Indian chickpea curry cooked with dark tea spice broth, onions, tomatoes, and amchur.',
    cuisine: 'Indian',
    mealType: 'Lunch',
    prepTime: 15,
    cookTime: 30,
    totalTime: 45,
    servings: 4,
    calories: 340,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Chickpeas', amount: '2 cups cooked', category: 'Pulses', available: true },
      { name: 'Onion', amount: '2 medium', category: 'Produce', available: true },
      { name: 'Tomato', amount: '2 medium', category: 'Produce', available: true },
      { name: 'Chole Masala', amount: '2 tbsp', category: 'Spices', available: true },
      { name: 'Tea Bag', amount: '1 for dark color', category: 'Pantry', available: true },
      { name: 'Ginger', amount: '1 inch julienned', category: 'Produce', available: true },
      { name: 'Oil', amount: '1.5 tbsp', category: 'Pantry', available: true }
    ],
    instructions: [
      'Boil soaked chickpeas with tea bag and whole spices until soft.',
      'Sauté finely chopped onions in oil until golden brown.',
      'Add tomato puree and chole masala. Cook until oil separates.',
      'Add boiled chickpeas with broth, simmer for 15 minutes while mashing a few chickpeas for thick gravy.',
      'Top with ginger juliennes and serve hot with bhature, puri, or steamed rice.'
    ],
    dietaryTags: ['Vegan', 'Dairy-Free', 'Gluten-Free', 'High-Protein Vegetarian', 'Diabetic-Friendly'],
    allergens: [],
    nutrition: {
      calories: 340,
      protein: 16,
      carbs: 48,
      fat: 9,
      fiber: 12,
      sugar: 6
    },
    vegetarian: true,
    eggAllowed: false,
    imageUrl: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_10',
    name: 'Crispy Veggie Hakka Noodles',
    description: 'Street-style Indo-Chinese noodles stir-fried with shredded cabbage, bell peppers, carrots, and spring onions.',
    cuisine: 'Chinese',
    mealType: 'Dinner',
    prepTime: 15,
    cookTime: 10,
    totalTime: 25,
    servings: 3,
    calories: 380,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Noodles', amount: '200g Hakka noodles', category: 'Grains', available: true },
      { name: 'Cabbage', amount: '1 cup shredded', category: 'Produce', available: true },
      { name: 'Bell Pepper', amount: '1 sliced', category: 'Produce', available: true },
      { name: 'Carrot', amount: '1 julienned', category: 'Produce', available: true },
      { name: 'Soy Sauce', amount: '1.5 tbsp', category: 'Pantry', available: true },
      { name: 'Vinegar', amount: '1 tbsp', category: 'Pantry', available: true },
      { name: 'Chili Sauce', amount: '1 tbsp', category: 'Pantry', available: true }
    ],
    instructions: [
      'Boil noodles until al dente, drain, rinse with cold water, and toss in 1 tsp oil.',
      'Heat wok on high heat with 2 tbsp oil until smoking hot.',
      'Stir-fry shredded cabbage, carrots, bell peppers, and green chilies for 2 minutes maintaining crunch.',
      'Add boiled noodles, soy sauce, chili sauce, and vinegar.',
      'Toss vigorously on high flame and serve immediately garnished with spring onions.'
    ],
    dietaryTags: ['Vegan', 'Dairy-Free'],
    allergens: ['Soy', 'Gluten'],
    nutrition: {
      calories: 380,
      protein: 10,
      carbs: 62,
      fat: 11,
      fiber: 5,
      sugar: 5
    },
    vegetarian: true,
    eggAllowed: false,
    imageUrl: 'https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_11',
    name: 'Mediterranean Eggplant Chickpea Bowl',
    description: 'Roasted zaatar eggplant, warm chickpeas, cucumber tomato salad, and creamy tahini drizzle.',
    cuisine: 'Mediterranean',
    mealType: 'Lunch',
    prepTime: 15,
    cookTime: 20,
    totalTime: 35,
    servings: 2,
    calories: 370,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Eggplant', amount: '1 medium cubed', category: 'Produce', available: true },
      { name: 'Chickpeas', amount: '1.5 cups cooked', category: 'Pulses', available: true },
      { name: 'Cucumber', amount: '1 diced', category: 'Produce', available: true },
      { name: 'Tomato', amount: '2 diced', category: 'Produce', available: true },
      { name: 'Tahini', amount: '2 tbsp', category: 'Pantry', available: true },
      { name: 'Olive Oil', amount: '2 tbsp', category: 'Pantry', available: true },
      { name: 'Lemon Juice', amount: '2 tbsp', category: 'Produce', available: true }
    ],
    instructions: [
      'Toss cubed eggplant in olive oil, zaatar spice, salt, and roast at 200°C for 20 minutes.',
      'Combine diced cucumber, tomatoes, lemon juice, and parsley for fresh salad.',
      'Whisk tahini with warm water, lemon juice, and garlic into a smooth dressing.',
      'Assemble bowls with warm chickpeas, roasted eggplant, fresh salad, and drizzled tahini sauce.'
    ],
    dietaryTags: ['Vegan', 'Dairy-Free', 'Gluten-Free', 'High-Protein Vegetarian', 'Low-Calorie'],
    allergens: ['Sesame'],
    nutrition: {
      calories: 370,
      protein: 15,
      carbs: 44,
      fat: 17,
      fiber: 11,
      sugar: 7
    },
    vegetarian: true,
    eggAllowed: false,
    imageUrl: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rec_12',
    name: 'Egg Fried Rice',
    description: 'Wok-tossed basmati rice with golden scrambled eggs, green peas, carrots, garlic, and savory soy sauce.',
    cuisine: 'Chinese',
    mealType: 'Lunch',
    prepTime: 10,
    cookTime: 10,
    totalTime: 20,
    servings: 2,
    calories: 360,
    difficulty: 'Easy',
    ingredients: [
      { name: 'Eggs', amount: '3 large', category: 'Eggs', available: true },
      { name: 'Cooked Rice', amount: '2 cups cold day-old', category: 'Grains', available: true },
      { name: 'Carrot', amount: '0.5 cup diced', category: 'Produce', available: true },
      { name: 'Green Peas', amount: '0.5 cup', category: 'Produce', available: true },
      { name: 'Garlic', amount: '4 cloves minced', category: 'Produce', available: true },
      { name: 'Soy Sauce', amount: '1.5 tbsp', category: 'Pantry', available: true },
      { name: 'Sesame Oil', amount: '1 tbsp', category: 'Pantry', available: true }
    ],
    instructions: [
      'Scramble eggs in a wok until soft and set aside.',
      'Heat oil on high heat, stir-fry minced garlic, carrots, and green peas for 2 minutes.',
      'Add cold cooked rice, breaking up lumps.',
      'Pour in soy sauce, sesame oil, and cooked scrambled eggs.',
      'Toss everything together on high heat for 2 minutes and serve hot.'
    ],
    dietaryTags: ['Egg-Friendly Vegetarian', 'Dairy-Free', 'High-Protein Vegetarian'],
    allergens: ['Eggs', 'Soy', 'Sesame'],
    nutrition: {
      calories: 360,
      protein: 18,
      carbs: 46,
      fat: 12,
      fiber: 4,
      sugar: 3
    },
    vegetarian: true,
    eggAllowed: true,
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80'
  }
];
