import React from 'react';
import ReactFlow, { ReactFlowProps } from 'react-flow-renderer';

import { Edge, Node, NodeType } from '@/app/types';
import { CauseNode } from '@/app/ui/CauseNode';
import { ElementNode } from '@/app/ui/ElementNode';
import { ResultNode } from '@/app/ui/ResultNode';

const nodeTypes: { [key in NodeType]: React.ReactNode } = {
  cause: CauseNode,
  element: ElementNode,
  result: ResultNode,
};

export type CauseFlowProps = Omit<ReactFlowProps, 'nodes' | 'nodeTypes'> & {
  nodes: Node[];
  edges: Edge[];
};

/* eslint-disable react/jsx-props-no-spreading */
export const CauseFlow = function CauseFlow({
  nodes,
  ...props
}: CauseFlowProps): JSX.Element {
  return (
    <ReactFlow nodeTypes={nodeTypes} nodes={nodes} {...props} />
  );
};
/* eslint-enable */
