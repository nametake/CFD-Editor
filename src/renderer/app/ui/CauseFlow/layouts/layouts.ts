import {
  CauseNodeType,
  ElementNodeType,
  Node,
  ResultNodeType,
} from '@/app/types';
import { causeLabelStyle, causeNodeStyle } from '@/app/ui/CauseNode';
import { elementNodeStyle } from '@/app/ui/ElementNode';
import { resultNodeStyle } from '@/app/ui/ResultNode';
import { assertUnreachable } from '@/app/utils/assert';
import { parseLength } from '@/app/utils/css';

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

export type CauseNodeWithElements = CauseNodeType & {
  elements: ElementNodeType[];
};

const makeElementNode = (nodes: Node[], parentNode: Node): ElementNodeType[] =>
  nodes
    .filter((node): node is ElementNodeType => node.type === 'element')
    .filter((node) => node.parentNode === parentNode.id);

export const makeCauseNode = (nodes: Node[]): CauseNodeWithElements[] =>
  nodes
    .filter((node): node is CauseNodeType => node.type === 'cause')
    .map<CauseNodeWithElements>((node) => ({
      ...node,
      elements: makeElementNode(nodes, node),
    }));

export const makeResultNode = (nodes: Node[]): ResultNodeType[] =>
  nodes.filter((node): node is ResultNodeType => node.type === 'result');

export type ResizeCauseNodesOption = {
  elementsTopMargin?: number;
  elementGap?: number;
};

// resizeCauseNode calculated CauseNode size by children ElementNodes.
//
// width  = (Largest ElementNode width)
//            + paddingLeft
//            + paddingRight
// height = SUM(elements height)
//            + (elementGap * (elements count-1)) // elements gap
//            + elementsTopMargin
//            + paddingLeft
//            + paddingRight
export const resizeCauseNode = (
  causeNode: CauseNodeWithElements,
  option?: ResizeCauseNodesOption
): CauseNodeWithElements => {
  if (causeNode.elements.length === 0) {
    return {
      ...causeNode,
      style: {
        ...causeNode.style,
        ...causeNodeStyle,
      },
    };
  }
  const { elementsTopMargin, elementGap } = option ?? {};
  const causeWidth =
    causeNode.elements
      .map((el) => el.width ?? 0)
      .reduce((prev, width) => (prev < width ? width : prev), 0) +
    (parseLength(causeNode.style?.paddingLeft) ?? 0) +
    (parseLength(causeNode.style?.paddingRight) ?? 0);

  const causeHeight =
    (elementsTopMargin ?? 0) +
    causeNode.elements
      .map((el) => el.height ?? 0)
      .reduce(
        (prev, height, i) =>
          prev + height + (i !== 0 && elementGap ? elementGap : 0),
        0
      ) +
    (parseLength(causeNode.data.label?.style?.height) ?? 0) +
    (parseLength(causeNode.style?.paddingTop) ?? 0) +
    (parseLength(causeNode.style?.paddingBottom) ?? 0);

  return {
    ...causeNode,
    width: causeWidth,
    height: causeHeight,
    style: {
      ...causeNode.style,
      width: causeWidth,
      height: causeHeight,
    },
  };
};

export const resizeCauseNodes = (
  nodes: Node[],
  option?: ResizeCauseNodesOption
): Node[] => [
    ...makeCauseNode(nodes)
      .map((node) => resizeCauseNode(node, option))
      .flatMap(({ elements, ...node }) => [node, ...elements]),
    ...makeResultNode(nodes),
  ];

export const mapStyle = (node: Node): Node => {
  switch (node.type) {
    case 'cause':
      return {
        ...node,
        data: {
          ...node.data,
          label: {
            ...node.data.label,
            style: causeLabelStyle,
          },
        },
        style: {
          ...node.style,
          ...causeNodeStyle,
        },
      };
    case 'element':
      return {
        ...node,
        style: {
          ...node.style,
          ...elementNodeStyle,
        },
      };
    case 'result':
      return {
        ...node,
        style: {
          ...node.style,
          ...resultNodeStyle,
        },
      };
    default:
      return assertUnreachable(node);
  }
};

// TODO remove magic number
export const layoutNodes = (nodes: Node[]) => {
  const styledNodes = nodes.map(mapStyle);
  const causeNodes = makeCauseNode(styledNodes).map((node) =>
    resizeCauseNode(node, { elementGap: 10, elementsTopMargin: 10 })
  );
  const resultNodes = makeResultNode(styledNodes);

  const layoutedNodes = alignHorizontal(causeNodes, { gap: 20 }).map(
    ({ elements, ...node }) => ({
      ...node,
      elements: alignVertical(elements, {
        startPosition: {
          x: parseLength(node.style?.paddingLeft) ?? 0,
          y:
            (parseLength(node.style?.paddingTop) ?? 0) +
            (parseLength(node.data.label?.style?.height) ?? 0) +
            10,
        },
        gap: 10,
      }),
    })
  );

  const resultStartX = layoutedNodes.reduce(
    (prev, node) => prev + (node.width ?? 0),
    20 * layoutedNodes.length
  );

  return [
    ...layoutedNodes.flatMap(({ elements, ...node }) => [node, ...elements]),
    ...alignVertical(resultNodes, {
      startPosition: { x: resultStartX, y: 0 },
      gap: 45,
    }),
  ];
};
