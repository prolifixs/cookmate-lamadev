import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { Prisma } from '@prisma/client'

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

    const transformedRecipes = recipes.map(recipe => ({
      ...recipe,
      ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
      author: {
        ...recipe.author,
        socialLinks: recipe.author?.socialLinks || {}
      }
    }))

    return NextResponse.json(transformedRecipes)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { error: `Database error: ${error.code}` }, 
        { status: 500 }
      )
    }
    return NextResponse.json(
      { error: 'Error fetching recipes' }, 
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const recipe = await prisma.recipe.create({
      data: {
        ...body,
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
    console.error('Error creating recipe:', error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        case 'P2002':
          return NextResponse.json(
            { error: 'A recipe with this name already exists' },
            { status: 409 }
          )
        case 'P2003':
          return NextResponse.json(
            { error: 'Invalid author reference' },
            { status: 400 }
          )
        default:
          return NextResponse.json(
            { error: `Database error: ${error.code}` },
            { status: 500 }
          )
      }
    }
    return NextResponse.json(
      { error: 'Error creating recipe' },
      { status: 500 }
    )
  }
} 