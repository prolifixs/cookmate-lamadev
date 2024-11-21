import { sampleRecipeData, mockSummary } from './sampleData'

export interface Recipe {
  id: string
  title: string
  image: string
  time: {
    prep: string
    cook: string
    total: string
  }
  servings: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  calories: string
  craves: number
  ingredients: typeof sampleRecipeData.ingredients
  cuisineType: string
  description: string
  author: {
    profile: {
      name: string
      title: string
    }
  }
}

export const sampleRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Italian Macaroni Pasta',
    image: '/placeholder.svg',
    time: {
      prep: mockSummary.prepTime,
      cook: mockSummary.cookTime,
      total: mockSummary.totalTime
    },
    servings: mockSummary.servings,
    difficulty: mockSummary.difficulty,
    calories: mockSummary.calories,
    craves: 120,
    ingredients: sampleRecipeData.ingredients,
    cuisineType: 'Italian',
    description: 'Classic Italian pasta dish',
    author: {
      profile: {
        name: 'Chef John',
        title: 'Chef'
      }
    },
  },
  {
    id: '2',
    title: 'Scrambled pizza thingy',
    image: '/placeholder.svg',
    time: {
      prep: '20 mins',
      cook: '40 mins',
      total: '1 H'
    },
    servings: '3',
    difficulty: 'Easy',
    calories: '380',
    craves: 85,
    ingredients: sampleRecipeData.ingredients,
    cuisineType: 'Italian',
    description: 'A unique pizza-inspired dish',
    author: {
      profile: {
        name: 'Chef Maria',
        title: 'Chef'
      }
    },
  },
  {
    id: '3',
    title: 'Sweet Pancakes',
    image: '/placeholder.svg',
    time: {
      prep: '5 mins',
      cook: '5 mins',
      total: '10 M'
    },
    servings: '2',
    difficulty: 'Easy',
    calories: '250',
    craves: 200,
    ingredients: sampleRecipeData.ingredients,
    cuisineType: 'American',
    description: 'Fluffy breakfast pancakes',
    author: {
      profile: {
        name: 'Chef Sarah',
        title: 'Chef'
      }
    },
  }
]
