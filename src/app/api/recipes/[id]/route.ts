import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const recipe = await prisma.recipe.update({
      where: { id: params.id },
      data: body,
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
    return NextResponse.json({ error: 'Error updating recipe' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await prisma.recipe.delete({
      where: { id: params.id },
    })
    return NextResponse.json({ message: 'Recipe deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting recipe' }, { status: 500 })
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    console.log('API: Fetching recipe:', params.id)
    
    if (!params.id) {
      return NextResponse.json({ error: 'Recipe ID is required' }, { status: 400 })
    }

    const recipe = await prisma.recipe.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
            title: true,
            socialLinks: true,
            bio: true,
          },
        },
      },
    })
    
    console.log('Found recipe:', recipe)

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 })
    }

    return NextResponse.json(recipe)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Error fetching recipe' }, 
      { status: 500 }
    )
  }
} 