import { Grid } from '../index';
import { Action, CellType } from '@/app/types';

describe('Grid.toActions', () => {
  test('2 actions 2 stubs', () => {
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
        { value: { type: 'TEXT', value: 'Country' } },
        { value: { type: 'TEXT', value: 'Japan' } },
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

    expect(Grid.toActions(grid)).toStrictEqual(expected);
  });

  test('2 actions 1 stubs', () => {
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
        { value: { type: 'TEXT', value: 'Country' } },
        { value: { type: 'TEXT', value: 'Japan' } },
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
        { value: { type: 'TEXT', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Action 2' } },
        { value: { type: 'TEXT', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'Action 2 two' } },
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

    expect(Grid.toActions(grid)).toStrictEqual(expected);
  });

  test('no action', () => {
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

    const expected: Action[] = [];

    expect(Grid.toActions(grid)).toStrictEqual(expected);
  });

  test('single stub(same row)', () => {
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
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Action 1' } },
        { value: { type: 'TEXT', value: 'Action 1 one' } },
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

    expect(Grid.toActions(grid)).toStrictEqual(expected);
  });

  test('single stub(diff row)', () => {
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
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: 'Action 1' } },
        { value: { type: 'TEXT', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: 'Action 1 one' } },
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

    expect(Grid.toActions(grid)).toStrictEqual(expected);
  });
});
