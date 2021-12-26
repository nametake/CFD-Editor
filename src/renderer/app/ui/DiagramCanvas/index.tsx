import React from 'react';
import ReactFlow, {
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
  ReactFlowProps,
} from 'react-flow-renderer';

import { ResultNode } from '@/app/ui/ResultNode';

const nodeTypes = {
  resultNode: ResultNode,
};

export type NodeType = keyof typeof nodeTypes;

export type Node = Omit<ReactFlowNode, 'type'> & { type: NodeType };
export type Edge = ReactFlowEdge;

type DiagramCanvasProps = Omit<ReactFlowProps, 'nodes' | 'nodeTypes'> & {
  nodes: Node[];
  edges: Edge[];
};

/* eslint-disable react/jsx-props-no-spreading */
export const DiagramCanvas = function DiagramCanvas(
  props: DiagramCanvasProps
): JSX.Element {
  return <ReactFlow nodeTypes={nodeTypes} {...props} />;
};
/* eslint-enable */
