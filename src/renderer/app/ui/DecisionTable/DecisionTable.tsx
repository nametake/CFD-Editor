import React from 'react';
import ReactDataSheet from 'react-datasheet';

import styled from '@emotion/styled';

import { CellType } from '@/app/types';

import { Cell, CellValue } from './Cell';
import { mapCellOption } from './utils';

import 'react-datasheet/lib/react-datasheet.css';

class DataSheet extends ReactDataSheet<CellType> { }

const StyledDataSheet = styled(DataSheet)`
  width: 100%;
  height: 100%;
`;

export type DecisionTableProps = Omit<
  ReactDataSheet.DataSheetProps<CellType>,
  'cellRenderer' | 'valueRenderer'
>;

/* eslint-disable react/jsx-props-no-spreading */
export const DecisionTable = function DecisionTable({
  data,
  ...props
}: DecisionTableProps): JSX.Element {
  return (
    <StyledDataSheet
      {...props}
      data={data.map((row) => row.map(mapCellOption))}
      cellRenderer={Cell}
      valueRenderer={CellValue}
    />
  );
};
/* eslint-enable */
