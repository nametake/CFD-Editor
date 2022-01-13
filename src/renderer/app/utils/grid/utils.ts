import { CellType } from '@/app/types';

export const makeId = ({ row, col }: { row: number; col: number }) =>
  `${row}-${col}`;

export const getName = (cell: CellType): string | null => {
  if (cell.value.type === 'TEXT') {
    return cell.value.value;
  }
  return null;
};

export type RowRange = {
  start: number;
  end: number;
};
