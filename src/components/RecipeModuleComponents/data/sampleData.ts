import { CaloriePerUnit } from '@/types/recipe.types';

export const sampleRecipeData = {
  servingOptions: [
    { value: 1, label: '1 serving' },
    { value: 2, label: '2 servings' },
    { value: 3, label: '3 servings' },
    { value: 4, label: '4 servings' },
    { value: 5, label: '5 servings' },
    { value: 6, label: '6 servings' },
    { value: 7, label: '7 servings' },
    { value: 8, label: '8 servings' },
    { value: 9, label: '9 servings' }
  ],
  ingredients: [
    {
      id: 'ing_001',
      item: 'Rice',
      amount: '1 cup',
      calories: '200 kcal',
      allergy: false,
      availability: 'Available',
      availabilityValue: 0
    },
    {
      id: 'ing_002',
      item: 'Chicken Breast',
      amount: '300 g',
      calories: '165 kcal',
      allergy: false,
      availability: 'Limited',
      availabilityValue: 65
    },
    {
      id: 'ing_003',
      item: 'Bell Peppers',
      amount: '2 piece',
      calories: '60 kcal',
      allergy: false,
      availability: 'Available',
      availabilityValue: 85
    },
    {
      id: 'ing_004',
      item: 'Shrimp',
      amount: '200 g',
      calories: '85 kcal',
      allergy: false,
      availability: 'Critical',
      availabilityValue: 20
    },
    {
      id: 'ing_005',
      item: 'Peanut Oil',
      amount: '2 tbsp',
      calories: '240 kcal',
      allergy: false,
      availability: 'Available',
      availabilityValue: 90
    }
  ],
  alternativeDetails: {
    'ing_001': { amount: "200g", calories: "150kcal" },
    'ing_002': { amount: "100g", calories: "120kcal" },
  } as Record<string, { amount: string, calories: string }>
};

export const sampleCalorieData: CaloriePerUnit = {
  'ing_001': { per: 'cup', calories: 200 },
  'ing_002': { per: 'g', calories: 165/300 },
  'ing_003': { per: 'piece', calories: 30 },
  'ing_004': { per: 'g', calories: 85/200 },
  'ing_005': { per: 'tbsp', calories: 120 }
};

export const mockSummary = {
  id: '1',
  recipeId: '1',
  prepTime: '30 mins',
  cookTime: '45 mins',
  totalTime: '1 hour 15 mins',
  servings: '4',
  difficulty: 'Medium' as const,
  calories: '450',
  updatedAt: new Date().toISOString(),
  createdAt: new Date().toISOString(),
};
