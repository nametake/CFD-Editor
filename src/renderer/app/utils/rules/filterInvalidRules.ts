import { Action, Condition, Rule } from '@/app/types';

export const filterInvalidRules = (
  rules: Rule[],
  conditions: Condition[],
  actions: Action[]
) => {
  const invalidConditionStubIds = conditions.flatMap((condition) =>
    condition.stub.filter((s) => s.type === 'invalid').map((s) => s.id)
  );
  const invalidAcitonStubIds = actions.flatMap((action) =>
    action.stub.filter((s) => s.type === 'invalid').map((s) => s.id)
  );

  const set = new Set<string>();

  return rules.reduce<Rule[]>((prev, rule) => {
    const isAllInvalidIds = rule.actionStubIds.every((ruleActionId) =>
      invalidAcitonStubIds.find((id) => id === ruleActionId)
    );
    if (!isAllInvalidIds) {
      return [...prev, rule];
    }

    const invalidIds = rule.conditionStubIds.filter((id) =>
      invalidConditionStubIds.find((i) => i === id)
    );
    if (invalidIds.length === 0) {
      return [...prev, rule];
    }

    const exist = invalidIds.find((id) => !set.has(id));
    if (exist === undefined) {
      return prev;
    }

    set.add(exist);
    return [...prev, rule];
  }, []);
};
