import React from "react";

import { AppBar, Toolbar, Box, Avatar, IconButton } from "@mui/material";
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

const Header = () => {
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
            // backgroundColor: "#cdc1ff",
            // backgroundImage: "linear-gradient(316deg, #cdc1ff 0%, #e5d9f2 74%)",
            backgroundImage:
              "linear-gradient(to right, #5e63b6, #7e79c4, #9b91d2, #b7a9e0, #d1c3ef)",
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
              <IconButton onClick={handleClickOpenDialog}>
                <LogoutIcon sx={{ fontSize: "2.5rem" }} />
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
