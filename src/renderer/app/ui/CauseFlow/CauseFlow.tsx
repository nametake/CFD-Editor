import React from 'react';
import ReactFlow, { ReactFlowProps } from 'react-flow-renderer';

import { Edge, Node, nodeTypes } from './types';

type CauseFlowProps = Omit<ReactFlowProps, 'nodes' | 'nodeTypes'> & {
  nodes: Node[];
  edges: Edge[];
};

/* eslint-disable react/jsx-props-no-spreading */
export const CauseFlow = function CauseFlow(
  props: CauseFlowProps
): JSX.Element {
  return <ReactFlow nodeTypes={nodeTypes} {...props} />;
};
/* eslint-enable */
