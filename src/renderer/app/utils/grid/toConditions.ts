import {
  CellType,
  Condition,
  ConditionStub,
  NAME_COLUMN,
  STUB_COLUMN,
} from '@/app/types';

import { findActionRow } from './findActionRow';
import { RowRange, getName, makeId } from './utils';

type ToConditionsOption = {
  nameColumn?: number;
  stubColumn?: number;
};

export const toConditions = (
  grid: CellType[][],
  option?: ToConditionsOption
): Condition[] => {
  const nameColumn = option?.nameColumn ?? NAME_COLUMN;
  const stubColumn = option?.stubColumn ?? STUB_COLUMN;

  const actionHeaderRow = findActionRow(grid)

  const conditionRowRanges = grid.reduce<RowRange[]>(
    (prev, row, rowIndex): RowRange[] => {
      const cell = row[nameColumn];
      if (actionHeaderRow <= rowIndex) return prev;
      if (cell.value.type !== 'CONDITION_NAME') return prev;

      // new condition
      if (cell.value.value !== null || cell.value.value === '') {
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

  const conditions = conditionRowRanges
    .map<Condition | null>((rowRange) => {
      const cell = grid[rowRange.start][nameColumn];
      const conditionName = getName(cell);
      if (!conditionName) {
        return null;
      }
      const condition: Condition = {
        id: makeId({ row: rowRange.start, col: nameColumn }),
        name: conditionName,
        stub: grid
          .slice(rowRange.start, rowRange.end)
          .map<ConditionStub | null>((row, i): ConditionStub | null => {
            const c = row[stubColumn];
            const name = getName(c);
            if (!name) {
              return null;
            }
            return {
              id: makeId({
                row: rowRange.start + i,
                col: stubColumn,
              }),
              conditionId: makeId({
                row: rowRange.start,
                col: nameColumn,
              }),
              name,
            };
          })
          .filter((stub): stub is ConditionStub => stub !== null),
      };
      return condition;
    })
    .filter((condition): condition is Condition => condition !== null);

  return conditions;
};
