import { Node } from '../..';
import { AlignOption, alignVertical } from '../layouts';

const defaultOptions: AlignOption = {
  startPosition: { x: 5, y: 5 },
  gap: 10,
};

describe('alignVertical', () => {
  test('2 cause nodes', () => {
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
        position: { x: 5, y: 35 },
        width: 15,
        height: 25,
      },
      {
        id: 'c3',
        type: 'cause',
        data: { label: 'Cause 3' },
        position: { x: 5, y: 70 },
        width: 30,
        height: 40,
      },
    ];

    expect(alignVertical(nodes, defaultOptions)).toStrictEqual(expected);
  });
});
