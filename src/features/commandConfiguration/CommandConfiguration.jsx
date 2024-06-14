import {
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import TopViewNav from "../../components/TopViewNav";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import CustomCommandListTableComponent from "./CustomCommandListTableComponent";
import CustomSendCommandListTableComponent from "./CustomSendCommandListTableComponent";

// import tempCommandListData from "./tempCommandListData.json";
// import tempSendCommandListData from "./tempSendCommandListData.json";
// import tempCommandHistoryTrailData from "./tempCommandHistoryTrailData.json";
import LoadingComponent from "../../components/LoadingComponent";
import {
  useCreateCommandMutation,
  useGetAllVehicleQuery,
  useLazyGetCommandDetailsQuery,
  useLazyGetCommandHistoryTrailQuery,
  useSendCommandDetailsMutation,
} from "../../services/commandConfiguration";
import CommandHistoryTrailComponent from "./CommandHistoryTrailComponent";
import SnackAlert from "../../components/Alert";

const breadcrumbs = [
  { name: "Command Configurations", path: "/commandConfiguration" },
];

const CommandHistoryTrailDialog = React.memo(function ({
  commandHistoryTrailDialogOpen,
  handleCloseCommandHistoryTrailDialog,
  commandHistoryTrailComponentData,
}) {
  const theme = useTheme();
  return (
    <Dialog
      open={commandHistoryTrailDialogOpen}
      onClose={handleCloseCommandHistoryTrailDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
      scroll="body"
      sx={{ zIndex: theme.zIndex.modal + 10 }}
    >
      <DialogTitle id="alert-dialog-title">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "30px",
              fontWeight: "550",
              color: "customBlue.dark",
            }}
          >
            Command History
          </Typography>

          <IconButton
            aria-label="close"
            onClick={() => handleCloseCommandHistoryTrailDialog()}
            sx={{
              color: "customBlue.dark",
            }}
          >
            <CloseIcon sx={{ fontSize: "30px" }} />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent
        dividers
        sx={{
          // maxHeight: "80vh",
          // overflow: "auto",
          p: 4,
        }}
      >
        {/* <Paper
          sx={{
            p: 4,
          }}
        > */}
        <CommandHistoryTrailComponent
          commandHistoryTrailComponentData={commandHistoryTrailComponentData}
        />
        {/* </Paper> */}
      </DialogContent>
    </Dialog>
  );
});

