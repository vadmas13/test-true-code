import { ZodIssue } from "zod";

export const getZodErrorMessage = (errors: ZodIssue[]) => {
  return errors.reduce((res, curr) => {
    const key = curr.path[0];
    res[key] = curr.message;
    return res;
  }, {} as Record<string, string>);
};
