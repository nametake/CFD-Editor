import { CellType } from '@/app/types';
import { assertUnreachable } from '@/app/utils/assert';

export const mapCellOption = (cell: CellType): CellType => {
  switch (cell.value.type) {
    case 'ROW_NUMBER':
    case 'ADD_CONDITION_ROW_BUTTON':
    case 'ADD_ACTION_ROW_BUTTON':
    case 'REMOVE_ROW':
      return {
        ...cell,
        disableEvents: true,
      };
    case 'CONDITION_HEADER':
    case 'ACTION_HEADER':
      return {
        ...cell,
        readOnly: true,
      };
    case 'EMPTY':
    case 'CONDITION_NAME':
    case 'CONDITION_STUB':
    case 'CONDITION_RULE':
    case 'ACTION_NAME':
    case 'ACTION_STUB':
    case 'ACTION_RULE':
      return cell;
    default:
      return assertUnreachable(cell.value);
  }
};

export const mapRowNumber = (row: CellType[], i: number): CellType[] =>
  row.map((cell) =>
    cell.value.type === 'ROW_NUMBER'
      ? { ...cell, value: { ...cell.value, value: i + 1 } }
      : cell
  );
