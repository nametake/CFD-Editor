export const throwError = (error: string | Error): never => {
  if (typeof error === 'string') {
    throw new Error(error);
  }
  throw error;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const assertUnreachable = (_: never): never => {
  throw new Error("Didn't expect to get here");
};
