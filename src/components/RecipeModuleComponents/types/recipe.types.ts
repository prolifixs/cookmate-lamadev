export type MeasurementType = {
  [key: string]: {
    units: string[];
    baseUnit: string;
  }
};

export type CalorieInfo = {
  per: string;
  calories: number;
};

export type CaloriePerUnit = {
  [key: string]: CalorieInfo;
};

export type RecipeSectionProps = {
  calorieData: CaloriePerUnit;
  recipeData: {
    servingOptions: Array<{ value: number; label: string }>;
    ingredients: Array<{
      item: string;
      amount: string;
      calories: string;
      allergy: boolean;
      availability: string;
    }>;
  };
};

export type AvailabilityLevel = {
  value: number;
  color: string;
  label: string;
};

export interface Ingredient {
  id: string;
  item: string;
  amount: string;
  calories: string;
  allergy: boolean;
  availability: string;
  availabilityValue: number;
}

export interface AlternativeItem {
  originalItem: string;
  amount: string;
  calories: string;
}

export interface AlternativeItemWithDetails extends AlternativeItem {
  originalItem: string;
  amount: string;
  calories: string;
}
