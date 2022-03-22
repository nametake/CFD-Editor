import { CellType, Edge, Node } from '@/app/types';
import { StoreCell, StoreEdge, StoreModel, StoreNode } from '@/app/types/store';
import { assertUnreachable, throwError } from '@/app/utils/assert';

export type ToArgs = {
  nodes: Node[];
  edges: Edge[];
  grid: CellType[][];
};

export const from = ({ nodes, edges, grid }: ToArgs): StoreModel => ({
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
  })),
  grid: grid.map<StoreCell[]>((row) =>
    row.map<StoreCell>((cell) => ({ value: cell.value }))
  ),
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
    })
  ),
  grid: grid.map<CellType[]>((row) =>
    row.map<CellType>((cell) => ({
      value: cell.value ?? throwError(`cell: not found value`),
    }))
  ),
});

type StoreType = {
  from: typeof from;
  to: typeof to;
};

export const Store: StoreType = {
  from,
  to,
} as const;
