import { sampleRecipeData, mockSummary } from './sampleData'

export interface Recipe {
  id: string
  title: string
  image: string
  prepTime: string
  cookTime: string
  totalTime: string
  servings: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  calories: string
  craves: number
  ingredients: typeof sampleRecipeData.ingredients
  cuisineType: string
  description: string
  author: {
    id: string
    name: string
    title: string | null
    image: string | null
    bio: string | null
    socialLinks?: {
      youtubeUrl?: string
      instagramUrl?: string
      tiktokUrl?: string
    }
  }
  authorId: string
  createdAt: string
  updatedAt: string
}

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Italian Macaroni Pasta',
    image: '/placeholder.svg',
    prepTime: mockSummary.prepTime,
    cookTime: mockSummary.cookTime,
    totalTime: mockSummary.totalTime,
    servings: mockSummary.servings,
    difficulty: mockSummary.difficulty,
    calories: mockSummary.calories,
    craves: 120,
    ingredients: sampleRecipeData.ingredients,
    cuisineType: 'Italian',
    description: 'Classic Italian pasta dish',
    author: {
      id: '1',
      name: 'Chef John',
      title: 'Chef',
      image: null,
      bio: null,
      socialLinks: {}
    },
    authorId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Scrambled pizza thingy',
    image: '/placeholder.svg',
    prepTime: '20 mins',
    cookTime: '40 mins',
    totalTime: '1 H',
    servings: '3',
    difficulty: 'Easy',
    calories: '380',
    craves: 85,
    ingredients: sampleRecipeData.ingredients,
    cuisineType: 'Italian',
    description: 'A unique pizza-inspired dish',
    author: {
      id: '2',
      name: 'Chef Maria',
      title: 'Chef',
      image: null,
      bio: null,
      socialLinks: {}
    },
    authorId: '2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Sweet Pancakes',
    image: '/placeholder.svg',
    prepTime: '5 mins',
    cookTime: '5 mins',
    totalTime: '10 M',
    servings: '2',
    difficulty: 'Easy',
    calories: '250',
    craves: 200,
    ingredients: sampleRecipeData.ingredients,
    cuisineType: 'American',
    description: 'Fluffy breakfast pancakes',
    author: {
      id: '3',
      name: 'Chef Sarah',
      title: 'Chef',
      image: null,
      bio: null,
      socialLinks: {}
    },
    authorId: '3',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]
