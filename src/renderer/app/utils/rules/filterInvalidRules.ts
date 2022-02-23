import { Action, Condition, Rule } from '@/app/types';

export const filterInvalidRules = (
  rules: Rule[],
  _conditions: Condition[],
  _actions: Action[]
) => rules;
