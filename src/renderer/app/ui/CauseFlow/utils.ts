import { ElkNode } from 'elkjs';

import { Node } from './types';

const mapNodeToElkNode =
  (nodes: Node[]) =>
    (node: Node): ElkNode => ({
      id: node.id,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      children: makeElkNodeTreeFn(nodes, node),
      width: node.width ?? 0,
      height: node.height ?? 0,
      // labels: [
      //   {
      //     id: `${node.id}-label`,
      //     text: node.data.label ?? '',
      //     width: node.width ?? undefined,
      //     height: 30,
      //     layoutOptions: {
      //       'nodeLabels.placement': 'INSIDE, V_TOP, H_CENTER',
      //     },
      //   },
      // ],
    });

const makeElkNodeTreeFn = (nodes: Node[], parentNode: Node): ElkNode[] =>
  nodes
    .filter((node) => node.parentNode === parentNode.id)
    .map<ElkNode>(mapNodeToElkNode(nodes));

export const makeElkNodeTree = (nodes: Node[]): ElkNode[] =>
  nodes
    .filter((node) => !node.parentNode)
    .map<ElkNode>(mapNodeToElkNode(nodes));

export const reduceElkNodes = (elkNodes: ElkNode[]): ElkNode[] => {
  const fn = (
    prev: ElkNode[],
    { children, ...elkNode }: ElkNode
  ): ElkNode[] => {
    const childNodes = children?.reduce(fn, []) ?? [];
    return [...prev, elkNode, ...childNodes];
  };
  return elkNodes.reduce(fn, []);
};

export const mapElkNode = (elkNodes: ElkNode[]) => {
  const elkNodeList = reduceElkNodes(elkNodes);
  return (node: Node): Node => {
    const elkNode = elkNodeList.find((en) => en.id === node.id);
    return {
      ...node,
      width: elkNode?.width,
      height: elkNode?.height,
      position: { x: elkNode?.x ?? 0, y: elkNode?.y ?? 0 },
    };
  };
};
