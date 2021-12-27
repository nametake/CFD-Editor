import { ElkNode } from 'elkjs';

import { Node } from '..';
import { makeElkNodes } from '../utils';

describe('#makeElkNodes', () => {
  test('has parent nodes', () => {
    const nodes: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause' },
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
    const expected: ElkNode[] = [
      {
        id: 'c1',
        width: 100,
        height: 200,
        children: [
          {
            id: 'c1-e1',
            width: 80,
            height: 20,
            children: [],
          },
          {
            id: 'c1-e2',
            width: 80,
            height: 20,
            children: [],
          },
        ],
      },
      {
        id: 'r1',
        width: 50,
        height: 50,
        children: [],
      },
      {
        id: 'r2',
        width: 50,
        height: 50,
        children: [],
      },
    ];
    expect(makeElkNodes(nodes)).toStrictEqual(expected);
  });
});
