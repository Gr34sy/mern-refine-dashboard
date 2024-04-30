import React from 'react';
import { Box, Typography, Stack } from '@mui/material';

import { PieChartProps } from "../../interfaces/home";
import ReactApexChart from 'react-apexcharts';

const PieChart = ({title, value, series, colors}: PieChartProps) => {
  return (
    <Box id="chart" flex={1} display="flex" bgcolor="primary.main">
      <Stack direction="column">
        <Typography fontSize={14} color="secondary.contrastText">
          {title}
        </Typography>
        <Typography fontSize={24} color="primary.contrastText" fontWeight={700} mt={1}>
          {value}
        </Typography>
      </Stack>

      <ReactApexChart options={{
          chart: {type: 'donut'},
          colors,
          legend: {show: false},
          dataLabels: {enabled: false},
      }}
      type="donut"
      series={series}
      width="120px"/>
    </Box>
  )
}

export default PieChart
