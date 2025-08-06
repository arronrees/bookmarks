import 'server-only';
import z, { ZodError } from 'zod';

export function formatZodError<TErrors>(error: ZodError): TErrors {
  const errors: TErrors = {} as TErrors;

  const { properties } = z.treeifyError(error) as {
    errors: string[];
    properties: {
      [key: string]: {
        errors: string[];
      };
    };
  };

  for (const key in properties) {
    if (properties[key].errors.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (errors as any)[key] = properties[key].errors;
    }
  }

  return errors;
}
