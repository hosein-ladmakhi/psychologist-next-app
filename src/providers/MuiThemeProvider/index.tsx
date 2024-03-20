"use client";

import { muiRTLCache, muiTheme } from "@/core/mui/mui-theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ConfirmProvider } from "material-ui-confirm";
import { FC, PropsWithChildren } from "react";
import { CacheProvider } from "@emotion/react";

const MuiThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <ConfirmProvider defaultOptions={{ confirmationButtonProps: { style: { marginInlineStart: "10px" } } }}>
        <CacheProvider value={muiRTLCache}>
          <CssBaseline />
          {children}
        </CacheProvider>
      </ConfirmProvider>
    </ThemeProvider>
  );
};

export default MuiThemeProvider;
