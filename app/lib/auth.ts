import 'server-only';
import { compare, genSalt, hash } from 'bcrypt';
import { db } from '../db/db';
import { User } from '../generated/prisma';

export async function hashPassword(password: string): Promise<string> {
  const salt = await genSalt();

  const hashedPassword = await hash(password, salt);

  return hashedPassword;
}

export async function comparePassword(
  inputPassword: string,
  passwordToCompare: string
): Promise<boolean> {
  const passwordsMatch = await compare(inputPassword, passwordToCompare);

  return passwordsMatch;
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });

  return user;
}

export async function createUser(email: string, password: string) {
  const hash = await hashPassword(password);

  const user = await db.user.create({
    data: {
      email,
      password: hash,
    },
  });

  return user;
}
