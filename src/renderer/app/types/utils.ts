import { Action, Condition } from './models';
import { Node } from './node';

export const makeCauseNodes = (condtions: Condition[]): Node[] =>
  condtions.flatMap((condtion) => [
    {
      id: condtion.id,
      data: { label: { text: condtion.name } },
      type: 'cause',
      position: { x: 0, y: 0 },
    },
    ...condtion.stub.map<Node>((s) => ({
      id: s.id,
      data: { label: s.name },
      parentNode: condtion.id,
      type: 'element',
      position: { x: 0, y: 0 },
    })),
  ]);

export const makeResultNodes = (actions: Action[]): Node[] =>
  actions.flatMap((action) =>
    action.stub.map<Node>((s) => ({
      id: s.id,
      data: { label: s.name },
      type: 'result',
      position: { x: 0, y: 0 },
    }))
  );
