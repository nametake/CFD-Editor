import React from 'react';
import ReactDataSheet from 'react-datasheet';

import styled from '@emotion/styled';

import 'react-datasheet/lib/react-datasheet.css';
import { assertUnreachable } from '@/app/utils/assert';

import { CellType } from './types';

export const TitleCell = styled.td`
  color: black;
  .value-viewer {
    text-align: center;
  }
`;

export const DefaultCell = styled.td`
  color: black;
`;

/* eslint-disable jsx-a11y/no-noninteractive-element-interactions,react/jsx-props-no-spreading */
export const Cell: ReactDataSheet.CellRenderer<CellType> = function Cell({
  // row,
  // col,
  cell,
  className,
  // style,
  // selected,
  // editing,
  // updated,
  // attributesRenderer,
  onMouseDown,
  onMouseOver,
  onDoubleClick,
  onContextMenu,
  children,
}) {
  const cellProps = {
    onMouseDown,
    onMouseOver,
    onDoubleClick,
    onContextMenu,
    className,
  };
  switch (cell.value.type) {
    case 'title':
      return <TitleCell {...cellProps}>{children}</TitleCell>;
    case 'control':
    case 'condition':
    case 'conditionStub':
    case 'conditionStubRule':
    case 'action':
    case 'actionStub':
    case 'actionStubRule':
      return <DefaultCell {...cellProps}>{children}</DefaultCell>;
    default:
      return assertUnreachable(cell.value);
  }
};
/* eslint-enable */

export const CellValue: ReactDataSheet.ValueRenderer<CellType> =
  function Value({ value }) {
    switch (value.type) {
      case 'control':
        return null;
      case 'title':
      case 'condition':
      case 'conditionStub':
      case 'conditionStubRule':
      case 'action':
      case 'actionStub':
      case 'actionStubRule':
        return value.value;
      default:
        return assertUnreachable(value);
    }
  };
