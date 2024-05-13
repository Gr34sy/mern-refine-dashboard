import LoadingScreen from "../components/common/LoadingScreen";
import { useList } from "@refinedev/core";
import { Typography } from "@mui/material";

const reviews = () => {
  const { data, isLoading, isError } = useList({
    resource: "reviews",
  });
  
  const allReviews = data?.data ?? [];

  if (isLoading) return <LoadingScreen />;
  if (isError) return <Typography>Error</Typography>;

  return (
    <div>
      <LoadingScreen />
    </div>
  )
}

export default reviews
