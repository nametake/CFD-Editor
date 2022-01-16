import { CellType } from '@/app/types';

export const makeId = ({ row, col }: { row: number; col: number }) =>
  `${row}-${col}`;

export const getName = (cell: CellType): string | null => {
  switch (cell.value.type) {
    case 'CONDITION_HEADER':
    case 'CONDITION_NAME':
    case 'CONDITION_STUB':
    case 'CONDITION_RULE':
    case 'ACTION_HEADER':
    case 'ACTION_NAME':
    case 'ACTION_STUB':
    case 'ACTION_RULE':
      return cell.value.value;
    default:
      return null
  }
};

export type RowRange = {
  start: number;
  end: number;
};
