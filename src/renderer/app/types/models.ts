type Location = {
  column: number;
  row: number;
};

export type ConditionStub = {
  id: string;
  type: 'valid' | 'invalid';
  conditionId: string;
  name: string;
  location: Location;
};

export type Condition = {
  id: string;
  name: string;
  stub: ConditionStub[];
  location: Location;
};

export type ActionStub = {
  id: string;
  type: 'valid' | 'invalid';
  actionId: string;
  name: string;
  location: Location;
};

export type Action = {
  id: string;
  name: string;
  stub: ActionStub[];
  location: Location;
};

export type Rule = {
  conditionStubIds: string[];
  actionStubIds: string[];
};
