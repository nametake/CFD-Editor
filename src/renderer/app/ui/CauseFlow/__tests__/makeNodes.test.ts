import { ElkNode } from 'elkjs';

import { Node } from '..';
import { makeNodes } from '../utils';

describe('#makeNodes', () => {
  test('ElkNode tree', () => {
    const elkNodes: ElkNode[] = [
      {
        id: 'c1',
        x: 10,
        y: 10,
        width: 100,
        height: 200,
        children: [
          {
            id: 'c1-e1',
            x: 15,
            y: 15,
            width: 80,
            height: 20,
            children: [],
          },
          {
            id: 'c1-e2',
            x: 15,
            y: 45,
            width: 80,
            height: 20,
            children: [],
          },
        ],
      },
      {
        id: 'r1',
        x: 20,
        y: 20,
        width: 50,
        height: 50,
        children: [],
      },
      {
        id: 'r2',
        x: 40,
        y: 40,
        width: 50,
        height: 50,
        children: [],
      },
    ];

    const expected: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause' },
        position: { x: 10, y: 10 },
        width: 100,
        height: 200,
      },
      {
        id: 'c1-e1',
        parentNode: 'c1',
        type: 'element',
        data: { label: 'Element 1' },
        position: { x: 15, y: 15 },
        width: 80,
        height: 20,
      },
      {
        id: 'c1-e2',
        parentNode: 'c1',
        type: 'element',
        data: { label: 'Element 2' },
        position: { x: 15, y: 45 },
        width: 80,
        height: 20,
      },
      {
        id: 'r1',
        type: 'result',
        data: { label: 'Result 1' },
        position: { x: 20, y: 20 },
        width: 50,
        height: 50,
      },
      {
        id: 'r2',
        type: 'result',
        data: { label: 'Result 2' },
        position: { x: 40, y: 40 },
        width: 50,
        height: 50,
      },
    ];

    expect(makeNodes(elkNodes)).toStrictEqual(expected);
  });
});
