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
  data: [
    [
      { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
      {
        value: { type: 'CONDITION_HEADER', value: 'Condition' },
        readOnly: true,
      },
      {
        value: { type: 'CONDITION_HEADER', value: 'Condition stub' },
        readOnly: true,
      },
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
      {
        value: { type: 'ACTION_HEADER', value: 'Action stub' },
        readOnly: true,
      },
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
  ],
};

export const WithRule = Template.bind({});
WithRule.args = {
  data: [
    [
      { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
      {
        value: { type: 'CONDITION_HEADER', value: 'Condition' },
        readOnly: true,
      },
      {
        value: { type: 'CONDITION_HEADER', value: 'Condition stub' },
        readOnly: true,
      },
      { value: { type: 'CONDITION_HEADER', value: '1' }, readOnly: true },
      { value: { type: 'CONDITION_HEADER', value: '2' }, readOnly: true },
      { value: { type: 'CONDITION_HEADER', value: '3' }, readOnly: true },
      { value: { type: 'CONDITION_HEADER', value: '4' }, readOnly: true },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: 'Card' } },
      { value: { type: 'CONDITION_STUB', value: 'Suica' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: '' } },
      { value: { type: 'CONDITION_STUB', value: 'Pasmo' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: '' } },
      { value: { type: 'CONDITION_STUB', value: '' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: 'Age' } },
      { value: { type: 'CONDITION_STUB', value: 'Over 60' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: '' } },
      { value: { type: 'CONDITION_STUB', value: 'Under 60' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'CONDITION_NAME', value: '' } },
      { value: { type: 'CONDITION_STUB', value: '' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
    ],
    [
      { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
      { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
      {
        value: { type: 'ACTION_HEADER', value: 'Action stub' },
        readOnly: true,
      },
      { value: { type: 'EMPTY' }, readOnly: true },
      { value: { type: 'EMPTY' }, readOnly: true },
      { value: { type: 'EMPTY' }, readOnly: true },
      { value: { type: 'EMPTY' }, readOnly: true },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'ACTION_NAME', value: 'Discount' } },
      { value: { type: 'ACTION_STUB', value: 'Yes' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'ACTION_NAME', value: '' } },
      { value: { type: 'ACTION_STUB', value: 'No' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'ACTION_NAME', value: '' } },
      { value: { type: 'ACTION_STUB', value: '' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
      { value: { type: 'EMPTY' } },
    ],
  ],
};
