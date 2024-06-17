import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";

const CustomRow = React.memo(({ index, theme, row, categoryData }) => {
  console.log("report table component row data: ", row);

  const findColorCode = React.useMemo(
    () => categoryData?.find((item) => item?.name === row?.categoryDto?.name),
    [categoryData, row?.categoryDto?.name]
  );

  return (
    <TableRow
      hover
      key={row?.id}
      sx={{
        cursor: "pointer",
        height: 80,
        // backgroundColor: Boolean(row?.categoryDto?.name)
        //   ? `#${row?.categoryDto?.colorCode}4d`
        //   : "inherit",
        // "&:hover": {
        //   backgroundColor: Boolean(row?.categoryDto?.name)
        //     ? `#${row?.categoryDto?.colorCode}82 !important`
        //     : "inherit",
        // },
      }}
    >
      <TableCell align="center">
        <Typography sx={{ fontSize: "19px" }}>{index + 1}</Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="body1"
          sx={{ fontWeight: 550, color: "customBlue.dark", fontSize: "20px" }}
        >
          {row?.driverName}
        </Typography>
        <Typography
          sx={{
            fontWeight: 500,
            color: Boolean(row?.driverDlNumber)
              ? "customBlue.dark"
              : "customGrey.600",
            fontSize: "18px",
          }}
        >
          {row?.driverPhone || "NA"}
          {/* ({row?.driverDlNumber || "NA"}) */}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="caption"
          sx={{
            color: "customNavyBlue.main",
            fontSize: "18px",
            fontWeight: "550",
          }}
        >
          {/* +91-{row?.driverPhone} */}
          {row?.driverDlNumber || "NA"}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 550,
            color: "customBlue.dark",
            fontSize: "17.5px",
          }}
        >
          {row?.joinDate || "NA"}
        </Typography>
      </TableCell>
      <TableCell align="center">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 550,
            color: "customBlue.dark",
            fontSize: "17.5px",
          }}
        >
          {row?.perfomance || 0}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Typography
          variant="body1"
          sx={{
            fontWeight: 550,
            color: "customBlue.dark",
            color: `#${findColorCode?.colorCode}`,
            fontSize: "17.5px",
          }}
        >
          {row?.categoryDto?.name || "NA"}
        </Typography>
      </TableCell>

      {/* <TableCell
        align="center"
        sx={{
          color:
            row?.eventType === DISTRACTION
              ? customChartColors.distractionCount
              : row?.eventType === CLOSE_EYES
              ? customChartColors.closeEyesCount
              : row?.eventType === LOW_HEAD
              ? customChartColors.lowHeadCount
              : row?.eventType === DRINKING
              ? customChartColors.drinkingCount
              : row?.eventType === NO_FACE
              ? customChartColors.noFaceCount
              : row?.eventType === PHONE_CALLING
              ? customChartColors.mobileUsageCount
              : row?.eventType === SMOKING_ALERT
              ? customChartColors.smokingCount
              : row?.eventType === YAWN_ALERT && customChartColors.yawningCount,

          fontSize: "15.6px",
          fontWeight: "550",
        }}
      >
        {row?.eventType?.replace(/_/g, " ")}
      </TableCell> */}
    </TableRow>
  );
});

const ReportTableComponent = ({ getAllData, categoryData }) => {
  console.log("ReportTableComponent getAllData: ", getAllData);
  console.log("ReportTableComponent categoryData: ", categoryData);
  // useState for opening and closing dialog
  const theme = useTheme();

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{ overflow: "auto", height: "70vh" }}
      >
        <Table aria-label="simple table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  paddingY: "15px",
                  fontSize: "20px",
                }}
              >
                S.No.
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Driver Details
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                DL Number
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Joining Date
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                Total Events
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "20px",
                  // background: "linear-gradient(rgb(30 96 139), rgb(14 57 115))",
                }}
              >
                Overall Performance
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(getAllData?.length > 0) ? (
              getAllData?.map((row, index) => (
                <CustomRow
                  index={index}
                  theme={theme}
                  key={row.id}
                  row={row}
                  categoryData={categoryData}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
};

export default React.memo(ReportTableComponent);
