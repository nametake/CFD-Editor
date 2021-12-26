import React from 'react';
import { Story } from '@storybook/react';

import { Global } from '../src/renderer/app/ui/Global';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: Story) => (
    <>
      <Global />
      <Story />
    </>
  ),
];
