import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const params = await context.params;
    const book = await prisma.book.findUnique({
      where: { id: Number(params.id) },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!book) {
      return NextResponse.json(
        { error: 'Book not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    return NextResponse.json(
      { error: 'Failed to fetch book' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const params = await context.params;
    const { currentPage } = await request.json();
    const bookId = parseInt(params.id);

    // 本の情報を更新し、コメントを含めて取得
    const updatedBook = await prisma.book.update({
      where: { id: bookId },
      data: {
        currentPage,
      },
      include: {
        comments: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    // 進捗記録を作成
    await prisma.readingProgress.create({
      data: {
        bookId,
        currentPage,
      },
    });

    return NextResponse.json(updatedBook);
  } catch (error) {
    console.error('Error updating book:', error);
    return NextResponse.json(
      { error: 'Failed to update book' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    const params = await context.params;
    const bookId = parseInt(params.id);
    await prisma.book.delete({
      where: { id: bookId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting book:', error);
    return NextResponse.json(
      { error: 'Failed to delete book' },
      { status: 500 }
    );
  }
} 