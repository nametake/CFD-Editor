import { CellType } from "@/app/types";
import { throwError } from "@/app/utils/assert";

export const findActionRow = (grid: CellType[][]): number => {
  const actionRowIndex = grid.reduce<number>((prev, row, index) => {
    if (row.some(cell => cell.value.type === 'ACTION_HEADER')) {
      return index;
    }
    return prev;
  }, -1)

  if (actionRowIndex >= 0) {
    return actionRowIndex
  }

  return throwError('can not find action row')
}
