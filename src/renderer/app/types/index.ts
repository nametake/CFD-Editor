import { CSSProperties } from 'react';
import {
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
} from 'react-flow-renderer';

export type ConditionId = string;
export type ConditionStubId = string;

export type ConditionStub = {
  conditionStubId: ConditionStubId;
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
  conditionStubId: ActionStubId;
  conditionId: ActionId;
  name: string;
};

export type Action = {
  id: ActionId;
  name: string;
  stub: ActionStubId[];
};

export type ConditionRule = {
  conditionStub: ConditionStub;
  rule: 'yes' | 'no';
};

export type ActionRule = {
  actionStub: ActionStub;
  rule: 'yes' | 'none';
};

export type Rule = {
  conditionRules: ConditionRule[];
  actionRules: ActionRule[];
};

export type NodeDataType = {
  label: string;
};

export type CauseNodeDataType = {
  label: {
    text: string;
    style?: CSSProperties;
  };
};

export type CauseNodeType = Omit<ReactFlowNode<CauseNodeDataType>, 'type'> & {
  type: 'cause';
};
export type ElementNodeType = Omit<ReactFlowNode<NodeDataType>, 'type'> & {
  type: 'element';
};
export type ResultNodeType = Omit<ReactFlowNode<NodeDataType>, 'type'> & {
  type: 'result';
};

export type Node = CauseNodeType | ElementNodeType | ResultNodeType;
export type Edge = ReactFlowEdge;

export type NodeType = Node['type'];
