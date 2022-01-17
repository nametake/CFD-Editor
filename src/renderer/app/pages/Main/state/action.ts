import { Connection, NodeChange } from 'react-flow-renderer';

import { CellsChangedArgs } from '@/app/types';

export type MainAction =
  | { type: 'CHANGED_CELLS'; payload: { changes: CellsChangedArgs } }
  | { type: 'CHANGED_NODES'; payload: { changes: NodeChange[] } }
  | { type: 'ADDED_CONNECTION'; payload: { connection: Connection } }
  | { type: 'CLICK_REMOVE_EDGE'; payload: { id: string } }
  | { type: 'GRID/CLICK_ADD_CONDITION_ROW' }
  | { type: 'GRID/CLICK_ADD_ACTION_ROW' }
  | { type: 'GRID/CLICK_REMOVE_ROW'; payload: { row: number } };
