import {
  CauseNodeType,
  ElementNodeType,
  Node,
  ResultNodeType,
} from '@/app/types';
import { LengthType, parseLength } from '@/app/utils/css';

import { alignVertical } from './alignVertical';

type SetElementsDimentionOption = {
  elementGap?: LengthType;
};

type CauseNodeWithElements = CauseNodeType & {
  elements: ElementNodeType[];
};

const toElementNode = (nodes: Node[], parentNode: Node): ElementNodeType[] =>
  nodes
    .filter((node): node is ElementNodeType => node.type === 'element')
    .filter((node) => node.parentNode === parentNode.id);

const toCauseNodeWithElements = (nodes: Node[]): CauseNodeWithElements[] =>
  nodes
    .filter((node): node is CauseNodeType => node.type === 'cause')
    .map<CauseNodeWithElements>((node) => ({
      ...node,
      elements: toElementNode(nodes, node),
    }));

const toResultNode = (nodes: Node[]): ResultNodeType[] =>
  nodes.filter((node): node is ResultNodeType => node.type === 'result');

const expandNodes = (
  nodes: Node[]
): [CauseNodeWithElements[], ResultNodeType[]] => [
    toCauseNodeWithElements(nodes),
    toResultNode(nodes),
  ];

const mergeNodes = ([causeNodes, resultNodes]: [
  CauseNodeWithElements[],
  ResultNodeType[]
]): Node[] => [
    ...causeNodes.flatMap(({ elements, ...node }) => [node, ...elements]),
    ...resultNodes,
  ];

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
