'use client'
import { ErrorBoundary } from '../../common/ErrorBoundary';
import { Loading } from '../../common/Loading';
import { ServingSelector } from './ServingSelector';
import { RecipeTable } from './RecipeTable';
import { AllergyModal } from './AllergyModal';
import AlternativeSection from './AlternativeSection';
import { useRecipeContext } from '../../../context/RecipeContext';
import { sampleRecipeData } from '../../../data/sampleData';
import { useState } from 'react';
import { AlternativeItem } from '@/components/RecipeModuleComponents/types/alternative.types';

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

  const [alternatives, setAlternatives] = useState<AlternativeItem[]>([]);

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
            onUpdateAlternatives={setAlternatives}
          />
        </div>
      </section>
      
      {alternativeItems.length > 0 && (
        <AlternativeSection 
          alternatives={alternativeItems.map(alt => {
            const originalIngredient = ingredients.find(ing => ing.id === alt.originalItem);
            const details = sampleRecipeData.alternativeDetails[alt.originalItem] || {
              amount: originalIngredient?.amount || "0g",
              calories: originalIngredient?.calories || "0kcal"
            };
            return {
              originalItem: alt.originalItem,
              amount: details.amount,
              calories: details.calories
            };
          })} 
        />
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
