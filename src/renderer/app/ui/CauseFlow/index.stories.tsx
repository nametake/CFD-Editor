/* eslint-disable import/no-extraneous-dependencies */
import React, { useCallback, useState } from 'react';
import { NodeChange } from 'react-flow-renderer';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { Node } from '@/app/types';
import { causeNodeLabelStyle, causeNodeStyle } from '@/app/ui/CauseNode';
import { elementNodeStyle } from '@/app/ui/ElementNode';
import { resultNodeStyle } from '@/app/ui/ResultNode';
import { layoutNodes } from '@/app/utils/layouts';
import { MapStyleOption, mapStyle } from '@/app/utils/node/mapStyle';
import { setElementPosition } from '@/app/utils/node/setElementPosition';

import { CauseFlow } from './CauseFlow';
import { applyNodeChanges } from './wrapper';

import { mapStyle as mapStyleUtil } from '.';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/CauseFlow',
  component: CauseFlow,
} as ComponentMeta<typeof CauseFlow>;

/* eslint-disable react/jsx-props-no-spreading */
const TemplateWithLayout: ComponentStory<typeof CauseFlow> =
  function TemplateWithLayout({ nodes: argsNodes, edges: argsEdges, ...args }) {
    const [nodes, setNodes] = useState(argsNodes);
    return (
      <CauseFlow
        {...args}
        nodes={nodes}
        edges={argsEdges}
        style={{ width: '1024px', height: '1024px' }}
        onNodesChange={useCallback(
          (changeNodes: NodeChange[]) => {
            setNodes(layoutNodes(applyNodeChanges(changeNodes, nodes)));
          },
          [nodes]
        )}
      />
    );
  };
/* eslint-enable */

const defaultNodes: Node[] = [
  {
    id: 'c1',
    type: 'cause',
    data: {
      label: {
        text: 'Cause 1',
      },
    },
    position: { x: 0, y: 0 },
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
      },
    },
    position: { x: 0, y: 0 },
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
      },
    },
    position: { x: 0, y: 0 },
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
];

export const Default = TemplateWithLayout.bind({});
Default.args = {
  nodes: defaultNodes.map(mapStyleUtil),
  edges: [
    { id: 'c1-e1_c2-e1', source: 'c1-e1', target: 'c2-e1', type: 'removable' },
    { id: 'c1-e2_c2', source: 'c1-e2', target: 'c2', type: 'removable' },
    { id: 'c1-e3_c2-e2', source: 'c1-e3', target: 'c2-e2', type: 'removable' },
    { id: 'c2-e1_c3', source: 'c2-e1', target: 'c3', type: 'removable' },
    { id: 'c3-e1_r1', source: 'c3-e1', target: 'r1', type: 'removable' },
    { id: 'c3-e2_r2', source: 'c3-e2', target: 'r2', type: 'removable' },
    { id: 'c1-e4_r3', source: 'c1-e4', target: 'r3', type: 'removable' },
    { id: 'c2-e2_r3', source: 'c2-e2', target: 'r3', type: 'removable' },
  ],
};

const mapStyleOption: MapStyleOption = {
  causeNodeStyle,
  causeNodeLabelStyle,
  resultNodeStyle,
  elementNodeStyle,
};

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof CauseFlow> = function Template({
  nodes: argsNodes,
  edges: argsEdges,
  ...args
}) {
  const [nodes, setNodes] = useState(argsNodes.map(mapStyle(mapStyleOption)));
  return (
    <CauseFlow
      {...args}
      nodes={nodes}
      edges={argsEdges}
      style={{ width: '1024px', height: '1024px' }}
      onNodesChange={useCallback(
        (changeNodes: NodeChange[]) => {
          const nextNodes = applyNodeChanges(changeNodes, nodes);
          setNodes(setElementPosition(nextNodes, { elementGap: 20 }));
        },
        [nodes]
      )}
    />
  );
};
/* eslint-enable */

export const CauseNodeWithElements = Template.bind({});
CauseNodeWithElements.args = {
  nodes: [
    {
      id: 'c1',
      type: 'cause',
      data: {
        label: {
          text: 'Cause 1',
        },
      },
      position: { x: 0, y: 0 },
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
  ],
};
