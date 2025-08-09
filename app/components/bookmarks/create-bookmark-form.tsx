'use client';
import { createBookmark } from '@/app/actions/create-bookmark';
import { Plus } from 'lucide-react';
import React, { useActionState } from 'react';

interface Props {
  categorySlug?: string;
}

export default function CreateBookmarkForm({ categorySlug }: Props) {
  const [state, action] = useActionState(createBookmark, undefined);

  return (
    <form action={action}>
      {categorySlug && (
        <input type='hidden' name='category' value={categorySlug} />
      )}
      <div className=''>
        <div className='relative'>
          <span className='flex items-center justify-center absolute top-1/2 left-3 -translate-y-1/2 pointer-events-none'>
            <Plus className='text-stone-600 size-4' />
          </span>
          <input
            type='text'
            name='bookmark'
            id='bookmark'
            placeholder='Insert a link'
            className='rounded border border-stone-300 p-2 px-9 w-full placeholder:text-stone-400 dark:placeholder:text-stone-500 leading-[1] text-sm placeholder:text-sm text-stone-700 dark:text-stone-300 dark:border-stone-700'
          />
        </div>
        {state?.errors?.bookmark && (
          <ul className='mt-2'>
            {state.errors.bookmark.map((error, index) => (
              <li
                key={index}
                className='text-red-600 dark:text-red-400 text-sm'
              >
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
    </form>
  );
}
