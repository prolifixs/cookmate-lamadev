'use client'

import React from 'react'
import MainLayout from '@/components/Layout/MainLayout'
import RecipeModule from '@/components/RecipeModuleComponents/components'

export default function RecipeModulePage() {
  return (
    <MainLayout>
      <RecipeModule />
    </MainLayout>
  )
}