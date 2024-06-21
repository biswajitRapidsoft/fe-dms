import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import TopViewNav from "../../components/TopViewNav";
import {
  useGetEventTypeQuery,
  useGetStatusTypeQuery,
} from "../../services/dashboard";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import { useParams } from "react-router";
import VEHICLE_MARKER from "../../img/VEHICLE_MARKER_LOGO.png";

import DRINKS_GOOGLE_MAP_LOGO from "../../img/DRINKS_GOOGLE_MAP_LOGO.svg";
import PHONE_IN_HAND_GOOGLE_MAP_LOGO from "../../img/PHONE_IN_HAND_GOOGLE_MAP_LOGO.svg";
import PERSON_YAWN_GOOGLE_MAP_LOGO from "../../img/PERSON_YAWN_GOOGLE_MAP_LOGO.svg";
import SMOKING_GOOGLE_MAP_LOGO from "../../img/SMOKING_GOOGLE_MAP_LOGO.svg";
import CLOSED_EYES_GOOGLE_MAP_LOGO from "../../img/CLOSED_EYES_GOOGLE_MAP_LOGO.svg";
import DISTRACTED_GOOGLE_MAP_LOGO from "../../img/DISTRACTED_GOOGLE_MAP_LOGO.svg";
import LOW_HEAD_GOOGLE_MAP_LOGO from "../../img/LOW_HEAD_GOOGLE_MAP_LOGO.svg";
import NO_FACE_GOOGLE_MAP_LOGO from "../../img/NO_FACE_GOOGLE_MAP_LOGO.svg";

import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  // InfoWindowF,
  Polyline,
} from "@react-google-maps/api";

import AVATAR_LOGO from "../../img/AVATAR.png";
import config from "../../config/config";

// import VEHICLE_MARKER_LOGO from "../../img/VEHICLE_MARKER_LOGO.png";
import { formatDateToIST, formatTimeToIST } from "../../helper/formatter";
import {
  useGetAllEventForEventDetailsQuery,
  useGetDriverByIdQuery,
  useGetGeoPositionsQuery,
} from "../../services/eventDetails";
// import tempPolylineData from "./tempPloyLineData.json";
// import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import LoadingComponent from "../../components/LoadingComponent";
// import axios from "axios";
import {
  ALL_EVENT_TYPE,
  CLOSE_EYES,
  DISTRACTION,
  DRINKING,
  LOW_HEAD,
  NO_FACE,
  MOBILE_USE,
  SMOKING_ALERT,
  YAWNING,
} from "../../helper/constants";

import { evidenceImageService } from "../../services/evidenceImageService";

const breadcrumbs = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Event Details", path: "/eventDetails" },
];

const CustomGradientBoxForPhoto = React.memo(function ({ photoUrl }) {
  const [imgData, setImgData] = React.useState({});

  const fetchImageData = React.useCallback(async () => {
    const response = await evidenceImageService.fetchEvidenceImageData(
      photoUrl
    );
    setImgData(response);
  }, [photoUrl]);

  React.useEffect(() => {
    fetchImageData();
  }, [fetchImageData]);

  return (
    <Paper elevation={4}>
      <Box
        // key={index}
        sx={{
          width: "280px",
          height: "180px",
          maxHeight: "180px",
          // backgroundImage: `linear-gradient(to right bottom, #ffffff, #dbdae0, #b9b6c3, #9793a5, #777289, #676077, #574f65, #483e54, #413748, #3a303d, #322933, #2a2329)`,
          flexShrink: 0,
          position: "relative",
        }}
      >
        {imgData.data ? (
          <img src={imgData.data} alt={"evidence"} width="100%" height="100%" />
        ) : (
          imgData.message
        )}

        {/* {loading ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.primary",
            }}
          >
            <Typography>Loading image...</Typography>
          </Box>
        ) : imageLoadError ? (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.primary",
            }}
          >
            <Typography>{errorMessage}</Typography>
          </Box>
        ) : (
          <img src={imageSrc} alt="evidence" width="100%" height="100%" />
        )} */}

        <Box
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
        </Box>
      </Box>
    </Paper>
  );
});

