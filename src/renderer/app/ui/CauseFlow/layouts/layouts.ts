import {
  CauseNodeType,
  ElementNodeType,
  Node,
  ResultNodeType,
} from '@/app/types';

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
  elementGap?: number;
};

export const resizeCauseNode = (
  causeNode: CauseNodeWithElements,
  option?: ResizeCauseNodesOption
): CauseNodeWithElements => {
  const { elementGap } = option ?? {};
  const causeWidth =
    causeNode.elements
      .map((el) => el.width ?? 0)
      .reduce((prev, width) => (prev < width ? width : prev), 0) +
    (causeNode.data.style?.padding?.left ?? 0) +
    (causeNode.data.style?.padding?.right ?? 0);

  const causeHeight =
    causeNode.elements
      .map((el) => el.height ?? 0)
      .reduce(
        (prev, height, i) =>
          prev + height + (i !== 0 && elementGap ? elementGap : 0),
        0
      ) +
    (causeNode.data.style?.labelHeight ?? 0) +
    (causeNode.data.style?.padding?.top ?? 0) +
    (causeNode.data.style?.padding?.bottom ?? 0);
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

// TODO remove magic number
export const layoutNodes = (nodes: Node[]) => {
  const causeNodes = makeCauseNode(nodes).map((node) =>
    resizeCauseNode(node, { elementGap: 10 })
  );
  const resultNodes = makeResultNode(nodes);

  const layoutedNodes = alignHorizontal(causeNodes, { gap: 20 }).map(
    ({ elements, ...node }) => ({
      ...node,
      elements: alignVertical(elements, {
        startPosition: {
          x: node.data.style?.padding?.left ?? 0,
          y:
            (node.data.style?.padding?.top ?? 0) +
            (node.data.style?.labelHeight ?? 0),
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
