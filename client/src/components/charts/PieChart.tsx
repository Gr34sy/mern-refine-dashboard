import { Box, Typography, Stack } from "@mui/material";

import { PieChartProps } from "../../interfaces/home";
import ReactApexChart from "react-apexcharts";

const PieChart = ({ title, value, series, colors }: PieChartProps) => {
  return (
    <Box
      id="chart"
      flex={1}
      display="flex"
      bgcolor="primary.main"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      pl={3.5}
      py={2}
      gap={2}
      borderRadius="15px"
      minHeight="110px"
      width="fit-content"
    >
      <Stack direction="column">
        <Typography fontSize={14} color="secondary.contrastText">
          {title}
        </Typography>
        <Typography
          fontSize={24}
          color="primary.contrastText"
          fontWeight={700}
          mt={1}
        >
          {value}
        </Typography>
      </Stack>

      <ReactApexChart
        options={{
          chart: { type: "donut" , background: 'primary.main'},
          colors,
          legend: { show: false },
          dataLabels: { enabled: false },
          plotOptions: {
            pie: {
              donut: {
                size: '50%',
              }
            }
          },
          stroke:{
            colors:['transparent']
          },
        }}
        type="donut"
        series={series}
        width="120px"
      />
    </Box>
  );
};

export default PieChart;
