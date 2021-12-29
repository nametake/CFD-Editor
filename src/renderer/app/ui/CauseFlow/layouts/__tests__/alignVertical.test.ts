import { AlignOption, alignVertical } from '../layouts';
import { Node } from '@/app/types';

describe('alignVertical', () => {
  test('3 nodes', () => {
    const nodes: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: { text: 'Cause 1' } },
        position: { x: 0, y: 0 },
        width: 10,
        height: 20,
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: { text: 'Cause 2' } },
        position: { x: 0, y: 0 },
        width: 15,
        height: 25,
      },
      {
        id: 'c3',
        type: 'cause',
        data: { label: { text: 'Cause 3' } },
        position: { x: 0, y: 0 },
        width: 30,
        height: 40,
      },
    ];
    const expected: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: { text: 'Cause 1' } },
        position: { x: 0, y: 0 },
        width: 10,
        height: 20,
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: { text: 'Cause 2' } },
        position: { x: 0, y: 20 },
        width: 15,
        height: 25,
      },
      {
        id: 'c3',
        type: 'cause',
        data: { label: { text: 'Cause 3' } },
        position: { x: 0, y: 45 },
        width: 30,
        height: 40,
      },
    ];

    expect(alignVertical(nodes)).toStrictEqual(expected);
  });

  test('3 nodes with option', () => {
    const nodes: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: { text: 'Cause 1' } },
        position: { x: 0, y: 0 },
        width: 10,
        height: 20,
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: { text: 'Cause 2' } },
        position: { x: 0, y: 0 },
        width: 15,
        height: 25,
      },
      {
        id: 'c3',
        type: 'cause',
        data: { label: { text: 'Cause 3' } },
        position: { x: 0, y: 0 },
        width: 30,
        height: 40,
      },
    ];
    const expected: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: { text: 'Cause 1' } },
        position: { x: 5, y: 5 },
        width: 10,
        height: 20,
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: { text: 'Cause 2' } },
        position: { x: 5, y: 35 },
        width: 15,
        height: 25,
      },
      {
        id: 'c3',
        type: 'cause',
        data: { label: { text: 'Cause 3' } },
        position: { x: 5, y: 70 },
        width: 30,
        height: 40,
      },
    ];
    const option: AlignOption = {
      startPosition: { x: 5, y: 5 },
      gap: 10,
    };

    expect(alignVertical(nodes, option)).toStrictEqual(expected);
  });
});
