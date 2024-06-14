import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  useTheme,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";

import ChartComponent from "./ChartComponent";
// import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
// import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import { useTheme } from "@mui/material/styles";
import dayjs from "dayjs";

import {
  useGetAllEventCountQuery,
  useGetEventTypeQuery,
  useGetAllEventQuery,
  useGetAllVehicleQuery,
  useGetStatusTypeQuery,
  useGetDriverPerformanceQuery,
  useUpdateEventMutation,
} from "../../services/dashboard";
import TopViewNav from "../../components/TopViewNav";

import LoadingComponent from "../../components/LoadingComponent";
import TableComponent from "./TableComponent";

import { Cookies } from "../../helper/cookies";
import SnackAlert from "../../components/Alert";

import DRINKS_LOGO from "../../img/DRINKS_LOGO.svg";
import PHONE_IN_HAND_LOGO from "../../img/PHONE_IN_HAND_LOGO.svg";
import PERSON_YAWN_LOGO from "../../img/PERSON_YAWN_LOGO.svg";
import CIGARETTE_LOGO from "../../img/CIGARETTE_LOGO.svg";
import CLOSED_EYES_LOGO from "../../img/CLOSED_EYES_LOGO.svg";
import DISTRACTED_LOGO from "../../img/DISTRACTED_LOGO.svg";
import CAR_LOGO from "../../img/CAR_LOGO.svg";
import ACTIVE_LOGO from "../../img/ACTIVE_LOGO.svg";
import INAVTIVE_LOGO from "../../img/INAVTIVE_LOGO.svg";
import PERSON_LOGO from "../../img/PERSON_LOGO.svg";
import STEERING_WHEEL_LOGO from "../../img/STEERING_WHEEL_LOGO.svg";
import VEHICLE_GPS_MACHINE_LOGO from "../../img/VEHICLE_GPS_MACHINE_LOGO.svg";
import BROKEN_CONNECTION_PATH_LOGO from "../../img/BROKEN_CONNECTION_PATH_LOGO.svg";
import GPS_RECIEVER_TOWER_LOGO from "../../img/GPS_RECIEVER_TOWER_LOGO.svg";
import CLOSED_NETWORK_LOGO from "../../img/CLOSED_NETWORK_LOGO.svg";
// import { useNavigate } from "react-router";
import BarChartComponent from "./BarChartComponent";
import {
  customBarchartColors,
  customChartColors,
} from "../../helper/constants";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useGetAllDriverQuery } from "../../services/driverPerformancereport";

// import stackBarChartData from "./data.json";

const breadcrumbs = [{ name: "Dashboard", path: "/dashboard" }];

const driverPerformanceFilterOptionArray = [
  { key: "Last Two Months", value: "Last Two Months" },
  { key: "Last Two Weeks", value: "Last Two Weeks" },
  { key: "Last Two Days", value: "Last Two Days" },
];

const formatToUTC = (date) => {
  if (!Boolean(date)) {
    return null;
  }
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

const CameraEventsCard = React.memo(function ({ cameraEventsCardData }) {
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "220px",
        maxHeight: "220px",
        // minHeight: "250px",
        // maxHeight: "250px",
        bgcolor: "customBlue.light",
        position: "relative",
        overflow: "hidden",
        paddingX: "5px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 5%),
            linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 15%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 20%),
            linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 20%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "40% 100%, 115% 100%, 100% 10%, 100% 120%",
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "25px", fontWeight: 550 }}>
          CAMERA EVENTS
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "25px", fontWeight: 700 }}>
          {cameraEventsCardData?.totalEventCount || 0}
        </Typography>
      </Box>

      <Box
        sx={{ display: "flex", flexDirection: "column", flexGrow: 1, mr: 1 }}
      >
        <Grid container columnSpacing={1} rowSpacing={2}>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                src={DRINKS_LOGO}
                alt="Drink_Logo"
                width={60}
                height={60}
                style={{
                  filter:
                    Boolean(cameraEventsCardData?.drinkingCount > 0) &&
                    "invert(50%) sepia(100%) saturate(10000%) hue-rotate(0deg)",
                }}
              />
              <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                {cameraEventsCardData?.drinkingCount || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  minWidth: "3px",
                  maxWidth: "3px",
                  minHeight: "40px",
                  maxHeight: "40px",
                  background: theme.palette.customGrey.A400,
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <img
                src={PERSON_YAWN_LOGO}
                alt="PERSON_YAWN_LOGO"
                width={60}
                height={60}
                style={{
                  filter:
                    Boolean(cameraEventsCardData?.yawningCount > 0) &&
                    "invert(50%) sepia(100%) saturate(10000%) hue-rotate(0deg)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color:
                    Boolean(cameraEventsCardData?.yawningCount > 0) &&
                    "#FF0000",
                }}
              >
                {cameraEventsCardData?.yawningCount || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  minWidth: "3px",
                  maxWidth: "3px",
                  minHeight: "40px",
                  maxHeight: "40px",
                  background: theme.palette.customGrey.A400,
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                src={PHONE_IN_HAND_LOGO}
                alt="PHONE_IN_HAND_LOGO"
                width={60}
                height={60}
                style={{
                  filter:
                    Boolean(cameraEventsCardData?.mobileUsageCount > 0) &&
                    "invert(50%) sepia(100%) saturate(10000%) hue-rotate(0deg)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color:
                    Boolean(cameraEventsCardData?.mobileUsageCount > 0) &&
                    "#FF0000",
                }}
              >
                {cameraEventsCardData?.mobileUsageCount || 0}
              </Typography>
            </Box>
          </Grid>

          {/* SECOND SEPARATOR */}

          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                src={CIGARETTE_LOGO}
                alt="CIGARETTE_LOGO"
                width={60}
                height={60}
                style={{
                  filter:
                    Boolean(cameraEventsCardData?.smokingCount > 0) &&
                    "invert(50%) sepia(100%) saturate(10000%) hue-rotate(0deg)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color:
                    Boolean(cameraEventsCardData?.smokingCount > 0) &&
                    "#FF0000",
                }}
              >
                {cameraEventsCardData?.smokingCount || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  minWidth: "3px",
                  maxWidth: "3px",
                  minHeight: "40px",
                  maxHeight: "40px",
                  background: theme.palette.customGrey.A400,
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                src={CLOSED_EYES_LOGO}
                alt="CLOSED_EYES_LOGO"
                width={60}
                height={60}
                style={{
                  filter:
                    Boolean(cameraEventsCardData?.closeEyesCount > 0) &&
                    "invert(50%) sepia(100%) saturate(10000%) hue-rotate(0deg)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color:
                    Boolean(cameraEventsCardData?.closeEyesCount > 0) &&
                    "#FF0000",
                }}
              >
                {cameraEventsCardData?.closeEyesCount || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1.5} sm={1.5} md={1.5} lg={1.5} xl={1.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  // minWidth: "3px",
                  // maxWidth: "3px",
                  // minHeight: "40px",
                  // maxHeight: "40px",
                  width: "3px",
                  height: "40px",
                  background: theme.palette.customGrey.A400,
                  marginLeft: "5px",
                  marginRight: "5px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <img
                src={DISTRACTED_LOGO}
                alt="DISTRACTED_LOGO"
                width={60}
                height={60}
                style={{
                  filter:
                    Boolean(cameraEventsCardData?.distractionCount > 0) &&
                    "invert(50%) sepia(100%) saturate(10000%) hue-rotate(0deg)",
                }}
              />
              <Typography
                sx={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  color:
                    Boolean(cameraEventsCardData?.distractionCount > 0) &&
                    "#FF0000",
                }}
              >
                {cameraEventsCardData?.distractionCount || 0}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
});

const VehiclesCard = React.memo(function ({ vehiclesCardData }) {
  const theme = useTheme();
  const totalActiveVehicle = vehiclesCardData?.totalActiveVehicle || 0;
  const totalInactiveVehicle = vehiclesCardData?.totalInActiveVehicle || 0;
  const total = totalActiveVehicle + totalInactiveVehicle;
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "220px",
        maxHeight: "220px",
        // minHeight: "250px",
        // maxHeight: "250px",
        bgcolor: "customBlue.light",
        position: "relative",
        overflow: "hidden",
        paddingX: "5px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 5%),
            linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 15%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 20%),
            linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 20%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "40% 100%, 115% 100%, 100% 10%, 100% 120%",
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "25px", fontWeight: 550 }}>
          VEHICLES
        </Typography>
      </Box>

      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "25px", fontWeight: 700 }}>
          {total}
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          mx: 1,
          mt: 4,
        }}
      >
        <Grid container columnSpacing={1}>
          <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontSize: "22px", fontWeight: 700, textAlign: "center" }}
              >
                Active
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <img
                    src={ACTIVE_LOGO}
                    alt="ACTIVE_LOGO"
                    width={30}
                    height={30}
                    style={{ position: "absolute", top: 3, right: 0 }}
                  />
                  <img src={CAR_LOGO} alt="CAR_LOGO" width={90} height={60} />
                </Box>
                <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                  {totalActiveVehicle}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "45px",
                  background: theme.palette.customGrey.A400,
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginBottom: "10px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{ fontSize: "22px", fontWeight: 700, textAlign: "center" }}
              >
                Inactive
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <img
                    src={INAVTIVE_LOGO}
                    alt="INAVTIVE_LOGO"
                    width={30}
                    height={30}
                    style={{ position: "absolute", top: 3, right: 0 }}
                  />
                  <img src={CAR_LOGO} alt="CAR_LOGO" width={90} height={60} />
                </Box>
                <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                  {totalInactiveVehicle}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
});

