import React from 'react';
import {
  EdgeProps as ReactFlowEdgeProps,
  getBezierPath,
  getEdgeCenter,
} from 'react-flow-renderer';

const foreignObjectSize = 40;

export type EdgeProps = ReactFlowEdgeProps;

export const Edge = function Edge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
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
  return (
    <>
      <path
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
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <body>
          <button
            type="button"
            className="edgebutton"
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            ×
          </button>
        </body>
      </foreignObject>
    </>
  );
};
