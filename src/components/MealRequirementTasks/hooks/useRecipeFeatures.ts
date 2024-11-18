import { useMemo } from 'react';
import { RecipeFeature, RecipeSummary } from '../types/recipeFeatures';

export function useRecipeFeatures(summary: RecipeSummary) {
  const features = useMemo((): RecipeFeature[] => [
    {
      id: 'prep-time',
      icon: '⏲️',
      label: 'Prep Time',
      value: summary.prepTime,
      type: 'time',
      recipeId: summary.recipeId
    },
    {
      id: 'cook-time',
      icon: '🍳',
      label: 'Cook Time',
      value: summary.cookTime,
      type: 'time',
      recipeId: summary.recipeId
    },
    {
      id: 'total-time',
      icon: '⏱️',
      label: 'Total Time',
      value: summary.totalTime,
      type: 'time',
      recipeId: summary.recipeId
    },
    {
      id: 'servings',
      icon: '👥',
      label: 'Servings',
      value: summary.servings,
      type: 'servings',
      recipeId: summary.recipeId
    },
    {
      id: 'difficulty',
      icon: '📊',
      label: 'Difficulty',
      value: summary.difficulty,
      type: 'difficulty',
      recipeId: summary.recipeId
    },
    {
      id: 'calories',
      icon: '🔥',
      label: 'Calories',
      value: `${summary.calories} kcal/serving`,
      type: 'nutrition',
      recipeId: summary.recipeId
    }
  ], [summary]);

  return features;
}
