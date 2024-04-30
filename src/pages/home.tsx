import { useList } from "@refinedev/core";

import { Box, Typography, Stack } from "@mui/material";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from "../components";

const home = () => {
  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
        Bronek
      </Typography>

      <Box>
          <PieChart />
        </Box>
    </Box>
  );
};

export default home;
