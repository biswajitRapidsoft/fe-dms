import React, { useState } from "react";

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
// import ImageIcon from "@mui/icons-material/Image";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import LocationOnIcon from "@mui/icons-material/LocationOn";

// import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import InfoIcon from "@mui/icons-material/Info";

// import VideoComponent from "./VideoComponent";
// import { useNavigate } from "react-router";
import { formatDateToIST, formatTimeToIST } from "../../helper/formatter";
import {
  CLOSE_EYES,
  DISTRACTION,
  DRINKING,
  LOW_HEAD,
  NO_FACE,
  MOBILE_USE,
  SMOKING,
  YAWNING,
  customChartColors,
  ACTION_TAKEN,
  NO_ACTION_NEEDED,
  PENDING,
} from "../../helper/constants";
import { evidenceImageService } from "../../services/evidenceImageService";

// import VIDEO_GALLERY_LOGO from "../../img/VIDEO_GALLERY_LOGO.svg";
import PHOTO_GALLERY_LOGO from "../../img/PHOTO_GALLERY_LOGO.svg";

const CustomGradientBoxForPhoto = React.memo(function ({
  photoUrl,
  handleChangeExpandedPhotoEvidence,
  isExpandedPhotoEvidenceCard,
}) {
  // console.log(
  //   "isExpandedPhotoEvidenceCard: ",
  //   isExpandedPhotoEvidenceCard,
  //   typeof photoUrl
  // );
  const [imgData, setImgData] = React.useState({});

  const fetchImageData = React.useCallback(async () => {
    const response = await evidenceImageService.fetchEvidenceImageData(
      photoUrl
    );
    setImgData(response);
  }, [photoUrl]);

  const handleExpandedPhotoEvidenceOnClick = React.useCallback(() => {
    handleChangeExpandedPhotoEvidence(photoUrl);
  }, [handleChangeExpandedPhotoEvidence, photoUrl]);

  // const handleCloseExpandedPhotoEvidence = React.useCallback(() => {
  //   handleChangeExpandedPhotoEvidence();
  // }, [handleChangeExpandedPhotoEvidence]);

  React.useEffect(() => {
    fetchImageData();
  }, [fetchImageData]);

  return (
    <Paper
      elevation={4}
      sx={{
        width: Boolean(isExpandedPhotoEvidenceCard) ? "98.5%" : "280px",
        height: Boolean(isExpandedPhotoEvidenceCard) ? "98.5%" : "180px",
        position: Boolean(isExpandedPhotoEvidenceCard) ? "absolute" : "",
        top: Boolean(isExpandedPhotoEvidenceCard) ? 1 : "auto",
        right: Boolean(isExpandedPhotoEvidenceCard) ? 2 : "auto",
        zIndex: Boolean(isExpandedPhotoEvidenceCard) ? 10 : "auto", // Ensure it is above other elements
        // transition: "all 0.3s ease-in-out",
        // transformOrigin: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          // maxHeight: "180px",
          // backgroundImage: `linear-gradient(to right bottom, #ffffff, #dbdae0, #b9b6c3, #9793a5, #777289, #676077, #574f65, #483e54, #413748, #3a303d, #322933, #2a2329)`,
          flexShrink: 0,
          // position: "relative",
        }}
      >
        {imgData.data ? (
          <img
            src={imgData.data}
            alt={"evidence"}
            width="100%"
            height="100%"
            onClick={() =>
              !Boolean(isExpandedPhotoEvidenceCard) &&
              handleExpandedPhotoEvidenceOnClick()
            }
            style={{
              cursor: !Boolean(isExpandedPhotoEvidenceCard) && "pointer",
            }}
          />
        ) : (
          imgData.message
        )}

        {/* <Box
          sx={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            color: "text.light",
            backgroundColor: "transparent",
            backdropFilter: "blur(20px)",
            backgroundImage:
              "linear-gradient(120deg,rgba(0, 0, 0, 0.2), rgba(225, 255, 255, 0.3))",
          }}
        >
          <Typography>Photo Evidence</Typography>
        </Box> */}
      </Box>
    </Paper>
  );
});

