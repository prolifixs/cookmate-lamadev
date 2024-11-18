'use client'
import { ErrorBoundary } from '../common/ErrorBoundary';
import { Loading } from '../common/Loading';
import { ServingSelector } from './RecipeSection/ServingSelector';
import { RecipeTable } from './RecipeSection/RecipeTable';
import { AllergyModal } from './RecipeSection/AllergyModal';
import AlternativeSection from './RecipeSection/AlternativeSection';
import { useRecipeContext } from '../../context/RecipeContext';
import { sampleRecipeData } from '../../data/sampleData';

export default function RecipeSection() {
  const {
    ingredients,
    servingSize,
    isLoading,
    error,
    ignoredItems,
    alternativeItems,
    isModalOpen,
    selectedItemIndex,
    handleAmountChange,
    handleServingChange,
    handleAllergyClick,
    handleModalCancel,
    handleModalIgnore,
    handleModalAlternative
  } = useRecipeContext();

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-md">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <section className="bg-white rounded-lg p-4 shadow-sm">
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <h2 className="text-lg">Recipe</h2>
              <span className="text-sm text-gray-500">modify recipe to your taste</span>
            </div>
            
            <ServingSelector
              value={servingSize}
              onChange={handleServingChange}
              options={sampleRecipeData.servingOptions}
            />
          </div>

          <RecipeTable
            ingredients={ingredients}
            ignoredItems={ignoredItems}
            onAmountChange={handleAmountChange}
            onAllergyClick={handleAllergyClick}
          />
        </div>
      </section>
      
      {alternativeItems.length > 0 && (
        <AlternativeSection alternatives={alternativeItems} />
      )}
      
      <AllergyModal
        isOpen={isModalOpen}
        itemName={selectedItemIndex !== null ? ingredients[selectedItemIndex].item : ''}
        onCancel={handleModalCancel}
        onIgnore={handleModalIgnore}
        onAlternative={handleModalAlternative}
      />
    </ErrorBoundary>
  );
}