const CustomGradientBoxForVideo = React.memo(function ({ videoUrl }) {
  return (
    <Box
      // key={index}
      sx={{
        width: "280px",
        height: "180px",
        maxHeight: "180px",
        backgroundImage: `linear-gradient(to top, #30cfd0 0%, #330867 100%)`,
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
      <Box
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
      </Box>
    </Box>
  );
});

const DynamicMarkerF = React.memo(function ({
  coordinate,
  markerData,
  handleMarkerClick,
  handleInfoWindowClose,
  infoWindowsOpenState,
}) {
  const handleMarkerClickOnClick = React.useCallback(() => {
    // debugger;
    handleMarkerClick(markerData);
  }, [handleMarkerClick, markerData]);

  // console.log("markerData in marker: ", markerData);

  // const handleInfoWindowCloseOnClick = React.useCallback(() => {
  //   handleInfoWindowClose();
  // }, [handleInfoWindowClose]);
  return (
    <MarkerF
      position={{ lat: coordinate.lat, lng: coordinate.lng }}
      onClick={() => handleMarkerClickOnClick()}
      icon={{
        url:
          markerData?.eventType === DISTRACTION
            ? DISTRACTED_GOOGLE_MAP_LOGO
            : markerData?.eventType === CLOSE_EYES
            ? CLOSED_EYES_GOOGLE_MAP_LOGO
            : markerData?.eventType === DRINKING
            ? DRINKS_GOOGLE_MAP_LOGO
            : markerData?.eventType === MOBILE_USE
            ? PHONE_IN_HAND_GOOGLE_MAP_LOGO
            : markerData?.eventType === SMOKING_ALERT
            ? SMOKING_GOOGLE_MAP_LOGO
            : markerData?.eventType === YAWNING
            ? PERSON_YAWN_GOOGLE_MAP_LOGO
            : markerData?.eventType === LOW_HEAD
            ? LOW_HEAD_GOOGLE_MAP_LOGO
            : markerData?.eventType === NO_FACE
            ? NO_FACE_GOOGLE_MAP_LOGO
            : VEHICLE_MARKER,
        // scaledSize: Boolean(infoWindowsOpenState)
        //   ? new window.google.maps.Size(65, 65)
        //   : new window.google.maps.Size(55, 55),
        scaledSize: (() => {
          const size = new window.google.maps.Size(55, 55);
          if (Boolean(infoWindowsOpenState)) {
            size.width = 65;
            size.height = 65;
          }
          return size;
        })(),
      }}
    >
      {Boolean(infoWindowsOpenState) && (
        <Box sx={{ width: "100px", height: "100px", bgcolor: "white" }}>
          {/* hello */}
        </Box>
        // <InfoWindowF
        //   // onCloseClick={() => handleInfoWindowCloseOnClick()}
        //   position={{
        //     lat: coordinate.lat,
        //     lng: coordinate.lng,
        //   }}
        //   options={{
        //     disableAutoPan: true, // Example option to disable auto panning
        //     closeBoxURL: "", // Assuming this is the way to disable the close box, replace with correct option if available
        //   }}
        // >
        //   <div>hello index</div>
        // </InfoWindowF>
      )}
    </MarkerF>
  );
});

const INDIA_CENTER = { lat: 20.5937, lng: 78.9629 };

// const formatToUTC = (date) => {
//   return new Date(
//     date.getTime() - date.getTimezoneOffset() * 60000
//   ).toISOString();
// };

const formatToUTC = (date) => {
  let jsDate;
  if (dayjs.isDayjs(date)) {
    jsDate = date.toDate();
  } else if (date instanceof Date) {
    jsDate = date;
  } else {
    throw new Error("Invalid date object");
  }

  const utcDate = new Date(jsDate.getTime());

  return utcDate.toISOString();
};

const EventDetails = () => {
  // const { dlNumber } = useParams("dlNumber");
  const theme = useTheme();
  const eventData = React.useMemo(() => {
    const sessionedEventData = sessionStorage.getItem("eventData");
    return sessionedEventData ? JSON.parse(sessionedEventData) : null;
  }, []);
  const isAboveMdBreakpoint = useMediaQuery(theme.breakpoints.up("md"));
  const isBelowSmBreakpoint = useMediaQuery(theme.breakpoints.down("sm"));
  // const center = useMemo(() => {
  //   return {
  //     lat: eventData?.latitude ?? INDIA_CENTER.lat,
  //     lng: eventData?.longitude ?? INDIA_CENTER.lng,
  //   };
  // }, [eventData]);

  // const today = React.useMemo(() => new Date(), []);
  // const startOfDay = React.useMemo(
  //   () =>
  //     new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0),
  //   [today]
  // );
  // const endOfDay = React.useMemo(
  //   () =>
  //     new Date(
  //       today.getFullYear(),
  //       today.getMonth(),
  //       today.getDate(),
  //       23,
  //       59,
  //       59
  //     ),
  //   [today]
  // );

  const today = useMemo(() => dayjs(), []);
  const startOfDay = useMemo(() => today.startOf("day"), [today]);
  const endOfDay = useMemo(() => today.endOf("day"), [today]);

  // console.log("todaytoday : ", today);
  // console.log("fromfrom : ", startOfDay);
  // console.log("toto: ", endOfDay);

  // console.log("eventData: ", eventData);
  const initialEventFilterationFormData = React.useMemo(() => {
    let fromDate, toDate;

    // Calculate fromDate based on eventData
    if (eventData && eventData.eventServerCreateTime) {
      const eventDateUTC = dayjs(eventData.eventServerCreateTime);
      fromDate = eventDateUTC.startOf("day");
      toDate = eventDateUTC.endOf("day"); // Set toDate to the end of the day for that specific date
    } else {
      fromDate = startOfDay; // Use today's start of day if no eventData or eventServerCreateTime
      toDate = endOfDay; // Use today's end of day if no eventData or eventServerCreateTime
    }

    return {
      eventType: eventData?.eventType,
      vehicleNo: eventData?.vehicleNo,
      deviceId: eventData?.deviceId,
      driverId: eventData?.driverId,
      fromDate: fromDate,
      toDate: toDate,
    };
  }, [startOfDay, endOfDay, eventData]);

  // const [eventDetailsFilterationFormData, setEventDetailsFilterationFormData] =
  //   useState(initialEventFilterationFormData);

  const eventDetailsFilterationFormData = React.useMemo(
    () => initialEventFilterationFormData,
    [initialEventFilterationFormData]
  );

  // console.log(
  //   "eventDetailsFilterationFormData: ",
  //   eventDetailsFilterationFormData
  // );

  const initialEventCoordinates = useMemo(() => {
    if (eventData && eventData.latitude && eventData.longitude) {
      return [
        {
          lat: eventData.latitude,
          lng: eventData.longitude,
        },
      ];
    }
    return INDIA_CENTER;
  }, [eventData]);

  const [selectedEventType, setSelectedEventType] = useState(null);

  const [isShowAllEvidences, setIsShowAllEvidences] = useState(false);

  const [allEvidencesData, setAllEvidencesData] = useState([]);

  const [filteredEventData, setFilteredEventData] = useState([]);

  // console.log("filteredEventData :", filteredEventData);

  // console.log("allEvidencesData: ", allEvidencesData);

  const [driverData, setDriverData] = useState([]);
  // console.log("driverData: ", driverData);

  const [isDriverImgNotPresent, setIsDriverImgNotPresent] =
    React.useState(false);

  // console.log("isDriverImgNotPresent : ", isDriverImgNotPresent);

  // console.log(
  //   "selectedEventType: ",
  //   selectedEventType,
  //   Boolean(selectedEventType)
  // );

  const [markerCoordinates, setMarkerCoordinates] = useState(
    initialEventCoordinates
  );

  // console.log("markerCoordinates: ", markerCoordinates);

  // const {
  //   data: getAllData = {
  //     data: {
  //       data: [],
  //       eventTypeCountDto: {},
  //     },
  //   },
  //   isLoading: isGetAllDataLoading,
  //   isFetching: isGetAllDataFetching,
  //   isSuccess: isGetAllDataSuccess,
  // } = useGetAllEventForEventDetailsQuery(
  //   {
  //     eventType: selectedEventType,
  //     vehicleNo: eventDetailsFilterationFormData?.vehicleNo,
  //     fromDate: formatToUTC(eventDetailsFilterationFormData?.fromDate),
  //     toDate: formatToUTC(eventDetailsFilterationFormData?.toDate),
  //   },
  //   {
  //     skip: !Boolean(selectedEventType),
  //     refetchOnMountOrArgChange: true,
  //   }
  // );

  // const cacheBuster = new Date().getTime();

  const {
    data: getAllDataForAllEvidences = {
      data: {
        data: [],
      },
    },
    // isLoading: isGetAllDataForAllEvidencesLoading,
    isFetching: isGetAllDataForAllEvidencesFetching,
    isSuccess: isGetAllDataForAllEvidencesSuccess,
  } = useGetAllEventForEventDetailsQuery(
    {
      eventType: ALL_EVENT_TYPE,
      vehicleNo: eventDetailsFilterationFormData?.vehicleNo,
      fromDate: formatToUTC(eventDetailsFilterationFormData?.fromDate),
      toDate: formatToUTC(eventDetailsFilterationFormData?.toDate),
      // cacheBuster: cacheBuster
    },
    {
      skip: !Boolean(isShowAllEvidences),
      // refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: getDriverByIdData = {
      data: null,
    },
    isLoading: isGetDriverByIdLoading,
    isSuccess: isGetDriverByIdSuccess,
  } = useGetDriverByIdQuery({
    driverId: eventDetailsFilterationFormData?.driverId,
  });

  // console.log("getDriverByIdData: ", getDriverByIdData);

  const {
    data: getGeoPositionsData,
    isLoading: isGetGeoPositionDataLoading,
    isFetching: isGetGeoPositionDataFetching,
  } = useGetGeoPositionsQuery({
    deviceId: eventDetailsFilterationFormData?.deviceId,
    from: formatToUTC(eventDetailsFilterationFormData?.fromDate),
    to: formatToUTC(eventDetailsFilterationFormData?.toDate),
  });

  // console.log("getGeoPositionsData: ", getGeoPositionsData);

  const {
    data: getStatusType = {
      data: [],
    },
    isLoading: isGetStatusTypeLoading,
  } = useGetStatusTypeQuery();

  // console.log("getStatusType: ", getStatusType?.data);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.apiKey,
  });
  const {
    data: getEventTypeData = {
      data: null,
    },
    // isLoading: isGetEventTypeLoading,
  } = useGetEventTypeQuery();

  // console.log("getEventTypeData: ", getEventTypeData);

  // const eventCoordinates = useMemo(() => {
  //   if (Boolean(getAllData?.data?.data?.length > 0)) {
  //     return getAllData?.data?.data.map((item) => ({
  //       lat: item.latitude,
  //       lng: item.longitude,
  //     }));
  //   } else {
  //     return [];
  //   }
  // }, [getAllData?.data?.data]);

  // console.log("eventCoordinates: ", eventCoordinates);

  const eventCoordinatesForAllEvidences = useMemo(() => {
    if (Boolean(allEvidencesData?.length > 0)) {
      return allEvidencesData?.map((item) => ({
        lat: item.latitude,
        lng: item.longitude,
      }));
    } else {
      return [];
    }
  }, [allEvidencesData]);

  const filteredEventCoordinatesForAllEvidences = useMemo(() => {
    if (Boolean(isShowAllEvidences) && Boolean(selectedEventType)) {
      if (Boolean(filteredEventData?.length > 0)) {
        return filteredEventData?.map((item) => ({
          lat: item.latitude,
          lng: item.longitude,
        }));
      } else {
        return [];
      }
    }
  }, [isShowAllEvidences, selectedEventType, filteredEventData]);

  const [selectedEventMarker, setSelectedEventMarker] = useState(null);

  // console.log("selectedEventMarker: ", selectedEventMarker);

  // const polylilePathMap = React.useMemo(() => {
  //   if (!Boolean(tempPolylineData) || Boolean(tempPolylineData.length === 0)) {
  //     return [];
  //   }

  //   return tempPolylineData.map((data) => ({
  //     lat: data.latitude,
  //     lng: data.longitude,
  //   }));
  // }, []);

  const polylilePathMap = React.useMemo(() => {
    if (
      !Boolean(getGeoPositionsData) ||
      Boolean(getGeoPositionsData.length === 0)
    ) {
      return [];
    }

    return getGeoPositionsData.map((data) => ({
      lat: data.latitude,
      lng: data.longitude,
    }));
  }, [getGeoPositionsData]);

  // console.log("polylilePathMap: ", polylilePathMap);

  const matchedRemarkType = React.useMemo(
    () =>
      getStatusType?.data?.find(
        (item) => item?.id === selectedEventMarker?.remarkId
      ) || null,
    [getStatusType?.data, selectedEventMarker?.remarkId]
  );

  const handleTableFilterChange = React.useCallback(
    (value) => {
      setSelectedEventType(value);

      // console.log("event details filtered value: ", value);

      if (Boolean(allEvidencesData?.length > 0)) {
        const filteredData = allEvidencesData?.filter(
          (item) => item?.eventType === value
        );
        setFilteredEventData(filteredData);
      }
    },
    [allEvidencesData]
  );

  // const handleChangeEventDetailsFilterationDate = React.useCallback(
  //   (dateKey, dateValue) => {
  //     setEventDetailsFilterationFormData((prevData) => ({
  //       ...prevData,
  //       [dateKey]: dateValue,
  //     }));
  //   },
  //   []
  // );

  const handleChangeIsShowAllEvidencesOnCheckUnCheck = React.useCallback(() => {
    setIsShowAllEvidences((prev) => !prev);
    setSelectedEventType(null);
  }, []);

  const handleMarkerClick = React.useCallback((markerData) => {
    // debugger;
    setSelectedEventMarker(markerData);
    // const newInfoWindowsOpenState = [...infoWindowsOpenState];
    // newInfoWindowsOpenState[markerIndex] =
    //   !newInfoWindowsOpenState[markerIndex];
    // setInfoWindowsOpenState(newInfoWindowsOpenState);
  }, []);
  const handleInfoWindowClose = React.useCallback(() => {
    setSelectedEventMarker(null);
    // const newInfoWindowsOpenState = [...infoWindowsOpenState];
    // newInfoWindowsOpenState[markerIndex] = false;
    // setInfoWindowsOpenState(newInfoWindowsOpenState);
  }, []);

  // const onLoad = React.useCallback(
  //   (map) => {
  //     mapRef.current = map;

  //     if (Boolean(markerCoordinates.length > 0)) {
  //       const bounds = new window.google.maps.LatLngBounds();
  //       markerCoordinates.forEach((coord) => {
  //         bounds.extend(coord);
  //       });

  //       map.fitBounds(bounds);
  //     }
  //   },
  //   [markerCoordinates]
  // );

  // const onLoad = React.useCallback(
  //   (map) => {
  //     mapRef.current = map;

  //     if (Boolean(polylilePathMap.length > 0)) {
  //       const bounds = new window.google.maps.LatLngBounds();
  //       polylilePathMap.forEach((coord) => {
  //         bounds.extend(coord);
  //       });

  //       map.fitBounds(bounds);
  //     }
  //   },
  //   [polylilePathMap]
  // );

  const [dynamicMap, setDynamicMap] = useState(null);

  const onLoad = (map) => {
    setDynamicMap(map);
  };

  useEffect(() => {
    // console.log("Selected event type changed:", selectedEventType);
    if (!dynamicMap || !polylilePathMap || polylilePathMap.length === 0) {
      return; // Exit early if any required variable is null or empty
    }
    if (dynamicMap && polylilePathMap?.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      polylilePathMap.forEach((coord) => {
        bounds.extend(coord);
      });

      // dynamicMap.panToBounds(bounds);
      dynamicMap.fitBounds(bounds);
    }
  }, [dynamicMap, polylilePathMap, selectedEventType]);

  React.useEffect(() => {
    if (!Boolean(selectedEventType) && !Boolean(isShowAllEvidences)) {
      setSelectedEventMarker(eventData);
    } else if (Boolean(selectedEventType) && Boolean(isShowAllEvidences)) {
      setSelectedEventMarker(filteredEventData[0] || null);
    } else if (!Boolean(selectedEventType) && Boolean(isShowAllEvidences)) {
      // setSelectedEventMarker(allEvidencesData[0] || null);
      setSelectedEventMarker(eventData);
    }

    // else if (
    //   Boolean(selectedEventType) &&
    //   getAllData?.data?.data?.length > 0
    // ) {
    //   setSelectedEventMarker(getAllData?.data?.data[0]);
    //   // setSelectedEventMarker(null);
    // } else {
    //   setSelectedEventMarker(null);
    // }
  }, [
    eventData,
    selectedEventType,
    allEvidencesData,
    filteredEventData,
    isShowAllEvidences,
  ]);

  React.useEffect(() => {
    if (Boolean(isGetAllDataForAllEvidencesSuccess)) {
      setAllEvidencesData(getAllDataForAllEvidences?.data?.data || []);
    }
  }, [
    isGetAllDataForAllEvidencesSuccess,
    getAllDataForAllEvidences?.data?.data,
  ]);

  // React.useEffect(() => {
  //   if (Boolean(isGetAllDataSuccess)) {
  //     setFilteredEventData(getAllData?.data?.data || []);
  //   }
  // }, [getAllData?.data?.data, isGetAllDataSuccess]);

  useEffect(() => {
    if (Boolean(isShowAllEvidences) && !Boolean(selectedEventType)) {
      setMarkerCoordinates(eventCoordinatesForAllEvidences);
    }
    if (Boolean(isShowAllEvidences) && Boolean(selectedEventType)) {
      setMarkerCoordinates(filteredEventCoordinatesForAllEvidences);
    }

    if (!Boolean(isShowAllEvidences)) {
      setMarkerCoordinates(initialEventCoordinates);
    }
  }, [
    selectedEventType,
    // eventCoordinates,
    eventCoordinatesForAllEvidences,
    filteredEventCoordinatesForAllEvidences,
    isShowAllEvidences,
    initialEventCoordinates,
  ]);

  React.useEffect(() => {
    if (Boolean(isGetDriverByIdSuccess)) {
      setDriverData(getDriverByIdData?.data || []);
    }
  }, [isGetDriverByIdSuccess, getDriverByIdData?.data]);

  return (
    <React.Fragment>
      <Box sx={{ width: "calc(100vw - 110px)" }}>
        <Box
          sx={{
            width: "100%",
            // mt: 2,
            paddingTop: "15px",
            paddingBottom: "10px",
          }}
        >
          <Grid container rowSpacing={2}>
            <Grid item xs={12} sm={7} md={8} lg={9.5} xl={10}>
              <TopViewNav breadcrumbs={breadcrumbs} />
            </Grid>
            <Grid item xs={12} sm={5} md={4} lg={2.5} xl={2}>
              <Autocomplete
                disablePortal
                disabled={!Boolean(isShowAllEvidences)}
                size="small"
                options={getEventTypeData?.data || []}
                getOptionLabel={(option) => option.replace(/_/g, " ")}
                popupIcon={
                  <KeyboardArrowDownIcon sx={{ color: "customBlue.dark" }} />
                }
                onChange={(e, newVal) => handleTableFilterChange(newVal)}
                sx={{
                  "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover": {
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
                }}
                PaperComponent={(props) => (
                  <Paper
                    sx={{
                      background: "primary.customContrast",
                      color: "customGrey.700",
                      borderRadius: "10px",
                      // width: "200px",
                      maxHeight: "350px",
                      overflowY: "auto",
                    }}
                    {...props}
                  />
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select Event Type"
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "customBlue.dark", // Change the label color here
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "customBlue.dark", // Change the label color when focused
                      },
                    }}
                  />
                )}
              />
            </Grid>
          </Grid>

          {/* <Box sx={{ width: "20em", minWidth: "10em" }}>

        </Box> */}
        </Box>

        <Box sx={{ marginTop: 1 }}>
          <Grid container spacing={0.5}>
            {/* DRIVER DETAILS */}
            <Grid item xs={12} sm={12} md={4} lg={2.5}>
              <Paper elevation={2} sx={{ height: "100%", p: 1.5 }}>
                <Grid
                  container
                  sx={{
                    marginLeft: "10px",
                    ".MuiTypography-root": {
                      my: 1.5,
                    },
                  }}
                >
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={12}
                    lg={12}
                    // sx={{ bgcolor: "purple" }}
                  >
                    <Grid container textAlign="left">
                      <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                        <Typography
                          sx={{
                            // whiteSpace: "nowrap",
                            wordBreak: "break-word",
                            fontSize: "16.5px",
                            fontWeight: "550",
                          }}
                        >
                          VEHICLE NO
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                        <Typography
                          sx={{ fontSize: "16.5px", fontWeight: "550" }}
                        >
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                        <Typography
                          sx={{ fontSize: "16.5px", wordBreak: "break-word" }}
                        >
                          {eventData?.vehicleNo || "NA"}
                        </Typography>
                      </Grid>

                      <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                        <Typography
                          sx={{
                            // whiteSpace: "nowrap",
                            wordBreak: "break-word",
                            fontSize: "16.5px",
                            fontWeight: "550",
                          }}
                        >
                          CHASSIS NO
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                        <Typography
                          sx={{ fontSize: "16.5px", fontWeight: "550" }}
                        >
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                        <Typography
                          sx={{ fontSize: "16.5px", wordBreak: "break-word" }}
                        >
                          {eventData?.chassisNumber || "NA"}
                        </Typography>
                      </Grid>

                      <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                        <Typography
                          sx={{
                            // whiteSpace: "nowrap",
                            wordBreak: "break-word",
                            fontSize: "16.5px",
                            fontWeight: "550",
                          }}
                        >
                          IMEI NO
                        </Typography>
                      </Grid>
                      <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                        <Typography
                          sx={{ fontSize: "16.5px", fontWeight: "550" }}
                        >
                          :
                        </Typography>
                      </Grid>
                      <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                        <Typography
                          sx={{ fontSize: "16.5px", wordBreak: "break-word" }}
                        >
                          {eventData?.imeiNo || "NA"}
                        </Typography>
                      </Grid>

                      {!Boolean(isAboveMdBreakpoint || isBelowSmBreakpoint) && (
                        <>
                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                // whiteSpace: "nowrap",
                                wordBreak: "break-word",
                                fontSize: "16.5px",
                                fontWeight: "550",
                              }}
                            >
                              DRIVER NAME
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={0.5}
                            sm={0.5}
                            md={0.5}
                            lg={0.5}
                            xl={0.5}
                          >
                            <Typography
                              sx={{ fontSize: "16.5px", fontWeight: "550" }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4.5}
                            sm={4.5}
                            md={4.5}
                            lg={4.5}
                            xl={4.5}
                          >
                            <Typography
                              sx={{
                                fontSize: "16.5px",
                                wordBreak: "break-word",
                              }}
                            >
                              {driverData?.name || "NA"}
                            </Typography>
                          </Grid>

                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                // whiteSpace: "nowrap",
                                wordBreak: "break-word",
                                fontSize: "16.5px",
                                fontWeight: "550",
                              }}
                            >
                              PHONE NO
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={0.5}
                            sm={0.5}
                            md={0.5}
                            lg={0.5}
                            xl={0.5}
                          >
                            <Typography
                              sx={{ fontSize: "16.5px", fontWeight: "550" }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4.5}
                            sm={4.5}
                            md={4.5}
                            lg={4.5}
                            xl={4.5}
                          >
                            <Typography
                              sx={{
                                fontSize: "16.5px",
                                wordBreak: "break-word",
                              }}
                            >
                              {driverData?.phoneNumber || "NA"}
                            </Typography>
                          </Grid>

                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                // whiteSpace: "nowrap",
                                wordBreak: "break-word",
                                fontSize: "16.5px",
                                fontWeight: "550",
                              }}
                            >
                              DRIVER LICENSE
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={0.5}
                            sm={0.5}
                            md={0.5}
                            lg={0.5}
                            xl={0.5}
                          >
                            <Typography
                              sx={{ fontSize: "16.5px", fontWeight: "550" }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4.5}
                            sm={4.5}
                            md={4.5}
                            lg={4.5}
                            xl={4.5}
                          >
                            <Typography
                              sx={{
                                fontSize: "16.5px",
                                wordBreak: "break-word",
                              }}
                            >
                              {driverData?.dlNumber || "NA"}
                            </Typography>
                          </Grid>

                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                // whiteSpace: "nowrap",
                                wordBreak: "break-word",
                                fontSize: "16.5px",
                                fontWeight: "550",
                              }}
                            >
                              {/* DATE OF JOINING */}
                              JOINING DATE
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={0.5}
                            sm={0.5}
                            md={0.5}
                            lg={0.5}
                            xl={0.5}
                          >
                            <Typography
                              sx={{ fontSize: "16.5px", fontWeight: "550" }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4.5}
                            sm={4.5}
                            md={4.5}
                            lg={4.5}
                            xl={4.5}
                          >
                            <Typography
                              sx={{
                                fontSize: "16.5px",
                                wordBreak: "break-word",
                              }}
                            >
                              {driverData?.joinDate || "NA"}
                            </Typography>
                          </Grid>

                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                // whiteSpace: "nowrap",
                                wordBreak: "break-word",
                                fontSize: "16.5px",
                                fontWeight: "550",
                              }}
                            >
                              TOTAL EVENTS
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={0.5}
                            sm={0.5}
                            md={0.5}
                            lg={0.5}
                            xl={0.5}
                          >
                            <Typography
                              sx={{ fontSize: "16.5px", fontWeight: "550" }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4.5}
                            sm={4.5}
                            md={4.5}
                            lg={4.5}
                            xl={4.5}
                          >
                            <Typography
                              sx={{
                                fontSize: "16.5px",
                                wordBreak: "break-word",
                              }}
                            >
                              {driverData?.totalEvent || 0}
                            </Typography>
                          </Grid>

                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                // whiteSpace: "nowrap",
                                wordBreak: "break-word",
                                fontSize: "16.5px",
                                fontWeight: "550",
                              }}
                            >
                              DRIVER RATING
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={0.5}
                            sm={0.5}
                            md={0.5}
                            lg={0.5}
                            xl={0.5}
                          >
                            <Typography
                              sx={{ fontSize: "16.5px", fontWeight: "550" }}
                            >
                              :
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4.5}
                            sm={4.5}
                            md={4.5}
                            lg={4.5}
                            xl={4.5}
                          >
                            <Typography
                              sx={{
                                fontSize: "16.5px",
                                wordBreak: "break-word",
                                color: Boolean(
                                  driverData?.categoryDto?.colorCode
                                )
                                  ? `#${driverData?.categoryDto?.colorCode}`
                                  : "customGrey.600",
                                fontWeight: "500",
                              }}
                            >
                              {driverData?.categoryDto?.name || "NA"}
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      // justifyContent: "center",
                      // bgcolor: "blue",
                    }}
                  >
                    {Boolean(driverData?.imageUrl) ? (
                      <>
                        {!Boolean(isDriverImgNotPresent) ? (
                          <img
                            src={driverData?.imageUrl}
                            onError={() => setIsDriverImgNotPresent(true)}
                            alt="DRIVER_IMG"
                            width="95%"
                          />
                        ) : (
                          <img
                            src={AVATAR_LOGO}
                            alt="AVATAR_LOGO"
                            width="70%"
                          />
                        )}
                      </>
                    ) : (
                      <img src={AVATAR_LOGO} alt="AVATAR_LOGO" width="70%" />
                    )}
                  </Grid>

                  {Boolean(isAboveMdBreakpoint || isBelowSmBreakpoint) && (
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={12}
                      lg={12}
                      // sx={{ bgcolor: "tomato" }}
                    >
                      <Grid container textAlign="left">
                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              // whiteSpace: "nowrap",
                              wordBreak: "break-word",
                              fontSize: "16.5px",
                              fontWeight: "550",
                            }}
                          >
                            DRIVER NAME
                          </Typography>
                        </Grid>
                        <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", fontWeight: "550" }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", wordBreak: "break-word" }}
                          >
                            {driverData?.name || "NA"}
                          </Typography>
                        </Grid>

                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              // whiteSpace: "nowrap",
                              wordBreak: "break-word",
                              fontSize: "16.5px",
                              fontWeight: "550",
                            }}
                          >
                            PHONE NO
                          </Typography>
                        </Grid>
                        <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", fontWeight: "550" }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", wordBreak: "break-word" }}
                          >
                            {driverData?.phoneNumber || "NA"}
                          </Typography>
                        </Grid>

                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              // whiteSpace: "nowrap",
                              wordBreak: "break-word",
                              fontSize: "16.5px",
                              fontWeight: "550",
                            }}
                          >
                            DRIVER LICENSE
                          </Typography>
                        </Grid>
                        <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", fontWeight: "550" }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", wordBreak: "break-word" }}
                          >
                            {driverData?.dlNumber || "NA"}
                          </Typography>
                        </Grid>

                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              // whiteSpace: "nowrap",
                              wordBreak: "break-word",
                              fontSize: "16.5px",
                              fontWeight: "550",
                            }}
                          >
                            {/* DATE OF JOINING */}
                            JOINING DATE
                          </Typography>
                        </Grid>
                        <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", fontWeight: "550" }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", wordBreak: "break-word" }}
                          >
                            {driverData?.joinDate || "NA"}
                          </Typography>
                        </Grid>

                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              // whiteSpace: "nowrap",
                              wordBreak: "break-word",
                              fontSize: "16.5px",
                              fontWeight: "550",
                            }}
                          >
                            TOTAL EVENTS
                          </Typography>
                        </Grid>
                        <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", fontWeight: "550" }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", wordBreak: "break-word" }}
                          >
                            {driverData?.totalEvent || 0}
                          </Typography>
                        </Grid>

                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              // whiteSpace: "nowrap",
                              wordBreak: "break-word",
                              fontSize: "16.5px",
                              fontWeight: "550",
                            }}
                          >
                            DRIVER RATING
                          </Typography>
                        </Grid>
                        <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                          <Typography
                            sx={{ fontSize: "16.5px", fontWeight: "550" }}
                          >
                            :
                          </Typography>
                        </Grid>
                        <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5}>
                          <Typography
                            sx={{
                              fontSize: "16.5px",
                              wordBreak: "break-word",
                              color: Boolean(driverData?.categoryDto?.colorCode)
                                ? `#${driverData?.categoryDto?.colorCode}`
                                : "customGrey.600",
                              fontWeight: "500",
                            }}
                          >
                            {driverData?.categoryDto?.name || "NA"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>

            {/* GEO LOCATION AND EVIDENCE DETAILS */}
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={9.5}
              sx={{ minheight: { md: "100%" } }}
            >
              {/* GEO LOCATION CONTAINER */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  height: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    height: { xs: "85vh", md: "70vh", lg: "56vh" },
                    flexGrow: 1,
                  }}
                >
                  {Boolean(isLoaded) ? (
                    <GoogleMap
                      onLoad={onLoad}
                      // center={{
                      //   lat: selectedEventMarker?.latitude ?? INDIA_CENTER.lat,
                      //   lng: selectedEventMarker?.longitude ?? INDIA_CENTER.lng,
                      // }}

                      center={{
                        lat: selectedEventMarker?.latitude ?? null,
                        lng: selectedEventMarker?.longitude ?? null,
                      }}
                      // center={{
                      //   lat: null,
                      //   lng: null,
                      // }}
                      zoom={15}
                      mapContainerStyle={{
                        width: "100%",
                        // height: "56vh",
                        height: "100%",
                      }}
                      options={{ gestureHandling: "greedy" }}
                    >
                      <Polyline
                        path={polylilePathMap}
                        options={{
                          strokeColor: "#114369c7",
                          strokeOpacity: 1.0,
                          strokeWeight: 6,
                        }}
                      />
                      {/* {Boolean(markerCoordinates?.length > 0) &&
                      markerCoordinates?.map((coordinate, index) => (
                        <DynamicMarkerF
                          key={index}
                          coordinate={coordinate}
                          isShowAllEvidences={isShowAllEvidences}
                          markerData={
                            Boolean(allEvidencesData?.length > 0)
                              ? allEvidencesData[index]
                              : Boolean(filteredEventData?.length > 0)
                              ? filteredEventData[index]
                              : Boolean(eventData)
                              ? eventData
                              : null
                          }
                          handleMarkerClick={handleMarkerClick}
                          handleInfoWindowClose={handleInfoWindowClose}
                          infoWindowsOpenState={
                            Boolean(
                              Boolean(selectedEventMarker?.id) &&
                                allEvidencesData[index]?.id ===
                                  selectedEventMarker?.id
                            )
                              ? true
                              : Boolean(
                                  Boolean(selectedEventMarker?.id) &&
                                    filteredEventData[index]?.id ===
                                      selectedEventMarker?.id
                                )
                              ? true
                              : Boolean(eventData) &&
                                eventData?.id === selectedEventMarker?.id
                              ? true
                              : false
                          }
                        />
                      ))} */}

                      {Boolean(isShowAllEvidences) &&
                        !Boolean(selectedEventType) && (
                          <>
                            {Boolean(markerCoordinates?.length > 0) &&
                              markerCoordinates?.map((coordinate, index) => (
                                <DynamicMarkerF
                                  key={index}
                                  coordinate={coordinate}
                                  isShowAllEvidences={isShowAllEvidences}
                                  markerData={
                                    Boolean(allEvidencesData?.length > 0)
                                      ? allEvidencesData[index]
                                      : null
                                  }
                                  handleMarkerClick={handleMarkerClick}
                                  handleInfoWindowClose={handleInfoWindowClose}
                                  infoWindowsOpenState={
                                    Boolean(
                                      Boolean(selectedEventMarker?.id) &&
                                        allEvidencesData[index]?.id ===
                                          selectedEventMarker?.id
                                    )
                                      ? true
                                      : false
                                  }
                                />
                              ))}
                          </>
                        )}

                      {Boolean(isShowAllEvidences) &&
                        Boolean(selectedEventType) && (
                          <>
                            {Boolean(markerCoordinates?.length > 0) &&
                              markerCoordinates?.map((coordinate, index) => (
                                <DynamicMarkerF
                                  key={index}
                                  coordinate={coordinate}
                                  isShowAllEvidences={isShowAllEvidences}
                                  markerData={
                                    Boolean(filteredEventData?.length > 0)
                                      ? filteredEventData[index]
                                      : null
                                  }
                                  handleMarkerClick={handleMarkerClick}
                                  handleInfoWindowClose={handleInfoWindowClose}
                                  infoWindowsOpenState={
                                    Boolean(
                                      Boolean(selectedEventMarker?.id) &&
                                        filteredEventData[index]?.id ===
                                          selectedEventMarker?.id
                                    )
                                      ? true
                                      : false
                                  }
                                />
                              ))}
                          </>
                        )}

                      {!Boolean(isShowAllEvidences) &&
                        !Boolean(selectedEventType) && (
                          <>
                            {Boolean(markerCoordinates?.length > 0) &&
                              markerCoordinates?.map((coordinate, index) => (
                                <DynamicMarkerF
                                  key={index}
                                  coordinate={coordinate}
                                  isShowAllEvidences={isShowAllEvidences}
                                  markerData={eventData || null}
                                  handleMarkerClick={handleMarkerClick}
                                  handleInfoWindowClose={handleInfoWindowClose}
                                  infoWindowsOpenState={
                                    Boolean(eventData) &&
                                    eventData?.id === selectedEventMarker?.id
                                      ? true
                                      : false
                                  }
                                />
                              ))}
                          </>
                        )}

                      {/* {Boolean(markerCoordinates?.length > 0) &&
                      markerCoordinates?.map((coordinate, index) => (
                        <DynamicMarkerF
                          key={index}
                          coordinate={coordinate}
                          isShowAllEvidences={isShowAllEvidences}
                          markerData={
                            Boolean(allEvidencesData?.length > 0)
                              ? allEvidencesData[index]
                              : Boolean(filteredEventData?.length > 0)
                              ? filteredEventData[index]
                              : Boolean(eventData)
                              ? eventData
                              : null
                          }
                          handleMarkerClick={handleMarkerClick}
                          handleInfoWindowClose={handleInfoWindowClose}
                          infoWindowsOpenState={
                            Boolean(
                              Boolean(selectedEventMarker?.id) &&
                                allEvidencesData[index]?.id ===
                                  selectedEventMarker?.id
                            )
                              ? true
                              : Boolean(
                                  Boolean(selectedEventMarker?.id) &&
                                    filteredEventData[index]?.id ===
                                      selectedEventMarker?.id
                                )
                              ? true
                              : Boolean(eventData) &&
                                eventData?.id === selectedEventMarker?.id
                              ? true
                              : false
                          }
                        />
                      ))} */}
                    </GoogleMap>
                  ) : (
                    <Box
                      sx={{
                        display: "flex",
                        width: "100%",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography>Map is Loading</Typography>
                    </Box>
                  )}
                </Box>

                {/* EVIDENCE EVENT DETAILS CONTAINER */}
                <Box sx={{ width: "100%" }}>
                  {/* EVIDENCE CONTAINER */}

                  <Grid container columnSpacing={1} rowSpacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={8} xl={8}>
                      <Paper
                        elevation={3}
                        sx={{ width: "100%", height: "100%", padding: 2 }}
                      >
                        {/* HEADER SECTION */}
                        <Box
                          sx={{
                            width: "100%",
                            textAlign: "left",
                            borderBottom: "1px solid secondary.customContrast",
                          }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              textAlign: "left",
                              fontWeight: "550",
                              // color: "customBlue.dark",
                              color: "#fff",
                              backgroundColor: (theme) =>
                                theme.palette.primary.main,
                              mb: 1,
                              px: 1,
                            }}
                          >
                            EVIDENCES
                          </Typography>
                        </Box>

                        {/* EVIDENCE SECTION */}
                        <Box
                          sx={{
                            width: "100%",
                            overflowX: "auto",
                            overflowY: "hidden",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            gap: "3px",
                            height: "200px",
                          }}
                        >
                          {/* {gradientBoxes} */}

                          {/* {Boolean(isShowAllEvidences) ? (
                    <>
                      {Boolean(allVideoEvidencesData?.length > 0) &&
                        allVideoEvidencesData?.map((videoItem, index) => (
                          <CustomGradientBoxForVideo
                            key={`video-${index}`}
                            videoUrl={videoItem}
                          />
                        ))}
                      {Boolean(allPhotoEvidencesData?.length > 0) &&
                        allPhotoEvidencesData?.map((photoItem, index) => (
                          <CustomGradientBoxForPhoto
                            key={`photo-${index}`}
                            photoUrl={photoItem}
                          />
                        ))}
                    </>
                  ) : (
                    <>
                 
                    </>
                  )} */}

                          {Boolean(selectedEventMarker) && (
                            <>
                              {Boolean(
                                selectedEventMarker?.evidenceVideos?.length > 0
                              ) &&
                                selectedEventMarker?.evidenceVideos?.map(
                                  (videoItem, index) => (
                                    <CustomGradientBoxForVideo
                                      key={`video-${index}`}
                                      videoUrl={videoItem}
                                    />
                                  )
                                )}
                              {Boolean(
                                selectedEventMarker?.evidencePhotos?.length > 0
                              ) &&
                                selectedEventMarker?.evidencePhotos?.map(
                                  (photoItem, index) => (
                                    <CustomGradientBoxForPhoto
                                      key={`photo-${index}`}
                                      photoUrl={photoItem}
                                    />
                                  )
                                )}

                              {Boolean(
                                selectedEventMarker?.evidenceVideos?.length ===
                                  0
                              ) &&
                                Boolean(
                                  selectedEventMarker?.evidencePhotos
                                    ?.length === 0
                                ) && (
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexGrow: 1,
                                      justifyContent: "center",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography>
                                      No Evidence Available
                                    </Typography>
                                  </Box>
                                )}
                            </>
                          )}
                        </Box>

                        {/* EVIDENCE ADDITIONAL ACTION SECTION */}

                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "cener",
                            justifyContent: "flex-end",
                          }}
                        >
                          <FormControlLabel
                            control={
                              <Checkbox
                                value={isShowAllEvidences}
                                onChange={() =>
                                  handleChangeIsShowAllEvidencesOnCheckUnCheck()
                                }
                              />
                            }
                            label="Show all events"
                            //             sx={{"& .MuiTypography-root": {
                            //     color: "blue", // Change the text color
                            //     fontSize: "16px", // Change the font size
                            //   },
                            // }}
                          />
                        </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                      <Paper
                        elevation={3}
                        sx={{
                          width: "100%",
                          height: {
                            xs: "350px",
                            sm: "350px",
                            md: "350px",
                            lg: "100%",
                            xl: "100%",
                          },
                          padding: 2,
                        }}
                      >
                        <Grid container rowGap={1} sx={{ height: "100%" }}>
                          <Grid item xs={12} sm={12} md={!2} lg={12} xl={12}>
                            <Grid container textAlign="left">
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    textAlign: "left",
                                    fontWeight: "550",
                                    color: "#fff",
                                    backgroundColor: (theme) =>
                                      theme.palette.primary.main,
                                    px: 1,
                                  }}
                                >
                                  DETAILS
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={4.5}
                                sm={2.5}
                                md={2.5}
                                lg={4.5}
                                xl={4.5}
                              >
                                <Typography
                                  sx={{
                                    // whiteSpace: "nowrap",
                                    wordBreak: "break-word",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  EVENT TYPE
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={0.5}
                                sm={0.5}
                                md={0.5}
                                lg={0.5}
                                xl={0.5}
                              >
                                {" "}
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item xs={7} sm={9} md={9} lg={7} xl={7}>
                                <Typography
                                  sx={{
                                    fontSize: "15.5px",
                                  }}
                                >
                                  {Boolean(selectedEventMarker)
                                    ? selectedEventMarker?.eventType?.replace(
                                        /_/g,
                                        " "
                                      )
                                    : "NA"}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={4.5}
                                sm={2.5}
                                md={2.5}
                                lg={4.5}
                                xl={4.5}
                              >
                                <Typography
                                  sx={{
                                    // whiteSpace: "nowrap",
                                    wordBreak: "break-word",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  DATE & TIME
                                </Typography>{" "}
                              </Grid>
                              <Grid
                                item
                                xs={0.5}
                                sm={0.5}
                                md={0.5}
                                lg={0.5}
                                xl={0.5}
                              >
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  :
                                </Typography>{" "}
                              </Grid>
                              <Grid item xs={7} sm={9} md={9} lg={7} xl={7}>
                                <Typography
                                  sx={{
                                    fontSize: "15.5px",
                                  }}
                                >
                                  <Typography
                                    component="span"
                                    sx={{
                                      fontSize: "15.5px",
                                    }}
                                  >
                                    {Boolean(selectedEventMarker)
                                      ? formatDateToIST(
                                          selectedEventMarker?.eventServerCreateTime
                                        )
                                      : "NA"}
                                  </Typography>{" "}
                                  <Typography
                                    component="span"
                                    sx={{
                                      fontSize: "15.5px",
                                    }}
                                  >
                                    {Boolean(selectedEventMarker) &&
                                      formatTimeToIST(
                                        selectedEventMarker?.eventServerCreateTime
                                      )}
                                  </Typography>
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={12} md={!2} lg={12} xl={12}>
                            <Grid container textAlign="left">
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    textAlign: "left",
                                    fontWeight: "550",
                                    color: "#fff",
                                    backgroundColor: (theme) =>
                                      theme.palette.primary.main,
                                    px: 1,
                                  }}
                                >
                                  REMARKS
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={4.5}
                                sm={2.5}
                                md={2.5}
                                lg={4.5}
                                xl={4.5}
                              >
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  STATUS
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={0.5}
                                sm={0.5}
                                md={0.5}
                                lg={0.5}
                                xl={0.5}
                              >
                                {" "}
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item xs={7} sm={9} md={9} lg={7} xl={7}>
                                <Typography
                                  sx={{
                                    fontSize: "15.5px",
                                  }}
                                >
                                  {Boolean(matchedRemarkType)
                                    ? matchedRemarkType?.status
                                    : "NA"}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={4.5}
                                sm={2.5}
                                md={2.5}
                                lg={4.5}
                                xl={4.5}
                              >
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  DETAILS
                                </Typography>{" "}
                              </Grid>
                              <Grid
                                item
                                xs={0.5}
                                sm={0.5}
                                md={0.5}
                                lg={0.5}
                                xl={0.5}
                              >
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  :
                                </Typography>{" "}
                              </Grid>
                              <Grid item xs={7} sm={9} md={9} lg={7} xl={7}>
                                <Typography
                                  sx={{
                                    fontSize: "15.5px",
                                  }}
                                >
                                  {selectedEventMarker?.remark}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>

                          <Grid item xs={12} sm={12} md={!2} lg={12} xl={12}>
                            <Grid container textAlign="left">
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                xl={12}
                              >
                                <Typography
                                  variant="h6"
                                  sx={{
                                    textAlign: "left",
                                    fontWeight: "550",
                                    color: "#fff",
                                    backgroundColor: (theme) =>
                                      theme.palette.primary.main,
                                    px: 1,
                                  }}
                                >
                                  VEHICLE DETAILS
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={4.5}
                                sm={2.5}
                                md={2.5}
                                lg={4.5}
                                xl={4.5}
                              >
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  SPEED
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={0.5}
                                sm={0.5}
                                md={0.5}
                                lg={0.5}
                                xl={0.5}
                              >
                                {" "}
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item xs={7} sm={9} md={9} lg={7} xl={7}>
                                <Typography
                                  sx={{
                                    fontSize: "15.5px",
                                  }}
                                >
                                  {Boolean(selectedEventMarker?.speed)
                                    ? `${selectedEventMarker?.speed} Km/H`
                                    : "NA"}
                                </Typography>
                              </Grid>
                              <Grid
                                item
                                xs={4.5}
                                sm={2.5}
                                md={2.5}
                                lg={4.5}
                                xl={4.5}
                              >
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  IGNITION
                                </Typography>{" "}
                              </Grid>
                              <Grid
                                item
                                xs={0.5}
                                sm={0.5}
                                md={0.5}
                                lg={0.5}
                                xl={0.5}
                              >
                                <Typography
                                  sx={{
                                    whiteSpace: "nowrap",
                                    fontSize: "15.5px",
                                    fontWeight: "550",
                                  }}
                                >
                                  :
                                </Typography>{" "}
                              </Grid>
                              <Grid item xs={7} sm={9} md={9} lg={7} xl={7}>
                                <Typography
                                  sx={{
                                    fontSize: "15.5px",
                                  }}
                                >
                                  {Boolean(selectedEventMarker?.ignition)
                                    ? "ON"
                                    : "OFF"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LoadingComponent
        open={
          isGetGeoPositionDataLoading ||
          isGetGeoPositionDataFetching ||
          isGetAllDataForAllEvidencesFetching ||
          isGetStatusTypeLoading ||
          isGetDriverByIdLoading
        }
      />
    </React.Fragment>
  );
};

export default EventDetails;
