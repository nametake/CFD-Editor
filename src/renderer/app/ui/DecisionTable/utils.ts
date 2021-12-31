import { Condition } from '@/app/types';

import { CONDITION_COLUMN, CellType } from './types';

type MakeConditionOption = {
  conditionColumn?: number;
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
        { ...lastRowRange, end: rowIndex },
      ];
    },
    []
  );

  // eslint-disable-next-line no-console
  console.log(conditionRowRange);

  return [];
};
