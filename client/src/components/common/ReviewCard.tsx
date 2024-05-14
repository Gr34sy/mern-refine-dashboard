import { Place, Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Stack,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

import { ReviewCardProps } from "../../interfaces/review";

const ReviewCard = ({
  id,
  property,
  creator,
  description,
  rating,
}: ReviewCardProps) => {
 
  const starsArray = [];
  for(let i = 0; i < rating; i++){
    starsArray.push(i);
  }

  return (
    <Card
      component={Link}
      to={`/reviews/show/${id}`}
      sx={{
        display: "flex",
        flexDirection:  "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 2,
        bgcolor: "primary.main",
        maxWidth: "400px",
        padding: "10px",
        "&:hover": {
          boxShadow: "0 0 10px 2px",
          boxShadowColor: "secondary.contrastText",
          cursor: "pointer",
        },
      }}
      elevation={0}
    >
      <Stack
        display="flex"
        flexDirection="column"
        flexWrap="wrap"
        justifyContent="space-between"
        gap={2}
      >
        <Stack>
          <Typography
            fontSize={18}
            fontWeight={700}
            color="primary.contrastText"
          >
            {/* @ts-ignore */}
            {property.title}
          </Typography>
          <Typography
            fontSize={14}
            fontWeight={400}
            color="secondary.contrastText"
          >
            {/* @ts-ignore */}
            {property.type}
          </Typography>
        </Stack>

        <Box>
        <Stack direction="row" gap={1} alignItems="center">
          <Typography>{rating}/5</Typography>

          <Box>{starsArray.map((star) => (
              <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} />
            ))}</Box>
        </Stack>
      </Box>
      </Stack>

      <Box>
        <Stack direction="row" gap={1} alignItems="center">
          <img
            /* @ts-ignore */
            src={creator.avatar}
            alt="user avatar"
            width={25}
            height={25}
            style={{
              borderRadius: "100%",
              objectFit: "cover",
            }}
          />

          <Stack
            direction="column"
            gap={1}
            color="primary.contrastText"
            fontWeight={600}
          >
            {/* @ts-ignore */}
            <Typography fontSize={15}>{creator.name}</Typography>

            <Typography fontSize={13} color="secondary.contrastText">
              {/* @ts-ignore */}
              {creator.email}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Card>
  );
};

export default ReviewCard;
