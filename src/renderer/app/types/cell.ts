import ReactDataSheet from 'react-datasheet';

export const MAIN_COLUMN = 1;
export const STUB_COLUMN = 2;

export type ValueType =
  | { type: 'EMPTY' }
  | { type: 'TITLE'; value: string }
  | { type: 'HEADER_ADD_ROW_BUTTON'; onClick?: () => void }
  | { type: 'REMOVE_ROW'; onClick?: () => void }
  | { type: 'TEXT'; value: string | null }
  | { type: 'CONDITION_RULE'; value: 'yes' | 'no' }
  | { type: 'ACTION_RULE'; value: 'yes' | 'none' };

export interface CellType extends ReactDataSheet.Cell<CellType> {
  value: ValueType;
}
