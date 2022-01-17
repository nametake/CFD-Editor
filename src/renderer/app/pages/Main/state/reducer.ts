import { Reducer } from 'react';

import { Node } from '@/app/types';
import { addEdge, applyNodeChanges, mapStyle } from '@/app/ui/CauseFlow';
import { assertUnreachable } from '@/app/utils/assert';
import { Grid } from '@/app/utils/grid';
import { layoutNodes } from '@/app/utils/layouts';
import { Node as NodeUtils } from '@/app/utils/node';

import { MainAction } from './action';
import { MainState, emptyActionRow, emptyConditionRow } from './state';

const actionReducer: Reducer<MainState, MainAction> = (
  prev: MainState,
  action: MainAction
): MainState => {
  switch (action.type) {
    case 'NODE/CHANGED_NODES': {
      return {
        ...prev,
        nodes: applyNodeChanges(action.payload.changes, prev.nodes),
      };
    }
    case 'NODE/ADDED_CONNECTION': {
      return {
        ...prev,
        edges: addEdge(action.payload.connection, prev.edges),
      };
    }
    case 'NODE/CLICK_REMOVE_EDGE': {
      return {
        ...prev,
        edges: prev.edges.filter((edge) => edge.id !== action.payload.id),
      };
    }
    case 'GRID/CHANGED_CELLS': {
      return {
        ...prev,
        grid: Grid.applyCellsChanges(prev.grid, action.payload.changes),
      };
    }
    case 'GRID/CLICK_ADD_CONDITION_ROW': {
      const actionRowIndex = Grid.findActionRow(prev.grid);
      const end = prev.grid.length;
      return {
        ...prev,
        grid: [
          ...prev.grid.slice(0, actionRowIndex),
          emptyConditionRow,
          ...prev.grid.slice(actionRowIndex, end),
        ],
      };
    }
    case 'GRID/CLICK_ADD_ACTION_ROW': {
      return {
        ...prev,
        grid: [...prev.grid, emptyActionRow],
      };
    }
    case 'GRID/CLICK_REMOVE_ROW': {
      const { row } = action.payload;
      const end = prev.grid.length;
      return {
        ...prev,
        grid: [...prev.grid.slice(0, row), ...prev.grid.slice(row + 1, end)],
      };
    }
    default:
      return assertUnreachable(action);
  }
};

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

const nodesReducer: Reducer<MainState, MainAction> = (
  state: MainState
): MainState => {
  const conditions = Grid.toConditions(state.grid);
  const conditionNodes = NodeUtils.fromConditions(conditions);

  const actions = Grid.toActions(state.grid);
  const resultNodes = NodeUtils.fromActions(actions);

  const nodes = [...conditionNodes, ...resultNodes];

  return {
    ...state,
    nodes: merge(state.nodes, nodes),
  };
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
  [actionReducer, nodesReducer, rulesReducer, layoutReducer].reduce(
    (prevState, fn) => fn(prevState, action),
    prev
  );
