import { Action, CellType, Condition, Rule } from '@/app/types';

import { findActionRow } from './findActionRow';

type MergeRulesOption = {
  nameColumn: number;
  stubColumn: number;
};

export const mergeRules = (
  grid: CellType[][],
  conditions: Condition[],
  actions: Action[],
  rules: Rule[],
  option: MergeRulesOption
): CellType[][] => {
  const { nameColumn, stubColumn } = option;

  const conditionStubs = conditions.flatMap((condition) => condition.stub);
  const actionStubs = actions.flatMap((action) => action.stub);

  const newGrid = grid.map((row) => row.slice(0, stubColumn + 1));

  const actionHeaderRow = findActionRow(newGrid);

  rules.forEach((rule, ruleIndex) => {
    newGrid.forEach((row, rowIndex) => {
      const isConditionHeader =
        rowIndex === 0 && row[nameColumn].value.type === 'CONDITION_HEADER';
      const isActionHeader =
        rowIndex !== 0 && row[nameColumn].value.type === 'ACTION_HEADER';

      // --- Condition header ---
      if (isConditionHeader) {
        newGrid[rowIndex] = [
          ...row,
          { value: { type: 'CONDITION_HEADER', value: `${ruleIndex + 1}` } },
        ];
        return;
      }

      // --- Action header ---
      if (isActionHeader) {
        newGrid[rowIndex] = [
          ...row,
          { value: { type: 'ACTION_HEADER', value: null } },
        ];
        return;
      }

      // --- Stub cell empty ---
      const stubCell = row[stubColumn];
      if (
        (stubCell.value.type === 'CONDITION_STUB' ||
          stubCell.value.type === 'ACTION_STUB') &&
        !stubCell.value.value
      ) {
        newGrid[rowIndex] = [...row, { value: { type: 'EMPTY' } }];
        return;
      }

      // --- Condition rule ---
      if (actionHeaderRow > rowIndex) {
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

      // --- Action rule ---
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
    });
  });

  return newGrid;
};
