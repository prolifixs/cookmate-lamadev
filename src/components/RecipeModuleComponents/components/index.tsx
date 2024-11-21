'use client'

import { useState } from 'react'
import FoodInfo from './Sections/FoodInfo'
import AuthorSection from './Sections/AuthorSection'
import RecipeSection from './Sections/RecipeSection/index'
import MealFeatures from './Sections/MealFeatures'
import { RecipeProvider } from '../context/RecipeContext';
import { AuthorProvider } from '../context/AuthorContext';
import { sampleAuthorData } from '../data/sampleAuthorData'
import { mockSummary } from '../data/sampleData';
import { Recipe } from '@/components/ProfileComponents/types/recipe.types'

interface RecipeModuleProps {
  recipe: Recipe;  // Make sure Recipe type is imported from your types
}

export default function RecipeModule({ recipe }: RecipeModuleProps) {
  return (
    <RecipeProvider recipe={recipe}>
      <AuthorProvider>
        <div className="flex flex-col gap-6">
          <FoodInfo />
          <AuthorSection authorContent={sampleAuthorData} />
          <RecipeSection />
          <MealFeatures summary={mockSummary} />
        </div>
      </AuthorProvider>
    </RecipeProvider>
  )
}
