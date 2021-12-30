/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { DecisionTable } from './DecisionTable';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/DecisionTable',
  component: DecisionTable,
} as ComponentMeta<typeof DecisionTable>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof DecisionTable> = function Template(args) {
  return <DecisionTable {...args} />;
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {
  data: [[{ value: { type: 'condition', value: 'Name' } }]],
};
