import React, { Dispatch, Reducer, useCallback, useReducer } from 'react';
import ReactDataSheet from 'react-datasheet';

import { assertUnreachable } from '@/app/utils/assert';

import { Button } from './Button';
import { DecisionTableProps } from './DecisionTable';
import { CellType } from './types';

type State = {
  grid: CellType[][];
};

const initialState: State = {
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
      { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Action' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Action stub' }, readOnly: true },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'TEXT', value: null } },
      { value: { type: 'TEXT', value: null } },
    ],
  ],
};

export type Action =
  | {
    type: 'CHANGED_CELLS';
    payload: { changes: ReactDataSheet.CellsChangedArgs<CellType> };
  }
  | { type: 'CLICK_ADD_ROW_TOP_BUTTON'; payload: { row: number } }
  | { type: 'CLICK_ADD_ROW_BOTTOM_BUTTON'; payload: { row: number } }
  | { type: 'CLICK_REMOVE_ROW_BUTTON'; payload: { row: number } }
  | { type: 'REMOVE_CONDITION_ROW' };

const reducer: Reducer<State, Action> = (
  prev: State,
  action: Action
): State => {
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
      return {
        ...prev,
        grid,
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

type UseDecisionTableResult = DecisionTableProps;

const mapButton = (
  grid: CellType[][],
  dispatch: Dispatch<Action>
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

export const useDecisionTable = (): UseDecisionTableResult => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    data: mapButton(state.grid, dispatch),
    onCellsChanged: useCallback(
      (changes: ReactDataSheet.CellsChangedArgs<CellType>) => {
        dispatch({ type: 'CHANGED_CELLS', payload: { changes } });
      },
      [dispatch]
    ),
  };
};
