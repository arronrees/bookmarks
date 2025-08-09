import 'server-only';
import { db } from '../db/db';
import { Bookmark, Category, Prisma } from '@/generated/prisma';

export const getBookmarks = async (
  userId: number,
  slug?: string
): Promise<Bookmark[]> => {
  const where: Prisma.BookmarkWhereInput = { userId };

  if (slug) {
    where.categories = {
      some: {
        category: {
          slug,
          userId,
        },
      },
    };
  }

  const bookmarks = await db.bookmark.findMany({
    where,
    orderBy: { createdAt: 'asc' },
  });

  return bookmarks;
};

export const getCategories = async (userId: number): Promise<Category[]> => {
  const categories = await db.category.findMany({
    where: {
      userId,
    },
    orderBy: { createdAt: 'asc' },
  });

  return categories;
};
