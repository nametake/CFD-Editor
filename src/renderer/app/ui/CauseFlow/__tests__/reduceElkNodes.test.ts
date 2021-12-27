import { ElkNode } from 'elkjs';

import { reduceElkNodes } from '../utils';

describe('#reduceElkNodes', () => {
  test('nested ElkNodes', () => {
    const elkNodes: ElkNode[] = [
      {
        id: 'c1',
        width: 100,
        height: 200,
        children: [
          {
            id: 'c1-e1',
            width: 80,
            height: 20,
          },
          {
            id: 'c1-e2',
            width: 80,
            height: 20,
          },
        ],
      },
      {
        id: 'r1',
        width: 50,
        height: 50,
      },
      {
        id: 'r2',
        width: 50,
        height: 50,
      },
    ];
    const expected: ElkNode[] = [
      {
        id: 'c1',
        width: 100,
        height: 200,
      },
      {
        id: 'c1-e1',
        width: 80,
        height: 20,
      },
      {
        id: 'c1-e2',
        width: 80,
        height: 20,
      },
      {
        id: 'r1',
        width: 50,
        height: 50,
      },
      {
        id: 'r2',
        width: 50,
        height: 50,
      },
    ];
    expect(reduceElkNodes(elkNodes)).toStrictEqual(expected);
  });
});
