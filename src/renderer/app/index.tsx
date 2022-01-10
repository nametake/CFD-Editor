import React from 'react';

import { Main, useMain } from '@/app/pages/Main';
import { Global } from '@/app/ui/Global';

/* eslint-disable react/jsx-props-no-spreading */
export const App = function App(): JSX.Element {
  const { causeFlowProps, decisionTableProps } = useMain();
  return (
    <>
      <Global />
      <Main
        causeFlowProps={causeFlowProps}
        decisionTableProps={decisionTableProps}
      />
    </>
  );
};
/* eslint-enable */
