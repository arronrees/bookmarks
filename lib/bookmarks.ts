import 'server-only';
import { db } from '../db/db';
import { Bookmark, Category } from '@/generated/prisma';

export const getBookmarks = async (userId: number): Promise<Bookmark[]> => {
  const bookmarks = await db.bookmark.findMany({
    where: { userId },
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
