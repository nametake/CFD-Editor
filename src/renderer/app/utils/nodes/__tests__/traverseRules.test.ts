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
        actionStubIds: ['6-2'],
      },
      {
        conditionStubIds: ['1-2', '4-2'],
        actionStubIds: ['7-2'],
      },
      {
        conditionStubIds: ['2-2', '3-2'],
        actionStubIds: ['6-2'],
      },
      {
        conditionStubIds: ['2-2', '4-2'],
        actionStubIds: ['7-2'],
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
        actionStubIds: ['6-2'],
      },
      {
        conditionStubIds: ['1-2', '4-2'],
        actionStubIds: ['7-2'],
      },
      {
        conditionStubIds: ['2-2'],
        actionStubIds: ['7-2'],
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
        actionStubIds: ['6-2'],
      },
      {
        conditionStubIds: ['2-2', '4-2'],
        actionStubIds: ['7-2'],
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

    test('element node to cause node', () => {
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

    test('element node to element node', () => {
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

    test('self element node loop', () => {
      const edges: Edge[] = [
        {
          source: '1-2',
          sourceHandle: null,
          target: '1-2',
          targetHandle: null,
          id: 'reactflow__edge-1-2-1-2',
          type: 'removable',
        },
      ];

      expect(traverseRules(nodes, edges)).toStrictEqual([]);
    });
  });

  test('connected multiple action ndoes', () => {
    const nodes: Node[] = [
      {
        id: 'cause-1',
        data: { label: { text: 'Cause1' } },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: 'element-1',
        data: { label: 'Element1' },
        parentNode: 'cause-1',
        type: 'element',
        position: { x: 20, y: 44 },
      },
      {
        id: 'action-1',
        data: { label: 'Action 1' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
      {
        id: 'action-2',
        data: { label: 'Action 2' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
    ];

    const edges: Edge[] = [
      {
        source: 'element-1',
        sourceHandle: null,
        target: 'action-1',
        targetHandle: null,
        id: 'reactflow__edge-element-1-action-1',
        type: 'removable',
      },
      {
        source: 'element-1',
        sourceHandle: null,
        target: 'action-2',
        targetHandle: null,
        id: 'reactflow__edge-element-1-action-2',
        type: 'removable',
      },
    ];

    const expected: Rule[] = [
      {
        conditionStubIds: ['element-1'],
        actionStubIds: ['action-1', 'action-2'],
      },
    ];

    expect(traverseRules(nodes, edges)).toStrictEqual(expected);
  });

  test('label routes', () => {
    const nodes: Node[] = [
      {
        id: 'cause-1',
        data: { label: { text: 'Cause1' } },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: 'cause-1-element-1',
        data: { label: 'Cause1 Element1' },
        parentNode: 'cause-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: 'cause-1-element-2',
        data: { label: 'Cuase1 Element2' },
        parentNode: 'cause-1',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: 'cause-2',
        data: { label: { text: 'Cause2' } },
        type: 'cause',
        position: { x: 0, y: 0 },
      },
      {
        id: 'cause-2-element-1',
        data: { label: 'Cuase2 Element1' },
        parentNode: 'cause-2',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: 'cause-2-element-2',
        data: { label: 'Cuase2 Element2' },
        parentNode: 'cause-2',
        type: 'element',
        position: { x: 0, y: 0 },
      },
      {
        id: 'action-1',
        data: { label: 'Action 1' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
      {
        id: 'action-2',
        data: { label: 'Action 2' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
      {
        id: 'action-3',
        data: { label: 'Action 3' },
        type: 'result',
        position: { x: 0, y: 0 },
      },
    ];

    const edges: Edge[] = [
      // cause-1-element-1 to cause2 edges
      {
        id: '1',
        source: 'cause-1-element-1',
        target: 'cause-2-element-1',
        type: 'removable',
      },
      {
        id: '2',
        source: 'cause-1-element-1',
        target: 'cause-2-element-2',
        type: 'removable',
      },
      // cause-1-element-2 to cause2 edges
      {
        id: '3',
        source: 'cause-1-element-2',
        target: 'cause-2-element-1',
        type: 'removable',
      },
      {
        id: '4',
        source: 'cause-1-element-2',
        target: 'cause-2-element-2',
        type: 'removable',
        data: { label: 'A' },
      },
      // actions
      {
        id: '5',
        source: 'cause-2-element-1',
        target: 'action-1',
        type: 'removable',
      },
      {
        id: '6',
        source: 'cause-2-element-2',
        target: 'action-2',
        type: 'removable',
      },
      {
        id: '7',
        source: 'cause-2-element-2',
        target: 'action-3',
        type: 'removable',
        data: { label: 'A' },
      },
    ];

    const expected: Rule[] = [
      {
        conditionStubIds: ['cause-1-element-1', 'cause-2-element-1'],
        actionStubIds: ['action-1'],
      },
      {
        conditionStubIds: ['cause-1-element-2', 'cause-2-element-1'],
        actionStubIds: ['action-1'],
      },
      {
        conditionStubIds: ['cause-1-element-1', 'cause-2-element-2'],
        actionStubIds: ['action-2'],
      },
      {
        conditionStubIds: ['cause-1-element-2', 'cause-2-element-2'],
        actionStubIds: ['action-3'],
      },
    ];

    expect(traverseRules(nodes, edges)).toStrictEqual(expected);
  });
});
