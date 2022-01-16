import { CellType, CellsChangedArgs } from '@/app/types';

export const applyCellsChanges = (
  grid: CellType[][],
  changes: CellsChangedArgs
): CellType[][] => {
  const newGrid = grid.map((row) => row.map((cell) => cell));
  changes.forEach(({ cell, row, col, value }) => {
    switch (cell?.value.type) {
      case 'CONDITION_NAME':
      case 'CONDITION_STUB':
      case 'ACTION_NAME':
      case 'ACTION_STUB': {
        newGrid[row][col] = {
          ...cell,
          value: { ...cell.value, value },
        };
        break;
      }
      default:
    }
  });

  return newGrid;
};
