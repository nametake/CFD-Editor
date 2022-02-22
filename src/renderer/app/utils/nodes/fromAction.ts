import { Action, Node } from '@/app/types';

export const fromActions = (actions: Action[]): Node[] =>
  actions.flatMap((action) =>
    action.stub.map<Node>((s) => ({
      id: s.id,
      data: { label: s.name },
      type: 'result',
      position: { x: 0, y: 0 },
    }))
  );
