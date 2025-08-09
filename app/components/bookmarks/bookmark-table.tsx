'use server';
import React from 'react';
import BookmarkListItem from './bookmark-list-item';
import { getBookmarks } from '@/lib/bookmarks';

interface Props {
  userId: number;
  slug?: string;
}

export default async function BookmarkTable({ userId, slug }: Props) {
  const bookmarks = await getBookmarks(userId, slug);

  return (
    <div className='mt-4'>
      <div className='border-b border-stone-100 dark:border-stone-800 grid grid-cols-[auto_1fr_4rem] gap-2 text-xs px-2 pb-2 text-stone-500'>
        <p>Title</p>
        <p className='ml-auto'>Created at</p>
        <p className='ml-auto'>Actions</p>
      </div>
      <div className='mt-2 flex flex-col gap-2'>
        {bookmarks.map((bookmark) => (
          <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
        ))}
      </div>
    </div>
  );
}
