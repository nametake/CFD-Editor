/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
import ELK from 'elkjs';
/* eslint-enable */

import { makeElkNodes, mapChangeNode, mapElkNode } from './utils';

import { CauseFlow, Node } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/CauseFlow',
  component: CauseFlow,
} as ComponentMeta<typeof CauseFlow>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof CauseFlow> = function Template({
  nodes: argsNodes,
  edges: argsEdges,
  ...args
}) {
  const [nodes, setNodes] = useState(argsNodes);
  const sort = useCallback(
    (newNodes: Node[]) => {
      const elk = new ELK();
      const rootGraph = {
        id: 'root',
        // layoutOptions: { 'elk.algorithm': 'box' },
        // layoutOptions: { 'elk.algorithm': 'disco' },
        layoutOptions: { 'elk.algorithm': 'box' },
        // layoutOptions: { 'elk.algorithm': 'layered' },
        // layoutOptions: { 'elk.algorithm': 'mrtree' },
        children: makeElkNodes(newNodes),
        edges: argsEdges.map((edge) => ({
          id: edge.id,
          sources: [edge.source],
          targets: [edge.target],
        })),
      };
      elk
        .layout(rootGraph)
        .then((graph) => {
          setNodes(newNodes.map<Node>(mapElkNode(graph.children ?? [])));
        })
        .catch((err) => {
          // eslint-disable-next-line no-console
          console.error(err);
        });
    },
    [argsEdges]
  );
  return (
    <CauseFlow
      {...args}
      nodes={nodes}
      edges={argsEdges}
      style={{ width: '512px', height: '512px' }}
      onNodesChange={(changeNodes) => {
        sort(nodes.map(mapChangeNode(changeNodes)));
      }}
    />
  );
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {
  nodes: [
    {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      // position: { x: 10, y: 10 },
      position: { x: 0, y: 0 },
      style: { width: 120, height: 200 },
      width: 100,
      height: 500,
    },
    {
      id: 'c1-e1',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Element 1' },
      // position: { x: 15, y: 50 },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c1-e2',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Element 2' },
      // position: { x: 15, y: 120 },
      position: { x: 0, y: 0 },
    },
    {
      id: 'r1',
      type: 'result',
      data: { label: 'Result 1' },
      // position: { x: 150, y: 52 },
      position: { x: 0, y: 0 },
    },
    {
      id: 'r2',
      type: 'result',
      data: { label: 'Result 2' },
      // position: { x: 150, y: 122 },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [
    { id: 'c1-e1-r1', source: 'c1-e1', target: 'r1' },
    { id: 'c1-e2-r2', source: 'c1-e2', target: 'r2' },
  ],
};
