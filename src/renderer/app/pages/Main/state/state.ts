import { CellType, Edge, Node } from '@/app/types';

export const gridOption = {
  nameColumn: 2,
  stubColumn: 3,
};

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
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
      { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
      { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
    ],
    [
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: null } },
    ],
    [
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: null } },
    ],
    [
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: null } },
    ],
    [
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'CONDITION_NAME', value: null } },
      { value: { type: 'CONDITION_STUB', value: null } },
    ],
    [
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
      { value: { type: 'ACTION_HEADER', value: 'Action' } },
      { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
    ],
    [
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ACTION_NAME', value: null } },
      { value: { type: 'ACTION_STUB', value: null } },
    ],
    [
      { value: { type: 'ROW_NUMBER' } },
      { value: { type: 'REMOVE_ROW' } },
      { value: { type: 'ACTION_NAME', value: null } },
      { value: { type: 'ACTION_STUB', value: null } },
    ],
  ],
};

export const emptyConditionRow: CellType[] = [
  { value: { type: 'ROW_NUMBER' } },
  { value: { type: 'REMOVE_ROW' } },
  { value: { type: 'CONDITION_NAME', value: null } },
  { value: { type: 'CONDITION_STUB', value: null } },
];

export const emptyActionRow: CellType[] = [
  { value: { type: 'ROW_NUMBER' } },
  { value: { type: 'REMOVE_ROW' } },
  { value: { type: 'ACTION_NAME', value: null } },
  { value: { type: 'ACTION_STUB', value: null } },
];
