import { Edge, Node } from '@/app/types';
import { assertUnreachable } from '@/app/utils/assert';

export const mapNodeZIndex = (node: Node): Node => {
  switch (node.type) {
    case 'cause':
      return {
        ...node,
        zIndex: 100,
      };
    case 'element':
      return {
        ...node,
        zIndex: 101,
      };
    case 'result':
      return {
        ...node,
        zIndex: 102,
      };
    default:
      return assertUnreachable(node);
  }
};

export const mapEdgeZIndex = (edge: Edge): Edge => ({
  ...edge,
  zIndex: 1000,
});
