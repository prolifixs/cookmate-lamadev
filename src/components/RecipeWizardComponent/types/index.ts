// Basic types
type MediaType = 'image' | 'youtube' | 'instagram' | 'tiktok' | 'facebook' | 'upload'

// Interfaces for recipe components
interface StepMedia {
  type: MediaType
  content: string | ImageContent
}

interface Preset {
  id: string;
  type: string;
  name: string;
  time: string;
  notifications: boolean;
  isRunning: boolean;
}

interface Instruction {
  text: string;
  hasPreset: boolean;
}

interface RecipeStep {
  stepNumber: number;
  instruction: Instruction;
  media: StepMedia;
  preset?: {
    time: string;
    type: string;
  };
}

interface Recipe {
  id: string;
  title: string;
  description: string;
  totalSteps: number;
  steps: RecipeStep[];
  createdAt: string;
  updatedAt: string;
}

// Props interfaces
interface RecipeWizardProps {
  recipe: Recipe;
}

// Add this to your existing types
interface ImageContent {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

export type {
  MediaType,
  StepMedia,
  Preset,
  Instruction,
  RecipeStep,
  Recipe,
  RecipeWizardProps
} 