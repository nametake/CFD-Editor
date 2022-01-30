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
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Country' } },
        { value: { type: 'CONDITION_STUB', value: 'Japan' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'USA' } },
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

    const expected: Condition[] = [
      {
        id: '1-1',
        name: 'Card',
        stub: [
          {
            id: '1-2',
            conditionId: '1-1',
            name: 'Visa',
          },
          {
            id: '2-2',
            conditionId: '1-1',
            name: 'MasterCard',
          },
        ],
      },
      {
        id: '4-1',
        name: 'Country',
        stub: [
          {
            id: '4-2',
            conditionId: '4-1',
            name: 'Japan',
          },
          {
            id: '6-2',
            conditionId: '4-1',
            name: 'USA',
          },
        ],
      },
    ];

    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('2 conditions and 1 stubs', () => {
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
        { value: { type: 'CONDITION_NAME', value: 'Card' } },
        { value: { type: 'CONDITION_STUB', value: 'Visa' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Country' } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'USA' } },
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

    const expected: Condition[] = [
      {
        id: '1-1',
        name: 'Card',
        stub: [
          {
            id: '1-2',
            conditionId: '1-1',
            name: 'Visa',
          },
        ],
      },
      {
        id: '3-1',
        name: 'Country',
        stub: [
          {
            id: '4-2',
            conditionId: '3-1',
            name: 'USA',
          },
        ],
      },
    ];

    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('no condition', () => {
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
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        {
          value: { type: 'ACTION_HEADER', value: 'Action stub' },
          readOnly: true,
        },
      ],
    ];

    const expected: Condition[] = [];
    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('single stub(same row)', () => {
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
        { value: { type: 'CONDITION_NAME', value: 'Card' } },
        { value: { type: 'CONDITION_STUB', value: 'Visa' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        {
          value: { type: 'ACTION_HEADER', value: 'Action stub' },
          readOnly: true,
        },
      ],
    ];

    const expected: Condition[] = [
      {
        id: '1-1',
        name: 'Card',
        stub: [
          {
            id: '1-2',
            conditionId: '1-1',
            name: 'Visa',
          },
        ],
      },
    ];
    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('single stub(diff row)', () => {
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
        { value: { type: 'CONDITION_NAME', value: 'Card' } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: null } },
        { value: { type: 'CONDITION_STUB', value: 'MasterCard' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Action' }, readOnly: true },
        {
          value: { type: 'ACTION_HEADER', value: 'Action stub' },
          readOnly: true,
        },
      ],
    ];

    const expected: Condition[] = [
      {
        id: '1-1',
        name: 'Card',
        stub: [
          {
            id: '2-2',
            conditionId: '1-1',
            name: 'MasterCard',
          },
        ],
      },
    ];
    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });

  test('empty string value', () => {
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
        { value: { type: 'CONDITION_NAME', value: '' } },
        { value: { type: 'CONDITION_STUB', value: 'B' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: 'Condition 2' } },
        { value: { type: 'CONDITION_STUB', value: 'C' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'CONDITION_NAME', value: '' } },
        { value: { type: 'CONDITION_STUB', value: 'D' } },
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
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
    ];
    const expected: Condition[] = [
      {
        id: '1-1',
        name: 'Condition 1',
        stub: [
          { id: '1-2', name: 'A', conditionId: '1-1' },
          { id: '2-2', name: 'B', conditionId: '1-1' },
        ],
      },
      {
        id: '3-1',
        name: 'Condition 2',
        stub: [
          { id: '3-2', name: 'C', conditionId: '3-1' },
          { id: '4-2', name: 'D', conditionId: '3-1' },
        ],
      },
    ];

    expect(toConditions(grid, defaultOption)).toStrictEqual(expected);
  });
});
