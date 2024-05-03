import { useList } from "@refinedev/core";
import { Box, Typography, Stack} from '@mui/material';

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
          <PieChart title="Properties for Sale" value={682} series={[75, 12]} colors={['#EF850F','#F5C085']}/>
          <PieChart title="Properties for Rent" value={490} series={[60, 40]} colors={['#7841E1','#CAB6EF']}/>
          <PieChart title="Properties for Cities" value={375} series={[75, 12]} colors={['#25D072','#AFE7C8']}/>
          <PieChart title="Total Customers" value={7292} series={[75, 12]} colors={['#14B8EC','#AFE0DF']}/>
      </Box>

      <Stack mt="25px" width="100%" direction={{xs: 'column', lg: 'row'}} gap={4}>
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>
    </Box>
  );
};

export default home;