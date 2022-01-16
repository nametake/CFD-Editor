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
});
