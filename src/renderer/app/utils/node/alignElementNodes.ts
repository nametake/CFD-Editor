import { Node } from '@/app/types';
import { LengthType, parseLength } from '@/app/utils/css';

import { alignVertical } from './alignVertical';
import {
  CauseNodeWithElements,
  toCauseNodeWithElements,
  toNoParentElementNode,
  toResultNode,
} from './types';

export type AlignElementNodesOption = {
  labelMarginBottom?: LengthType;
  elementGap?: LengthType;
};

// setElementsDimention sets elements dimention in CauseNode.
//
// elements width  = (Largest ElementNode width)
// elements height = SUM(elements height)
//            + (elementGap * (elements count-1))
//            + labelMarginBottom
const setElementsDimention = (option?: AlignElementNodesOption) => {
  const { elementGap, labelMarginBottom } = option ?? {};
  return (causeNode: CauseNodeWithElements): CauseNodeWithElements => {
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

    const newWidth = Math.max(
      ...causeNode.elements.map<number>((el) => el.width ?? 0)
    );

    const newHeight =
      // sum elements height and gap
      causeNode.elements
        .map((el) => el.height ?? 0)
        .reduce<number>(
          (prev, height, i): number =>
            prev + height + (i !== 0 ? parseLength(elementGap) : 0),
          0
        ) + parseLength(labelMarginBottom);

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
};

const setElementPosition = (option?: AlignElementNodesOption) => {
  const { elementGap, labelMarginBottom } = option ?? {};
  return ({
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
          parseLength(labelMarginBottom),
      },
      gap: parseLength(elementGap),
    }).map((elementNode) => ({ ...elementNode, draggable: false })),
  });
};

export const alignElementNodes = (
  nodes: Node[],
  option?: AlignElementNodesOption
): Node[] => {
  const causeNodes = toCauseNodeWithElements(nodes);
  const resultNodes = toResultNode(nodes);
  const noParentElementNodes = toNoParentElementNode(nodes);

  return [
    ...causeNodes
      .map(setElementsDimention(option))
      .map(setElementPosition(option))
      .flatMap(({ elements, ...node }) => [node, ...elements]),
    ...noParentElementNodes,
    ...resultNodes,
  ];
};
