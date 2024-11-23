const { PrismaClient } = require('@prisma/client')
const prismaDb = new PrismaClient()

async function main() {
  // Delete all data in the correct order to respect foreign key constraints
  await prismaDb.$transaction([
    prismaDb.meals.deleteMany({}),
    prismaDb.day.deleteMany({}),
    prismaDb.week.deleteMany({}),
    prismaDb.monthlyMealPlan.deleteMany({}),
    prismaDb.recipe.deleteMany({}),
    prismaDb.verificationToken.deleteMany({}),
    prismaDb.session.deleteMany({}),
    prismaDb.account.deleteMany({}),
    prismaDb.user.deleteMany({})
  ])
  
  console.log('Database reset successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prismaDb.$disconnect()
  }) 