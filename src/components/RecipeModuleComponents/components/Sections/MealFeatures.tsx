'use client'

import { MealRequirementTasks } from '@/components/MealRequirementTasks';
import { useRecipeFeatures } from '@/components/MealRequirementTasks/hooks';
import { RecipeSummary } from '@/components/MealRequirementTasks/types/recipeFeatures';
import { RecipeFeature } from '@/components/MealRequirementTasks/types/recipeFeatures';

interface MealFeaturesProps {
  summary: RecipeSummary;
}

export default function MealFeatures({ summary }: MealFeaturesProps) {
  const features = useRecipeFeatures(summary);

  return (
    <section className="bg-white rounded-lg p-6 shadow-sm">
      {/* Main Task Management Section */}
      <MealRequirementTasks />

      {/* Features Grid */}
      <div className="border-t pt-8">
        <h3 className="text-lg font-semibold mb-4">Recipe Features</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature: RecipeFeature) => (
            <div 
              key={feature.id} 
              className="flex items-center p-3 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="text-2xl mr-3" role="img" aria-label={feature.label}>
                {feature.icon}
              </span>
              <div>
                <p className="text-sm text-gray-500">{feature.label}</p>
                <p className="font-semibold">{feature.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
