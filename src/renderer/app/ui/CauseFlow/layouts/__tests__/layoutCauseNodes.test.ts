import {
  CauseNodeWithElements,
  LayoutCauseNodesOptions,
  layoutCauseNodes,
} from '../layouts';

const defaultOptions: Required<LayoutCauseNodesOptions> = {
  startPosition: { x: 0, y: 0 },
  gap: 10,
};

describe('#layoutCauseNodes', () => {
  test('2 cause nodes', () => {
    const causeNodes: CauseNodeWithElements[] = [];
    const expected: CauseNodeWithElements[] = [];

    expect(layoutCauseNodes(causeNodes, defaultOptions)).toStrictEqual(
      expected
    );
  });
});
