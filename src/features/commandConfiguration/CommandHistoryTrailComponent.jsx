import { Box, Grid, Typography, useTheme } from "@mui/material";
import React from "react";
import { formatDateToIST, formatTimeToIST } from "../../helper/formatter";

const customFontStyles = {
  fontWeight: 600,
  fontSize: "14px",
};

const CommandHistoryTrailComponent = ({ commandHistoryTrailComponentData }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        width: "100%%",
        overflow: "hidden",
        position: "relative",
        paddingTop: "10px",
        paddingLeft: "20px",
      }}
    >
      {Boolean(commandHistoryTrailComponentData?.length > 0) ? (
        <>
          {commandHistoryTrailComponentData?.map((item, index) => (
            <React.Fragment key={index}>
              {/* Colored Connector */}

              <Grid
                container
                textAlign="left"
                sx={{ position: "relative", paddingBottom: "20px" }}
              >
                <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Typography sx={{ ...customFontStyles, fontSize: "16px" }}>
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
                  <Typography sx={{ ...customFontStyles }}>Sender</Typography>
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
                <div
                  style={{
                    position: "absolute",
                    top: 4,
                    left: -20,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    // backgroundColor: "orange",
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
                  <div
                    style={{
                      width: "3px",
                      background: theme.palette.customPurple.main,
                      // marginLeft: "6.25px", // Adjust the margin for spacing
                      // height: "10em", // Set a minimum height for the connector line
                      display: Boolean(
                        index === commandHistoryTrailComponentData?.length - 1
                      )
                        ? "none"
                        : "flex",
                      // display: "flex",
                      flexGrow: 1,
                      height: "100%",
                    }}
                  />
                </div>
              </Grid>
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
