import { Node } from '../..';
import { AlignOption, alignHorizontal } from '../layouts';

const defaultOptions: AlignOption = {
  startPosition: { x: 5, y: 5 },
  gap: 10,
};

describe('alignHorizontal', () => {
  test('3 nodes', () => {
    const nodes: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause 1' },
        position: { x: 0, y: 0 },
        width: 10,
        height: 20,
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: 'Cause 2' },
        position: { x: 0, y: 0 },
        width: 15,
        height: 25,
      },
      {
        id: 'c3',
        type: 'cause',
        data: { label: 'Cause 3' },
        position: { x: 0, y: 0 },
        width: 30,
        height: 40,
      },
    ];
    const expected: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause 1' },
        position: { x: 5, y: 5 },
        width: 10,
        height: 20,
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: 'Cause 2' },
        position: { x: 25, y: 5 },
        width: 15,
        height: 25,
      },
      {
        id: 'c3',
        type: 'cause',
        data: { label: 'Cause 3' },
        position: { x: 50, y: 5 },
        width: 30,
        height: 40,
      },
    ];

    expect(alignHorizontal(nodes, defaultOptions)).toStrictEqual(expected);
  });
});
