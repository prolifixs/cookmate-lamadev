// Base ingredient type
export interface Ingredient {
  id: string;
  item: string;
  amount: string;
  calories: string;
  allergy: boolean;
  availability: string;
  availabilityValue: number;
}

// Recipe type that matches your database schema
export interface Recipe {
  id: string;
  title: string;
  image: string | null;
  prepTime: string;
  cookTime: string;
  totalTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  calories: string;
  craves: number;
  cuisineType: string;
  description: string;
  ingredients: any[];
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: string;
    name: string;
    image: string | null;
    title: string | null;
    bio: string | null;
    socialLinks: Record<string, string> | null;
    email?: string;
    emailVerified?: Date | null;
    createdAt?: Date;
    updatedAt?: Date;
  };
}

// Utility types for recipe functionality
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

export interface AuthorContent {
  id: string;
  name: string;
  title: string | null;
  image: string | null;
  bio: string | null;
  socialLinks?: {
    youtubeUrl?: string;
    instagramUrl?: string;
    tiktokUrl?: string;
  }
} 