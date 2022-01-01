import path from 'path';
import { StorybookConfig } from '@storybook/core-common';

const config: StorybookConfig = {
  stories: [
    '../src/renderer/app/ui/MainView/index.stories.tsx',
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // https://github.com/storybookjs/storybook/issues/13145
    const emotionReactEleven = path.dirname(
      require.resolve('@emotion/react/package.json')
    );
    const emotionStyledEleven = path.dirname(
      require.resolve('@emotion/styled/package.json')
    );
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@emotion/core': emotionReactEleven,
          '@emotion/styled': emotionStyledEleven,
          'emotion-theming': emotionReactEleven,
          '@': path.resolve(__dirname, '..', 'src', 'renderer'),
        },
      },
    };
  },
  typescript: { reactDocgen: false },
};

module.exports = config;
