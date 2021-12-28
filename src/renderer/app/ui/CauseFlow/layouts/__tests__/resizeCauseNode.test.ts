import {
  CauseNodeWithElements,
  ResizeCauseNodesOption,
  resizeCauseNode,
} from '../layouts';

describe('#resizeCauseNode', () => {
  test('has 1 element', () => {
    const causeNode: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 0, y: 0 },
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
      elements: [
        {
          id: 'c1-e1',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 1' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
      ],
    };
    const expected: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 0, y: 0 },
      width: 50,
      height: 50,
      style: {
        width: 50,
        height: 50,
      },
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
      elements: [
        {
          id: 'c1-e1',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 1' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
      ],
    };

    expect(resizeCauseNode(causeNode)).toStrictEqual(expected);
  });

  test('has 2 elements', () => {
    const causeNode: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 0, y: 0 },
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
      elements: [
        {
          id: 'c1-e1',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 1' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          id: 'c1-e2',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 2' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
      ],
    };
    const expected: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 0, y: 0 },
      width: 50,
      height: 60,
      style: {
        width: 50,
        height: 60,
      },
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
      elements: [
        {
          id: 'c1-e1',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 1' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          id: 'c1-e2',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 2' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
      ],
    };

    expect(resizeCauseNode(causeNode)).toStrictEqual(expected);
  });

  test('has 3 elements', () => {
    const causeNode: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 0, y: 0 },
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
      elements: [
        {
          id: 'c1-e1',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 1' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          id: 'c1-e2',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 2' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          id: 'c1-e3',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 3' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
      ],
    };
    const expected: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 0, y: 0 },
      width: 50,
      height: 70,
      style: {
        width: 50,
        height: 70,
      },
      padding: { top: 20, right: 20, bottom: 20, left: 20 },
      elements: [
        {
          id: 'c1-e1',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 1' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          id: 'c1-e2',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 2' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          id: 'c1-e3',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 3' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
      ],
    };

    expect(resizeCauseNode(causeNode)).toStrictEqual(expected);
  });

  test('with options', () => {
    const causeNode: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 0, y: 0 },
      padding: { top: 24, right: 8, bottom: 12, left: 16 },
      elements: [
        {
          id: 'c1-e1',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 1' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          id: 'c1-e2',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 2' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
      ],
    };
    const options: Required<ResizeCauseNodesOption> = {
      elementGap: 4,
    };
    const expected: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: { label: 'Cause' },
      position: { x: 0, y: 0 },
      width: 34,
      height: 60,
      style: {
        width: 34,
        height: 60,
      },
      padding: { top: 24, right: 8, bottom: 12, left: 16 },
      elements: [
        {
          id: 'c1-e1',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 1' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
        {
          id: 'c1-e2',
          parentNode: 'c1',
          type: 'element',
          data: { label: 'Element 2' },
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
        },
      ],
    };

    expect(resizeCauseNode(causeNode, options)).toStrictEqual(expected);
  });
});
