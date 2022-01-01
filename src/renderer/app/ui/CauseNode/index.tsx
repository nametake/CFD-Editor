import React, { CSSProperties } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { CauseNodeDataType } from '@/app/types';

export const causeNodeStyle: CSSProperties = {
  width: 'fit-content',
  border: '1px solid',
  paddingTop: 10,
  paddingRight: 20,
  paddingBottom: 10,
  paddingLeft: 20,
};

type CauseNodeProps<T> = NodeProps<T>;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Label = styled.div`
  display: flex;
`;

export const causeLabelStyle: CSSProperties = {
  height: 24,
};

export const CauseNode = function CauseNode<T extends CauseNodeDataType>({
  data,
}: CauseNodeProps<T>): JSX.Element {
  return (
    <Wrapper>
      <Handle type="target" position={Position.Left} />
      <Label style={data.label?.style}>{data.label?.text}</Label>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
};
