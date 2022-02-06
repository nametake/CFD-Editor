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
        actionId: 'action-0-0',
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

  test.skip('simple all patter', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 1' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 2' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condition 2' } },
        { value: { type: 'CONDITION_STUB', value: 'Sbut 3' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 4' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action' } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 1' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 2' } },
      ],
    ];
    const rules: Rule[] = [
      { conditionStubIds: ['1-2', '3-2'], actionId: '6-2' },
      { conditionStubIds: ['1-2', '4-2'], actionId: '7-2' },
      { conditionStubIds: ['2-2', '3-2'], actionId: '6-2' },
      { conditionStubIds: ['2-2', '4-2'], actionId: '7-2' },
    ];
    const expected: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
        { value: { type: 'CONDITION_HEADER', value: '1' } },
        { value: { type: 'CONDITION_HEADER', value: '2' } },
        { value: { type: 'CONDITION_HEADER', value: '3' } },
        { value: { type: 'CONDITION_HEADER', value: '4' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 1' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 2' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condition 2' } },
        { value: { type: 'CONDITION_STUB', value: 'Sbut 3' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 4' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
        { value: { type: 'ACTION_HEADER', value: null } },
        { value: { type: 'ACTION_HEADER', value: null } },
        { value: { type: 'ACTION_HEADER', value: null } },
        { value: { type: 'ACTION_HEADER', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action' } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 1' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 2' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
    ];
    expect(mergeRules(grid, rules, defaultOption)).toStrictEqual(expected);
  });

  test.skip('empty stub row', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'A' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'B' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condtion 2' } },
        { value: { type: 'CONDITION_STUB', value: 'C' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'D' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action' } },
        { value: { type: 'ACTION_STUB', value: 'Foo' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Bar' } },
      ],
    ];

    const rules = [
      { conditionStubIds: ['1-2', '5-2'], actionId: '9-2' },
      { conditionStubIds: ['1-2', '6-2'], actionId: '11-2' },
      { conditionStubIds: ['3-2', '5-2'], actionId: '9-2' },
      { conditionStubIds: ['3-2', '6-2'], actionId: '11-2' },
    ];

    const expected: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
        { value: { type: 'CONDITION_HEADER', value: '1' } },
        { value: { type: 'CONDITION_HEADER', value: '2' } },
        { value: { type: 'CONDITION_HEADER', value: '3' } },
        { value: { type: 'CONDITION_HEADER', value: '4' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'A' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'B' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condtion 2' } },
        { value: { type: 'CONDITION_STUB', value: 'C' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'D' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
        { value: { type: 'ACTION_HEADER', value: null } },
        { value: { type: 'ACTION_HEADER', value: null } },
        { value: { type: 'ACTION_HEADER', value: null } },
        { value: { type: 'ACTION_HEADER', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action' } },
        { value: { type: 'ACTION_STUB', value: 'Foo' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Bar' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
    ];
    expect(mergeRules(grid, rules, defaultOption)).toStrictEqual(expected);
  });
});
