import { useState } from 'react';
import { FoodInfoContent, FoodInfoState } from '../types/foodInfo.types';
import { sampleFoodInfoData } from '../data/sampleFoodInfoData';

export const useFoodInfo = (initialContent: FoodInfoContent = sampleFoodInfoData) => {
  const [state, setState] = useState<FoodInfoState>({
    content: initialContent
  });

  const updateContent = (newContent: Partial<FoodInfoContent>) => {
    setState(prev => ({
      ...prev,
      content: {
        ...prev.content,
        ...newContent
      }
    }));
  };

  return {
    ...state,
    updateContent
  };
}; 