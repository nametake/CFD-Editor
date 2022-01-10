import React from 'react';

import { CauseFlow, CauseFlowProps } from '@/app/ui/CauseFlow';
import { DecisionTable, DecisionTableProps } from '@/app/ui/DecisionTable';

export type MainProps = {
  causeFlowProps: CauseFlowProps;
  decisionTableProps: DecisionTableProps;
};

/* eslint-disable react/jsx-props-no-spreading */
export const Main = function Main({
  causeFlowProps,
  decisionTableProps,
}: MainProps): JSX.Element {
  return (
    <>
      <CauseFlow {...causeFlowProps} />
      <DecisionTable {...decisionTableProps} />
    </>
  );
};

/* eslint-enable */
