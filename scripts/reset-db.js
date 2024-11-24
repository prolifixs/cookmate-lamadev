const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient()

async function cleanDatabase() {
  try {
    console.log('Starting database cleanup...')
    
    await db.$transaction([
      db.meals.deleteMany({}),
      db.day.deleteMany({}),
      db.week.deleteMany({}),
      db.monthlyMealPlan.deleteMany({}),
      db.recipe.deleteMany({}),
      db.session.deleteMany({}),
      db.account.deleteMany({}),
      db.user.deleteMany({})
    ])
    
    await db.$executeRaw`DELETE FROM "VerificationToken";`
    
    console.log('Database reset successfully')
  } catch (error) {
    console.error('Error resetting database:', error)
    throw error
  } finally {
    await db.$disconnect()
  }
}

cleanDatabase()
  .catch(console.error)
  .finally(() => process.exit()) 