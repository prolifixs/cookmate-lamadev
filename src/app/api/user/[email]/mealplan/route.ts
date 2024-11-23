import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"

export async function GET(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      console.log('No session user')
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const currentDate = new Date()
    const currentMonth = currentDate.getMonth() + 1
    const currentYear = currentDate.getFullYear()

    // First, verify the user exists
    const user = await prisma.user.findUnique({
      where: {
        email: params.email
      }
    })

    console.log('Found user:', user)

    if (!user) {
      console.log('User not found for email:', params.email)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Check all meal plans for this user (temporarily remove month/year filter)
    const allMealPlans = await prisma.monthlyMealPlan.findMany({
      where: {
        userId: user.id,
      },
      include: {
        weeks: {
          orderBy: {
            weekNumber: 'asc'
          },
          include: {
            days: {
              orderBy: {
                date: 'asc'
              },
              include: {
                meals: true,
              },
            },
          },
        },
      },
    })

    console.log('All meal plans found:', allMealPlans)
    console.log('Looking for:', { month: currentMonth, year: currentYear })

    // Then look for their specific meal plan
    const mealPlan = await prisma.monthlyMealPlan.findFirst({
      where: {
        userId: user.id,
        month: currentMonth,
        year: currentYear,
      },
      include: {
        weeks: {
          orderBy: {
            weekNumber: 'asc'
          },
          include: {
            days: {
              orderBy: {
                date: 'asc'
              },
              include: {
                meals: true,
              },
            },
          },
        },
      },
    })

    console.log('Search params:', {
      userId: user.id,
      month: currentMonth,
      year: currentYear
    })
    console.log('Found specific meal plan:', mealPlan)

    if (!mealPlan) {
      return NextResponse.json({ 
        message: 'No meal plan found', 
        params: { 
          userId: user.id, 
          month: currentMonth, 
          year: currentYear 
        } 
      })
    }

    return NextResponse.json(mealPlan)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Error fetching meal plan',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { email: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { date, mealTime, meal } = body

    // Update meal plan logic here
    // ...

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Error updating meal plan' }, { status: 500 })
  }
} 