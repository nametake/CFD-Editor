import { toConditions } from '../toConditions';
import { CellType, Condition } from '@/app/types';

const defaultOption = {
  nameColumn: 1,
  stubColumn: 2,
};

describe('toConditions', () => {
  test('2 conditions and 2 stubs', () => {
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
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Country' } },
        { value: { type: 'CONDITION_STUB', value: 'Japan' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
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

    const expected: Condition[] = [
      {
        id: 'condition-0',
        name: 'Card',
        location: { column: 1, row: 1 },
        stub: [
          {
            id: 'condition-stub-0-0',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'Visa',
            location: { column: 2, row: 1 },
          },
          {
            id: 'condition-stub-0-1',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'MasterCard',
            location: { column: 2, row: 2 },
          },
        ],
      },
      {
        id: 'condition-1',
        name: 'Country',
        location: { column: 1, row: 4 },
        stub: [
          {
            id: 'condition-stub-1-0',
            type: 'valid',
            conditionId: 'condition-1',
            name: 'Japan',
            location: { column: 2, row: 4 },
          },
          {
            id: 'condition-stub-1-1',
            type: 'valid',
            conditionId: 'condition-1',
            name: 'USA',
            location: { column: 2, row: 6 },
          },
        ],
      },
    ];

    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('2 conditions and 1 stubs', () => {
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
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Country' } },
        { value: { type: 'CONDITION_STUB', value: null } },
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

    const expected: Condition[] = [
      {
        id: 'condition-0',
        name: 'Card',
        location: { column: 1, row: 1 },
        stub: [
          {
            id: 'condition-stub-0-0',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'Visa',
            location: { column: 2, row: 1 },
          },
        ],
      },
      {
        id: 'condition-1',
        name: 'Country',
        location: { column: 1, row: 3 },
        stub: [
          {
            id: 'condition-stub-1-0',
            type: 'valid',
            conditionId: 'condition-1',
            name: 'USA',
            location: { column: 2, row: 4 },
          },
        ],
      },
    ];

    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('no condition', () => {
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

    const expected: Condition[] = [];
    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('single stub(same row)', () => {
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
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
    ];

    const expected: Condition[] = [
      {
        id: 'condition-0',
        name: 'Card',
        location: { column: 1, row: 1 },
        stub: [
          {
            id: 'condition-stub-0-0',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'Visa',
            location: { column: 2, row: 1 },
          },
        ],
      },
    ];
    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('single stub(diff row)', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Card' } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'MasterCard' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
    ];

    const expected: Condition[] = [
      {
        id: 'condition-0',
        name: 'Card',
        location: { column: 1, row: 1 },
        stub: [
          {
            id: 'condition-stub-0-0',
            type: 'valid',
            conditionId: 'condition-0',
            name: 'MasterCard',
            location: { column: 2, row: 2 },
          },
        ],
      },
    ];
    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
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
        { value: { type: 'CONDITION_NAME', value: 'Condition 1' } },
        { value: { type: 'CONDITION_STUB', value: 'A' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: '' } },
        { value: { type: 'CONDITION_STUB', value: 'B' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Condition 2' } },
        { value: { type: 'CONDITION_STUB', value: 'C' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: '' } },
        { value: { type: 'CONDITION_STUB', value: 'D' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
    ];
    const expected: Condition[] = [
      {
        id: 'condition-0',
        name: 'Condition 1',
        location: { column: 1, row: 1 },
        stub: [
          {
            id: 'condition-stub-0-0',
            type: 'valid',
            name: 'A',
            conditionId: 'condition-0',
            location: { column: 2, row: 1 },
          },
          {
            id: 'condition-stub-0-1',
            type: 'valid',
            name: 'B',
            conditionId: 'condition-0',
            location: { column: 2, row: 2 },
          },
        ],
      },
      {
        id: 'condition-1',
        name: 'Condition 2',
        location: { column: 1, row: 3 },
        stub: [
          {
            id: 'condition-stub-1-0',
            type: 'valid',
            name: 'C',
            conditionId: 'condition-1',
            location: { column: 2, row: 3 },
          },
          {
            id: 'condition-stub-1-1',
            type: 'valid',
            name: 'D',
            conditionId: 'condition-1',
            location: { column: 2, row: 4 },
          },
        ],
      },
    ];

    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });
});
