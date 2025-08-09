import BookmarkListItem from '@/app/components/bookmarks/bookmark-list-item';
import BookmarkTable from '@/app/components/bookmarks/bookmark-table';
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
          <BookmarkTable userId={user.id} slug={slug} />
        </div>
      </div>
    </div>
  );
}
