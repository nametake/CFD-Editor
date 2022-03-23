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

const getBasename = (path: string) => path.substr(0, path.lastIndexOf('/'));

/* eslint-disable react/jsx-props-no-spreading */
export const App = function App(): JSX.Element {
  return (
    <>
      <Global />
      <BrowserRouter basename={getBasename(window.location.pathname)}>
        <Routes>
          <Route path="/" element={<AppRoot />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
/* eslint-enable */
