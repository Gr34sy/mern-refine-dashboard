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
      <ReviewCard creator={{name: 'Piotr Słupski', email: 'slupek3'}} property={{title: 'Downtown', type: 'Condos'}} rating={3} description="lorem ipsum30"/>
    </Box>
  )
}

export default reviews
