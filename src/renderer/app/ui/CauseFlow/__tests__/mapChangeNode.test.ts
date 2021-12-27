import { NodeDimensionChange } from 'react-flow-renderer';

import { Node } from '..';
import { mapChangeNode } from '../utils';

describe('mapChangeNode', () => {
  test('dimensions', () => {
    const nodes: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
      },
    ];
    const changeNodes: NodeDimensionChange[] = [
      {
        id: 'c1',
        type: 'dimensions',
        dimensions: { width: 100, height: 200 },
        position: { x: 12, y: 24 },
      },
    ];
    expect(nodes.map(mapChangeNode(changeNodes))).toStrictEqual([
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause' },
        position: { x: 12, y: 24 },
        width: 100,
        height: 200,
      },
    ]);
  });
});
