import { MeasurementType } from '../types/recipe.types';

export const MEASUREMENTS: MeasurementType = {
  volume: { units: ['cup', 'cups', 'tbsp', 'tsp', 'ml', 'L', 'fluid oz'], baseUnit: 'ml' },
  weight: { units: ['g', 'kg', 'oz', 'lbs', 'gram', 'grams'], baseUnit: 'g' },
  piece: { units: ['piece', 'pieces', 'pc', 'pcs', 'whole'], baseUnit: 'piece' },
  other: { units: ['pinch', 'dash', 'to taste'], baseUnit: 'unit' }
};
