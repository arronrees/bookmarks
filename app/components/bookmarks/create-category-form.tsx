'use client';
import { createCategory } from '@/app/actions/categories';
import React, { useActionState } from 'react';

export default function CreateCategoryForm() {
  const [state, action] = useActionState(createCategory, undefined);

  return (
    <div className='mt-4'>
      <form action={action}>
        <div className=''>
          <div className='relative'>
            <input
              type='text'
              name='category'
              id='category'
              placeholder='Enter category name'
              className='w-full rounded border border-stone-300 p-1 px-4 placeholder:text-stone-400 dark:placeholder:text-stone-500 leading-[1] text-xs placeholder:text-xs text-stone-700 dark:text-stone-300 dark:border-stone-700'
            />
          </div>
          {state?.errors?.category && (
            <ul className='mt-2'>
              {state.errors.category.map((error, index) => (
                <li
                  key={index}
                  className='text-red-600 dark:text-red-400 text-xs'
                >
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
      </form>
    </div>
  );
}
