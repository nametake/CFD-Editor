import {
  CauseNodeType,
  ElementNodeType,
  Node,
  ResultNodeType,
} from '@/app/types';
import { causeNodeStyle } from '@/app/ui/CauseNode';
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
  const newWidth =
    Math.max(...causeNode.elements.map<number>((el) => el.width ?? 0)) +
    (parseLength(causeNode.style?.paddingLeft) ?? 0) +
    (parseLength(causeNode.style?.paddingRight) ?? 0);

  const newHeight =
    (elementsTopMargin ?? 0) +
    // sum elements height and gap
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

// TODO remove magic number
export const layoutNodes = (nodes: Node[]) => {
  // console.log(nodes.map((node) => `${node.width},${node.style?.width}`));
  const elementsTopMargin = 20;
  const elementGap = 10;
  const nodeGap = 80;
  const resultGap = 45;
  const causeNodes = makeCauseNode(nodes).map((node) =>
    resizeCauseNode(node, {
      elementGap,
      elementsTopMargin,
    })
  );
  const resultNodes = makeResultNode(nodes);

  const layoutedNodes = alignHorizontal(causeNodes, { gap: nodeGap }).map(
    ({ elements, ...node }) => ({
      ...node,
      elements: alignVertical(elements, {
        startPosition: {
          x: parseLength(node.style?.paddingLeft) ?? 0,
          y:
            (parseLength(node.style?.paddingTop) ?? 0) +
            (parseLength(node.data.label?.style?.height) ?? 0) +
            elementGap,
        },
        gap: elementGap,
      }),
    })
  );

  const resultStartX = layoutedNodes.reduce(
    (prev, node) => prev + (node.width ?? 0),
    nodeGap * layoutedNodes.length
  );

  return [
    ...layoutedNodes.flatMap(({ elements, ...node }) => [node, ...elements]),
    ...alignVertical(resultNodes, {
      startPosition: { x: resultStartX, y: 0 },
      gap: resultGap,
    }),
  ];
};
