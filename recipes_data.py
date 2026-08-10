"""
KitchenIQ Dataset: Recipes, Dietary Rules, Prohibited Items, and Ingredient Substitutions.
Exclusively 100% Vegetarian & Egg-Friendly.
"""

STRICTLY_PROHIBITED_MEATS = [
    'chicken', 'mutton', 'beef', 'pork', 'fish', 'seafood', 'prawn', 'prawns',
    'shrimp', 'crab', 'meat', 'bacon', 'ham', 'sausage', 'lamb', 'turkey',
    'duck', 'squid', 'octopus', 'anchovy', 'anchovies', 'tuna', 'salmon',
    'lobster', 'clam', 'clams', 'oyster', 'oysters', 'mussel', 'mussels'
]

JAIN_PROHIBITED_INGREDIENTS = [
    'onion', 'onions', 'garlic', 'shallot', 'shallots', 'potato', 'potatoes',
    'carrot', 'carrots', 'radish', 'beetroot', 'turnip', 'ginger', 'sweet potato',
    'yam', 'mushrooms', 'mushroom', 'yeast', 'alcohol', 'egg', 'eggs'
]

VEGAN_PROHIBITED_INGREDIENTS = [
    'egg', 'eggs', 'milk', 'paneer', 'butter', 'ghee', 'cheese', 'yogurt',
    'curd', 'cream', 'fresh cream', 'heavy cream', 'honey', 'condensed milk',
    'parmesan', 'whey'
]

ALLERGY_INGREDIENT_MAP = {
    'Nuts': ['almond', 'cashew', 'walnut', 'pistachio', 'hazelnut', 'pecan', 'nut', 'nuts'],
    'Peanuts': ['peanut', 'peanuts', 'peanut butter'],
    'Dairy': ['milk', 'paneer', 'butter', 'ghee', 'cheese', 'yogurt', 'curd', 'cream', 'fresh cream', 'heavy cream', 'parmesan', 'whey'],
    'Eggs': ['egg', 'eggs', 'egg white', 'egg yolk', 'mayonnaise'],
    'Gluten': ['wheat', 'flour', 'maida', 'fettuccine', 'bread', 'sourdough', 'pasta', 'noodles', 'soy sauce', 'barley', 'rye'],
    'Soy': ['soy', 'tofu', 'soy sauce', 'edamame', 'soy chunks'],
    'Sesame': ['sesame', 'tahini', 'sesame oil', 'til']
}

INGREDIENT_SUBSTITUTIONS = {
    "paneer": [
        {"original": "Paneer", "substitute": "Firm Tofu", "compatibility": 95, "reason": "Excellent plant-based high-protein substitute with similar firm texture."},
        {"original": "Paneer", "substitute": "Halloumi / Ricotta", "compatibility": 88, "reason": "Dairy substitute with rich milk flavor that holds shape when heated."}
    ],
    "milk": [
        {"original": "Milk", "substitute": "Oat Milk / Almond Milk", "compatibility": 92, "reason": "Dairy-free, vegan alternative perfect for gravies and smoothies."},
        {"original": "Milk", "substitute": "Coconut Milk", "compatibility": 90, "reason": "Provides lush rich body for Asian and South Indian curries."}
    ],
    "butter": [
        {"original": "Butter", "substitute": "Olive Oil / Coconut Oil", "compatibility": 90, "reason": "Healthy plant fat alternative with rich flavor profile."},
        {"original": "Butter", "substitute": "Vegan Butter", "compatibility": 98, "reason": "Direct 1:1 vegan fat replacement."}
    ],
    "egg": [
        {"original": "Egg", "substitute": "Flaxseed Slurry (1 tbsp flax + 3 tbsp water)", "compatibility": 85, "reason": "Natural vegan binder for baking and pancakes."},
        {"original": "Egg", "substitute": "Mashed Tofu / Besan (Chickpea Flour)", "compatibility": 90, "reason": "High protein scramble substitute for savory dishes."}
    ],
    "wheat": [
        {"original": "Wheat Flour / Maida", "substitute": "Almond Flour / Rice Flour / Oat Flour", "compatibility": 88, "reason": "Gluten-free flour alternative with great binding properties."}
    ],
    "onion": [
        {"original": "Onion", "substitute": "Hing (Asafoetida) + Cabbage", "compatibility": 85, "reason": "Jain-friendly savory Umami depth without root vegetables."}
    ],
    "garlic": [
        {"original": "Garlic", "substitute": "A pinch of Hing (Asafoetida)", "compatibility": 85, "reason": "Jain-friendly digestive spice giving intense pungent note."}
    ]
}

