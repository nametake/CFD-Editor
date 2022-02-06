import React from 'react';
import ReactFlow, { ReactFlowProps } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { Edge, EdgeType, Node, NodeType } from '@/app/types';
import { CauseNode } from '@/app/ui/CauseNode';
import { Edge as EdgeComponent } from '@/app/ui/Edge';
import { ElementNode } from '@/app/ui/ElementNode';
import { ResultNode } from '@/app/ui/ResultNode';

const nodeTypes: { [key in NodeType]: React.ReactNode } = {
  cause: CauseNode,
  element: ElementNode,
  result: ResultNode,
};

const edgeTypes: { [key in EdgeType]: React.ReactNode } = {
  removable: EdgeComponent,
};

export type CauseFlowProps = Omit<ReactFlowProps, 'nodes' | 'nodeTypes'> & {
  nodes: Node[];
  edges: Edge[];
};

const StyledReactFlow = styled(ReactFlow)`
  width: 100%;
  min-height: 512px;
`;

/* eslint-disable react/jsx-props-no-spreading */
export const CauseFlow = function CauseFlow(
  props: CauseFlowProps
): JSX.Element {
  return (
    <StyledReactFlow nodeTypes={nodeTypes} edgeTypes={edgeTypes} {...props} />
  );
};
/* eslint-enable */
