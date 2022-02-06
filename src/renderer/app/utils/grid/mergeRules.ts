import { Action, CellType, Condition, Rule } from '@/app/types';
import { assertUnreachable } from '@/app/utils/assert';

type MergeRulesOption = {
  nameColumn: number;
  stubColumn: number;
};

type RowType =
  | 'CONDITION_HEADER'
  | 'ACTION_HEADER'
  | 'CONDITION_ROW'
  | 'ACTION_ROW'
  | 'EMPTY_STUB_ROW';

const getRowType = (
  row: CellType[],
  rowIndex: number,
  option: MergeRulesOption
): RowType => {
  const { nameColumn, stubColumn } = option;
  if (rowIndex === 0 && row[nameColumn].value.type === 'CONDITION_HEADER') {
    return 'CONDITION_HEADER';
  }

  if (rowIndex !== 0 && row[nameColumn].value.type === 'ACTION_HEADER') {
    return 'ACTION_HEADER';
  }

  const { value } = row[stubColumn];

  if (value.type === 'CONDITION_STUB' && value.value) {
    return 'CONDITION_ROW';
  }

  if (value.type === 'ACTION_STUB' && value.value) {
    return 'ACTION_ROW';
  }

  return 'EMPTY_STUB_ROW';
};

export const mergeRules = (
  grid: CellType[][],
  conditions: Condition[],
  actions: Action[],
  rules: Rule[],
  option: MergeRulesOption
): CellType[][] => {
  const { stubColumn } = option;

  const conditionStubs = conditions.flatMap((condition) => condition.stub);
  const actionStubs = actions.flatMap((action) => action.stub);

  const newGrid = grid.map((row) => row.slice(0, stubColumn + 1));

  rules.forEach((rule, ruleIndex) => {
    newGrid.forEach((row, rowIndex) => {
      const type = getRowType(row, rowIndex, option);
      switch (type) {
        case 'CONDITION_HEADER': {
          newGrid[rowIndex] = [
            ...row,
            { value: { type: 'CONDITION_HEADER', value: `${ruleIndex + 1}` } },
          ];
          return;
        }
        case 'ACTION_HEADER': {
          newGrid[rowIndex] = [
            ...row,
            { value: { type: 'ACTION_HEADER', value: null } },
          ];
          return;
        }
        case 'CONDITION_ROW': {
          const conditionStub = conditionStubs.find(
            (c) => c.location.row === rowIndex
          );
          if (rule.conditionStubIds.find((id) => id === conditionStub?.id)) {
            newGrid[rowIndex] = [
              ...row,
              { value: { type: 'CONDITION_RULE', value: 'yes' } },
            ];
            return;
          }
          newGrid[rowIndex] = [
            ...row,
            { value: { type: 'CONDITION_RULE', value: 'no' } },
          ];
          return;
        }
        case 'ACTION_ROW': {
          const actionStub = actionStubs.find(
            (stub) => stub.location.row === rowIndex
          );
          if (rule.actionId === actionStub?.id) {
            newGrid[rowIndex] = [
              ...row,
              { value: { type: 'CONDITION_RULE', value: 'yes' } },
            ];
            return;
          }
          newGrid[rowIndex] = [
            ...row,
            { value: { type: 'CONDITION_RULE', value: 'no' } },
          ];
          return;
        }
        case 'EMPTY_STUB_ROW': {
          newGrid[rowIndex] = [...row, { value: { type: 'EMPTY' } }];
          break;
        }
        default:
          assertUnreachable(type);
          
      }
    });
  });

  return newGrid;
};
