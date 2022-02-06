import { toActions } from '../toActions';
import { Action, CellType } from '@/app/types';

const defaultOption = {
  nameColumn: 1,
  stubColumn: 2,
};

describe('toActions', () => {
  test('2 actions 2 stubs', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Card' } },
        { value: { type: 'CONDITION_STUB', value: 'Visa' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'MasterCard' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Country' } },
        { value: { type: 'CONDITION_STUB', value: 'Japan' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'USA' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 two' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action 2' } },
        { value: { type: 'ACTION_STUB', value: 'Action 2 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action 2 two' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: 'action-0',
        name: 'Action 1',
        location: { column: 1, row: 6 },
        stub: [
          {
            id: 'action-stub-0-0',
            actionId: 'action-0',
            name: 'Action 1 one',
            location: { column: 2, row: 6 },
          },
          {
            id: 'action-stub-0-1',
            actionId: 'action-0',
            name: 'Action 1 two',
            location: { column: 2, row: 7 },
          },
        ],
      },
      {
        id: 'action-1',
        name: 'Action 2',
        location: { column: 1, row: 8 },
        stub: [
          {
            id: 'action-stub-1-0',
            actionId: 'action-1',
            name: 'Action 2 one',
            location: { column: 2, row: 8 },
          },
          {
            id: 'action-stub-1-1',
            actionId: 'action-1',
            name: 'Action 2 two',
            location: { column: 2, row: 9 },
          },
        ],
      },
    ];

    expect(toActions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('2 actions 1 stubs', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Card' } },
        { value: { type: 'CONDITION_STUB', value: 'Visa' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'MasterCard' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Country' } },
        { value: { type: 'CONDITION_STUB', value: 'Japan' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'USA' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action 2' } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action 2 two' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: 'action-0',
        name: 'Action 1',
        location: { column: 1, row: 6 },
        stub: [
          {
            id: 'action-stub-0-0',
            actionId: 'action-0',
            name: 'Action 1 one',
            location: { column: 2, row: 6 },
          },
        ],
      },
      {
        id: 'action-1',
        name: 'Action 2',
        location: { column: 1, row: 8 },
        stub: [
          {
            id: 'action-stub-1-0',
            actionId: 'action-1',
            name: 'Action 2 two',
            location: { column: 2, row: 9 },
          },
        ],
      },
    ];

    expect(toActions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('no action', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
    ];

    const expected: Action[] = [];

    expect(toActions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('single stub(same row)', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: 'action-0',
        name: 'Action 1',
        location: { column: 1, row: 2 },
        stub: [
          {
            id: 'action-stub-0-0',
            actionId: 'action-0',
            name: 'Action 1 one',
            location: { column: 2, row: 2 },
          },
        ],
      },
    ];

    expect(toActions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('single stub(diff row)', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'Action 1 one' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: 'action-0',
        name: 'Action 1',
        location: { column: 1, row: 2 },
        stub: [
          {
            id: 'action-stub-0-0',
            actionId: 'action-0',
            name: 'Action 1 one',
            location: { column: 2, row: 3 },
          },
        ],
      },
    ];

    expect(toActions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('empty string value', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: '' } },
        { value: { type: 'CONDITION_STUB', value: '' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action 1' } },
        { value: { type: 'ACTION_STUB', value: 'A' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: '' } },
        { value: { type: 'ACTION_STUB', value: 'B' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'Action 2' } },
        { value: { type: 'ACTION_STUB', value: 'C' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: '' } },
        { value: { type: 'ACTION_STUB', value: 'D' } },
      ],
    ];

    const expected: Action[] = [
      {
        id: 'action-0',
        name: 'Action 1',
        location: { column: 1, row: 3 },
        stub: [
          {
            id: 'action-stub-0-0',
            name: 'A',
            actionId: 'action-0',
            location: { column: 2, row: 3 },
          },
          {
            id: 'action-stub-0-1',
            name: 'B',
            actionId: 'action-0',
            location: { column: 2, row: 4 },
          },
        ],
      },
      {
        id: 'action-1',
        name: 'Action 2',
        location: { column: 1, row: 5 },
        stub: [
          {
            id: 'action-stub-1-0',
            name: 'C',
            actionId: 'action-1',
            location: { column: 2, row: 5 },
          },
          {
            id: 'action-stub-1-1',
            name: 'D',
            actionId: 'action-1',
            location: { column: 2, row: 6 },
          },
        ],
      },
    ];

    expect(toActions(grid, defaultOption)).toStrictEqual(expected);
  });
});
