import {
  Connection,
  EdgeChange,
  NodeChange,
  Node as ReactFlowNode,
  addEdge as addEdgeReactFlow,
  applyEdgeChanges as applyEdgeChangesReactFlow,
  applyNodeChanges as applyNodeChangesReactFlow,
} from 'react-flow-renderer';

import { CauseNodeDataType, Edge, Node } from '@/app/types';
import { throwError } from '@/app/utils/assert';

const isCauseNodeDataType = (data: Node['data']): data is CauseNodeDataType =>
  typeof data.label !== 'string';

const toTypeAndData = ({
  type,
  data,
}: Pick<ReactFlowNode<Node['data']>, 'type' | 'data'>) => {
  switch (type) {
    case 'cause': {
      if (isCauseNodeDataType(data)) {
        return { type, data };
      }
      return throwError(`data type is not cause node data type`);
    }
    case 'element':
    case 'result': {
      if (!isCauseNodeDataType(data)) {
        return { type, data };
      }
      return throwError(`data type is not default node data type`);
    }
    default:
      return throwError(`failed to type: '${type ?? 'undefined'}'`);
  }
};

export const applyNodeChanges = (
  changes: NodeChange[],
  nodes: Node[]
): Node[] =>
  applyNodeChangesReactFlow<Node['data']>(changes, nodes).map<Node>((node) => ({
    ...node,
    ...toTypeAndData({ type: node.type, data: node.data }),
  }));

export const applyEdgeChanges = (
  changes: EdgeChange[],
  edges: Edge[]
): Edge[] =>
  applyEdgeChangesReactFlow(changes, edges).map<Edge>((edge) => ({
    ...edge,
    type: 'removable',
  }));

export const addEdge = (edgeParams: Edge | Connection, edges: Edge[]): Edge[] =>
  addEdgeReactFlow(edgeParams, edges).map<Edge>((edge) => ({
    ...edge,
    type: 'removable',
  }));
