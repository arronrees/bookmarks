'use client';
import { signup } from '@/app/actions/auth';
import React, { useActionState } from 'react';
import { useFormStatus } from 'react-dom';

export default function LoginForm() {
  const [state, action] = useActionState(signup, undefined);

  return (
    <form action={action}>
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' name='email' type='email' placeholder='Email' />
        {state?.errors?.email && (
          <ul>
            {state.errors.email.map((error, index) => (
              <li
                key={index}
                className='text-red-600 dark:text-red-400 text-sm'
              >
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <label htmlFor='password'>Password</label>
        <input id='password' name='password' type='password' />
        {state?.errors?.password && (
          <ul>
            {state.errors.password.map((error, index) => (
              <li
                key={index}
                className='text-red-600 dark:text-red-400 text-sm'
              >
                {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type='submit' disabled={pending}>
      Sign In
    </button>
  );
}
