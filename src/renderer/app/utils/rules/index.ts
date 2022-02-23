import { filterInvalidRules } from './filterInvalidRules';

type RulesType = {
  filterInvalidRules: typeof filterInvalidRules;
};

export const Rules: RulesType = {
  filterInvalidRules,
} as const;
