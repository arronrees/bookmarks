'use client';
import { deleteBookmark } from '@/app/actions/delete-bookmark';
import React, { useActionState } from 'react';

interface Props {
  bookmarkId: number;
}

export default function DeleteBookmark({ bookmarkId }: Props) {
  const [state, action] = useActionState(deleteBookmark, undefined);

  return (
    <form action={action}>
      <input type='hidden' name='bookmark_id' value={bookmarkId} />
      <button className='w-full text-center bg-stone-100 dark:bg-stone-900 px-2 py-1 text-xs rounded flex items-center justify-center border border-stone-300 dark:border-stone-900 hover:bg-stone-300 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-400'>
        Delete
      </button>
    </form>
  );
}
