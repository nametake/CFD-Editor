import { NodeChange } from 'react-flow-renderer';

import { ElkNode } from 'elkjs';

import { assertUnreachable } from '@/utils/assert';

import { Node } from './types';

export const mapChangeNode =
  (changeNodes: NodeChange[]) =>
    (node: Node): Node => {
      const changeNode = changeNodes.find((cn) => node.id === cn.id);
      switch (changeNode?.type) {
        case 'dimensions':
          return {
            ...node,
            position: {
              x: changeNode.position?.x ?? 0,
              y: changeNode.position?.y ?? 0,
            },
            width: changeNode.dimensions?.width,
            height: changeNode.dimensions?.height,
          };
        case 'select':
        case 'remove':
        case undefined:
          return node;
        default: {
          return assertUnreachable(changeNode);
        }
      }
    };

export const filterChangeNode =
  (changeNodes: NodeChange[]) =>
    (node: Node): boolean => {
      const changeNode = changeNodes.find((cn) => node.id === cn.id);
      switch (changeNode?.type) {
        case 'remove':
          return false;
        case 'dimensions':
        case 'select':
        case undefined:
          return true;
        default: {
          return assertUnreachable(changeNode);
        }
      }
    };

const mapNodeToElkNode =
  (nodes: Node[]) =>
    (node: Node): ElkNode => ({
      id: node.id,
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      children: makeElkNodeTree(nodes, node),
      width: node.width ?? 0,
      height: node.height ?? 0,
    });

const makeElkNodeTree = (nodes: Node[], parentNode: Node): ElkNode[] =>
  nodes
    .filter((node) => node.parentNode === parentNode.id)
    .map<ElkNode>(mapNodeToElkNode(nodes));

export const makeElkNodes = (nodes: Node[]): ElkNode[] =>
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
