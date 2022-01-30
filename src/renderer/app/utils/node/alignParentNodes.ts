import { Node } from '@/app/types';

import { alignHorizontal } from './alignHorizontal';
import { alignVertical } from './alignVertical';
import { toCauseNodeWithElements, toResultNode } from './types';

export type AlignParentNodesOption = {
  causeNodeGap?: number;
  resultNodeGap?: number;
  causeNodeAndResultNodeGap?: number;
};

export const alignParentNodes = (
  nodes: Node[],
  option?: AlignParentNodesOption
): Node[] => {
  const {
    causeNodeGap = 0,
    resultNodeGap = 0,
    causeNodeAndResultNodeGap = 0,
  } = option ?? {};

  const causeNodes = toCauseNodeWithElements(nodes);
  const resultNodes = toResultNode(nodes);

  const layoutedCauseNodes = alignHorizontal(causeNodes, { gap: causeNodeGap });

  const resultStartX = layoutedCauseNodes.reduce(
    (prev, node) => prev + (node.width ?? 0),
    causeNodeGap * (layoutedCauseNodes.length - 1) + causeNodeAndResultNodeGap
  );

  return [
    ...layoutedCauseNodes.flatMap(({ elements, ...node }) => [
      node,
      ...elements,
    ]),
    ...alignVertical(resultNodes, {
      startPosition: { x: resultStartX, y: 0 },
      gap: resultNodeGap,
    }),
  ];
};
