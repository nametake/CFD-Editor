/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { DecisionTable } from './DecisionTable';
import { useDecisionTable } from './hooks';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'ui/DecisionTable',
  component: DecisionTable,
} as ComponentMeta<typeof DecisionTable>;

/* eslint-disable react/jsx-props-no-spreading */
const TemplateWithHooks: ComponentStory<typeof DecisionTable> =
  function TemplateWithHooks() {
    const props = useDecisionTable();
    return <DecisionTable {...props} />;
  };
/* eslint-enable */

export const Default = TemplateWithHooks.bind({});
Default.args = {};
