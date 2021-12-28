import {
  CauseNodeType,
  ElementNodeType,
  Node,
  ResultNodeType,
} from '@/app/ui/CauseFlow/types';

export type CauseNodeWithElements = CauseNodeType & {
  elements: ElementNodeType[];
};

const makeElementNode = (nodes: Node[], parentNode: Node): ElementNodeType[] =>
  nodes
    .filter((node): node is ElementNodeType => node.type === 'element')
    .filter((node) => node.parentNode, parentNode.id);

const makeCauseNode = (nodes: Node[]): CauseNodeWithElements[] =>
  nodes
    .filter((node): node is CauseNodeType => node.type === 'cause')
    .map<CauseNodeWithElements>((node) => ({
      ...node,
      elements: makeElementNode(nodes, node),
    }));

const makeResultNode = (nodes: Node[]): ResultNodeType[] =>
  nodes.filter((node): node is ResultNodeType => node.type === 'result');

export type ResizeCauseNodeOption = {
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  elementGap?: number;
};

export const resizeCauseNode = (
  causeNode: CauseNodeWithElements,
  options?: ResizeCauseNodeOption
): CauseNodeWithElements => {
  const {
    paddingTop = 20,
    paddingRight = 20,
    paddingBottom = 20,
    paddingLeft = 20,
    elementGap = 10,
  } = options ?? {};
  const causeWidth =
    causeNode.elements
      .map((el) => el.width ?? 0)
      .reduce((prev, width) => prev + width, 0) +
    paddingLeft +
    paddingRight;

  const causeHeight =
    causeNode.elements
      .map((el) => el.height ?? 0)
      .reduce(
        (prev, height, i) => prev + height + (i === 0 ? 0 : elementGap),
        0
      ) +
    paddingTop +
    paddingBottom;
  return {
    ...causeNode,
    width: causeWidth,
    height: causeHeight,
  };
};

export const layoutNodes = (nodes: Node[]): Node[] => {
  const causeNodes = makeCauseNode(nodes);
  const resultNodes = makeResultNode(nodes);
  return [...causeNodes, ...resultNodes];
};
