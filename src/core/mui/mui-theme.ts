import { createTheme } from "@mui/material/styles";
import { muiColorPalette } from "./color";
import { figtreeFont } from "../fonts/figtree-font";
import { vazirFont } from "../fonts/vazir-font";
import createCache from "@emotion/cache"
import { prefixer } from "stylis";
import rtlPlugin from "stylis-plugin-rtl"


export const muiRTLCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


export const muiTheme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: vazirFont.style.fontFamily,
    button: {
      fontFamily: vazirFont.style.fontFamily,
      fontWeight: 400,
    },
  },
  palette: muiColorPalette,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
      defaultProps: {
        variant: "contained",
      },
    },
  },
});
