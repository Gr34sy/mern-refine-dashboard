import { Place, Star } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Box, Typography, Stack, Card } from "@mui/material";

import { ReviewCardProps } from "../../interfaces/review";

const ReviewCard = ({
  id,
  property,
  creator,
  rating,
  description,
  showRatingNumber
}: ReviewCardProps) => {
  const starsArray = [];
  for (let i = 0; i < rating; i++) {
    starsArray.push(i);
  }

  return (
    <Card
      component={Link}
      to={`/reviews/show/${id}`}
      sx={{
        gap: 3,
        bgcolor: "primary.main",
        padding: "15px",
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
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        gap={3}
      >
        <Stack
          display="flex"
          flexDirection="column"
          flexWrap="wrap"
          justifyContent="space-between"
          gap={1}
        >
          {property && (
            <Stack>
              <Typography
                fontSize={16}
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
          )}

          {showRatingNumber && (
            <Typography fontSize={18} fontWeight={500}>
              {rating}/5
            </Typography>
          )}

          <Box display="flex">
            {starsArray.map((star) => (
              <Star key={`star-${star}`} sx={{ color: "#f2c94c" }} />
            ))}
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
              <Typography fontSize={14} fontWeight={500}>
                {/* @ts-ignore */}
                {creator.name}
              </Typography>

              <Typography fontSize={13} color="secondary.contrastText">
                {/* @ts-ignore */}
                {creator.email}
              </Typography>
            </Stack>
          </Stack>
        </Box>
      </Stack>

      {description && (
        <Box mt="15px">
          <Typography
            fontSize={14}
            fontWeight={400}
            color="secondary.contrastText"
          >
            {description}
          </Typography>
        </Box>
      )}
    </Card>
  );
};

export default ReviewCard;
