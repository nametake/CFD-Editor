import { Reducer } from 'react';

import { addEdge, applyNodeChanges } from '@/app/ui/CauseFlow';
import { causeNodeLabelStyle, causeNodeStyle } from '@/app/ui/CauseNode';
import { elementNodeStyle } from '@/app/ui/ElementNode';
import { resultNodeStyle } from '@/app/ui/ResultNode';
import { assertUnreachable } from '@/app/utils/assert';
import { Grid } from '@/app/utils/grid';
import { Node } from '@/app/utils/node';

import { MainAction } from './action';
import { MainState, emptyActionRow, emptyConditionRow } from './state';

const gridOption = {
  nameColumn: 1,
  stubColumn: 2,
};

const actionReducer: Reducer<MainState, MainAction> = (
  prev: MainState,
  action: MainAction
): MainState => {
  switch (action.type) {
    case 'CAUSE_FLOW/CHANGED_NODES': {
      return {
        ...prev,
        nodes: applyNodeChanges(action.payload.changes, prev.nodes),
      };
    }
    case 'CAUSE_FLOW/ADDED_CONNECTION': {
      return {
        ...prev,
        edges: addEdge(action.payload.connection, prev.edges),
      };
    }
    case 'CAUSE_FLOW/CLICK_REMOVE_EDGE': {
      return {
        ...prev,
        edges: prev.edges.filter((edge) => edge.id !== action.payload.id),
      };
    }
    case 'DECISION_TABLE/CHANGED_CELLS': {
      return {
        ...prev,
        grid: Grid.applyCellsChanges(prev.grid, action.payload.changes),
      };
    }
    case 'DECISION_TABLE/CLICK_ADD_CONDITION_ROW': {
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
    case 'DECISION_TABLE/CLICK_ADD_ACTION_ROW': {
      return {
        ...prev,
        grid: [...prev.grid, emptyActionRow],
      };
    }
    case 'DECISION_TABLE/CLICK_REMOVE_ROW': {
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

const mapStyleOption = {
  causeNodeStyle,
  causeNodeLabelStyle,
  elementNodeStyle,
  resultNodeStyle,
};

const createNodesReducer: Reducer<MainState, MainAction> = (
  state: MainState,
  action: MainAction
): MainState => {
  const conditions = Grid.toConditions(state.grid, gridOption);
  const causeAndElementNodes = Node.fromConditions(conditions);

  const actions = Grid.toActions(state.grid, gridOption);
  const resultNodes = Node.fromActions(actions);

  const nodes = [...causeAndElementNodes, ...resultNodes].map(
    Node.mapStyle(mapStyleOption)
  );

  const nextNodes = Node.alignElementNodes(
    Node.merge({ oldNodes: state.nodes, newNodes: nodes }),
    {
      labelMarginBottom: 10,
      elementGap: 10,
    }
  );

  switch (action.type) {
    case 'CAUSE_FLOW/CHANGED_NODES':
    case 'CAUSE_FLOW/ADDED_CONNECTION':
    case 'CAUSE_FLOW/CLICK_REMOVE_EDGE':
      return { ...state, nodes: nextNodes };
    case 'DECISION_TABLE/CHANGED_CELLS':
    case 'DECISION_TABLE/CLICK_ADD_CONDITION_ROW':
    case 'DECISION_TABLE/CLICK_ADD_ACTION_ROW':
    case 'DECISION_TABLE/CLICK_REMOVE_ROW':
      return {
        ...state,
        nodes: Node.alignParentNodes(nextNodes, {
          causeNodeGap: 80,
          resultNodeGap: 40,
          causeNodeAndResultNodeGap: 80,
        }),
      };
    default:
      return assertUnreachable(action);
  }
};

const rulesReducer: Reducer<MainState, MainAction> = (
  state: MainState
): MainState => {
  const rules = Node.traverseRules(state.nodes, state.edges);
  const grid = Grid.mergeRules(state.grid, rules, gridOption);
  return { ...state, grid };
};

export const reducer: Reducer<MainState, MainAction> = (
  prev: MainState,
  action: MainAction
): MainState =>
  [
    actionReducer, // must first
    createNodesReducer,
    rulesReducer,
  ].reduce((prevState, fn) => fn(prevState, action), prev);
