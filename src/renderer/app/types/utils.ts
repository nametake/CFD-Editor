import { Condition, Node } from './types';

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
