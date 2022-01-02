import React, { CSSProperties } from 'react';
import { NodeProps, Position } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { NodeDataType } from '@/app/types';
import { Handle } from '@/app/ui/Handle';

export const resultNodeStyle: CSSProperties = {
  borderRadius: '50%',
  padding: 16,
  border: '1px solid',
  textAlign: 'center',
};

type ResultNodeProps<T> = NodeProps<T>;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const Label = styled.div`
  color: gray;
`;

export const ResultNode = function ResultNode<T extends NodeDataType>({
  data,
}: ResultNodeProps<T>): JSX.Element {
  return (
    <Wrapper>
      <Handle type="target" position={Position.Left} />
      <Label>{data?.label}</Label>
    </Wrapper>
  );
};
