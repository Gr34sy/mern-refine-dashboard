import { Box, Typography, Stack } from "@mui/material";

import { propertyReferralsInfo } from "../../constants";

interface ProgressBarProps {
  title: string;
  percentage: number;
  color: string;
}

const ProgressBar = ({ title, percentage, color }: ProgressBarProps) => (
  <Box width="100%">
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography fontSize={16} fontWeight={500} color="primary.contrastText">
        {title}
      </Typography>
      <Typography fontSize={16} fontWeight={500} color="primary.contrastText">
        {percentage}%
      </Typography>
    </Stack>
    <Box
      mt={2}
      position="relative"
      width="100%"
      height="8px"
      borderRadius={1}
      bgcolor="primary.dark"
    >
      <Box width={`${percentage}%`} bgcolor={color || '#4F44E7'} position="absolute" height="100%" borderRadius={1}/>
    </Box>
  </Box>
);

const PropertyReferrals = () => {
  return (
    <Box
      p={4}
      bgcolor="primary.main"
      id="chart"
      minWidth={490}
      display="flex"
      flexDirection="column"
      borderRadius="15px"
    >
      <Typography fontSize={18} fontWeight={600} color="primary.contrastText">
        Property Referrals
      </Typography>

      <Stack my="20px" direction="column" gap={4}>
        {propertyReferralsInfo.map((bar, i) => {
          return <ProgressBar key={bar.title} {...bar} />;
        })}
      </Stack>
    </Box>
  );
};

export default PropertyReferrals;
