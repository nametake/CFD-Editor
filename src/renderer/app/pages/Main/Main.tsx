import React from 'react';

import styled from '@emotion/styled';

import { CauseFlow, CauseFlowProps } from '@/app/ui/CauseFlow';
import { DecisionTable, DecisionTableProps } from '@/app/ui/DecisionTable';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: space-between;
`;

const CauseFlowWrapper = styled.div`
  height: 50%;
`;

const DecisionTableWrapper = styled.div`
  height: 50%;
  overflow-y: auto;
`;

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
    <Wrapper>
      <CauseFlowWrapper>
        <CauseFlow {...causeFlowProps} />
      </CauseFlowWrapper>
      <DecisionTableWrapper>
        <DecisionTable {...decisionTableProps} />
      </DecisionTableWrapper>
    </Wrapper>
  );
};

/* eslint-enable */
