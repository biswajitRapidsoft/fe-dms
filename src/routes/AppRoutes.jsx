import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../features/header/Header";
import LoadingComponent from "../components/LoadingComponent";

const Login = React.lazy(() => import("../features/login/Login"));
const Dashboard = React.lazy(() => import("../features/dashboard/Dashboard"));

const AppRoutes = () => {
  const location = useLocation();
  const isExcludedRouteForHeader = !["/"].some(
    (route) => location.pathname === route
  );
  const [sidebarOpen, setSideBarOpen] = React.useState(false);
  const [currentRoute, setCurrentRoute] = React.useState(location.pathname);

  React.useEffect(() => {
    setCurrentRoute(location.pathname);
  }, [location]);

  return (
    <>
      <div>
        <React.Suspense fallback={<LoadingComponent open={true} />}>
          <Box
            sx={{
              display: "flex",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              {isExcludedRouteForHeader && (
                <Header
                  setSideBarOpen={setSideBarOpen}
                  sidebarOpen={sidebarOpen}
                />
              )}

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
};

export default AppRoutes;
