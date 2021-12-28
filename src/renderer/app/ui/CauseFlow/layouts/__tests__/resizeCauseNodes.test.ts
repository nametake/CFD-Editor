import { Node } from '../..';
import { ResizeCauseNodesOption, resizeCauseNodes } from '../layouts';

describe('#resizeCauseNode', () => {
  test('has 1 element', () => {
    const nodes: Node[] = [
      {
        id: 'c1',
        type: 'cause',
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
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
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
        width: 50,
        height: 50,
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
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
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
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
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
        width: 50,
        height: 60,
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
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
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
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
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
        width: 50,
        height: 70,
        padding: { top: 20, right: 20, bottom: 20, left: 20 },
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
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
        padding: { top: 24, right: 8, bottom: 12, left: 16 },
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
        data: { label: 'Cause' },
        position: { x: 0, y: 0 },
        width: 34,
        height: 60,
        padding: { top: 24, right: 8, bottom: 12, left: 16 },
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
