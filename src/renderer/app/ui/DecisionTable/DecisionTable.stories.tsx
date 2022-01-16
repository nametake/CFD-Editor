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
const Template: ComponentStory<typeof DecisionTable> =
  function Template(args) {
    return <DecisionTable {...args} />;
  };
/* eslint-enable */

export const Default = Template.bind({});
Default.args = {
  data: [
    [
      { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
      { value: { type: 'CONDITION_HEADER', value: 'Condition' }, readOnly: true },
      { value: { type: 'CONDITION_HEADER', value: 'Condition stub' }, readOnly: true },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: 'Card' } },
      { value: { type: 'CONDITION_STUB', value: 'Visa' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: 'MasterCard' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: 'Country' } },
      { value: { type: 'CONDITION_STUB', value: 'Japan' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: 'USA' } },
    ],
    [
      { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
      { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
      { value: { type: 'ACTION_HEADER', value: 'Action stub' }, readOnly: true },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'ACTION_NAME', value: 'Action 1' } },
      { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'ACTION_NAME', value: null } },
      { value: { type: 'ACTION_STUB', value: 'Action 1 two' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'ACTION_NAME', value: 'Action 2' } },
      { value: { type: 'ACTION_STUB', value: 'Action 2 one' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'ACTION_NAME', value: null } },
      { value: { type: 'ACTION_STUB', value: 'Action 2 two' } },
    ],
  ]
};
