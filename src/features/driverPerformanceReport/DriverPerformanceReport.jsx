import React, { useMemo, useState } from "react";
import {
  useGetAllCategoryQuery,
  useGetAllDriverPerformanceDetailsQuery,
  useGetAllDriverQuery,
} from "../../services/driverPerformancereport";
import TopViewNav from "../../components/TopViewNav";
import {
  Autocomplete,
  Box,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import ReportTableComponent from "./ReportTableComponent";
import LoadingComponent from "../../components/LoadingComponent";

const breadcrumbs = [
  { name: "Driver Performance Report", path: "/driverPerformanceReport" },
];

const CustomCategoryMarkerComponent = React.memo(function ({ categoryData }) {
  console.log("dynamic categoryData: ", categoryData);
  return (
    <Grid container>
      <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              backgroundColor: `#${categoryData?.colorCode}`,
            }}
          />
        </Box>
      </Grid>
      <Grid item xs={9} sm={9} md={9} lg={9} xl={9}>
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{ whiteSpace: "nowrap", fontSize: "20px", fontWeight: "550" }}
          >
            {categoryData?.name}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
});

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

const DriverPerformanceReport = () => {
  const today = useMemo(() => dayjs(), []);
  const initialDriverPerformanceTableFilters = {
    driverName: "",
    dlNumber: "",
    toDate: null,
    fromDate: null,
  };

  const [driverPerformanceTableFilters, setDriverPerformanceTableFilters] =
    useState(initialDriverPerformanceTableFilters);

  console.log("driverPerformanceTableFilters: ", driverPerformanceTableFilters);

  // const [driverPerformanceReportData, setDriverPerformanceReportData] =
  //   useState([]);

  const {
    data: getAllDriverPerformanceDetailsData = {
      data: {
        data: [],
        eventTypeCountDto: {},
      },
    },
    isLoading: isgetAllDriverPerformanceDetailsLoading,
    isSuccess: isgetAllDriverPerformanceDetailsSuccess,
  } = useGetAllDriverPerformanceDetailsQuery(
    {
      dlNumber: Boolean(driverPerformanceTableFilters?.dlNumber?.trim())
        ? driverPerformanceTableFilters?.dlNumber?.trim()
        : null,
      fromDate: formatToUTC(driverPerformanceTableFilters?.fromDate),
      toDate: formatToUTC(driverPerformanceTableFilters?.toDate),
    },
    {
      skip:
        (Boolean(formatToUTC(driverPerformanceTableFilters?.fromDate)) &&
          !Boolean(formatToUTC(driverPerformanceTableFilters?.toDate))) ||
        (!Boolean(formatToUTC(driverPerformanceTableFilters?.fromDate)) &&
          Boolean(formatToUTC(driverPerformanceTableFilters?.toDate))),
      refetchOnMountOrArgChange: true,
      pollingInterval: 30000,
    }
  );

  console.log(
    "getAllDriverPerformanceDetailsData: ",
    getAllDriverPerformanceDetailsData
  );
  console.log(
    "isgetAllDriverPerformanceDetailsLoading: ",
    isgetAllDriverPerformanceDetailsLoading
  );
  console.log(
    "isgetAllDriverPerformanceDetailsSuccess : ",
    isgetAllDriverPerformanceDetailsSuccess
  );

  const {
    data: getAllCategoryData = { data: [] },
    isLoading: isGetAllCategoryDataLoading,
    isSuccess: isGetAllCategoryDataSuccess,
  } = useGetAllCategoryQuery();

  console.log("getAllCategoryData: ", getAllCategoryData);
  console.log("isGetAllCategoryDataLoading: ", isGetAllCategoryDataLoading);
  console.log("isGetAllCategoryDataSuccess : ", isGetAllCategoryDataSuccess);

  const {
    data: getAllDriverData = { data: null },
    isLoading: isGetAllDriverDataLoading,
    isSuccess: isGetAllDriverDataSuccess,
  } = useGetAllDriverQuery({ refetchOnMountOrArgChange: true });

  console.log("getAllDriverData: ", getAllDriverData);
  console.log("isGetAllDriverDataLoading: ", isGetAllDriverDataLoading);
  console.log("isGetAllDriverDataSuccess : ", isGetAllDriverDataSuccess);

  const handleChangeEventDetailsFilterationDate = React.useCallback(
    (dateKey, dateValue) => {
      setDriverPerformanceTableFilters((prevData) => ({
        ...prevData,
        [dateKey]: dateValue,
      }));
    },
    []
  );

  // useEffect(() => {
  //   if (Boolean(isgetAllDriverPerformanceDetailsSuccess)) {
  //     setDriverPerformanceReportData(
  //       getAllDriverPerformanceDetailsData?.data?.data || []
  //     );
  //   }
  // }, [
  //   isgetAllDriverPerformanceDetailsSuccess,
  //   getAllDriverPerformanceDetailsData?.data?.data,
  // ]);

  return (
    <React.Fragment>
      <Box sx={{ width: "calc(100vw - 110px)" }}>
        {/* <Box sx={{ width: "100%" }}> */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TopViewNav breadcrumbs={breadcrumbs} />
        </Box>

        <Box sx={{ marginTop: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid
                container
                columnSpacing={1}
                rowSpacing={1}
                sx={{
                  ".MuiFormLabel-root": {
                    color: "customBlue.dark",
                    // fontWeight: 600,
                    // fontSize: 18,
                  },
                }}
              >
                <Grid item xs={4} sm={4} md={4} lg={3} xl={2}>
                  <Autocomplete
                    disablePortal
                    size="small"
                    options={getAllDriverData?.data || []}
                    getOptionLabel={(option) =>
                      `${option?.name} - (${option?.dlNumber})`
                    }
                    filterOptions={(options, { inputValue }) => {
                      const lowercasedInput = inputValue.toLowerCase();
                      return options.filter(
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
                      <li {...props} key={option?.dlNumber}>
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

                      setDriverPerformanceTableFilters((prevData) => ({
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
                      <TextField
                        {...params}
                        label="Search Driver"
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
                <Grid item xs={4} sm={4} md={4} lg={3} xl={2}>
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
                        console.log("date time picker from value: ", value);

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
                            setDriverPerformanceTableFilters((prevData) => ({
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
                <Grid item xs={4} sm={4} md={4} lg={3} xl={2}>
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
                            setDriverPerformanceTableFilters((prevData) => ({
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
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <ReportTableComponent
                getAllData={getAllDriverPerformanceDetailsData.data.data}
                categoryData={getAllCategoryData?.data || []}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Box sx={{ marginTop: 1 }}>
                <Grid container spacing={2}>
                  {Boolean(getAllCategoryData?.data?.length > 0) &&
                    getAllCategoryData?.data?.map((categoryItem, index) => (
                      <Grid
                        key={index}
                        item
                        xs={1.5}
                        sm={1.5}
                        md={1.5}
                        lg={1.5}
                        xl={1.5}
                      >
                        <CustomCategoryMarkerComponent
                          key={index}
                          categoryData={categoryItem}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <LoadingComponent
        open={
          isgetAllDriverPerformanceDetailsLoading ||
          isGetAllCategoryDataLoading ||
          isGetAllDriverDataLoading
        }
      />
    </React.Fragment>
  );
};

export default DriverPerformanceReport;
