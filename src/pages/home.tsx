import { useList } from "@refinedev/core";
import { Box, Typography} from '@mui/material';

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
        Test
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
          <PieChart title="Properties for Sale" value={682} series={[75, 12]} colors={['#475be8','#e4e8ef']}/>
          <PieChart title="Properties for Rent" value={490} series={[60, 40]} colors={['#475ae8','#e4b8ef']}/>
          <PieChart title="Total customers" value={7292} series={[75, 12]} colors={['#275be8','#c4e8ef']}/>
          <PieChart title="Properties for Cities" value={375} series={[75, 12]} colors={['#475be8','#e4e8ef']}/>
      </Box>
    </Box>
  );
};

export default home;
