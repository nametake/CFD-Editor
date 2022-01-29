import { alignElementNodes } from './alignElementNodes';
import { alignParentNodes } from './alignParentNodes';
import { fromActions } from './fromAction';
import { fromConditions } from './fromConditions';
import { mapStyle } from './mapStyle';
import { traverseRules } from './traverseRules';

export const Node = {
  alignElementNodes,
  alignParentNodes,
  fromActions,
  fromConditions,
  mapStyle,
  traverseRules,
} as const;
