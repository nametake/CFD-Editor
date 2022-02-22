import { alignElementNodes } from './alignElementNodes';
import { alignParentNodes } from './alignParentNodes';
import { fromActions } from './fromAction';
import { fromConditions } from './fromConditions';
import { mapStyle } from './mapStyle';
import { merge } from './merge';
import { traverseRules } from './traverseRules';

type NodesType = {
  alignElementNodes: typeof alignElementNodes;
  alignParentNodes: typeof alignParentNodes;
  fromActions: typeof fromActions;
  fromConditions: typeof fromConditions;
  mapStyle: typeof mapStyle;
  merge: typeof merge;
  traverseRules: typeof traverseRules;
};

export const Nodes: NodesType = {
  alignElementNodes,
  alignParentNodes,
  fromActions,
  fromConditions,
  mapStyle,
  merge,
  traverseRules,
} as const;
