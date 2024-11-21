import { createContext, useContext, ReactNode } from 'react';
import { useRecipe } from '../hooks/useRecipe';
import { useAllergy } from '../hooks/useAllergy';
import { Ingredient, AlternativeItem } from '../types/recipe.types';
import { Recipe } from '@/components/ProfileComponents/types/recipe.types';

interface RecipeContextValue {
  ingredients: Ingredient[];
  servingSize: number;
  isLoading: boolean;
  error: string | null;
  ignoredItems: number[];
  alternativeItems: AlternativeItem[];
  handleAmountChange: (index: number, newValue: string) => void;
  handleServingChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleAllergyClick: (index: number) => void;
  handleModalCancel: () => void;
  handleModalIgnore: () => void;
  handleModalAlternative: () => void;
  isModalOpen: boolean;
  selectedItemIndex: number | null;
}

const RecipeContext = createContext<RecipeContextValue | undefined>(undefined);

interface RecipeProviderProps {
  children: ReactNode;
  recipe: Recipe;
}

export const RecipeProvider = ({ children, recipe }: RecipeProviderProps) => {
  const {
    ingredients,
    servingSize,
    isLoading,
    error,
    setIngredients,
    setServingSize,
    handleAmountChange
  } = useRecipe();

  const allergyHandlers = useAllergy(ingredients, setIngredients);

  const handleServingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setServingSize(Number(event.target.value));
  };

  const value: RecipeContextValue = {
    ingredients,
    servingSize,
    isLoading,
    error,
    ignoredItems: allergyHandlers.ignoredItems,
    alternativeItems: allergyHandlers.alternativeItems,
    handleAmountChange,
    handleServingChange,
    handleAllergyClick: allergyHandlers.handleAllergyClick,
    handleModalCancel: allergyHandlers.handleModalCancel,
    handleModalIgnore: allergyHandlers.handleModalIgnore,
    handleModalAlternative: allergyHandlers.handleModalAlternative,
    isModalOpen: allergyHandlers.isModalOpen,
    selectedItemIndex: allergyHandlers.selectedItemIndex
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
}; 