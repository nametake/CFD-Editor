import ReactDataSheet from 'react-datasheet';

export const NAME_COLUMN = 1;
export const STUB_COLUMN = 2;

export type ValueType =
  | { type: 'EMPTY' }
  | { type: 'REMOVE_ROW'; onClick?: () => void }
  // Condition
  | { type: 'CONDITION_HEADER'; value: string | null }
  | { type: 'CONDITION_NAME'; value: string | null }
  | { type: 'CONDITION_STUB'; value: string | null }
  | { type: 'CONDITION_RULE'; value: 'yes' | 'no' }
  | { type: 'ADD_CONDITION_ROW_BUTTON'; onClick?: () => void }
  // Action
  | { type: 'ACTION_HEADER'; value: string | null }
  | { type: 'ACTION_NAME'; value: string | null }
  | { type: 'ACTION_STUB'; value: string | null }
  | { type: 'ACTION_RULE'; value: 'yes' | 'none' }
  | { type: 'ADD_ACTION_ROW_BUTTON'; onClick?: () => void };

export interface CellType extends ReactDataSheet.Cell<CellType> {
  value: ValueType;
}

export type CellsChangedArgs = ReactDataSheet.CellsChangedArgs<CellType>;
