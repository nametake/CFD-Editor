import React from 'react';

import { CauseFlow } from '@/app/ui/CauseFlow';
import { DecisionTable, useDecisionTable } from '@/app/ui/DecisionTable';
import { Global } from '@/app/ui/Global';

import { makeCauseNodes } from './types';

/* eslint-disable react/jsx-props-no-spreading */
export const App = function App(): JSX.Element {
  const { conditions, decisionTableProps } = useDecisionTable();
  return (
    <>
      <Global />
      <CauseFlow
        nodes={makeCauseNodes(conditions)}
        edges={[]}
        style={{ width: '512px', height: '512px' }}
      />
      <DecisionTable {...decisionTableProps} />
    </>
  );
};
/* eslint-enable */
