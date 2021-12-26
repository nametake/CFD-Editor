import React from 'react';
import ReactFlow, {
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
  ReactFlowProps,
} from 'react-flow-renderer';

import { CauseNode } from '@/app/ui/CauseNode';
import { ElementNode } from '@/app/ui/ElementNode';
import { ResultNode } from '@/app/ui/ResultNode';

const nodeTypes = {
  cause: CauseNode,
  element: ElementNode,
  result: ResultNode,
};

export type NodeType = keyof typeof nodeTypes;

export type Node = Omit<ReactFlowNode, 'type'> & { type: NodeType };
export type Edge = ReactFlowEdge;

type CauseFlowProps = Omit<ReactFlowProps, 'nodes' | 'nodeTypes'> & {
  nodes: Node[];
  edges: Edge[];
};

/* eslint-disable react/jsx-props-no-spreading */
export const CauseFlow = function CauseFlow(
  props: CauseFlowProps
): JSX.Element {
  return <ReactFlow nodeTypes={nodeTypes} {...props} />;
};
/* eslint-enable */