import { CellType } from '@/app/types';

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
      return null;
  }
};

export type RowRange = {
  start: number;
  end: number;
};

export const getInvalidType = (row: CellType[]): 'valid' | 'invalid' => {
  const flagCell = row.find((cell) => cell.value.type === 'INVALID_FLAG');
  return flagCell?.value.type === 'INVALID_FLAG' && flagCell.value.value
    ? 'invalid'
    : 'valid';
};
