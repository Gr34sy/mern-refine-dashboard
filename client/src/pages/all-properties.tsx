import { Add } from "@mui/icons-material";
import { useTable } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

import { PropertyCard, CustomButton } from "../components";

const AllProperties = () => {
  const navigate = useNavigate();

  const { tableQueryResult: {data, isLoading, isError}} = useTable();
  console.log(data);

  const allProperties = data?.data ?? [];

  if(isLoading) return <Typography>Loading...</Typography>
  if(isError) return <Typography>Error</Typography>

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
          All Properties
        </Typography>
        <CustomButton title="Add Property" handleClick={() => navigate('/properties/create')} icon={<Add/>} backgroundColor="secondary.main" color="#fcfcfc"/>
      </Stack>

      <Box mt="20px" sx={{display: 'flex', flexWrap: 'wrap', gap: 3}}>
        {allProperties.map((property) => (
          <PropertyCard 
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}

          />
        )
      )}
      </Box>
    </Box>
  )
}

export default AllProperties
