import { Box, Typography, Stack } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { ArrowCircleUpRounded } from "@mui/icons-material";

import { TotalRevenueOptions, TotalRevenueSeries } from "./chart.config";

const TotalRevenue = () => {
  return (
    <Box p={4} flex={1} bgcolor="primary.main" id="chart" display="flex" flexDirection="column" borderRadius="15px">
      

      <Typography fontSize={18} fontWeight={600} color="primary.contrastText">
        Total Revenue
      </Typography>

      <Stack my="20px" direction="row" gap={4} flexWrap="wrap">
        <Typography fontSize={28} fontWeight={700}>
          $236,354
        </Typography>

        <Stack direction="row" alignItems="center" gap={1}>
          <ArrowCircleUpRounded sx={{
            fontSize: 25, color: 'secondary.main'
          }} />

          <Stack>
            <Typography fontSize={15} color="secondary.main" fontWeight={600}>
              0.8%
            </Typography>
          
            <Typography fontSize={15} color="secondary.contrastText">
             Than last Month
            </Typography>
          </Stack>
        </Stack>
      </Stack>

      <ReactApexChart series={TotalRevenueSeries} options={TotalRevenueOptions} type="bar" height={310}/>
    </Box>
  )
}

export default TotalRevenue
