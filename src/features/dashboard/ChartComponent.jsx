import React from "react";

import { Box } from "@mui/material";
import Chart from "react-apexcharts";

const ChartComponent = ({ dataCount }) => {
  // console.log("data count in chart", dataCount);
  const [selectedChartLabel, setSelectedChartLabel] = React.useState(null);
  console.log("selectedChartLabel", selectedChartLabel);

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
      // colors: ["#43039E", "#B6308B", "#F79044", "#a2a8d3"],
      // colors: ["#FFA500", "#9875D7", "#e32636", "#4B3172", "#008000"],
      // colors: ["#B2B0EA", "#8481DD", "#5752D1", "#3C3D99", "#2A265F"],
      colors: [
        "#43039E",
        "#B6308B",
        "#F79044",
        "#FEBE10",
        "#0CAFFF",
        "#e32636",
        "#008080",
        "#a7a6ba",
      ],

      dataLabels: {
        formatter: function (val, opts) {
          return opts.w.config.series[opts.seriesIndex];
        },
        style: {
          fontSize: 20,
        },
      },
      legend: {
        show: false,
        position: "bottom",
        horizontalAlign: "center",
        fontSize: 14,
        labels: {
          colors: ["#fff", "#fff", "#fff"],
        },
      },
      stroke: {
        show: false,
      },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: 65,
            labels: {
              show: true,
              value: {
                show: true,
                color: "#fff",
                fontSize: 40,
                fontWeight: "bold",
                offsetY: 30,
              },
              total: {
                show: true,
                showAlways: true,
                label: "Total actions count",
                color: "#fff",
                fontSize: 20,
                fontWeight: "bold",
              },
            },
          },
        },
      },
    }),
    [setSelectedChartLabel]
  );

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

  return (
    <Box
      sx={{
        width: "90%",
      }}
    >
      <Chart
        options={options}
        series={series}
        type="donut"
        width="100%"
        height={400}
      />
    </Box>
  );
};

export default ChartComponent;
