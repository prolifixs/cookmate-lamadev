'use client'

import React from 'react'
import WizardLayout from '@/components/RecipeWizardComponent/components/WizardLayout'
import RecipeWizardComponent from '@/components/RecipeWizardComponent/components'
import { recipeData } from '@/components/RecipeWizardComponent/data/recipeData'

export default function RecipeWizardPage() {
  return (
    <WizardLayout>
      <RecipeWizardComponent recipe={recipeData[0]} />
    </WizardLayout>
  )
}