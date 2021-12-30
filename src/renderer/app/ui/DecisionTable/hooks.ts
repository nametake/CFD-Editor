import { Reducer, useReducer } from 'react';

import { assertUnreachable } from '@/app/utils/assert';

import { CellType } from './types';

type State = {
  grid: CellType[][];
};

const initialState: State = {
  grid: [[]],
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

export const useUseDecisionTable = () => {
  const [state] = useReducer(reducer, initialState);
  return {
    grid: state.grid,
  };
};
