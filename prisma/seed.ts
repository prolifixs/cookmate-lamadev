const { PrismaClient } = require('@prisma/client')
const prismaDb = new PrismaClient()

const sampleRecipes = [
  {
    title: 'Classic Spaghetti Carbonara',
    image: '/recipes/carbonara.jpg',
    prepTime: '15 mins',
    cookTime: '20 mins',
    totalTime: '35 mins',
    servings: '4',
    difficulty: 'Medium',
    calories: '650',
    craves: 0,
    cuisineType: 'Italian',
    description: 'A creamy Italian pasta dish with eggs, cheese, pancetta, and black pepper.',
    ingredients: [
      {
        item: "Spaghetti",
        amount: "400g",
        calories: "400",
        allergy: false,
        availability: "common",
        availabilityValue: 5
      }
    ]
  }
]

async function main() {
  try {
    // Remove user creation from seed
    // Just create recipes with a placeholder user if needed for development
    console.log('Seeding completed')
  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  } finally {
    await prismaDb.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
