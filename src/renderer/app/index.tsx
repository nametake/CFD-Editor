import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Main, useMain } from '@/app/pages/Main';
import { Global } from '@/app/ui/Global';

export const AppRoot = function AppRoot(): JSX.Element {
  const { causeFlowProps, decisionTableProps } = useMain();

  return (
    <Main
      causeFlowProps={causeFlowProps}
      decisionTableProps={decisionTableProps}
    />
  );
};

/* eslint-disable react/jsx-props-no-spreading */
export const App = function App(): JSX.Element {
  return (
    <>
      <Global />
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<AppRoot />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
/* eslint-enable */
