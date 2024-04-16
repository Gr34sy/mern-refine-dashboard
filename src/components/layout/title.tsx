import React from "react";
import { useRouterContext, useLink, useRouterType } from "@refinedev/core";
import MuiLink from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import type { RefineLayoutThemedTitleProps } from "@refinedev/mui";

import logo from "../../assets/logo.svg";
import yariga from "../../assets/yariga.svg";
import logoDark from "../../assets/logoDark.svg";
import yarigaDark from "../../assets/yarigaDark.svg";

import { ColorModeContext } from "../../contexts/color-mode";
import { useContext } from "react";

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
      
      {
        collapsed ? (<img src={mode==="light" ? logo : logoDark} alt="Dashn" width="28px"/>) : (<img src={mode==="light" ? yariga : yarigaDark} alt="Refine"/>)
      }
      
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
