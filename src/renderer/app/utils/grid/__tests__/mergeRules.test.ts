import { mergeRules } from '../mergeRules';
import { CellType, Rule } from '@/app/types';

describe('mergeRules', () => {
  test('simple all patter', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        {
          value: { type: 'CONDITION_HEADER', value: 'Condition' },
          readOnly: true,
        },
        {
          value: { type: 'CONDITION_HEADER', value: 'Condition stub' },
          readOnly: true,
        },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 1' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 2' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condition 2' } },
        { value: { type: 'CONDITION_STUB', value: 'Sbut 3' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 4' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        {
          value: { type: 'ACTION_HEADER', value: 'Action stub' },
          readOnly: true,
        },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action' } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 1' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
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
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        {
          value: { type: 'CONDITION_HEADER', value: 'Condition' },
          readOnly: true,
        },
        {
          value: { type: 'CONDITION_HEADER', value: 'Condition stub' },
          readOnly: true,
        },
        { value: { type: 'CONDITION_HEADER', value: '1' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: '2' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: '3' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: '4' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 1' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 2' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condition 2' } },
        { value: { type: 'CONDITION_STUB', value: 'Sbut 3' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'Stub 4' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        {
          value: { type: 'ACTION_HEADER', value: 'Action stub' },
          readOnly: true,
        },
        { value: { type: 'EMPTY' }, readOnly: true },
        { value: { type: 'EMPTY' }, readOnly: true },
        { value: { type: 'EMPTY' }, readOnly: true },
        { value: { type: 'EMPTY' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action' } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 1' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action Stub 2' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
    ];
    expect(mergeRules(grid, rules)).toStrictEqual(expected);
  });

  test('empty stub row', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        {
          value: { type: 'CONDITION_HEADER', value: 'Condition' },
          readOnly: true,
        },
        {
          value: { type: 'CONDITION_HEADER', value: 'Condition stub' },
          readOnly: true,
        },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'A' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'B' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condtion 2' } },
        { value: { type: 'CONDITION_STUB', value: 'C' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'D' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        {
          value: { type: 'ACTION_HEADER', value: 'Action stub' },
          readOnly: true,
        },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action' } },
        { value: { type: 'ACTION_STUB', value: 'Foo' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
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
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        {
          value: { type: 'CONDITION_HEADER', value: 'Condition' },
          readOnly: true,
        },
        {
          value: { type: 'CONDITION_HEADER', value: 'Condition stub' },
          readOnly: true,
        },
        { value: { type: 'CONDITION_HEADER', value: '1' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: '2' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: '3' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: '4' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'A' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'B' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condtion 2' } },
        { value: { type: 'CONDITION_STUB', value: 'C' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'D' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        {
          value: { type: 'ACTION_HEADER', value: 'Action stub' },
          readOnly: true,
        },
        { value: { type: 'EMPTY' }, readOnly: true },
        { value: { type: 'EMPTY' }, readOnly: true },
        { value: { type: 'EMPTY' }, readOnly: true },
        { value: { type: 'EMPTY' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action' } },
        { value: { type: 'ACTION_STUB', value: 'Foo' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
        { value: { type: 'EMPTY' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Bar' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
        { value: { type: 'CONDITION_RULE', value: 'no' } },
        { value: { type: 'CONDITION_RULE', value: 'yes' } },
      ],
    ];
    expect(mergeRules(grid, rules)).toStrictEqual(expected);
  });
});
