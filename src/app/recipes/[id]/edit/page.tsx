import { Recipe } from '@/types/recipe.types'
import EditRecipe from '@/components/RecipeModuleComponents/components/Sections/EditRecipe'
import MainLayout from '@/components/Layout/MainLayout'

interface EditRecipePageProps {
  params: {
    id: string
  }
}

async function getRecipe(id: string): Promise<Recipe> {
  const response = await fetch(`/api/recipes/${id}`)
  return response.json()
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const recipe = await getRecipe(params.id)
  
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1>Edit Recipe</h1>
        <EditRecipe recipeId={params.id} initialData={recipe} />
      </div>
    </MainLayout>
  )
} 