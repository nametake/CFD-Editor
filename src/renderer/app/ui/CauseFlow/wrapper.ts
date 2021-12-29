import {
  EdgeChange,
  NodeChange,
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
  applyEdgeChanges as applyEdgeChangesReactFlow,
  applyNodeChanges as applyNodeChangesReactFlow,
} from 'react-flow-renderer';

import { Edge, Node } from '@/app/types';

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
