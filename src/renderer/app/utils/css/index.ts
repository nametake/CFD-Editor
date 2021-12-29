type ArgType = string | number | undefined;

export const parseLength = (n: ArgType): number | undefined => {
  if (!n) return undefined;
  if (typeof n === 'number') return n;
  return parseFloat(n);
};
