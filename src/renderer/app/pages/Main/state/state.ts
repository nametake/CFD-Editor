import { CellType, Edge, Node } from '@/app/types';

export type MainState = {
  nodes: Node[];
  edges: Edge[];
  grid: CellType[][];
};

export const initialState: MainState = {
  nodes: [],
  edges: [],
  grid: [
    [
      { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
      { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
      { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: null } },
    ],
    [
      { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
      { value: { type: 'ACTION_HEADER', value: 'Action' } },
      { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ACTION_NAME', value: null } },
      { value: { type: 'ACTION_STUB', value: null } },
    ],
    [
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ACTION_NAME', value: null } },
      { value: { type: 'ACTION_STUB', value: null } },
    ],
  ],
};

export const emptyConditionRow: CellType[] = [
  { value: { type: 'REMOVE_ROW' } },
  { value: { type: 'CONDITION_NAME', value: null } },
  { value: { type: 'CONDITION_STUB', value: null } },
];

export const emptyActionRow: CellType[] = [
  { value: { type: 'REMOVE_ROW' } },
  { value: { type: 'ACTION_NAME', value: null } },
  { value: { type: 'ACTION_STUB', value: null } },
];
