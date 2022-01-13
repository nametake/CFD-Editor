import { Reducer } from 'react';

import { Node, makeCauseNodes, makeResultNodes } from '@/app/types';
import { addEdge, applyNodeChanges, mapStyle } from '@/app/ui/CauseFlow';
import { makeActions, makeConditions } from '@/app/ui/DecisionTable';
import { assertUnreachable } from '@/app/utils/assert';
import { layoutNodes } from '@/app/utils/layouts';

import { MainAction } from './action';
import { MainState } from './state';

const merge = (prevNodes: Node[], newNodes: Node[]): Node[] =>
  newNodes.map((newNode) => {
    const prevNode = prevNodes.find((node) => node.id === newNode.id);
    return {
      ...prevNode,
      ...newNode,
      style: {
        ...prevNode?.style,
        ...newNode.style,
      },
    };
  });

const actionReducer: Reducer<MainState, MainAction> = (
  prev: MainState,
  action: MainAction
): MainState => {
  switch (action.type) {
    case 'CHANGED_CELLS': {
      // TODO change cell to ui/DecisionTable/utils
      const { changes } = action.payload;
      const grid = [...prev.grid];
      changes.forEach(({ cell, row, col, value }) => {
        if (cell?.value.type !== 'TEXT') return;
        grid[row][col] = {
          ...cell,
          value: { ...cell.value, value },
        };
      });

      const conditions = makeConditions(grid);
      const conditionNodes = makeCauseNodes(conditions);

      const actions = makeActions(grid);
      const resultNodes = makeResultNodes(actions);

      const nodes = [...conditionNodes, ...resultNodes];

      return {
        ...prev,
        grid,
        nodes: merge(prev.nodes, nodes),
      };
    }
    case 'CHANGED_NODES': {
      return {
        ...prev,
        nodes: applyNodeChanges(action.payload.changes, prev.nodes),
      };
    }
    case 'ADDED_CONNECTION': {
      return {
        ...prev,
        edges: addEdge(action.payload.connection, prev.edges),
      };
    }
    case 'CLICK_REMOVE_EDGE': {
      return {
        ...prev,
        edges: prev.edges.filter((edge) => edge.id !== action.payload.id),
      };
    }
    case 'CLICK_ADD_ROW_TOP_BUTTON': {
      const { row } = action.payload;
      const end = prev.grid.length;
      return {
        ...prev,
        grid: [
          ...prev.grid.slice(0, row),
          [
            { value: { type: 'REMOVE_ROW', value: null }, readOnly: true },
            { value: { type: 'TEXT', value: null } },
            { value: { type: 'TEXT', value: null } },
          ],
          ...prev.grid.slice(row, end),
        ],
      };
    }
    case 'CLICK_ADD_ROW_BOTTOM_BUTTON': {
      const { row } = action.payload;
      const end = prev.grid.length;
      return {
        ...prev,
        grid: [
          ...prev.grid.slice(0, row + 1),
          [
            { value: { type: 'REMOVE_ROW', value: null }, readOnly: true },
            { value: { type: 'TEXT', value: null } },
            { value: { type: 'TEXT', value: null } },
          ],
          ...prev.grid.slice(row + 1, end),
        ],
      };
    }
    case 'CLICK_REMOVE_ROW_BUTTON': {
      const { row } = action.payload;
      const end = prev.grid.length;
      return {
        ...prev,
        grid: [...prev.grid.slice(0, row), ...prev.grid.slice(row + 1, end)],
      };
    }
    case 'REMOVE_CONDITION_ROW':
      return prev;
    default:
      return assertUnreachable(action);
  }
};

const layoutReducer: Reducer<MainState, MainAction> = (
  prev: MainState
): MainState => ({ ...prev, nodes: layoutNodes(prev.nodes.map(mapStyle)) });

export const reducer: Reducer<MainState, MainAction> = (
  prev: MainState,
  action: MainAction
): MainState =>
  [actionReducer, layoutReducer].reduce(
    (prevState, fn) => fn(prevState, action),
    prev
  );
