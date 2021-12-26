import React from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { NodeDataType } from '@/types/NodeDataType';

type CauseNodeProps<T> = NodeProps<T>;

const Wrapper = styled.div`
  padding: 16px;
  width: 100%;
  height: 100%;
  border: 1px solid;
`;

const Label = styled.div`
  color: gray;
`;

export const CauseNode = function CauseNode<T extends NodeDataType>({
  data,
}: CauseNodeProps<T>): JSX.Element {
  return (
    <Wrapper>
      <Handle type="target" position={Position.Left} />
      <Label>{data?.label}</Label>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
};
