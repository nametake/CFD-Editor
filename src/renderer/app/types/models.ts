export type ConditionId = string;
export type ConditionStubId = string;

export type ConditionStub = {
  id: ConditionStubId;
  conditionId: ConditionId;
  name: string;
};

export type Condition = {
  id: ConditionId;
  name: string;
  stub: ConditionStub[];
};

export type ActionId = string;
export type ActionStubId = string;

export type ActionStub = {
  id: ActionStubId;
  actionId: ActionId;
  name: string;
};

export type Action = {
  id: ActionId;
  name: string;
  stub: ActionStub[];
};

export type Rule = {
  conditionStubIds: ConditionStubId[];
  actionId: ActionId | null;
};
