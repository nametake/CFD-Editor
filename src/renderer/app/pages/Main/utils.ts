import { CellType, Edge, Node } from '@/app/types';
import { StoreEdge, StoreModel, StoreNode, StoreRow } from '@/app/types/store';
import { assertUnreachable, throwError } from '@/app/utils/assert';

import {
  MainState,
  actionHeaderRow,
  conditionHeaderRow,
  emptyActionRow,
  emptyConditionRow,
} from './state';

export type FromOption = {
  invalidColumn: number;
  nameColumn: number;
  stubColumn: number;
};

const from = (
  { nodes, edges, grid }: MainState,
  { invalidColumn, nameColumn, stubColumn }: FromOption
): StoreModel => ({
  nodes: nodes.map<StoreNode>((node) => {
    const n: StoreNode = {
      id: node.id,
      type: node.type,
      position: node.position,
    };
    switch (node.type) {
      case 'cause':
        return {
          ...n,
          label: node.data.label.text,
        };
      case 'element':
      case 'result':
        return {
          ...n,
          label: node.data.label,
        };
      default:
        return assertUnreachable(node);
    }
  }),
  edges: edges.map<StoreEdge>((edge) => ({
    id: edge.id,
    type: edge.type,
    source: edge.source,
    target: edge.target,
    label: edge.data?.label,
  })),
  grid: {
    conditions: grid.reduce<StoreRow[]>((prev, row) => {
      const ivCellValue = row[invalidColumn].value;
      if (ivCellValue.type !== 'INVALID_FLAG') {
        return prev;
      }
      const nameCellValue = row[nameColumn].value;
      if (nameCellValue.type !== 'CONDITION_NAME') {
        return prev;
      }
      const stubCellValue = row[stubColumn].value;
      if (stubCellValue.type !== 'CONDITION_STUB') {
        return prev;
      }

      return [
        ...prev,
        {
          iv: !!ivCellValue.value,
          name: nameCellValue.value ?? '',
          stub: stubCellValue.value ?? '',
        },
      ];
    }, []),
    actions: grid.reduce<StoreRow[]>((prev, row) => {
      const ivCellValue = row[invalidColumn].value;
      if (ivCellValue.type !== 'INVALID_FLAG') {
        return prev;
      }
      const nameCellValue = row[nameColumn].value;
      if (nameCellValue.type !== 'ACTION_NAME') {
        return prev;
      }
      const stubCellValue = row[stubColumn].value;
      if (stubCellValue.type !== 'ACTION_STUB') {
        return prev;
      }

      return [
        ...prev,
        {
          iv: !!ivCellValue.value,
          name: nameCellValue.value ?? '',
          stub: stubCellValue.value ?? '',
        },
      ];
    }, []),
  },
});

export const to = ({
  nodes,
  edges,
  grid,
}: StoreModel): { nodes: Node[]; edges: Edge[]; grid: CellType[][] } => ({
  nodes: nodes.map<Node>((node): Node => {
    const n: Omit<Node, 'type' | 'data'> = {
      id: node.id ?? throwError(`node: not found 'id'`),
      position: { x: node.position?.x ?? 0, y: node.position?.y ?? 0 },
    };
    switch (node.type) {
      case 'cause':
        return {
          ...n,
          type: node.type,
          data: { label: { text: node.label ?? '' } },
        };
      case 'element':
      case 'result':
        return {
          ...n,
          type: node.type,
          data: { label: node.label ?? '' },
        };
      case undefined:
        return throwError(`node: not found 'type'`);
      default:
        return assertUnreachable(node.type);
    }
  }),
  edges: edges.map<Edge>(
    (edge): Edge => ({
      id: edge.id ?? throwError(`edge: not found id`),
      type: edge.type ?? throwError(`edge: not found type`),
      source: edge.source ?? throwError(`edge: not found source`),
      target: edge.target ?? throwError(`edge: not found target`),
      data: { label: edge.label },
    })
  ),
  grid: [
    conditionHeaderRow,
    ...grid.conditions.map<CellType[]>((row) =>
      emptyConditionRow.map((cell) => {
        switch (cell.value.type) {
          case 'INVALID_FLAG':
            return {
              ...cell,
              value: {
                type: 'INVALID_FLAG',
                value: row.iv,
              },
            };
          case 'CONDITION_NAME':
            return {
              ...cell,
              value: {
                type: 'CONDITION_NAME',
                value: row.name,
              },
            };
          case 'CONDITION_STUB':
            return {
              ...cell,
              value: {
                type: 'CONDITION_STUB',
                value: row.stub,
              },
            };
          default:
            return cell;
        }
      })
    ),
    actionHeaderRow,
    ...grid.actions.map<CellType[]>((row) =>
      emptyActionRow.map((cell) => {
        switch (cell.value.type) {
          case 'INVALID_FLAG':
            return {
              ...cell,
              value: {
                type: 'INVALID_FLAG',
                value: row.iv,
              },
            };
          case 'ACTION_NAME':
            return {
              ...cell,
              value: {
                type: 'ACTION_NAME',
                value: row.name,
              },
            };
          case 'ACTION_STUB':
            return {
              ...cell,
              value: {
                type: 'ACTION_STUB',
                value: row.stub,
              },
            };
          default:
            return cell;
        }
      })
    ),
  ],
});

type StoreType = {
  from: typeof from;
  to: typeof to;
};

export const Store: StoreType = {
  from,
  to,
} as const;
