import { Box, Breadcrumbs, Link } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadCrumb = React.memo(function ({ breadcrumbs, activeElement }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="large" />}
      aria-label="breadcrumb"
    >
      {Boolean(breadcrumbs?.length > 0) &&
        breadcrumbs.map((breadcrumb, index) => (
          <Link
            key={index}
            underline={
              !Boolean(breadcrumb?.name === activeElement) ? "hover" : "none"
            }
            color={
              Boolean(breadcrumb?.name === activeElement)
                ? "text.primary"
                : "inherit"
            }
            onClick={() => handleClick(breadcrumb?.path)}
            sx={{
              fontSize: "30px",
              fontWeight: "550",
              color: !Boolean(breadcrumb?.name === activeElement)
                ? "customGrey.600"
                : "customBlue.dark",
              cursor: !Boolean(breadcrumb?.name === activeElement)
                ? "pointer"
                : "default",
            }}
          >
            {breadcrumb?.name}
          </Link>
        ))}
    </Breadcrumbs>
  );
});

const TopViewNav = ({ breadcrumbs = [] }) => {
  // breadcrumbs = [
  //   { name: "Dashboard", path: "/dashboard" },
  //   { name: "Event Details", path: "/eventDetails" },
  // ];
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        flexGrow: 1,
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <BreadCrumb
        breadcrumbs={breadcrumbs}
        activeElement={breadcrumbs[breadcrumbs?.length - 1]?.name}
      />
    </Box>
  );
};

export default TopViewNav;
