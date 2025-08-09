import BookmarkListItem from '@/app/components/bookmarks/bookmark-list-item';
import Categories from '@/app/components/bookmarks/categories';
import CreateBookmarkForm from '@/app/components/bookmarks/create-bookmark-form';
import Header from '@/app/components/layout/header';
import { getBookmarks, getCategories } from '@/lib/bookmarks';
import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  params: Promise<{ userId: string; slug: string }>;
}

export default async function CategoryPage({ params }: Props) {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const { userId, slug } = await params;

  if (parseInt(userId) !== user.id) {
    return redirect('/');
  }

  const bookmarks = await getBookmarks(user.id, slug);
  const categories = await getCategories(user.id);

  return (
    <div>
      <Header />
      <div>
        <CreateBookmarkForm />
        <div className='mt-4'>
          <div className='flex'>
            {user && (
              <Categories
                categories={categories}
                userId={user.id}
                currentCategorySlug={slug}
              />
            )}
          </div>
        </div>
        <div className='mt-4'>
          <div className='border-b border-stone-100 dark:border-stone-800 flex items-end justify-between text-xs px-2 pb-2 text-stone-500'>
            <p>Title</p>
            <p>Created at</p>
          </div>
          <div className='mt-2 flex flex-col gap-2'>
            {bookmarks.map((bookmark) => (
              <BookmarkListItem key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
