/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import ReactFlow from 'react-flow-renderer';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { ResultNode } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/ResultNode',
  component: ResultNode,
  args: {
    data: {
      label: 'Result',
    },
  },
} as ComponentMeta<typeof ResultNode>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof ResultNode> = function Template(args) {
  return (
    <div style={{ width: '512px', height: '512px' }}>
      <ReactFlow
        nodeTypes={{ resultNode: ResultNode }}
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
