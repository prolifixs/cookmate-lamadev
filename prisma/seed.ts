const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

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
      },
      {
        item: "Eggs",
        amount: "4 large",
        calories: "320",
        allergy: true,
        availability: "common",
        availabilityValue: 5
      },
      {
        item: "Pecorino Romano",
        amount: "100g",
        calories: "387",
        allergy: true,
        availability: "common",
        availabilityValue: 4
      },
      {
        item: "Pancetta",
        amount: "150g",
        calories: "450",
        allergy: false,
        availability: "common",
        availabilityValue: 4
      },
      {
        item: "Black Pepper",
        amount: "2 tsp",
        calories: "10",
        allergy: false,
        availability: "common",
        availabilityValue: 5
      }
    ]
  }
];

async function main() {
  try {
    // Create or find user
    const userEmail = 'paul.ochejohn2019@gmail.com'
    let user = await prisma.user.findUnique({
      where: {
        email: userEmail
      }
    })

    if (!user) {
      console.log('User not found, creating new user')
      user = await prisma.user.create({
        data: {
          email: userEmail,
          name: 'Paul Oche',
          emailVerified: new Date(),
        }
      })
      console.log('Created new user:', user.id)
    }

    console.log('Creating recipes for user:', user.id)

    // Create recipes
    for (const recipeData of sampleRecipes) {
      const recipe = await prisma.recipe.create({
        data: {
          ...recipeData,
          authorId: user.id,
        }
      })
      console.log('Created recipe:', recipe.title)
    }

    // Create meal plan
    console.log('Creating meal plan for user:', user.id)

    // Simply delete all meal plans for this user
    await prisma.monthlyMealPlan.deleteMany({
      where: {
        userId: user.id
      }
    })

    // Generate new meal plan
    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    const mealPlan = await prisma.monthlyMealPlan.create({
      data: {
        month: currentMonth,
        year: currentYear,
        userId: user.id,
        weeks: {
          create: Array.from({ length: 4 }, (_, weekIndex) => ({
            weekNumber: weekIndex + 1,
            days: {
              create: Array.from({ length: 7 }, (_, dayIndex) => {
                const date = new Date(currentYear, currentMonth - 1, (weekIndex * 7) + dayIndex + 1)
                return {
                  date: date,
                  dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex],
                  meals: {
                    create: {
                      morning: 'Oatmeal with Berries',
                      afternoon: 'Chicken Caesar Salad',
                      evening: 'Grilled Salmon'
                    }
                  }
                }
              })
            }
          }))
        }
      }
    })

    console.log('Created meal plan:', mealPlan)

  } catch (error) {
    console.error('Error during seeding:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