const ComplaintsCard = React.memo(function ({ complaintsCardData }) {
  const theme = useTheme();
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        minHeight: "220px",
        maxHeight: "220px",
        // minHeight: "250px",
        // maxHeight: "250px",
        bgcolor: "customBlue.light",
        position: "relative",
        overflow: "hidden",
        paddingX: "5px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 5%),
            linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 15%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 20%),
            linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 20%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "40% 100%, 115% 100%, 100% 10%, 100% 120%",
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "25px", fontWeight: 550 }}>
          COMPLAINTS
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          mr: 1,
          marginTop: 8.5,
        }}
      >
        <Grid container columnSpacing={1}>
          <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 700,
                  textAlign: "center",
                  wordBreak: "break-word",
                }}
              >
                Defaulter Drivers
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Box sx={{ position: "relative" }}>
                  <img
                    src={STEERING_WHEEL_LOGO}
                    alt="STEERING_WHEEL_LOGO"
                    width={45}
                    height={45}
                    style={{ position: "absolute", top: 21, right: -7 }}
                  />
                  <img
                    src={PERSON_LOGO}
                    alt="PERSON_LOGO"
                    width={90}
                    height={70}
                  />
                </Box>
                <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                  {complaintsCardData?.countDefaulterDriver || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "flex-end",
                width: "100%",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "3px",
                  height: "45px",
                  background: theme.palette.customGrey.A400,
                  marginLeft: "5px",
                  marginRight: "5px",
                  marginBottom: "20px",
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={5.5} sm={5.5} md={5.5} lg={5.5} xl={5.5}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                sx={{
                  fontSize: "22px",
                  fontWeight: 700,
                  textAlign: "center",
                  // wordBreak: "break-word",
                  whiteSpace: "nowrap",
                }}
              >
                Tampered Devices
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: {
                    xs: "space-evenly",
                    md: "",
                    lg: "space-evenly",
                  },
                  alignItems: "center",
                  gap: { xs: 1, md: 0, lg: 2 },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 3.5,
                  }}
                >
                  <img
                    src={VEHICLE_GPS_MACHINE_LOGO}
                    alt="VEHICLE_GPS_MACHINE_LOGO"
                    width={50}
                    height={60}
                  />
                  <img
                    src={BROKEN_CONNECTION_PATH_LOGO}
                    alt="BROKEN_CONNECTION_PATH_LOGO"
                    width={65}
                    height={70}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 27,
                      transform: "rotate(75deg)",
                    }}
                  />
                  <img
                    src={CLOSED_NETWORK_LOGO}
                    alt="CLOSED_NETWORK_LOGO"
                    width={27}
                    height={27}
                    style={{
                      position: "absolute",
                      top: 23,
                      left: 54,
                      transform: "rotate(5deg)",
                    }}
                  />
                  <img
                    src={GPS_RECIEVER_TOWER_LOGO}
                    alt="GPS_RECIEVER_TOWER_LOGO"
                    width={55}
                    height={70}
                  />
                </Box>
                <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                  {complaintsCardData?.tamperedDevices || 0}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            justifyContent: "space-evenly",
            alignItems: "center",
            // bgcolor: "red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "27px",
                fontWeight: 700,
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              Defaulter Drivers
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Box sx={{ position: "relative" }}>
                <img
                  src={STEERING_WHEEL_LOGO}
                  alt="STEERING_WHEEL_LOGO"
                  width={45}
                  height={45}
                  style={{ position: "absolute", top: 21, right: -7 }}
                />
                <img
                  src={PERSON_LOGO}
                  alt="PERSON_LOGO"
                  width={90}
                  height={70}
                />
              </Box>
              <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                {complaintsCardData?.countDefaulterDriver || 0}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: "27px",
                fontWeight: 700,
                textAlign: "center",
                wordBreak: "break-word",
              }}
            >
              Tampered Devices
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: {
                  xs: "space-evenly",
                  md: "",
                  lg: "space-evenly",
                },
                alignItems: "center",
                gap: { xs: 1, md: 0, lg: 2 },
              }}
            >
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 3.5,
                }}
              >
                <img
                  src={VEHICLE_GPS_MACHINE_LOGO}
                  alt="VEHICLE_GPS_MACHINE_LOGO"
                  width={50}
                  height={60}
                />
                <img
                  src={BROKEN_CONNECTION_PATH_LOGO}
                  alt="BROKEN_CONNECTION_PATH_LOGO"
                  width={65}
                  height={70}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 27,
                    transform: "rotate(75deg)",
                  }}
                />
                <img
                  src={CLOSED_NETWORK_LOGO}
                  alt="CLOSED_NETWORK_LOGO"
                  width={27}
                  height={27}
                  style={{
                    position: "absolute",
                    top: 23,
                    left: 54,
                    transform: "rotate(5deg)",
                  }}
                />
                <img
                  src={GPS_RECIEVER_TOWER_LOGO}
                  alt="GPS_RECIEVER_TOWER_LOGO"
                  width={55}
                  height={70}
                />
              </Box>
              <Typography sx={{ fontSize: "25px", fontWeight: "bold" }}>
                {complaintsCardData?.tamperedDevices || 0}
              </Typography>
            </Box>
          </Box>
        </Box> */}
      </Box>
    </Paper>
  );
});

