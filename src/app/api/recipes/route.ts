import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            title: true,
            bio: true,
            socialLinks: true,
            email: true,
            emailVerified: true,
            createdAt: true,
            updatedAt: true
          },
        },
      },
    })

    console.log('Fetched recipes:', recipes)

    const transformedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: recipe.ingredients as any[],
      author: {
        ...recipe.author,
        socialLinks: recipe.author.socialLinks || {}
      }
    }))

    console.log('Transformed recipes:', transformedRecipes)

    return NextResponse.json(transformedRecipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return NextResponse.json({ error: 'Error fetching recipes' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    console.log('Session data:', session)
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    console.log('User ID:', session.user.id)

    const body = await request.json()
    console.log('Request body:', body)

    const recipe = await prisma.recipe.create({
      data: {
        ...body,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            name: true,
            image: true,
            title: true,
            socialLinks: true,
            bio: true,
          },
        },
      },
    })
    return NextResponse.json(recipe)
  } catch (error) {
    console.error('Full error details:', error)
    return NextResponse.json({ error: 'Error creating recipe' }, { status: 500 })
  }
} 