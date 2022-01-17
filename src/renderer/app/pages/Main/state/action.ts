import { Connection, NodeChange } from 'react-flow-renderer';

import { CellsChangedArgs } from '@/app/types';

export type MainAction =
  | { type: 'NODE/CHANGED_NODES'; payload: { changes: NodeChange[] } }
  | { type: 'NODE/ADDED_CONNECTION'; payload: { connection: Connection } }
  | { type: 'NODE/CLICK_REMOVE_EDGE'; payload: { id: string } }
  | { type: 'GRID/CHANGED_CELLS'; payload: { changes: CellsChangedArgs } }
  | { type: 'GRID/CLICK_ADD_CONDITION_ROW' }
  | { type: 'GRID/CLICK_ADD_ACTION_ROW' }
  | { type: 'GRID/CLICK_REMOVE_ROW'; payload: { row: number } };
