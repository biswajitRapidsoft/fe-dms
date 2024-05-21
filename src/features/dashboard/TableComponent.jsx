import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { IconButton, Typography } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";

const TableComponent = ({
  getAllData,
  pageNo,
  pageSize,
  handlePageChange,
  handleChangeRowsPerPage,
}) => {
  // useState for opening and closing dialog
  const [open, setOpen] = React.useState(false);
  const [selectedTruck, setSelectedTruck] = React.useState(null);
  // useStates for viewing the images and video icons
  const [showVideo, setShowVideo] = React.useState(false);
  const [showImage, setShowImage] = React.useState(false);

  const handleClickOpen = React.useCallback(
    (row) => {
      setSelectedTruck(row);
      setOpen(true);
    },
    [setOpen]
  );

  const handleClose = React.useCallback(() => {
    setOpen(false);
    setSelectedTruck(null);
    setShowVideo(false);
    setShowImage(false);
  }, [setOpen]);

  const CustomRow = React.memo(({ row, handleClickOpen }) => {
    return (
      <TableRow
        hover
        key={row.id}
        onClick={() => handleClickOpen(row)}
        style={{ cursor: "pointer" }}
      >
        <TableCell align="center">{row.id}</TableCell>
        <TableCell align="center">
          <Typography
            variant="body1"
            sx={{ fontWeight: 550, color: "#00308F" }}
          >
            {row.vehicleNo}
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="body1"
              sx={{ fontWeight: 550, color: "#00308F" }}
            >
              {row.driverName}
            </Typography>
            {/* <br /> */}
            <Typography variant="caption" sx={{ color: "#7CB9E8" }}>
              +91-{row.driverPhone}
            </Typography>
          </Box>
        </TableCell>
        <TableCell align="center">
          {row?.eventType.replace(/_/g, " ")}
        </TableCell>
      </TableRow>
    );
  });
  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{ overflow: "auto", maxHeight: "655px" }}
      >
        <Table aria-label="simple table" stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  backgroundColor: "#5e63b6",
                  fontWeight: "bold",
                }}
              >
                Sno.
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  backgroundColor: "#5e63b6",
                  fontWeight: "bold",
                }}
              >
                Vehicle Details
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  backgroundColor: "#5e63b6",
                  fontWeight: "bold",
                }}
              >
                Driver details
              </TableCell>

              <TableCell
                align="center"
                sx={{
                  color: "#fff",
                  backgroundColor: "#5e63b6",
                  fontWeight: "bold",
                  // background: "linear-gradient(rgb(30 96 139), rgb(14 57 115))",
                }}
              >
                Event Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getAllData?.data.length > 0 ? (
              getAllData?.data.map((row) => (
                <CustomRow
                  key={row.id}
                  row={row}
                  handleClickOpen={handleClickOpen}
                />
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={getAllData?.totalElement || 0}
        rowsPerPage={pageSize}
        page={pageNo}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* dialog */}

      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            width: "80%",
            maxWidth: "none",
            height: "80%",
            maxHeight: "none",
          },
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0,0,30,0.4)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "16px",
          }}
        >
          <DialogTitle sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Driver Action Details
          </DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseIcon sx={{ fontSize: "2.05rem" }} />
          </IconButton>
        </Box>
        <DialogContent>
          {/* box containg the image and video icons */}
          {!showVideo && !showImage && (
            <Box
              sx={{
                backgroundColor: "#fffafa",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 34,
              }}
            >
              <IconButton onClick={() => setShowVideo(true)}>
                <OndemandVideoIcon sx={{ fontSize: 80, color: "#a2a8d3" }} />
              </IconButton>
              <IconButton onClick={() => setShowImage(true)}>
                <ImageIcon sx={{ fontSize: 80, color: "#a2a8d3" }} />
              </IconButton>
            </Box>
          )}
          {showVideo && (
            <IconButton onClick={() => setShowVideo(false)}>
              <ArrowBackIcon sx={{ fontSize: 25, color: "#a2a8d3" }} />
            </IconButton>
          )}
          {showImage && (
            <IconButton onClick={() => setShowImage(false)}>
              <ArrowBackIcon sx={{ fontSize: 20, color: "#a2a8d3" }} />
            </IconButton>
          )}
          {showVideo && selectedTruck && (
            <Box mt={2}>
              <Grid container spacing={2}>
                {selectedTruck?.evidenceVideos?.map((videoUrl, index) => (
                  <Grid item xs={12} lg={4} key={index}>
                    {/* {console.log(videoUrl)} */}
                    <video width="100%" height="500" controls>
                      <source src={videoUrl} type="video/mp4" />
                    </video>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {showImage && (
            <Box mt={2}>
              <Grid container spacing={2}>
                {selectedTruck?.evidencePhotos?.map((photoUrl, index) => (
                  <Grid item xs={12} lg={4} key={index}>
                    <img
                      src={photoUrl}
                      alt="Evidence"
                      style={{ width: "100%", height: "500px" }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
};

export default React.memo(TableComponent);
