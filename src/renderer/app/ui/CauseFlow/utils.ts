import { NodeChange } from 'react-flow-renderer';

import { ElkNode } from 'elkjs';

import { assertUnreachable } from '@/utils/assert';

import { Node } from '.';

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

const makeTree = (nodes: Node[], parentNode: Node): ElkNode[] =>
  nodes
    .filter((node) => node.parentNode === parentNode.id)
    .map<ElkNode>((node) => ({
      id: node.id,
      children: makeTree(nodes, node),
      width: node.width ?? 0,
      height: node.height ?? 0,
    }));

export const makeElkNodes = (nodes: Node[]): ElkNode[] => nodes
    .filter((node) => !node.parentNode)
    .map<ElkNode>((node) => ({
      id: node.id,
      children: makeTree(nodes, node),
      width: node.width ?? 0,
      height: node.height ?? 0,
    }));
