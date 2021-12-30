import ReactDataSheet from 'react-datasheet';
import 'react-datasheet/lib/react-datasheet.css';

interface CauseCell extends ReactDataSheet.Cell<CauseCell, number> {
  type: 'cause';
  value: string | null;
}

interface ElementCell extends ReactDataSheet.Cell<ElementCell, number> {
  type: 'element';
  value: string | null;
}

interface ActionTitleCell extends ReactDataSheet.Cell<ActionTitleCell, number> {
  type: 'action';
  value: string | null;
}

interface ActionNameCell extends ReactDataSheet.Cell<ActionNameCell, number> {
  type: 'action';
  value: string | null;
}

interface CauseRuleCell extends ReactDataSheet.Cell<CauseRuleCell, number> {
  type: 'rule';
  value: 'yes' | 'no';
}

export type CellType =
  | CauseCell
  | ElementCell
  | ActionTitleCell
  | ActionNameCell
  | CauseRuleCell;
