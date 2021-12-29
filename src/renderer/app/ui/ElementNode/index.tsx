import React, { CSSProperties } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { NodeDataType } from '@/app/types';

export const elementNodeStyle: CSSProperties = {
  borderRadius: '8px',
  padding: 8,
  border: '1px solid',
  textAlign: 'center',
};

type ElementNodeProps<T> = NodeProps<T>;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
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
