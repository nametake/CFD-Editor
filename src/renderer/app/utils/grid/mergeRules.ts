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

      // --- Condition header ---
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

      // --- Action header ---
      if (isActionHeader) {
        newGrid[i] = [...row, { value: { type: 'EMPTY' }, readOnly: true }];
        return;
      }

      // --- Stub cell empty ---
      const stubCell = row[stubColumn];
      if (
        (stubCell.value.type === 'CONDITION_STUB' ||
          stubCell.value.type === 'ACTION_STUB') &&
        !stubCell.value.value
      ) {
        newGrid[i] = [...row, { value: { type: 'EMPTY' } }];
        return;
      }

      const stubId = makeId({ row: i, col: stubColumn });

      // --- Condition rule ---
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

      // --- Action rule ---
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
