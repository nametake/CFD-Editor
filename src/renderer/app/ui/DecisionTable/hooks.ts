import { Reducer, useReducer } from 'react';

import { assertUnreachable } from '@/app/utils/assert';

import { DecisionTableProps } from './DecisionTable';
import { CellType } from './types';

type State = {
  grid: CellType[][];
};

const initialState: State = {
  grid: [
    [
      { value: { type: 'empty' } },
      { value: { type: 'title', value: 'Condition' } },
      { value: { type: 'title', value: 'Condition stub' } },
    ],
    [
      { value: { type: 'empty' } },
      { value: { type: 'empty' } },
      { value: { type: 'empty' } },
    ],
    [
      { value: { type: 'empty' } },
      { value: { type: 'title', value: 'Action' } },
      { value: { type: 'title', value: 'Action stub' } },
    ],
  ],
};

export type Action =
  | { type: 'EDIT_CELL' }
  | { type: 'ADD_CONDITION_ROW' }
  | { type: 'REMOVE_CONDITION_ROW' };

const reducer: Reducer<State, Action> = (
  prev: State,
  action: Action
): State => {
  switch (action.type) {
    case 'ADD_CONDITION_ROW':
    case 'EDIT_CELL':
    case 'REMOVE_CONDITION_ROW':
      return prev;
    default:
      return assertUnreachable(action);
  }
};

type UseDecisionTableResult = DecisionTableProps;

export const useDecisionTable = (): UseDecisionTableResult => {
  const [state] = useReducer(reducer, initialState);
  return {
    data: state.grid,
  };
};
