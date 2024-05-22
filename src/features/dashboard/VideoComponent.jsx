import React, { useEffect, useState } from "react";
import { useGetVideoQuery } from "../../services/dashboard";

const VideoComponent = ({ videoUrl }) => {
  console.log("videoUrl in videoComponent", videoUrl);

  const {
    data: videoBlob,
    error,
    isLoading,
  } = useGetVideoQuery(
    { videoUrl },
    {
      skip: !videoUrl,
    }
  );
  const [videoSrc, setVideoSrc] = useState(null);

  useEffect(() => {
    if (videoBlob) {
      const url = URL.createObjectURL(
        new Blob([videoBlob], { type: "video/mp4" })
      );
      setVideoSrc(url);
    }
    return () => {
      if (videoSrc) {
        URL.revokeObjectURL(videoSrc);
      }
    };
  }, [videoBlob]);

  if (isLoading) {
    return <p>Loading video...</p>;
  }

  if (error) {
    return <p>Error loading video: {error.message}</p>;
  }

  return (
    <React.Fragment>
      {videoSrc && (
        <video width="100%" height="390" controls src={videoSrc}></video>
      )}
    </React.Fragment>
  );
};

export default VideoComponent;
