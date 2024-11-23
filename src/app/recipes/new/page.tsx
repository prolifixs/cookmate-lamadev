import MainLayout from '@/components/Layout/MainLayout'
import CreateRecipe from '@/components/RecipeModuleComponents/components/Sections/CreateRecipe'

export default function NewRecipePage() {
  return (
    <MainLayout>
      <div className="container mx-auto p-4">
        <h1>Create New Recipe</h1>
        <CreateRecipe />
      </div>
    </MainLayout>
  )
}