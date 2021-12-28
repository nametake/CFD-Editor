import {
  CauseNodeWithElements,
  LayoutCauseNodesOptions,
  layoutCauseNodes,
} from '../layouts';

const defaultOptions: Required<LayoutCauseNodesOptions> = {
  startPosition: { x: 5, y: 5 },
  gap: 10,
};

describe('#layoutCauseNodes', () => {
  test('2 cause nodes', () => {
    const causeNodes: CauseNodeWithElements[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause 1' },
        position: { x: 0, y: 0 },
        width: 10,
        height: 20,
        elements: [],
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: 'Cause 2' },
        position: { x: 0, y: 0 },
        width: 15,
        height: 25,
        elements: [],
      },
    ];
    const expected: CauseNodeWithElements[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause 1' },
        position: { x: 5, y: 5 },
        width: 10,
        height: 20,
        elements: [],
      },
      {
        id: 'c2',
        type: 'cause',
        data: { label: 'Cause 2' },
        position: { x: 15, y: 5 },
        width: 15,
        height: 25,
        elements: [],
      },
    ];

    expect(layoutCauseNodes(causeNodes, defaultOptions)).toStrictEqual(
      expected
    );
  });
});
