import {
  EdgeChange,
  NodeChange,
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
  applyEdgeChanges as applyEdgeChangesReactFlow,
  applyNodeChanges as applyNodeChangesReactFlow,
} from 'react-flow-renderer';

import { NodeDataType } from '@/types/NodeDataType';

export type CauseNodeType<T extends NodeDataType = NodeDataType> = Omit<
  ReactFlowNode<T>,
  'type'
> & { type: 'cause' };
export type ElementNodeType<T extends NodeDataType = NodeDataType> = Omit<
  ReactFlowNode<T>,
  'type'
> & { type: 'element' };
export type ResultNodeType<T extends NodeDataType = NodeDataType> = Omit<
  ReactFlowNode<T>,
  'type'
> & { type: 'result' };

export type Node<T extends NodeDataType = NodeDataType> =
  | CauseNodeType<T>
  | ElementNodeType<T>
  | ResultNodeType<T>;
export type Edge = ReactFlowEdge;

export type NodeType = Node['type'];

export const applyNodeChanges = (
  changes: NodeChange[],
  nodes: Node[]
): Node[] =>
  applyNodeChangesReactFlow(changes, nodes as ReactFlowNode[]) as Node[];

export const applyEdgeChanges = (
  changes: EdgeChange[],
  nodes: Edge[]
): Edge[] =>
  applyEdgeChangesReactFlow(changes, nodes as ReactFlowEdge[]) as Edge[];
