import { useState } from 'react';
import { Ingredient, Recipe } from '@/types/recipe.types';

interface UseRecipeReturn {
  ingredients: Ingredient[];
  servingSize: number;
  isLoading: boolean;
  error: string | null;
  setIngredients: (ingredients: Ingredient[]) => void;
  setServingSize: (size: number) => void;
  handleAmountChange: (index: number, newValue: string) => void;
}

export const useRecipe = (initialRecipe: Recipe): UseRecipeReturn => {
  const initialIngredients: Ingredient[] = initialRecipe.ingredients.map((ing, index) => ({
    id: `${index}`,
    item: ing.item,
    amount: ing.amount,
    calories: ing.calories,
    allergy: ing.allergy || false,
    availability: getAvailabilityStatus(ing.availabilityValue),
    availabilityValue: ing.availabilityValue || 0
  }));

  const [ingredients, setIngredients] = useState<Ingredient[]>(initialIngredients);
  const [servingSize, setServingSize] = useState(Number(initialRecipe.servings));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return {
    ingredients,
    servingSize,
    isLoading,
    error,
    setIngredients,
    setServingSize,
    handleAmountChange: (index: number, value: string) => {
      const newIngredients = [...ingredients];
      newIngredients[index] = {
        ...newIngredients[index],
        amount: value
      };
      setIngredients(newIngredients);
    }
  };
};

function getAvailabilityStatus(value: number): string {
  if (value >= 70) return 'High';
  if (value >= 50) return 'Medium';
  if (value >= 30) return 'Low';
  return 'Out of Stock';
}
