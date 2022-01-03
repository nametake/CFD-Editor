import React, { Dispatch, Reducer, useCallback, useReducer } from 'react';
import ReactDataSheet from 'react-datasheet';
import { Connection, NodeChange } from 'react-flow-renderer';

import {
  Action,
  Condition,
  Edge,
  Node,
  makeCauseNodes,
  makeResultNodes,
} from '@/app/types';
import { Button } from '@/app/ui/Button';
import {
  CauseFlowProps,
  addEdge,
  applyNodeChanges,
  layoutNodes,
  mapStyle,
} from '@/app/ui/CauseFlow';
import {
  CellType,
  DecisionTableProps,
  makeActions,
  makeConditions,
} from '@/app/ui/DecisionTable';
import { assertUnreachable } from '@/app/utils/assert';

import { makeRules, mergeRules } from './utils';

export type MainViewState = {
  nodes: Node[];
  edges: Edge[];
  grid: CellType[][];
};

export const initialState: MainViewState = {
  nodes: [],
  edges: [],
  grid: [
    [
      { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Condition' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Condition stub' }, readOnly: true },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'TEXT', value: null } },
      { value: { type: 'TEXT', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'TEXT', value: null } },
      { value: { type: 'TEXT', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'TEXT', value: null } },
      { value: { type: 'TEXT', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'TEXT', value: null } },
      { value: { type: 'TEXT', value: null } },
    ],
    [
      { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Action' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Action stub' }, readOnly: true },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'TEXT', value: null } },
      { value: { type: 'TEXT', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'TEXT', value: null } },
      { value: { type: 'TEXT', value: null } },
    ],
  ],
};

export type MainViewAction =
  | {
    type: 'CHANGED_CELLS';
    payload: { changes: ReactDataSheet.CellsChangedArgs<CellType> };
  }
  | {
    type: 'CHANGED_NODES';
    payload: { changes: NodeChange[] };
  }
  | { type: 'ADDED_CONNECTION'; payload: { connection: Connection } }
  | { type: 'CLICK_ADD_ROW_TOP_BUTTON'; payload: { row: number } }
  | { type: 'CLICK_REMOVE_EDGE'; payload: { id: string } }
  | { type: 'CLICK_ADD_ROW_BOTTOM_BUTTON'; payload: { row: number } }
  | { type: 'CLICK_REMOVE_ROW_BUTTON'; payload: { row: number } }
  | { type: 'REMOVE_CONDITION_ROW' };

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

const reducer: Reducer<MainViewState, MainViewAction> = (
  prev: MainViewState,
  action: MainViewAction
): MainViewState => {
  switch (action.type) {
    case 'CHANGED_CELLS': {
      const { changes } = action.payload;
      const grid = [...prev.grid];
      changes.forEach(({ cell, row, col, value }) => {
        if (cell?.value.type !== 'TEXT') return;
        grid[row][col] = {
          ...cell,
          value: {
            ...cell.value,
            value,
          },
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
        nodes: layoutNodes(merge(prev.nodes, nodes.map(mapStyle))),
      };
    }
    case 'CHANGED_NODES': {
      const newNodes = layoutNodes(
        applyNodeChanges(action.payload.changes, prev.nodes)
      );
      return {
        ...prev,
        nodes: newNodes,
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

export const mapButton = (
  grid: CellType[][],
  dispatch: Dispatch<MainViewAction>
): CellType[][] =>
  grid.map((row, rowNumber) =>
    row.map((cell) => {
      if (cell.value.type === 'HEADER_ADD_ROW_BUTTON') {
        const handleClick = () => {
          dispatch({
            type: 'CLICK_ADD_ROW_BOTTOM_BUTTON',
            payload: { row: rowNumber },
          });
        };
        return {
          ...cell,
          forceComponent: true,
          component: (
            <Button type="button" onClick={handleClick}>
              +
            </Button>
          ),
        };
      }

      if (cell.value.type === 'REMOVE_ROW') {
        const handleClick = () => {
          dispatch({
            type: 'CLICK_REMOVE_ROW_BUTTON',
            payload: { row: rowNumber },
          });
        };
        return {
          ...cell,
          forceComponent: true,
          component: (
            <Button type="button" onClick={handleClick}>
              -
            </Button>
          ),
        };
      }

      return cell;
    })
  );

export const mapEdgeData =
  (dispatch: Dispatch<MainViewAction>) =>
    (edge: Edge): Edge => ({
      ...edge,
      data: {
        onClickRemove: () => {
          dispatch({ type: 'CLICK_REMOVE_EDGE', payload: { id: edge.id } });
        },
      },
    });

type UseMainViewResult = {
  conditions: Condition[];
  actions: Action[];
  causeFlowProps: CauseFlowProps;
  decisionTableProps: DecisionTableProps;
};

export const useMainView = (): UseMainViewResult => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // TODO merge rule refactor
  const startNode = state.nodes.find((node) => node.type === 'cause');
  const rules = startNode
    ? makeRules(
      { conditionStubIds: [], actionId: null },
      startNode,
      state.nodes,
      state.edges
    )
    : [];
  const grid = mergeRules(state.grid, rules);
  return {
    conditions: makeConditions(state.grid),
    actions: makeActions(state.grid),
    causeFlowProps: {
      nodes: state.nodes,
      edges: state.edges.map(mapEdgeData(dispatch)),
      onNodesChange: useCallback((changes: NodeChange[]) => {
        dispatch({ type: 'CHANGED_NODES', payload: { changes } });
      }, []),
      onConnect: useCallback((connection: Connection) => {
        dispatch({ type: 'ADDED_CONNECTION', payload: { connection } });
      }, []),
    },
    decisionTableProps: {
      data: mapButton(grid, dispatch),
      onCellsChanged: useCallback(
        (changes: ReactDataSheet.CellsChangedArgs<CellType>) => {
          dispatch({ type: 'CHANGED_CELLS', payload: { changes } });
        },
        []
      ),
    },
  };
};
