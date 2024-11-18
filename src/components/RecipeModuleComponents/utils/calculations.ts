import { CaloriePerUnit } from '../types/recipe.types';
import { parseAmount } from './helpers';

export const calculateCalories = (ingredientId: string, amount: string, calorieData: CaloriePerUnit): number => {
  const calorieInfo = calorieData[ingredientId];
  if (!calorieInfo) return 0;

  const { value, unit } = parseAmount(amount);
  if (unit !== calorieInfo.per) return 0;
  
  return Math.round(value * calorieInfo.calories);
};
