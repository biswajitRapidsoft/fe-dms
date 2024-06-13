import React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import {
  Autocomplete,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import InfoIcon from "@mui/icons-material/Info";

import VideoComponent from "./VideoComponent";
// import { useNavigate } from "react-router";
import { formatDateToIST, formatTimeToIST } from "../../helper/formatter";
import {
  CLOSE_EYES,
  DISTRACTION,
  DRINKING,
  LOW_HEAD,
  NO_FACE,
  PHONE_CALLING,
  SMOKING_ALERT,
  YAWN_ALERT,
  customChartColors,
} from "../../helper/constants";

const CustomRow = React.memo(
  ({
    index,
    theme,
    row,
    handleClickOpen,
    getRemarkType,
    handleChangeSelectedRemarkOption,
    handleResetSelectedRemarkOption,
    handleInputChangeEventRemark,
    handleUpdateEventRemark,
  }) => {
    // const navigate = useNavigate();

    // const handleNavigateEventDetails = React.useCallback(
    //   ({ event, dlNumber, eventData }) => {
    //     event?.stopPropagation();
    //     sessionStorage.setItem("eventData", eventData)
    //     navigate(`/eventDetails/${dlNumber}`,);
    //   },
    //   [navigate]
    // );
    // console.log("table component row data: ", row);
    console.log("table component row data: ", index, row.id);

    const matchedRemarkType = React.useMemo(
      () => getRemarkType?.find((item) => item?.id === row?.remarkId),
      [getRemarkType, row?.remarkId]
    );

    const handleOpenEventDetailsWindow = React.useCallback(
      ({ event, dlNumber, eventData }) => {
        event?.stopPropagation();

        sessionStorage.setItem(
          "eventData",
          Boolean(eventData) ? JSON.stringify(eventData) : null
        );

        const origin = window.location.origin;

        const url = `${origin}/eventDetails`;

        window.open(url, "_blank");
      },
      []
    );

    const handleChangeSelectedRemarkOptionOnInputChange = React.useCallback(
      (e, rowId, selectedRemarkOption) => {
        e?.preventDefault();
        handleChangeSelectedRemarkOption(rowId, selectedRemarkOption);
      },
      [handleChangeSelectedRemarkOption]
    );

    const handleInputChangeEventRemarkOnChange = React.useCallback(
      (e, rowId) => {
        const inputValue = e.target.value;
        handleInputChangeEventRemark(rowId, inputValue);
      },
      [handleInputChangeEventRemark]
    );
    const handleResetSelectedRemarkOptionOnClear = React.useCallback(
      (e, rowId, defaultRemarkId) => {
        e?.preventDefault();
        const defaultRemarkOption = getRemarkType?.find(
          (option) => option?.id === defaultRemarkId
        );
        handleResetSelectedRemarkOption(rowId, defaultRemarkOption);
      },
      [handleResetSelectedRemarkOption, getRemarkType]
    );

    const handleUpdateEventRemarkOnSave = React.useCallback(
      (e, eventId, newRemark, newRemarkId, oldRemarkId) => {
        e?.preventDefault();
        handleUpdateEventRemark(eventId, newRemark, newRemarkId, oldRemarkId);
      },
      [handleUpdateEventRemark]
    );

    return (
      <TableRow
        hover
        key={row?.id}
        onClick={() => handleClickOpen(row)}
        sx={{
          cursor: "pointer",
          height: 80,
          backgroundColor: Boolean(row?.remarkId === 2)
            ? theme.palette.customOrange[50]
            : Boolean(row?.remarkId === 3)
            ? theme.palette.customYellow[50]
            : "inherit",
          "&:hover": {
            backgroundColor: Boolean(row?.remarkId === 2)
              ? `${theme.palette.customOrange[100]} !important`
              : Boolean(row?.remarkId === 3)
              ? `${theme.palette.customYellow[200]} !important`
              : "inherit",
          },
        }}
      >
        <TableCell align="center">
          <Typography sx={{ fontSize: "19px" }}>{index + 1}</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="body1"
            sx={{ fontWeight: 550, color: "customBlue.dark", fontSize: "17px" }}
          >
            {row?.vehicleNo}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              color: Boolean(row?.chassisNumber)
                ? "customBlue.dark"
                : "customGrey.600",
              fontSize: "16px",
            }}
          >
            ({row?.chassisNumber || "NA"})
          </Typography>
        </TableCell>
        <TableCell align="center">
          <Typography
            variant="body1"
            sx={{
              fontWeight: 550,
              color: "customBlue.dark",
              fontSize: "18px",
            }}
          >
            {row?.driverName}
          </Typography>
          {/* <br /> */}
          <Typography
            variant="caption"
            sx={{ color: "customNavyBlue.main", fontSize: "16px" }}
          >
            +91-{row?.driverPhone}
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
            {formatDateToIST(row?.eventServerCreateTime)}
          </Typography>
          <Typography
            sx={{
              fontWeight: 500,
              color: Boolean(row?.eventServerCreateTime)
                ? "customBlue.dark"
                : "customGrey.600",
              fontSize: "16px",
            }}
          >
            ({formatTimeToIST(row?.eventServerCreateTime) || "N/A"})
          </Typography>
        </TableCell>

        <TableCell
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
                : row?.eventType === YAWN_ALERT &&
                  customChartColors.yawningCount,

            fontSize: "15px",
            fontWeight: "550",
          }}
        >
          {row?.eventType?.replace(/_/g, " ")}
        </TableCell>
        <TableCell align="center" onClick={(e) => e.stopPropagation()}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              gap: 1,
              minWidth: "12em",
            }}
          >
            {(Boolean(row?.selectedRemarkOption?.id === 3) &&
              Boolean(row?.remarkId !== 3)) ||
            (Boolean(row?.selectedRemarkOption?.id === 2) &&
              Boolean(row?.remarkId !== 2)) ? (
              <TextField
                size="small"
                label="Add Remark"
                multiline
                autoFocus
                // rows={1}
                maxRows={2}
                // value={row?.manualRemark || ""}
                onChange={(e) =>
                  handleInputChangeEventRemarkOnChange(e, row?.id)
                }
                variant="outlined"
                fullWidth
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 10,
                  },
                  "& .MuiInputLabel-root": {
                    color: "customBlue.dark", // Change the label color here
                    fontSize: "17px", // Change the label font size here
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "customBlue.dark", // Change the label color when focused
                  },
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={(e) => {
                          handleResetSelectedRemarkOptionOnClear(
                            e,
                            row?.id,
                            row?.remarkId
                          );
                        }}
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    overflow: "hidden",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                  },
                  inputProps: {
                    maxLength: 1000,
                    style: {
                      overflow: "auto",
                      msOverflowStyle: "none",
                      scrollbarWidth: "none",
                      WebkitScrollbar: {
                        display: "none",
                      },
                    },
                  },
                }}
              />
            ) : (
              <>
                {Boolean(row?.remarkId === 1) ? (
                  <Autocomplete
                    disablePortal
                    disableClearable
                    id="combo-box-demo"
                    // sx={{ width: "100%", mt: "10px" }}
                    size="small"
                    options={getRemarkType}
                    fullWidth
                    value={
                      getRemarkType?.find(
                        (option) => option?.id === row?.selectedRemarkOption?.id
                      ) ||
                      getRemarkType?.find(
                        (option) => option?.id === row?.remarkId
                      ) ||
                      null
                    }
                    onInputChange={(event, newValue) => {
                      event?.stopPropagation();
                      console.log("autocomplete newValue: ", newValue);
                      const selectedRemarkOption =
                        getRemarkType?.find(
                          (option) => option?.status === newValue
                        ) || null;

                      handleChangeSelectedRemarkOptionOnInputChange(
                        event,
                        row?.id,
                        selectedRemarkOption
                      );
                    }}
                    getOptionLabel={(option) => option?.status || ""}
                    renderOption={(props, option) => (
                      <li
                        {...props}
                        key={option?.id}
                        style={{ fontSize: "14px", whiteSpace: "nowrap" }}
                      >
                        {option?.status}
                      </li>
                    )}
                    PaperComponent={(props) => (
                      <Paper
                        sx={{
                          background: "primary.customContrast",
                          color: "customGrey.700",
                          borderRadius: "10px",
                          // width: "200px",
                          maxHeight: "300px",
                          overflowY: "auto",
                        }}
                        {...props}
                      />
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          sx: { fontSize: "14px" },
                        }}
                        InputLabelProps={{
                          ...params.InputLabelProps,
                          sx: { fontSize: "14px" },
                        }}
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: 10,
                          },
                          "& .MuiInputLabel-root": {
                            color: "customBlue.dark", // Change the label color here
                            fontSize: "17px", // Change the label font size here
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: "customBlue.dark", // Change the label color when focused
                          },
                        }}
                      />
                    )}
                    sx={{
                      // flexBasis: {
                      //   xs: "75%",
                      //   sm: "60%",
                      //   md: "50%",
                      // },
                      width: 180,
                      ".MuiInputBase-root": {
                        color: "customBlue.dark",
                      },
                      "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover":
                        {
                          backgroundColor: "customBlue.light",
                          color: "customBlue.dark",
                          fontWeight: 600,
                        },
                      "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
                        {
                          backgroundColor: "customBlue.light",
                          color: "customBlue.dark",
                          fontWeight: 600,
                        },
                      "& .MuiAutocomplete-inputRoot[class*='MuiOutlinedInput-root'] .MuiAutocomplete-input:focus":
                        {
                          borderColor: "secondary.customContrast !important",
                        },
                    }}
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                    //THIS IS onChange NOT onInputChange
                    onChange={(event, newValue) => {
                      event?.stopPropagation();
                      if (!newValue) {
                        return;
                      }
                    }}
                  />
                ) : (
                  <>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      {/* <Box sx={{ flexGrow: 1 }}> */}
                      <Typography
                        sx={{
                          fontSize: "15px",
                          fontWeight: "550",
                          color: "customBlue.dark",
                          flexGrow: 1,
                        }}
                      >
                        {matchedRemarkType?.status}
                      </Typography>
                      {/* </Box> */}

                      <Tooltip
                        title={
                          <Typography
                            sx={{
                              fontSize: "17px",
                              paddingX: "7px",
                              paddingY: "5px",
                              maxWidth: "220px",
                              whiteSpace: "normal",
                              wordBreak: "break-word",
                            }}
                          >
                            {row?.remark}
                          </Typography>
                        }
                        // placement="top"
                        arrow
                        PopperProps={{
                          modifiers: [
                            {
                              name: "offset",
                              options: {
                                offset: [0, -3],
                              },
                            },
                          ],
                        }}
                        sx={{
                          [`& .MuiTooltip-tooltip`]: {
                            backgroundColor: "black",
                            color: "white",
                            boxShadow: 1,
                            maxWidth: "220px",
                            whiteSpace: "normal",
                            wordBreak: "break-word",
                          },
                          [`& .MuiTooltip-arrow`]: {
                            color: "black",
                          },
                        }}
                      >
                        <InfoIcon />
                      </Tooltip>
                    </Box>
                  </>
                )}
              </>
            )}
          </Box>
          {/* <Autocomplete
            disablePortal
            disableClearable
            id="combo-box-demo"
            // sx={{ width: "100%", mt: "10px" }}
            size="small"
            options={getRemarkType}
            fullWidth
            value={
              getRemarkType?.find((option) => option?.id === row?.remarkId) ||
              null
            }
            onInputChange={(event, newValue) => {
              event?.stopPropagation();
              console.log("autocomplete newValue: ", newValue);
              const selectedRemarkOption =
                getRemarkType?.find((option) => option?.status === newValue) ||
                null;

              handleChangeSelectedRemarkOptionOnInputChange(
                event,
                row?.id,
                selectedRemarkOption
              );
            }}
            getOptionLabel={(option) => option?.status || ""}
            renderOption={(props, option) => (
              <li {...props} key={option?.id}>
                {option?.status}
              </li>
            )}
            renderInput={(params) => <TextField {...params} />}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            //THIS IS onChange NOT onInputChange
            onChange={(event, newValue) => {
              event?.stopPropagation();
              if (!newValue) {
                return;
              }
            }}
          /> */}
        </TableCell>
        <TableCell align="center">
          <IconButton
            onClick={(e) => {
              handleOpenEventDetailsWindow({
                event: e,
                dlNumber: row?.dlNumber,
                eventData: row,
              });
            }}
          >
            <LocationOnIcon
              sx={{ color: "customBlue.dark", fontSize: "33px" }}
            />
          </IconButton>
        </TableCell>

        <TableCell align="center" onClick={(e) => e?.stopPropagation()}>
          <Button
            variant="contained"
            size="small"
            disabled={Boolean(row?.remarkId !== 1)}
            onClick={(e) =>
              handleUpdateEventRemarkOnSave(
                e,
                row?.id,
                // row?.manualRemark || row?.selectedRemarkOption?.status
                row && row?.hasOwnProperty("manualRemark")
                  ? row?.manualRemark
                  : row?.selectedRemarkOption?.status || "",
                row?.selectedRemarkOption?.id,
                row?.remarkId
              )
            }
            sx={{ fontSize: "14px", fontWeight: "550" }}
          >
            Save
          </Button>
        </TableCell>
      </TableRow>
    );
  }
);

