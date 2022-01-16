import { CellType, NAME_COLUMN, Rule, STUB_COLUMN } from '@/app/types';

import { findActionRow } from './findActionRow';
import { makeId } from './utils';

type MergeRulesOption = {
  nameColumn?: number;
  stubColumn?: number;
};

export const mergeRules = (
  grid: CellType[][],
  rules: Rule[],
  option?: MergeRulesOption
): CellType[][] => {
  const nameColumn = option?.nameColumn ?? NAME_COLUMN;
  const stubColumn = option?.stubColumn ?? STUB_COLUMN;

  const newGrid = grid.map((row) => row.slice(0, 3));

  const actionHeaderRow = findActionRow(newGrid);

  rules.forEach((rule, ruleIndex) => {
    newGrid.forEach((row, i) => {
      const isConditionHeader =
        i === 0 && row[nameColumn].value.type === 'CONDITION_HEADER';
      const isActionHeader =
        i !== 0 && row[nameColumn].value.type === 'ACTION_HEADER';
      if (isConditionHeader) {
        newGrid[i] = [
          ...row,
          {
            value: { type: 'CONDITION_HEADER', value: `${ruleIndex + 1}` },
            readOnly: true,
          },
        ];
        return;
      }
      if (isActionHeader) {
        newGrid[i] = [...row, { value: { type: 'EMPTY' }, readOnly: true }];
        return;
      }

      const stubId = makeId({ row: i, col: stubColumn });
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
