import { createTheme } from '@mui/material/styles';
import { muiColorPalette } from './color';
import { figtreeFont } from '../fonts/figtree-font';
import { vazirFont } from '../fonts/vazir-font';

export const muiTheme = createTheme({
  typography: {
    fontFamily: figtreeFont.style.fontFamily,
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
          textTransform: 'capitalize',
        },
      },
      defaultProps: {
        variant: 'contained',
      },
    },
  },
});
