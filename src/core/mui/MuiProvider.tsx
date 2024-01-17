'use client';

import { FC, PropsWithChildren } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { muiTheme } from './mui-theme';
import { ConfirmProvider } from 'material-ui-confirm';

const MuiProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <ConfirmProvider>
        <CssBaseline />
        {children}
      </ConfirmProvider>
    </ThemeProvider>
  );
};

export default MuiProvider;
