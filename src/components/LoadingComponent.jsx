import React from "react";
import ReactDOM from "react-dom";
import { Backdrop, CircularProgress } from "@mui/material";

const LoadingComponent = ({ open }) => {
  return ReactDOM.createPortal(
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 15 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>,
    document.getElementById("portal")
  );
};

export default React.memo(LoadingComponent);
