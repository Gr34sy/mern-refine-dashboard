import { createTheme } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";

export const blue = createTheme({
  ...RefineThemes.Blue,
  palette: {
    ...RefineThemes.Blue.palette,
    primary:{
        main: "#fcfcfc",
        light: "#fff",
        dark: "#808191",
        contrastText: '#000',
    },
    secondary:{
        main: "#475be8",
        light: "#4791db",
        dark: "#1e36e8",
    },
  },
});
