import { traverseRules } from '../traverseRules';
import { Edge, Node, Rule } from '@/app/types';

describe('traverseRules', () => {
  test('connected cause node to action node', () => {
    const nodes: Node[] = [
      {
        id: '1-1',
        data: { label: { text: 'Card' } },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '1-2',
        data: { label: 'Visa' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '2-2',
        data: { label: 'MasterCard' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '3-1',
        data: { label: { text: 'Country' } },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '3-2',
        data: { label: 'Japan' },
        parentNode: '3-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '4-2',
        data: { label: 'USA' },
        parentNode: '3-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '6-2',
        data: { label: 'Action 1' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
      {
        id: '7-2',
        data: { label: 'Action 2' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
    ];

    const edges: Edge[] = [
      {
        source: '1-1',
        sourceHandle: null,
        target: '3-1',
        targetHandle: null,
        id: 'reactflow__edge-1-1-3-1',
        type: 'removable',
      },
      {
        source: '3-2',
        sourceHandle: null,
        target: '6-2',
        targetHandle: null,
        id: 'reactflow__edge-3-2-7-2',
        type: 'removable',
      },
      {
        source: '4-2',
        sourceHandle: null,
        target: '7-2',
        targetHandle: null,
        id: 'reactflow__edge-4-2-8-2',
        type: 'removable',
      },
    ];

    const expected: Rule[] = [
      {
        conditionStubIds: ['1-2', '3-2'],
        actionId: '6-2',
      },
      {
        conditionStubIds: ['1-2', '4-2'],
        actionId: '7-2',
      },
      {
        conditionStubIds: ['2-2', '3-2'],
        actionId: '6-2',
      },
      {
        conditionStubIds: ['2-2', '4-2'],
        actionId: '7-2',
      },
    ];

    expect(traverseRules(nodes, edges)).toStrictEqual(expected);
  });

  test('connected element node to action node', () => {
    const nodes: Node[] = [
      {
        id: '1-1',
        data: { label: { text: 'Card' } },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '1-2',
        data: { label: 'Visa' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '2-2',
        data: { label: 'MasterCard' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '3-1',
        data: { label: { text: 'Country' } },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '3-2',
        data: { label: 'Japan' },
        parentNode: '3-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '4-2',
        data: { label: 'USA' },
        parentNode: '3-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '6-2',
        data: { label: 'Action 1' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
      {
        id: '7-2',
        data: { label: 'Action 2' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
    ];
    const edges: Edge[] = [
      {
        source: '1-2',
        sourceHandle: null,
        target: '3-1',
        targetHandle: null,
        id: 'reactflow__edge-1-2-3-1',
        type: 'removable',
      },
      {
        source: '2-2',
        sourceHandle: null,
        target: '7-2',
        targetHandle: null,
        id: 'reactflow__edge-2-2-7-2',
        type: 'removable',
      },
      {
        source: '3-2',
        sourceHandle: null,
        target: '6-2',
        targetHandle: null,
        id: 'reactflow__edge-3-2-6-2',
        type: 'removable',
      },
      {
        source: '4-2',
        sourceHandle: null,
        target: '7-2',
        targetHandle: null,
        id: 'reactflow__edge-4-2-7-2',
        type: 'removable',
      },
    ];

    const expected: Rule[] = [
      {
        conditionStubIds: ['1-2', '3-2'],
        actionId: '6-2',
      },
      {
        conditionStubIds: ['1-2', '4-2'],
        actionId: '7-2',
      },
      {
        conditionStubIds: ['2-2'],
        actionId: '7-2',
      },
    ];

    expect(traverseRules(nodes, edges)).toStrictEqual(expected);
  });

  test('connected element node to element node', () => {
    const nodes: Node[] = [
      {
        id: '1-1',
        data: {
          label: { text: 'Card' },
        },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '1-2',
        data: { label: 'Visa' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '2-2',
        data: { label: 'MasterCard' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '3-1',
        data: {
          label: { text: 'Country' },
        },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '3-2',
        data: { label: 'Japan' },
        parentNode: '3-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '4-2',
        data: { label: 'USA' },
        parentNode: '3-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '6-2',
        data: { label: 'Action 1' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
      {
        id: '7-2',
        data: { label: 'Action 2' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
    ];

    const edges: Edge[] = [
      {
        source: '1-2',
        sourceHandle: null,
        target: '3-2',
        targetHandle: null,
        id: 'reactflow__edge-1-2-3-2',
        type: 'removable',
      },
      {
        source: '3-2',
        sourceHandle: null,
        target: '6-2',
        targetHandle: null,
        id: 'reactflow__edge-3-2-6-2',
        type: 'removable',
      },
      {
        source: '2-2',
        sourceHandle: null,
        target: '4-2',
        targetHandle: null,
        id: 'reactflow__edge-2-2-4-2',
        type: 'removable',
      },
      {
        source: '4-2',
        sourceHandle: null,
        target: '7-2',
        targetHandle: null,
        id: 'reactflow__edge-4-2-7-2',
        type: 'removable',
      },
    ];

    const expected: Rule[] = [
      {
        conditionStubIds: ['1-2', '3-2'],
        actionId: '6-2',
      },
      {
        conditionStubIds: ['2-2', '4-2'],
        actionId: '7-2',
      },
    ];

    expect(traverseRules(nodes, edges)).toStrictEqual(expected);
  });

  test('not connect action node', () => {
    const nodes: Node[] = [
      {
        id: '1-1',
        data: {
          label: { text: 'Card' },
        },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '1-2',
        data: { label: 'Visa' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '2-2',
        data: { label: 'MasterCard' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '3-1',
        data: {
          label: { text: 'Country' },
        },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '3-2',
        data: { label: 'Japan' },
        parentNode: '3-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '4-2',
        data: { label: 'USA' },
        parentNode: '3-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: '6-2',
        data: { label: 'Action 1' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
      {
        id: '7-2',
        data: { label: 'Action 2' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
    ];

    const edges: Edge[] = [
      {
        source: '1-2',
        sourceHandle: null,
        target: '3-2',
        targetHandle: null,
        id: 'reactflow__edge-1-2-3-2',
        type: 'removable',
      },
      {
        source: '2-2',
        sourceHandle: null,
        target: '4-2',
        targetHandle: null,
        id: 'reactflow__edge-2-2-4-2',
        type: 'removable',
      },
    ];

    const expected: Rule[] = [];

    expect(traverseRules(nodes, edges)).toStrictEqual(expected);
  });

  describe('loop connection', () => {
    const nodes: Node[] = [
      {
        id: '1-1',
        data: { label: { text: 'Cause1' } },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: '1-2',
        data: { label: 'Element1' },
        parentNode: '1-1',
        type: 'element',
        position: { x: 20, y: 44 },
      },
      {
        id: '2-1',
        data: { label: { text: 'Cause2' } },
        type: 'cause',
        position: { x: 214, y: 0 },
      },
      {
        id: '2-2',
        data: { label: 'Element2' },
        parentNode: '2-1',
        type: 'element',
        position: { x: 20, y: 44 },
      },
    ];

    test('cause node to cause node', () => {
      const edges: Edge[] = [
        {
          source: '1-1',
          sourceHandle: null,
          target: '2-1',
          targetHandle: null,
          id: 'reactflow__edge-1-1-2-1',
          type: 'removable',
        },
        {
          source: '2-1',
          sourceHandle: null,
          target: '1-1',
          targetHandle: null,
          id: 'reactflow__edge-2-1-1-1',
          type: 'removable',
        },
      ];

      expect(traverseRules(nodes, edges)).toStrictEqual([]);
    });

    test('elmeent node to cause node', () => {
      const edges: Edge[] = [
        {
          source: '1-1',
          sourceHandle: null,
          target: '2-1',
          targetHandle: null,
          id: 'reactflow__edge-1-1-2-1',
          type: 'removable',
        },
        {
          source: '2-2',
          sourceHandle: null,
          target: '1-1',
          targetHandle: null,
          id: 'reactflow__edge-2-2-1-1',
          type: 'removable',
        },
      ];

      expect(traverseRules(nodes, edges)).toStrictEqual([]);
    });

    test('elmeent node to element node', () => {
      const edges: Edge[] = [
        {
          source: '1-2',
          sourceHandle: null,
          target: '2-2',
          targetHandle: null,
          id: 'reactflow__edge-1-2-2-2',
          type: 'removable',
        },
        {
          source: '2-2',
          sourceHandle: null,
          target: '1-1',
          targetHandle: null,
          id: 'reactflow__edge-2-2-1-2',
          type: 'removable',
        },
      ];

      expect(traverseRules(nodes, edges)).toStrictEqual([]);
    });
  });
});
