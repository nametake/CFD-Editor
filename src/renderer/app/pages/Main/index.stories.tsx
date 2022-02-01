/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { Node } from '@/app/types';
import { causeNodeLabelStyle, causeNodeStyle } from '@/app/ui/CauseNode';
import { elementNodeStyle } from '@/app/ui/ElementNode';
import { resultNodeStyle } from '@/app/ui/ResultNode';
import { Node as NodeUitls } from '@/app/utils/node';

import { useMain } from './hooks';
import { Main } from './Main';

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

const initialNode: Node[] = [
  {
    id: '1-1',
    data: { label: { text: 'Card' } },
    type: 'cause',
    position: { x: 0, y: 0 },
  },
  {
    id: '1-2',
    data: { label: 'Suica' },
    parentNode: '1-1',
    type: 'element',
    position: { x: 20, y: 44 },
  },
  {
    id: '2-2',
    data: { label: 'Pasmo' },
    parentNode: '1-1',
    type: 'element',
    position: { x: 20, y: 94 },
  },
  {
    id: '3-1',
    data: { label: { text: 'Age' } },
    type: 'cause',
    position: { x: 193, y: 0 },
  },
  {
    id: '3-2',
    data: { label: 'Over 60' },
    parentNode: '3-1',
    type: 'element',
    position: { x: 20, y: 44 },
  },
  {
    id: '4-2',
    data: { label: 'Under 60' },
    parentNode: '3-1',
    type: 'element',
    position: { x: 20, y: 94 },
  },
  {
    id: '6-2',
    data: { label: 'Yes' },
    type: 'result',
    position: { x: 408, y: 0 },
  },
  {
    id: '7-2',
    data: { label: 'No' },
    type: 'result',
    position: { x: 408, y: 101 },
  },
];

/* eslint-disable react/jsx-props-no-spreading */
const TemplateWithInitialState: ComponentStory<typeof Main> =
  function TemplateWithInitialState() {
    const { causeFlowProps, decisionTableProps } = useMain({
      initialState: {
        nodes: initialNode.map(
          NodeUitls.mapStyle({
            causeNodeStyle,
            causeNodeLabelStyle,
            elementNodeStyle,
            resultNodeStyle,
          })
        ),
        edges: [
          {
            source: '1-1',
            sourceHandle: null,
            target: '3-1',
            targetHandle: null,
            id: 'reactflow__edge-1-1-3-1',
            type: 'removable',
          },
          {
            source: '3-2',
            sourceHandle: null,
            target: '6-2',
            targetHandle: null,
            id: 'reactflow__edge-3-2-6-2',
            type: 'removable',
          },
          {
            source: '4-2',
            sourceHandle: null,
            target: '7-2',
            targetHandle: null,
            id: 'reactflow__edge-4-2-7-2',
            type: 'removable',
          },
        ],
        grid: [
          [
            { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
            {
              value: { type: 'CONDITION_HEADER', value: 'Condition' },
            },
            {
              value: { type: 'CONDITION_HEADER', value: 'Condition stub' },
            },
            { value: { type: 'CONDITION_HEADER', value: '1' } },
            { value: { type: 'CONDITION_HEADER', value: '2' } },
            { value: { type: 'CONDITION_HEADER', value: '3' } },
            { value: { type: 'CONDITION_HEADER', value: '4' } },
          ],
          [
            { value: { type: 'REMOVE_ROW' } },
            { value: { type: 'CONDITION_NAME', value: 'Card' } },
            { value: { type: 'CONDITION_STUB', value: 'Suica' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
          ],
          [
            { value: { type: 'REMOVE_ROW' } },
            { value: { type: 'CONDITION_NAME', value: '' } },
            { value: { type: 'CONDITION_STUB', value: 'Pasmo' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
          ],
          [
            { value: { type: 'REMOVE_ROW' } },
            { value: { type: 'CONDITION_NAME', value: 'Age' } },
            { value: { type: 'CONDITION_STUB', value: 'Over 60' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
          ],
          [
            { value: { type: 'REMOVE_ROW' } },
            { value: { type: 'CONDITION_NAME', value: '' } },
            { value: { type: 'CONDITION_STUB', value: 'Under 60' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
          ],
          [
            { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
            {
              value: { type: 'ACTION_HEADER', value: 'Action' },
            },
            {
              value: { type: 'ACTION_HEADER', value: 'Action stub' },
            },
            { value: { type: 'EMPTY' } },
            { value: { type: 'EMPTY' } },
            { value: { type: 'EMPTY' } },
            { value: { type: 'EMPTY' } },
          ],
          [
            { value: { type: 'REMOVE_ROW' } },
            { value: { type: 'ACTION_NAME', value: 'Discount' } },
            { value: { type: 'ACTION_STUB', value: 'Yes' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
          ],
          [
            { value: { type: 'REMOVE_ROW' } },
            { value: { type: 'ACTION_NAME', value: '' } },
            { value: { type: 'ACTION_STUB', value: 'No' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
            { value: { type: 'CONDITION_RULE', value: 'no' } },
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
          ],
        ],
      },
    });
    return (
      <Main
        causeFlowProps={causeFlowProps}
        decisionTableProps={decisionTableProps}
      />
    );
  };
/* eslint-enable */ export const WithInitialState =
  TemplateWithInitialState.bind({});
WithInitialState.args = {};
