import { mergeRules } from '../mergeRules';
import { Action, CellType, Condition, Rule } from '@/app/types';

const defaultOption = {
  nameColumn: 0,
  stubColumn: 1,
};

describe('mergeRules', () => {
  test('single rule', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'Condition Stub 1' } },
      ],
      [
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 1' } },
      ],
    ];
    const conditions: Condition[] = [
      {
        id: 'condition-0',
        name: 'Condition 1',
        location: { column: 0, row: 1 },
        stub: [
          {
            id: 'condition-0-0',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'Condition Stub 1',
            location: { column: 1, row: 1 },
          },
        ],
      },
    ];
    const actions: Action[] = [
      {
        id: 'action-0',
        name: 'Action 1',
        location: { column: 0, row: 3 },
        stub: [
          {
            id: 'action-0-0',
            type: 'valid',
            actionId: 'action-0',
            name: 'Action Stub 1',
            location: { column: 1, row: 3 },
          },
        ],
      },
    ];
    const rules: Rule[] = [
      {
        conditionStubIds: ['condition-0-0'],
        actionStubIds: ['action-0-0'],
      },
    ];
    const expected: CellType[][] = [
      [
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
        { value: { type: 'CONDITION_HEADER', value: '1' } },
      ],
      [
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'Condition Stub 1' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
        { value: { type: 'ACTION_HEADER', value: null } },
      ],
      [
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 1' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
    ];
    expect(
      mergeRules(grid, conditions, actions, rules, defaultOption)
    ).toStrictEqual(expected);
  });

  test('empty row', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'Condition Stub 1' } },
      ],
      [
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 1' } },
      ],
    ];
    const conditions: Condition[] = [
      {
        id: 'condition-0',
        name: 'Condition 1',
        location: { column: 0, row: 1 },
        stub: [
          {
            id: 'condition-0-0',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'Condition Stub 1',
            location: { column: 1, row: 1 },
          },
        ],
      },
    ];
    const actions: Action[] = [
      {
        id: 'action-0',
        name: 'Action 1',
        location: { column: 0, row: 4 },
        stub: [
          {
            id: 'action-0-0',
            type: 'valid',
            actionId: 'action-0',
            name: 'Action Stub 1',
            location: { column: 1, row: 5 },
          },
        ],
      },
    ];
    const rules: Rule[] = [
      {
        conditionStubIds: ['condition-0-0'],
        actionStubIds: ['action-0-0'],
      },
    ];
    const expected: CellType[][] = [
      [
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
        { value: { type: 'CONDITION_HEADER', value: '1' } },
      ],
      [
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'Condition Stub 1' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
        { value: { type: 'ACTION_HEADER', value: null } },
      ],
      [
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 1' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
    ];
    expect(
      mergeRules(grid, conditions, actions, rules, defaultOption)
    ).toStrictEqual(expected);
  });
});
