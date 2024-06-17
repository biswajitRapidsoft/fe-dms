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
// import DRINKS_LOGO from "../../img/DRINKS_LOGO.svg";
// import PHONE_IN_HAND_LOGO from "../../img/PHONE_IN_HAND_LOGO.svg";
// import PERSON_YAWN_LOGO from "../../img/PERSON_YAWN_LOGO.svg";
// import CIGARETTE_LOGO from "../../img/CIGARETTE_LOGO.svg";
// import CLOSED_EYES_LOGO from "../../img/CLOSED_EYES_LOGO.svg";
// import DISTRACTED_LOGO from "../../img/DISTRACTED_LOGO.svg";

import DRINKS_GOOGLE_MAP_LOGO from "../../img/DRINKS_GOOGLE_MAP_LOGO.svg";
import PHONE_IN_HAND_GOOGLE_MAP_LOGO from "../../img/PHONE_IN_HAND_GOOGLE_MAP_LOGO.svg";
import PERSON_YAWN_GOOGLE_MAP_LOGO from "../../img/PERSON_YAWN_GOOGLE_MAP_LOGO.svg";
import CIGARETTE_GOOGLE_MAP_LOGO from "../../img/CIGARETTE_GOOGLE_MAP_LOGO.svg";
import CLOSED_EYES_GOOGLE_MAP_LOGO from "../../img/CLOSED_EYES_GOOGLE_MAP_LOGO.svg";
import DISTRACTED_GOOGLE_MAP_LOGO from "../../img/DISTRACTED_GOOGLE_MAP_LOGO.svg";

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
  useGetDriverEventCountQuery,
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
  PHONE_CALLING,
  SMOKING_ALERT,
  YAWN_ALERT,
} from "../../helper/constants";
import axios from "axios";

const breadcrumbs = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Event Details", path: "/eventDetails" },
];

