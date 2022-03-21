export type StoreNode = {
  id?: string;
  position?: { x?: number; y?: number };
};

export type StoreEdge = {
  id?: string;
  source?: string;
  target?: string;
};

export type StoreCell = {
  x?: number;
  y?: number;
  value?: string;
};
