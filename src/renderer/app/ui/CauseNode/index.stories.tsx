/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { CauseFlow } from '@/app/ui/DiagramCanvas';

import { CauseNode } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/CauseNode',
  component: CauseNode,
  args: {
    data: {
      label: 'Cause',
    },
  },
} as ComponentMeta<typeof CauseNode>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof CauseNode> = function Template(args) {
  return (
    <div style={{ width: '512px', height: '512px' }}>
      <CauseFlow
        nodes={[
          {
            ...args,
            id: 'id',
            type: 'resultNode',
            position: { x: 8, y: 8 },
          },
        ]}
        edges={[]}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {};
