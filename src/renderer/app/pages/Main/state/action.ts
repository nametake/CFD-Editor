import { Connection, NodeChange } from 'react-flow-renderer';

import { CellsChangedArgs } from '@/app/types';

export type MainAction =
  | { type: 'INITIALIZE' }
  | { type: 'CAUSE_FLOW/REMOVE_ALL_EDGES' }
  | { type: 'CAUSE_FLOW/ALIGN_NODES' }
  | { type: 'CAUSE_FLOW/CHANGED_NODES'; payload: { changes: NodeChange[] } }
  | { type: 'CAUSE_FLOW/DRAG_STOP' }
  | { type: 'CAUSE_FLOW/ADDED_CONNECTION'; payload: { connection: Connection } }
  | { type: 'CAUSE_FLOW/CLICK_REMOVE_EDGE'; payload: { id: string } }
  | { type: 'CAUSE_FLOW/CHANGE_EDGE_ID'; payload: { edgeId: string } }
  | { type: 'DECISION_TABLE/CHANGE_INVALID_FLAG'; payload: { row: number } }
  | {
    type: 'DECISION_TABLE/CHANGED_CELLS';
    payload: { changes: CellsChangedArgs };
  }
  | { type: 'DECISION_TABLE/CLICK_ADD_CONDITION_ROW' }
  | { type: 'DECISION_TABLE/CLICK_ADD_ACTION_ROW' }
  | { type: 'DECISION_TABLE/CLICK_REMOVE_ROW'; payload: { row: number } };
