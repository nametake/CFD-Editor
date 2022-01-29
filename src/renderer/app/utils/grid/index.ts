import { applyCellsChanges } from './applyCellsChanges';
import { findActionRow } from './findActionRow';
import { mergeRules } from './mergeRules';
import { toActions } from './toActions';
import { toConditions } from './toConditions';

type GridType = {
  applyCellsChanges: typeof applyCellsChanges;
  findActionRow: typeof findActionRow;
  mergeRules: typeof mergeRules;
  toActions: typeof toActions;
  toConditions: typeof toConditions;
};

export const Grid: GridType = {
  applyCellsChanges,
  findActionRow,
  mergeRules,
  toActions,
  toConditions,
} as const;
