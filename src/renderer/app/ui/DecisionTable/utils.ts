import { Action, ActionStub, Condition, ConditionStub } from '@/app/types';

import { CellType, MAIN_COLUMN, STUB_COLUMN } from './types';

const makeId = ({ row, col }: { row: number; col: number }) => `${row}-${col}`;

const getName = (cell: CellType): string => {
  if (cell.value.type === 'TEXT') {
    return cell.value.value ?? '';
  }
  return '';
};


type RowRange = {
  start: number;
  end: number;
};

type MakeConditionsOption = {
  mainColumn?: number;
  stubColumn?: number;
};

export const makeConditions = (
  grid: CellType[][],
  option?: MakeConditionsOption
): Condition[] => {
  const conditionColumn = option?.mainColumn ?? MAIN_COLUMN;
  const conditionStubColumn =
    option?.stubColumn ?? STUB_COLUMN;

  const headerRows = grid.reduce<number[]>((prev, row, index) => {
    if (row[conditionColumn].value.type !== 'TITLE') return prev;
    return [...prev, index];
  }, []);

  // TODO remove magic number
  const actionHeaderRow = headerRows[1];

  const conditionRowRanges = grid.reduce<RowRange[]>(
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

  const conditions = conditionRowRanges.map<Condition>((rowRange) => {
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

type MakeActionsOption = {
  mainColumn?: number;
  stubColumn?: number;
};

export const makeActions = (grid: CellType[][], option?: MakeActionsOption): Action[] => {
  const conditionColumn = option?.mainColumn ?? MAIN_COLUMN;
  const conditionStubColumn =
    option?.stubColumn ?? STUB_COLUMN;

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

  const actions = actionRowRanges.map<Action>((rowRange) => {
    const cell = grid[rowRange.start][conditionColumn];
    const action: Action = {
      id: makeId({ row: rowRange.start, col: conditionColumn }),
      name: getName(cell),
      stub: grid
        .slice(rowRange.start, rowRange.end)
        .map<ActionStub>((row, i): ActionStub => {
          const c = row[conditionStubColumn];
          return {
            id: makeId({
              row: rowRange.start + i,
              col: conditionStubColumn,
            }),
            actionId: makeId({ row: rowRange.start, col: conditionColumn }),
            name: getName(c),
          };
        }),
    };
    return action;
  });

  return actions
}
