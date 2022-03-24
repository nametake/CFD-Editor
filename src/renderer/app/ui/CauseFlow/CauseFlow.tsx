import React, { ChangeEvent } from 'react';
import ReactFlow, {
  Background,
  ControlButton,
  Controls,
  ReactFlowProps,
} from 'react-flow-renderer';

import styled from '@emotion/styled';
import { FaEraser, FaSave } from 'react-icons/fa';
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
  onClickSave?: () => void;
  onChangeEdgeId?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const EdgeLabelControl = styled.div`
  position: absolute;
  z-index: 5;
  right: 10px;
  bottom: 20px;
`;

const Text = styled.div`
  font-size: 8px;
`;

const Input = styled.input`
  width: 80px;
`;

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
  onClickSave,
  onChangeEdgeId,
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
      <EdgeLabelControl>
        <Text>Edge ID</Text>
        <Input onChange={onChangeEdgeId} />
      </EdgeLabelControl>
      <Controls>
        <ControlButton onClick={onClickAlignNodes}>
          <RiAlignTop />
        </ControlButton>
        <ControlButton onClick={onClickRemoveAllEdgesButton}>
          <FaEraser />
        </ControlButton>
        <ControlButton onClick={onClickSave}>
          <FaSave />
        </ControlButton>
      </Controls>
      <Background color="#888" gap={16} />
    </StyledReactFlow>
  );
};
/* eslint-enable */
