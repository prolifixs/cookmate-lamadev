import { AvailabilityLevel } from '../types/recipe.types';

export function parseAmount(amountStr: string): { value: number; unit: string } {
  const match = amountStr.match(/^(\d+(?:\.\d+)?)\s*(.+)$/);
  if (!match) return { value: 0, unit: '' };
  return { value: parseFloat(match[1]), unit: match[2] };
}

export const getAvailabilityStatus = (value: number): AvailabilityLevel => {
  if (value >= 70) return { value, color: 'bg-green-500', label: 'Available' };
  if (value >= 50) return { value, color: 'bg-yellow-500', label: 'Limited' };
  if (value >= 30) return { value, color: 'bg-orange-500', label: 'Low' };
  return { value, color: 'bg-red-500', label: 'Critical' };
};
