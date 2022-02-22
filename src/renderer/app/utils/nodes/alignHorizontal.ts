import { Node } from '@/app/types';

export type AlignOption = {
  startPosition?: { x: number; y: number };
  gap?: number;
};

export const alignHorizontal = <T extends Node>(
  nodes: T[],
  option?: AlignOption
): T[] => {
  const { startPosition, gap = 0 } = option ?? {};
  return nodes.map((node, index) => {
    const beforeNodeWidthSum = nodes.reduce(
      (prev, n, i) => (index > i ? prev + (n.width ?? 0) + gap : prev),
      0
    );
    return {
      ...node,
      position: {
        x: (startPosition?.x ?? 0) + beforeNodeWidthSum,
        y: startPosition?.y ?? 0,
      },
    };
  });
};
