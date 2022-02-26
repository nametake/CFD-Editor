import React, { useCallback } from 'react';
import {
  EdgeProps as ReactFlowEdgeProps,
  getBezierPath,
  getEdgeCenter,
} from 'react-flow-renderer';

import styled from '@emotion/styled';

import { EdgeDataType } from '@/app/types';

const foreignObjectSize = 24;

const Path = styled.path`
  stroke: #b1b1b7;
  stroke-width: 1px;
`;

const Button = styled.button`
  width: 23px;
  height: 23px;
  padding: 0;
  border: 1px solid;
  border-radius: 50%;
  line-height: 21px;
  text-align: center;
  vertical-align: middle;
`;

Button.defaultProps = { type: 'button' };

export type EdgeProps = ReactFlowEdgeProps<EdgeDataType>;

export const Edge = function Edge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps): JSX.Element {
  const edgePath = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  const [edgeCenterX, edgeCenterY] = getEdgeCenter({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.stopPropagation();
      data?.onClickRemove();
    },
    [data]
  );
  return (
    <>
      <Path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={edgeCenterX - foreignObjectSize / 2}
        y={edgeCenterY - foreignObjectSize / 2}
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <Button onClick={handleClick}>×</Button>
      </foreignObject>
    </>
  );
};
