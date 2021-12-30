import React, { useState } from 'react';
import ReactDataSheet from 'react-datasheet';

import styled from '@emotion/styled';

import 'react-datasheet/lib/react-datasheet.css';
import { assertUnreachable } from '@/app/utils/assert';

type ValueType =
  | { type: 'condition'; value: string | null }
  | { type: 'conditionStub'; value: string | null }
  | { type: 'conditionStubRule'; value: 'yes' | 'no' }
  | { type: 'action'; value: string | null }
  | { type: 'actionStub'; value: string | null }
  | { type: 'actionStubRule'; value: 'yes' | 'no' };

interface CellType extends ReactDataSheet.Cell<CellType> {
  value: ValueType;
}

class DataSheet extends ReactDataSheet<CellType> { }

const ActionTitleCell = styled.td`
  color: red;
`;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
// You can also strongly type all the Components or SFCs that you pass into ReactDataSheet.
const cellRenderer: ReactDataSheet.CellRenderer<CellType> = ({
  cell,
  ...props
}) => {
  // eslint-disable-next-line no-console
  console.log(props);
  switch (cell.value.type) {
    case 'condition':
    case 'conditionStub':
    case 'conditionStubRule':
    case 'action':
    case 'actionStub':
    case 'actionStubRule':
      return (
        <ActionTitleCell
          onMouseDown={props.onMouseDown}
          onMouseOver={props.onMouseOver}
          onDoubleClick={props.onDoubleClick}
          onFocus={() => { }}
          className="cell selected"
        >
          {props.children}
          {props.selected}
        </ActionTitleCell>
      );
    default:
      return assertUnreachable(cell.value);
  }
};
/* eslint-enable */

const StyledDataSheet = styled(DataSheet)`
  width: 100%;
  height: 100%;
`;

export const DecisionTable = function DecisionTable(): JSX.Element {
  const [grid] = useState<CellType[][]>([
    [{ value: { type: 'action', value: 'no' } }],
  ]);
  return (
    <StyledDataSheet
      data={grid}
      valueRenderer={(cell) => cell.value.value}
      onSelect={(s) => {
        // eslint-disable-next-line no-console
        console.log(s);
      }}
      cellRenderer={cellRenderer}
    />
  );
};
