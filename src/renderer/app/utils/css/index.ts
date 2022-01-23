export type LengthType = string | number | undefined;

export const parseLength = (n: LengthType): number | undefined => {
  if (!n) return undefined;
  if (typeof n === 'number') return n;
  return parseFloat(n);
};
