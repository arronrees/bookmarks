import React from 'react';
import Logo from './logo';
import { ChevronsUpDown } from 'lucide-react';
import Link from 'next/link';
import { getUser } from '@/app/lib/dal';

export default async function Header() {
  const user = await getUser();

  return (
    <header className='flex items-center justify-between p-4 md:px-8 md:py-6'>
      <Link href='/' className='flex items-center justify-center !ring-0'>
        <Logo />
      </Link>
      <div>
        <button
          type='button'
          className='text-xs flex items-center gap-2 px-2 py-1 rounded transition hover:bg-stone-100 focus:bg-stone-100 active:bg-stone-200 dark:hover:bg-stone-800 dark:focus:bg-stone-800 dark:active:bg-stone-900'
        >
          <span>{user?.email}</span>
          <span className='flex items-center justify-center h-[1lh]'>
            <ChevronsUpDown className='size-3' />
          </span>
        </button>
      </div>
    </header>
  );
}
