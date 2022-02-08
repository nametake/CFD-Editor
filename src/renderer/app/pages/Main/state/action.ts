import { Connection, NodeChange } from 'react-flow-renderer';

import { CellsChangedArgs } from '@/app/types';

export type MainAction =
  | { type: 'CAUSE_FLOW/CHANGED_NODES'; payload: { changes: NodeChange[] } }
  | { type: 'CAUSE_FLOW/ADDED_CONNECTION'; payload: { connection: Connection } }
  | { type: 'CAUSE_FLOW/CLICK_REMOVE_EDGE'; payload: { id: string } }
  | {
      type: 'DECISION_TABLE/CHANGED_CELLS';
      payload: { changes: CellsChangedArgs };
    }
  | { type: 'DECISION_TABLE/CLICK_ADD_CONDITION_ROW' }
  | { type: 'DECISION_TABLE/CLICK_ADD_ACTION_ROW' }
  | { type: 'DECISION_TABLE/CLICK_REMOVE_ROW'; payload: { row: number } };
