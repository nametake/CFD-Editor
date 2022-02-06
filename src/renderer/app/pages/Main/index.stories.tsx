/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { causeNodeLabelStyle, causeNodeStyle } from '@/app/ui/CauseNode';
import { elementNodeStyle } from '@/app/ui/ElementNode';
import { resultNodeStyle } from '@/app/ui/ResultNode';
import { Node as NodeUitls } from '@/app/utils/node';

import { useMain } from './hooks';
import { Main } from './Main';
import { MainState } from './state';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'pages/Main',
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

const initialState: MainState = {
  nodes: [
    {
      id: 'condition-0',
      data: {
        label: { text: 'Card' },
      },
      type: 'cause',
      position: { x: 0, y: 0 },
    },
    {
      id: 'condition-stub-0-0',
      data: { label: 'Suica' },
      parentNode: 'condition-0',
      type: 'element',
      position: { x: 20, y: 44 },
    },
    {
      id: 'condition-stub-0-1',
      data: { label: 'Pasmo' },
      parentNode: 'condition-0',
      type: 'element',
      position: { x: 20, y: 95 },
    },
    {
      id: 'condition-1',
      data: {
        label: { text: 'Age' },
      },
      type: 'cause',
      position: { x: 190, y: 0 },
    },
    {
      id: 'condition-stub-1-0',
      data: { label: 'Over 60' },
      parentNode: 'condition-1',
      type: 'element',
      position: { x: 20, y: 44 },
    },
    {
      id: 'condition-stub-1-1',
      data: { label: 'Under 60' },
      parentNode: 'condition-1',
      type: 'element',
      position: { x: 20, y: 95 },
    },
    {
      id: 'action-stub-0-0',
      data: { label: 'Yes' },
      type: 'result',
      position: { x: 396, y: 0 },
    },
    {
      id: 'action-stub-0-1',
      data: { label: 'No' },
      type: 'result',
      position: { x: 396, y: 97 },
    },
  ],
  edges: [
    {
      source: 'condition-0',
      sourceHandle: null,
      target: 'condition-1',
      targetHandle: null,
      id: 'reactflow__edge-condition-0-condition-1',
      type: 'removable',
    },
    {
      source: 'condition-stub-1-0',
      sourceHandle: null,
      target: 'action-stub-0-0',
      targetHandle: null,
      id: 'reactflow__edge-condition-stub-1-0-action-stub-0-0',
      type: 'removable',
    },
    {
      source: 'condition-stub-1-1',
      sourceHandle: null,
      target: 'action-stub-0-1',
      targetHandle: null,
      id: 'reactflow__edge-condition-stub-1-1-action-stub-0-1',
      type: 'removable',
    },
  ],
  grid: [
    [
      { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
      { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      { value: { type: 'CONDITION_HEADER', value: '1' } },
      { value: { type: 'CONDITION_HEADER', value: '2' } },
      { value: { type: 'CONDITION_HEADER', value: '3' } },
      { value: { type: 'CONDITION_HEADER', value: '4' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'CONDITION_NAME', value: 'Card' } },
      { value: { type: 'CONDITION_STUB', value: 'Suica' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'CONDITION_NAME', value: '' } },
      { value: { type: 'CONDITION_STUB', value: 'Pasmo' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'CONDITION_NAME', value: 'Age' } },
      { value: { type: 'CONDITION_STUB', value: 'Over 60' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'CONDITION_NAME', value: '' } },
      { value: { type: 'CONDITION_STUB', value: 'Under 60' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
    ],
    [
      { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'ACTION_HEADER', value: 'Action' } },
      { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      { value: { type: 'ACTION_HEADER', value: null } },
      { value: { type: 'ACTION_HEADER', value: null } },
      { value: { type: 'ACTION_HEADER', value: null } },
      { value: { type: 'ACTION_HEADER', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'ACTION_NAME', value: 'Discount' } },
      { value: { type: 'ACTION_STUB', value: 'Yes' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'ACTION_NAME', value: '' } },
      { value: { type: 'ACTION_STUB', value: 'No' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
      { value: { type: 'CONDITION_RULE', value: 'no' } },
      { value: { type: 'CONDITION_RULE', value: 'yes' } },
    ],
  ],
};

/* eslint-disable react/jsx-props-no-spreading */
const TemplateWithInitialState: ComponentStory<typeof Main> =
  function TemplateWithInitialState() {
    const { causeFlowProps, decisionTableProps } = useMain({
      initialState: {
        ...initialState,
        nodes: initialState.nodes.map(
          NodeUitls.mapStyle({
            causeNodeStyle,
            causeNodeLabelStyle,
            elementNodeStyle,
            resultNodeStyle,
          })
        ),
      },
    });
    return (
      <Main
        causeFlowProps={causeFlowProps}
        decisionTableProps={decisionTableProps}
      />
    );
  };

/* eslint-enable */
export const WithInitialState = TemplateWithInitialState.bind({});
WithInitialState.args = {};
