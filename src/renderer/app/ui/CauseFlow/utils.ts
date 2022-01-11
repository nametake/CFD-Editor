import { Node } from '@/app/types';
import { causeLabelStyle, causeNodeStyle } from '@/app/ui/CauseNode';
import { elementNodeStyle } from '@/app/ui/ElementNode';
import { resultNodeStyle } from '@/app/ui/ResultNode';
import { assertUnreachable } from '@/app/utils/assert';

export const mapStyle = (node: Node): Node => {
  switch (node.type) {
    case 'cause':
      return {
        ...node,
        data: {
          ...node.data,
          label: {
            ...node.data.label,
            style: causeLabelStyle,
          },
        },
        style: {
          ...node.style,
          ...causeNodeStyle,
        },
      };
    case 'element':
      return {
        ...node,
        style: {
          ...node.style,
          ...elementNodeStyle,
        },
      };
    case 'result':
      return {
        ...node,
        style: {
          ...node.style,
          ...resultNodeStyle,
        },
      };
    default:
      return assertUnreachable(node);
  }
};
