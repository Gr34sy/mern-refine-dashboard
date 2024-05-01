import React from "react";
import {
  useGetIdentity,
  useActiveAuthProvider,
  pickNotDeprecated,
} from "@refinedev/core";
import { HamburgerMenu } from "./hamburgerMenu";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import type { RefineThemedLayoutV2HeaderProps } from "@refinedev/mui";

import { ColorModeContext } from "../../contexts/color-mode";
import { Box } from "@mui/material";
import { IconButton } from "@mui/material";
import { LightModeOutlined, DarkModeOutlined } from "@mui/icons-material";
import { useContext } from "react";

export const ThemedHeaderV2: React.FC<RefineThemedLayoutV2HeaderProps> = ({
  isSticky,
  sticky,
}) => {
  const authProvider = useActiveAuthProvider();
  const { data: user } = useGetIdentity({
    v3LegacyAuthProviderCompatible: Boolean(authProvider?.isLegacy),
  });

  const prefferedSticky = pickNotDeprecated(sticky, isSticky) ?? true;

  const { mode, setMode } = useContext(ColorModeContext);

  return (
    <AppBar
      position={prefferedSticky ? "sticky" : "relative"}
      elevation={mode === "light" ? 1 : 0}
      sx={{
        background: "primary.main",
        bgcolor: "primary.main",
      }}
    >
      <Toolbar >
        <HamburgerMenu />
        <Stack
          direction="row"
          width="100%"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Stack
            direction="row"
            gap="16px"
            alignItems="center"
            justifyContent="center"
          >
            {user?.name && (
              <Typography variant="subtitle2" data-testid="header-user-name">
                <Box display="flex" gap={1} alignItems="center">
                  <IconButton
                    onClick={() => {
                      setMode();
                    }}
                    sx={{color: 'secondary.contrastText'}}
                  >
                    {mode === "dark" ? (
                      <LightModeOutlined />
                    ) : (
                      <DarkModeOutlined />
                    )}
                  </IconButton>

                  <Typography color="secondary.contrastText">
                    {user?.name}
                  </Typography>
                </Box>
              </Typography>
            )}
            {user?.avatar && <Avatar src={user?.avatar} alt={user?.name} />}
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
