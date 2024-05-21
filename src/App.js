import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./features/header/Header";
import LoadingComponent from "./components/LoadingComponent";
// import AppRoutes from "./routes/AppRoutes";

const Login = React.lazy(() => import("./features/login/Login"));
const Dashboard = React.lazy(() => import("./features/dashboard/Dashboard"));

function App() {
  const location = useLocation();
  const isExcludedRouteForHeader = !["/"].some(
    (route) => location.pathname === route
  );
  // const [sidebarOpen, setSideBarOpen] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState(location.pathname);
  console.log("currentRoute", currentRoute);
  React.useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);
  return (
    // <div className="App">
    <>
      <div>
        <React.Suspense fallback={<LoadingComponent open={true} />}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {isExcludedRouteForHeader && <Header />}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  //   marginLeft: isExcludedRouteForSideBar ? "1em" : "",
                }}
              >
                <Routes>
                  <Route path="/" element={<Login />}></Route>
                  <Route path="/dashboard" element={<Dashboard />}></Route>
                </Routes>
              </div>
            </div>
          </Box>
        </React.Suspense>
      </div>
    </>
  );
}

export default App;
