import { initialState } from '../hooks';
import { CellType } from '../types';
import { makeConditions } from '../utils';
import { Condition } from '@/app/types';

describe('utils/makeCondition', () => {
  test('2 conditions and 2 stubs', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Condition' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Card' } },
        { value: { type: 'TEXT', value: 'Visa' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'MasterCard' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Country' } },
        { value: { type: 'TEXT', value: 'Japan' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'USA' } },
      ],
      [
        { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Action' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Action stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Action 1' } },
        { value: { type: 'TEXT', value: 'Action 1 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'Action 1 two' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Action 2' } },
        { value: { type: 'TEXT', value: 'Action 2 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'Action 2 two' } },
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

    expect(makeConditions(grid)).toStrictEqual(expected);
  });

  test('2 conditions and 1 stubs', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Condition' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Card' } },
        { value: { type: 'TEXT', value: 'Visa' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Country' } },
        { value: { type: 'TEXT', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'USA' } },
      ],
      [
        { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Action' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Action stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Action 1' } },
        { value: { type: 'TEXT', value: 'Action 1 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'Action 1 two' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Action 2' } },
        { value: { type: 'TEXT', value: 'Action 2 one' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'Action 2 two' } },
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

    expect(makeConditions(grid)).toStrictEqual(expected);
  });

  test('no condition', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Condition' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'HEADER_ADD_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Action' }, readOnly: true },
        { value: { type: 'TITLE', value: 'Action stub' }, readOnly: true },
      ],
    ];

    const expected: Condition[] = [];
    expect(makeConditions(grid)).toStrictEqual(expected);
  });

  test('initial state', () => {
    const { grid } = initialState;

    const expected: Condition[] = [];
    expect(makeConditions(grid)).toStrictEqual(expected);
  });
});
