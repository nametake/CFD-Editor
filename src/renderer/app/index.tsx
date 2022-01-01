import React from 'react';

import { Global } from '@/app/ui/Global';
import { MainView } from '@/app/ui/MainView';

/* eslint-disable react/jsx-props-no-spreading */
export const App = function App(): JSX.Element {
  return (
    <>
      <Global />
      <MainView />
    </>
  );
};
/* eslint-enable */
