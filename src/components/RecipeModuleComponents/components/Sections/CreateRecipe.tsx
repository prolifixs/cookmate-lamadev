'use client'

import { useRecipes } from '@/hooks/useRecipes'
import { useState } from 'react'

export default function CreateRecipe() {
  const { createRecipe, isLoading, error } = useRecipes()
  const [title, setTitle] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const recipeData = {
      id: '',
      title,
      image: 'placeholder.jpg',
      prepTime: '30 mins',
      cookTime: '1 hour',
      totalTime: '1.5 hours',
      servings: '4',
      difficulty: 'Medium' as const,
      calories: '400',
      craves: 0,
      cuisineType: 'Italian',
      description: 'A delicious recipe',
      ingredients: [],
      author: {
        id: '',
        name: '',
        title: null,
        image: null,
        bio: null,
        socialLinks: {}
      },
      authorId: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    const result = await createRecipe(recipeData)
    if (result) {
      setTitle('')
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
        {isLoading ? 'Creating...' : 'Create Recipe'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  )
} 