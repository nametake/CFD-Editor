import React, { Reducer, useCallback, useReducer } from 'react';
import ReactDataSheet from 'react-datasheet';

import { assertUnreachable } from '@/app/utils/assert';

import { DecisionTableProps } from './DecisionTable';
import { CellType } from './types';

type State = {
  grid: CellType[][];
};

const initialState: State = {
  grid: [
    [
      { value: { type: 'EMPTY' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Condition' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Condition stub' }, readOnly: true },
    ],
    [
      { value: { type: 'REMOVE_ROW' }, readOnly: true },
      { value: { type: 'TEXT', value: null } },
      { value: { type: 'TEXT', value: null } },
    ],
    [
      { value: { type: 'ADD_ROW_BUTTON' }, readOnly: true },
      { value: { type: 'EMPTY' }, readOnly: true },
      { value: { type: 'EMPTY' }, readOnly: true },
    ],
    [
      { value: { type: 'EMPTY' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Action' }, readOnly: true },
      { value: { type: 'TITLE', value: 'Action stub' }, readOnly: true },
    ],
    [
      { value: { type: 'ADD_ROW_BUTTON' }, readOnly: true },
      { value: { type: 'EMPTY' }, readOnly: true },
      { value: { type: 'EMPTY' }, readOnly: true },
    ],
  ],
};

export type Action =
  | {
    type: 'CHANGED_CELLS';
    payload: { changes: ReactDataSheet.CellsChangedArgs<CellType> };
  }
  | { type: 'CLICK_ADD_ROW_BUTTON'; payload: { row: number } }
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
    case 'CLICK_ADD_ROW_BUTTON': {
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

export const useDecisionTable = (): UseDecisionTableResult => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    data: state.grid.map((row, rowNumber) =>
      row.map((cell) => {
        if (cell.value.type === 'ADD_ROW_BUTTON') {
          return {
            ...cell,
            forceComponent: true,
            component: (
              <div>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'CLICK_ADD_ROW_BUTTON',
                      payload: { row: rowNumber },
                    })
                  }
                >
                  +
                </button>
              </div>
            ),
          };
        }

        if (cell.value.type === 'REMOVE_ROW') {
          return {
            ...cell,
            forceComponent: true,
            component: (
              <div>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({
                      type: 'CLICK_REMOVE_ROW_BUTTON',
                      payload: { row: rowNumber },
                    })
                  }
                >
                  -
                </button>
              </div>
            ),
          };
        }

        return cell;
      })
    ),
    onCellsChanged: useCallback(
      (changes: ReactDataSheet.CellsChangedArgs<CellType>) => {
        dispatch({ type: 'CHANGED_CELLS', payload: { changes } });
      },
      [dispatch]
    ),
  };
};
