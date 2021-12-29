import React from 'react';
import ReactFlow, { ReactFlowProps } from 'react-flow-renderer';

import { Edge, Node, NodeType } from '@/app/types';
import { CauseNode, causeLabelStyle, causeNodeStyle } from '@/app/ui/CauseNode';
import { ElementNode, elementNodeStyle } from '@/app/ui/ElementNode';
import { ResultNode, resultNodeStyle } from '@/app/ui/ResultNode';
import { assertUnreachable } from '@/app/utils/assert';

const nodeTypes: { [key in NodeType]: React.ReactNode } = {
  cause: CauseNode,
  element: ElementNode,
  result: ResultNode,
};

type CauseFlowProps = Omit<ReactFlowProps, 'nodes' | 'nodeTypes'> & {
  nodes: Node[];
  edges: Edge[];
};

const mapStyle = (node: Node): Node => {
  switch (node.type) {
    case 'cause':
      return {
        ...node,
        data: {
          ...node.data,
          label: {
            ...node.data.label,
            style: causeLabelStyle,
          },
        },
        style: {
          ...node.style,
          ...causeNodeStyle,
        },
      };
    case 'element':
      return {
        ...node,
        style: {
          ...node.style,
          ...elementNodeStyle,
        },
      };
    case 'result':
      return {
        ...node,
        style: {
          ...node.style,
          ...resultNodeStyle,
        },
      };
    default:
      return assertUnreachable(node);
  }
};

/* eslint-disable react/jsx-props-no-spreading */
export const CauseFlow = function CauseFlow({
  nodes,
  ...props
}: CauseFlowProps): JSX.Element {
  return (
    <ReactFlow nodeTypes={nodeTypes} nodes={nodes.map(mapStyle)} {...props} />
  );
};
/* eslint-enable */
