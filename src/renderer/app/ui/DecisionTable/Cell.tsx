import React from 'react';
import ReactDataSheet from 'react-datasheet';

import styled from '@emotion/styled';

import { CellType } from '@/app/types';
import { Button } from '@/app/ui/Button';
import { assertUnreachable } from '@/app/utils/assert';

const DefaultCell = styled.td`
  vertical-align: middle !important;

  .value-viewer {
    min-height: 32px;
    padding: 0 8px;
    line-height: 32px;
    text-align: left;
  }

  .data-editor {
    width: 100% !important;
    height: 100% !important;
  }
`;

export const TitleCell = styled(DefaultCell)`
  color: black;

  .value-viewer {
    text-align: center;
  }
`;

export const TextCell = styled(DefaultCell)`
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
    case 'EMPTY':
      return <DefaultCell {...cellProps}>{children}</DefaultCell>;
    case 'TITLE':
      return <TitleCell {...cellProps}>{children}</TitleCell>;
    case 'HEADER_ADD_ROW_BUTTON':
      return (
        <DefaultCell {...cellProps}>
          <Button onClick={cell.value.onClick}>+</Button>
        </DefaultCell>
      );
    case 'REMOVE_ROW':
      return (
        <DefaultCell {...cellProps}>
          <Button onClick={cell.value.onClick}>-</Button>
        </DefaultCell>
      );
    case 'TEXT':
    case 'ACTION_RULE':
    case 'CONDITION_RULE':
      return <TextCell {...cellProps}>{children}</TextCell>;
    default:
      return assertUnreachable(cell.value);
  }
};
/* eslint-enable */

export const CellValue: ReactDataSheet.ValueRenderer<CellType> =
  function Value({ value }) {
    switch (value.type) {
      case 'EMPTY':
        return null;
      case 'HEADER_ADD_ROW_BUTTON':
      case 'REMOVE_ROW':
        return null;
      case 'TITLE':
      case 'TEXT':
      case 'ACTION_RULE':
      case 'CONDITION_RULE':
        return value.value;
      default:
        return assertUnreachable(value);
    }
  };
