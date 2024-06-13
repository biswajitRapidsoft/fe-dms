import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "./features/header/Header";
import LoadingComponent from "./components/LoadingComponent";
import Sidebar from "./features/sidebar/Sidebar";

const Login = React.lazy(() => import("./features/login/Login"));
const Dashboard = React.lazy(() => import("./features/dashboard/Dashboard"));
const EventDetails = React.lazy(() =>
  import("./features/eventDetails/EventDetails")
);
const CommandConfiguration = React.lazy(() =>
  import("./features/commandConfiguration/CommandConfiguration")
);
const DriverPerformanceReport = React.lazy(() =>
  import("./features/driverPerformanceReport/DriverPerformanceReport")
);

function App() {
  const location = useLocation();
  const isExcludedRouteForHeader = !["/"].some(
    (route) => location.pathname === route
  );

  const isExcludedRouteForSidebar = !["/"].some(
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
              {isExcludedRouteForSidebar && <Sidebar />}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                  //   marginLeft: isExcludedRouteForSideBar ? "1em" : "",
                  marginTop: isExcludedRouteForHeader ? "4em" : "",
                  marginLeft: isExcludedRouteForSidebar ? "4.7em" : "",
                  marginRight: isExcludedRouteForHeader ? "1em" : "",
                }}
              >
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/eventDetails" element={<EventDetails />} />
                  <Route
                    path="/commandConfiguration"
                    element={<CommandConfiguration />}
                  />
                  <Route
                    path="/driverPerformanceReport"
                    element={<DriverPerformanceReport />}
                  />
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
