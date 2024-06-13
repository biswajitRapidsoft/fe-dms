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
        <TableCell align="center">
          {/* {row?.id} */}
          {index + 1}
        </TableCell>
        <TableCell align="center">
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
        <TableCell align="center">
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
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
            <TextField
              value={row?.midCommand || ""}
              size="small"
              name="midCommand"
              sx={{ minWidth: "10em" }}
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
                fontSize: Boolean(row?.endCommand) ? "" : "15px",
              }}
            >
              {row?.endCommand || "NA"}
            </Typography>
          </Box>
        </TableCell>

        <TableCell align="center">
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
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  paddingY: "15px",
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
                  paddingY: "15px",
                }}
              >
                DESCRIPTION
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  paddingY: "15px",
                }}
              >
                COMMAND
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  paddingY: "15px",
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
