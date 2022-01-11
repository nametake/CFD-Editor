import { makeRules } from '../makeRules';
import { Edge, Node, Rule } from '@/app/types';

describe('makeRules', () => {
  describe('connected cause node', () => {
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

    test('cause node start', () => {
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

      expect(
        makeRules(
          { conditionStubIds: [], actionId: null },
          {
            id: '1-1',
            data: { label: { text: 'Card' } },
            type: 'cause',
            position: { x: 0, y: 0 },
          },
          nodes,
          edges
        )
      ).toStrictEqual(expected);
    });
  });

  describe('connected element node', () => {
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

    test('cause node start', () => {
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

      expect(
        makeRules(
          { conditionStubIds: [], actionId: null },
          {
            id: '1-1',
            data: { label: { text: 'Card' } },
            type: 'cause',
            position: { x: 0, y: 0 },
          },
          nodes,
          edges
        )
      ).toStrictEqual(expected);
    });
  });
});
