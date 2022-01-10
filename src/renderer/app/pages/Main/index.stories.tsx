/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { useMain } from './hooks';
import { Main } from './Main';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Main',
  component: Main,
} as ComponentMeta<typeof Main>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof Main> = function Template() {
  const { causeFlowProps, decisionTableProps } = useMain();
  return (
    <Main
      causeFlowProps={causeFlowProps}
      decisionTableProps={decisionTableProps}
    />
  );
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {};
