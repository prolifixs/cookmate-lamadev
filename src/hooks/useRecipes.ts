'use client'

import { useState, useCallback } from 'react'
import { Recipe } from '@/types/recipe.types'

export const useRecipes = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchRecipes = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/recipes')
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to fetch recipes')
      }
      const data = await response.json()
      console.log('Fetched recipes:', data)
      return data
    } catch (err) {
      console.error('Error fetching recipes:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch recipes')
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchRecipe = useCallback(async (id: string) => {
    console.log('Fetching recipe with ID:', id)
    setIsLoading(true)
    try {
      const response = await fetch(`/api/recipes/${id}`)
      console.log('API Response:', response)
      const data = await response.json()
      console.log('Recipe data:', data)
      if (!response.ok) throw new Error(data.error)
      setRecipe(data)
      return data
    } catch (err) {
      console.error('Fetch error:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch recipe')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const createRecipe = async (recipeData: Omit<Recipe, 'id' | 'author'>) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create recipe')
      return null
    } finally {
      setIsLoading(false)
    }
  }

  const updateRecipe = useCallback(async (id: string, recipeData: Partial<Recipe>) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipeData),
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return data
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update recipe')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteRecipe = useCallback(async (id: string) => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
      })
      const data = await response.json()
      if (!response.ok) throw new Error(data.error)
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete recipe')
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  return {
    recipe,
    setRecipe,
    isLoading,
    error,
    fetchRecipes,
    fetchRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  }
} 