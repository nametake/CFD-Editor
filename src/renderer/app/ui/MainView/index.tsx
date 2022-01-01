import React from 'react';

type MainViewProps = {
  text?: string;
};

export const MainView = function MainView({
  text,
}: MainViewProps): JSX.Element {
  return <div>{text}</div>;
};
