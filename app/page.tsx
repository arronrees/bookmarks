import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';
import CreateBookmarkForm from './components/bookmarks/create-bookmark-form';
import { getCategories } from '@/lib/bookmarks';
import Header from './components/layout/header';
import Categories from './components/bookmarks/categories';
import BookmarkTable from './components/bookmarks/bookmark-table';

export default async function Home() {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const categories = await getCategories(user.id);

  return (
    <div>
      <Header />
      <div>
        <CreateBookmarkForm />
        <div className='mt-4'>
          <div className='flex'>
            {user && <Categories categories={categories} userId={user.id} />}
          </div>
        </div>
        <BookmarkTable userId={user.id} />
      </div>
    </div>
  );
}
