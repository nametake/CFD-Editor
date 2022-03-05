import { Reducer } from 'react';

import { addEdge, applyNodeChanges } from '@/app/ui/CauseFlow';
import { causeNodeLabelStyle, causeNodeStyle } from '@/app/ui/CauseNode';
import { elementNodeStyle } from '@/app/ui/ElementNode';
import { resultNodeStyle } from '@/app/ui/ResultNode';
import { assertUnreachable } from '@/app/utils/assert';
import { Grid } from '@/app/utils/grid';
import { Nodes } from '@/app/utils/nodes';
import { Rules } from '@/app/utils/rules';

import { MainAction } from './action';
import {
  MainState,
  emptyActionRow,
  emptyConditionRow,
  gridOption,
} from './state';

const actionReducer: Reducer<MainState, MainAction> = (
  prev: MainState,
  action: MainAction
): MainState => {
  switch (action.type) {
    case 'CAUSE_FLOW/REMOVE_ALL_EDGES': {
      return {
        ...prev,
        edges: [],
      };
    }
    case 'CAUSE_FLOW/ALIGN_NODES': {
      return {
        ...prev,
      };
    }
    case 'CAUSE_FLOW/CHANGED_NODES': {
      return {
        ...prev,
        nodes: applyNodeChanges(action.payload.changes, prev.nodes),
      };
    }
    case 'CAUSE_FLOW/DRAG_STOP': {
      return {
        ...prev,
        nodes: prev.nodes.map((node) => ({ ...node, selected: false })),
      };
    }
    case 'CAUSE_FLOW/ADDED_CONNECTION': {
      return {
        ...prev,
        edges: addEdge(
          {
            ...action.payload.connection,
            label: prev.edgeId,
            data: { label: prev.edgeId },
          },
          prev.edges
        ),
      };
    }
    case 'CAUSE_FLOW/CLICK_REMOVE_EDGE': {
      return {
        ...prev,
        edges: prev.edges.filter((edge) => edge.id !== action.payload.id),
      };
    }
    case 'CAUSE_FLOW/CHANGE_EDGE_ID': {
      return {
        ...prev,
        edgeId: action.payload.edgeId,
      };
    }
    case 'DECISION_TABLE/CHANGE_INVALID_FLAG': {
      const rowIndex = action.payload.row;
      return {
        ...prev,
        grid: prev.grid.map((row, i) => {
          if (i !== rowIndex) {
            return row;
          }
          return row.map((cell) => {
            if (cell.value.type !== 'INVALID_FLAG') {
              return cell;
            }
            return {
              ...cell,
              value: {
                ...cell.value,
                value: !cell.value.value,
              },
            };
          });
        }),
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
  const causeAndElementNodes = Nodes.fromConditions(conditions);

  const actions = Grid.toActions(state.grid, gridOption);
  const resultNodes = Nodes.fromActions(actions);

  const nodes = [...causeAndElementNodes, ...resultNodes].map(
    Nodes.mapStyle(mapStyleOption)
  );

  const nextNodes = Nodes.alignElementNodes(
    Nodes.merge({ oldNodes: state.nodes, newNodes: nodes }),
    {
      labelMarginBottom: 10,
      elementGap: 10,
    }
  );

  switch (action.type) {
    case 'CAUSE_FLOW/REMOVE_ALL_EDGES':
    case 'CAUSE_FLOW/CHANGED_NODES':
    case 'CAUSE_FLOW/DRAG_STOP':
    case 'CAUSE_FLOW/ADDED_CONNECTION':
    case 'CAUSE_FLOW/CLICK_REMOVE_EDGE':
    case 'CAUSE_FLOW/CHANGE_EDGE_ID':
    case 'DECISION_TABLE/CHANGE_INVALID_FLAG':
      return { ...state, nodes: nextNodes };
    case 'CAUSE_FLOW/ALIGN_NODES':
    case 'DECISION_TABLE/CHANGED_CELLS':
    case 'DECISION_TABLE/CLICK_ADD_CONDITION_ROW':
    case 'DECISION_TABLE/CLICK_ADD_ACTION_ROW':
    case 'DECISION_TABLE/CLICK_REMOVE_ROW':
      return {
        ...state,
        nodes: Nodes.alignParentNodes(nextNodes, {
          causeNodeGap: 80,
          resultNodeGap: 40,
          causeNodeAndResultNodeGap: 80,
          startPosition: { x: 16, y: 16 },
        }),
      };
    default:
      return assertUnreachable(action);
  }
};

const rulesReducer: Reducer<MainState, MainAction> = (
  state: MainState
): MainState => {
  const conditions = Grid.toConditions(state.grid, gridOption);
  const actions = Grid.toActions(state.grid, gridOption);
  const baseRules = Nodes.traverseRules(state.nodes, state.edges);
  const rules = Rules.filterInvalidRules(baseRules, conditions, actions);
  const grid = Grid.mergeRules(
    state.grid,
    conditions,
    actions,
    rules,
    gridOption
  );
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
