import { Action, Condition, Rule } from '@/app/types';

export const filterInvalidRules = (
  rules: Rule[],
  conditions: Condition[],
  actions: Action[]
) => {
  const invalidConditionStubIds = conditions.flatMap((condition) =>
    condition.stub.filter((s) => s.type === 'invalid').map((s) => s.id)
  );
  const isInvalidConditionStubId = (id: string): boolean =>
    !!invalidConditionStubIds.find((stubId) => stubId === id);

  const invalidActionStubIds = actions.flatMap((action) =>
    action.stub.filter((s) => s.type === 'invalid').map((s) => s.id)
  );
  const isInvalidActionStubId = (id: string): boolean =>
    !!invalidActionStubIds.find((stubId) => stubId === id);

  const set = new Set<string>();

  return rules.reduce<Rule[]>((prev, rule) => {
    const isAllInvalidIds = rule.actionStubIds.every((id) =>
      isInvalidActionStubId(id)
    );
    if (!isAllInvalidIds) {
      return [...prev, rule];
    }

    const invalidIds = rule.conditionStubIds.filter((id) =>
      isInvalidConditionStubId(id)
    );
    if (invalidIds.length === 0) {
      return [...prev, rule];
    }

    const existId = invalidIds.find((id) => !set.has(id));
    if (existId === undefined) {
      return prev;
    }

    set.add(existId);
    return [...prev, rule];
  }, []);
};
