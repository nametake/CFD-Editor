import {
  AlignElementNodesOption,
  alignElementNodes,
} from '../alignElementNodes';
import { Node } from '@/app/types';

describe('alignElementNodes', () => {
  test('no element node', () => {
    const nodes: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: { label: { text: 'cause' } },
        position: { x: 0, y: 0 },
      },
    ];

    const expected: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: { label: { text: 'cause' }, elements: { width: 0, height: 0 } },
        position: { x: 0, y: 0 },
      },
    ];

    expect(alignElementNodes(nodes)).toStrictEqual(expected);
  });

  test('has element node', () => {
    const nodes: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: { label: { text: 'cause' } },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
        width: 100,
        height: 20,
      },
    ];

    const expected: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: {
          label: { text: 'cause' },
          elements: { width: 100, height: 20 },
        },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
        width: 100,
        height: 20,
        draggable: false,
      },
    ];

    expect(alignElementNodes(nodes)).toStrictEqual(expected);
  });

  test('has no dimeintion element node', () => {
    const nodes: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: { label: { text: 'cause' } },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
      },
    ];

    const expected: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: {
          label: { text: 'cause' },
          elements: { width: 0, height: 0 },
        },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
        draggable: false,
      },
    ];

    expect(alignElementNodes(nodes)).toStrictEqual(expected);
  });

  test('has no parent id element node', () => {
    const nodes: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: { label: { text: 'cause' } },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
      },
    ];

    const expected: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: {
          label: { text: 'cause' },
          elements: { width: 0, height: 0 },
        },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
      },
    ];

    expect(alignElementNodes(nodes)).toStrictEqual(expected);
  });

  test('has 2 element nodes', () => {
    const nodes: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: { label: { text: 'cause' } },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id-1',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
        width: 100,
        height: 20,
      },
      {
        id: 'element-id-2',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element2' },
        position: { x: 0, y: 0 },
        width: 200,
        height: 20,
      },
    ];

    const expected: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: {
          label: { text: 'cause' },
          elements: { width: 200, height: 40 },
        },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id-1',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
        width: 100,
        height: 20,
        draggable: false,
      },
      {
        id: 'element-id-2',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element2' },
        position: { x: 0, y: 20 },
        width: 200,
        height: 20,
        draggable: false,
      },
    ];

    expect(alignElementNodes(nodes)).toStrictEqual(expected);
  });

  test('has 2 element nodes with option', () => {
    const option: AlignElementNodesOption = {
      elementGap: 10,
      labelMarginBottom: 20,
    };
    const nodes: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: { label: { text: 'cause' } },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id-1',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 0 },
        width: 100,
        height: 20,
      },
      {
        id: 'element-id-2',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element2' },
        position: { x: 0, y: 0 },
        width: 200,
        height: 20,
      },
    ];

    const expected: Node[] = [
      {
        id: 'cause-id',
        type: 'cause',
        data: {
          label: { text: 'cause' },
          elements: { width: 200, height: 70 },
        },
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-id-1',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element1' },
        position: { x: 0, y: 20 },
        width: 100,
        height: 20,
        draggable: false,
      },
      {
        id: 'element-id-2',
        parentNode: 'cause-id',
        type: 'element',
        data: { label: 'element2' },
        position: { x: 0, y: 50 },
        width: 200,
        height: 20,
        draggable: false,
      },
    ];

    expect(alignElementNodes(nodes, option)).toStrictEqual(expected);
  });
});
