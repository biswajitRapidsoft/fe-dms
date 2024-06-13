import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { formatDateToIST, formatTimeToIST } from "../../helper/formatter";

const customFontStyles = {
  fontFamily: "Open Sans !important",
  fontWeight: 600,
  fontSize: "14px",
};

const CommandHistoryTrailComponent = ({ commandHistoryTrailComponentData }) => {
  const theme = useTheme();

  // const [responsiveTextContainerHeight, setResponsiveTextContainerHeight] =
  //   useState(null);

  // const responsiveTextContainerRef = useRef(null);

  // const debounce = React.useCallback((func, wait) => {
  //   let timeout;
  //   return (...args) => {
  //     clearTimeout(timeout);
  //     timeout = setTimeout(() => func(...args), wait);
  //   };
  // }, []);

  // useEffect(() => {
  //   const responsiveTextContainer = responsiveTextContainerRef.current;
  //   if (responsiveTextContainer) {
  //     // Debounced function to handle width changes
  //     const handleResize = debounce((entry) => {
  //       setResponsiveTextContainerHeight(entry.contentRect.height + 50 + "px");
  //     }, 500); // Adjust the debounce delay as needed

  //     // Create a ResizeObserver instance
  //     const resizeObserver = new ResizeObserver((entries) => {
  //       for (let entry of entries) {
  //         if (entry.target === responsiveTextContainer) {
  //           handleResize(entry);
  //         }
  //       }
  //     });

  //     // Start observing the element
  //     resizeObserver.observe(responsiveTextContainer);

  //     // Cleanup function to stop observing when the component unmounts
  //     return () => {
  //       resizeObserver.unobserve(responsiveTextContainer);
  //     };
  //   }
  // }, [debounce]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Change to column layout
        alignItems: "flex-start", // Align items to the start
        width: "100%%",
        // minHeight: "4em",
        overflow: "hidden",
        position: "relative",
        // paddingLeft: 5,
        // background: "orange",
        paddingTop: "10px",
        paddingBottom: "8em",
      }}
    >
      {Boolean(commandHistoryTrailComponentData?.length > 0) ? (
        <>
          {commandHistoryTrailComponentData?.map((item, index) => (
            <React.Fragment key={index}>
              {/* Colored Connector */}
              <div
                style={{
                  flex: 1,
                  width: "3px", // Change to vertical line
                  // background: item?.createdAt ? '#8BB610' : "#AAAAAA",
                  background: theme.palette.customPurple.main,
                  marginLeft: "6.25px", // Adjust the margin for spacing
                  minHeight: "10em", // Set a minimum height for the connector line
                  display: index === 0 ? "none" : "block",
                  height: "100%",
                }}
              />
              {/* Dot */}
              <div
                id="testDiv"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  zIndex: 2,
                  clear: "both",
                }}
              >
                <div
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "50%",
                    // background: item?.createdAt ? "#8BB610" : "#AAAAAA",
                    background: theme.palette.customPurple.main,
                    // marginBottom: "4px",
                  }}
                />
                {/* Text */}
                <div
                  style={{
                    position: "absolute",
                    left: 29,
                    marginTop: -4,
                    height: "100%",
                  }}
                >
                  <Grid container textAlign="left">
                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      <Typography
                        sx={{ ...customFontStyles, fontSize: "16px" }}
                      >
                        Command
                      </Typography>
                    </Grid>
                    <Grid item xs={0.3} sm={0.3} md={0.3} lg={0.3} xl={0.3}>
                      <Typography sx={{ ...customFontStyles }}>-</Typography>
                    </Grid>
                    <Grid item xs={8.7} sm={8.7} md={8.7} lg={8.7} xl={8.7}>
                      <Typography
                        sx={{
                          ...customFontStyles,
                          color: "customGrey.800",
                          // whiteSpace: "nowrap",
                          fontSize: "16px",
                          wordBreak: "break-word",
                        }}
                      >
                        {item?.useCommand}
                      </Typography>
                    </Grid>

                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      <Typography sx={{ ...customFontStyles }}>
                        Sent Command
                      </Typography>
                    </Grid>
                    <Grid item xs={0.3} sm={0.3} md={0.3} lg={0.3} xl={0.3}>
                      <Typography sx={{ ...customFontStyles }}>-</Typography>
                    </Grid>
                    <Grid item xs={8.7} sm={8.7} md={8.7} lg={8.7} xl={8.7}>
                      <Typography
                        sx={{
                          ...customFontStyles,
                          color: "customPurple.main",
                          // whiteSpace: "nowrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {item?.command}
                      </Typography>
                    </Grid>

                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      <Typography sx={{ ...customFontStyles }}>
                        Description
                      </Typography>
                    </Grid>
                    <Grid item xs={0.3} sm={0.3} md={0.3} lg={0.3} xl={0.3}>
                      <Typography sx={{ ...customFontStyles }}>-</Typography>
                    </Grid>
                    <Grid item xs={8.7} sm={8.7} md={8.7} lg={8.7} xl={8.7}>
                      <Typography
                        sx={{
                          ...customFontStyles,
                          color: "customPurple.main",
                          // whiteSpace: "nowrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {item?.description}
                      </Typography>
                    </Grid>

                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      <Typography sx={{ ...customFontStyles }}>
                        Sender
                      </Typography>
                    </Grid>
                    <Grid item xs={0.3} sm={0.3} md={0.3} lg={0.3} xl={0.3}>
                      <Typography sx={{ ...customFontStyles }}>-</Typography>
                    </Grid>
                    <Grid item xs={8.7} sm={8.7} md={8.7} lg={8.7} xl={8.7}>
                      <Typography
                        sx={{
                          ...customFontStyles,
                          color: "customPurple.main",
                          // whiteSpace: "nowrap",
                          wordBreak: "break-word",
                        }}
                      >
                        {item?.userDto?.name || "NA"}
                      </Typography>
                    </Grid>

                    <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                      <Typography sx={{ ...customFontStyles }}>
                        Command Hit Time
                      </Typography>
                    </Grid>
                    <Grid item xs={0.3} sm={0.3} md={0.3} lg={0.3} xl={0.3}>
                      <Typography sx={{ ...customFontStyles }}>-</Typography>
                    </Grid>
                    <Grid item xs={8.7} sm={8.7} md={8.7} lg={8.7} xl={8.7}>
                      <Typography
                        sx={{
                          ...customFontStyles,
                          color: "customPurple.main",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {formatDateToIST(item?.createdOn)}{" "}
                        {formatTimeToIST(item?.createdOn)}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>
              </div>
            </React.Fragment>
          ))}
        </>
      ) : (
        <Box
          sx={{
            display: "flex",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography sx={{ color: "text.secondary", fontSize: "26px" }}>
            No Command History Available
          </Typography>
        </Box>
      )}
    </div>
  );
};

export default CommandHistoryTrailComponent;
