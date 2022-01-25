import { Node } from '@/app/types';
import { LengthType, parseLength } from '@/app/utils/css';

import { alignVertical } from './alignVertical';
import { CauseNodeWithElements, expandNodes, mergeNodes } from './expandNodes';

export type SetElementOption = {
  elementGap: LengthType;
};

export const setElementPosition = (
  nodes: Node[],
  option?: SetElementOption
): Node[] => {
  const { elementGap } = option ?? {};
  const [causeNodes, resultNodes] = expandNodes(nodes);
  return mergeNodes([
    causeNodes.map(
      ({
        elements,
        ...node
      }: CauseNodeWithElements): CauseNodeWithElements => ({
        ...node,
        elements: alignVertical(elements, {
          startPosition: {
            x: parseLength(node.style?.paddingLeft) ?? 0,
            y:
              (parseLength(node.style?.paddingTop) ?? 0) +
              (parseLength(node.data.label?.style?.height) ?? 0) +
              (parseLength(elementGap) ?? 0),
          },
          gap: parseLength(elementGap) ?? 0,
        }).map((elementNode) => ({ ...elementNode, draggable: false })),
      })
    ),
    resultNodes,
  ]);
};
