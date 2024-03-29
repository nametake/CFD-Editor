import { CSSProperties } from 'react';

import { Node } from '@/app/types';
import { assertUnreachable } from '@/app/utils/assert';

export type MapStyleOption = {
  causeNodeStyle?: CSSProperties;
  causeNodeLabelStyle?: CSSProperties;
  elementNodeStyle?: CSSProperties;
  resultNodeStyle?: CSSProperties;
};

export const mapStyle = (option?: MapStyleOption) => {
  const {
    causeNodeStyle,
    causeNodeLabelStyle,
    elementNodeStyle,
    resultNodeStyle,
  } = option ?? {};
  return (node: Node): Node => {
    switch (node.type) {
      case 'cause':
        return {
          ...node,
          style: causeNodeStyle
            ? { ...node.style, ...causeNodeStyle }
            : node.style,
          data: {
            ...node.data,
            label: causeNodeLabelStyle
              ? { ...node.data.label, style: causeNodeLabelStyle }
              : node.data.label,
          },
        };
      case 'element':
        return {
          ...node,
          style: elementNodeStyle
            ? { ...node.style, ...elementNodeStyle }
            : node.style,
        };
      case 'result':
        return {
          ...node,
          style: resultNodeStyle
            ? { ...node.style, ...resultNodeStyle }
            : node.style,
        };
      default:
        return assertUnreachable(node);
    }
  };
};
