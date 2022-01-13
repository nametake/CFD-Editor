import {
  Action,
  ActionStub,
  CellType,
  Condition,
  ConditionStub,
  MAIN_COLUMN,
  Rule,
  STUB_COLUMN,
} from '@/app/types';

const makeId = ({ row, col }: { row: number; col: number }) => `${row}-${col}`;

const getName = (cell: CellType): string | null => {
  if (cell.value.type === 'TEXT') {
    return cell.value.value;
  }
  return null;
};

type RowRange = {
  start: number;
  end: number;
};

type ToConditionsOption = {
  mainColumn?: number;
  stubColumn?: number;
};

const toCondition = (
  grid: CellType[][],
  option?: ToConditionsOption
): Condition[] => {
  const conditionColumn = option?.mainColumn ?? MAIN_COLUMN;
  const conditionStubColumn = option?.stubColumn ?? STUB_COLUMN;

  const headerRows = grid.reduce<number[]>((prev, row, index) => {
    if (row[conditionColumn].value.type !== 'TITLE') return prev;
    return [...prev, index];
  }, []);

  // TODO remove magic number
  const actionHeaderRow = headerRows[1];

  // TODO split other function
  const conditionRowRanges = grid.reduce<RowRange[]>(
    (prev, row, rowIndex): RowRange[] => {
      const cell = row[conditionColumn];
      if (actionHeaderRow <= rowIndex) return prev;
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

  const conditions = conditionRowRanges
    .map<Condition | null>((rowRange) => {
      const cell = grid[rowRange.start][conditionColumn];
      const conditionName = getName(cell);
      if (!conditionName) {
        return null;
      }
      const condition: Condition = {
        id: makeId({ row: rowRange.start, col: conditionColumn }),
        name: conditionName,
        stub: grid
          .slice(rowRange.start, rowRange.end)
          .map<ConditionStub | null>((row, i): ConditionStub | null => {
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
              conditionId: makeId({
                row: rowRange.start,
                col: conditionColumn,
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

type ToActionsOption = {
  mainColumn?: number;
  stubColumn?: number;
};

const toActions = (grid: CellType[][], option?: ToActionsOption): Action[] => {
  const conditionColumn = option?.mainColumn ?? MAIN_COLUMN;
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

// TODO Test
export const mergeRules = (grid: CellType[][], rules: Rule[]): CellType[][] => {
  const newGrid = grid.map((row) => row.slice(0, 3));
  const headerRows = grid.reduce<number[]>((prev, row, index) => {
    if (row[MAIN_COLUMN].value.type !== 'TITLE') return prev;
    return [...prev, index];
  }, []);

  // TODO remove magic number
  const actionHeaderRow = headerRows[1];
  rules.forEach((rule, ruleIndex) => {
    newGrid.forEach((row, i) => {
      const isConditionHeader = i === 0 && row[1].value.type === 'TITLE';
      const isActionHeader = i !== 0 && row[1].value.type === 'TITLE';
      if (isConditionHeader) {
        newGrid[i] = [
          ...row,
          {
            value: { type: 'TITLE', value: `${ruleIndex + 1}` },
            readOnly: true,
          },
        ];
        return;
      }
      if (isActionHeader) {
        newGrid[i] = [...row, { value: { type: 'EMPTY' }, readOnly: true }];
        return;
      }

      const stubId = makeId({ row: i, col: STUB_COLUMN });
      if (actionHeaderRow > i) {
        if (rule.conditionStubIds.find((id) => id === stubId)) {
          newGrid[i] = [
            ...row,
            { value: { type: 'CONDITION_RULE', value: 'yes' } },
          ];
          return;
        }
        newGrid[i] = [
          ...row,
          { value: { type: 'CONDITION_RULE', value: 'no' } },
        ];
        return;
      }
      if (stubId === rule.actionId) {
        newGrid[i] = [
          ...row,
          { value: { type: 'CONDITION_RULE', value: 'yes' } },
        ];
        return;
      }
      newGrid[i] = [...row, { value: { type: 'CONDITION_RULE', value: 'no' } }];
    });
  });

  return newGrid;
};

export const Grid = {
  makeId,
  toCondition,
  toActions,
  mergeRules,
};