const CustomGradientBoxForPhoto = React.memo(function ({ photoUrl }) {
  const [data, setData] = React.useState({});
  // const [loading, setLoading] = React.useState(true);
  // const [imageLoadError, setImageLoadError] = React.useState(false);
  // const [errorMessage, setErrorMessage] = React.useState("");
  // const [imageSrc, setImageSrc] = React.useState(null);

  // const fetchImage = React.useCallback(async (photoUrl) => {
  //   setLoading(true);
  //   setImageLoadError(false);
  //   setErrorMessage("");

  //   try {
  //     const response = await fetch(photoUrl);
  //     console.log("image response: ", response);

  //     if (!response.ok) {
  //       throw new Error("Failed to load image");
  //     }

  //     const blob = await response.blob();
  //     const imageSrc = URL.createObjectURL(blob);
  //     setImageSrc(imageSrc);
  //     setLoading(false);
  //   } catch (error) {
  //     setImageLoadError(true);
  //     setErrorMessage(error.message ? error.message : "Failed to load image");
  //     setLoading(false);
  //   }
  // }, []);

  // const fetchImage = React.useCallback(async (photoUrl) => {
  //   setLoading(true);
  //   setImageLoadError(false);
  //   setErrorMessage("");
  //   try {
  //     const response = await axios.get(photoUrl, { responseType: "blob" });

  //     if (response.headers["content-type"].startsWith("image/")) {
  //       const imageUrl = URL.createObjectURL(response.data);
  //       setImageSrc(imageUrl);
  //       setLoading(false);
  //     } else {
  //       throw new Error("The URL did not return an image.");
  //     }
  //   } catch (error) {
  //     debugger;
  //     setImageLoadError(true);
  //     setErrorMessage(error.message ? error.message : "Failed to load image");
  //     setLoading(false);
  //   }
  // }, []);

  // React.useEffect(() => {
  //   if (Boolean(photoUrl)) {
  //     fetchImage(photoUrl);
  //   }
  // }, [fetchImage, photoUrl]);
  const fetchImage = React.useCallback(async () => {
    try {
      const response = await axios.get(photoUrl);
      setData(response.data);
    } catch (err) {
      setData(err.response?.data ? err.response.data : { message: err.data });
    }
  }, []);
  React.useEffect(() => {
    fetchImage();
  }, [fetchImage]);

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
        {data.data ? (
          <img src={data.data} alt={"evidence"} width="100%" height="100%" />
        ) : (
          data.message
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
              "linear-gradient(120deg, rgba(225, 255, 255, 0.3), rgba(0, 0, 0, 0.2))",
          }}
        >
          <Typography>Evidence</Typography>
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
            "linear-gradient(120deg, rgba(225, 255, 255, 0.3), rgba(0, 0, 0, 0.2))",
        }}
      >
        <Typography>Evidence</Typography>
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

  console.log("markerData in marker: ", markerData);

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
            : markerData?.eventType === PHONE_CALLING
            ? PHONE_IN_HAND_GOOGLE_MAP_LOGO
            : markerData?.eventType === SMOKING_ALERT
            ? CIGARETTE_GOOGLE_MAP_LOGO
            : markerData?.eventType === YAWN_ALERT
            ? PERSON_YAWN_GOOGLE_MAP_LOGO
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

  console.log("todaytoday : ", today);
  console.log("fromfrom : ", startOfDay);
  console.log("toto: ", endOfDay);

  console.log("eventData: ", eventData);
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

  console.log(
    "eventDetailsFilterationFormData: ",
    eventDetailsFilterationFormData
  );

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

  const [isShowAllEevidences, setIsShowAllEevidences] = useState(false);

  const [allEvidencesData, setAllEvidencesData] = useState([]);

  const [filteredEventData, setFilteredEventData] = useState([]);

  console.log("allEvidencesData: ", allEvidencesData);

  const [driverEventCountData, setDriverEventCountData] = useState([]);
  console.log("driverEventCountData: ", driverEventCountData);

  console.log("selectedEventType: ", selectedEventType);

  const [markerCoordinates, setMarkerCoordinates] = useState(
    initialEventCoordinates
  );

  console.log("markerCoordinates: ", markerCoordinates);

  const {
    data: getAllData = {
      data: {
        data: [],
        eventTypeCountDto: {},
      },
    },
    isLoading: isGetAllDataLoading,
    isFetching: isGetAllDataFetching,
    isSuccess: isGetAllDataSuccess,
  } = useGetAllEventForEventDetailsQuery(
    {
      eventType: selectedEventType,
      vehicleNo: eventDetailsFilterationFormData?.vehicleNo,
      fromDate: formatToUTC(eventDetailsFilterationFormData?.fromDate),
      toDate: formatToUTC(eventDetailsFilterationFormData?.toDate),
    },
    {
      skip: !Boolean(selectedEventType),
      refetchOnMountOrArgChange: true,
    }
  );

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
      skip: !Boolean(isShowAllEevidences),
      refetchOnMountOrArgChange: true,
    }
  );

  const {
    data: getGeoPositionsData,
    isLoading: isGetGeoPositionDataLoading,
    isFetching: isGetGeoPositionDataFetching,
  } = useGetGeoPositionsQuery({
    deviceId: eventDetailsFilterationFormData?.deviceId,
    from: formatToUTC(eventDetailsFilterationFormData?.fromDate),
    to: formatToUTC(eventDetailsFilterationFormData?.toDate),
  });

  console.log("getGeoPositionsData: ", getGeoPositionsData);

  const {
    data: getStatusType = {
      data: [],
    },
    isLoading: isGetStatusTypeLoading,
  } = useGetStatusTypeQuery();

  console.log("getStatusType: ", getStatusType?.data);

  const {
    data: getDriverEventCountData = {
      data: [],
    },
    isLoading: isGetDriverEventCountLoading,
    isSuccess: isGetDriverEventCountSuccess,
  } = useGetDriverEventCountQuery({
    driverId: eventData?.driverId,
  });

  console.log("getDriverEventCountData: ", getDriverEventCountData);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: config.apiKey,
  });
  const {
    data: getEventTypeData = {
      data: null,
    },
    // isLoading: isGetEventTypeLoading,
  } = useGetEventTypeQuery();

  console.log("getEventTypeData: ", getEventTypeData);

  const eventCoordinates = useMemo(() => {
    if (Boolean(getAllData?.data?.data?.length > 0)) {
      return getAllData?.data?.data.map((item) => ({
        lat: item.latitude,
        lng: item.longitude,
      }));
    } else {
      return [];
    }
  }, [getAllData?.data?.data]);

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

  console.log("eventCoordinates: ", eventCoordinates);

  const [selectedEventMarker, setSelectedEventMarker] = useState(null);

  console.log("selectedEventMarker: ", selectedEventMarker);

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

  console.log("polylilePathMap: ", polylilePathMap);

  const matchedRemarkType = React.useMemo(
    () =>
      getStatusType?.data?.find(
        (item) => item?.id === selectedEventMarker?.remarkId
      ) || null,
    [getStatusType?.data, selectedEventMarker?.remarkId]
  );

  const handleTableFilterChange = React.useCallback((value) => {
    setSelectedEventType(value);
  }, []);

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
    setIsShowAllEevidences((prev) => !prev);
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
    console.log("Selected event type changed:", selectedEventType);
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
    if (!Boolean(selectedEventType) && !Boolean(isShowAllEevidences)) {
      setSelectedEventMarker(eventData);
    } else if (Boolean(selectedEventType) && !Boolean(isShowAllEevidences)) {
      setSelectedEventMarker(filteredEventData[0] || null);
    } else if (Boolean(isShowAllEevidences)) {
      setSelectedEventMarker(allEvidencesData[0] || null);
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
    isShowAllEevidences,
  ]);

  React.useEffect(() => {
    if (Boolean(isGetAllDataForAllEvidencesSuccess)) {
      setAllEvidencesData(getAllDataForAllEvidences?.data?.data || []);
    }
  }, [
    isGetAllDataForAllEvidencesSuccess,
    getAllDataForAllEvidences?.data?.data,
  ]);

  React.useEffect(() => {
    if (Boolean(isGetAllDataSuccess)) {
      setFilteredEventData(getAllData?.data?.data || []);
    }
  }, [getAllData?.data?.data, isGetAllDataSuccess]);

  useEffect(() => {
    if (isShowAllEevidences) {
      setMarkerCoordinates(eventCoordinatesForAllEvidences);
    }
    if (selectedEventType) {
      setMarkerCoordinates(eventCoordinates);
    }
  }, [
    selectedEventType,
    eventCoordinates,
    eventCoordinatesForAllEvidences,
    isShowAllEevidences,
  ]);

  React.useEffect(() => {
    if (Boolean(isGetDriverEventCountSuccess)) {
      setDriverEventCountData(getDriverEventCountData?.data || []);
    }
  }, [isGetDriverEventCountSuccess, getDriverEventCountData?.data]);

  return (
    <React.Fragment>
      <Box sx={{ width: "calc(100vw - 110px)" }}>
        <Box
          sx={{
            width: "100%",
            mt: 2,
          }}
        >
          <Grid container rowSpacing={2}>
            <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
              <TopViewNav breadcrumbs={breadcrumbs} />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
              <Grid container spacing={1}>
                {/* <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="From DateTime"
                      value={eventDetailsFilterationFormData?.fromDate}
                      onChange={(value) =>
                        handleChangeEventDetailsFilterationDate(
                          "fromDate",
                          value
                        )
                      }
                      // renderInput={(params) => (
                      //   <TextField {...params} fullWidth />
                      // )}
                      format="DD/MM/YYYY, hh:mm A"
                      maxDate={today}
                      slotProps={{
                        textField: { fullWidth: true, size: "small" },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker
                      label="To DateTime"
                      value={eventDetailsFilterationFormData?.toDate}
                      onChange={(value) =>
                        handleChangeEventDetailsFilterationDate("toDate", value)
                      }
                      // renderInput={(params) => (
                      //   <TextField {...params} fullWidth />
                      // )}
                      format="DD/MM/YYYY, hh:mm A"
                      maxDate={today}
                      slotProps={{
                        textField: { fullWidth: true, size: "small" },
                      }}
                    />
                  </LocalizationProvider>
                </Grid> */}
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}></Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    options={getEventTypeData?.data || []}
                    getOptionLabel={(option) => option.replace(/_/g, " ")}
                    popupIcon={
                      <KeyboardArrowDownIcon
                        sx={{ color: "customBlue.dark" }}
                      />
                    }
                    onChange={(e, newVal) => handleTableFilterChange(newVal)}
                    sx={{
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
                            whiteSpace: "nowrap",
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
                        <Typography sx={{ fontSize: "16.5px" }}>
                          {eventData?.vehicleNo || "NA"}
                        </Typography>
                      </Grid>

                      <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
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
                        <Typography sx={{ fontSize: "16.5px" }}>
                          {eventData?.chassisNumber || "NA"}
                        </Typography>
                      </Grid>

                      <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
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
                        <Typography sx={{ fontSize: "16.5px" }}>
                          {eventData?.driverName || "NA"}
                        </Typography>
                      </Grid>

                      <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                        <Typography
                          sx={{
                            whiteSpace: "nowrap",
                            fontSize: "16.5px",
                            fontWeight: "550",
                          }}
                        >
                          DRIVER NO
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
                        <Typography sx={{ fontSize: "16.5px" }}>
                          {eventData?.driverPhone || "NA"}
                        </Typography>
                      </Grid>

                      {!Boolean(isAboveMdBreakpoint) && (
                        <>
                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                whiteSpace: "nowrap",
                                fontSize: "16.5px",
                                fontWeight: "550",
                              }}
                            >
                              DL
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
                            <Typography sx={{ fontSize: "16.5px" }}>
                              {eventData?.dlNumber || "NA"}
                            </Typography>
                          </Grid>

                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                whiteSpace: "nowrap",
                                fontSize: "16.5px",
                                fontWeight: "550",
                              }}
                            >
                              IMEI NO
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
                            <Typography sx={{ fontSize: "16.5px" }}>
                              {eventData?.imeiNo || "NA"}
                            </Typography>
                          </Grid>

                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                whiteSpace: "nowrap",
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
                            <Typography sx={{ fontSize: "16.5px" }}>
                              {driverEventCountData?.dateOfJoin || "NA"}
                            </Typography>
                          </Grid>

                          <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                            <Typography
                              sx={{
                                whiteSpace: "nowrap",
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
                            <Typography sx={{ fontSize: "16.5px" }}>
                              {driverEventCountData?.totalEvent || 0}
                            </Typography>
                          </Grid>
                        </>
                      )}
                    </Grid>
                  </Grid>

                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={12}
                    lg={12}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      // bgcolor: "blue",
                    }}
                  >
                    <img src={AVATAR_LOGO} alt="AVATAR_LOGO" width="70%" />
                  </Grid>

                  {Boolean(isAboveMdBreakpoint) && (
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
                              whiteSpace: "nowrap",
                              fontSize: "16.5px",
                              fontWeight: "550",
                            }}
                          >
                            DL
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
                          <Typography sx={{ fontSize: "16.5px" }}>
                            {eventData?.dlNumber || "NA"}
                          </Typography>
                        </Grid>

                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
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
                          <Typography sx={{ fontSize: "16.5px" }}>
                            {eventData?.imeiNo || "NA"}
                          </Typography>
                        </Grid>

                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
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
                          <Typography sx={{ fontSize: "16.5px" }}>
                            {driverEventCountData?.dateOfJoin || "NA"}
                          </Typography>
                        </Grid>

                        <Grid item xs={7} sm={7} md={7} lg={6} xl={5}>
                          <Typography
                            sx={{
                              whiteSpace: "nowrap",
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
                          <Typography sx={{ fontSize: "16.5px" }}>
                            {driverEventCountData?.totalEvent || 0}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            </Grid>

            {/* GEO LOCATION AND EVIDENCE DETAILS */}
            <Grid item xs={12} sm={12} md={8} lg={9.5}>
              {/* GEO LOCATION CONTAINER */}
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  height: { xs: "85vh", md: "70vh", lg: "56vh" },
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
                  >
                    <Polyline
                      path={polylilePathMap}
                      options={{
                        strokeColor: "#FF000084",
                        strokeOpacity: 1.0,
                        strokeWeight: 6,
                      }}
                    />
                    {Boolean(markerCoordinates?.length > 0) &&
                      markerCoordinates?.map((coordinate, index) => (
                        <DynamicMarkerF
                          key={index}
                          coordinate={coordinate}
                          isShowAllEevidences={isShowAllEevidences}
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
                      ))}

                    {/* {markerCoordinates?.map((coordinate, index) => (
                    <MarkerF
                      key={index}
                      position={{ lat: coordinate.lat, lng: coordinate.lng }}
                      onClick={() => handleMarkerClick(index)}
                    >
                      {infoWindowsOpenState[index] && (
                        <InfoWindowF
                          onCloseClick={() => handleInfoWindowClose(index)}
                          position={{
                            lat: coordinate.lat,
                            lng: coordinate.lng,
                          }}
                        >
                          <div>
                            <button
                              onClick={() => handleInfoWindowClose(index)}
                            >
                              Close
                            </button>
                          </div>
                        </InfoWindowF>
                      )}
                    </MarkerF>
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
                      sx={{ width: "100%", height: "100%", paddingX: 1 }}
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
                            color: "customBlue.dark",
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

                        {/* {Boolean(isShowAllEevidences) ? (
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
                              selectedEventMarker?.evidenceVideos?.length === 0
                            ) &&
                              Boolean(
                                selectedEventMarker?.evidencePhotos?.length ===
                                  0
                              ) && (
                                <Box
                                  sx={{
                                    display: "flex",
                                    flexGrow: 1,
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Typography>No Evidence Available</Typography>
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
                              value={isShowAllEevidences}
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
                        paddingX: 1,
                      }}
                    >
                      <Grid container rowGap={1} sx={{ height: "100%" }}>
                        <Grid item xs={12} sm={12} md={!2} lg={12} xl={12}>
                          <Grid container textAlign="left">
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Typography
                                variant="h6"
                                sx={{
                                  textAlign: "left",
                                  fontWeight: "550",
                                  color: "customBlue.dark",
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
                                  whiteSpace: "nowrap",
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
                                  whiteSpace: "nowrap",
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
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Typography
                                variant="h6"
                                sx={{
                                  textAlign: "left",
                                  fontWeight: "550",
                                  color: "customBlue.dark",
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
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                              <Typography
                                variant="h6"
                                sx={{
                                  textAlign: "left",
                                  fontWeight: "550",
                                  color: "customBlue.dark",
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
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LoadingComponent
        open={
          isGetAllDataLoading ||
          isGetGeoPositionDataLoading ||
          isGetAllDataFetching ||
          isGetGeoPositionDataFetching ||
          isGetAllDataForAllEvidencesFetching ||
          isGetStatusTypeLoading ||
          isGetDriverEventCountLoading
        }
      />
    </React.Fragment>
  );
};

export default EventDetails;
