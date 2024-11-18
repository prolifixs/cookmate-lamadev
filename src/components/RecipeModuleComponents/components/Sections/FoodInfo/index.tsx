'use client'

import { FoodImageComponent } from './FoodImage';
import { ActionButtonsComponent } from './ActionButtons';
import { useFoodInfo } from '../../../hooks/useFoodInfo';

export default function FoodInfo() {
  const { content } = useFoodInfo();
  const { title, cuisineType, description, imageUrl } = content;

  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <div className="flex gap-4">
        <FoodImageComponent imageUrl={imageUrl} title={title} />

        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold">{title}</h1>
            
            <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
              {cuisineType}
            </span>
          </div>

          <p className="mt-2 text-gray-600 text-base">
            {description}
          </p>

          <ActionButtonsComponent />
        </div>
      </div>
    </section>
  );
} 