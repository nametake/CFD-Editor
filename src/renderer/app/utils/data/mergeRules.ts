import { CellType, MAIN_COLUMN, Rule, STUB_COLUMN } from '@/app/types';
import { makeId } from '@/app/ui/DecisionTable';

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
