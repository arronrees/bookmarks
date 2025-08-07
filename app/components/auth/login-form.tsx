'use client';
import { signup } from '@/app/actions/auth';
import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [state, action] = useActionState(signup, undefined);

  return (
    <div className='tracking-wide p-6 bg-stone-50 text-stone-700 dark:text-stone-200 rounded shadow border border-stone-200 dark:border-stone-800 dark:bg-stone-950'>
      <div>
        <h1 className='text-xl font-semibold mb-2'>Login or Signup</h1>
        <p className='text-stone-400 dark:text-stone-300 text-sm mb-6'>
          Enter your details to login or signup below.
        </p>
      </div>
      <form action={action} className='flex flex-col gap-4'>
        <div className='flex flex-col gap-1'>
          <label htmlFor='email' className='font-semibold text-xs'>
            Email
          </label>
          <input
            id='email'
            name='email'
            type='email'
            className='rounded px-2 py-1 text-sm border border-stone-300 bg-stone-100 dark:bg-stone-900 dark:border-stone-800'
          />
          {state?.errors?.email && (
            <ul>
              {state.errors.email.map((error, index) => (
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
        <div className='flex flex-col gap-1'>
          <label htmlFor='password' className='font-semibold text-xs'>
            Password
          </label>
          <input
            id='password'
            name='password'
            type='password'
            className='rounded px-2 py-1 text-sm border border-stone-300 bg-stone-100 dark:bg-stone-900 dark:border-stone-800'
          />
          {state?.errors?.password && (
            <ul>
              {state.errors.password.map((error, index) => (
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
        <SubmitButton />
      </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type='submit'
      disabled={pending}
      className='bg-stone-800 text-white rounded py-1 hover:bg-stone-700 !ring-stone-500 focus:bg-stone-700 dark:bg-stone-900 dark:hover:bg-stone-800 dark:focus:bg-stone-800 dark:!ring-stone-700'
    >
      Sign In
    </button>
  );
}
