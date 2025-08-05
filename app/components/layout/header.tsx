import React from 'react';
import Logo from './logo';
import { ChevronsUpDown } from 'lucide-react';

export default function Header() {
  return (
    <header className='flex items-center justify-between p-4 md:px-8 md:py-6'>
      <Logo />
      <div>
        <button
          type='button'
          className='text-xs flex items-center gap-2 px-2 py-1 rounded transition hover:bg-stone-100 focus:bg-stone-100 active:bg-stone-200 dark:hover:bg-stone-800 dark:focus:bg-stone-800 dark:active:bg-stone-900'
        >
          <span>arronrees</span>
          <span className='flex items-center justify-center h-[1lh]'>
            <ChevronsUpDown className='size-3' />
          </span>
        </button>
      </div>
    </header>
  );
}
