import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

function calculateSerialNumber(index, pageNumber, rowsPerPage) {
  index = index ?? 0;
  pageNumber = pageNumber ?? 0;
  rowsPerPage = rowsPerPage ?? 10;

  index = Number(index);
  pageNumber = Number(pageNumber);
  rowsPerPage = Number(rowsPerPage);

  return pageNumber * rowsPerPage + index + 1;
}

const CustomRow = React.memo(({ row, index, rowSerialNumber }) => {
  return (
    <TableRow
    // hover
    // key={row?.id}
    >
      <TableCell sx={{ paddingY: "16px", textAlign: "center" }}>
        {/* {row?.id} */}

        <Typography
          variant="body1"
          sx={{
            // fontWeight: 550,
            color: Boolean(row?.command) ? "customGrey.700" : "customGrey.600",
            // fontSize: Boolean(row?.command) ? "" : "15px",
          }}
        >
          {/* {index + 1} */}
          {rowSerialNumber}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 550,
            color: Boolean(row?.description)
              ? "customBlue.dark"
              : "customGrey.600",
            wordBreak: "break-word",
            // fontSize: Boolean(row?.description) ? "" : "15px",
            // fontFamily:
            //   "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
          }}
        >
          {row?.description || "NA"}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 550,
            color: Boolean(row?.command) ? "text.secondary" : "customGrey.600",
            // fontSize: Boolean(row?.command) ? "" : "15px",
            wordBreak: "break-word",
          }}
        >
          {row?.command || "NA"}
        </Typography>
      </TableCell>
    </TableRow>
  );
});

const CustomCommandListTableComponent = ({
  commandListData,
  pageNo,
  pageSize,
  handlePageChange,
  handleChangeRowsPerPage,
}) => {
  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{
          overflow: "auto",
          maxHeight: "555px",
          ".MuiTypography-root": {
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen','Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',sans-serif",
          },
        }}
      >
        <Table aria-label="simple table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  paddingY: "10px",
                  width: "50px",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                }}
              >
                <Typography sx={{ fontWeight: 550, letterSpacing: "1px" }}>
                  S.No.
                </Typography>
                <div
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "25px",
                    backgroundColor: "white",
                    right: 0,
                    top: 10,
                  }}
                />
              </TableCell>

              <TableCell
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  paddingY: "10px",
                  // width: {
                  //   sm: "230px",
                  //   md: "300px",
                  //   lg: "250px",
                  //   xl: "300px",
                  // },
                  width: "45%",
                }}
              >
                <Typography sx={{ fontWeight: 550, letterSpacing: "1px" }}>
                  DESCRIPTION
                </Typography>
                <div
                  style={{
                    position: "absolute",
                    width: "1px",
                    height: "25px",
                    backgroundColor: "white",
                    right: 0,
                    top: 10,
                  }}
                />
              </TableCell>
              <TableCell
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  paddingY: "10px",
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                <Typography sx={{ fontWeight: 550, letterSpacing: "1px" }}>
                  COMMAND
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(commandListData?.data?.length > 0) ? (
              commandListData?.data?.map((row, index) => (
                <CustomRow
                  key={row.id}
                  row={row}
                  index={index}
                  rowSerialNumber={calculateSerialNumber(
                    index,
                    pageNo,
                    pageSize
                  )}
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
      <TablePagination
        component="div"
        count={commandListData?.totalElement || 0}
        rowsPerPage={pageSize}
        page={pageNo}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
};

export default React.memo(CustomCommandListTableComponent);
