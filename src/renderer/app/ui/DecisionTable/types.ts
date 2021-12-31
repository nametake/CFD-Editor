import ReactDataSheet from 'react-datasheet';

export const CONDITION_COLUMN = 1;

export type ValueType =
  | { type: 'EMPTY' }
  | { type: 'TITLE'; value: string }
  | { type: 'HEADER_ADD_ROW_BUTTON' }
  | { type: 'REMOVE_ROW' }
  | { type: 'TEXT'; value: string | null }
  | { type: 'CONDITION_RULE'; value: 'yes' | 'no' }
  | { type: 'ACTION_RULE'; value: 'yes' | 'none' };

export interface CellType extends ReactDataSheet.Cell<CellType> {
  value: ValueType;
}
