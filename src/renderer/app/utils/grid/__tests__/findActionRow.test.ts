import { findActionRow } from "../findActionRow";
import { CellType } from "@/app/types";

describe('findActionRow', () => {
  test('find action row', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'NAME' } },
        { value: { type: 'CONDITION_STUB', value: 'STUB' } },
      ],
      [
        { value: { type: 'ADD_ACTION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Condition' }, readOnly: true },
        { value: { type: 'ACTION_HEADER', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'ACTION_NAME', value: 'NAME' } },
        { value: { type: 'ACTION_STUB', value: 'STUB' } },
      ],
    ];

    expect(findActionRow(grid)).toBe(2)
  })

  test('no action row in a grid', () => {
    const grid: CellType[][] = [
      [
        { value: { type: 'ADD_CONDITION_ROW_BUTTON' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition' }, readOnly: true },
        { value: { type: 'CONDITION_HEADER', value: 'Condition stub' }, readOnly: true },
      ],
      [
        { value: { type: 'REMOVE_ROW' } },
        { value: { type: 'CONDITION_NAME', value: 'NAME' } },
        { value: { type: 'CONDITION_STUB', value: 'STUB' } },
      ],
    ];

    expect(() => (findActionRow(grid))).toThrowError('can not find action row')
  })
})
