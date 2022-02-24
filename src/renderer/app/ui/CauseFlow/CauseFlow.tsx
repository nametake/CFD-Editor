import React from 'react';
import ReactFlow, {
  Background,
  Controls as ReactFlowControls,
  ReactFlowProps,
} from 'react-flow-renderer';

import styled from '@emotion/styled';
import { FaEraser } from 'react-icons/fa';
import { RiAlignTop } from 'react-icons/ri';

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
  onClickRemoveAllEdgesButton?: () => void;
  onClickAlignNodes?: () => void;
};

const Controls = styled.div`
  position: absolute;
  z-index: 5;
  top: 15px;
  right: 15px;
  box-shadow: 0 0 1px 1px rgb(0 0 0 / 8%);
`;

const ControlButton = styled.button`
  display: flex;
  width: 26px;
  height: 26px;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-bottom: 1px solid #eee;
  background: #fefefe;
  cursor: pointer;
  user-select: none;

  :hover {
    background: #f4f4f4;
  }
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
  onClickRemoveAllEdgesButton,
  onClickAlignNodes,
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
        <ControlButton
          type="button"
          title="Remove all edges"
          onClick={onClickRemoveAllEdgesButton}
        >
          <FaEraser />
        </ControlButton>
        <ControlButton
          type="button"
          title="Align all nodes"
          onClick={onClickAlignNodes}
        >
          <RiAlignTop />
        </ControlButton>
      </Controls>
      <ReactFlowControls />
      <Background color="#888" gap={16} />
    </StyledReactFlow>
  );
};
/* eslint-enable */
