import React from 'react';

import { CauseFlow } from '@/app/ui/CauseFlow';
import { DecisionTable } from '@/app/ui/DecisionTable';

import { useMainView } from './hooks';

/* eslint-disable react/jsx-props-no-spreading */
export const MainView = function MainView(): JSX.Element {
  const { causeFlowProps, decisionTableProps } = useMainView();
  return (
    <>
      <CauseFlow
        style={{ width: '512px', height: '256px' }}
        {...causeFlowProps}
      />
      <DecisionTable {...decisionTableProps} />
    </>
  );
};

/* eslint-enable */
