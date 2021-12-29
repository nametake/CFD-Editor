import React from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { NodeDataType } from '@/app/types';

type ElementNodeProps<T> = NodeProps<T>;

const Wrapper = styled.div`
  border-radius: 8px;
  padding: 8px;
  width: 100%;
  height: 100%;
  border: 1px solid;
  text-align: center;
`;

const Label = styled.div`
  color: gray;
`;

export const ElementNode = function ElementNode<T extends NodeDataType>({
  data,
}: ElementNodeProps<T>): JSX.Element {
  return (
    <Wrapper>
      <Handle type="target" position={Position.Left} />
      <Label>{data?.label}</Label>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
};
