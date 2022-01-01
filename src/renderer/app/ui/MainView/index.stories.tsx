/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { MainView } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'MainView',
  component: MainView,
} as ComponentMeta<typeof MainView>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof MainView> = function Template() {
  return <MainView />;
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {};
