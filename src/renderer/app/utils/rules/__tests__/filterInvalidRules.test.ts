import { filterInvalidRules } from '../filterInvalidRules';
import { Action, Condition, Rule } from '@/app/types';


describe('filterInvalidRules', () => {
  test('###', () => {
    const rules: Rule[] = [];

    const conditions: Condition[] = [];

    const actions: Action[] = [];

    const expected: Rule[] = [];

    expect(filterInvalidRules(rules, conditions, actions)).toStrictEqual(
      expected
    );
  });
});
