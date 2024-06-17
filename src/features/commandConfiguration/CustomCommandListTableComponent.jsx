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

const CustomRow = React.memo(({ row, index }) => {
  return (
    <TableRow
    // hover
    // key={row?.id}
    >
      <TableCell sx={{ paddingY: "16px" }}>
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
        <Typography
          variant="body1"
          sx={{
            fontWeight: 550,
            color: Boolean(row?.command) ? "customBlue.dark" : "customGrey.600",
            fontSize: Boolean(row?.command) ? "" : "15px",
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
                  width: "50px",
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
                  width: {
                    sm: "230px",
                    md: "300px",
                    lg: "250px",
                    xl: "300px",
                  },
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
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                }}
              >
                COMMAND
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(commandListData?.data?.length > 0) ? (
              commandListData?.data?.map((row, index) => (
                <CustomRow key={row.id} row={row} index={index} />
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
