import React from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';

import styled from '@emotion/styled';

import { CauseNodeDataType } from '@/app/types';

type CauseNodeProps<T> = NodeProps<T>;

type WrapperProps = {
  paddingTop: number | undefined;
  paddingRight: number | undefined;
  paddingLeft: number | undefined;
  paddingBottom: number | undefined;
};

const Wrapper = styled.div<WrapperProps>`
  padding-top: ${({ paddingTop = 0 }) => `${paddingTop}px`};
  padding-right: ${({ paddingRight = 0 }) => `${paddingRight}px`};
  padding-bottom: ${({ paddingBottom = 0 }) => `${paddingBottom}px`};
  padding-left: ${({ paddingLeft = 0 }) => `${paddingLeft}px`};
  width: 100%;
  height: 100%;
  border: 1px solid;
`;

const Label = styled.div<{ height: number | undefined }>`
  height: ${({ height }) => height && `${height}px`};
  color: gray;
`;

export const CauseNode = function CauseNode<T extends CauseNodeDataType>({
  data,
}: CauseNodeProps<T>): JSX.Element {
  const { top, right, bottom, left } = data.style?.padding ?? {};
  return (
    <Wrapper
      paddingTop={top}
      paddingRight={right}
      paddingBottom={bottom}
      paddingLeft={left}
    >
      <Handle type="target" position={Position.Left} />
      <Label height={data.style?.labelHeight}>{data?.label}</Label>
      <Handle type="source" position={Position.Right} />
    </Wrapper>
  );
};
