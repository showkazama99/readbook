import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      include: {
        comments: true,
      },
    });
    return NextResponse.json(books);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const book = await prisma.book.create({
      data: {
        title: body.title,
        author: body.author,
        janCode: body.janCode,
        thumbnail: body.thumbnail,
        totalPages: body.totalPages,
        currentPage: body.currentPage || 0,
      },
    });
    return NextResponse.json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json({ error: 'Failed to create book' }, { status: 500 });
  }
} 