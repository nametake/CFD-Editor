import { Node } from '@/app/types';
import { LengthType, parseLength } from '@/app/utils/css';

import { alignVertical } from './alignVertical';
import { CauseNodeWithElements, expandNodes, mergeNodes } from './expandNodes';

type SetElementsDimentionOption = {
  elementGap?: LengthType;
};

// setElementsDimention sets elements dimention in CauseNode.
//
// elements width  = (Largest ElementNode width)
// elements height = SUM(elements height)
//            + (elementGap * (elements count-1))
const setElementsDimention =
  (option?: SetElementsDimentionOption) =>
    (causeNode: CauseNodeWithElements): CauseNodeWithElements => {
      if (causeNode.elements.length === 0) {
        return {
          ...causeNode,
          data: {
            ...causeNode.data,
            elements: {
              width: 0,
              height: 0,
            },
          },
        };
      }

      const { elementGap = 0 } = option ?? {};

      const newWidth = Math.max(
        ...causeNode.elements.map<number>((el) => el.width ?? 0)
      );

      const newHeight =
        // sum elements height and gap
        causeNode.elements
          .map((el) => el.height ?? 0)
          .reduce<number>(
            (prev, height): number => prev + height + parseLength(elementGap),
            0
          );

      return {
        ...causeNode,
        data: {
          ...causeNode.data,
          elements: {
            width: newWidth,
            height: newHeight,
          },
        },
      };
    };

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
    causeNodes.map(setElementsDimention({ elementGap })).map(
      ({
        elements,
        ...node
      }: CauseNodeWithElements): CauseNodeWithElements => ({
        ...node,
        elements: alignVertical(elements, {
          startPosition: {
            x: parseLength(node.style?.paddingLeft),
            y:
              parseLength(node.style?.paddingTop) +
              parseLength(node.data.label?.style?.height) +
              parseLength(elementGap),
          },
          gap: parseLength(elementGap),
        }).map((elementNode) => ({ ...elementNode, draggable: false })),
      })
    ),
    resultNodes,
  ]);
};
