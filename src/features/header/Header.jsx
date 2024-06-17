import React from "react";

import {
  AppBar,
  Toolbar,
  Box,
  Avatar,
  IconButton,
  // Tooltip,
  // Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../../img/WATSOO_LOGO.svg";
import { useDispatch } from "react-redux";
import { apiSlice } from "../../app/api/apiSlice";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
// import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import headerBg from "../../img/header.svg";
import { useTheme } from "@emotion/react";

const Header = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleCloseDialog = React.useCallback(() => {
    setOpenDialog(false);
  }, []);
  const handleClickOpenDialog = React.useCallback(() => {
    setOpenDialog(true);
  }, []);
  const handleLogout = React.useCallback(() => {
    sessionStorage.clear();
    setOpenDialog(false);
    dispatch(apiSlice.util.resetApiState());
    navigate("/");
  }, [navigate, dispatch]);

  // const handleNavigateCommandConfiguration = React.useCallback(() => {
  //   navigate("/commandConfiguration");
  // }, [navigate]);

  const AlertDialog = React.memo(function ({
    open,
    handleClose,
    handleLogout,
  }) {
    return ReactDOM.createPortal(
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          ".MuiDialog-container": {
            alignItems: "flex-start",
          },
          zIndex: theme.zIndex.modal + 5,
        }}
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to logout this session?
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} variant="contained">
            No
          </Button>
          <Button onClick={handleLogout} variant="contained" color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>,
      document.getElementById("portal")
    );
  });
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="fixed"
          sx={{
            zIndex: theme.zIndex.modal + 5,
            // backgroundColor: "#cdc1ff",
            // backgroundImage: "linear-gradient(316deg, #cdc1ff 0%, #e5d9f2 74%)",
            // backgroundImage:
            //   "linear-gradient(to right, #5e63b6, #7e79c4, #9b91d2, #b7a9e0, #d1c3ef)",
            // backgroundImage:
            //   "linear-gradient(to left, #0e3973, #35568c, #5674a4, #7793bd, #99b3d6)",
            backgroundColor: "#fff !important",
            background: `url(${headerBg})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: {
              md: "50% 50%",
              xs: "20% 80%",
            },
          }}
        >
          <Toolbar>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 50,
              }}
            />
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                justifyContent: "flex-end",
                gap: 2,
              }}
            >
              <IconButton sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d"
                  sx={{ height: "53px", width: "53px" }}
                />
              </IconButton>
              {/* <Tooltip
                title={
                  <Typography
                    sx={{
                      fontSize: "13px",
                      paddingX: "10px",
                      paddingY: "5px",
                      maxWidth: "220px",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    Command Configuration
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
                <IconButton
                  onClick={() => handleNavigateCommandConfiguration()}
                >
                  <SettingsRemoteIcon sx={{ fontSize: "2.5rem" }} />
                </IconButton>
              </Tooltip> */}

              <IconButton onClick={handleClickOpenDialog}>
                <LogoutIcon sx={{ fontSize: "2.5rem", color: "text.light" }} />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        handleLogout={handleLogout}
      />
    </React.Fragment>
  );
};

export default Header;
