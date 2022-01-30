import { Node } from '@/app/types';

type MergeArgs = {
  oldNodes: Node[];
  newNodes: Node[];
};

export const merge = ({ oldNodes, newNodes }: MergeArgs): Node[] =>
  newNodes.map((newNode) => {
    const prevNode = oldNodes.find((node) => node.id === newNode.id);
    return {
      ...prevNode,
      ...newNode,
      position: prevNode?.position ?? newNode.position,
      style: {
        ...prevNode?.style,
        ...newNode.style,
      },
    };
  });
