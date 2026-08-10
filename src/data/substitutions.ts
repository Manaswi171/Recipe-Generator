import { SubstitutionItem } from '../types';

export const INGREDIENT_SUBSTITUTIONS_MAP: Record<string, SubstitutionItem[]> = {
  paneer: [
    {
      original: 'Paneer',
      substitute: 'Firm Tofu',
      compatibility: 95,
      reason: 'Excellent plant-based high-protein substitute with similar firm texture for curries.'
    },
    {
      original: 'Paneer',
      substitute: 'Halloumi / Ricotta',
      compatibility: 88,
      reason: 'Dairy substitute with rich milk flavor and holds shape when heated.'
    }
  ],
  milk: [
    {
      original: 'Milk',
      substitute: 'Oat Milk / Almond Milk',
      compatibility: 92,
      reason: 'Dairy-free, vegan alternative perfect for gravies, smoothies, and baking.'
    },
    {
      original: 'Milk',
      substitute: 'Coconut Milk',
      compatibility: 90,
      reason: 'Provides lush rich body for Asian and South Indian curries.'
    }
  ],
  butter: [
    {
      original: 'Butter',
      substitute: 'Olive Oil / Coconut Oil',
      compatibility: 90,
      reason: 'Healthy plant fat alternative with rich flavor profile.'
    },
    {
      original: 'Butter',
      substitute: 'Vegan Butter',
      compatibility: 98,
      reason: 'Direct 1:1 vegan fat replacement.'
    }
  ],
  egg: [
    {
      original: 'Egg',
      substitute: 'Flaxseed Meal Slurry (1 tbsp flax + 3 tbsp water)',
      compatibility: 85,
      reason: 'Natural vegan binder for baking and pancakes.'
    },
    {
      original: 'Egg',
      substitute: 'Mashed Tofu / Chickpea Flour (Besan)',
      compatibility: 90,
      reason: 'High protein scramble substitute for savory scrambles and fritters.'
    }
  ],
  wheat: [
    {
      original: 'Wheat Flour / Maida',
      substitute: 'Almond Flour / Rice Flour / Oat Flour',
      compatibility: 88,
      reason: 'Gluten-free flour alternative with great binding properties.'
    }
  ],
  onion: [
    {
      original: 'Onion',
      substitute: 'Hing (Asafoetida) + Cabbage / Fennel',
      compatibility: 85,
      reason: 'Jain-friendly savory Umami depth without root vegetables.'
    }
  ],
  garlic: [
    {
      original: 'Garlic',
      substitute: 'A pinch of Hing (Asafoetida)',
      compatibility: 85,
      reason: 'Jain-friendly digestive spice giving intense pungent savory note.'
    }
  ]
};
