'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import MainLayout from '@/components/Layout/MainLayout'
import RecipeModule from '@/components/RecipeModuleComponents/components'
import { sampleRecipes } from '@/components/RecipeModuleComponents/data/recipeLists' // You'll need to create this

export default function RecipeModulePage() {
  const searchParams = useSearchParams()
  const recipeId = searchParams.get('id')
  const recipe = recipeId ? sampleRecipes.find(r => r.id === recipeId) : null

  if (!recipe) {
    return (
      <MainLayout>
        <div>Recipe not found</div>
      </MainLayout>
    )
  }

  return (
    <MainLayout>
      <RecipeModule recipe={recipe} />
    </MainLayout>
  )
}