const TableComponent = ({
  getAllData,
  getRemarkType,
  pageNo,
  pageSize,
  handlePageChange,
  handleChangeRowsPerPage,
  handleChangeSelectedRemarkOption,
  handleResetSelectedRemarkOption,
  handleInputChangeEventRemark,
  handleUpdateEventRemark,
}) => {
  // useState for opening and closing dialog
  const theme = useTheme();
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

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{ overflow: "auto", height: "700px", maxHeight: "700px" }}
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
                  fontSize: "17.5px",
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
                  fontSize: "17.5px",
                }}
              >
                Vehicle Details
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "17.5px",
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
                  fontSize: "17.5px",
                }}
              >
                Event Date & Time
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "17.5px",
                  // background: "linear-gradient(rgb(30 96 139), rgb(14 57 115))",
                }}
              >
                Event Type
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  width: "200px",
                  fontSize: "17.5px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "17.5px",
                }}
              >
                Details
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "text.light",
                  backgroundColor: "primary.main",
                  fontWeight: "bold",
                  fontSize: "17.5px",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Boolean(getAllData?.data?.length > 0) ? (
              getAllData?.data?.map((row, index) => (
                <CustomRow
                  index={index}
                  theme={theme}
                  key={row.id}
                  row={row}
                  handleClickOpen={handleClickOpen}
                  getRemarkType={getRemarkType}
                  handleChangeSelectedRemarkOption={
                    handleChangeSelectedRemarkOption
                  }
                  handleResetSelectedRemarkOption={
                    handleResetSelectedRemarkOption
                  }
                  handleInputChangeEventRemark={handleInputChangeEventRemark}
                  handleUpdateEventRemark={handleUpdateEventRemark}
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
        count={getAllData?.totalElement || 0}
        rowsPerPage={pageSize}
        page={pageNo}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
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
          zIndex: theme.zIndex.modal + 10,
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
                backgroundColor: "primary.customContrast",
                // backgroundColor: "red",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                // gap: 34,
              }}
            >
              <Grid container>
                <Grid
                  item
                  lg={6}
                  xl={6}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={() => setShowVideo(true)}>
                    <OndemandVideoIcon
                      sx={{ fontSize: 80, color: "customGreyBlue.100" }}
                    />
                  </IconButton>
                </Grid>
                <Grid
                  item
                  lg={6}
                  xl={6}
                  md={6}
                  sm={6}
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <IconButton onClick={() => setShowImage(true)}>
                    <ImageIcon
                      sx={{ fontSize: 80, color: "customGreyBlue.100" }}
                    />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          )}
          {showVideo && (
            <IconButton onClick={() => setShowVideo(false)}>
              <ArrowBackIcon
                sx={{ fontSize: 25, color: "customGreyBlue.100" }}
              />
            </IconButton>
          )}
          {showImage && (
            <IconButton onClick={() => setShowImage(false)}>
              <ArrowBackIcon
                sx={{ fontSize: 20, color: "customGreyBlue.100" }}
              />
            </IconButton>
          )}
          {showVideo && selectedTruck && (
            <Box>
              <Grid container spacing={2}>
                {selectedTruck?.evidenceVideos?.map((videoUrl, index) => {
                  return (
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={2.4}
                      // xl={3}
                      key={index}
                    >
                      {/* {console.log(videoUrl)} */}

                      <VideoComponent videoUrl={videoUrl} />
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          )}

          {showImage && (
            <Box>
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
