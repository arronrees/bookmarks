'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/lib/dal';
import { db } from '@/db/db';

type FormErrors = {
  bookmark?: string[];
};

type FormState =
  | {
      errors?: FormErrors;
      message?: string;
    }
  | undefined;

export async function deleteBookmark(prevState: FormState, formData: FormData) {
  const bookmarkId = formData.get('bookmark_id')?.toString();

  if (!bookmarkId) {
    return {
      errors: {
        bookmark: ['No bookmark provided'],
      },
    };
  }

  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const bookmarkDelete = await db.bookmark.delete({
    where: {
      id: parseInt(bookmarkId),
      userId: user.id,
    },
  });

  if (!bookmarkDelete) {
    return {
      errors: {
        bookmark: ['Failed to delete bookmark, please try again.'],
      },
    };
  }

  return redirect('/');
}
