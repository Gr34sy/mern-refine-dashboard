import { Place } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import { PropertyCardProps } from "../../interfaces/property";

const PropertyCard = ({
  id,
  price,
  photo,
  location,
  title,
}: PropertyCardProps) => {
  return (
    <Card
      component={Link}
      to={`/properties/${id}`}
      sx={{
        bgcolor: 'primary.main',
        maxWidth: "300px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 22px 45px 2px rgba(61, 57, 57, 0.1)",
          cursor: "pointer",
        },
        textDecoration: 'none',
      }}
      elevation={0}
    >
      <CardMedia component="img" width="100%" height={210} image={photo} alt="Property image" sx={{borderRadius: '10px'}}/>

      <CardContent sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: '10px', paddingX: '5px'}}>
        <Stack direction="column" gap={1}>
          <Typography fontSize={16} fontWeight={500} color="secondary.contrastText">{title}</Typography>

          <Stack direction="row" gap={0.5} alignItems="center">
              <Place sx={{fontSize: 18, color: 'primary.contrastText', marginTop: 0.5}} />
              <Typography fontSize={14} color="primary.contrastText">{location}</Typography>
          </Stack>
        </Stack>

        <Box px={1.5} py={0.5} borderRadius={1} bgcolor="#217099" height="fit-content">
          <Typography color="#fefefe" fontSize={13} fontWeight={500}>${price}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
