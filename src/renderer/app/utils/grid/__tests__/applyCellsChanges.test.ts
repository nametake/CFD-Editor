import { applyCellsChanges } from '../applyCellsChanges';
import { CellType, CellsChangedArgs } from '@/app/types';

describe('applyCellsChanges', () => {
  test('single chnage', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
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
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: null } },
      ],
    ];
    const changes: CellsChangedArgs = [
      { cell: grid[1][1], row: 1, col: 1, value: 'Hello' },
      { cell: grid[3][2], row: 3, col: 2, value: 'GoodBye' },
    ];
    const expected = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' } },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'Hello' } },
        { value: { type: 'CONDITION_STUB', value: null } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' } },
        { value: { type: 'ACTION_HEADER', value: 'Action' } },
        { value: { type: 'ACTION_HEADER', value: 'Action stub' } },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: null } },
        { value: { type: 'ACTION_STUB', value: 'GoodBye' } },
      ],
    ];
    expect(applyCellsChanges(grid, changes)).toStrictEqual(expected);
  });
});
