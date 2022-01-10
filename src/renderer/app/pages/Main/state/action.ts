import ReactDataSheet from 'react-datasheet';
import { Connection, NodeChange } from 'react-flow-renderer';

import { CellType } from '@/app/types';

export type MainAction =
  | {
    type: 'CHANGED_CELLS';
    payload: { changes: ReactDataSheet.CellsChangedArgs<CellType> };
  }
  | { type: 'CHANGED_NODES'; payload: { changes: NodeChange[] } }
  | { type: 'ADDED_CONNECTION'; payload: { connection: Connection } }
  | { type: 'CLICK_ADD_ROW_TOP_BUTTON'; payload: { row: number } }
  | { type: 'CLICK_REMOVE_EDGE'; payload: { id: string } }
  | { type: 'CLICK_ADD_ROW_BOTTOM_BUTTON'; payload: { row: number } }
  | { type: 'CLICK_REMOVE_ROW_BUTTON'; payload: { row: number } }
  | { type: 'REMOVE_CONDITION_ROW' };
