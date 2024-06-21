import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { Box, useTheme } from "@mui/material";
import { customBarchartColors } from "../../helper/constants";

// import data from "./data.json";

const BarChartComponent = React.memo(function ({
  data,
  // relativeContainerWidth,
}) {
  const theme = useTheme();
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);

  // console.log("barchart raw data: ", data);

  // const dataEntries = Object.entries(data);
  const dataEntries = Object.entries(data).map(([key, value]) => ({
    [key]: value,
  }));

  // console.log("dataEntries: ", dataEntries);

  const largestPrevMonth = React.useMemo(
    () =>
      Math.max(
        ...dataEntries.map(
          (driverData) =>
            driverData[Object.keys(driverData)[0]].previousRangeCount ?? 0
        )
      ),
    [dataEntries]
  );

  // console.log("largestPrevMonth: ", largestPrevMonth);

  const largestCurrMonth = React.useMemo(
    () =>
      Math.max(
        ...dataEntries.map(
          (driverData) =>
            driverData[Object.keys(driverData)[0]].currentRangeCount ?? 0
        )
      ),
    [dataEntries]
  );

  // console.log("largestCurrMonth: ", largestCurrMonth);

  let meanScale = 15;

  if (largestCurrMonth >= largestPrevMonth) {
    meanScale = 10 + largestCurrMonth;
  } else {
    meanScale = 10 + largestPrevMonth;
  }

  const labels = dataEntries?.map(
    (driverData) => driverData[Object.keys(driverData)[0]].driverName ?? "NA"
  );

  const customLabels = React.useMemo(() => ["Previous", "Current"], []);

  // console.log("labels: ", labels);

  const datas = React.useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          // maxBarThickness: 20,
          data: dataEntries.map(
            (driverData) =>
              driverData[Object.keys(driverData)[0]].previousRangeCount ?? 0
          ), // prevMonth
          backgroundColor: customBarchartColors.previousRangeCount,
          stack: "Stack 0",
          barPercentage: 1.0,
          label: customLabels[0],
        },
        {
          // maxBarThickness: 20,
          data: dataEntries.map(
            (driverData) =>
              driverData[Object.keys(driverData)[0]].currentRangeCount ?? 0
          ), // currMonth
          backgroundColor: customBarchartColors.currentRangeCount,
          stack: "Stack 1",
          barPercentage: 1.0,
          label: customLabels[1],
        },
      ],
    }),
    [dataEntries, labels, customLabels]
  );

  const getLongestTickLabelLength = React.useCallback((data) => {
    const labels = Object.keys(data);
    return Math.max(...labels.map((label) => label.length));
  }, []);

  const longestLabelLength = React.useMemo(
    () => getLongestTickLabelLength(datas) * 60,
    [datas, getLongestTickLabelLength]
  );

  // console.log("longestLabelLength: ", longestLabelLength);

  const sumDataLabel = React.useMemo(
    () => ({
      id: "sumDataLabel",
      afterDatasetDraw(chart) {
        const {
          ctx,
          scales: { y },
        } = chart;

        const datasetMeta0 = chart.getDatasetMeta(0);

        // const angle = Math.PI / 180;

        datasetMeta0.data.forEach((dataPoint, index) => {
          let y0 = datasetMeta0.data[index].y;

          if (y0 > 0) {
            y0 = datasetMeta0.hidden ? 1000 : y0;

            let newY0 = Math.abs(y0);

            const value = newY0;
            ctx.save();
            ctx.translate(dataPoint.x, value - 5);
            // ctx.rotate(angle * 270);

            ctx.font = "bold 16px arial";
            ctx.textAlign = "center";
            ctx.fillStyle = theme.palette.text.light;
            ctx.fillText(y.getValueForPixel(value).toFixed(0), 0, 0);

            ctx.restore();
          }
        });
      },
    }),
    [theme.palette.text.light]
  );

  const sumDataLabel2 = React.useMemo(
    () => ({
      id: "sumDataLabel2",
      afterDatasetDraw(chart) {
        const {
          ctx,
          scales: { y },
        } = chart;
        const datasetMeta3 = chart.getDatasetMeta(1);

        // const angle = Math.PI / 180;

        datasetMeta3.data.forEach((dataPoint, index) => {
          let y3 = datasetMeta3.data[index].y;

          if (y3 > 0) {
            y3 = datasetMeta3.hidden ? 1000 : y3;

            let newY3 = Math.abs(y3);

            const value = newY3;
            ctx.save();
            ctx.translate(dataPoint.x, value - 5);
            // ctx.rotate(angle * 270);

            ctx.font = "bold 16px arial";
            ctx.textAlign = "center";
            ctx.fillStyle = theme.palette.text.light;
            ctx.fillText(y.getValueForPixel(value).toFixed(0), 0, 0);

            ctx.restore();
          }
        });
      },
    }),
    [theme.palette.text.light]
  );

  const config = React.useMemo(
    () => ({
      type: "bar",
      data: datas,
      options: {
        Animation: false,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 12,
            // bottom: 10,
          },
        },
        scales: {
          x: {
            ticks: {
              autoSkip: false, // Ensure all ticks are displayed
              maxRotation: 0,
              minRotation: 0,
              color: theme.palette.text.light,
              font: {
                size: 15, // Set font size
                weight: "bold", // Set font weight to bold
              },
            },
            grid: {
              color: theme.palette.grey["400"], // Set grid color for x-axis
            },
          },
          y: {
            beginAtZero: true,
            max: meanScale,
            stacked: true,
            ticks: {
              display: false,
            },
            grid: {
              color: theme.palette.grey["400"],
              drawTicks: false,
              drawBorder: false,
            },
          },
        },
        plugins: {
          sumDataLabel: {
            color: theme.palette.text.primary,
          },
          sumDataLabel2: {
            color: theme.palette.text.primary,
          },
          legend: {
            display: false,
          },
        },
      },
      plugins: [sumDataLabel, sumDataLabel2],
    }),
    [
      datas,
      sumDataLabel,
      sumDataLabel2,
      meanScale,
      theme.palette.text.primary,
      theme.palette.text.light,
      theme.palette.grey,
    ]
  );

  //CHART 2 = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

  // const labels2 = data?.map((driverData) => Object.keys(driverData)[0]);

  const datas2 = React.useMemo(
    () => ({
      labels: labels,
      datasets: [
        {
          // barThickness: 40,
          data: dataEntries.map(
            (driverData) =>
              driverData[Object.keys(driverData)[0]].previousRangeCount ?? 0
          ), // prevMonth
          backgroundColor: customBarchartColors.previousRangeCount,
          stack: "Stack 0",
        },
        {
          // barThickness: 40,
          data: dataEntries.map(
            (driverData) =>
              driverData[Object.keys(driverData)[0]].currentRangeCount ?? 0
          ), // currMonth
          backgroundColor: customBarchartColors.currentRangeCount,
          stack: "Stack 1",
        },
      ],
    }),
    [dataEntries, labels]
  );

  const config2 = React.useMemo(
    () => ({
      type: "bar",
      data: datas2,
      options: {
        Animation: false,
        maintainAspectRatio: false,
        layout: {
          padding: {
            bottom: 45.5,
          },
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              display: false,
            },
            grid: {
              drawTicks: false,
            },
          },
          y: {
            beginAtZero: true,
            max: meanScale,
            stacked: true,
            afterFit: (ctx) => {
              // console.log("ctx: ", ctx);
              ctx.width = 40;
            },
            ticks: {
              color: theme.palette.text.light,
              font: {
                size: 15, // Set font size
                weight: "bold", // Set font weight to bold
              },
            },
            grid: {
              color: theme.palette.grey["400"],
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    }),
    [datas2, meanScale, theme.palette.text.light, theme.palette.grey]
  );

  useEffect(() => {
    if (!chartRef.current || !chartRef2.current || !data) return;

    const chartInstance = new Chart(chartRef.current, config);
    const chartInstance2 = new Chart(chartRef2.current, config2);

    const box = document.querySelector(".box");
    const barLength = chartInstance.data.labels.length;

    // console.log("barLength: ", barLength);

    if (barLength > 7) {
      if (box) {
        // console.log("varyingBoxWidth BEFORE: ", box.style.width);
        const chartWidth =
          700 + (barLength - 7 + longestLabelLength - 100) * 40;
        box.style.width = `${chartWidth}px`;
        // console.log("varyingBoxWidth AFTER: ", box.style.width);
      }
    }
    //  else {
    //   if (box) {
    //     // debugger;
    //     console.log("varyingBoxWidth BEFORE: ", box.style.width);
    //     box.style.width = relativeContainerWidth
    //       ? `calc(${relativeContainerWidth} - 45px)`
    //       : "calc(550px - 45px)";
    //     console.log("varyingBoxWidth AFTER: ", box.style.width);
    //   }
    // }

    return () => {
      chartInstance.destroy();
      chartInstance2.destroy();
    };
  }, [
    data,
    config,
    config2,
    longestLabelLength,
    //  relativeContainerWidth
  ]);

  return (
    <Box
      // className="chartCard"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "97%",
        width: "100%",
      }}
    >
      <Box
        // className="chartBox"

        sx={{
          display: "flex",
          // width: Boolean(relativeContainerWidth)
          //   ? relativeContainerWidth
          //   : "550px",
          width: "100%",
          // bgcolor: "blue",
          height: "100%",
        }}
      >
        <Box
          className="colSmall"
          sx={{
            width: "40px",
            // height: "calc(100% - 15.5px)", //deduct the height of the scrollbar of the barchart scrollbar()
          }}
        >
          <canvas ref={chartRef2} id="myChart2"></canvas>
        </Box>
        <Box
          // className="colLarge"
          sx={{
            // maxWidth: Boolean(relativeContainerWidth)
            //   ? relativeContainerWidth
            //   : "550px",
            width: "100%", // SENSITIVE WIDTH
            overflowX: "scroll",
            "&::-webkit-scrollbar": {
              height: "14px", // adjust the height of the scrollbar
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: "customPurple.500", // color of the scrollbar track
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: "secondary.light", // color of the scrollbar thumb
              borderRadius: "4px", // round the corners of the scrollbar thumb
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "secondary.light", // color of the scrollbar thumb when hovered
            },
          }}
        >
          <Box
            className="box"
            sx={{
              // width: Boolean(relativeContainerWidth)
              //   ? `calc(${relativeContainerWidth} - 45px)`
              //   : "calc(550px - 45px)",

              width: "calc(100% - 45px)",
              height: "100%",
            }}
          >
            <canvas ref={chartRef} id="myChart"></canvas>
          </Box>
        </Box>
      </Box>
    </Box>
  );
});

export default BarChartComponent;
