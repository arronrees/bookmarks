'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/lib/dal';
import { formatZodError } from '@/lib/validation';
import { CreateBookmarkSchema } from '@/validation/bookmarks';
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

export async function createBookmark(prevState: FormState, formData: FormData) {
  let bookmarkData = formData.get('bookmark')?.toString();
  let category = formData.get('category');

  if (bookmarkData) {
    if (bookmarkData.startsWith('http') || bookmarkData.startsWith('https')) {
      bookmarkData = bookmarkData.replace('http', 'https');
    } else {
      bookmarkData = `https://${bookmarkData}`;
    }
  }

  if (category) {
    category = category.toString();
  }

  const {
    success,
    error,
    data: validated,
  } = CreateBookmarkSchema.safeParse({
    bookmark: bookmarkData,
    category,
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

  if (category) {
    const foundCategory = await db.category.findUnique({
      where: {
        userId_slug: {
          slug: category,
          userId: user.id,
        },
      },
    });

    if (foundCategory) {
      await db.bookmarkCategories.create({
        data: {
          bookmarkId: bookmark.id,
          categoryId: foundCategory.id,
        },
      });

      return redirect(`/${user.id}/${foundCategory.slug}`);
    }
  }

  return redirect('/');
}
