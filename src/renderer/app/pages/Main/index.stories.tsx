/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';
/* eslint-enable */

import { Node } from '@/app/types';

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
    id: '1-2',
    data: {
      label: { text: 'Card', style: { height: 24 } },
      elements: { width: 68, height: 100 },
    },
    type: 'cause',
    position: { x: 0, y: 0 },
    style: {
      width: 'fit-content',
      height: 'fit-content',
      border: '1px solid',
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
    },
    width: 110,
    height: 146,
  },
  {
    id: '1-3',
    data: { label: 'Suica' },
    parentNode: '1-2',
    type: 'element',
    position: { x: 20, y: 44 },
    style: {
      borderRadius: '8px',
      padding: 8,
      border: '1px solid',
      textAlign: 'center',
      pointerEvents: 'none',
    },
    draggable: false,
    width: 58,
    height: 40,
  },
  {
    id: '2-3',
    data: { label: 'Pasmo' },
    parentNode: '1-2',
    type: 'element',
    position: { x: 20, y: 94 },
    style: {
      borderRadius: '8px',
      padding: 8,
      border: '1px solid',
      textAlign: 'center',
      pointerEvents: 'none',
    },
    draggable: false,
    width: 68,
    height: 40,
  },
  {
    id: '3-2',
    data: {
      label: { text: 'Age', style: { height: 24 } },
      elements: { width: 84, height: 100 },
    },
    type: 'cause',
    position: { x: 190, y: 0 },
    style: {
      width: 'fit-content',
      height: 'fit-content',
      border: '1px solid',
      paddingTop: 10,
      paddingRight: 20,
      paddingBottom: 10,
      paddingLeft: 20,
    },
    width: 126,
    height: 146,
  },
  {
    id: '3-3',
    data: { label: 'Over 60' },
    parentNode: '3-2',
    type: 'element',
    position: { x: 20, y: 44 },
    style: {
      borderRadius: '8px',
      padding: 8,
      border: '1px solid',
      textAlign: 'center',
      pointerEvents: 'none',
    },
    draggable: false,
    width: 75,
    height: 40,
  },
  {
    id: '4-3',
    data: { label: 'Under 60' },
    parentNode: '3-2',
    type: 'element',
    position: { x: 20, y: 94 },
    style: {
      borderRadius: '8px',
      padding: 8,
      border: '1px solid',
      textAlign: 'center',
      pointerEvents: 'none',
    },
    draggable: false,
    width: 84,
    height: 40,
  },
  {
    id: '6-3',
    data: { label: 'Yes' },
    type: 'result',
    position: { x: 396, y: 0 },
    style: {
      borderRadius: '50%',
      padding: 16,
      border: '1px solid',
      textAlign: 'center',
    },
    width: 60,
    height: 56,
  },
  {
    id: '7-3',
    data: { label: 'No' },
    type: 'result',
    position: { x: 396, y: 96 },
    style: {
      borderRadius: '50%',
      padding: 16,
      border: '1px solid',
      textAlign: 'center',
    },
    width: 54,
    height: 56,
  },
];

/* eslint-disable react/jsx-props-no-spreading */
const TemplateWithInitialState: ComponentStory<typeof Main> =
  function TemplateWithInitialState() {
    const { causeFlowProps, decisionTableProps } = useMain({
      initialState: {
        nodes: initialNode,
        edges: [
          {
            source: '1-2',
            sourceHandle: null,
            target: '3-2',
            targetHandle: null,
            id: 'reactflow__edge-1-2-3-2',
            type: 'removable',
          },
          {
            source: '3-3',
            sourceHandle: null,
            target: '6-3',
            targetHandle: null,
            id: 'reactflow__edge-3-3-6-3',
            type: 'removable',
          },
          {
            source: '4-3',
            sourceHandle: null,
            target: '7-3',
            targetHandle: null,
            id: 'reactflow__edge-4-3-7-3',
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
            { value: { type: 'ACTION_NAME', value: null } },
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

/* eslint-enable */
export const WithInitialState = TemplateWithInitialState.bind({});
WithInitialState.args = {};
