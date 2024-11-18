'use client'

import { createContext, useContext } from 'react';
import { useFoodInfo } from '../hooks/useFoodInfo';
import { FoodInfoContent } from '../types/foodInfo.types';

const FoodInfoContext = createContext<ReturnType<typeof useFoodInfo> | null>(null);

export function FoodInfoProvider({ children, initialContent }: { 
  children: React.ReactNode;
  initialContent?: FoodInfoContent;
}) {
  const foodInfoState = useFoodInfo(initialContent);

  return (
    <FoodInfoContext.Provider value={foodInfoState}>
      {children}
    </FoodInfoContext.Provider>
  );
}

export const useFoodInfoContext = () => {
  const context = useContext(FoodInfoContext);
  if (!context) {
    throw new Error('useFoodInfoContext must be used within a FoodInfoProvider');
  }
  return context;
}; 