import {
  EdgeChange,
  NodeChange,
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
  applyEdgeChanges as applyEdgeChangesReactFlow,
  applyNodeChanges as applyNodeChangesReactFlow,
} from 'react-flow-renderer';

import { CauseNode } from '@/app/ui/CauseNode';
import { ElementNode } from '@/app/ui/ElementNode';
import { ResultNode } from '@/app/ui/ResultNode';

export const nodeTypes = {
  cause: CauseNode,
  element: ElementNode,
  result: ResultNode,
};

export type NodeType = keyof typeof nodeTypes;

export type Node = Omit<ReactFlowNode, 'type'> & { type: NodeType };
export type Edge = ReactFlowEdge;

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
