import React from "react";
import { useRouterContext, useLink, useRouterType } from "@refinedev/core";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { RefineLayoutThemedTitleProps } from "@refinedev/mui";
import logo from "../../assets/logo.svg";
import yariga from "../../assets/yariga.svg";
import { ColorModeContext } from "../../contexts/color-mode";
import { useContext } from "react";
import { Box } from "@mui/material";

const defaultText = "";


export const ThemedTitleV2: React.FC<RefineLayoutThemedTitleProps> = ({
  collapsed,
  wrapperStyles,
  text = defaultText,
}) => {
  const routerType = useRouterType();
  const Link = useLink();
  const { Link: LegacyLink } = useRouterContext();

  const ActiveLink = routerType === "legacy" ? LegacyLink : Link;

  const { mode, setMode } = useContext(ColorModeContext);

  return (
    <MuiLink
      to="/"
      component={ActiveLink}
      underline="none"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        ...wrapperStyles,
      }}
    >
      <Box sx={{
        bgcolor: "primary.light",
        display: "flex",
        alignItems: "center",
        padding: "5px",
        borderRadius: "4000px",
      }}>
      {
        collapsed ? (<img src={logo} alt="Dashn" width="28px"/>) : (<img src={yariga} alt="Refine"/>)
      }
      </Box>
      
      {!collapsed && (
        <Typography
          variant="h6"
          fontWeight={700}
          color="text.primary"
          fontSize="inherit"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {text}
        </Typography>
      )}
    </MuiLink>
  );
};