RECIPES_DATASET = [
    {
        "id": "rec_1",
        "name": "Paneer Butter Masala",
        "description": "Rich, creamy tomato gravy with soft cottage cheese cubes cooked in butter, cream, and Indian spices.",
        "cuisine": "Indian",
        "mealType": "Dinner",
        "prepTime": 15,
        "cookTime": 25,
        "totalTime": 40,
        "servings": 4,
        "calories": 480,
        "difficulty": "Medium",
        "ingredients": [
            {"name": "Paneer", "amount": "250g", "category": "Dairy", "available": True},
            {"name": "Tomato", "amount": "4 medium", "category": "Produce", "available": True},
            {"name": "Onion", "amount": "2 medium", "category": "Produce", "available": True},
            {"name": "Butter", "amount": "2 tbsp", "category": "Dairy", "available": True},
            {"name": "Garlic", "amount": "6 cloves", "category": "Produce", "available": True},
            {"name": "Ginger", "amount": "1 inch", "category": "Produce", "available": True},
            {"name": "Cashews", "amount": "15 pieces", "category": "Pantry", "available": True},
            {"name": "Garam Masala", "amount": "1 tsp", "category": "Spices", "available": True},
            {"name": "Fresh Cream", "amount": "3 tbsp", "category": "Dairy", "available": False},
            {"name": "Kasuri Methi", "amount": "1 tbsp", "category": "Spices", "available": False}
        ],
        "instructions": [
            "Blend boiled onions, tomatoes, cashews, ginger, and garlic into a smooth puree.",
            "Heat butter in a pan, add spices and tomato-onion puree. Saute until oil separates.",
            "Add water, garam masala, salt, and bring gravy to a simmer.",
            "Add fresh paneer cubes and gently simmer for 5 minutes.",
            "Finish with crushed kasuri methi and fresh cream before serving hot with naan or rice."
        ],
        "dietaryTags": ["Egg-Friendly Vegetarian", "High-Protein Vegetarian"],
        "allergens": ["Dairy", "Nuts"],
        "nutrition": {"calories": 480, "protein": 18, "carbs": 22, "fat": 36, "fiber": 4, "sugar": 8},
        "vegetarian": True,
        "eggAllowed": True,
        "imageUrl": "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_2",
        "name": "Palak Paneer",
        "description": "Nutritious spinach curry folded with soft paneer cubes, flavored with garlic, cumin, and mild spices.",
        "cuisine": "Indian",
        "mealType": "Dinner",
        "prepTime": 15,
        "cookTime": 20,
        "totalTime": 35,
        "servings": 3,
        "calories": 360,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Spinach", "amount": "300g", "category": "Produce", "available": True},
            {"name": "Paneer", "amount": "200g", "category": "Dairy", "available": True},
            {"name": "Garlic", "amount": "8 cloves", "category": "Produce", "available": True},
            {"name": "Onion", "amount": "1 medium", "category": "Produce", "available": True},
            {"name": "Green Chili", "amount": "2", "category": "Produce", "available": True},
            {"name": "Cumin Seeds", "amount": "1 tsp", "category": "Spices", "available": True},
            {"name": "Ghee", "amount": "1.5 tbsp", "category": "Dairy", "available": True}
        ],
        "instructions": [
            "Blanch spinach leaves in boiling water for 2 minutes, then plunge into cold ice water.",
            "Blend spinach with green chili into a smooth green puree.",
            "Heat ghee, saute cumin seeds and chopped garlic until golden aromatic.",
            "Add onion and spices, cook till translucent, then pour in spinach puree.",
            "Add paneer cubes, simmer for 5 minutes, adjust salt, and serve hot."
        ],
        "dietaryTags": ["Egg-Friendly Vegetarian", "High-Protein Vegetarian", "Low-Carb"],
        "allergens": ["Dairy"],
        "nutrition": {"calories": 360, "protein": 21, "carbs": 14, "fat": 26, "fiber": 6, "sugar": 3},
        "vegetarian": True,
        "eggAllowed": True,
        "imageUrl": "https://images.unsplash.com/photo-1610057099443-f27361dd9914?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_3",
        "name": "Protein-Packed Egg Bhurji",
        "description": "Spiced Indian scrambled eggs with sautéed onions, tomatoes, green chilies, and fresh coriander.",
        "cuisine": "Indian",
        "mealType": "Breakfast",
        "prepTime": 10,
        "cookTime": 10,
        "totalTime": 20,
        "servings": 2,
        "calories": 290,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Eggs", "amount": "4 large", "category": "Eggs", "available": True},
            {"name": "Onion", "amount": "1 large", "category": "Produce", "available": True},
            {"name": "Tomato", "amount": "1 medium", "category": "Produce", "available": True},
            {"name": "Green Chili", "amount": "2 finely chopped", "category": "Produce", "available": True},
            {"name": "Butter", "amount": "1 tbsp", "category": "Dairy", "available": True},
            {"name": "Turmeric", "amount": "0.5 tsp", "category": "Spices", "available": True},
            {"name": "Coriander", "amount": "2 tbsp", "category": "Produce", "available": True}
        ],
        "instructions": [
            "Whisk eggs in a bowl with a pinch of salt and turmeric powder.",
            "Melt butter in a pan, add chopped onions and green chilies. Saute until light golden.",
            "Add tomatoes and red chili powder, cook until soft.",
            "Pour whisked eggs into the pan and stir continuously on medium heat until soft scrambled.",
            "Garnish with fresh chopped coriander and serve hot with buttered toast or paratha."
        ],
        "dietaryTags": ["Egg-Friendly Vegetarian", "High-Protein Vegetarian", "Low-Carb", "Diabetic-Friendly"],
        "allergens": ["Eggs", "Dairy"],
        "nutrition": {"calories": 290, "protein": 24, "carbs": 6, "fat": 19, "fiber": 2, "sugar": 3},
        "vegetarian": True,
        "eggAllowed": True,
        "imageUrl": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_4",
        "name": "Jain Paneer Tomato Gravy",
        "description": "A rich, satin-smooth tomato cashew gravy without onion, garlic, or root vegetables. 100% Jain compliant.",
        "cuisine": "Indian",
        "mealType": "Dinner",
        "prepTime": 10,
        "cookTime": 20,
        "totalTime": 30,
        "servings": 3,
        "calories": 380,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Paneer", "amount": "200g", "category": "Dairy", "available": True},
            {"name": "Tomato", "amount": "5 ripe", "category": "Produce", "available": True},
            {"name": "Cashews", "amount": "12 pieces", "category": "Pantry", "available": True},
            {"name": "Cumin Seeds", "amount": "1 tsp", "category": "Spices", "available": True},
            {"name": "Butter", "amount": "1.5 tbsp", "category": "Dairy", "available": True},
            {"name": "Coriander Powder", "amount": "1 tsp", "category": "Spices", "available": True},
            {"name": "Garam Masala", "amount": "0.5 tsp", "category": "Spices", "available": True}
        ],
        "instructions": [
            "Puree ripe tomatoes and soaked cashews together into a silk-smooth paste.",
            "Heat butter or ghee in a pan, add cumin seeds until splattering.",
            "Pour in tomato-cashew puree and spice powders. Cook on low flame till butter glistens on top.",
            "Add paneer cubes and gently simmer for 4 minutes.",
            "Garnish with fresh coriander leaves and serve warm."
        ],
        "dietaryTags": ["Jain-Friendly", "Egg-Friendly Vegetarian", "Gluten-Free"],
        "allergens": ["Dairy", "Nuts"],
        "nutrition": {"calories": 380, "protein": 17, "carbs": 18, "fat": 28, "fiber": 3, "sugar": 7},
        "vegetarian": True,
        "eggAllowed": True,
        "imageUrl": "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_5",
        "name": "Veggie Tofu Stir-Fry",
        "description": "Crispy pan-seared tofu strips tossed with vibrant bell peppers, broccoli, and soy ginger glaze.",
        "cuisine": "Chinese",
        "mealType": "Lunch",
        "prepTime": 15,
        "cookTime": 12,
        "totalTime": 27,
        "servings": 2,
        "calories": 320,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Tofu", "amount": "250g firm", "category": "Produce", "available": True},
            {"name": "Broccoli", "amount": "1 cup florets", "category": "Produce", "available": True},
            {"name": "Bell Pepper", "amount": "1 sliced", "category": "Produce", "available": True},
            {"name": "Soy Sauce", "amount": "2 tbsp", "category": "Pantry", "available": True},
            {"name": "Sesame Oil", "amount": "1 tbsp", "category": "Pantry", "available": True},
            {"name": "Garlic", "amount": "4 cloves minced", "category": "Produce", "available": True},
            {"name": "Cornstarch", "amount": "1 tbsp", "category": "Pantry", "available": True}
        ],
        "instructions": [
            "Press tofu to remove water, cut into cubes, and dust with cornstarch.",
            "Heat oil in a wok, sear tofu cubes until golden crisp on all sides. Remove.",
            "Stir fry minced garlic, broccoli, and bell pepper slices on high heat for 3 minutes.",
            "Add soy sauce, sesame oil, cornstarch slurry, and return crisped tofu.",
            "Toss till coated in glossy savory glaze and serve over steamed jasmine rice."
        ],
        "dietaryTags": ["Vegan", "Dairy-Free", "High-Protein Vegetarian", "Low-Calorie"],
        "allergens": ["Soy", "Sesame"],
        "nutrition": {"calories": 320, "protein": 20, "carbs": 18, "fat": 16, "fiber": 5, "sugar": 4},
        "vegetarian": True,
        "eggAllowed": False,
        "imageUrl": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_6",
        "name": "Avocado & Scrambled Egg Toast",
        "description": "Toasted sourdough topped with mashed avocado, soft herb-scrambled eggs, chili flakes, and microgreens.",
        "cuisine": "American",
        "mealType": "Breakfast",
        "prepTime": 8,
        "cookTime": 7,
        "totalTime": 15,
        "servings": 2,
        "calories": 350,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Eggs", "amount": "3 large", "category": "Eggs", "available": True},
            {"name": "Avocado", "amount": "1 ripe", "category": "Produce", "available": True},
            {"name": "Bread", "amount": "2 sourdough slices", "category": "Grains", "available": True},
            {"name": "Olive Oil", "amount": "1 tbsp", "category": "Pantry", "available": True},
            {"name": "Lemon Juice", "amount": "1 tsp", "category": "Produce", "available": True},
            {"name": "Chili Flakes", "amount": "0.5 tsp", "category": "Spices", "available": True}
        ],
        "instructions": [
            "Mash ripe avocado with lemon juice, salt, and black pepper in a small bowl.",
            "Toast sourdough slices until crispy and golden.",
            "Soft scramble eggs in olive oil on low heat until velvety.",
            "Spread creamy avocado on toast, top with warm scrambled eggs, chili flakes, and fresh herbs."
        ],
        "dietaryTags": ["Egg-Friendly Vegetarian", "Dairy-Free", "High-Protein Vegetarian"],
        "allergens": ["Eggs", "Gluten"],
        "nutrition": {"calories": 350, "protein": 16, "carbs": 28, "fat": 20, "fiber": 7, "sugar": 2},
        "vegetarian": True,
        "eggAllowed": True,
        "imageUrl": "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_7",
        "name": "Vegetable Biryani",
        "description": "Aromatic basmati rice layered with spiced cauliflower, carrots, peas, paneer, saffron, and fried onions.",
        "cuisine": "Indian",
        "mealType": "Lunch",
        "prepTime": 20,
        "cookTime": 30,
        "totalTime": 50,
        "servings": 4,
        "calories": 420,
        "difficulty": "Medium",
        "ingredients": [
            {"name": "Basmati Rice", "amount": "1.5 cups", "category": "Grains", "available": True},
            {"name": "Paneer", "amount": "150g cubed", "category": "Dairy", "available": True},
            {"name": "Carrot", "amount": "1 chopped", "category": "Produce", "available": True},
            {"name": "Green Peas", "amount": "0.5 cup", "category": "Produce", "available": True},
            {"name": "Yogurt", "amount": "0.5 cup", "category": "Dairy", "available": True},
            {"name": "Biryani Masala", "amount": "1.5 tbsp", "category": "Spices", "available": True},
            {"name": "Mint & Coriander", "amount": "0.5 cup", "category": "Produce", "available": True},
            {"name": "Ghee", "amount": "2 tbsp", "category": "Dairy", "available": True}
        ],
        "instructions": [
            "Par-boil basmati rice with whole spices until 80% cooked.",
            "Marinate paneer, carrots, peas in yogurt, biryani masala, and ginger-garlic paste.",
            "Cook marinated vegetables in ghee until tender.",
            "Layer rice over vegetables, top with mint, saffron milk, and fried onions.",
            "Cover tightly and dum-cook on lowest heat for 15 minutes before fluffing gently."
        ],
        "dietaryTags": ["Egg-Friendly Vegetarian", "High-Protein Vegetarian", "Gluten-Free"],
        "allergens": ["Dairy"],
        "nutrition": {"calories": 420, "protein": 15, "carbs": 58, "fat": 16, "fiber": 5, "sugar": 4},
        "vegetarian": True,
        "eggAllowed": True,
        "imageUrl": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_8",
        "name": "Creamy Mushroom Pasta",
        "description": "Al dente fettuccine tossed with sautéed cremini mushrooms, garlic, parmesan, and rich herb cream sauce.",
        "cuisine": "Italian",
        "mealType": "Dinner",
        "prepTime": 10,
        "cookTime": 18,
        "totalTime": 28,
        "servings": 2,
        "calories": 460,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Pasta", "amount": "200g fettuccine", "category": "Grains", "available": True},
            {"name": "Mushrooms", "amount": "250g sliced", "category": "Produce", "available": True},
            {"name": "Garlic", "amount": "5 cloves minced", "category": "Produce", "available": True},
            {"name": "Heavy Cream", "amount": "0.5 cup", "category": "Dairy", "available": True},
            {"name": "Butter", "amount": "1.5 tbsp", "category": "Dairy", "available": True},
            {"name": "Parmesan", "amount": "0.25 cup grated", "category": "Dairy", "available": True},
            {"name": "Parsley", "amount": "2 tbsp chopped", "category": "Produce", "available": True}
        ],
        "instructions": [
            "Boil pasta in salted water until al dente. Reserve 0.5 cup pasta water.",
            "Sauté mushrooms in melted butter until deeply golden and caramelized.",
            "Add minced garlic and cook 1 minute. Pour in cream and parmesan cheese.",
            "Toss drained pasta in mushroom cream sauce, adjusting consistency with pasta water.",
            "Season with black pepper and fresh parsley."
        ],
        "dietaryTags": ["Egg-Friendly Vegetarian"],
        "allergens": ["Dairy", "Gluten"],
        "nutrition": {"calories": 460, "protein": 14, "carbs": 52, "fat": 22, "fiber": 4, "sugar": 3},
        "vegetarian": True,
        "eggAllowed": True,
        "imageUrl": "https://images.unsplash.com/photo-1621996346565-e3def6164286?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_9",
        "name": "High-Protein Chole Masala",
        "description": "Classic North Indian chickpea curry cooked with dark tea spice broth, onions, tomatoes, and amchur.",
        "cuisine": "Indian",
        "mealType": "Lunch",
        "prepTime": 15,
        "cookTime": 30,
        "totalTime": 45,
        "servings": 4,
        "calories": 340,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Chickpeas", "amount": "2 cups cooked", "category": "Pulses", "available": True},
            {"name": "Onion", "amount": "2 medium", "category": "Produce", "available": True},
            {"name": "Tomato", "amount": "2 medium", "category": "Produce", "available": True},
            {"name": "Chole Masala", "amount": "2 tbsp", "category": "Spices", "available": True},
            {"name": "Tea Bag", "amount": "1 for dark color", "category": "Pantry", "available": True},
            {"name": "Ginger", "amount": "1 inch julienned", "category": "Produce", "available": True},
            {"name": "Oil", "amount": "1.5 tbsp", "category": "Pantry", "available": True}
        ],
        "instructions": [
            "Boil soaked chickpeas with tea bag and whole spices until soft.",
            "Sauté finely chopped onions in oil until golden brown.",
            "Add tomato puree and chole masala. Cook until oil separates.",
            "Add boiled chickpeas with broth, simmer for 15 minutes while mashing a few chickpeas.",
            "Top with ginger juliennes and serve hot with bhature or steamed rice."
        ],
        "dietaryTags": ["Vegan", "Dairy-Free", "Gluten-Free", "High-Protein Vegetarian", "Diabetic-Friendly"],
        "allergens": [],
        "nutrition": {"calories": 340, "protein": 16, "carbs": 48, "fat": 9, "fiber": 12, "sugar": 6},
        "vegetarian": True,
        "eggAllowed": False,
        "imageUrl": "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_10",
        "name": "Crispy Veggie Hakka Noodles",
        "description": "Street-style Indo-Chinese noodles stir-fried with shredded cabbage, bell peppers, carrots, and spring onions.",
        "cuisine": "Chinese",
        "mealType": "Dinner",
        "prepTime": 15,
        "cookTime": 10,
        "totalTime": 25,
        "servings": 3,
        "calories": 380,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Noodles", "amount": "200g Hakka noodles", "category": "Grains", "available": True},
            {"name": "Cabbage", "amount": "1 cup shredded", "category": "Produce", "available": True},
            {"name": "Bell Pepper", "amount": "1 sliced", "category": "Produce", "available": True},
            {"name": "Carrot", "amount": "1 julienned", "category": "Produce", "available": True},
            {"name": "Soy Sauce", "amount": "1.5 tbsp", "category": "Pantry", "available": True},
            {"name": "Vinegar", "amount": "1 tbsp", "category": "Pantry", "available": True},
            {"name": "Chili Sauce", "amount": "1 tbsp", "category": "Pantry", "available": True}
        ],
        "instructions": [
            "Boil noodles until al dente, drain, rinse with cold water, and toss in 1 tsp oil.",
            "Heat wok on high heat with 2 tbsp oil until smoking hot.",
            "Stir-fry shredded cabbage, carrots, bell peppers, and green chilies for 2 minutes maintaining crunch.",
            "Add boiled noodles, soy sauce, chili sauce, and vinegar.",
            "Toss vigorously on high flame and serve immediately garnished with spring onions."
        ],
        "dietaryTags": ["Vegan", "Dairy-Free"],
        "allergens": ["Soy", "Gluten"],
        "nutrition": {"calories": 380, "protein": 10, "carbs": 62, "fat": 11, "fiber": 5, "sugar": 5},
        "vegetarian": True,
        "eggAllowed": False,
        "imageUrl": "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_11",
        "name": "Mediterranean Eggplant Chickpea Bowl",
        "description": "Roasted zaatar eggplant, warm chickpeas, cucumber tomato salad, and creamy tahini drizzle.",
        "cuisine": "Mediterranean",
        "mealType": "Lunch",
        "prepTime": 15,
        "cookTime": 20,
        "totalTime": 35,
        "servings": 2,
        "calories": 370,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Eggplant", "amount": "1 medium cubed", "category": "Produce", "available": True},
            {"name": "Chickpeas", "amount": "1.5 cups cooked", "category": "Pulses", "available": True},
            {"name": "Cucumber", "amount": "1 diced", "category": "Produce", "available": True},
            {"name": "Tomato", "amount": "2 diced", "category": "Produce", "available": True},
            {"name": "Tahini", "amount": "2 tbsp", "category": "Pantry", "available": True},
            {"name": "Olive Oil", "amount": "2 tbsp", "category": "Pantry", "available": True},
            {"name": "Lemon Juice", "amount": "2 tbsp", "category": "Produce", "available": True}
        ],
        "instructions": [
            "Toss cubed eggplant in olive oil, zaatar spice, salt, and roast at 200°C for 20 minutes.",
            "Combine diced cucumber, tomatoes, lemon juice, and parsley for fresh salad.",
            "Whisk tahini with warm water, lemon juice, and garlic into a smooth dressing.",
            "Assemble bowls with warm chickpeas, roasted eggplant, fresh salad, and drizzled tahini sauce."
        ],
        "dietaryTags": ["Vegan", "Dairy-Free", "Gluten-Free", "High-Protein Vegetarian", "Low-Calorie"],
        "allergens": ["Sesame"],
        "nutrition": {"calories": 370, "protein": 15, "carbs": 44, "fat": 17, "fiber": 11, "sugar": 7},
        "vegetarian": True,
        "eggAllowed": False,
        "imageUrl": "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80"
    },
    {
        "id": "rec_12",
        "name": "Egg Fried Rice",
        "description": "Wok-tossed basmati rice with golden scrambled eggs, green peas, carrots, garlic, and savory soy sauce.",
        "cuisine": "Chinese",
        "mealType": "Lunch",
        "prepTime": 10,
        "cookTime": 10,
        "totalTime": 20,
        "servings": 2,
        "calories": 360,
        "difficulty": "Easy",
        "ingredients": [
            {"name": "Eggs", "amount": "3 large", "category": "Eggs", "available": True},
            {"name": "Cooked Rice", "amount": "2 cups cold day-old", "category": "Grains", "available": True},
            {"name": "Carrot", "amount": "0.5 cup diced", "category": "Produce", "available": True},
            {"name": "Green Peas", "amount": "0.5 cup", "category": "Produce", "available": True},
            {"name": "Garlic", "amount": "4 cloves minced", "category": "Produce", "available": True},
            {"name": "Soy Sauce", "amount": "1.5 tbsp", "category": "Pantry", "available": True},
            {"name": "Sesame Oil", "amount": "1 tbsp", "category": "Pantry", "available": True}
        ],
        "instructions": [
            "Scramble eggs in a wok until soft and set aside.",
            "Heat oil on high heat, stir-fry minced garlic, carrots, and green peas for 2 minutes.",
            "Add cold cooked rice, breaking up lumps.",
            "Pour in soy sauce, sesame oil, and cooked scrambled eggs.",
            "Toss everything together on high heat for 2 minutes and serve hot."
        ],
        "dietaryTags": ["Egg-Friendly Vegetarian", "Dairy-Free", "High-Protein Vegetarian"],
        "allergens": ["Eggs", "Soy", "Sesame"],
        "nutrition": {"calories": 360, "protein": 18, "carbs": 46, "fat": 12, "fiber": 4, "sugar": 3},
        "vegetarian": True,
        "eggAllowed": True,
        "imageUrl": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=800&q=80"
    }
]
