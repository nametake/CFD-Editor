import React from 'react';

import { CauseFlow } from '@/app/ui/CauseFlow';
import { Global } from '@/app/ui/Global';

export const App = function App(): JSX.Element {
  return (
    <>
      <Global />
      <CauseFlow
        nodes={[
          {
            id: 'id',
            data: {
              label: 'AAAAAAAAAAAAAAAAAAAA',
            },
            type: 'cause',
            position: { x: 8, y: 8 },
            style: { paddingLeft: '10px', padding: '100px' },
          },
        ]}
        edges={[]}
        style={{ width: '512px', height: '512px' }}
      />
    </>
  );
};
