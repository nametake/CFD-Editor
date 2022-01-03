import React from 'react';

import { Global } from '@/app/ui/Global';
import { MainView, useMainView } from '@/app/ui/MainView';

/* eslint-disable react/jsx-props-no-spreading */
export const App = function App(): JSX.Element {
  const { causeFlowProps, decisionTableProps } = useMainView();
  return (
    <>
      <Global />
      <MainView
        causeFlowProps={causeFlowProps}
        decisionTableProps={decisionTableProps}
      />
    </>
  );
};
/* eslint-enable */
