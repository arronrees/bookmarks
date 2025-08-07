import { getUser } from '@/lib/dal';
import { redirect } from 'next/navigation';
import CreateBookmarkForm from './components/bookmarks/create-bookmark-form';
import { getBookmarks } from '@/lib/bookmarks';
import BookmarkListItem from './components/bookmarks/bookmark-list-item';
import Header from './components/layout/header';

export default async function Home() {
  const user = await getUser();

  if (!user) {
    return redirect('/login');
  }

  const bookmarks = await getBookmarks(user.id);

  return (
    <div>
      <Header />
      <div>
        <CreateBookmarkForm />
        <div className='mt-4'>
          <div className='flex'>
            {/* <ul className='flex items-center flex-wrap gap-2'>
              <li>
                <a
                  href=''
                  className='bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-800 px-2 py-1 rounded-full text-xs'
                >
                  All
                </a>
              </li>
              <li>
                <a
                  href=''
                  className='bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 focus:bg-stone-200 dark:hover:bg-stone-700 dark:focus:bg-stone-700 transition px-2 py-1 rounded-full text-xs'
                >
                  Design
                </a>
              </li>
              <li>
                <a
                  href=''
                  className='bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-full text-xs'
                >
                  Development
                </a>
              </li>
              <li>
                <a
                  href=''
                  className='bg-stone-100 dark:bg-stone-800 px-2 py-1 rounded-full text-xs'
                >
                  Personal
                </a>
              </li>
            </ul> */}
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
