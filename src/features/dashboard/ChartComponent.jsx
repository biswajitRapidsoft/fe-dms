import React from "react";

import { Box, useTheme } from "@mui/material";
import Chart from "react-apexcharts";
import { customChartColors } from "../../helper/constants";

const ChartComponent = ({ dataCount }) => {
  const theme = useTheme();
  // const [setSelectedChartLabel] = React.useState(null);
  const [selectedChartLabel, setSelectedChartLabel] = React.useState(null);
  console.log("selectedChartLabel", selectedChartLabel);

  const series = React.useMemo(() => {
    return [
      dataCount?.yawningCount || 0,
      dataCount?.mobileUsageCount || 0,
      dataCount?.distractionCount || 0,
      dataCount?.smokingCount || 0,
      dataCount?.closeEyesCount || 0,
      dataCount?.noFaceCount || 0,
      dataCount?.lowHeadCount || 0,
      dataCount?.drinkingCount || 0,
    ];
  }, [dataCount]);

  const options = React.useMemo(
    () => ({
      labels: [
        "yawn events",
        "mobileUsage events",
        "distraction events",
        "smoking events",
        "closeEyes events",
        "no face events",
        "low head events",
        "drinking events",
      ],
      chart: {
        events: {
          dataPointSelection: (e, chartContext, config) => {
            e.target.attributes.selected.value = "false";
            setSelectedChartLabel(
              config.w.config.labels[config.dataPointIndex]
            );
          },
        },
      },

      // colors: [
      //   "#43039E",
      //   "#B6308B",
      //   "#F79044",
      //   "#FEBE10",
      //   "#0CAFFF",
      //   "#e32636",
      //   "#008080",
      //   "#a7a6ba",
      // ],

      colors: [
        customChartColors.yawningCount,
        customChartColors.mobileUsageCount,
        customChartColors.distractionCount,
        customChartColors.smokingCount,
        customChartColors.closeEyesCount,
        customChartColors.noFaceCount,
        customChartColors.lowHeadCount,
        customChartColors.drinkingCount,
      ],

      dataLabels: {
        formatter: function (val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        },
        style: {
          fontSize: 18,
        },

        textAnchor: "middle",
      },
      legend: {
        show: false,
        position: "right",
        horizontalAlign: "center",
        fontSize: 14,
        labels: {
          colors: [
            theme.palette.text.light,
            theme.palette.text.light,
            theme.palette.text.light,
          ],
        },
      },
      stroke: {
        show: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: 70,
            labels: {
              show: true,
              value: {
                show: true,
                color: theme.palette.text.light,
                fontSize: 37,
                fontWeight: "bold",
                offsetY: 15,
              },
              total: {
                show: true,
                showAlways: true,
                label: "Total Events",
                color: theme.palette.text.light,
                fontSize: 20,
                fontWeight: "bold",
              },
            },
          },
        },
      },
    }),
    [setSelectedChartLabel, theme.palette.text.light]
  );

  return (
    <Box
      sx={{
        // width: "90%",
        width: "100%",
        // position: "relative",
      }}
    >
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height={350}
      />
    </Box>
  );
};

export default ChartComponent;
