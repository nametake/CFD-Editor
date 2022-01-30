/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { CauseFlow } from '@/app/ui/CauseFlow';

import { CauseNode, causeNodeLabelStyle, causeNodeStyle } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/CauseNode',
  component: CauseNode,
  args: {
    data: {
      label: {
        text: 'Cause',
        style: causeNodeLabelStyle,
      },
    },
  },
} as ComponentMeta<typeof CauseNode>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof CauseNode> = function Template(args) {
  return (
    <CauseFlow
      nodes={[
        {
          ...args,
          id: 'id',
          type: 'cause',
          position: { x: 8, y: 8 },
          style: causeNodeStyle,
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
