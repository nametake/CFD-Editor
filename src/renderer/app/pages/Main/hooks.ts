import { Dispatch, useCallback, useReducer } from 'react';
import ReactDataSheet from 'react-datasheet';
import { Connection, NodeChange } from 'react-flow-renderer';

import { CellType, Edge } from '@/app/types';
import { CauseFlowProps } from '@/app/ui/CauseFlow';
import { DecisionTableProps } from '@/app/ui/DecisionTable';

import { MainAction, initialState, reducer } from './state';

const mapCellEvent =
  (dispatch: Dispatch<MainAction>, rowNumber: number) =>
    (cell: CellType): CellType => {
      if (
        cell.value.type === 'ADD_CONDITION_ROW_BUTTON' ||
        cell.value.type === 'ADD_ACTION_ROW_BUTTON'
      ) {
        const handleClick = () => {
          dispatch({
            type: 'CLICK_ADD_ROW_BOTTOM_BUTTON',
            payload: { row: rowNumber },
          });
        };
        return {
          ...cell,
          forceComponent: true,
          value: {
            ...cell.value,
            onClick: handleClick,
          },
        };
      }

      if (cell.value.type === 'REMOVE_ROW') {
        const handleClick = () => {
          dispatch({
            type: 'CLICK_REMOVE_ROW_BUTTON',
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

      return cell;
    };

const mapEdgeEvent =
  (dispatch: Dispatch<MainAction>) =>
    (edge: Edge): Edge => ({
      ...edge,
      data: {
        onClickRemove: () => {
          dispatch({ type: 'CLICK_REMOVE_EDGE', payload: { id: edge.id } });
        },
      },
    });

type UseMainResult = {
  causeFlowProps: CauseFlowProps;
  decisionTableProps: DecisionTableProps;
};

export const useMain = (): UseMainResult => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return {
    causeFlowProps: {
      nodes: state.nodes,
      edges: state.edges.map(mapEdgeEvent(dispatch)),
      onNodesChange: useCallback((changes: NodeChange[]) => {
        dispatch({ type: 'CHANGED_NODES', payload: { changes } });
      }, []),
      onConnect: useCallback((connection: Connection) => {
        dispatch({ type: 'ADDED_CONNECTION', payload: { connection } });
      }, []),
    },
    decisionTableProps: {
      data: state.grid.map((row, rowNumber) =>
        row.map(mapCellEvent(dispatch, rowNumber))
      ),
      onCellsChanged: useCallback(
        (changes: ReactDataSheet.CellsChangedArgs<CellType>) => {
          dispatch({ type: 'CHANGED_CELLS', payload: { changes } });
        },
        []
      ),
    },
  };
};
