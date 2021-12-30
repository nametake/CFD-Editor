import ReactDataSheet from 'react-datasheet';

export type ValueType =
  | { type: 'empty' }
  | { type: 'title'; value: string }
  | { type: 'text'; value: string | null }
  | { type: 'conditionRule'; value: 'yes' | 'no' }
  | { type: 'actionRule'; value: 'yes' | 'none' };

export interface CellType extends ReactDataSheet.Cell<CellType> {
  value: ValueType;
}
