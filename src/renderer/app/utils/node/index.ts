import { alignElementNodes } from './alignElementNodes';
import { fromActions } from './fromAction';
import { fromConditions } from './fromConditions';
import { mapStyle } from './mapStyle';
import { traverseRules } from './traverseRules';

export const Node = {
  alignElementNodes,
  fromActions,
  fromConditions,
  mapStyle,
  traverseRules,
} as const;
