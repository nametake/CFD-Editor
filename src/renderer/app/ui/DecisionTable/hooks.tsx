import React, { Reducer, useReducer } from 'react';

import { assertUnreachable } from '@/app/utils/assert';

import { DecisionTableProps } from './DecisionTable';
import { CellType } from './types';

type State = {
  grid: CellType[][];
};

const initialState: State = {
  grid: [
    [
      { value: { type: 'TITLE', value: 'Condition' } },
      { value: { type: 'TITLE', value: 'Condition stub' } },
    ],
    [{ value: { type: 'ADD_ROW_BUTTON' } }, { value: { type: 'EMPTY' } }],
    [
      { value: { type: 'TITLE', value: 'Action' } },
      { value: { type: 'TITLE', value: 'Action stub' } },
    ],
    [{ value: { type: 'ADD_ROW_BUTTON' } }, { value: { type: 'EMPTY' } }],
  ],
};

export type Action =
  | { type: 'EDIT_CELL' }
  | { type: 'CLICK_ADD_ROW_BUTTON'; payload: { row: number } }
  | { type: 'REMOVE_CONDITION_ROW' };

const reducer: Reducer<State, Action> = (
  prev: State,
  action: Action
): State => {
  switch (action.type) {
    case 'CLICK_ADD_ROW_BUTTON': {
      const { row } = action.payload;
      const end = prev.grid.length;
      return {
        ...prev,
        grid: [
          ...prev.grid.slice(0, row),
          [{ value: { type: 'EMPTY' } }, { value: { type: 'EMPTY' } }],
          ...prev.grid.slice(row, end),
        ],
      };
    }
    case 'EDIT_CELL':
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
                {cell.value.type}
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
        return cell;
      })
    ),
  };
};
