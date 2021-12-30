import ReactDataSheet from 'react-datasheet';

export type ValueType =
  | { type: 'control' }
  | { type: 'condition'; value: string | null }
  | { type: 'conditionStub'; value: string | null }
  | { type: 'conditionStubRule'; value: 'yes' | 'no' }
  | { type: 'action'; value: string | null }
  | { type: 'actionStub'; value: string | null }
  | { type: 'actionStubRule'; value: 'yes' | 'no' };

export interface CellType extends ReactDataSheet.Cell<CellType> {
  value: ValueType;
}
