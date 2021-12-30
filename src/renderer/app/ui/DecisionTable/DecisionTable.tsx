import React from 'react';
import ReactDataSheet from 'react-datasheet';

import styled from '@emotion/styled';

import 'react-datasheet/lib/react-datasheet.css';

import { Cell, CellValue } from './Cell';
import { CellType } from './types';

class DataSheet extends ReactDataSheet<CellType> { }

const StyledDataSheet = styled(DataSheet)`
  width: 100%;
  height: 100%;
`;

type DecisionTableProps = {
  data: CellType[][];
};

export const DecisionTable = function DecisionTable({
  data,
}: DecisionTableProps): JSX.Element {
  return (
    <StyledDataSheet
      data={data}
      cellRenderer={Cell}
      valueRenderer={CellValue}
      onSelect={(s) => {
        // eslint-disable-next-line no-console
        console.log(s);
      }}
    />
  );
};
