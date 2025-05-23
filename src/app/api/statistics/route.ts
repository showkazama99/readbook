import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'week';

    const now = new Date();
    let startDate: Date;

    switch (range) {
      case 'week':
        startDate = new Date(now.setDate(now.getDate() - 7));
        break;
      case 'month':
        startDate = new Date(now.setMonth(now.getMonth() - 1));
        break;
      case 'year':
        startDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      default:
        startDate = new Date(now.setDate(now.getDate() - 7));
    }

    const readingProgress = await prisma.readingProgress.findMany({
      where: {
        updatedAt: {
          gte: startDate,
        },
      },
      select: {
        bookId: true,
        currentPage: true,
        updatedAt: true,
        book: {
          select: {
            title: true
          }
        }
      } as const,
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const stats = readingProgress.map((progress: { bookId: number; currentPage: number; updatedAt: Date; book: { title: string } }) => ({
      bookId: progress.bookId,
      title: progress.book.title,
      pagesRead: progress.currentPage,
      date: progress.updatedAt.toISOString(),
    }));

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
} 