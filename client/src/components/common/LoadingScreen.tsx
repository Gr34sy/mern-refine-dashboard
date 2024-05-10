import { Box, Typography } from "@mui/material";

const LoadingScreen = () => {
  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={2} mt={10}>
      <span className="loader"></span>
      <Typography fontSize={24} fontWeight={600}>
        Loading ...
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
