'use client';
import { Category } from '@/generated/prisma';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import CreateCategoryForm from './create-category-form';

interface Props {
  categories: Category[];
  userId: number;
  currentCategorySlug?: string;
}

export default function Categories({
  categories,
  userId,
  currentCategorySlug,
}: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className='w-full'>
      <ul className='flex items-center flex-wrap gap-2'>
        <li>
          <Link
            href='/'
            className={`flex transition px-2 py-1 rounded-full text-xs ${
              !currentCategorySlug
                ? 'bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-800'
                : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 focus:bg-stone-200 dark:hover:bg-stone-700 dark:focus:bg-stone-700'
            }`}
          >
            All
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/${userId}/${category.slug}`}
              className={`flex transition px-2 py-1 rounded-full text-xs ${
                currentCategorySlug === category.slug
                  ? 'bg-stone-800 text-white dark:bg-stone-200 dark:text-stone-800'
                  : 'bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 focus:bg-stone-200 dark:hover:bg-stone-700 dark:focus:bg-stone-700'
              }`}
            >
              {category.title}
            </Link>
          </li>
        ))}
        <li>
          <button
            type='button'
            className='flex bg-stone-50 dark:bg-stone-900 hover:bg-stone-100 focus:bg-stone-100 dark:hover:bg-stone-800 dark:focus:bg-stone-800 transition px-2 py-1 rounded-full text-xs items-center justify-center gap-1'
            onClick={(e) => {
              e.preventDefault();
              setShowForm(!showForm);
            }}
          >
            {!showForm ? 'Add' : 'Hide'}
            {!showForm ? <Plus className='size-3' /> : <X className='size-3' />}
          </button>
        </li>
      </ul>
      {showForm && <CreateCategoryForm />}
    </div>
  );
}
