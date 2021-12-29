import {
  CauseNodeWithElements,
  ResizeCauseNodesOption,
  resizeCauseNode,
} from '../layouts';

describe('resizeCauseNode', () => {
  test('has 1 element', () => {
    const causeNode: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: {
        label: {
          text: 'Cause',
          style: {
            height: 10,
          },
        },
      },
      position: { x: 0, y: 0 },
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      },
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
      data: {
        label: {
          text: 'Cause',
          style: {
            height: 10,
          },
        },
      },
      position: { x: 0, y: 0 },
      width: 50,
      height: 60,
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        width: 50,
        height: 60,
      },
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
      data: {
        label: {
          text: 'Cause',
          style: {
            height: 10,
          },
        },
      },
      position: { x: 0, y: 0 },
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      },
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
      data: {
        label: {
          text: 'Cause',
          style: {
            height: 10,
          },
        },
      },
      position: { x: 0, y: 0 },
      width: 50,
      height: 70,
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        width: 50,
        height: 70,
      },
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
      data: {
        label: {
          text: 'Cause',
          style: {
            height: 10,
          },
        },
      },
      position: { x: 0, y: 0 },
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      },
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
      data: {
        label: {
          text: 'Cause',
          style: {
            height: 10,
          },
        },
      },
      position: { x: 0, y: 0 },
      width: 50,
      height: 80,
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        width: 50,
        height: 80,
      },
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
      data: {
        label: {
          text: 'Cause',
          style: {
            height: 10,
          },
        },
      },
      position: { x: 0, y: 0 },
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
      },
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
    const options: ResizeCauseNodesOption = {
      elementGap: 4,
    };
    const expected: CauseNodeWithElements = {
      id: 'c1',
      type: 'cause',
      data: {
        label: {
          text: 'Cause',
          style: {
            height: 10,
          },
        },
      },
      position: { x: 0, y: 0 },
      width: 50,
      height: 74,
      style: {
        paddingTop: 20,
        paddingRight: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        width: 50,
        height: 74,
      },
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
