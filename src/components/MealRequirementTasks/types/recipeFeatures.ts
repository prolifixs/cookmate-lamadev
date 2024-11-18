export interface RecipeFeature {
  id: string;
  icon: string;
  label: string;
  value: string;
  type: 'time' | 'servings' | 'difficulty' | 'nutrition';
  recipeId: string;  // Reference to the parent recipe
}

export interface RecipeSummary {
  id: string;
  recipeId: string;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: string;
  updatedAt: string;
  createdAt: string;
}
