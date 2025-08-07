import React from 'react';
import LoginForm from '../components/auth/login-form';

export default function Login() {
  return (
    <div className='min-h-[calc(100vh-2rem)] md:min-h-[calc(100vh-3rem)] flex items-center justify-center'>
      <LoginForm />
    </div>
  );
}
