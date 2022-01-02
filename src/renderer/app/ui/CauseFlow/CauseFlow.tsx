import React from 'react';
import ReactFlow, { ReactFlowProps } from 'react-flow-renderer';

import styled from '@emotion/styled';

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

const StyledReactFlow = styled(ReactFlow)`
  width: 100%;
  min-height: 256px;

  .react-flow__edge-path {
    stroke-width: 2px;
  }
`;

/* eslint-disable react/jsx-props-no-spreading */
export const CauseFlow = function CauseFlow({
  nodes,
  ...props
}: CauseFlowProps): JSX.Element {
  return <StyledReactFlow nodeTypes={nodeTypes} nodes={nodes} {...props} />;
};
/* eslint-enable */
