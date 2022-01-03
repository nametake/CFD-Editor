import {
  Connection,
  EdgeChange,
  NodeChange,
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
  addEdge as addEdgeReactFlow,
  applyEdgeChanges as applyEdgeChangesReactFlow,
  applyNodeChanges as applyNodeChangesReactFlow,
} from 'react-flow-renderer';

import { Edge, Node, NodeType } from '@/app/types';
import { throwError } from '@/app/utils/assert';

const toType = (type: string | undefined): NodeType => {
  switch (type) {
    case 'cause':
    case 'element':
    case 'result':
      return type;
    default:
      return throwError(`failed to type: '${type ?? 'undefined'}'`);
  }
};

export const applyNodeChanges = (
  changes: NodeChange[],
  nodes: Node[]
): Node[] =>
  applyNodeChangesReactFlow(changes, nodes as ReactFlowNode[]).map<Node>(
    (node) => ({ ...node, type: toType(node.type) })
  );

export const applyEdgeChanges = (
  changes: EdgeChange[],
  nodes: Edge[]
): Edge[] =>
  applyEdgeChangesReactFlow(changes, nodes as ReactFlowEdge[]).map<Edge>(
    (edge) => ({ ...edge, type: 'removable' })
  );

export const addEdge = (edgeParams: Edge | Connection, edges: Edge[]): Edge[] =>
  addEdgeReactFlow(edgeParams, edges).map<Edge>((edge) => ({
    ...edge,
    type: 'removable',
  }));
