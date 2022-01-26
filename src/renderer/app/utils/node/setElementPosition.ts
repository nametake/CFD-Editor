import { Node } from '@/app/types';
import { LengthType, parseLength } from '@/app/utils/css';

import { alignVertical } from './alignVertical';
import { CauseNodeWithElements, expandNodes, mergeNodes } from './expandNodes';

type ResizeCauseNodesOption = {
  elementsTopMargin?: LengthType;
  elementGap?: LengthType;
};

// resizeCauseNode calculated CauseNode size by children ElementNodes.
//
// If current CauseNode width larger than ElementNodes, it is not resize.
//
// width  = (Largest ElementNode width)
//            + paddingLeft
//            + paddingRight
// height = SUM(elements height)
//            + (elementGap * (elements count-1)) // elements gap
//            + elementsTopMargin
//            + paddingLeft
//            + paddingRight
const resizeCauseNode =
  (option?: ResizeCauseNodesOption) =>
    (causeNode: CauseNodeWithElements): CauseNodeWithElements => {
      if (causeNode.elements.length === 0) {
        return causeNode;
      }
      const { elementsTopMargin = 0, elementGap = 0 } = option ?? {};
      const newWidth =
        Math.max(...causeNode.elements.map<number>((el) => el.width ?? 0)) +
        (parseLength(causeNode.style?.paddingLeft) ?? 0) +
        (parseLength(causeNode.style?.paddingRight) ?? 0);

      const newHeight =
        (parseLength(elementsTopMargin) ?? 0) +
        // sum elements height and gap
        causeNode.elements
          .map((el) => el.height ?? 0)
          .reduce<number>(
            (prev, height, i): number =>
              prev + height + (i !== 0 ? parseLength(elementGap) ?? 0 : 0),
            0
          ) +
        (parseLength(causeNode.data.label?.style?.height) ?? 0) +
        (parseLength(causeNode.style?.paddingTop) ?? 0) +
        (parseLength(causeNode.style?.paddingBottom) ?? 0);

      return {
        ...causeNode,
        data: {
          ...causeNode.data,
          elements: {
            width: Math.max(
              ...causeNode.elements.map<number>((el) => el.width ?? 0)
            ),
          },
        },
        width: newWidth >= (causeNode.width ?? 0) ? newWidth : causeNode.width,
        height: newHeight,
        style: {
          ...causeNode.style,
          height: newHeight,
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
    causeNodes.map(resizeCauseNode({ elementGap })).map(
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
