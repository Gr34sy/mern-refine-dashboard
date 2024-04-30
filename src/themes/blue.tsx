import { createTheme } from "@mui/material/styles";
import { RefineThemes } from "@refinedev/mui";

export const blue = createTheme({
  ...RefineThemes.Blue,
  palette: {
    ...RefineThemes.Blue.palette,
    primary:{
        main: "#fcfcfc",
        light: "#fff",
        dark: "#EDEDED",
        contrastText: "#11142D",
    },
    secondary:{
        main: "#475be8",
        light: "#4791db",
        dark: "#1e36e8",
        contrastText: "#808191",
    },
  },
});
