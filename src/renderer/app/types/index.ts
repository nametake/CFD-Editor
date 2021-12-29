import {
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
} from 'react-flow-renderer';

export type NodeDataType = {
  label?: string;
};

export type CauseNodeType<T extends NodeDataType = NodeDataType> = Omit<
  ReactFlowNode<T>,
  'type'
> & {
  type: 'cause';
  padding?: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
};
export type ElementNodeType<T extends NodeDataType = NodeDataType> = Omit<
  ReactFlowNode<T>,
  'type'
> & { type: 'element' };
export type ResultNodeType<T extends NodeDataType = NodeDataType> = Omit<
  ReactFlowNode<T>,
  'type'
> & { type: 'result' };

export type Node<T extends NodeDataType = NodeDataType> =
  | CauseNodeType<T>
  | ElementNodeType<T>
  | ResultNodeType<T>;
export type Edge = ReactFlowEdge;

export type NodeType = Node['type'];
