import { CSSProperties } from 'react';

import { Node } from '@/app/types';
import { assertUnreachable } from '@/app/utils/assert';
import { LengthType, parseLength } from '@/app/utils/css';

import { alignVertical } from './alignVertical';
import { CauseNodeWithElements, expandNodes, mergeNodes } from './expandNodes';

type MapStyleOption = {
  causeNodeStyle?: CSSProperties;
  causeNodeLabelStyle?: CSSProperties;
  elementNodeStyle?: CSSProperties;
  resultNodeStyle?: CSSProperties;
};

const mapStyle = (option: MapStyleOption | undefined) => {
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

type SetElementNodePositionOption = {
  elementGap: LengthType;
};

const mapElementNodePosition = (
  option: SetElementNodePositionOption | undefined
) => {
  const { elementGap } = option ?? {};
  return ({
    elements,
    ...node
  }: CauseNodeWithElements): CauseNodeWithElements => ({
      ...node,
      elements: alignVertical(elements, {
        startPosition: {
          x: parseLength(node.style?.paddingLeft) ?? 0,
          y:
            (parseLength(node.style?.paddingTop) ?? 0) +
            (parseLength(node.data.label?.style?.height) ?? 0) +
            (parseLength(elementGap) ?? 0),
        },
        gap: parseLength(elementGap) ?? 0,
      }).map((elementNode) => ({ ...elementNode, draggable: false })),
    });
};

export type SetStyleOption = {
  nodeStyles?: MapStyleOption;
  elementNodePosition?: SetElementNodePositionOption;
};

export const setStyle = (nodes: Node[], option?: SetStyleOption): Node[] => {
  const styledNodes = nodes.map(mapStyle(option?.nodeStyles));
  const [causeNodes, resultNodes] = expandNodes(styledNodes);
  return mergeNodes([
    causeNodes.map(mapElementNodePosition(option?.elementNodePosition)),
    resultNodes,
  ]);
};
