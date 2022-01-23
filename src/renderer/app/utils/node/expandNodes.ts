import {
  CauseNodeType,
  ElementNodeType,
  Node,
  ResultNodeType,
} from '@/app/types';

export type CauseNodeWithElements = CauseNodeType & {
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

export const expandNodes = (
  nodes: Node[]
): [CauseNodeWithElements[], ResultNodeType[]] => [
    toCauseNodeWithElements(nodes),
    toResultNode(nodes),
  ];

export const mergeNodes = ([causeNodes, resultNodes]: [
  CauseNodeWithElements[],
  ResultNodeType[]
]): Node[] => [
    ...causeNodes.flatMap(({ elements, ...node }) => [node, ...elements]),
    ...resultNodes,
  ];
