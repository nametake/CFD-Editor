import React from 'react';
import ReactFlow, {
  Background,
  Controls as ReactFlowControls,
  ReactFlowProps,
} from 'react-flow-renderer';

import styled from '@emotion/styled';

import { Edge, EdgeType, Node, NodeType } from '@/app/types';
import { CauseNode } from '@/app/ui/CauseNode';
import { Edge as EdgeComponent } from '@/app/ui/Edge';
import { ElementNode } from '@/app/ui/ElementNode';
import { ResultNode } from '@/app/ui/ResultNode';

import { mapEdgeZIndex, mapNodeZIndex } from './utils';

const nodeTypes: { [key in NodeType]: React.ReactNode } = {
  cause: CauseNode,
  element: ElementNode,
  result: ResultNode,
};

const edgeTypes: { [key in EdgeType]: React.ReactNode } = {
  removable: EdgeComponent,
};

export type CauseFlowProps = Omit<
  ReactFlowProps,
  'nodes' | 'nodeTypes' | 'edges' | 'edgeTypes'
> & {
  nodes: Node[];
  edges: Edge[];
};

const Controls = styled.div`
  position: absolute;
  z-index: 5;
  top: 20px;
  right: 15px;
`;

const ControlButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #eee;
  background: #fefefe;
  cursor: pointer;
  user-select: none;
`;

ControlButton.defaultProps = { type: 'button' };

const StyledReactFlow = styled(ReactFlow)`
  width: 100%;
  height: 100%;
`;

/* eslint-disable react/jsx-props-no-spreading */
export const CauseFlow = function CauseFlow({
  nodes,
  edges,
  ...props
}: CauseFlowProps): JSX.Element {
  return (
    <StyledReactFlow
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      nodes={nodes.map(mapNodeZIndex)}
      edges={edges.map(mapEdgeZIndex)}
      {...props}
    >
      <Controls>
        <ControlButton type="button">Remove all edges</ControlButton>
        <ControlButton type="button">Align nodes</ControlButton>
      </Controls>
      <ReactFlowControls />
      <Background color="#888" gap={16} />
    </StyledReactFlow>
  );
};
/* eslint-enable */
