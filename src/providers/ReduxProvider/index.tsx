'use client';

import { FC, PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store';

const ReduxProvider: FC<PropsWithChildren> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
