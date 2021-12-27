import { NodeRemoveChange } from 'react-flow-renderer';

import { Node } from '..';
import { filterChangeNode } from '../utils';

describe('#filterChangeNode', () => {
  test('remove', () => {
    const nodes: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause 1' },
        position: { x: 0, y: 0 },
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: 'Cause 2' },
        position: { x: 0, y: 0 },
      },
    ];
    const changeNodes: NodeRemoveChange[] = [
      {
        id: 'c2',
        type: 'remove',
      },
    ];
    expect(nodes.filter(filterChangeNode(changeNodes))).toStrictEqual([
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause 1' },
        position: { x: 0, y: 0 },
      },
    ]);
  });
});
