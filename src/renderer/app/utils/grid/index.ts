import { applyCellsChanges } from './applyCellsChanges';
import { findActionRow } from './findActionRow';
import { mergeRules } from './mergeRules';
import { toActions } from './toActions';
import { toConditions } from './toConditions';

export const Grid = {
  applyCellsChanges,
  findActionRow,
  mergeRules,
  toActions,
  toConditions,
} as const;
