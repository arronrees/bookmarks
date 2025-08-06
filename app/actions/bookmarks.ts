'use server';

import { redirect } from 'next/navigation';
import { getUser } from '../lib/dal';
import { formatZodError } from '../lib/validation';
import { CreateBookmarkSchema } from '../validation/bookmarks';
import { db } from '../db/db';

type FormErrors = {
  bookmark?: string[];
};

type FormState =
  | {
      errors?: FormErrors;
      message?: string;
    }
  | undefined;

export async function createBookmark(prevState: FormState, formData: FormData) {
  let bookmarkData = formData.get('bookmark')?.toString();

  if (bookmarkData) {
    if (bookmarkData.startsWith('http') || bookmarkData.startsWith('https')) {
      bookmarkData = bookmarkData.replace('http', 'https');
    } else {
      bookmarkData = `https://${bookmarkData}`;
    }
  }

  const {
    success,
    error,
    data: validated,
  } = CreateBookmarkSchema.safeParse({
    bookmark: bookmarkData,
  });

  if (!success) {
    return {
      errors: formatZodError<FormErrors>(error),
    };
  }

  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const bookmark = await db.bookmark.create({
    data: {
      url: validated.bookmark,
      title: validated.bookmark.replace('https://', ''),
      userId: user.id,
    },
  });

  if (!bookmark) {
    return {
      errors: {
        bookmark: ['Failed to create bookmark, please try again.'],
      },
    };
  }

  return redirect('/');
}
