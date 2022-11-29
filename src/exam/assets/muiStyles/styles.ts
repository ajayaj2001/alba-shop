import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: `#75ffcd`,
      contrastText: `#000`,
      dark: `#4fc59a`,
    },
    secondary: {
      main: `#173329`,
      dark: `#181818`,
      contrastText: `#75ffcd`,
    },
  },
  typography: {
    fontFamily: `'Nunito',sans-serif`,
    button: {
      fontSize: `1rem`,
      textTransform: `none`,
    },
  },
  overrides: {
    MuiButton: {
      root: {
        borderRadius: 12,
      },
    },
  },
});
