import { Node } from '@/app/types';

import { alignHorizontal } from './alignHorizontal';
import { alignVertical } from './alignVertical';
import { toCauseNodeWithElements, toResultNode } from './types';

export type AlignParentNodesOption = {
  gap?: number;
};

export const alignParentNodes = (
  nodes: Node[],
  option?: AlignParentNodesOption
): Node[] => {
  const { gap } = option ?? {};

  const causeNodes = toCauseNodeWithElements(nodes);
  const resultNodes = toResultNode(nodes);

  const layoutedCauseNodes = alignHorizontal(causeNodes, { gap });

  const resultStartX = layoutedCauseNodes.reduce(
    (prev, node) => prev + (node.width ?? 0),
    (gap ?? 0) * layoutedCauseNodes.length
  );

  return [
    ...layoutedCauseNodes.flatMap(({ elements, ...node }) => [
      node,
      ...elements,
    ]),
    ...alignVertical(resultNodes, {
      startPosition: { x: resultStartX, y: 0 },
      gap: 10,
    }),
  ];
};
