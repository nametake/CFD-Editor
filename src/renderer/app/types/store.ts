import { ValueType } from './cell';
import { EdgeType, NodeType } from './node';

export type StoreNode = {
  id?: string;
  type?: NodeType;
  label?: string;
  position?: { x?: number; y?: number };
};

export type StoreEdge = {
  id?: string;
  type?: EdgeType;
  source?: string;
  target?: string;
};

export type StoreCell = {
  value?: ValueType;
};

export type StoreModel = {
  nodes: StoreNode[];
  edges: StoreEdge[];
  grid: StoreCell[][];
};
