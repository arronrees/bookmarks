'use server';

import { redirect } from 'next/navigation';
import { getUser } from '@/lib/dal';
import { formatZodError } from '@/lib/validation';
import { CreateCatgorySchema } from '@/validation/bookmarks';
import { db } from '@/db/db';
import slugify from 'slugify';

type FormErrors = {
  category?: string[];
};

type FormState =
  | {
      errors?: FormErrors;
      message?: string;
    }
  | undefined;

export async function createCategory(prevState: FormState, formData: FormData) {
  const {
    success,
    error,
    data: validated,
  } = CreateCatgorySchema.safeParse({
    category: formData.get('category'),
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

  const slug = slugify(validated.category);

  const foundCategory = await db.category.findUnique({
    where: {
      userId_slug: {
        userId: user.id,
        slug,
      },
    },
  });

  if (foundCategory) {
    return {
      errors: { category: ['You have already created this category'] },
    };
  }

  const newCategory = await db.category.create({
    data: {
      title:
        String(validated.category).charAt(0).toUpperCase() +
        String(validated.category).slice(1),
      slug,
      userId: user.id,
    },
  });

  if (!newCategory) {
    return {
      errors: {
        category: ['Failed to create category, please try again'],
      },
    };
  }

  return redirect('/');
}
