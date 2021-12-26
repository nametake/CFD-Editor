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
} as ComponentMeta<typeof ResultNode>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof ResultNode> = function Template() {
  return (
    <div style={{ width: '512px', height: '512px' }}>
      <ReactFlow
        nodeTypes={{ resultNode: ResultNode }}
        nodes={[
          {
            id: 'a',
            data: { label: 'label' },
            type: 'resultNode',
            position: { x: 10, y: 10 },
            width: 100,
            height: 100,
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
