import React from 'react';
import { AlternativeItem, Ingredient } from '../../../types/recipe.types';
import { parseAmount, getAvailabilityStatus } from '../../../utils/helpers';

type RecipeTableProps = {
  ingredients: Ingredient[];
  ignoredItems: number[];
  onAmountChange: (index: number, value: string) => void;
  onAllergyClick: (index: number) => void;
  onUpdateAlternatives?: (alternatives: AlternativeItem[]) => void;
};

export const RecipeTable = ({ 
  ingredients, 
  ignoredItems, 
  onAmountChange, 
  onAllergyClick,
  onUpdateAlternatives 
}: RecipeTableProps) => {
  React.useEffect(() => {
    const lowAvailabilityItems = ingredients
      .filter(ing => ing.availabilityValue < 70)
      .map(ing => ({
        originalItem: ing.item,
        amount: ing.amount,
        calories: `${ing.calories}kcal`
      }));
    
    onUpdateAlternatives?.(lowAvailabilityItems);
  }, [ingredients, onUpdateAlternatives]);

  return (
    <div className="mt-4 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amt/Qty</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calorie</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Allergy</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ingredients.map((ingredient, index) => (
            <tr 
              key={index}
              className={`${ignoredItems.includes(index) ? 'opacity-50 bg-gray-100' : ''}`}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ingredient.item}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="number"
                  value={parseAmount(ingredient.amount).value}
                  onChange={(e) => onAmountChange(index, e.target.value)}
                  className="w-20 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <span className="ml-1">{parseAmount(ingredient.amount).unit}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {ingredient.calories}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <input
                  type="checkbox"
                  checked={ingredient.allergy}
                  onChange={() => onAllergyClick(index)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <AvailabilityCell 
                  availabilityValue={ingredient.availabilityValue} 
                  itemName={ingredient.item}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

type AvailabilityCellProps = {
  availabilityValue: number;
  itemName: string;
};

const AvailabilityCell = ({ availabilityValue, itemName }: AvailabilityCellProps) => {
  return (
    <div className="w-full">
      <div className="flex justify-between mb-1">
        <span className="text-xs">
          {getAvailabilityStatus(availabilityValue).label}
        </span>
        <span className="text-xs">
          {availabilityValue}%
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className={`${getAvailabilityStatus(availabilityValue).color} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${availabilityValue}%` }}
        />
      </div>
      {availabilityValue < 70 && (
        <button 
          className="text-xs bg-white hover:bg-gray-50 text-gray-800 px-2 py-0.5 rounded-md border border-gray-300 transition-colors duration-200 text-[10px]"
          onClick={() => {
            console.log(`Added ${itemName} to grocery list`);
          }}
        >
          Add to grocery
        </button>
      )}
    </div>
  );
};
