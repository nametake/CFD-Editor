import { CSSProperties } from 'react';
import {
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
} from 'react-flow-renderer';

export type NodeDataType = {
  label: string;
};

export type CauseNodeDataType = {
  label: {
    text: string;
    style?: CSSProperties;
  };
  elements?: {
    width: number;
    height: number;
  };
};

export type CauseNodeType = Omit<ReactFlowNode<CauseNodeDataType>, 'type'> & {
  type: 'cause';
};
export type ElementNodeType = Omit<ReactFlowNode<NodeDataType>, 'type'> & {
  type: 'element';
};
export type ResultNodeType = Omit<ReactFlowNode<NodeDataType>, 'type'> & {
  type: 'result';
};

export type Node = CauseNodeType | ElementNodeType | ResultNodeType;

export type EdgeDataType = {
  onClickRemove: () => void;
};

export type Edge = Omit<ReactFlowEdge<EdgeDataType>, 'type'> & {
  type: 'removable';
};

export type NodeType = Node['type'];
export type EdgeType = Edge['type'];
