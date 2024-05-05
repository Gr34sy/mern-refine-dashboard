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
  const { data, isLoading, isError } = useList({
    resource: 'properties',
    config: {
      pagination: {
        pageSize: 10,
      },
    },
    sorters: [  
      {  
        field: "name",
        order: "asc", 
      },  
      ],  
  });

  const latestProperties = data?.data ?? [];

  if(isLoading) return <Typography>Loading...</Typography>;
  if(isError) return <Typography>Something went wrong!</Typography>;

  return (
    <Box>
      {/* <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
        Test
      </Typography> */}

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

      <Box flex={1} borderRadius="15px" padding="20px" flexDirection="column" display="flex" minWidth="100%" mt="25px" bgcolor="primary.main">
          <Typography fontSize="18px" fontWeight={600} color="primary.contrastText">
            Latest Properties
          </Typography>

          <Box mt={2.5} sx={{display: 'flex', flexWrap: 'wrap', gap: 4}}>
              {latestProperties.map((property) => (
                <PropertyCard key={property._id} id={property._id} title={property.title} location={property.location} price={property.price} photo={property.photo}/>
              ))}
          </Box>
      </Box>
    </Box>
  );
};

export default home;
