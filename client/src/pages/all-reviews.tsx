import LoadingScreen from "../components/common/LoadingScreen";
import { useList } from "@refinedev/core";
import { Box, Stack, Typography } from "@mui/material";
import ReviewCard from "../components/common/ReviewCard";

const reviews = () => {
  const { data, isLoading, isError } = useList({
    resource: "reviews",
  });

  const allReviews = data?.data ?? [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <Typography>Error</Typography>;

  return (
    <Box>
      <Typography   fontSize={25}
            fontWeight={700}
            color="primary.contrastText">{!allReviews.length
              ? "There are no reviews"
              : "All reviews"}</Typography>

      <Stack direction="column" width="100%" gap={4}>
        <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {allReviews.map((review) => (
            // @ts-ignore
            <ReviewCard
              key={review._id}
              id={review._id}
              creator={review.creator}
              property={review.property}
            />
          ))}
        </Box>
      </Stack>
    </Box>
  );
};

export default reviews;
