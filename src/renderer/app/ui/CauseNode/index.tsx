import React, { CSSProperties } from 'react';
import { NodeProps, Position } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { CauseNodeDataType } from '@/app/types';
import { Handle } from '@/app/ui/Handle';

export const causeNodeStyle: CSSProperties = {
  width: 'fit-content',
  height: 'fit-content',
  border: '1px solid',
  paddingTop: 10,
  paddingRight: 20,
  paddingBottom: 10,
  paddingLeft: 20,
  backgroundColor: 'white',
};

export const causeNodeLabelStyle: CSSProperties = {
  height: 24,
};

type CauseNodeProps<T> = NodeProps<T>;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Label = styled.div`
  display: flex;
`;

// For risizing by element nodes
const DummyElementsNode = styled.div<{ width?: number; height?: number }>`
  width: ${({ width = 0 }) => `${width}px`};
  height: ${({ height = 0 }) => `${height}px`};
`;

export const CauseNode = function CauseNode<T extends CauseNodeDataType>({
  data,
}: CauseNodeProps<T>): JSX.Element {
  return (
    <Wrapper>
      <Handle type="target" position={Position.Left} />
      <Label style={data.label?.style}>{data.label?.text}</Label>
      <DummyElementsNode
        width={data.elements?.width}
        height={data.elements?.height}
      />
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
};
