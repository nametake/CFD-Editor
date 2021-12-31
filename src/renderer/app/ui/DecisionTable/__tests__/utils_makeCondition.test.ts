import { CellType } from '../types';
import { makeCondition } from '../utils';
import { Condition } from '@/app/types';

describe('utils/makeCondition', () => {
  test('2 conditions', () => {
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
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: null } },
      ],
      [
        { value: { type: 'REMOVE_ROW' }, readOnly: true },
        { value: { type: 'TEXT', value: null } },
        { value: { type: 'TEXT', value: null } },
      ],
    ];

    const expected: Condition[] = [
      {
        id: '2-2',
        name: 'Card',
        stub: [
          {
            id: '3-3',
            conditionId: '2-2',
            name: 'Visa',
          },
          {
            id: '3-4',
            conditionId: '2-2',
            name: 'MasterCard',
          },
        ],
      },
      {
        id: '2-4',
        name: 'Country',
        stub: [
          {
            id: '3-4',
            conditionId: '2-4',
            name: 'Japan',
          },
          {
            id: '3-5',
            conditionId: '2-5',
            name: 'USA',
          },
        ],
      },
    ];

    expect(makeCondition(grid)).toStrictEqual(expected);
  });
});
