import React from 'react';

import { CauseFlow } from '@/app/ui/CauseFlow';
import { DecisionTable, useDecisionTable } from '@/app/ui/DecisionTable';
import { Global } from '@/app/ui/Global';

/* eslint-disable react/jsx-props-no-spreading */
export const App = function App(): JSX.Element {
  const { decisionTableProps } = useDecisionTable();
  return (
    <>
      <Global />
      <CauseFlow
        nodes={[
          {
            id: 'id',
            data: { label: { text: 'AAAAAAAAAAAAAAAAAAAA' } },
            type: 'cause',
            position: { x: 8, y: 8 },
          },
        ]}
        edges={[]}
        style={{ width: '512px', height: '512px' }}
      />
      <DecisionTable {...decisionTableProps} />
    </>
  );
};
/* eslint-enable */
