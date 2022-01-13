import React, { Dispatch, useCallback, useReducer } from 'react';
import ReactDataSheet from 'react-datasheet';
import { Connection, NodeChange } from 'react-flow-renderer';

import { CellType, Edge } from '@/app/types';
import { Button } from '@/app/ui/Button';
import { CauseFlowProps } from '@/app/ui/CauseFlow';
import { DecisionTableProps } from '@/app/ui/DecisionTable';

import { MainAction, initialState, reducer } from './state';

const mapCellButton = (dispatch: Dispatch<MainAction>, rowNumber: number) =>
  function innerMapCellButton(cell: CellType): CellType {
    if (cell.value.type === 'HEADER_ADD_ROW_BUTTON') {
      const handleClick = () => {
        dispatch({
          type: 'CLICK_ADD_ROW_BOTTOM_BUTTON',
          payload: { row: rowNumber },
        });
      };
      return {
        ...cell,
        forceComponent: true,
        component: (
          <Button type="button" onClick={handleClick}>
            +
          </Button>
        ),
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
        forceComponent: true,
        component: (
          <Button type="button" onClick={handleClick}>
            -
          </Button>
        ),
      };
    }

    return cell;
  };

const mapEdgeButton =
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
      edges: state.edges.map(mapEdgeButton(dispatch)),
      onNodesChange: useCallback((changes: NodeChange[]) => {
        dispatch({ type: 'CHANGED_NODES', payload: { changes } });
      }, []),
      onConnect: useCallback((connection: Connection) => {
        dispatch({ type: 'ADDED_CONNECTION', payload: { connection } });
      }, []),
    },
    decisionTableProps: {
      data: state.grid.map((row, rowNumber) =>
        row.map(mapCellButton(dispatch, rowNumber))
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
