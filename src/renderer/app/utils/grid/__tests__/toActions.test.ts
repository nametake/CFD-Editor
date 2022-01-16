import { toActions } from '../toActions';
import { Action, CellType } from '@/app/types';

describe('toActions', () => {
  test('2 actions 2 stubs', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Card' } },
        { value: { type: 'CONDITION_STUB', value: 'Visa' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'MasterCard' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Country' } },
        { value: { type: 'CONDITION_STUB', value: 'Japan' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'USA' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 two' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action 2' } },
        { value: { type: 'ACTION_STUB', value: 'Action 2 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action 2 two' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: '6-1',
        name: 'Action 1',
        stub: [
          {
            id: '6-2',
            actionId: '6-1',
            name: 'Action 1 one',
          },
          {
            id: '7-2',
            actionId: '6-1',
            name: 'Action 1 two',
          },
        ],
      },
      {
        id: '8-1',
        name: 'Action 2',
        stub: [
          {
            id: '8-2',
            actionId: '8-1',
            name: 'Action 2 one',
          },
          {
            id: '9-2',
            actionId: '8-1',
            name: 'Action 2 two',
          },
        ],
      },
    ];

    expect(toActions(grid)).toStrictEqual(expected);
  });

  test('2 actions 1 stubs', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Card' } },
        { value: { type: 'CONDITION_STUB', value: 'Visa' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'MasterCard' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Country' } },
        { value: { type: 'CONDITION_STUB', value: 'Japan' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'USA' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action 2' } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action 2 two' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: '6-1',
        name: 'Action 1',
        stub: [
          {
            id: '6-2',
            actionId: '6-1',
            name: 'Action 1 one',
          },
        ],
      },
      {
        id: '8-1',
        name: 'Action 2',
        stub: [
          {
            id: '9-2',
            actionId: '8-1',
            name: 'Action 2 two',
          },
        ],
      },
    ];

    expect(toActions(grid)).toStrictEqual(expected);
  });

  test('no action', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' }, readOnly: true },
      ],
    ];

    const expected: Action[] = [];

    expect(toActions(grid)).toStrictEqual(expected);
  });

  test('single stub(same row)', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: '2-1',
        name: 'Action 1',
        stub: [
          {
            id: '2-2',
            actionId: '2-1',
            name: 'Action 1 one',
          },
        ],
      },
    ];

    expect(toActions(grid)).toStrictEqual(expected);
  });

  test('single stub(diff row)', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: '2-1',
        name: 'Action 1',
        stub: [
          {
            id: '3-2',
            actionId: '2-1',
            name: 'Action 1 one',
          },
        ],
      },
    ];

    expect(toActions(grid)).toStrictEqual(expected);
  });
});
