/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { CauseFlow } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/CauseFlow',
  component: CauseFlow,
} as ComponentMeta<typeof CauseFlow>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof CauseFlow> = function Template(args) {
  return <CauseFlow {...args} style={{ width: '512px', height: '512px' }} />;
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {
  nodes: [
    {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 10, y: 10 },
      style: { width: 120, height: 200 },
      width: 100,
      height: 500,
    },
    {
      id: 'c1-e1',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Element 1' },
      position: { x: 15, y: 20 },
    },
    {
      id: 'c1-e2',
      parentNode: 'c1',
      type: 'element',
      data: { label: 'Element 2' },
      position: { x: 15, y: 80 },
    },
    {
      id: 'r1',
      type: 'result',
      data: { label: 'Result 1' },
      position: { x: 150, y: 20 },
    },
    {
      id: 'r2',
      type: 'result',
      data: { label: 'Result 2' },
      position: { x: 150, y: 80 },
    },
  ],
  edges: [
    { id: 'c1-e1-r1', source: 'c1-e1', target: 'r1' },
    { id: 'c1-e2-r2', source: 'c1-e2', target: 'r2' },
  ],
};
