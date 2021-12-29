import { ResizeCauseNodesOption, resizeCauseNodes } from '../layouts';
import { Node } from '@/app/types';

describe('#resizeCauseNode', () => {
  test('has 1 element', () => {
    const nodes: Node[] = [
      {
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
      },
      {
        id: 'c1-e1',
        parentNode: 'c1',
        type: 'element',
        data: { label: 'Element 1' },
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
    ];
    const expected: Node[] = [
      {
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
        height: 50,
        style: {
          paddingTop: 20,
          paddingRight: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          width: 50,
          height: 50,
        },
      },
      {
        id: 'c1-e1',
        parentNode: 'c1',
        type: 'element',
        data: { label: 'Element 1' },
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
    ];

    expect(resizeCauseNodes(nodes)).toStrictEqual(expected);
  });

  test('has 2 elements', () => {
    const nodes: Node[] = [
      {
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
      },
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
    ];
    const expected: Node[] = [
      {
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
      },
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
    ];

    expect(resizeCauseNodes(nodes)).toStrictEqual(expected);
  });

  test('has 3 elements', () => {
    const nodes: Node[] = [
      {
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
      },
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
      {
        id: 'r1',
        type: 'result',
        data: { label: 'Result 3' },
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
    ];
    const expected: Node[] = [
      {
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
          width: 50,
          height: 70,
        },
      },
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
      {
        id: 'r1',
        type: 'result',
        data: { label: 'Result 3' },
        position: { x: 0, y: 0 },
        width: 10,
        height: 10,
      },
    ];

    expect(resizeCauseNodes(nodes)).toStrictEqual(expected);
  });

  test('with options', () => {
    const nodes: Node[] = [
      {
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
      },
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
    ];
    const options: ResizeCauseNodesOption = {
      elementGap: 4,
    };
    const expected: Node[] = [
      {
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
        width: 34,
        height: 60,
        style: {
          paddingTop: 20,
          paddingRight: 20,
          paddingBottom: 20,
          paddingLeft: 20,
          width: 34,
          height: 60,
        },
      },
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
    ];

    expect(resizeCauseNodes(nodes, options)).toStrictEqual(expected);
  });
});
