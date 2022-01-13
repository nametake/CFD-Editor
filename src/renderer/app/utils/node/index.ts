import { fromActions } from './fromAction';
import { fromConditions } from './fromConditions';
import { traverseRules } from './traverseRules';

export const Node = {
  traverseRules,
  fromActions,
  fromConditions,
};
