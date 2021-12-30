import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

export interface CellType extends ReactDataSheet.Cell<CellType, number> {
  value: string | null;
}

class DataSheet extends ReactDataSheet<CellType, number> { }

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// You can also strongly type all the Components or SFCs that you pass into ReactDataSheet.
const cellRenderer: ReactDataSheet.CellRenderer<CellType, number> = (props) => {
  const backgroundStyle =
    props.cell.value && props.cell.value < 0 ? { color: 'red' } : undefined;
  return (
    <td
      style={backgroundStyle}
      onMouseDown={props.onMouseDown}
      onMouseOver={props.onMouseOver}
      onDoubleClick={props.onDoubleClick}
      onFocus={() => { }}
      className="cell"
    >
      {props.children}
    </td>
  );
};
/* eslint-enable */

export const DecisionTable = function DecisionTable(): JSX.Element {
  const [grid] = useState([
    [{ value: 1 }, { value: -3, readOnly: true }],
    [{ value: -2 }, { value: 4 }],
  ]);
  return (
    <DataSheet
      data={grid}
      valueRenderer={(cell) => cell.value}
      // onCellsChanged={(changes) => {
      //   const grid = grid.map((row) => [...row]);
      //   changes.forEach(({ cell, row, col, value }) => {
      //     grid[row][col] = { ...grid[row][col], value };
      //   });
      //   setGrid((grid) => );
      // }}
      onSelect={(s) => {
        // eslint-disable-next-line no-console
        console.log(s);
      }}
      cellRenderer={cellRenderer}
    />
  );
};
