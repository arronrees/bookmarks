import 'server-only';
import { db } from '../db/db';

export const getBookmarks = async (userId: number) => {
  const bookmarks = await db.bookmark.findMany({ where: { userId } });

  return bookmarks;
};