const CustomGradientBoxForVideo = React.memo(function ({ videoUrl }) {
  return (
    <Paper elevation={4} sx={{ width: "280px", height: "180px" }}>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          // maxHeight: "180px",
          // backgroundImage: `linear-gradient(to right bottom, #ffffff, #dbdae0, #b9b6c3, #9793a5, #777289, #676077, #574f65, #483e54, #413748, #3a303d, #322933, #2a2329)`,
          flexShrink: 0,
          position: "relative",
        }}
      >
        <video
          src={videoUrl}
          controls
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        {/* <Box
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          color: "text.light",
          backgroundColor: "transparent",
          backdropFilter: "blur(20px)",
          backgroundImage:
            "linear-gradient(120deg, rgba(0, 0, 0, 0.2), rgba(225, 255, 255, 0.3))",
        }}
      >
        <Typography>Video Evidence</Typography>
      </Box> */}
      </Box>
    </Paper>
  );
});

const DriverActionDetailsDialog = React.memo(function ({
  driverActionDetailsDialogOpen,
  selectedEventRowData,
  handleCloseDriverActionDetailsDialog,
  getRemarkType,
}) {
  const matchedRemarkType = React.useMemo(
    () =>
      getRemarkType?.find(
        (item) => item?.id === selectedEventRowData?.remarkId
      ),
    [getRemarkType, selectedEventRowData?.remarkId]
  );
  // console.log("selectedEventRowData : ", selectedEventRowData);
  const theme = useTheme();
  // const [showVideoGallery, setShowVideoGallery] = React.useState(false);
  const showVideoGallery = false;
  // const [showImageGallery, setShowImageGallery] = React.useState(true);
  const showImageGallery = true;
  const [expandedPhotoEvidence, setExpandedPhotoEvidence] = useState(null);
  // console.log("expandedPhotoEvidence: ", expandedPhotoEvidence);

  const handleChangeExpandedPhotoEvidence = React.useCallback((photoUrl) => {
    setExpandedPhotoEvidence(photoUrl || null);
  }, []);

  // const handleChangeShowVideoGallery = React.useCallback(() => {
  //   setShowVideoGallery((prev) => !prev);
  //   setShowImageGallery(false);
  // }, []);
  // const handleChangeShowImageGallery = React.useCallback(() => {
  //   setShowImageGallery((prev) => !prev);
  //   setShowVideoGallery(false);
  // }, []);

  const handleCloseDriverActionDetailsDialogByDialog = React.useCallback(() => {
    handleCloseDriverActionDetailsDialog();
    setExpandedPhotoEvidence(null);
  }, [handleCloseDriverActionDetailsDialog]);
  return (
    <Dialog
      open={driverActionDetailsDialogOpen}
      onClose={handleCloseDriverActionDetailsDialogByDialog}
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
          borderBottom: `1.5px solid ${theme?.palette?.customGrey["600"]}`,
        }}
      >
        <DialogTitle
          sx={{
            fontSize: "1.6rem",
            fontWeight: "bold",
          }}
        >
          Driver Action Details
        </DialogTitle>
        <IconButton onClick={handleCloseDriverActionDetailsDialogByDialog}>
          <CloseIcon sx={{ fontSize: "2.05rem" }} />
        </IconButton>
      </Box>
      <DialogContent sx={{ padding: 0 }}>
        <Box
          sx={{
            backgroundColor: "primary.customContrast",
            // backgroundColor: "red",
            width: "100%",
            height: "100%",
          }}
        >
          <Grid container sx={{ height: "100%" }}>
            <Grid
              item
              xl={3}
              lg={3}
              md={3.5}
              sm={12}
              xs={12}
              sx={{
                height: { xs: "25%", md: "100%" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: "100%",
                  flexDirection: { xs: "row", md: "column" },
                  gap: 1,
                }}
              >
                {/* <Paper
                  elevation={2}
                  sx={{
                    width: { xs: "50%", md: "100%" },
                    height: { xs: "100%", md: "50%" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: showVideoGallery
                      ? "customLightBlue.100"
                      : "inherit",
                  }}
                  onClick={() => handleChangeShowVideoGallery()}
                >
                  <img
                    src={VIDEO_GALLERY_LOGO}
                    alt="Video Gallery Logo"
                    width={85}
                    style={{userSelect:"none"}}
                  />
                </Paper> */}

                <Paper
                  elevation={2}
                  sx={{
                    width: { xs: "50%", md: "100%" },
                    height: { xs: "100%", md: "50%" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // bgcolor: showImageGallery
                    //   ? "customLightBlue.100"
                    //   : "inherit",
                  }}
                  // onClick={() => handleChangeShowImageGallery()}
                >
                  <img
                    src={PHOTO_GALLERY_LOGO}
                    alt="Still Gallery Logo"
                    width={85}
                    draggable={false}
                    style={{ userSelect: "none" }}
                  />
                </Paper>
              </Box>
            </Grid>
            <Grid
              item
              xl={9}
              lg={9}
              md={8.5}
              sm={12}
              xs={12}
              sx={{
                // bgcolor: "lavender",
                height: { xs: "75%", md: "100%" },
                // padding: Boolean(expandedPhotoEvidence) ? "" : 2,
                padding: 2,
                position: "relative",
              }}
            >
              <Box
                sx={{
                  // display: Boolean(expandedPhotoEvidence) ? "none" : "flex",
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  gap: 3,
                  // bgcolor: "lavender",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    border: `1px solid ${theme?.palette?.primary?.main}`,
                    // height: "30%",
                    height: { xs: "230px", md: "200px", lg: "180px" },
                    // overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      bgcolor: "primary.main",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "text.light",
                        fontWeight: "550",
                        fontSize: "20px",
                        paddingY: "8px",
                        letterSpacing: "1px",
                        marginLeft: "10px",
                      }}
                    >
                      Driver Action Details :
                    </Typography>
                  </Box>

                  <Grid
                    container
                    rowSpacing={1}
                    sx={{ marginTop: "5px", marginLeft: "10px" }}
                  >
                    <Grid item xs={12} lg={6}>
                      <Grid container>
                        <Grid item xs={4} sm={2.5} md={2.5} lg={3.5}>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
                              fontSize: "18.5px",
                              fontWeight: "550",
                            }}
                          >
                            Driver Name
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9.5} md={9.5} lg={8.5}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography
                              component="span"
                              sx={{
                                marginRight: "10px",
                                fontSize: "18.5px",
                                fontWeight: "550",
                              }}
                            >
                              :
                            </Typography>
                            <Typography
                              component="span"
                              sx={{
                                fontSize: "18.5px",
                                fontWeight: "550",
                                color: "customGrey.600",
                              }}
                            >
                              {selectedEventRowData?.driverName || "NA"}
                            </Typography>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Grid container>
                        <Grid item xs={4} sm={2.5} md={2.5} lg={3.5}>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
                              fontSize: "18.5px",
                              fontWeight: "550",
                            }}
                          >
                            Date & Time
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9.5} md={9.5} lg={8.5}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography
                              component="span"
                              sx={{
                                marginRight: "10px",
                                fontSize: "18.5px",
                                fontWeight: "550",
                              }}
                            >
                              :
                            </Typography>
                            <Typography
                              component="span"
                              sx={{
                                fontSize: "18.5px",
                                fontWeight: "550",
                                color: "customGrey.600",
                              }}
                            >
                              {formatDateToIST(
                                selectedEventRowData?.eventServerCreateTime
                              )}
                            </Typography>{" "}
                            <Typography
                              component="span"
                              sx={{
                                fontSize: "18.5px",
                                fontWeight: "550",
                                color: "customGrey.600",
                              }}
                            >
                              {formatTimeToIST(
                                selectedEventRowData?.eventServerCreateTime
                              )}
                            </Typography>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Grid container>
                        <Grid item xs={4} sm={2.5} md={2.5} lg={3.5}>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
                              fontSize: "18.5px",
                              fontWeight: "550",
                            }}
                          >
                            Event Type
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9.5} md={9.5} lg={8.5}>
                          <Typography sx={{ wordBreak: "break-word" }}>
                            <Typography
                              component="span"
                              sx={{
                                marginRight: "10px",
                                fontSize: "18.5px",
                                fontWeight: "550",
                              }}
                            >
                              :
                            </Typography>

                            <Typography
                              component="span"
                              sx={{
                                fontSize: "18px",
                                fontWeight: "550",
                                color: "customGrey.600",
                              }}
                            >
                              {Boolean(selectedEventRowData?.eventType)
                                ? selectedEventRowData?.eventType?.replace(
                                    /_/g,
                                    " "
                                  )
                                : "NA"}
                            </Typography>
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} lg={6}>
                      <Grid container>
                        <Grid item xs={4} sm={2.5} md={2.5} lg={3.5}>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
                              fontSize: "18.5px",
                              fontWeight: "550",
                            }}
                          >
                            Status
                          </Typography>
                        </Grid>
                        <Grid item xs={8} sm={9.5} md={9.5} lg={8.5}>
                          {/* <Typography sx={{ wordBreak: "break-word" }}> */}
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              wordBreak: "break-word",
                              flexDirection: "row",
                              flexWrap: "wrap",
                            }}
                          >
                            <Typography
                              component="span"
                              sx={{
                                marginRight: "10px",
                                fontSize: "18.5px",
                                fontWeight: "550",
                              }}
                            >
                              :
                            </Typography>

                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "row",
                                // width: "100%",
                                alignItems: "center",
                                justifyContent: "space-between",
                                gap: 1,
                              }}
                            >
                              {/* <Box sx={{ flexGrow: 1 }}> */}
                              <Typography
                                sx={{
                                  fontSize: "18px",
                                  fontWeight: "550",
                                  // color: "customBlue.dark",
                                  color: Boolean(
                                    matchedRemarkType?.status === ACTION_TAKEN
                                  )
                                    ? "#DF7512"
                                    : Boolean(
                                        matchedRemarkType?.status ===
                                          NO_ACTION_NEEDED
                                      )
                                    ? "#C2B811"
                                    : "customBlue.dark",
                                  flexGrow: 1,
                                }}
                              >
                                {matchedRemarkType?.status}
                              </Typography>
                              {/* </Box> */}

                              {Boolean(matchedRemarkType) &&
                                Boolean(
                                  matchedRemarkType?.status !== PENDING
                                ) && (
                                  <Tooltip
                                    title={
                                      <Typography
                                        sx={{
                                          fontSize: "16px",
                                          paddingX: "7px",
                                          paddingY: "5px",
                                          maxWidth: "220px",
                                          whiteSpace: "normal",
                                          wordBreak: "break-word",
                                        }}
                                      >
                                        {selectedEventRowData?.remark}
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
                                )}
                            </Box>
                          </Box>
                          {/* </Typography> */}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    border: `1px solid ${theme?.palette?.primary?.main}`,
                    // height: "70%",
                    height: {
                      xs: "calc(100% - 240px)",
                      md: "calc(100% - 220px)",
                      lg: "calc(100% - 200px)",
                    },
                    display: "flex",
                    flexDirection: "column",
                    // bgcolor: "lavender",
                    gap: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      bgcolor: "primary.main",
                      width: "100%",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "text.light",
                        fontWeight: "550",
                        fontSize: "20px",
                        paddingY: "8px",
                        letterSpacing: "1px",
                        marginLeft: "10px",
                      }}
                    >
                      Evidences :
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: "100%",
                      overflowX: "hidden",
                      overflowY: "auto",
                      display: "flex",
                      gap: "5px",
                      flexGrow: 1,
                      flexWrap: "wrap",
                      // bgcolor: "lavender",
                      paddingLeft: "10px",
                      // paddingY: "10px",
                    }}
                  >
                    {!Boolean(showImageGallery) && (
                      <>
                        {Boolean(
                          selectedEventRowData?.evidenceVideos?.length > 0
                        ) &&
                          selectedEventRowData?.evidenceVideos?.map(
                            (videoItem, index) => (
                              <CustomGradientBoxForVideo
                                key={`video-${index}`}
                                videoUrl={videoItem}
                              />
                            )
                          )}
                      </>
                    )}
                    {!Boolean(showVideoGallery) && (
                      <>
                        {Boolean(
                          selectedEventRowData?.evidencePhotos?.length > 0
                        ) &&
                          selectedEventRowData?.evidencePhotos?.map(
                            (photoItem, index) => (
                              <CustomGradientBoxForPhoto
                                key={`photo-${index}`}
                                photoUrl={photoItem}
                                handleChangeExpandedPhotoEvidence={
                                  handleChangeExpandedPhotoEvidence
                                }
                                // isExpandedPhotoEvidenceCard={
                                //   Boolean(expandedPhotoEvidence === photoItem)
                                //     ? true
                                //     : false
                                // }

                                isExpandedPhotoEvidenceCard={Boolean(
                                  Boolean(photoItem) &&
                                    Boolean(expandedPhotoEvidence) &&
                                    Boolean(
                                      (
                                        expandedPhotoEvidence || ""
                                      ).toString() ===
                                        (photoItem || "").toString()
                                    )
                                )}
                              />
                            )
                          )}
                      </>
                    )}
                  </Box>
                </Box>
              </Box>

              <IconButton
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 7,
                  bgcolor: "#8c8c8c40",
                  "&:hover": {
                    bgcolor: "#8c8c8c80",
                  },
                  zIndex: Boolean(expandedPhotoEvidence) ? 12 : "auto",
                  display: Boolean(expandedPhotoEvidence) ? "" : "none",
                }}
                onClick={() => handleChangeExpandedPhotoEvidence()}
              >
                <CloseIcon sx={{ fontSize: "20px", color: "customGrey.300" }} />
              </IconButton>

              {/* {Boolean(expandedPhotoEvidence) && (
              
              )} */}

              {/* <Box
                sx={{
                  display: Boolean(expandedPhotoEvidence) ? "flex" : "none",
                  // flexDirection: "column",
                  width: "100%",
                  height: "100%",
                  // bgcolor: "lavender",
                  position: "relative",
                }}
              >
                <img
                  src={expandedPhotoEvidence}
                  alt={"evidence"}
                  width="100%"
                  height="100%"
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    top: 5,
                    right: 7,
                    bgcolor: "#8c8c8c40",
                    "&:hover": {
                      bgcolor: "#8c8c8c80",
                    },
                  }}
                  onClick={() => handleChangeExpandedPhotoEvidence()}
                >
                  <CloseIcon
                    sx={{ fontSize: "20px", color: "customGrey.300" }}
                  />
                </IconButton>
              </Box> */}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  );
});

