import { ChangeEvent, Dispatch, useCallback, } from 'react';
import ReactDataSheet from 'react-datasheet';
import { Connection, NodeChange } from 'react-flow-renderer';

import { useQueryStringReducer } from '@/app/hooks/useQueryStringReducer';
import { CellType, Edge } from '@/app/types';
import { CauseFlowProps } from '@/app/ui/CauseFlow';
import { DecisionTableProps } from '@/app/ui/DecisionTable';

import { MainAction, MainState, initialState, reducer } from './state';

const mapCellEvent =
  (dispatch: Dispatch<MainAction>, rowNumber: number) =>
    (cell: CellType): CellType => {
      if (cell.value.type === 'ADD_CONDITION_ROW_BUTTON') {
        return {
          ...cell,
          forceComponent: true,
          value: {
            ...cell.value,
            onClick: () => {
              dispatch({ type: 'DECISION_TABLE/CLICK_ADD_CONDITION_ROW' });
            },
          },
        };
      }

      if (cell.value.type === 'ADD_ACTION_ROW_BUTTON') {
        return {
          ...cell,
          forceComponent: true,
          value: {
            ...cell.value,
            onClick: () => {
              dispatch({ type: 'DECISION_TABLE/CLICK_ADD_ACTION_ROW' });
            },
          },
        };
      }

      if (cell.value.type === 'REMOVE_ROW') {
        const handleClick = () => {
          dispatch({
            type: 'DECISION_TABLE/CLICK_REMOVE_ROW',
            payload: { row: rowNumber },
          });
        };
        return {
          ...cell,
          value: {
            ...cell.value,
            onClick: handleClick,
          },
        };
      }

      if (cell.value.type === 'INVALID_FLAG') {
        const handleChange = () => {
          dispatch({
            type: 'DECISION_TABLE/CHANGE_INVALID_FLAG',
            payload: { row: rowNumber },
          });
        };
        return {
          ...cell,
          value: {
            ...cell.value,
            onChange: handleChange,
          },
        };
      }

      return cell;
    };

const mapEdgeEvent =
  (dispatch: Dispatch<MainAction>) =>
    (edge: Edge): Edge => ({
      ...edge,
      data: {
        ...edge.data,
        onClickRemove: () => {
          dispatch({
            type: 'CAUSE_FLOW/CLICK_REMOVE_EDGE',
            payload: { id: edge.id },
          });
        },
      },
    });

type UseMainArgs = {
  initialState?: MainState;
};

type UseMainResult = {
  causeFlowProps: CauseFlowProps;
  decisionTableProps: DecisionTableProps;
};

export const useMain = (args?: UseMainArgs): UseMainResult => {
  const [state, dispatch] = useQueryStringReducer(
    reducer,
    args?.initialState ?? initialState,
    {
      from: () => initialState,
      to: (s) => {
        const { value } = s.grid[1][3]
        return new URLSearchParams({ data: value.type === 'CONDITION_NAME' ? value.value ?? '' : '' })
      }
    }
  );
  return {
    causeFlowProps: {
      nodes: state.nodes,
      edges: state.edges.map(mapEdgeEvent(dispatch)),
      onNodesChange: useCallback((changes: NodeChange[]) => {
        dispatch({ type: 'CAUSE_FLOW/CHANGED_NODES', payload: { changes } });
      }, [dispatch]),
      onNodeDragStop: useCallback(() => {
        dispatch({ type: 'CAUSE_FLOW/DRAG_STOP' });
      }, [dispatch]),
      onConnect: useCallback((connection: Connection) => {
        dispatch({
          type: 'CAUSE_FLOW/ADDED_CONNECTION',
          payload: { connection },
        });
      }, [dispatch]),
      onClickRemoveAllEdgesButton: useCallback(() => {
        dispatch({ type: 'CAUSE_FLOW/REMOVE_ALL_EDGES' });
      }, [dispatch]),
      onClickAlignNodes: useCallback(() => {
        dispatch({ type: 'CAUSE_FLOW/ALIGN_NODES' });
      }, [dispatch]),
      onChangeEdgeId: useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch({
          type: 'CAUSE_FLOW/CHANGE_EDGE_ID',
          payload: { edgeId: value },
        });
      }, [dispatch]),
    },
    decisionTableProps: {
      data: state.grid.map((row, rowNumber) =>
        row.map(mapCellEvent(dispatch, rowNumber))
      ),
      onCellsChanged: useCallback(
        (changes: ReactDataSheet.CellsChangedArgs<CellType>) => {
          dispatch({
            type: 'DECISION_TABLE/CHANGED_CELLS',
            payload: { changes },
          });
        },
        [dispatch]
      ),
    },
  };
};
