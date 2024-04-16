import { createTheme } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";

export const dark = createTheme({
  ...RefineThemes.BlueDark,
  palette: {
    ...RefineThemes.BlueDark.palette,
    primary: {
      main: "#262424",
      light: "#515151",
      dark: "#121212",
      contrastText: "#9293A9",
    },
    secondary: {
      main: "#217099",
      light: "#9716B2",
      dark: "#0C4B6C",
    },
  },
});
