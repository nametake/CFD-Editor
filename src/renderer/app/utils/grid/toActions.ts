import { Action, ActionStub, CellType } from '@/app/types';

import { findActionRow } from './findActionRow';
import { RowRange, getName } from './utils';

const makeActionId = (nameIndex: number) => `action-${nameIndex}`;

const makeActionStubId = (nameIndex: number, stubIndex: number) =>
  `action-stub-${nameIndex}-${stubIndex}`;

type ToActionsOption = {
  nameColumn: number;
  stubColumn: number;
};

export const toActions = (
  grid: CellType[][],
  option: ToActionsOption
): Action[] => {
  const { nameColumn, stubColumn } = option;

  const actionHeaderRow = findActionRow(grid);

  const actionRowRanges = grid.reduce<RowRange[]>(
    (prev, row, rowIndex): RowRange[] => {
      const cell = row[nameColumn];
      if (actionHeaderRow > rowIndex) return prev;
      if (cell.value.type !== 'ACTION_NAME') return prev;

      // new condition
      if (cell.value.value !== null && cell.value.value !== '') {
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
    .map<Action | null>((rowRange, nameIndex) => {
      const cell = grid[rowRange.start][nameColumn];
      const actionName = getName(cell);
      if (!actionName) {
        return null;
      }

      type ActionStubWithoutId = Omit<ActionStub, 'id'>;
      const action: Action = {
        id: makeActionId(nameIndex),
        name: actionName,
        stub: grid
          .slice(rowRange.start, rowRange.end)
          .map<ActionStubWithoutId | null>(
            (row, rowIndex): ActionStubWithoutId | null => {
              const c = row[stubColumn];
              const name = getName(c);
              if (!name) {
                return null;
              }
              return {
                actionId: makeActionId(nameIndex),
                name,
                location: {
                  column: stubColumn,
                  row: rowRange.start + rowIndex,
                },
              };
            }
          )
          .filter((stub): stub is ActionStubWithoutId => stub !== null)
          .map<ActionStub>((stub, stubIndex) => ({
            ...stub,
            id: makeActionStubId(nameIndex, stubIndex),
          })),
        location: {
          column: nameColumn,
          row: rowRange.start,
        },
      };
      return action;
    })
    .filter((action): action is Action => action !== null);

  return actions;
};
