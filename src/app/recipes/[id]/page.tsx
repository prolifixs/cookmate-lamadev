import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import MainLayout from '@/components/Layout/MainLayout'
import RecipeModule from '@/components/RecipeModuleComponents/components'
import { Recipe as CustomRecipe } from '@/types/recipe.types'

export default async function RecipePage({ params }: { params: { id: string } }) {
  try {
    console.log('Fetching recipe with ID:', params.id)

    const recipe = await prisma.recipe.findUnique({
      where: { 
        id: params.id 
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            title: true,
            image: true,
            bio: true,
            socialLinks: true,
            email: true,
            emailVerified: true,
            createdAt: true,
            updatedAt: true
          }
        }
      }
    })

    console.log('Raw recipe data:', recipe)
    console.log('Raw ingredients:', recipe?.ingredients)

    if (!recipe) {
      console.log('Recipe not found, redirecting to recipes page')
      redirect('/recipes')
    }

    // Parse ingredients if it's a string, otherwise use as is
    let parsedIngredients = recipe.ingredients;
    if (typeof recipe.ingredients === 'string') {
      try {
        parsedIngredients = JSON.parse(recipe.ingredients);
      } catch (e) {
        console.error('Error parsing ingredients:', e);
        parsedIngredients = [];
      }
    }

    console.log('Parsed ingredients:', parsedIngredients);

    const transformedRecipe: CustomRecipe = {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image || '',
      prepTime: recipe.prepTime,
      cookTime: recipe.cookTime,
      totalTime: recipe.totalTime,
      servings: recipe.servings,
      difficulty: recipe.difficulty as 'Easy' | 'Medium' | 'Hard',
      calories: recipe.calories,
      craves: recipe.craves,
      cuisineType: recipe.cuisineType,
      description: recipe.description,
      ingredients: Array.isArray(parsedIngredients) ? parsedIngredients : [],
      author: {
        id: recipe.author.id,
        name: recipe.author.name || '',
        image: recipe.author.image || '',
        title: recipe.author.title || '',
        bio: recipe.author.bio || '',
        socialLinks: recipe.author.socialLinks as Record<string, string> || {},
        email: recipe.author.email || '',
        emailVerified: recipe.author.emailVerified,
        createdAt: recipe.author.createdAt,
        updatedAt: recipe.author.updatedAt
      },
      authorId: recipe.authorId,
      createdAt: recipe.createdAt,
      updatedAt: recipe.updatedAt
    }

    console.log('Transformed recipe ingredients:', transformedRecipe.ingredients)

    return (
      <MainLayout>
        <RecipeModule recipe={transformedRecipe} />
      </MainLayout>
    )
  } catch (error) {
    console.error('Error fetching recipe:', error)
    console.error('Error details:', {
      id: params.id,
      error: error instanceof Error ? error.message : 'Unknown error'
    })
    redirect('/recipes')
  }
} 