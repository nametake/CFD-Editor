/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { Text } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/Text',
  component: Text,
} as ComponentMeta<typeof Text>;

/* eslint-disable react/jsx-props-no-spreading */
const Template: ComponentStory<typeof Text> = function Template() {
  return <Text>Hello World!</Text>;
};
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {};
