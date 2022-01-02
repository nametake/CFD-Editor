import React from 'react';
import {
  Handle as HandleReactFlow,
  HandleProps as HandleReactFlowProps,
} from 'react-flow-renderer';

export type HandleProps = Omit<HandleReactFlowProps, 'style'>;

/* eslint-disable react/jsx-props-no-spreading */
export const Handle = function Handle(
  props: HandleReactFlowProps
): JSX.Element {
  return <HandleReactFlow {...props} style={{ width: 8, height: 8 }} />;
};
/* eslint-enable */
