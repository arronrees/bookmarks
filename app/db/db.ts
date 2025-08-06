import 'server-only';
import { PrismaClient } from '../generated/prisma';

export const db = new PrismaClient();
