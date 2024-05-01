import { Add } from "@mui/icons-material";
import { useList } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Typography } from "@mui/material";

import { PropertyCard, CustomButton } from "../components";

const AllProperties = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={25} fontWeight={700} color="primary.contrastText">
          All Properties
        </Typography>
        <CustomButton title="Add Property" handleClick={() => navigate('/properties/create')} icon={<Add/>} backgroundColor="secondary.main" color="#fcfcfc"/>
      </Stack>
    </Box>
  )
}

export default AllProperties
