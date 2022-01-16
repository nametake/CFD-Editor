import { Reducer } from 'react';

import { Node } from '@/app/types';
import { addEdge, applyNodeChanges, mapStyle } from '@/app/ui/CauseFlow';
import { assertUnreachable } from '@/app/utils/assert';
import { Grid } from '@/app/utils/grid';
import { layoutNodes } from '@/app/utils/layouts';
import { Node as NodeUtils } from '@/app/utils/node';

import { MainAction } from './action';
import { MainState, emptyActionRow, emptyConditionRow } from './state';

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
        switch (cell?.value.type) {
          case 'CONDITION_NAME':
          case 'CONDITION_STUB':
          case 'ACTION_NAME':
          case 'ACTION_STUB': {
            grid[row][col] = {
              ...cell,
              value: { ...cell.value, value },
            };
            break;
          }
          default:
        }
      });

      const conditions = Grid.toConditions(grid);
      const conditionNodes = NodeUtils.fromConditions(conditions);

      const actions = Grid.toActions(grid);
      const resultNodes = NodeUtils.fromActions(actions);

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
          emptyConditionRow,
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
          emptyActionRow,
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

const rulesReducer: Reducer<MainState, MainAction> = (
  state: MainState
): MainState => {
  const rules = NodeUtils.traverseRules(state.nodes, state.edges);
  const grid = Grid.mergeRules(state.grid, rules);
  return { ...state, grid };
};

const layoutReducer: Reducer<MainState, MainAction> = (
  state: MainState
): MainState => ({ ...state, nodes: layoutNodes(state.nodes.map(mapStyle)) });

export const reducer: Reducer<MainState, MainAction> = (
  prev: MainState,
  action: MainAction
): MainState =>
  [actionReducer, rulesReducer, layoutReducer].reduce(
    (prevState, fn) => fn(prevState, action),
    prev
  );
