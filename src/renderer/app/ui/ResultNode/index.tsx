import React from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { NodeDataType } from '@/app/types';

type ResultNodeProps<T> = NodeProps<T>;

const Wrapper = styled.div`
  border-radius: 50%;
  padding: 16px;
  width: 100%;
  height: 100%;
  border: 1px solid;
  text-align: center;
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