const AddCommandModal = React.memo(function ({
  addCommandModalOpen,
  handleCreateCommand,
  handleCloseAddCommandModal,
}) {
  const theme = useTheme();
  const initialAddCommandFormData = React.useMemo(
    () => ({
      description: "",
      command: "",
      commandDetalis: "",
    }),
    []
  );

  const [addCommandFormData, setAddCommandFormData] = useState(
    initialAddCommandFormData
  );

  console.log("addCommandFormData: ", addCommandFormData);

  const handleAddCommandFormDataOnChange = React.useCallback((e) => {
    const { name, value } = e.target;

    setAddCommandFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleInternalCloseAddCommandModal = React.useCallback(() => {
    setAddCommandFormData(initialAddCommandFormData);
    handleCloseAddCommandModal();
  }, [handleCloseAddCommandModal, initialAddCommandFormData]);

  const handleCreateCommandOnSubmit = React.useCallback(
    (e) => {
      handleCreateCommand(
        e,
        addCommandFormData,
        handleInternalCloseAddCommandModal
      );
    },
    [
      handleCreateCommand,
      addCommandFormData,
      handleInternalCloseAddCommandModal,
    ]
  );
  return (
    <Modal
      open={addCommandModalOpen}
      onClose={handleCloseAddCommandModal}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      sx={{ zIndex: theme.zIndex.modal + 10 }}
    >
      <Paper
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          // width: 400,
          width: "700px",
          height: "330px",
          bgcolor: "primary.customContrast",
          boxShadow: 24,
          px: 4,
          py: 2,
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Typography sx={{ fontSize: "30px", fontWeight: 600 }}>
            Add Command
          </Typography>
        </Box>
        <form onSubmit={handleCreateCommandOnSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                size="medium"
                name="description"
                value={addCommandFormData?.description || ""}
                onChange={(e) => handleAddCommandFormDataOnChange(e)}
                label="Description"
                fullWidth
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={6} xl={6}>
              <TextField
                size="medium"
                name="command"
                value={addCommandFormData?.command || ""}
                onChange={(e) => handleAddCommandFormDataOnChange(e)}
                label="Command"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <TextField
                name="commandDetalis"
                value={addCommandFormData?.commandDetalis || ""}
                onChange={(e) => handleAddCommandFormDataOnChange(e)}
                label="Command Details"
                multiline
                rows={4}
                // maxRows={4}
                fullWidth
                required
                InputProps={{
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
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  gap: 2,
                }}
              >
                <Button
                  variant="outlined"
                  onClick={handleInternalCloseAddCommandModal}
                >
                  Cancel
                </Button>
                <Button variant="contained" type="submit">
                  Add
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Modal>
  );
});

const CommandConfiguration = () => {
  const theme = useTheme();
  const loginData = React.useMemo(() => {
    const sessionedLoginData = sessionStorage.getItem("data");
    return sessionedLoginData ? JSON.parse(sessionedLoginData) : null;
  }, []);

  console.log("loginData in commandConfiguration: ", loginData);
  const [commandListpageNo, setCommandListPageNo] = React.useState(0);
  const [commandListpageSize, setCommandListPageSize] = React.useState(25);
  const [sendCommandListpageNo, setSendCommandListPageNo] = React.useState(0);
  const [sendCommandListpageSize, setSendCommandListPageSize] =
    React.useState(25);
  const [commandHistoryTrailDialogOpen, setCommandHistoryTrailDialogOpen] =
    useState(false);
  const [
    commandHistoryTrailComponentData,
    setCommandHistoryTrailComponentData,
  ] = useState([]);
  const [addCommandModalOpen, setAddCommandModalOpen] = useState(false);
  const [snack, setSnack] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const initialCommandConfigurationSearchFormData = {
    vehicle: {
      id: null,
      vehicleNumber: "",
    },
    imeiNo: "",
    model: "",
  };

  const [
    commandConfigurationSearchFormData,
    setCommandConfigurationSearchFormData,
  ] = useState(initialCommandConfigurationSearchFormData);

  console.log(
    "commandConfigurationSearchFormData: ",
    commandConfigurationSearchFormData
  );

  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  console.log("selectedVehicleDetails: ", selectedVehicleDetails);

  const [vehicles, setVehicles] = useState([]);

  console.log("vehicles: ", vehicles);

  const [
    getCommandDetailsForCommandList,
    getCommandDetailsForCommandListResponse,
  ] = useLazyGetCommandDetailsQuery();
  const [
    getCommandDetailsForSendCommandList,
    getCommandDetailsForSendCommandListResponse,
  ] = useLazyGetCommandDetailsQuery();

  const [getCommandHistoryTrail, getCommandHistoryTrailResponse] =
    useLazyGetCommandHistoryTrailQuery();

  const [createCommand, createCommandResponse] = useCreateCommandMutation();

  const {
    data: getAllVehicleData = {
      data: null,
    },
    isLoading: isGetAllVehicleDataLoading,
    isSuccess: getAllVehicleDataSuccess,
  } = useGetAllVehicleQuery();

  const [sendCommand, sendCommandResponse] = useSendCommandDetailsMutation();
  console.log("sendCommandResponse: ", sendCommandResponse);

  const [commandListData, setCommandListData] = useState([]);
  const [sendCommandListData, setSendCommandListData] = useState([]);

  console.log("commandListData: ", commandListData);
  console.log("sendCommandListData: ", sendCommandListData);

  console.log("createCommandResponse: ", createCommandResponse);

  const handleCommandListTablePageChange = React.useCallback(
    (event, newpage) => {
      setCommandListPageNo(newpage);
      getCommandDetailsForCommandList({
        pageNo: newpage,
        pageSize: commandListpageSize,
        vechileId: selectedVehicleDetails?.id || "",
        imeiNumber: selectedVehicleDetails?.imeiNo,
      })
        .unwrap()
        .then((res) => {
          console.log("getCommandDetailsForCommandList api response: ", res);
          setCommandListData(res?.data || []);
        })
        .catch((err) => {
          console.error("getCommandDetailsForCommandList api error: ", err);
        });
    },
    [
      commandListpageSize,
      getCommandDetailsForCommandList,
      selectedVehicleDetails?.imeiNo,
      selectedVehicleDetails?.id,
    ]
  );

  const handleChangeCommandListTableRowsPerPage = React.useCallback(
    (event) => {
      setCommandListPageSize(parseInt(event.target.value, 10));
      setCommandListPageNo(0);
      getCommandDetailsForCommandList({
        pageNo: 0,
        pageSize: parseInt(event.target.value, 10),
        vechileId: selectedVehicleDetails?.id || "",
        imeiNumber: selectedVehicleDetails?.imeiNo,
      })
        .unwrap()
        .then((res) => {
          console.log("getCommandDetailsForCommandList api response: ", res);
          setCommandListData(res?.data || []);
        })
        .catch((err) => {
          console.error("getCommandDetailsForCommandList api error: ", err);
        });
    },
    [
      getCommandDetailsForCommandList,
      selectedVehicleDetails?.imeiNo,
      selectedVehicleDetails?.id,
    ]
  );

  const handleSendCommandListTablePageChange = React.useCallback(
    (event, newpage) => {
      setSendCommandListPageNo(newpage);
      getCommandDetailsForSendCommandList({
        pageNo: newpage,
        pageSize: sendCommandListpageSize,
        vechileId: selectedVehicleDetails?.id || "",
        imeiNumber: selectedVehicleDetails?.imeiNo,
      })
        .unwrap()
        .then((res) => {
          console.log(
            "getCommandDetailsForSendCommandList api response: ",
            res
          );
          setSendCommandListData(res?.data || []);
        })
        .catch((err) => {
          console.error("getCommandDetailsForSendCommandList api error: ", err);
        });
    },
    [
      getCommandDetailsForSendCommandList,
      selectedVehicleDetails?.imeiNo,
      selectedVehicleDetails?.id,
      sendCommandListpageSize,
    ]
  );

  const handleChangeSendCommandListTableRowsPerPage = React.useCallback(
    (event) => {
      setSendCommandListPageSize(parseInt(event.target.value, 10));
      setSendCommandListPageNo(0);
      getCommandDetailsForSendCommandList({
        pageNo: 0,
        pageSize: parseInt(event.target.value, 10),
        vechileId: selectedVehicleDetails?.id || "",
        imeiNumber: selectedVehicleDetails?.imeiNo,
      })
        .unwrap()
        .then((res) => {
          console.log(
            "getCommandDetailsForSendCommandList api response: ",
            res
          );
          setSendCommandListData(res?.data || []);
        })
        .catch((err) => {
          console.error("getCommandDetailsForSendCommandList api error: ", err);
        });
    },
    [
      getCommandDetailsForSendCommandList,
      selectedVehicleDetails?.imeiNo,
      selectedVehicleDetails?.id,
    ]
  );

  const handleGetCommandListOnGo = React.useCallback(() => {
    if (!Boolean(commandConfigurationSearchFormData?.vehicle?.id)) {
      setSnack({
        open: true,
        message: "Please Choose Either Vechicle Number or IMEI Number !",
        severity: "warning",
      });
      return;
    }

    let getCommandDetailsForCommandListErrorAtGo = false;
    let getCommandDetailsForSendCommandListErrorAtGo = false;
    setCommandListPageNo(0);
    setSendCommandListPageNo(0);

    getCommandDetailsForCommandList({
      pageNo: 0,
      pageSize: commandListpageSize,
      vechileId: commandConfigurationSearchFormData?.vehicle?.id,
      imeiNumber: commandConfigurationSearchFormData?.imeiNo,
    })
      .unwrap()
      .then((res) => {
        console.log("getCommandDetailsForCommandList api response: ", res);
        setSelectedVehicleDetails(
          vehicles?.find(
            (vehicle) =>
              vehicle?.id === commandConfigurationSearchFormData?.vehicle?.id
          ) || null
        );
        setCommandListData(res?.data || []);
        getCommandDetailsForCommandListErrorAtGo = false;
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: err?.data?.message || err?.data,
          severity: "error",
        });
        console.error("getCommandDetailsForCommandList api error: ", err);
        getCommandDetailsForCommandListErrorAtGo = true;
      });

    getCommandDetailsForSendCommandList({
      pageNo: 0,
      pageSize: sendCommandListpageSize,
      vechileId: commandConfigurationSearchFormData?.vehicle?.id,
      imeiNumber: commandConfigurationSearchFormData?.imeiNo,
    })
      .unwrap()
      .then((res) => {
        console.log("getCommandDetailsForSendCommandList api response: ", res);
        setSelectedVehicleDetails(
          vehicles?.find(
            (vehicle) =>
              vehicle?.id === commandConfigurationSearchFormData?.vehicle?.id
          ) || null
        );
        setSendCommandListData(res?.data || []);
        getCommandDetailsForSendCommandListErrorAtGo = false;
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: err?.data?.message || err?.data,
          severity: "error",
        });
        console.error("getCommandDetailsForSendCommandList api error: ", err);
        getCommandDetailsForSendCommandListErrorAtGo = true;
      });

    if (
      Boolean(getCommandDetailsForCommandListErrorAtGo) ||
      Boolean(getCommandDetailsForSendCommandListErrorAtGo)
    ) {
      setSelectedVehicleDetails(null);
    }
  }, [
    commandConfigurationSearchFormData?.imeiNo,
    commandConfigurationSearchFormData?.vehicle?.id,
    commandListpageSize,
    getCommandDetailsForCommandList,
    getCommandDetailsForSendCommandList,
    sendCommandListpageSize,
    vehicles,
  ]);

  const handleReFetchCommandListOnCommandCreation = React.useCallback(() => {
    // debugger;
    if (!Boolean(selectedVehicleDetails?.id)) {
      setSnack({
        open: true,
        message: "Please Choose Either Vechicle Number or IMEI Number !",
        severity: "warning",
      });
    }

    const cacheBuster = new Date().getTime();
    let getCommandDetailsForCommandListErrorAtGo = false;
    let getCommandDetailsForSendCommandListErrorAtGo = false;
    setCommandListPageNo(0);
    setSendCommandListPageNo(0);

    getCommandDetailsForCommandList({
      pageNo: 0,
      pageSize: commandListpageSize,
      vechileId: selectedVehicleDetails?.id,
      imeiNumber: selectedVehicleDetails?.imeiNo,
      cacheBuster: cacheBuster,
    })
      .unwrap()
      .then((res) => {
        console.log("getCommandDetailsForCommandList api response: ", res);
        // setSelectedVehicleDetails(
        //   vehicles?.find(
        //     (vehicle) =>
        //       vehicle?.vehicleNumber ===
        //       selectedVehicleDetails?.vehicle?.vehicleNumber
        //   ) || null
        // );
        setCommandListData(res?.data || []);
        getCommandDetailsForCommandListErrorAtGo = false;
      })
      .catch((err) => {
        console.error("getCommandDetailsForCommandList api error: ", err);
        getCommandDetailsForCommandListErrorAtGo = true;
      });

    getCommandDetailsForSendCommandList({
      pageNo: 0,
      pageSize: sendCommandListpageSize,
      vechileId: selectedVehicleDetails?.id,
      imeiNumber: selectedVehicleDetails?.imeiNo,
      cacheBuster: cacheBuster,
    })
      .unwrap()
      .then((res) => {
        console.log("getCommandDetailsForSendCommandList api response: ", res);
        // setSelectedVehicleDetails(
        //   vehicles?.find(
        //     (vehicle) =>
        //       vehicle?.vehicleNumber ===
        //       selectedVehicleDetails?.vehicle?.vehicleNumber
        //   ) || null
        // );
        setSendCommandListData(res?.data || []);
        getCommandDetailsForSendCommandListErrorAtGo = false;
      })
      .catch((err) => {
        console.error("getCommandDetailsForSendCommandList api error: ", err);
        getCommandDetailsForSendCommandListErrorAtGo = true;
      });

    if (
      Boolean(getCommandDetailsForCommandListErrorAtGo) ||
      Boolean(getCommandDetailsForSendCommandListErrorAtGo)
    ) {
      setSelectedVehicleDetails(null);
    }
  }, [
    selectedVehicleDetails?.imeiNo,
    selectedVehicleDetails?.id,
    commandListpageSize,
    getCommandDetailsForCommandList,
    getCommandDetailsForSendCommandList,
    sendCommandListpageSize,
    // vehicles,
  ]);

  const handleCreateCommand = React.useCallback(
    (e, addCommandFormData, handleInternalCloseAddCommandModal) => {
      e.preventDefault();

      if (
        !Boolean(selectedVehicleDetails) ||
        !Boolean(selectedVehicleDetails?.vehicleNumber)
      ) {
        setSnack({
          open: true,
          message: "No Vechicle has Been Chosen !",
          severity: "warning",
        });
        return;
      }

      if (
        !Boolean(addCommandFormData?.description) ||
        !Boolean(addCommandFormData?.command) ||
        !Boolean(addCommandFormData?.commandDetalis)
      ) {
        setSnack({
          open: true,
          message: "All Fields Are Mandatory !",
          severity: "warning",
        });
        return;
      }

      const payload = {
        description: addCommandFormData?.description || "",
        vechile_id: selectedVehicleDetails?.id || null,
        vechileNumber: selectedVehicleDetails?.vehicleNumber || null,
        imeiNumber: selectedVehicleDetails?.imeiNo || "",
        commandDetalis: addCommandFormData?.commandDetalis || "",
        command: addCommandFormData?.command || "",
      };

      console.log("addCommand payload: ", payload);

      createCommand(payload)
        .unwrap()
        .then((res) => {
          console.log("createCommand res: ", res);
          setSnack({
            open: true,
            message: "Command Created Successfully",
            severity: "success",
          });
          handleInternalCloseAddCommandModal();
          handleReFetchCommandListOnCommandCreation();
        })
        .catch((err) => {
          console.error("createCommand err:", err);
          setSnack({
            open: true,
            message: err?.data?.message || err?.data,
            severity: "error",
          });
        });
    },
    [
      selectedVehicleDetails,
      createCommand,
      handleReFetchCommandListOnCommandCreation,
    ]
  );

  const handleSendCommandListCellInputChange = React.useCallback(
    (e, rowNumber) => {
      let inputValue = e?.target?.value;
      setSendCommandListData((prevData) => {
        console.log(
          "handleSendCommandListCellInputChange prevData: ",
          prevData
        );
        return {
          ...prevData,
          data: prevData?.data?.map((item) => {
            if (item?.id === rowNumber) {
              return {
                ...item,
                midCommand: inputValue,
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

  const handleSendCommandInSendEventList = React.useCallback(
    (rowData) => {
      console.log("rowData: ", rowData);

      if (!Boolean(rowData?.midCommand)) {
        setSnack({
          open: true,
          message: "Please add a command to send !",
          severity: "warning",
        });
        return;
      }
      const concatenatedCommand =
        rowData?.baseCommand + rowData?.midCommand + rowData?.endCommand;
      console.log("concatenatedCommand: ", concatenatedCommand);

      const payload = {
        command: concatenatedCommand,
        deviceId: selectedVehicleDetails?.deviceId || "",
        // baseCommand: rowData?.baseCommand,
        // endCommand: rowData?.endCommand,
        description: rowData?.description || "",
        userId: loginData?.userId || null,
        vechileId: selectedVehicleDetails?.id || null,
        useCommand: rowData?.command || "",
      };

      sendCommand(payload)
        .unwrap()
        .then((res) => {
          console.log("send command res: ", res);
          setSnack({
            open: true,
            message: res?.message,
            severity: "success",
          });

          setSendCommandListData((prevData) => {
            console.log(
              "handleSendCommandListCellInputChange prevData: ",
              prevData
            );
            return {
              ...prevData,
              data: prevData?.data?.map((item) => {
                if (item?.id === rowData?.id) {
                  const { midCommand, ...rest } = item;
                  return rest;
                } else {
                  return item;
                }
              }),
            };
          });
        })
        .catch((err) => {
          console.error("send command error: ", err);
          setSnack({
            open: true,
            message: err?.data?.message || err?.data,
            severity: "error",
          });
        });
    },
    [selectedVehicleDetails, sendCommand, loginData?.userId]
  );

  const handleOpenCommandHistoryTrailDialog = React.useCallback(() => {
    const params = {
      vechileId: commandConfigurationSearchFormData?.vehicle?.id || null,
    };
    getCommandHistoryTrail(params)
      .unwrap()
      .then((res) => {
        console.log("COMMAND HISTORY TRAIL RES: ", res);
        setCommandHistoryTrailComponentData(res?.data || []);
      })
      .catch((err) => {
        setSnack({
          open: true,
          message: err?.data?.message || err?.data,
          severity: "error",
        });
        console.error("COMMAND HISTORY TRAIL ERROR: ", err);
        setCommandHistoryTrailComponentData([]);
      });
    setCommandHistoryTrailDialogOpen(true);
  }, [getCommandHistoryTrail, commandConfigurationSearchFormData?.vehicle?.id]);
  const handleCloseCommandHistoryTrailDialog = React.useCallback(() => {
    setCommandHistoryTrailDialogOpen(false);
  }, []);

  const handleOpenAddCommandOpen = React.useCallback(() => {
    setAddCommandModalOpen(true);
  }, []);

  const handleCloseAddCommandModal = React.useCallback(() => {
    setAddCommandModalOpen(false);
  }, []);
  useEffect(() => {
    if (getAllVehicleDataSuccess) {
      setVehicles(getAllVehicleData?.data?.data || []);
    }
  }, [getAllVehicleDataSuccess, getAllVehicleData?.data?.data]);

  return (
    <React.Fragment>
      <Box sx={{ width: "calc(100vw - 110px)" }}>
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

        {/* SEARCHES AND FILTERATIONS = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            mt: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              {" "}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                // sx={{ width: "100%", mt: "10px" }}
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
                size="small"
                options={vehicles}
                fullWidth
                value={
                  commandConfigurationSearchFormData?.vehicle &&
                  vehicles?.some(
                    (vehicle) =>
                      vehicle?.vehicleNumber ===
                      commandConfigurationSearchFormData?.vehicle?.vehicleNumber
                  )
                    ? commandConfigurationSearchFormData?.vehicle
                    : null
                }
                onInputChange={(event, newValue) => {
                  const selectedVehicle = vehicles.find(
                    (vehicle) => vehicle?.vehicleNumber === newValue
                  );

                  setCommandConfigurationSearchFormData({
                    ...commandConfigurationSearchFormData,
                    vehicle: {
                      id: selectedVehicle ? selectedVehicle?.id : null,
                      vehicleNumber: selectedVehicle
                        ? selectedVehicle?.vehicleNumber
                        : "",
                    },
                    imeiNo: selectedVehicle ? selectedVehicle?.imeiNo : "",
                    model: selectedVehicle ? selectedVehicle?.model : "",
                  });
                }}
                getOptionLabel={(option) => option?.vehicleNumber || ""}
                renderOption={(props, option) => (
                  <li {...props} key={option?.id}>
                    {option?.vehicleNumber}
                  </li>
                )}
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
                    label="Search Vehicle"
                    id={
                      commandConfigurationSearchFormData?.vehicle?.id
                        ? String(
                            commandConfigurationSearchFormData?.vehicle?.id
                          )
                        : ""
                    }
                    value={
                      commandConfigurationSearchFormData?.vehicle?.vehicleNumber
                        ? commandConfigurationSearchFormData?.vehicle
                            ?.vehicleNumber
                        : ""
                    }
                    sx={{
                      "& .MuiInputLabel-root": {
                        color: "customBlue.dark", // Change the label color here
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "customBlue.dark", // Change the label color when focused
                      },
                    }}
                    // required
                  />
                )}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                //THIS IS onChange NOT onInputChange
                onChange={(event, newValue) => {
                  if (!newValue) {
                    setCommandConfigurationSearchFormData({
                      ...commandConfigurationSearchFormData,
                      vehicle: { id: null, vehicleNumber: "" },
                      imeiNo: "",
                      model: "",
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              {" "}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
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
                options={vehicles}
                fullWidth
                value={
                  commandConfigurationSearchFormData?.vehicle &&
                  vehicles?.some(
                    (vehicle) =>
                      vehicle?.imeiNo ===
                      commandConfigurationSearchFormData?.imeiNo
                  )
                    ? vehicles.find(
                        (vehicle) =>
                          vehicle?.imeiNo ===
                          commandConfigurationSearchFormData?.imeiNo
                      )
                    : null
                }
                onInputChange={(event, newValue) => {
                  const selectedVehicle = vehicles.find(
                    (vehicle) => vehicle?.imeiNo === newValue
                  );
                  setCommandConfigurationSearchFormData({
                    ...commandConfigurationSearchFormData,
                    vehicle: {
                      id: selectedVehicle ? selectedVehicle?.id : null,
                      vehicleNumber: selectedVehicle
                        ? selectedVehicle?.vehicleNumber
                        : "",
                    },
                    imeiNo: selectedVehicle ? selectedVehicle?.imeiNo : "",
                    model: selectedVehicle ? selectedVehicle?.model : "",
                  });
                }}
                getOptionLabel={(option) => option?.imeiNo || ""}
                renderOption={(props, option) => (
                  <li {...props} key={option?.id}>
                    {option?.imeiNo}
                  </li>
                )}
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
                    label="Search IMEI"
                    id={
                      commandConfigurationSearchFormData?.imeiNo
                        ? String(commandConfigurationSearchFormData?.imeiNo)
                        : ""
                    }
                    value={
                      commandConfigurationSearchFormData?.imeiNo
                        ? commandConfigurationSearchFormData?.imeiNo
                        : ""
                    }
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
                isOptionEqualToValue={(option, value) =>
                  option?.imeiNo === value?.imeiNo
                }
                onChange={(event, newValue) => {
                  if (!newValue) {
                    setCommandConfigurationSearchFormData({
                      ...commandConfigurationSearchFormData,
                      vehicle: { id: null, vehicleNumber: "" },
                      imeiNo: "",
                      model: "",
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={2} sm={2} md={2} lg={2} xl={2}>
              {" "}
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                size="small"
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
                options={vehicles}
                fullWidth
                value={
                  commandConfigurationSearchFormData?.vehicle &&
                  vehicles?.some(
                    (vehicle) =>
                      vehicle?.model ===
                      commandConfigurationSearchFormData?.model
                  )
                    ? vehicles.find(
                        (vehicle) =>
                          vehicle?.model ===
                          commandConfigurationSearchFormData?.model
                      )
                    : null
                }
                onInputChange={(event, newValue) => {
                  const selectedVehicle = vehicles.find(
                    (vehicle) => vehicle?.model === newValue
                  );

                  setCommandConfigurationSearchFormData({
                    ...commandConfigurationSearchFormData,
                    vehicle: {
                      id: selectedVehicle ? selectedVehicle?.id : null,
                      vehicleNumber: selectedVehicle
                        ? selectedVehicle?.vehicleNumber
                        : "",
                    },
                    imeiNo: selectedVehicle ? selectedVehicle?.imeiNo : "",
                    model: selectedVehicle ? selectedVehicle?.model : "",
                  });
                }}
                getOptionLabel={(option) => option?.model || ""}
                renderOption={(props, option) => (
                  <li {...props} key={option?.id}>
                    {option?.model}
                  </li>
                )}
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
                    label="Search Device Modal"
                    id={
                      commandConfigurationSearchFormData?.model
                        ? String(commandConfigurationSearchFormData?.model)
                        : ""
                    }
                    value={
                      commandConfigurationSearchFormData?.model
                        ? commandConfigurationSearchFormData?.model
                        : ""
                    }
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
                isOptionEqualToValue={(option, value) =>
                  option?.model === value?.model
                }
                onChange={(event, newValue) => {
                  if (!newValue) {
                    setCommandConfigurationSearchFormData({
                      ...commandConfigurationSearchFormData,
                      vehicle: { id: null, vehicleNumber: "" },
                      imeiNo: "",
                      model: "",
                    });
                  }
                }}
              />
            </Grid>
            <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
              <Button
                variant="contained"
                disabled={
                  !Boolean(commandConfigurationSearchFormData?.imeiNo) ||
                  !Boolean(commandConfigurationSearchFormData?.vehicle?.id) ||
                  !Boolean(
                    commandConfigurationSearchFormData?.vehicle?.vehicleNumber
                  )
                }
                sx={{ width: "5em" }}
                onClick={() => handleGetCommandListOnGo()}
              >
                GO
              </Button>
            </Grid>
            <Grid item xs={4.5} sm={4.5} md={4.5} lg={4.5} xl={4.5} />
            {Boolean(selectedVehicleDetails) && (
              <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => handleOpenCommandHistoryTrailDialog()}
                    sx={{
                      paddingX: "10px",
                      border: "2px solid",
                      fontWeight: "550",
                    }}
                  >
                    HISTORY
                  </Button>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        {/* SELCTED VEHICLE DETAILS  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =  */}
        {/* {Boolean(selectedVehicleDetails) && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              mt: 2,
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Grid container>
                  <Grid item xs={5} sm={3.5} md={4.5} lg={4.5} xl={4.5}>
                    <Typography
                      sx={{
                        fontSize: "23px",
                        fontWeight: "550",
                        color: "customBlue.dark",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Vehicle No.
                    </Typography>
                  </Grid>
                  <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                    <Typography
                      sx={{
                        fontSize: "23px",
                        fontWeight: "550",
                        color: "customBlue.dark",
                      }}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={6.5} sm={8} md={7} lg={7} xl={7}>
                    <Typography
                      component="span"
                      sx={{
                        fontSize: "23px",
                        color: "customNavyBlue.main",
                        wordBreak: "break-all",
                      }}
                    >
                      {selectedVehicleDetails?.vehicleNumber || "NA"}
                    </Typography>
                  </Grid>
                </Grid>
         
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
                <Grid container>
                  <Grid item xs={5} sm={3.5} md={3.5} lg={3.5} xl={3.5}>
                    <Typography
                      sx={{
                        fontSize: "23px",
                        fontWeight: "550",
                        color: "customBlue.dark",
                        whiteSpace: "nowrap",
                      }}
                    >
                      IMEI No.
                    </Typography>
                  </Grid>
                  <Grid item xs={0.5} sm={0.5} md={0.5} lg={0.5} xl={0.5}>
                    <Typography
                      sx={{
                        fontSize: "23px",
                        fontWeight: "550",
                        color: "customBlue.dark",
                      }}
                    >
                      :
                    </Typography>
                  </Grid>
                  <Grid item xs={6.5} sm={8} md={8} lg={8} xl={8}>
                    <Typography
                      component="span"
                      sx={{ fontSize: "23px", color: "customNavyBlue.main" }}
                    >
                      {selectedVehicleDetails?.imeiNo || "NA"}
                    </Typography>
                  </Grid>
                </Grid>
          
              </Grid>
            </Grid>
          </Box>
        )} */}

        {/* CONFIGURATION CONTAINER = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = */}

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            mt: 4.5,
          }}
        >
          {Boolean(selectedVehicleDetails) && (
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid container>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <Grid container>
                      <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                        <Grid container>
                          <Grid item xs={12} sm={12} md={4.5} lg={6} xl={6}>
                            <Grid container>
                              <Grid
                                item
                                xs={5}
                                sm={3.5}
                                md={4.5}
                                lg={4.5}
                                xl={4.5}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    fontWeight: "550",
                                    color: "customBlue.dark",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  Vehicle No.
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
                                    fontSize: "18px",
                                    fontWeight: "550",
                                    color: "customBlue.dark",
                                  }}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item xs={6.5} sm={8} md={7} lg={7} xl={7}>
                                <Typography
                                  component="span"
                                  sx={{
                                    fontSize: "18px",
                                    color: "customNavyBlue.main",
                                    wordBreak: "break-all",
                                  }}
                                >
                                  {selectedVehicleDetails?.vehicleNumber ||
                                    "NA"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item xs={12} sm={12} md={4.5} lg={6} xl={6}>
                            <Grid container>
                              <Grid
                                item
                                xs={5}
                                sm={3.5}
                                md={3.5}
                                lg={3.5}
                                xl={3.5}
                              >
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    fontWeight: "550",
                                    color: "customBlue.dark",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  IMEI No.
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
                                    fontSize: "18px",
                                    fontWeight: "550",
                                    color: "customBlue.dark",
                                  }}
                                >
                                  :
                                </Typography>
                              </Grid>
                              <Grid item xs={6.5} sm={8} md={8} lg={8} xl={8}>
                                <Typography
                                  component="span"
                                  sx={{
                                    fontSize: "18px",
                                    color: "customNavyBlue.main",
                                  }}
                                >
                                  {selectedVehicleDetails?.imeiNo || "NA"}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <IconButton
                            size="small"
                            sx={{
                              marginRight: "10px",
                              bgcolor: "primary.main",
                              "&:hover": {
                                backgroundColor: theme.palette.primary.dark,
                              },
                            }}
                            onClick={() => handleOpenAddCommandOpen()}
                          >
                            <AddIcon sx={{ color: "text.light" }} />
                          </IconButton>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid
                item
                xs={12}
                ms={12}
                md={12}
                lg={6}
                xl={6}
                sx={{ paddingX: "5px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      height: "35px",
                      alignItems: "center",
                      justifyContent: "space-between",
                      bgcolor: "primary.main",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        px: "5px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "text.light",
                          fontWeight: "550",
                          fontSize: "17px",
                        }}
                      >
                        COMMANDS LIST
                      </Typography>
                      {/* <Typography>GTOCN</Typography> */}
                    </Box>
                  </Box>
                  <Paper
                    sx={{
                      flexGrow: 1,
                      width: "100%",
                      mt: 1.5,
                    }}
                  >
                    <CustomCommandListTableComponent
                      commandListData={commandListData}
                      pageNo={commandListpageNo}
                      pageSize={commandListpageSize}
                      handlePageChange={handleCommandListTablePageChange}
                      handleChangeRowsPerPage={
                        handleChangeCommandListTableRowsPerPage
                      }
                    />
                  </Paper>
                </Box>
              </Grid>
              <Grid
                item
                xs={12}
                ms={12}
                md={12}
                lg={6}
                xl={6}
                sx={{ paddingX: "5px" }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      height: "35px",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      paddingX: "10px",
                      bgcolor: "primary.main",
                      width: "100%",
                    }}
                  >
                    <Box sx={{ display: "flex", flexDirection: "row" }}>
                      <Typography
                        sx={{
                          color: "text.light",
                          fontWeight: "550",
                          fontSize: "17px",
                        }}
                      >
                        SEND COMMANDS LIST
                      </Typography>
                      {/* <Typography>GTOCN</Typography> */}
                    </Box>
                  </Box>
                  <Paper
                    sx={{
                      flexGrow: 1,
                      width: "100%",
                      mt: 1.5,
                    }}
                  >
                    <CustomSendCommandListTableComponent
                      commandListData={sendCommandListData}
                      handleSendCommandListCellInputChange={
                        handleSendCommandListCellInputChange
                      }
                      pageNo={sendCommandListpageNo}
                      pageSize={sendCommandListpageSize}
                      handlePageChange={handleSendCommandListTablePageChange}
                      handleChangeRowsPerPage={
                        handleChangeSendCommandListTableRowsPerPage
                      }
                      handleSendCommandInSendEventList={
                        handleSendCommandInSendEventList
                      }
                    />
                  </Paper>
                </Box>
              </Grid>
            </Grid>
          )}
        </Box>
      </Box>
      <LoadingComponent
        open={
          isGetAllVehicleDataLoading ||
          getCommandDetailsForCommandListResponse?.isFetching ||
          getCommandDetailsForSendCommandListResponse?.isFetching ||
          createCommandResponse?.isLoading ||
          sendCommandResponse?.isLoading ||
          getCommandHistoryTrailResponse?.isLoading
        }
      />
      <SnackAlert snack={snack} setSnack={setSnack} />

      <CommandHistoryTrailDialog
        commandHistoryTrailDialogOpen={commandHistoryTrailDialogOpen}
        handleCloseCommandHistoryTrailDialog={
          handleCloseCommandHistoryTrailDialog
        }
        commandHistoryTrailComponentData={commandHistoryTrailComponentData}
      />

      <AddCommandModal
        addCommandModalOpen={addCommandModalOpen}
        handleCreateCommand={handleCreateCommand}
        handleCloseAddCommandModal={handleCloseAddCommandModal}
      />
    </React.Fragment>
  );
};

export default CommandConfiguration;
