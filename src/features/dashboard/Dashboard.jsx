import React from "react";
import {
  Autocomplete,
  Box,
  Divider,
  Grid,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";

import ChartComponent from "./ChartComponent";
// import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import { useTheme } from "@mui/material/styles";

import {
  useGetAllEventCountQuery,
  useGetEventTypeQuery,
  useGetAllEventQuery,
  useGetAllVehicleQuery,
} from "../../services/dashboard";

import LoadingComponent from "../../components/LoadingComponent";
import TableComponent from "./TableComponent";

import { Cookies } from "../../helper/cookies";
import SnackAlert from "../../components/Alert";

const Dashboard = () => {
  const theme = useTheme();

  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });
  // useStates for paginations
  const [pageNo, setPageNo] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);
  // useState for chart component filter
  const [filter, setFilter] = React.useState({
    filter: "This Month",
    filterInputVal: "This Month",
  });

  const [tableFilter, setTableFilter] = React.useState({
    selectedEventType: null,
    vehicleNo: null,
    searchKey: "",
  });

  const [debouncedSearch, setDebouncedSearch] = React.useState("");
  React.useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearch(tableFilter.searchKey);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [tableFilter.searchKey]);

  // extracing the event data for table
  const {
    data: getAllData = {
      data: null,
    },
    isLoading: isGetAllDataLoading,
  } = useGetAllEventQuery(
    {
      pageNo: pageNo,
      pageSize: pageSize,
      eventType: tableFilter.selectedEventType,
      vehicleNo: tableFilter.vehicleNo,
      // searchKey: tableFilter.searchKey,
      searchKey: debouncedSearch,
    },
    {
      refetchOnMountOrArgChange: true,
      pollingInterval: 30000,
    }
  );

  const {
    data: getAllEventCount = {
      data: null,
    },
    isLoading: isGetAllEventCountLoading,
  } = useGetAllEventCountQuery(filter.filter || "This Month", {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  const {
    data: getEventType = {
      data: null,
    },
    isLoading: isGetEventTypeLoading,
  } = useGetEventTypeQuery();

  // getAllVehcile

  const {
    data: getAllVehicleData = {
      data: null,
    },
    isLoading: isGetAllVehicleDataLoading,
  } = useGetAllVehicleQuery();

  const handlePageChange = React.useCallback((event, newpage) => {
    setPageNo(newpage);
  }, []);

  const handleChangeRowsPerPage = React.useCallback((event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPageNo(0);
  }, []);

  const calculatePercentage = React.useCallback((count, total) => {
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

  // array of objects for box(cards) data
  const boxesData = React.useMemo(
    () => [
      // { key: "totalEventCount", title: "Total Events", color: "#B2B0EA" },
      { key: "yawningCount", title: "Yawning ", color: "#43039E" },
      { key: "mobileUsageCount", title: "Mobile use ", color: "#B6308B" },
      {
        key: "distractionCount",
        title: "Distraction ",
        color: "#F79044",
      },
      { key: "smokingCount", title: "Smoking ", color: "#FEBE10" },
      { key: "closeEyesCount", title: "Close eyes ", color: "#0CAFFF" },
      { key: "noFaceCount", title: "No face", color: "#e32636" },
      { key: "lowHeadCount", title: "Low head", color: "#008080" },
      { key: "drinkingCount", title: "Drinking", color: "#a7a6ba" },
    ],
    []
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

  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          marginTop: "5rem",
        }}
      >
        <Box
          sx={{
            px: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{ fontSize: "2rem", fontWeight: "550", color: "#606470" }}
          >
            Dashboard
          </Typography>
          <Typography
            sx={{ fontSize: "1.5rem", fontWeight: "300", color: "gray" }}
          >
            Welcome User
          </Typography>
        </Box>
        <Box sx={{ px: 2, mt: 3 }}>
          <Grid container spacing={2}>
            {boxesData.map((box, index) => (
              <Grid item xs={6} md={4} lg={1.5} sm={6} key={index}>
                <Paper
                  sx={{
                    pb: 3,
                    backgroundColor: theme.palette.secondary.main,
                  }}
                >
                  <Box sx={{ display: "flex", px: 1, py: 2 }}>
                    <Typography
                      sx={{
                        fontWeight: "bold",
                        color: "#000",
                      }}
                      variant="h6"
                    >
                      {box.title}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", px: 2, flexDirection: "column" }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 300,
                        color: "#000",
                      }}
                    >
                      {getAllEventCount?.data?.[box.key] || 0}
                    </Typography>
                    {/* {box.key !== "totalEventCount" && ( */}
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#000",
                      }}
                    >
                      {calculatePercentage(
                        getAllEventCount?.data?.[box.key],
                        getAllEventCount?.data?.totalEventCount
                      )}
                      %
                    </Typography>
                    {/* )} */}
                  </Box>
                </Paper>
              </Grid>
            ))}
            <Grid item xs={12} sm={12} md={6} lg={8}>
              <Box
                sx={{
                  display: "flex",
                  // backgroundColor: "red",
                  justifyContent: "flex-end",
                  gap: 1,
                  mb: 1,
                }}
              >
                <Grid item xs={4} sm={4} md={4} lg={3}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    options={getEventType?.data || []}
                    getOptionLabel={(option) => option.replace(/_/g, " ")}
                    onChange={(e, newVal) =>
                      handleTableFilterChange("selectedEventType", newVal)
                    }
                    sx={{
                      "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover":
                        {
                          backgroundColor: "#E9E5F1",
                          color: "#280071",
                          fontWeight: 600,
                        },
                      "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
                        {
                          backgroundColor: "#E9E5F1",
                          color: "#280071",
                          fontWeight: 600,
                        },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Event Type" />
                    )}
                  />
                </Grid>

                <Grid item xs={4} sm={4} md={4} lg={3}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    // options={getEventType?.data || []}
                    options={
                      getAllVehicleData?.data?.data.map(
                        (item) => item.vehicleNumber
                      ) || []
                    }
                    getOptionLabel={(option) => option}
                    onChange={(e, newVal) =>
                      handleTableFilterChange("vehicleNo", newVal)
                    }
                    sx={{
                      "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover":
                        {
                          backgroundColor: "#E9E5F1",
                          color: "#280071",
                          fontWeight: 600,
                        },
                      "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
                        {
                          backgroundColor: "#E9E5F1",
                          color: "#280071",
                          fontWeight: 600,
                        },
                    }}
                    renderInput={(params) => (
                      <TextField {...params} label="Select Vehicle No." />
                    )}
                  />
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={3}>
                  <TextField
                    size="small"
                    name="searchKey"
                    onChange={(e) =>
                      handleTableFilterChange(e.target.name, e.target.value)
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
              </Box>
              <TableComponent
                getAllData={getAllData?.data}
                pageNo={pageNo}
                pageSize={pageSize}
                handlePageChange={handlePageChange}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                // isLoading={isLoading}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={4}>
              <Paper
                sx={{
                  // height: "24em",
                  backgroundColor: "#5e63b6",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  py: 2,
                  gap: 2,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: "97%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
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
                    onInputChange={(e, newVal) => handleInputValChange(newVal)}
                    clearOnEscape
                    disablePortal
                    popupIcon={<KeyboardArrowDownIcon />}
                    // popupIcon={<KeyboardArrowDownIcon color="red" />}
                    sx={{
                      width: 200,
                      ".MuiInputBase-root": {
                        color: "#fff",
                      },
                      "& + .MuiAutocomplete-popper .MuiAutocomplete-option:hover":
                        {
                          backgroundColor: "#E9E5F1",
                          color: "#280071",
                          fontWeight: 600,
                        },
                      "& + .MuiAutocomplete-popper .MuiAutocomplete-option[aria-selected='true']:hover":
                        {
                          backgroundColor: "#E9E5F1",
                          color: "#280071",
                          fontWeight: 600,
                        },
                    }}
                    size="small"
                    clearIcon={<ClearIcon color="primary" />}
                    PaperComponent={(props) => (
                      <Paper
                        sx={{
                          background: "#fff",
                          color: "#B4B4B4",
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
                <ChartComponent dataCount={getAllEventCount?.data} />
                <Box
                  sx={{
                    width: "70%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                  }}
                >
                  {boxesData
                    .filter((box) => box.key !== "totalEventCount")
                    .map((box, index, arr) => (
                      <React.Fragment key={box.key}>
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
                            <Typography sx={{ color: "#fff" }}>
                              {box.title}
                            </Typography>
                          </Box>
                          <Typography sx={{ color: "#fff" }}>
                            {calculatePercentage(
                              getAllEventCount?.data?.[box.key],
                              getAllEventCount?.data?.totalEventCount
                            )}
                            %
                          </Typography>
                        </Box>
                        {index !== arr.length - 1 && (
                          <Divider sx={{ backgroundColor: "#F9F7FD " }} />
                        )}
                      </React.Fragment>
                    ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
        <SnackAlert snack={snack} setSnack={setSnack} />
      </Box>
      <LoadingComponent
        open={
          isGetAllDataLoading ||
          isGetAllEventCountLoading ||
          isGetEventTypeLoading ||
          isGetAllVehicleDataLoading
        }
      />
    </React.Fragment>
  );
};

export default Dashboard;
