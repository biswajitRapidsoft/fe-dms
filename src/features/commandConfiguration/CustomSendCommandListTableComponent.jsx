import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { Box, Button, TextField, Typography } from "@mui/material";
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

const CustomRow = React.memo(
  ({
    row,
    index,
    rowSerialNumber,
    handleSendCommandListCellInputChange,
    handleSendCommandInSendEventList,
  }) => {
    const handleSendCommandListCellInputChangeOnChange = React.useCallback(
      (e) => {
        handleSendCommandListCellInputChange(e, row.id);
      },
      [handleSendCommandListCellInputChange, row?.id]
    );

    const handleSendCommandInSendEventListOnClick = React.useCallback(
      (e) => {
        e.preventDefault();
        handleSendCommandInSendEventList(row);
      },
      [handleSendCommandInSendEventList, row]
    );

    // console.log("CustomRow data in sendCommandList: ", row);
    return (
      <TableRow
      // hover
      // key={row?.id}
      >
        <TableCell>
          {/* {row?.id} */}
          <Typography
            variant="body1"
            sx={{
              // fontWeight: 550,
              color: Boolean(row?.command)
                ? "customGrey.700"
                : "customGrey.600",
              textAlign: "center",
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
            }}
          >
            {row?.description || "NA"}
          </Typography>
        </TableCell>
        <TableCell>
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "left",
            }}
          > */}
          <Typography
            variant="body1"
            sx={{
              fontWeight: 550,
              color: Boolean(row?.baseCommand)
                ? "customBlue.dark"
                : "customGrey.600",
              // fontSize: Boolean(row?.baseCommand) ? "" : "15px",
              wordBreak: "break-word",
              textAlign: "left",
            }}
          >
            {row?.baseCommand || "NA"}
          </Typography>
          {/* </Box> */}
        </TableCell>

        <TableCell>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
            }}
          >
            <TextField
              value={row?.midCommand || ""}
              size="small"
              name="midCommand"
              sx={{ minWidth: "5em" }}
              onChange={(e) => handleSendCommandListCellInputChangeOnChange(e)}

              // label="mid
              // fullWidth
            />
            <Typography
              variant="body1"
              sx={{
                fontWeight: 550,
                color: Boolean(row?.endCommand)
                  ? "customBlue.dark"
                  : "customGrey.600",
              }}
            >
              {row?.endCommand || "NA"}
            </Typography>
          </Box>
        </TableCell>

        <TableCell sx={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button
              variant="contained"
              size="small"
              onClick={(e) => handleSendCommandInSendEventListOnClick(e)}
            >
              SEND
            </Button>
          </Box>
        </TableCell>
      </TableRow>
    );
  }
);

const CustomSendCommandListTableComponent = ({
  commandListData,
  pageNo,
  pageSize,
  handlePageChange,
  handleChangeRowsPerPage,
  handleSendCommandListCellInputChange,
  handleSendCommandInSendEventList,
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
          ".MuiButton-root": {
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
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
                  // maxWidth: "150px",
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
                  // paddingY: "10px",
                }}
              >
                <Typography sx={{ fontWeight: 550, letterSpacing: "1px" }}>
                  COMMAND
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  paddingY: "10px",
                  // paddingX: "140px",
                }}
              >
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
                  ACTION
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(commandListData?.data?.length > 0) ? (
              commandListData?.data?.map((row, index) => (
                <CustomRow
                  rowSerialNumber={calculateSerialNumber(
                    index,
                    pageNo,
                    pageSize
                  )}
                  index={index}
                  key={row.id}
                  row={row}
                  handleSendCommandListCellInputChange={
                    handleSendCommandListCellInputChange
                  }
                  handleSendCommandInSendEventList={
                    handleSendCommandInSendEventList
                  }
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

export default React.memo(CustomSendCommandListTableComponent);
