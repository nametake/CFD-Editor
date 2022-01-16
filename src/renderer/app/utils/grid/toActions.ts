import {
  Action,
  ActionStub,
  CellType,
  NAME_COLUMN,
  STUB_COLUMN,
} from '@/app/types';

import { RowRange, getName, makeId } from './utils';

type ToActionsOption = {
  mainColumn?: number;
  stubColumn?: number;
};

export const toActions = (
  grid: CellType[][],
  option?: ToActionsOption
): Action[] => {
  const conditionColumn = option?.mainColumn ?? NAME_COLUMN;
  const conditionStubColumn = option?.stubColumn ?? STUB_COLUMN;

  const headerRows = grid.reduce<number[]>((prev, row, index) => {
    if (row[conditionColumn].value.type !== 'TITLE') return prev;
    return [...prev, index];
  }, []);

  // TODO remove magic number
  const actionHeaderRow = headerRows[1];

  const actionRowRanges = grid.reduce<RowRange[]>(
    (prev, row, rowIndex): RowRange[] => {
      const cell = row[conditionColumn];
      if (actionHeaderRow > rowIndex) return prev;
      if (cell.value.type !== 'TEXT') return prev;

      // new condition
      if (cell.value.value !== null) {
        return [...prev, { start: rowIndex, end: rowIndex + 1 }];
      }

      // update condtion end
      const lastRowRange = prev[prev.length - 1];
      if (!lastRowRange) return prev;

      return [
        ...prev.slice(0, prev.length - 1),
        { ...lastRowRange, end: rowIndex + 1 },
      ];
    },
    []
  );

  const actions = actionRowRanges
    .map<Action | null>((rowRange) => {
      const cell = grid[rowRange.start][conditionColumn];
      const actionName = getName(cell);
      if (!actionName) {
        return null;
      }
      const action: Action = {
        id: makeId({ row: rowRange.start, col: conditionColumn }),
        name: actionName,
        stub: grid
          .slice(rowRange.start, rowRange.end)
          .map<ActionStub | null>((row, i): ActionStub | null => {
            const c = row[conditionStubColumn];
            const name = getName(c);
            if (!name) {
              return null;
            }
            return {
              id: makeId({
                row: rowRange.start + i,
                col: conditionStubColumn,
              }),
              actionId: makeId({ row: rowRange.start, col: conditionColumn }),
              name,
            };
          })
          .filter((stub): stub is ActionStub => stub !== null),
      };
      return action;
    })
    .filter((action): action is Action => action !== null);

  return actions;
};
