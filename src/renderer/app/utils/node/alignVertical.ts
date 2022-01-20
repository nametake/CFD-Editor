import { Node } from '@/app/types';

export type AlignOption = {
  startPosition?: { x: number; y: number };
  gap?: number;
};

export const alignVertical = <T extends Node>(
  nodes: T[],
  option?: AlignOption
): T[] => {
  const { startPosition, gap = 0 } = option ?? {};
  return nodes.map((node, index) => {
    const beforeNodeHeightSum = nodes.reduce(
      (prev, n, i) => (index > i ? prev + (n.height ?? 0) + gap : prev),
      0
    );
    return {
      ...node,
      position: {
        x: startPosition?.x ?? 0,
        y: (startPosition?.y ?? 0) + beforeNodeHeightSum,
      },
    };
  });
};
