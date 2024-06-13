import React, { useState } from "react";
import {
  styled,
  // useTheme
} from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemText from "@mui/material/ListItemText";
// import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useNavigate } from "react-router";
import SettingsRemoteIcon from "@mui/icons-material/SettingsRemote";
import AssessmentIcon from "@mui/icons-material/Assessment";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} )`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} )`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  zIndex: theme.zIndex.modal + 1,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const sideBarMenuOptions = [
  {
    pathname: "/dashboard",
    isLibraryIcon: true,
    menuIcon: <DashboardIcon sx={{ color: "primary.customContrast" }} />,
    menuIconAlt: "Dashboard Logo",
    menuTitle: "Dashboard",
  },
  {
    pathname: "/driverPerformanceReport",
    isLibraryIcon: true,
    menuIcon: <AssessmentIcon sx={{ color: "primary.customContrast" }} />,
    menuIconAlt: "Report Logo",
    menuTitle: "Driver Performance Report",
  },
  {
    pathname: "/commandConfiguration",
    isLibraryIcon: true,
    menuIcon: <SettingsRemoteIcon sx={{ color: "primary.customContrast" }} />,
    menuIconAlt: "Config Logo",
    menuTitle: "Command Configuration",
  },
];

export default function Sidenav() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const activeListBgColor = "#759DE8";
  const inactiveListBgColor = "#ffffff00";

  const handleSelectListItem = (route) => {
    navigate(route);
  };

  const toggleSidebarOpenOnHover = () => {
    setOpen(true);
  };

  const toggleSidebarCloseOnHover = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <Drawer
        onMouseEnter={toggleSidebarOpenOnHover}
        onMouseLeave={toggleSidebarCloseOnHover}
        onClose={toggleSidebarCloseOnHover}
        variant="permanent"
        open={open}
        PaperProps={{
          sx: {
            // backgroundColor: "#497CE1",
            background: `linear-gradient(to top, #0e3973, #1d498d, #2b59a8, #3a6ac4, #497ce1)`,
            // background: `linear-gradient(to top, #0e3973, #295091, #4067b0, #5780d0, #6d9af1)`,
            color: "#ffffff",
          },
        }}
      >
        <DrawerHeader></DrawerHeader>
        <List>
          {sideBarMenuOptions.length > 0 &&
            sideBarMenuOptions.map((item, index) => (
              <ListItem
                key={index}
                disablePadding
                onClick={() => handleSelectListItem(item?.pathname)}
                sx={{
                  bgcolor:
                    window.location.pathname === item?.pathname
                      ? activeListBgColor
                      : inactiveListBgColor,
                  "&:hover": {
                    bgcolor: "#6391E8",
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&:hover": {
                      bgcolor: "#6391E8",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item.isLibraryIcon ? (
                      item.menuIcon
                    ) : (
                      <img src={item.menuIcon} alt={item.menuIconAlt} />
                    )}{" "}
                  </ListItemIcon>

                  <ListItemText
                    primary={item.menuTitle}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          {/* <ListItem
            disablePadding
            onClick={() => handleSelectListItem("/dashboard")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <DashboardIcon sx={{ color: "primary.customContrast" }} />
              </ListItemIcon>
              <ListItemText
                primary="Dashboard"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}

          {/* <ListItem
            disablePadding
            onClick={() => handleSelectListItem("/driverPerformanceReport")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <AssessmentIcon sx={{ color: "primary.customContrast" }} />
              </ListItemIcon>
              <ListItemText
                primary="Driver Performance Report"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}

          {/* <ListItem
            disablePadding
            onClick={() => handleSelectListItem("/commandConfiguration")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                display: "flex",
                // alignItems: "center",
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <SettingsRemoteIcon sx={{ color: "primary.customContrast" }} />
              </ListItemIcon>
              <ListItemText
                primary="Command Configuration"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}
          {/* 
          <ListItem
            disablePadding
            onClick={() => handleSelectListItem("/usertable")}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                display: "flex",
                // alignItems: "center",
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <PersonIcon sx={{ color: "#42FF95" }} />
              </ListItemIcon>
              <ListItemText
                primary="User Management"
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>
    </Box>
  );
}
