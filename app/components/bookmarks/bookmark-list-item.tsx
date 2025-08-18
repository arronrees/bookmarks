'use client';
/* eslint-disable @next/next/no-img-element */
import { Bookmark } from '@/generated/prisma';
import { formatDate, getFavicon } from '@/lib/utils';
import { EllipsisVertical } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import DeleteBookmark from './delete-bookmark';

export default function BookmarkListItem({ bookmark }: { bookmark: Bookmark }) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('click', (e) => {
        if (
          !(e.target as HTMLElement).classList.contains('edit__bookmark__btn')
        ) {
          const filterWrapper = (e.target as HTMLElement).closest(
            '.filter__wrapper'
          );

          if (!filterWrapper) {
            setIsEditOpen(false);
          }
        }
      });
      window.addEventListener('keyup', (e) => {
        if (e.key === 'Escape') {
          setIsEditOpen(false);
        }
      });
    }
  }, []);

  return (
    <div key={bookmark.id} className='grid grid-cols-[1fr_4rem] gap-2 relative'>
      <a
        target='_blank'
        href={bookmark.url}
        className='grid grid-cols-[1fr_10rem] justify-between text-xs p-2 rounded transition text-stone-700 hover:bg-stone-50 dark:text-stone-300 dark:hover:bg-stone-900 leading-[1]'
      >
        <div className='w-full flex items-center gap-2'>
          <span className='flex items-center justify-center h-[1lh]'>
            <span className='block size-3 rounded-full bg-stone-300 dark:bg-stone-700'>
              <img src={getFavicon(bookmark.domain ?? '')} alt='' />
            </span>
          </span>
          <p className=''>
            {bookmark.title?.slice(0, 40)}
            {bookmark.title && bookmark.title.length > 40 ? '...' : ''}
          </p>
        </div>
        <p className='text-stone-500'>{formatDate(bookmark.createdAt)}</p>
      </a>
      <button
        type='button'
        className='ml-auto px-2 rounded edit__bookmark__btn'
        onClick={(e) => {
          e.preventDefault();
          setIsEditOpen(!isEditOpen);
        }}
      >
        <EllipsisVertical className='size-3 text-stone-500 pointer-events-none' />
      </button>

      <div
        className={`absolute right-0 top-[115%] min-w-28 z-20 rounded bg-stone-100 dark:bg-stone-800 p-1.5 flex-col gap-1 ${
          isEditOpen ? 'flex' : 'hidden'
        }`}
      >
        <DeleteBookmark bookmarkId={bookmark.id} />
      </div>
    </div>
  );
}
