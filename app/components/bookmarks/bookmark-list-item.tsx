/* eslint-disable @next/next/no-img-element */
import { Bookmark } from '@/generated/prisma';
import { formatDate } from '@/lib/utils';
import React from 'react';

export default function BookmarkListItem({ bookmark }: { bookmark: Bookmark }) {
  return (
    <div key={bookmark.id}>
      <a
        target='_blank'
        href={bookmark.url}
        className='flex items-center justify-between text-xs p-2 rounded transition text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-900 leading-[1]'
      >
        <div className='flex items-center gap-2'>
          <span className='flex items-center justify-center h-[1lh]'>
            <span className='block size-3 rounded-full bg-stone-300 dark:bg-stone-700'>
              <img src={`${bookmark.url}/favicon.ico`} alt='' />
            </span>
          </span>
          <p className=''>{bookmark.title}</p>
        </div>
        <p className='text-stone-500'>{formatDate(bookmark.createdAt)}</p>
      </a>
    </div>
  );
}
