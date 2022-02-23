import { filterInvalidRules } from '../filterInvalidRules';
import { Action, Condition, Rule } from '@/app/types';

describe('filterInvalidRules', () => {
  test('remove invalid to invalid rules', () => {
    const rules: Rule[] = [
      {
        conditionStubIds: ['condition-0-0', 'condition-1-0', 'condition-2-0'],
        actionStubIds: ['action-0-0'],
      },
      {
        conditionStubIds: ['condition-0-0', 'condition-1-0', 'condition-2-1'],
        actionStubIds: ['action-0-1'],
      },
      {
        conditionStubIds: ['condition-0-0', 'condition-1-1'],
        actionStubIds: ['action-0-1'],
      },
      {
        conditionStubIds: ['condition-0-1', 'condition-1-0', 'condition-2-0'],
        actionStubIds: ['action-0-0'],
      },
      {
        conditionStubIds: ['condition-0-1', 'condition-1-0', 'condition-2-1'],
        actionStubIds: ['action-0-1'],
      },
      {
        conditionStubIds: ['condition-0-1', 'condition-1-1'],
        actionStubIds: ['action-0-1'],
      },
      {
        conditionStubIds: ['condition-0-2'],
        actionStubIds: ['action-0-1'],
      },
    ];

    const conditions: Condition[] = [
      {
        id: 'condition-0',
        name: 'Card',
        location: { column: 0, row: 0 },
        stub: [
          {
            id: 'condition-0-0',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'Visa',
            location: { column: 0, row: 0 },
          },
          {
            id: 'condition-0-1',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'MasterCard',
            location: { column: 0, row: 0 },
          },
          {
            id: 'condition-0-2',
            type: 'invalid',
            conditionId: 'condition-0',
            name: 'Others',
            location: { column: 0, row: 0 },
          },
        ],
      },
      {
        id: 'condition-1',
        name: 'Age',
        location: { column: 0, row: 0 },
        stub: [
          {
            id: 'condition-1-0',
            type: 'valid',
            conditionId: 'condition-1',
            name: 'Over 18',
            location: { column: 0, row: 0 },
          },
          {
            id: 'condition-1-1',
            type: 'invalid',
            conditionId: 'condition-1',
            name: 'Under 17',
            location: { column: 0, row: 0 },
          },
        ],
      },
      {
        id: 'condition-2',
        name: 'Premium',
        location: { column: 0, row: 0 },
        stub: [
          {
            id: 'condition-2-0',
            type: 'valid',
            conditionId: 'condition-2',
            name: 'Yes',
            location: { column: 0, row: 0 },
          },
          {
            id: 'condition-2-1',
            type: 'invalid',
            conditionId: 'condition-2',
            name: 'No',
            location: { column: 0, row: 0 },
          },
        ],
      },
    ];

    const actions: Action[] = [
      {
        id: 'action-0',
        name: 'Discount',
        location: { column: 0, row: 0 },
        stub: [
          {
            id: 'action-0-0',
            type: 'valid',
            actionId: 'action-0',
            name: 'YES',
            location: { column: 0, row: 0 },
          },
          {
            id: 'action-0-1',
            type: 'invalid',
            actionId: 'action-0',
            name: 'NO',
            location: { column: 0, row: 0 },
          },
        ],
      },
    ];

    const expected: Rule[] = [
      {
        conditionStubIds: ['condition-0-0', 'condition-1-0', 'condition-2-0'],
        actionStubIds: ['action-0-0'],
      },
      {
        conditionStubIds: ['condition-0-0', 'condition-1-0', 'condition-2-1'],
        actionStubIds: ['action-0-1'],
      },
      {
        conditionStubIds: ['condition-0-0', 'condition-1-1'],
        actionStubIds: ['action-0-1'],
      },
      {
        conditionStubIds: ['condition-0-1', 'condition-1-0', 'condition-2-0'],
        actionStubIds: ['action-0-0'],
      },
      {
        conditionStubIds: ['condition-0-2'],
        actionStubIds: ['action-0-1'],
      },
    ];

    expect(filterInvalidRules(rules, conditions, actions)).toStrictEqual(
      expected
    );
  });
});
