import { Plus } from 'lucide-react';

export default function Home() {
  return (
    <div>
      <div>
        <form>
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
          </div>
        </form>
        <div className='mt-4'>
          <div className='flex'>
            <ul className='flex items-center flex-wrap gap-2'>
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
            </ul>
          </div>
        </div>
        <div className='mt-4'>
          <div className='border-b border-stone-100 dark:border-stone-800 flex items-end justify-between text-xs px-2 pb-2 text-stone-500'>
            <p>Title</p>
            <p>Created at</p>
          </div>
        </div>
      </div>
    </div>
  );
}
