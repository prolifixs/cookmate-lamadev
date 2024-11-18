import { useState } from 'react';
import { Ingredient, AlternativeItem } from '../types/recipe.types';

interface UseAllergyReturn {
  isModalOpen: boolean;
  selectedItemIndex: number | null;
  ignoredItems: number[];
  alternativeItems: AlternativeItem[];
  handleAllergyClick: (index: number) => void;
  handleModalCancel: () => void;
  handleModalIgnore: () => void;
  handleModalAlternative: () => void;
}

export const useAllergy = (
  ingredients: Ingredient[],
  setIngredients: (ingredients: Ingredient[]) => void
): UseAllergyReturn => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [ignoredItems, setIgnoredItems] = useState<number[]>([]);
  const [alternativeItems, setAlternativeItems] = useState<AlternativeItem[]>([]);

  const handleAllergyChange = (index: number, checked: boolean) => {
    setIngredients(
      ingredients.map((ingredient, i) => ({
        ...ingredient,
        allergy: i === index ? checked : ingredient.allergy
      }))
    );
    
    if (!checked) {
      setIgnoredItems(prev => prev.filter(i => i !== index));
      setAlternativeItems(prev => prev.filter(item => 
        item.originalItem !== ingredients[index].item
      ));
    }
  };

  const handleAllergyClick = (index: number) => {
    if (!ingredients[index].allergy) {
      setSelectedItemIndex(index);
      setIsModalOpen(true);
    } else {
      handleAllergyChange(index, false);
    }
  };

  const handleModalCancel = () => {
    if (selectedItemIndex !== null) {
      handleAllergyChange(selectedItemIndex, false);
    }
    setIsModalOpen(false);
    setSelectedItemIndex(null);
  };

  const handleModalIgnore = () => {
    if (selectedItemIndex !== null) {
      handleAllergyChange(selectedItemIndex, true);
      setIgnoredItems(prev => [...prev, selectedItemIndex]);
    }
    setIsModalOpen(false);
    setSelectedItemIndex(null);
  };

  const handleModalAlternative = () => {
    if (selectedItemIndex !== null) {
      const item = ingredients[selectedItemIndex];
      setAlternativeItems(prev => [...prev, {
        originalItem: item.item,
        amount: item.amount,
        calories: item.calories
      }]);
      handleAllergyChange(selectedItemIndex, true);
    }
    setIsModalOpen(false);
    setSelectedItemIndex(null);
  };

  return {
    isModalOpen,
    selectedItemIndex,
    ignoredItems,
    alternativeItems,
    handleAllergyClick,
    handleModalCancel,
    handleModalIgnore,
    handleModalAlternative
  };
};