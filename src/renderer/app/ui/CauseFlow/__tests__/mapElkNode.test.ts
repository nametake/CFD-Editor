import { ElkNode } from 'elkjs';

import { mapElkNode } from '../utils';
import { Node } from '@/app/types';

describe('#mapElkNode', () => {
  test('', () => {
    const nodes: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: { text: 'Cause' } },
        position: { x: 0, y: 0 },
        width: 100,
        height: 200,
      },
      {
        id: 'c1-e1',
        parentNode: 'c1',
        type: 'element',
        data: { label: 'Element 1' },
        position: { x: 0, y: 0 },
        width: 80,
        height: 20,
      },
      {
        id: 'c1-e2',
        parentNode: 'c1',
        type: 'element',
        data: { label: 'Element 2' },
        position: { x: 0, y: 0 },
        width: 80,
        height: 20,
      },
      {
        id: 'r1',
        type: 'result',
        data: { label: 'Result 1' },
        position: { x: 0, y: 0 },
        width: 50,
        height: 50,
      },
      {
        id: 'r2',
        type: 'result',
        data: { label: 'Result 2' },
        position: { x: 0, y: 0 },
        width: 50,
        height: 50,
      },
    ];
    const elkNodes: ElkNode[] = [
      {
        id: 'c1',
        width: 100,
        height: 200,
        x: 1,
        y: 1,
        children: [
          {
            id: 'c1-e1',
            width: 80,
            height: 20,
            x: 2,
            y: 2,
          },
          {
            id: 'c1-e2',
            width: 80,
            height: 20,
            x: 3,
            y: 3,
          },
        ],
      },
      {
        id: 'r1',
        width: 50,
        height: 50,
        x: 4,
        y: 4,
      },
      {
        id: 'r2',
        width: 50,
        height: 50,
        x: 5,
        y: 5,
      },
    ];
    const expected: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: { text: 'Cause' } },
        position: { x: 1, y: 1 },
        width: 100,
        height: 200,
      },
      {
        id: 'c1-e1',
        parentNode: 'c1',
        type: 'element',
        data: { label: 'Element 1' },
        position: { x: 2, y: 2 },
        width: 80,
        height: 20,
      },
      {
        id: 'c1-e2',
        parentNode: 'c1',
        type: 'element',
        data: { label: 'Element 2' },
        position: { x: 3, y: 3 },
        width: 80,
        height: 20,
      },
      {
        id: 'r1',
        type: 'result',
        data: { label: 'Result 1' },
        position: { x: 4, y: 4 },
        width: 50,
        height: 50,
      },
      {
        id: 'r2',
        type: 'result',
        data: { label: 'Result 2' },
        position: { x: 5, y: 5 },
        width: 50,
        height: 50,
      },
    ];

    expect(nodes.map(mapElkNode(elkNodes))).toStrictEqual(expected);
  });
});
