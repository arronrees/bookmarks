'use server';

import { SignupFormSchema } from '../validation/auth';
import { formatZodError } from '../lib/validation';
import { comparePassword, createUser, findUserByEmail } from '../lib/auth';
import { createSession, deleteSession } from '../lib/session';
import { redirect } from 'next/navigation';

type FormErrors = {
  email?: string[];
  password?: string[];
};

type FormState =
  | {
      errors?: FormErrors;
      message?: string;
    }
  | undefined;

export async function signup(prevState: FormState, formData: FormData) {
  const {
    success,
    error,
    data: validated,
  } = SignupFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!success) {
    return {
      errors: formatZodError<FormErrors>(error),
    };
  }

  const user = await findUserByEmail(validated.email);

  // user exists, proceed with login
  if (user) {
    const check = await comparePassword(validated.password, user.password);

    if (!check) {
      return {
        errors: {
          password: ['Invalid password.'],
        },
      };
    }

    await createSession(user.id.toString());
    return redirect('/');
  }

  // user doesnt yet exist, proceed with signup
  const newUser = await createUser(validated.email, validated.password);

  await createSession(newUser.id.toString());
  return redirect('/');
}

export async function logout() {
  await deleteSession();
  redirect('/login');
}
