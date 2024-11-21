import { Recipe } from '../components/index'

export const cookingPresets = [
  {
    id: "preset_001",
    type: "cook",
    name: "Boiling Timer",
    time: "05:00",
    notifications: true,
    isRunning: false
  },
  {
    id: "preset_002",
    type: "burner",
    name: "High Heat",
    time: "02:00",
    notifications: true,
    isRunning: false
  },
  {
    id: "preset_003",
    type: "blend",
    name: "Quick Blend",
    time: "01:00",
    notifications: true,
    isRunning: false
  },
  {
    id: "preset_004",
    type: "mince",
    name: "Mincing Timer",
    time: "03:00",
    notifications: true,
    isRunning: false
  }
];

export const recipeData: Recipe[] = [
  {
    id: "recipe_spaghetti_001",
    title: "Basic Spaghetti Recipe",
    description: "Learn how to cook perfect spaghetti from scratch",
    totalSteps: 10,
    steps: [
      {
        stepNumber: 1,
        instruction: {
          text: "Step 1: Begin by breaking 1 spaghetti into 2 sections.",
          hasPreset: true
        },
        media: {
          type: "image",
          content: "/placeholder.svg"
        },
        preset: {
          time: "1:00",
          type: "timer"
        }
      },
      {
        stepNumber: 2,
        instruction: {
          text: "Step 2: Put the broken spaghetti in a pot.",
          hasPreset: false
        },
        media: {
          type: "youtube",
          content: "dQw4w9WgXcQ"
        }
      },
      {
        stepNumber: 3,
        instruction: {
          text: "Step 3: Fill the pot with cold water, enough to cover the spaghetti.",
          hasPreset: false
        },
        media: {
          type: "image",
          content: "/placeholder.svg"
        }
      },
      {
        stepNumber: 4,
        instruction: {
          text: "Step 4: Add a pinch of salt to the water.",
          hasPreset: false
        },
        media: {
          type: "image",
          content: "/placeholder.svg"
        }
      },
      {
        stepNumber: 5,
        instruction: {
          text: "Step 5: Place the pot on the stove and turn the heat to high.",
          hasPreset: true
        },
        media: {
          type: "youtube",
          content: "dQw4w9WgXcQ"
        },
        preset: {
          time: "2:00",
          type: "timer"
        }
      },
      {
        stepNumber: 6,
        instruction: {
          text: "Step 6: Wait for the water to come to a boil.",
          hasPreset: true
        },
        media: {
          type: "image",
          content: "/placeholder.svg"
        },
        preset: {
          time: "5:00",
          type: "timer"
        }
      },
      {
        stepNumber: 7,
        instruction: {
          text: "Step 7: Once boiling, reduce heat to medium and let it simmer.",
          hasPreset: false
        },
        media: {
          type: "youtube",
          content: "dQw4w9WgXcQ"
        }
      },
      {
        stepNumber: 8,
        instruction: {
          text: "Step 8: Cook for about 8-10 minutes, stirring occasionally.",
          hasPreset: true
        },
        media: {
          type: "image",
          content: "/placeholder.svg"
        },
        preset: {
          time: "8:00",
          type: "timer"
        }
      },
      {
        stepNumber: 9,
        instruction: {
          text: "Step 9: Test the spaghetti for doneness by tasting a strand.",
          hasPreset: false
        },
        media: {
          type: "youtube",
          content: "dQw4w9WgXcQ"
        }
      },
      {
        stepNumber: 10,
        instruction: {
          text: "Step 10: Once cooked to your liking, drain the spaghetti in a colander.",
          hasPreset: false
        },
        media: {
          type: "image",
          content: "/placeholder.svg"
        }
      }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  // You can add more recipes here
]; 