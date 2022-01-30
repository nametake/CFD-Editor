import { merge } from '../merge';
import { Node } from '@/app/types';

describe('merge', () => {
  test('keep old position', () => {
    const oldNodes: Node[] = [
      {
        id: 'id',
        type: 'cause',
        position: { x: 10, y: 10 },
        data: { label: { text: 'old' } },
        style: {
          padding: '10px',
        },
      },
    ];
    const newNodes: Node[] = [
      {
        id: 'id',
        type: 'cause',
        position: { x: 0, y: 0 },
        data: { label: { text: 'new' } },
        style: {
          padding: '20px',
        },
      },
    ];

    const expected: Node[] = [
      {
        id: 'id',
        type: 'cause',
        position: { x: 10, y: 10 },
        data: { label: { text: 'new' } },
        style: {
          padding: '20px',
        },
      },
    ];

    expect(merge({ oldNodes, newNodes })).toStrictEqual(expected);
  });

  test('remove old nodes', () => {
    const oldNodes: Node[] = [
      {
        id: 'old-id',
        type: 'cause',
        position: { x: 10, y: 10 },
        data: { label: { text: 'old' } },
        style: {
          padding: '10px',
        },
      },
    ];
    const newNodes: Node[] = [
      {
        id: 'new-id',
        type: 'cause',
        position: { x: 0, y: 0 },
        data: { label: { text: 'new' } },
        style: {
          padding: '20px',
        },
      },
    ];

    const expected: Node[] = [
      {
        id: 'new-id',
        type: 'cause',
        position: { x: 0, y: 0 },
        data: { label: { text: 'new' } },
        style: {
          padding: '20px',
        },
      },
    ];

    expect(merge({ oldNodes, newNodes })).toStrictEqual(expected);
  });
});
