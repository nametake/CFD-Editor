import {
  Edge as ReactFlowEdge,
  Node as ReactFlowNode,
} from 'react-flow-renderer';

export type NodeDataType = {
  label?: string;
};

export type CauseNodeDataType = NodeDataType & {
  style?: {
    labelHeight?: number;
    padding?: {
      top: number;
      right: number;
      bottom: number;
      left: number;
    };
  };
};

export type CauseNodeType<T extends CauseNodeDataType = CauseNodeDataType> =
  Omit<ReactFlowNode<T>, 'type'> & {
    type: 'cause';
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
  | CauseNodeType<T & CauseNodeDataType>
  | ElementNodeType<T>
  | ResultNodeType<T>;
export type Edge = ReactFlowEdge;

export type NodeType = Node['type'];
