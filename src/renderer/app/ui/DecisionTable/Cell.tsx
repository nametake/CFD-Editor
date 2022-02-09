import React from 'react';
import ReactDataSheet from 'react-datasheet';

import styled from '@emotion/styled';

import { CellType } from '@/app/types';
import { Button } from '@/app/ui/Button';
import { assertUnreachable } from '@/app/utils/assert';

const Centering = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DefaultCell = styled.td`
  vertical-align: middle !important;

  .value-viewer {
    min-height: 28px;
    padding: 0 8px;
    line-height: 28px;
  }

  .data-editor {
    padding-left: 6px;
  }
`;

export const RowNumberCell = styled(DefaultCell)`
  width: 64px;
  color: #999;
  font-size: 14px;

  .value-viewer {
    background-color: whitesmoke;
    text-align: center;
  }
`;

const InnerButtonCell = styled(DefaultCell)`
  width: 64px;
  background-color: whitesmoke !important;
`;

export const ButtonCell = function ButtonCell({
  children,
  ...props
}: React.DetailedHTMLProps<
  React.TdHTMLAttributes<HTMLTableCellElement>,
  HTMLTableCellElement
>): JSX.Element {
  /* eslint-disable react/jsx-props-no-spreading */
  return (
    <InnerButtonCell {...props}>
      <Centering>{children}</Centering>
    </InnerButtonCell>
  );
  /* eslint-enable */
};

export const TitleCell = styled(DefaultCell)`
  background: whitesmoke;
  color: #999;
  text-align: center;
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
    case 'ROW_NUMBER':
      return <RowNumberCell {...cellProps}>{children}</RowNumberCell>;
    case 'CONDITION_HEADER':
    case 'ACTION_HEADER':
      return <TitleCell {...cellProps}>{children}</TitleCell>;
    case 'ADD_CONDITION_ROW_BUTTON':
    case 'ADD_ACTION_ROW_BUTTON':
      return (
        <ButtonCell {...cellProps}>
          <Button onClick={cell.value.onClick}>+</Button>
        </ButtonCell>
      );
    case 'REMOVE_ROW':
      return (
        <ButtonCell {...cellProps}>
          <Button onClick={cell.value.onClick}>-</Button>
        </ButtonCell>
      );
    case 'CONDITION_NAME':
    case 'CONDITION_STUB':
    case 'CONDITION_RULE':
    case 'ACTION_NAME':
    case 'ACTION_STUB':
    case 'ACTION_RULE':
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
      case 'REMOVE_ROW':
      case 'ADD_CONDITION_ROW_BUTTON':
      case 'ADD_ACTION_ROW_BUTTON':
        return null;
      case 'ROW_NUMBER':
      case 'CONDITION_HEADER':
      case 'CONDITION_NAME':
      case 'CONDITION_STUB':
      case 'CONDITION_RULE':
      case 'ACTION_HEADER':
      case 'ACTION_NAME':
      case 'ACTION_STUB':
      case 'ACTION_RULE':
        return value.value;
      default:
        return assertUnreachable(value);
    }
  };
