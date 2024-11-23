'use client'

import { useRecipes } from '@/hooks/useRecipes'
import { useState, useEffect } from 'react'
import { Recipe } from '@/types/recipe.types'

interface EditRecipeProps {
  recipeId: string
  initialData: Recipe
}

export default function EditRecipe({ recipeId, initialData }: EditRecipeProps) {
  const { updateRecipe, isLoading, error } = useRecipes()
  const [title, setTitle] = useState(initialData.title)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const recipeData = {
      title,
      image: initialData.image,
      prepTime: initialData.prepTime,
      cookTime: initialData.cookTime,
      totalTime: initialData.totalTime,
      servings: initialData.servings,
      difficulty: initialData.difficulty,
      calories: initialData.calories,
      craves: initialData.craves,
      cuisineType: initialData.cuisineType,
      description: initialData.description,
      ingredients: initialData.ingredients,
      author: initialData.author,
      authorId: initialData.authorId,
      updatedAt: new Date().toISOString()
    }

    const result = await updateRecipe(recipeId, recipeData)
    if (result) {
      // Handle successful update
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Recipe Title"
      />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Changes'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
} 