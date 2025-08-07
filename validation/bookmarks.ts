import 'server-only';
import z from 'zod';

export const CreateBookmarkSchema = z.object({
  bookmark: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
  }),
});
