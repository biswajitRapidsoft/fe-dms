import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: "#5e63b6",
    //   light: "#9fa2d5",
    //   dark: "#2d2f75",
    //   customContrast: "#ffffff",
    // },
    // secondary: {
    //   main: "#D1C3EF",
    //   light: "#E9E1F8",
    //   dark: "#A394C1",
    //   customContrast: "#000000",
    // },
    primary: {
      main: "#0e3973",
      light: "#99B3D6",
      dark: "#2C4A81",
      customContrast: "#ffffff",
    },
    secondary: {
      main: "#C3D2EF",
      light: "#E1EBFF",
      dark: "#899DBF",
      customContrast: "#000000",
    },
    text: {
      primary: "#000000",
      secondary: "#757575",
      light: "#ffffff",
    },
    customGrey: {
      50: "#fafafa",
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#B4B4B4",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
    },
    customBlue: {
      dark: "#00308F",
      light: "#CBDDFF",
      100: "#6D9AF1",
      200: "#497CE1",
    },

    customPurple: {
      main: "#281C61",
      light: "#E9E5F1",
      dark: "#280071",
      50: "#F9F7FD",
      100: "#CAC3F9",
      200: "#BAB2F1",
      300: "#A89DF3",
      400: "#897BE7",
      500: "#7062D1",
      600: "#6557C8",
      700: "#5547B9",
      800: "#4537A8",
    },
    customNavyBlue: {
      main: "#0066b2",
    },
    customGreyBlue: {
      100: "#A0B1D2",
    },

    customOrange: {
      50: "#FFE3D1",
      100: "#FFB88B",
    },

    customYellow: {
      50: "#FFF6A5",
      200: "#F8E850",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
