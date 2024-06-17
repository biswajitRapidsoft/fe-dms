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

const CustomRow = React.memo(
  ({
    row,
    index,
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

    console.log("CustomRow data in sendCommandList: ", row);
    return (
      <TableRow
      // hover
      // key={row?.id}
      >
        <TableCell>
          {/* {row?.id} */}
          {index + 1}
        </TableCell>
        <TableCell>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 550,
              color: Boolean(row?.description)
                ? "customBlue.dark"
                : "customGrey.600",
              fontSize: Boolean(row?.description) ? "" : "15px",
            }}
          >
            {row?.description || "NA"}
          </Typography>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 550,
                  color: Boolean(row?.baseCommand)
                    ? "customBlue.dark"
                    : "customGrey.600",
                  fontSize: Boolean(row?.baseCommand) ? "" : "15px",
                }}
              >
                {row?.baseCommand || "NA"}
              </Typography>
            </Box>

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
                sx={{ minWidth: "10em" }}
                onChange={(e) =>
                  handleSendCommandListCellInputChangeOnChange(e)
                }

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
                  fontSize: Boolean(row?.endCommand) ? "" : "15px",
                }}
              >
                {row?.endCommand || "NA"}
              </Typography>
            </Box>
          </Box>
        </TableCell>

        <TableCell>
          <Button
            variant="contained"
            size="small"
            onClick={(e) => handleSendCommandInSendEventListOnClick(e)}
          >
            SEND
          </Button>
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
        sx={{ overflow: "auto", maxHeight: "555px" }}
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
                  position: "relative",
                }}
              >
                S.No.
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
                  position: "relative",
                }}
              >
                DESCRIPTION
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
                  position: "relative",
                }}
              >
                COMMAND
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
                ACTION
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(commandListData?.data?.length > 0) ? (
              commandListData?.data?.map((row, index) => (
                <CustomRow
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
