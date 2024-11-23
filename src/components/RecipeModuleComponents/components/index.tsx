'use client'

import { useEffect, useState } from 'react'
import FoodInfo from './Sections/FoodInfo'
import AuthorSection from './Sections/AuthorSection'
import RecipeSection from './Sections/RecipeSection/index'
import MealFeatures from './Sections/MealFeatures'
import { RecipeProvider } from '../context/RecipeContext'
import { AuthorProvider } from '../context/AuthorContext'
import { useRecipes } from '@/hooks/useRecipes'
import { useAuth } from '@/hooks/useAuth'
import { Author } from '../types/author.types'
import { RecipeSummary } from '@/components/MealRequirementTasks/types/recipeFeatures'
import Image from 'next/image'
import { Recipe } from '@/types/recipe.types'

interface RecipeModuleProps {
  recipe?: Recipe;
}

export default function RecipeModule({ recipe: initialRecipe }: RecipeModuleProps) {
  const { 
    recipe, 
    setRecipe, 
    isLoading, 
    error, 
    fetchRecipe, 
    updateRecipe, 
    deleteRecipe 
  } = useRecipes()

  const { user } = useAuth()
  const currentRecipe = initialRecipe || recipe

  const handleUpdate = async (updatedData: Partial<Recipe>) => {
    if (!currentRecipe) return
    const updated = await updateRecipe(currentRecipe.id, updatedData)
    if (updated) {
      setRecipe(updated)
    }
  }

  const handleDelete = async () => {
    if (!currentRecipe) return
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      const success = await deleteRecipe(currentRecipe.id)
      if (success) {
        window.location.href = '/recipes'
      }
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!currentRecipe) return <div>Recipe not found</div>

  const isAuthor = user?.id === (currentRecipe.author as Author).id

  const summary: RecipeSummary = {
    id: currentRecipe.id,
    recipeId: currentRecipe.id,
    prepTime: currentRecipe.prepTime,
    cookTime: currentRecipe.cookTime,
    totalTime: currentRecipe.totalTime,
    servings: currentRecipe.servings,
    difficulty: currentRecipe.difficulty,
    calories: currentRecipe.calories,
    updatedAt: currentRecipe.updatedAt.toISOString(),
    createdAt: currentRecipe.createdAt.toISOString()
  };

  return (
    <RecipeProvider recipe={currentRecipe}>
      <AuthorProvider>
        <div className="flex flex-col gap-6">
          {isAuthor && (
            <div className="flex justify-end gap-2">
              <a
                href={`/recipes/${currentRecipe.id}/edit`}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </a>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          )}

          <FoodInfo />
          <AuthorSection 
            authorContent={{
              profile: {
                name: currentRecipe.author.name,
                title: currentRecipe.author.title ?? '',
                avatar: currentRecipe.author.image ?? undefined,
                bio: currentRecipe.author.bio ?? undefined
              },
              ...(currentRecipe.author.socialLinks ?? {})
            }} 
          />
          <RecipeSection />
          <MealFeatures summary={summary} />
        </div>
      </AuthorProvider>
    </RecipeProvider>
  )
}

// Helper function for availability color
function getAvailabilityColor(value: number): string {
  if (value >= 70) return 'bg-green-500'
  if (value >= 50) return 'bg-yellow-500'
  if (value >= 30) return 'bg-orange-500'
  return 'bg-red-500'
}

