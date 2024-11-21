'use client'

import dynamic from 'next/dynamic'
import type { 
  Instruction, 
  MediaType, 
  StepMedia, 
  Preset, 
  RecipeStep, 
  Recipe,
  RecipeWizardProps 
} from '../types'

const RecipeWizard = dynamic<RecipeWizardProps>(() => import('./RecipeWizardContent'), {
  ssr: false
});

// Re-export all types
export type { 
  Instruction, 
  MediaType, 
  StepMedia, 
  Preset, 
  RecipeStep, 
  Recipe,
  RecipeWizardProps 
};
export default RecipeWizard;
