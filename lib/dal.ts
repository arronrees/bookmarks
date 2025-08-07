import 'server-only';
import { cookies } from 'next/headers';
import { decrypt } from '@/lib/session';
import { cache } from 'react';
import { redirect } from 'next/navigation';
import { db } from '../db/db';

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    redirect('/login');
  }

  return { userId: session.userId as string };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  try {
    const user = await db.user.findUnique({
      where: { id: parseInt(session.userId) },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    console.log('Failed to fetch user');
    return null;
  }
});
