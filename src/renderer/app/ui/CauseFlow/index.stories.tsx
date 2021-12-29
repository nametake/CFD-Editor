/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { Node } from '@/app/types';

import { CauseFlow } from './CauseFlow';
import { layoutNodes } from './layouts/layouts';
import { applyNodeChanges } from './wrapper';

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
  const sort = useCallback((newNodes: Node[]) => {
    const n = layoutNodes(newNodes);
    setNodes(n);
  }, []);
  return (
    <CauseFlow
      {...args}
      nodes={nodes}
      edges={argsEdges}
      style={{ width: '1024', height: '1024px' }}
      onNodesChange={(changeNodes) => {
        sort(applyNodeChanges(changeNodes, nodes));
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
      data: {
        label: {
          text: 'Cause 1',
          style: {
            height: 30,
          },
        },
      },
      position: { x: 0, y: 0 },
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      },
    },
    {
      id: 'c1-e1',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Cause 1 Element 1' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c1-e2',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Cause 1 Element 2' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c1-e3',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Cause 1 Element 3' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c1-e4',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Cause 1 Other' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c2',
      type: 'cause',
      data: {
        label: {
          text: 'Cause 2',
          style: {
            height: 30,
          },
        },
      },
      position: { x: 0, y: 0 },
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      },
    },
    {
      id: 'c2-e1',
      parentNode: 'c2',
      type: 'element',
      data: { label: 'Cause 2 Element 1' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c2-e2',
      parentNode: 'c2',
      type: 'element',
      data: { label: 'Cause 2 Element 2' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c3',
      type: 'cause',
      data: {
        label: {
          text: 'Cause 3',
          style: {
            height: 30,
          },
        },
      },
      position: { x: 0, y: 0 },
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      },
    },
    {
      id: 'c3-e1',
      parentNode: 'c3',
      type: 'element',
      data: { label: 'Cause 3 Element 1' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'c3-e2',
      parentNode: 'c3',
      type: 'element',
      data: { label: 'Cause 3 Element 2' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'r1',
      type: 'result',
      data: { label: 'Result 1' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'r2',
      type: 'result',
      data: { label: 'Result 2' },
      position: { x: 0, y: 0 },
    },
    {
      id: 'r3',
      type: 'result',
      data: { label: 'Result 3' },
      position: { x: 0, y: 0 },
    },
  ],
  edges: [
    { id: 'c1-e1_c2-e1', source: 'c1-e1', target: 'c2-e1' },
    { id: 'c1-e2_c2', source: 'c1-e2', target: 'c2' },
    { id: 'c1-e3_c2-e2', source: 'c1-e3', target: 'c2-e2' },
    { id: 'c2-e1_c3', source: 'c2-e1', target: 'c3' },
    { id: 'c3-e1_r1', source: 'c3-e1', target: 'r1' },
    { id: 'c3-e2_r2', source: 'c3-e2', target: 'r2' },
    { id: 'c1-e4_r3', source: 'c1-e4', target: 'r3' },
    { id: 'c2-e2_r3', source: 'c2-e2', target: 'r3' },
  ],
};
