import { Condition, ConditionStub } from '@/app/types';

import { CONDITION_COLUMN, CONDITION_STUB_COLUMN, CellType } from './types';

const makeId = ({ row, col }: { row: number; col: number }) => `${row}-${col}`;

const getName = (cell: CellType): string => {
  if (cell.value.type === 'TEXT') {
    return cell.value.value ?? '';
  }
  return '';
};

type MakeConditionOption = {
  conditionColumn?: number;
  conditionStubColumn?: number;
};

type RowRange = {
  start: number;
  end: number;
};

export const makeCondition = (
  grid: CellType[][],
  option?: MakeConditionOption
): Condition[] => {
  const conditionColumn = option?.conditionColumn ?? CONDITION_COLUMN;
  const conditionStubColumn =
    option?.conditionStubColumn ?? CONDITION_STUB_COLUMN;

  const headerRows = grid.reduce<number[]>((prev, row, index) => {
    if (row[conditionColumn].value.type !== 'TITLE') return prev;
    return [...prev, index];
  }, []);

  const actionHeaderRow = headerRows[1];

  const conditionRowRange = grid.reduce<RowRange[]>(
    (prev, row, rowIndex): RowRange[] => {
      const cell = row[conditionColumn];
      if (actionHeaderRow <= rowIndex) return prev;
      if (cell.value.type !== 'TEXT') return prev;

      // new condition
      if (cell.value.value !== null) {
        return [...prev, { start: rowIndex, end: rowIndex }];
      }

      // update condtion end
      const lastRowRange = prev[prev.length - 1];

      return [
        ...prev.slice(0, prev.length - 1),
        { ...lastRowRange, end: rowIndex + 1 },
      ];
    },
    []
  );

  const conditions = conditionRowRange.map<Condition>((rowRange) => {
    const cell = grid[rowRange.start][conditionColumn];
    const condition: Condition = {
      id: makeId({ row: rowRange.start, col: conditionColumn }),
      name: getName(cell),
      stub: grid
        .slice(rowRange.start, rowRange.end)
        .map<ConditionStub>((row, i): ConditionStub => {
          const c = row[conditionStubColumn];
          return {
            id: makeId({
              row: rowRange.start + i,
              col: conditionStubColumn,
            }),
            conditionId: makeId({ row: rowRange.start, col: conditionColumn }),
            name: getName(c),
          };
        }),
    };
    return condition;
  });

  return conditions;
};
