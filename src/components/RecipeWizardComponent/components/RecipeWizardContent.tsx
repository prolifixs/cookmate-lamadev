'use client'

import React, { useState, useMemo } from 'react'
import { Box, Stack, Button, LinearProgress } from '@mui/material'
import Image from 'next/image'
import RecipeWizardLeftMenu from './RecipeWizardLeftMenu'
import type { 
  Instruction, 
  MediaType, 
  StepMedia, 
  Preset,
  RecipeWizardProps 
} from '../types'

const RecipeWizardContent: React.FC<RecipeWizardProps> = ({ recipe }) => {
    const [currentStep, setCurrentStep] = useState(0)
    const [presets, setPresets] = useState<Preset[]>([])

    const instructions = useMemo<Instruction[]>(() => 
      recipe.steps.map(step => step.instruction)
    , [recipe]);

    const stepMedia = useMemo<StepMedia[]>(() => 
      recipe.steps.map(step => step.media)
    , [recipe]);

    const handlePrev = () => {
      setCurrentStep((prev) => (prev > 0 ? prev - 1 : prev))
    }

    const handleNext = () => {
      setCurrentStep((prev) => (prev < instructions.length - 1 ? prev + 1 : prev))
    }

    const handleAddPreset = () => {
      const newPreset: Preset = {
        id: Math.random().toString(36).substring(7),
        type: 'timer',
        name: `Step ${currentStep + 1} Timer`,
        time: `${Math.floor(Math.random() * 30) + 1}:00`,
        notifications: true,
        isRunning: false
      }
      setPresets(prev => [...prev, newPreset])
    }

    const shouldShowPreset = useMemo(() => {
        return instructions[currentStep]?.hasPreset ?? false;
    }, [instructions, currentStep]);

    const renderMedia = (media: StepMedia) => {
      switch (media.type) {
        case 'image':
          const imageContent = typeof media.content === 'string' 
            ? { url: media.content, alt: `Step ${currentStep + 1} illustration` }
            : media.content;
            
          return (
            <Image
              src={imageContent.url || "/placeholder.svg"}
              alt={imageContent.alt || `Step ${currentStep + 1} illustration`}
              width={imageContent.width || 600}
              height={imageContent.height || 400}
              style={{ borderRadius: '8px' }}
            />
          )
        case 'youtube':
          return (
            <Box sx={{ aspectRatio: '16/9' }}>
              <iframe
                width="600"
                height="400"
                src={`https://www.youtube.com/embed/${media.content}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '8px' }}
              />
            </Box>
          )
        default:
          return (
            <Box
              sx={{
                height: '400px',
                bgcolor: 'grey.200',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              Placeholder for {media.type} content: {typeof media.content === 'string' ? media.content : JSON.stringify(media.content)}
            </Box>
          )
      }
    }

    const isPresetExistsForCurrentStep = useMemo(() => {
      return presets.some(preset => preset.name === `Step ${currentStep + 1} Timer`);
    }, [presets, currentStep]);

    return (
      <Stack direction="row" spacing={2} sx={{ p: 2, height: '100vh' }}>
        <RecipeWizardLeftMenu presets={presets} onPresetsChange={setPresets} />
        
        <Box sx={{ flex: 1 }}>
          <Stack spacing={2}>
            <LinearProgress 
              variant="determinate" 
              value={(currentStep / (instructions.length - 1)) * 100} 
            />

            <Box sx={{ typography: 'body1', color: 'text.secondary' }}>
              Step {currentStep + 1} of {instructions.length}
            </Box>
            <Box sx={{ typography: 'h6', mb: 2 }}>
              {instructions[currentStep].text}
            </Box>

            <Stack direction="row" spacing={2} sx={{ height: '40px' }}>
              <Button 
                variant="outlined" 
                onClick={handlePrev}
                disabled={currentStep === 0}
                sx={{ width: '100px' }}
                size="small"
              >
                Previous
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleNext}
                disabled={currentStep === instructions.length - 1}
                sx={{ width: '100px' }}
                size="small"
              >
                Next
              </Button>
              {shouldShowPreset && !isPresetExistsForCurrentStep && (
                <Button
                  variant="contained"
                  onClick={handleAddPreset}
                  sx={{ ml: 'auto' }}
                  size="small"
                >
                  Use Preset
                </Button>
              )}
            </Stack>

            <Box sx={{ width: '100%', height: '400px', bgcolor: 'black', borderRadius: 2, overflow: 'hidden' }}>
              {renderMedia(stepMedia[currentStep])}
            </Box>

            <Box sx={{ typography: 'body2', textAlign: 'center', height: '20px', color: 'text.secondary' }}>
              {currentStep === instructions.length - 1 ? (
                <Stack direction="row" spacing={2} justifyContent="center">
                  <Button variant="contained" color="primary" size="small">
                    Share Recipe
                  </Button>
                  <Button variant="outlined" size="small">
                    Return Home
                  </Button>
                </Stack>
              ) : (
                stepMedia[currentStep].type === 'image' ? 'Image illustration' :
                stepMedia[currentStep].type === 'youtube' ? 'YouTube video demonstration' :
                stepMedia[currentStep].type === 'instagram' ? 'Instagram post reference' :
                stepMedia[currentStep].type === 'tiktok' ? 'TikTok video guide' :
                stepMedia[currentStep].type === 'facebook' ? 'Facebook post tutorial' :
                'Uploaded file demonstration'
              )}
            </Box>

            {currentStep !== instructions.length - 1 && (
              <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ height: '40px' }}>
                <Button variant="outlined" sx={{ width: '100px' }}>
                  Modify
                </Button>
                <Button variant="contained" color="error" sx={{ width: '100px' }}>
                  Abort
                </Button>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    )
}

export default RecipeWizardContent 