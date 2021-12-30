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

export const TextCell = styled.td`
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
    case 'empty':
      return <td {...cellProps} />;
    case 'title':
      return <TitleCell {...cellProps}>{children}</TitleCell>;
    case 'text':
    case 'actionRule':
    case 'conditionRule':
      return <TextCell {...cellProps}>{children}</TextCell>;
    default:
      return assertUnreachable(cell.value);
  }
};
/* eslint-enable */

export const CellValue: ReactDataSheet.ValueRenderer<CellType> =
  function Value({ value }) {
    switch (value.type) {
      case 'empty':
        return null;
      case 'title':
      case 'text':
      case 'actionRule':
      case 'conditionRule':
        return value.value;
      default:
        return assertUnreachable(value);
    }
  };
