/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { CauseFlow } from '@/app/ui/CauseFlow';

import { ElementNode } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/ElementNode',
  component: ElementNode,
  args: {
    data: {
      label: 'Element',
    },
  },
} as ComponentMeta<typeof ElementNode>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof ElementNode> = function Template(args) {
  return (
    <CauseFlow
      nodes={[
        {
          ...args,
          id: 'id',
          type: 'element',
          position: { x: 8, y: 8 },
        },
      ]}
      edges={[]}
      style={{ width: '512px', height: '512px' }}
    />
  );
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {};
