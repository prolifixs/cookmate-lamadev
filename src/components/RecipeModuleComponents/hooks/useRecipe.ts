import { useState, useEffect } from 'react';
import { Ingredient, AlternativeItem } from '../types/recipe.types';
import { sampleRecipeData, sampleCalorieData } from '../data/sampleData';
import { parseAmount } from '../utils/helpers';
import { calculateCalories } from '../utils/calculations';

interface UseRecipeReturn {
  ingredients: Ingredient[];
  servingSize: number;
  isLoading: boolean;
  error: string | null;
  setIngredients: (ingredients: Ingredient[]) => void;
  setServingSize: (size: number) => void;
  handleAmountChange: (index: number, newValue: string) => void;
}

export const useRecipe = (): UseRecipeReturn => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [servingSize, setServingSize] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize ingredients with random availability
  useEffect(() => {
    try {
      const randomizedIngredients = sampleRecipeData.ingredients.map(ing => ({
        ...ing,
        availabilityValue: Math.floor(Math.random() * 100)
      }));
      setIngredients(randomizedIngredients);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to initialize recipe data');
      setIsLoading(false);
    }
  }, []);

  // Update ingredients when serving size changes
  useEffect(() => {
    if (ingredients.length === 0) return;
    
    try {
      setIngredients(prev => prev.map(ingredient => {
        const { value, unit } = parseAmount(ingredient.amount);
        const newValue = value * servingSize;
        const newAmount = `${newValue} ${unit}`;
        const newCalories = calculateCalories(ingredient.item, newAmount, sampleCalorieData);
        
        return {
          ...ingredient,
          amount: newAmount,
          calories: `${newCalories} kcal`
        };
      }));
    } catch (err) {
      setError('Failed to update serving size');
    }
  }, [servingSize]);

  const handleAmountChange = (index: number, newValue: string) => {
    if (!newValue) return;
    
    try {
      setIngredients(prev => prev.map((ingredient, i) => {
        if (i !== index) return ingredient;
        
        const { unit } = parseAmount(ingredient.amount);
        const newAmount = `${newValue} ${unit}`;
        const newCalories = calculateCalories(ingredient.item, newAmount, sampleCalorieData);
        
        return {
          ...ingredient,
          amount: newAmount,
          calories: `${newCalories} kcal`
        };
      }));
    } catch (err) {
      setError('Failed to update amount');
    }
  };

  return {
    ingredients,
    servingSize,
    isLoading,
    error,
    setIngredients,
    setServingSize,
    handleAmountChange
  };
};