const EventsStatusCard = React.memo(function ({ eventsStatusCardData }) {
  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        gap: 2,
        minHeight: "220px",
        maxHeight: "220px",
        // minHeight: "250px",
        // maxHeight: "250px",
        bgcolor: "customBlue.light",
        position: "relative",
        overflow: "hidden",
        paddingX: "5px",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          background: `
            linear-gradient(to right, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 5%),
            linear-gradient(to left, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0) 15%),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0) 20%),
            linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0) 20%)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "40% 100%, 115% 100%, 100% 10%, 100% 120%",
        },
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: "25px", fontWeight: 550 }}>
          EVENTS STATUS
        </Typography>
      </Box>

      <Box sx={{ paddingX: "15px", marginTop: 6.5, marginLeft: 5 }}>
        <Grid container>
          <Grid item xs={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
                Pending
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
                :
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: "550" }}>
                {eventsStatusCardData?.pendingRemark || 0}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
                Action Taken
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
                :
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: "550" }}>
                {eventsStatusCardData?.actionTakenRemark || 0}
              </Typography>
            </Box>
          </Grid>

          <Grid item xs={7}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
                No Action Needed
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={1}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: "22px", fontWeight: "700" }}>
                :
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography sx={{ fontSize: "24px", fontWeight: "550" }}>
                {eventsStatusCardData?.noActionTakenRemark || 0}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
});

// custom component for chart labels
const CustomChartLabels = React.memo(
  ({ box, index, isNotLastElement, getAllEventCount, calculatePercentage }) => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box
              sx={{
                height: 12,
                width: 12,
                backgroundColor: box.color,
              }}
            ></Box>
            <Typography sx={{ color: "text.light", fontSize: "18px" }}>
              {box.title}
            </Typography>
          </Box>
          <Typography
            sx={{ color: "text.light", fontSize: "18px", fontWeight: "550" }}
          >
            {calculatePercentage(
              getAllEventCount?.data?.[box.key],
              getAllEventCount?.data?.totalEventCount
            )}
            %
          </Typography>
        </Box>
        {Boolean(isNotLastElement) && (
          <Divider
            sx={{ backgroundColor: "customPurple.200", height: "1.5px" }}
          />
        )}
      </>
    );
  }
);

//  //custom component for boxes(cards)

// const CustomBox = React.memo(function ({
//   box,
//   getAllCardEventCount,
//   calculatePercentage,
// }) {
//   const theme = useTheme();
//   return (
//     <Grid item xs={6} md={4} lg={1.5} sm={6}>
//       <Paper
//         sx={{
//           pb: 3,
//           backgroundColor: theme.palette.secondary.main,
//         }}
//       >
//         <Box sx={{ display: "flex", px: 1, py: 2 }}>
//           <Typography
//             sx={{
//               fontWeight: "bold",
//               color: "#000",
//             }}
//             variant="h6"
//           >
//             {box.title}
//           </Typography>
//         </Box>
//         <Box sx={{ display: "flex", px: 2, flexDirection: "column" }}>
//           <Typography
//             variant="h2"
//             sx={{
//               fontWeight: 300,
//               color: "#000",
//             }}
//           >
//             {getAllCardEventCount?.data?.[box.key] || 0}
//           </Typography>
//           <Typography
//             variant="h6"
//             sx={{
//               color: "#000",
//             }}
//           >
//             {calculatePercentage(
//               getAllCardEventCount?.data?.[box.key],
//               getAllCardEventCount?.data?.totalEventCount
//             )}
//             %
//           </Typography>
//         </Box>
//       </Paper>
//     </Grid>
//   );
// });

const Dashboard = () => {
  // const theme = useTheme();

  // const navigate = useNavigate();
  const today = useMemo(() => dayjs(), []);

  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  // useStates for paginations
  const [pageNo, setPageNo] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);
  // useState for chart component filter
  const [filter, setFilter] = React.useState({
    filter: "Till Today",
    filterInputVal: "Till Today",
  });

  const [
    selectedDriverPerformanceFilterOption,
    setSelectedDriverPerformanceFilterOption,
  ] = useState(driverPerformanceFilterOptionArray[0]);

  const [tableFilter, setTableFilter] = React.useState({
    selectedEventType: null,
    remarkId: null,
    vehicleNo: null,
    searchKey: "",
    fromDate: null,
    toDate: null,
    driverName: "",
    dlNumber: "",
  });

  console.log("tableFilter: ", tableFilter);

  const [
    selectedDlNumberForDriverPerformanceBarchart,
    setSelectedDlNumberForDriverPerformanceBarchart,
  ] = useState(null);

  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  // array of objects for box(cards) data
  const boxesData = React.useMemo(
    () => [
      {
        key: "yawningCount",
        title: "Yawning",
        color: customChartColors.yawningCount,
      },
      {
        key: "mobileUsageCount",
        title: "Mobile use",
        color: customChartColors.mobileUsageCount,
      },
      {
        key: "distractionCount",
        title: "Distraction",
        color: customChartColors.distractionCount,
      },
      {
        key: "smokingCount",
        title: "Smoking",
        color: customChartColors.smokingCount,
      },
      {
        key: "closeEyesCount",
        title: "Close eyes",
        color: customChartColors.closeEyesCount,
      },
      {
        key: "noFaceCount",
        title: "No face",
        color: customChartColors.noFaceCount,
      },
      {
        key: "lowHeadCount",
        title: "Low head",
        color: customChartColors.lowHeadCount,
      },
      {
        key: "drinkingCount",
        title: "Drinking",
        color: customChartColors.drinkingCount,
      },
    ],
    []
  );

  const [tableComponentData, setTableComponentData] = useState({});

  console.log("tableComponentData: ", tableComponentData);

  // extracing the event data for table
  const {
    data: getAllData = {
      data: {
        data: [],
        eventTypeCountDto: {},
      },
    },
    isLoading: isGetAllDataLoading,
    isSuccess: isGetAllDataSuccess,
    // isFetching: isGetAllDataFetching,
  } = useGetAllEventQuery(
    {
      pageNo: pageNo,
      pageSize: pageSize,
      eventType: tableFilter.selectedEventType,
      vehicleNo: tableFilter.vehicleNo,
      remarkId: tableFilter?.remarkId,
      searchKey: debouncedSearch,
      fromDate: formatToUTC(tableFilter?.fromDate),
      toDate: formatToUTC(tableFilter?.toDate),
      // driverName: tableFilter?.driverName,
      dlNumber: Boolean(tableFilter?.dlNumber?.trim())
        ? tableFilter?.dlNumber?.trim()
        : null,
    },
    {
      skip:
        (Boolean(formatToUTC(tableFilter?.fromDate)) &&
          !Boolean(formatToUTC(tableFilter?.toDate))) ||
        (!Boolean(formatToUTC(tableFilter?.fromDate)) &&
          Boolean(formatToUTC(tableFilter?.toDate))),
      refetchOnMountOrArgChange: true,
      pollingInterval: 30000,
    }
  );

  const {
    data: getDriverPerformanceData = {
      data: {},
    },
    isLoading: isGetDriverPerformanceLoading,
  } = useGetDriverPerformanceQuery(
    {
      value: selectedDriverPerformanceFilterOption?.key,
      dlNumber: Boolean(selectedDlNumberForDriverPerformanceBarchart)
        ? selectedDlNumberForDriverPerformanceBarchart
        : null,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 30000,
    }
  );

  console.log("getDriverPerformanceData: ", getDriverPerformanceData);

  // calling the api for card data
  // const {
  //   data: getAllCardEventCount = {
  //     data: null,
  //   },
  //   isLoading: isGetAllEventCardCountLoading,
  // } = useGetAllEventCountQuery("Till Today", {
  //   refetchOnMountOrArgChange: true,
  //   pollingInterval: 30000,
  // });
  // calling the api for chartfilter
  const {
    data: getAllEventCount = {
      data: null,
    },
    isLoading: isGetAllEventCountLoading,
  } = useGetAllEventCountQuery(filter.filter || "Till Today", {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  console.log("getAllEventCount: ", getAllEventCount);

  const {
    data: getEventType = {
      data: null,
    },
    isLoading: isGetEventTypeLoading,
  } = useGetEventTypeQuery();

  const {
    data: getStatusType = {
      data: [],
    },
    isLoading: isGetStatusTypeLoading,
  } = useGetStatusTypeQuery();

  console.log("getStatusType: ", getStatusType?.data);

  // getAllVehcile

  const {
    data: getAllVehicleData = {
      data: null,
    },
    isLoading: isGetAllVehicleDataLoading,
  } = useGetAllVehicleQuery();

  const {
    data: getAllDriverData = { data: null },
    isLoading: isGetAllDriverDataLoading,
    isSuccess: isGetAllDriverDataSuccess,
  } = useGetAllDriverQuery({ refetchOnMountOrArgChange: true });

  console.log("getAllDriverData: ", getAllDriverData);
  console.log("isGetAllDriverDataLoading: ", isGetAllDriverDataLoading);
  console.log("isGetAllDriverDataSuccess : ", isGetAllDriverDataSuccess);

  const [updateEvent, updateEventResponse] = useUpdateEventMutation();

  const [
    responsiveDonutChartContainerWidth,
    setResponsiveDonutChartContainerWidth,
  ] = useState(null);
  const responsiveDonutChartContainerRef = useRef(null);

  const debounce = React.useCallback((func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  }, []);

  useEffect(() => {
    const responsiveDonutChartContainer =
      responsiveDonutChartContainerRef.current;
    if (responsiveDonutChartContainer) {
      // Debounced function to handle width changes
      const handleResize = debounce((entry) => {
        setResponsiveDonutChartContainerWidth(entry.contentRect.width + "px");
      }, 500); // Adjust the debounce delay as needed

      // Create a ResizeObserver instance
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          if (entry.target === responsiveDonutChartContainer) {
            handleResize(entry);
          }
        }
      });

      // Start observing the element
      resizeObserver.observe(responsiveDonutChartContainer);

      // Cleanup function to stop observing when the component unmounts
      return () => {
        resizeObserver.unobserve(responsiveDonutChartContainer);
      };
    }
  }, [debounce]);

  const handlePageChange = React.useCallback((event, newpage) => {
    setPageNo(newpage);
  }, []);

  const handleChangeRowsPerPage = React.useCallback((event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  }, []);

  const calculatePercentage = React.useCallback((count, total) => {
    console.log("calculatePercentage count: ", count);
    console.log("calculatePercentage total: ", total);

    if (!Boolean(count) && !Boolean(total)) {
      return 0;
    }

    if (total === 0) {
      return 0;
    }
    return ((count / total) * 100).toFixed(2);
  }, []);

  // functions for chart component filter
  const handleChange = React.useCallback(
    (newVal) => {
      setFilter({ ...filter, filter: newVal });
    },
    [filter]
  );

  const handleInputValChange = React.useCallback(
    (newVal) => {
      setFilter({ ...filter, filterInputVal: newVal });
    },
    [filter]
  );

  const handleTableFilterChange = React.useCallback(
    (name, value) => {
      setTableFilter({ ...tableFilter, [name]: value });
    },
    [tableFilter]
  );

  const handleChangeEventDetailsFilterationDate = React.useCallback(
    (dateKey, dateValue) => {
      setTableFilter((prevData) => ({
        ...prevData,
        [dateKey]: dateValue,
      }));
    },
    []
  );

  // const handleNavigateCommandConfiguration = React.useCallback(() => {
  //   navigate("/commandConfiguration");
  // }, [navigate]);

  const handleChangeSelectedRemarkOption = React.useCallback(
    (rowId, selectedRemarkOption) => {
      // debugger;
      console.log("handleChangeSelectedRemarkOption rowid: ", rowId);
      console.log(
        "handleChangeSelectedRemarkOption selectedRemarkOption: ",
        selectedRemarkOption
      );
      setTableComponentData((prevData) => {
        return {
          ...prevData,
          data: prevData?.data?.map((item) => {
            if (item?.id === rowId) {
              return {
                ...item,
                selectedRemarkOption: selectedRemarkOption,
                ...(selectedRemarkOption?.id === 3 && item?.remarkId !== 3
                  ? { manualRemark: "" }
                  : {}),
              };
            } else {
              return item;
            }
          }),
        };
      });
    },
    []
  );

  const handleInputChangeEventRemark = React.useCallback(
    (rowId, inputValue) => {
      console.log("handleInputChangeEventRemark rowId : ", rowId);
      console.log("handleInputChangeEventRemark inputValue : ", inputValue);

      setTableComponentData((prevData) => {
        return {
          ...prevData,
          data: prevData?.data?.map((item) => {
            if (item?.id === rowId) {
              return {
                ...item,
                manualRemark: inputValue,
              };
            } else {
              return item;
            }
          }),
        };
      });
    },
    []
  );

  const handleResetSelectedRemarkOption = React.useCallback(
    (rowId, rollbackRemarkOption) => {
      // debugger;
      console.log("handleResetSelectedRemarkOption rowid: ", rowId);
      console.log(
        "handleResetSelectedRemarkOption rollbackRemarkOption: ",
        rollbackRemarkOption
      );
      setTableComponentData((prevData) => {
        return {
          ...prevData,
          data: prevData?.data?.map((item) => {
            if (item?.id === rowId) {
              const { manualRemark, ...rest } = item;
              return {
                ...rest,
                selectedRemarkOption: rollbackRemarkOption,
              };
            } else {
              return item;
            }
          }),
        };
      });
    },
    []
  );

  const handleUpdateEventRemark = React.useCallback(
    (eventId, newRemark, newRemarkId, oldRemarkId) => {
      console.log("handleUpdateEventRemark eventId: ", eventId);
      console.log("handleUpdateEventRemark newRemark: ", newRemark);
      console.log("handleUpdateEventRemark newRemarkId: ", newRemarkId);
      console.log("handleUpdateEventRemark oldRemarkId: ", oldRemarkId);

      if (Boolean(oldRemarkId === newRemarkId)) {
        setSnack({
          open: true,
          severity: "warning",
          message: "Please give a valid Remark !",
        });
        return;
      }

      if (!Boolean(newRemark?.trim())) {
        setSnack({
          open: true,
          severity: "warning",
          message: "Please give a valid Remark !",
        });
        return;
      }

      const payload = {
        id: eventId,
        remark: newRemark,
        remarkId: newRemarkId,
      };

      updateEvent(payload)
        .unwrap()
        .then((res) => {
          console.log("updateEvent res: ", res);
          setSnack({
            open: true,
            message: "Event upated successfully",
            severity: "success",
          });
        })
        .catch((err) => {
          setSnack({
            open: true,
            message: err?.data?.message || err?.data,
            severity: "error",
          });
          console.error("updateEvent error: ", err);
        });
    },
    [updateEvent]
  );

  React.useEffect(() => {
    if (Cookies.getCookie("loginSuccess")) {
      setSnack({
        open: true,
        severity: "success",
        message: Cookies.getCookie("loginSuccess"),
      });
    }
  }, []);

  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(tableFilter.searchKey);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [tableFilter.searchKey]);

  React.useEffect(() => {
    if (Boolean(isGetAllDataSuccess)) {
      setTableComponentData(getAllData?.data);
    }
  }, [getAllData?.data, isGetAllDataSuccess]);

  useEffect(() => {
    setPageNo(0);
  }, [tableFilter]);

  return (
    <React.Fragment>
      {/* <Box
        sx={{
          width: "100%",
          // marginTop: "5rem",
        }}
      > */}

      <Box sx={{ width: "calc(100vw - 110px)" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <TopViewNav breadcrumbs={breadcrumbs} />
          {/* <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              columnGap: "12px",
            }}
          >
            <IconButton>
              <LocationOnIcon sx={{ fontSize: "32px" }} />
            </IconButton>
            <IconButton onClick={() => handleNavigateCommandConfiguration()}>
              <SettingsRemoteIcon sx={{ fontSize: "32px" }} />
            </IconButton>
          </Box> */}
        </Box>
        <Box sx={{ mt: 1.5 }}>
          <Grid container spacing={2}>
            {/* {boxesData.map((box, index) => (
              <CustomBox
                key={index}
                box={box}
                getAllCardEventCount={getAllCardEventCount}
                calculatePercentage={calculatePercentage}
              />
            ))} */}

            {/* CARD GRID ITEM*/}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container columnSpacing={1} rowSpacing={1}>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                  <CameraEventsCard
                    cameraEventsCardData={getAllData?.data?.eventTypeCountDto}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                  <VehiclesCard
                    vehiclesCardData={getAllData?.data?.eventTypeCountDto}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                  <ComplaintsCard
                    complaintsCardData={getAllData?.data?.eventTypeCountDto}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                  <EventsStatusCard
                    eventsStatusCardData={getAllData?.data?.eventTypeCountDto}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* TABLE AND GRAPHS GRID ITEM */}
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container spacing={1}>
                {/* TABLE GRID ITEM */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={8}>
                  <Box
                    sx={{
                      display: "flex",
                      // backgroundColor: "red",
                      // justifyContent: "flex-start",
                      // gap: 1,
                      alignItems: "center",
                      mb: 1,
                      ".MuiFormLabel-root": {
                        color: "customBlue.dark",
                        // fontWeight: 600,
                        // fontSize: 18,
                      },
                    }}
                  >
                    <Grid container columnSpacing={1} rowSpacing={1}>
                      {/* FIRST LINE FILTERATION */}
                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Autocomplete
                          disablePortal
                          size="small"
                          options={getEventType?.data || []}
                          getOptionLabel={(option) => option.replace(/_/g, " ")}
                          popupIcon={
                            <KeyboardArrowDownIcon
                              sx={{ color: "customBlue.dark" }}
                            />
                          }
                          onChange={(e, newVal) =>
                            handleTableFilterChange("selectedEventType", newVal)
                          }
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
                            <TextField {...params} label="Select Event Type" />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Autocomplete
                          disablePortal
                          size="small"
                          options={
                            getAllVehicleData?.data?.data.map(
                              (item) => item.vehicleNumber
                            ) || []
                          }
                          getOptionLabel={(option) => option}
                          onChange={(e, newVal) =>
                            handleTableFilterChange("vehicleNo", newVal)
                          }
                          popupIcon={
                            <KeyboardArrowDownIcon
                              sx={{ color: "customBlue.dark" }}
                            />
                          }
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
                            <TextField {...params} label="Select Vehicle No." />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <Autocomplete
                          disablePortal
                          size="small"
                          options={
                            getStatusType?.data?.map((item) => item?.status) ||
                            []
                          }
                          getOptionLabel={(option) => option}
                          popupIcon={
                            <KeyboardArrowDownIcon
                              sx={{ color: "customBlue.dark" }}
                            />
                          }
                          onChange={(e, newVal) => {
                            const selectedStatusOption =
                              getStatusType?.data?.find(
                                (option) => option?.status === newVal
                              ) || null;

                            // handleTableFilterChange(
                            //   "selectedStatusType",
                            //   newVal?.replace(/ /g, "_"))
                            handleTableFilterChange(
                              "remarkId",
                              selectedStatusOption?.id
                            );
                          }}
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
                            <TextField {...params} label="Select Status" />
                          )}
                        />
                      </Grid>

                      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                        <TextField
                          size="small"
                          name="searchKey"
                          onChange={(e) =>
                            handleTableFilterChange(
                              e.target.name,
                              e.target.value
                            )
                          }
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton size="small">
                                  <SearchIcon />
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                          label="Search"
                          fullWidth
                        />
                      </Grid>

                      {/* BOTTOM LINE FILTERATION */}

                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <Autocomplete
                          disablePortal
                          size="small"
                          options={getAllDriverData?.data || []}
                          getOptionLabel={(option) =>
                            `${option?.name} - (${option?.dlNumber})`
                          }
                          filterOptions={(options, { inputValue }) => {
                            const lowercasedInput = inputValue?.toLowerCase();
                            return options?.filter(
                              (option) =>
                                option?.name
                                  ?.toLowerCase()
                                  ?.includes(lowercasedInput) ||
                                option?.dlNumber
                                  ?.toLowerCase()
                                  ?.includes(lowercasedInput)
                            );
                          }}
                          renderOption={(props, option) => (
                            <li
                              {...props}
                              key={option?.dlNumber}
                              style={{ whiteSpace: "nowrap" }}
                            >
                              <span>{option?.name}</span>
                              {" - "}(<span>{option?.dlNumber}</span>)
                            </li>
                          )}
                          popupIcon={
                            <KeyboardArrowDownIcon
                              sx={{ color: "customBlue.dark" }}
                            />
                          }
                          onChange={(e, newVal) => {
                            const selectedDriverOption =
                              getAllDriverData?.data?.find(
                                (option) => option?.name === newVal?.name
                              ) || null;

                            setTableFilter((prevData) => ({
                              ...prevData,
                              driverName: selectedDriverOption?.name || "",
                              dlNumber: selectedDriverOption?.dlNumber || "",
                            }));
                          }}
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
                            <TextField {...params} label="Search Driver" />
                          )}
                        />
                      </Grid>

                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="Select From Date & Time"
                            // onChange={(value) =>
                            //   handleChangeEventDetailsFilterationDate(
                            //     "fromDate",
                            //     value
                            //   )
                            // }
                            // renderInput={(params) => (
                            //   <TextField {...params} fullWidth />
                            // )}
                            format="DD/MM/YYYY, hh:mm A"
                            maxDate={today}
                            onAccept={(value) => {
                              console.log(
                                "date time picker from value: ",
                                value
                              );

                              return handleChangeEventDetailsFilterationDate(
                                "fromDate",
                                value
                              );
                            }}
                            slotProps={{
                              textField: {
                                fullWidth: true,
                                size: "small",
                              },

                              field: {
                                clearable: true,
                                onClear: () =>
                                  setTableFilter((prevData) => ({
                                    ...prevData,
                                    fromDate: null,
                                  })),
                                readOnly: true,
                              },

                              actionBar: {
                                actions: ["clear", "accept"],
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>

                      <Grid item xs={4} sm={4} md={4} lg={4} xl={4}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DateTimePicker
                            label="Select To Date & Time"
                            // value={eventDetailsFilterationFormData?.toDate}
                            // onChange={(value) =>
                            //   handleChangeEventDetailsFilterationDate(
                            //     "toDate",
                            //     value
                            //   )
                            // }

                            onAccept={(value) => {
                              console.log("date time picker to value: ", value);

                              return handleChangeEventDetailsFilterationDate(
                                "toDate",
                                value
                              );
                            }}
                            // renderInput={(params) => (
                            //   <TextField {...params} fullWidth />
                            // )}
                            format="DD/MM/YYYY, hh:mm A"
                            maxDate={today}
                            slotProps={{
                              textField: { fullWidth: true, size: "small" },
                              field: {
                                clearable: true,
                                onClear: () =>
                                  setTableFilter((prevData) => ({
                                    ...prevData,
                                    toDate: null,
                                  })),
                                readOnly: true,
                              },

                              actionBar: {
                                actions: ["clear", "accept"],
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Box>
                  <TableComponent
                    getAllData={tableComponentData}
                    getRemarkType={getStatusType?.data}
                    pageNo={pageNo}
                    pageSize={pageSize}
                    handlePageChange={handlePageChange}
                    handleChangeRowsPerPage={handleChangeRowsPerPage}
                    handleChangeSelectedRemarkOption={
                      handleChangeSelectedRemarkOption
                    }
                    handleResetSelectedRemarkOption={
                      handleResetSelectedRemarkOption
                    }
                    handleInputChangeEventRemark={handleInputChangeEventRemark}
                    handleUpdateEventRemark={handleUpdateEventRemark}
                    // isLoading={isLoading}
                  />
                </Grid>

                {/* GRAPHS GRID ITEM */}
                <Grid item xs={12} sm={12} md={12} lg={12} xl={4}>
                  <Grid container spacing={1} sx={{ height: "100%" }}>
                    {/* DONUT CHART GRID ITEM */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={12}
                      sx={{
                        height: {
                          xs: "400px",
                          sm: "400px",
                          md: "100%",
                          lg: "100%",
                          xl: "50%",
                        },
                      }}
                    >
                      <Paper
                        ref={responsiveDonutChartContainerRef}
                        sx={{
                          // height: "24em",
                          backgroundColor: "primary.main",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          margin: "0px",
                          padding: 0,
                          height: "100%",
                        }}
                      >
                        <Box
                          sx={{
                            marginTop: "10px",
                            width: "97%",
                            display: "flex",
                            // justifyContent: "flex-end",
                            justifyContent: "space-between",
                            alignItems: "center",
                            ".MuiTextField-root": {
                              width: "100%",
                              // backgroundColor: "transparent",
                              ".MuiInputBase-root": {
                                color: "text.light",
                                background: "rgba(255, 255, 255, 0.25)",
                              },
                            },
                            ".MuiFormLabel-root": {
                              color: "customPurple.dark",
                              fontWeight: 600,
                              fontSize: 18,
                            },
                            ".css-3zi3c9-MuiInputBase-root-MuiInput-root:before":
                              {
                                borderBottom: (theme) =>
                                  "1px solid customPurple.dark",
                              },
                            ".css-iwadjf-MuiInputBase-root-MuiInput-root:before":
                              {
                                borderBottom: (theme) =>
                                  "1px solid customPurple.dark",
                              },
                          }}
                        >
                          <Box
                            sx={{
                              // position: "absolute",
                              // top: "55%",
                              // left: "50%",
                              // transform: "translate(-50%, -50%)",
                              textAlign: "left",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Grid container>
                              <Grid
                                item
                                xs={6.5}
                                sm={6.5}
                                md={7.5}
                                lg={6.5}
                                xl={6.5}
                              >
                                <Typography
                                  sx={{
                                    color: "text.light",
                                    fontSize: "20px",
                                    fontWeight: "550",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Total Vehicles
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
                                  sx={{
                                    color: "text.light",
                                    fontSize: "20px",
                                    fontWeight: "550",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  :
                                </Typography>
                              </Grid>

                              <Grid item xs={5} sm={5} md={4} lg={5} xl={5}>
                                <Typography
                                  sx={{
                                    color: "text.light",
                                    fontSize: "22px",
                                    fontWeight: "550",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {getAllEventCount?.data?.totalVehicle || 0}
                                </Typography>
                              </Grid>

                              <Grid
                                item
                                xs={6.5}
                                sm={6.5}
                                md={7.5}
                                lg={6.5}
                                xl={6.5}
                              >
                                <Typography
                                  sx={{
                                    color: "text.light",
                                    fontSize: "20px",
                                    fontWeight: "550",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Vehicles Engaged
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
                                  sx={{
                                    color: "text.light",
                                    fontSize: "20px",
                                    fontWeight: "550",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item xs={5} sm={5} md={4} lg={5} xl={5}>
                                <Typography
                                  sx={{
                                    color: "text.light",
                                    fontSize: "22px",
                                    fontWeight: "550",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {getAllEventCount?.data?.vehiclesEngaged || 0}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Box>
                          <Autocomplete
                            options={[
                              "Today",
                              "Yesterday",
                              "This Week",
                              "This Month",
                              "Last Month",
                              "Till Today",
                            ]}
                            disableClearable
                            value={filter.filter}
                            onChange={(e, newVal) => handleChange(newVal)}
                            inputValue={filter.filterInputVal}
                            onInputChange={(e, newVal) =>
                              handleInputValChange(newVal)
                            }
                            clearOnEscape
                            disablePortal
                            popupIcon={
                              <KeyboardArrowDownIcon
                                sx={{ color: "customPurple.dark" }}
                              />
                            }
                            // popupIcon={<KeyboardArrowDownIcon color="red" />}
                            sx={{
                              width: 200,
                              ".MuiInputBase-root": {
                                color: "text.light",
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
                                  borderColor:
                                    "secondary.customContrast !important",
                                },

                              // .css-vaz8fx-MuiAutocomplete-root .MuiOutlinedInput-root.MuiInputBase-sizeSmall{

                              // }
                            }}
                            size="small"
                            clearIcon={<ClearIcon color="primary" />}
                            PaperComponent={(props) => (
                              <Paper
                                sx={{
                                  background: "primary.customContrast",
                                  color: "customGrey.700",
                                  borderRadius: "10px",
                                }}
                                {...props}
                              />
                            )}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                sx={{
                                  "& .MuiOutlinedInput-root": {
                                    borderRadius: 10,
                                  },
                                }}
                              />
                            )}
                          />
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 1,
                            width: "97%",
                            justifyContent: "space-between",
                            alignItems: "center",
                            // bgcolor: "red",
                          }}
                        >
                          <Box sx={{ width: "60%" }}>
                            <ChartComponent
                              dataCount={getAllEventCount?.data}
                            />
                          </Box>
                          <Box
                            sx={{
                              width: "40%",
                              display: "flex",
                              flexDirection: "column",
                              gap: 0.5,
                            }}
                          >
                            {Boolean(boxesData?.length > 0) &&
                              boxesData.map((box, index) => (
                                <React.Fragment key={box.key}>
                                  <CustomChartLabels
                                    box={box}
                                    index={index}
                                    isNotLastElement={Boolean(
                                      index !== boxesData?.length - 1
                                    )}
                                    getAllEventCount={getAllEventCount}
                                    calculatePercentage={calculatePercentage}
                                  />
                                </React.Fragment>
                              ))}
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    {/* HISTOGRAM CHART GRID ITEM */}
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      lg={6}
                      xl={12}
                      sx={{
                        // bgcolor: "red",
                        height: {
                          xs: "400px",
                          sm: "400px",
                          md: "100%",
                          lg: "100%",
                          xl: "50%",
                        },
                      }}
                    >
                      <Paper
                        sx={{
                          backgroundColor: "primary.main",
                          display: "flex",
                          // justifyContent: "flex-start",
                          // alignItems: "center",
                          flexDirection: "column",
                          height: "100%",
                          // bgcolor: "cyan",
                          // maxWidth: { xs: "100%", md: "700px", xl: "920px" },
                          maxWidth: Boolean(responsiveDonutChartContainerWidth)
                            ? responsiveDonutChartContainerWidth
                            : "100%",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            flexGrow: 1,
                            marginTop: 1,
                            alignItems: "center",
                            // justifyContent: "flex-end",
                            justifyContent: "space-between",
                            paddingX: 1,
                            ".MuiTextField-root": {
                              width: "100%",
                              // backgroundColor: "transparent",
                              ".MuiInputBase-root": {
                                color: "text.light",
                                background: "rgba(255, 255, 255, 0.25)",
                              },
                            },
                            ".MuiFormLabel-root": {
                              color: "customPurple.dark",
                              fontWeight: 600,
                              fontSize: 18,
                            },
                            ".css-3zi3c9-MuiInputBase-root-MuiInput-root:before":
                              {
                                borderBottom: (theme) =>
                                  "1px solid customPurple.dark",
                              },
                            ".css-iwadjf-MuiInputBase-root-MuiInput-root:before":
                              {
                                borderBottom: (theme) =>
                                  "1px solid customPurple.dark",
                              },
                          }}
                        >
                          <Grid container spacing={1}>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                              <Box
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                  height: "100%",
                                  alignItems: "center",
                                }}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    fontWeight: 900,
                                    color: "text.light",
                                    // whiteSpace: "nowrap",
                                  }}
                                >
                                  Driver Performance
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                              <Box
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                  height: "100%",
                                  alignItems: "center",
                                }}
                              >
                                <Autocomplete
                                  disablePortal
                                  id="combo-box-demo"
                                  size="small"
                                  options={getAllDriverData?.data || []}
                                  getOptionLabel={(option) =>
                                    `${option?.name} - (${option?.dlNumber})`
                                  }
                                  filterOptions={(options, { inputValue }) => {
                                    const lowercasedInput =
                                      inputValue?.toLowerCase();
                                    return options?.filter(
                                      (option) =>
                                        option?.name
                                          ?.toLowerCase()
                                          ?.includes(lowercasedInput) ||
                                        option?.dlNumber
                                          ?.toLowerCase()
                                          ?.includes(lowercasedInput)
                                    );
                                  }}
                                  fullWidth
                                  // value={selectedDriverPerformanceFilterOption}
                                  onChange={(e, newVal) => {
                                    const selectedDriverOption =
                                      getAllDriverData?.data?.find(
                                        (option) =>
                                          option?.name === newVal?.name
                                      ) || null;

                                    setSelectedDlNumberForDriverPerformanceBarchart(
                                      selectedDriverOption?.dlNumber || null
                                    );
                                  }}
                                  renderOption={(props, option) => (
                                    <li
                                      {...props}
                                      key={option?.dlNumber}
                                      style={{
                                        whiteSpace: "nowrap",
                                        fontSize: "15px",
                                      }}
                                    >
                                      <span>{option?.name}</span>
                                      {" - "}(<span>{option?.dlNumber}</span>)
                                    </li>
                                  )}
                                  PaperComponent={(props) => (
                                    <Paper
                                      sx={{
                                        background: "primary.customContrast",
                                        color: "customGrey.700",
                                        borderRadius: "10px",
                                        width: "200px",
                                        maxHeight: "300px",
                                        overflowY: "auto",
                                      }}
                                      {...props}
                                    />
                                  )}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      id={
                                        selectedDriverPerformanceFilterOption?.key
                                          ? selectedDriverPerformanceFilterOption?.key
                                          : ""
                                      }
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: 10,
                                        },
                                        "& .MuiInputLabel-root": {
                                          color: "text.light", // Change the label color here
                                          fontSize: "17px", // Change the label font size here
                                        },
                                        "& .MuiInputLabel-root.Mui-focused": {
                                          color: "text.light", // Change the label color when focused
                                        },
                                      }}
                                      label="Search Driver"
                                    />
                                  )}
                                  isOptionEqualToValue={(option, value) =>
                                    option?.key === value?.key
                                  }
                                  sx={{
                                    // flexBasis: {
                                    //   xs: "75%",
                                    //   sm: "60%",
                                    //   md: "50%",
                                    // },
                                    // width: 180,
                                    ".MuiInputBase-root": {
                                      color: "text.light",
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
                                        borderColor:
                                          "secondary.customContrast !important",
                                      },
                                  }}
                                />
                              </Box>
                            </Grid>
                            <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                              <Box
                                sx={{
                                  display: "flex",
                                  width: "100%",
                                  height: "100%",
                                  alignItems: "center",
                                }}
                              >
                                <Autocomplete
                                  disablePortal
                                  disableClearable
                                  id="combo-box-demo"
                                  size="small"
                                  options={driverPerformanceFilterOptionArray}
                                  fullWidth
                                  value={selectedDriverPerformanceFilterOption}
                                  onChange={(event, newValue) => {
                                    setSelectedDriverPerformanceFilterOption(
                                      newValue
                                    );
                                  }}
                                  getOptionLabel={(option) =>
                                    option?.value || ""
                                  }
                                  renderOption={(props, option) => (
                                    <li {...props} key={option?.key}>
                                      {option?.value}
                                    </li>
                                  )}
                                  PaperComponent={(props) => (
                                    <Paper
                                      sx={{
                                        background: "primary.customContrast",
                                        color: "customGrey.700",
                                        borderRadius: "10px",
                                      }}
                                      {...props}
                                    />
                                  )}
                                  renderInput={(params) => (
                                    <TextField
                                      {...params}
                                      id={
                                        selectedDriverPerformanceFilterOption?.key
                                          ? selectedDriverPerformanceFilterOption?.key
                                          : ""
                                      }
                                      sx={{
                                        "& .MuiOutlinedInput-root": {
                                          borderRadius: 10,
                                        },
                                      }}
                                    />
                                  )}
                                  isOptionEqualToValue={(option, value) =>
                                    option?.key === value?.key
                                  }
                                  sx={{
                                    // flexBasis: {
                                    //   xs: "75%",
                                    //   sm: "60%",
                                    //   md: "50%",
                                    // },
                                    // width: 180,
                                    ".MuiInputBase-root": {
                                      color: "text.light",
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
                                        borderColor:
                                          "secondary.customContrast !important",
                                      },
                                  }}
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "row",
                            flexGrow: 1,
                            alignItems: "center",
                            justifyContent: "flex-end",
                            paddingX: 1,
                            gap: 1,
                            mt: 1,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: "12px",
                                height: "12px",
                                bgcolor:
                                  customBarchartColors.previousRangeCount,
                              }}
                            />
                            <Typography
                              sx={{
                                color: "primary.customContrast",
                                fontSize: "16px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Previous{" "}
                              {selectedDriverPerformanceFilterOption ===
                              driverPerformanceFilterOptionArray[0]
                                ? "Month"
                                : selectedDriverPerformanceFilterOption ===
                                  driverPerformanceFilterOptionArray[1]
                                ? "Week"
                                : selectedDriverPerformanceFilterOption ===
                                    driverPerformanceFilterOptionArray[2] &&
                                  "Day"}{" "}
                              Performance
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
                            <Box
                              sx={{
                                width: "12px",
                                height: "12px",
                                bgcolor: customBarchartColors.currentRangeCount,
                              }}
                            />
                            <Typography
                              sx={{
                                color: "primary.customContrast",
                                fontSize: "16px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              Current{" "}
                              {selectedDriverPerformanceFilterOption ===
                              driverPerformanceFilterOptionArray[0]
                                ? "Month"
                                : selectedDriverPerformanceFilterOption ===
                                  driverPerformanceFilterOptionArray[1]
                                ? "Week"
                                : selectedDriverPerformanceFilterOption ===
                                    driverPerformanceFilterOptionArray[2] &&
                                  "Day"}{" "}
                              Performance
                            </Typography>
                          </Box>
                        </Box>
                        <Box
                          sx={{
                            // width: Boolean(responsiveDonutChartContainerWidth)
                            //   ? responsiveDonutChartContainerWidth
                            //   : "100%",
                            height: "100%",
                          }}
                        >
                          <BarChartComponent
                            data={getDriverPerformanceData?.data}
                            // relativeContainerWidth={
                            //   responsiveDonutChartContainerWidth
                            // }
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <SnackAlert snack={snack} setSnack={setSnack} />
      </Box>
      <LoadingComponent
        open={
          isGetAllDataLoading ||
          // isGetAllDataFetching ||
          isGetAllEventCountLoading ||
          isGetEventTypeLoading ||
          isGetAllVehicleDataLoading ||
          isGetStatusTypeLoading ||
          isGetDriverPerformanceLoading ||
          updateEventResponse?.isLoading
          // || isGetAllEventCardCountLoading
        }
      />
    </React.Fragment>
  );
};

export default Dashboard;
