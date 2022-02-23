import { CellType, Condition, ConditionStub } from '@/app/types';

import { findActionRow } from './findActionRow';
import { RowRange, getInvalidType, getName } from './utils';

const makeConditionId = (nameIndex: number) => `condition-${nameIndex}`;

const makeConditionStubId = (nameIndex: number, stubIndex: number) =>
  `condition-stub-${nameIndex}-${stubIndex}`;

type ToConditionsOption = {
  nameColumn: number;
  stubColumn: number;
};

export const toConditions = (
  grid: CellType[][],
  option: ToConditionsOption
): Condition[] => {
  const { nameColumn, stubColumn } = option;

  const actionHeaderRow = findActionRow(grid);

  const conditionRowRanges = grid.reduce<RowRange[]>(
    (prev, row, rowIndex): RowRange[] => {
      const cell = row[nameColumn];
      if (actionHeaderRow <= rowIndex) return prev;
      if (cell.value.type !== 'CONDITION_NAME') return prev;

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

  const conditions = conditionRowRanges
    .map<Condition | null>((rowRange, nameIndex) => {
      const cell = grid[rowRange.start][nameColumn];
      const conditionName = getName(cell);
      if (!conditionName) {
        return null;
      }

      type ConditionStubWithoutId = Omit<ConditionStub, 'id'>;
      const condition: Condition = {
        id: makeConditionId(nameIndex),
        name: conditionName,
        stub: grid
          .slice(rowRange.start, rowRange.end)
          .map<ConditionStubWithoutId | null>((row, rowIndex) => {
            const c = row[stubColumn];
            const name = getName(c);
            if (!name) {
              return null;
            }
            return {
              conditionId: makeConditionId(nameIndex),
              type: getInvalidType(row),
              name,
              location: {
                column: stubColumn,
                row: rowRange.start + rowIndex,
              },
            };
          })
          .filter((stub): stub is ConditionStubWithoutId => stub !== null)
          .map<ConditionStub>((stub, stubIndex) => ({
            ...stub,
            id: makeConditionStubId(nameIndex, stubIndex),
          })),
        location: {
          column: nameColumn,
          row: rowRange.start,
        },
      };
      return condition;
    })
    .filter((condition): condition is Condition => condition !== null);

  return conditions;
};