// function SingleImageEvidenceComponent({ photoUrl }) {
//   const [imgData, setImgData] = React.useState({});
//   const fetchImageData = React.useCallback(async () => {
//     const response = await evidenceImageService.fetchEvidenceImageData(
//       photoUrl
//     );
//     setImgData(response);
//   }, [photoUrl]);
//   React.useEffect(() => {
//     fetchImageData();
//   }, [fetchImageData]);
//   return (
//     <Grid item xs={12} lg={4}>
//       {imgData.data ? (
//         <img
//           src={imgData.data}
//           alt="Evidence"
//           style={{ width: "100%", height: "500px" }}
//         />
//       ) : (
//         imgData.message
//       )}
//     </Grid>
//   );
// }

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
    index,
    rowSerialNumber,
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
    // console.log("table component row data: ", index, row.id);

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
          {/* <Typography sx={{ fontSize: "19px" }}>{index + 1}</Typography> */}
          <Typography sx={{ fontSize: "19px" }}>{rowSerialNumber}</Typography>
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
                : row?.eventType === MOBILE_USE
                ? customChartColors.mobileUsageCount
                : row?.eventType === SMOKING
                ? customChartColors.smokingCount
                : row?.eventType === YAWNING && customChartColors.yawningCount,

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
                    // maxLength: 1000,
                    maxLength: 200,
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
                    // id="remark-autocomplete-table-component"
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
                      // console.log("autocomplete newValue: ", newValue);
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
              // console.log("autocomplete newValue: ", newValue);
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
  const [driverActionDetailsDialogOpen, setDriverActionDetailsDialogOpen] =
    React.useState(false);
  const [selectedEventRowData, setSelectedEventRowData] = React.useState(null);

  const handleClickOpen = React.useCallback((row) => {
    setSelectedEventRowData(row);
    setDriverActionDetailsDialogOpen(true);
  }, []);

  const handleCloseDriverActionDetailsDialog = React.useCallback(() => {
    setDriverActionDetailsDialogOpen(false);
    setSelectedEventRowData(null);
  }, []);

  return (
    <React.Fragment>
      <TableContainer
        component={Paper}
        sx={{ overflow: "auto", maxHeight: "700px" }}
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
                  rowSerialNumber={calculateSerialNumber(
                    index,
                    pageNo,
                    pageSize
                  )}
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
        // rowsPerPageOptions={[5, 10, 20, 50, 100]}
      />

      {/* dialog */}

      <DriverActionDetailsDialog
        driverActionDetailsDialogOpen={driverActionDetailsDialogOpen}
        selectedEventRowData={selectedEventRowData}
        handleCloseDriverActionDetailsDialog={
          handleCloseDriverActionDetailsDialog
        }
        getRemarkType={getRemarkType}
      />

      {/* <Dialog
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
                  <SingleImageEvidenceComponent
                    photoUrl={photoUrl}
                    key={photoUrl}
                  />
                ))}
              </Grid>
            </Box>
          )}
        </DialogContent>
      </Dialog> */}
    </React.Fragment>
  );
};

export default React.memo(TableComponent);
