export type LengthType = string | number | undefined;

export const parseLength = (n: LengthType): number => {
  if (!n) return 0;
  if (typeof n === 'number') return n;
  return parseFloat(n);
};
