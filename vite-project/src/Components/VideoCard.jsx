import React, { useState, useEffect } from "react";
import axios from 'axios';
import { image } from "../Utils/images";
import { Link } from "react-router-dom";

function VideoCard({ video }) {
  const [channelData, setChannelData] = useState(null);


  const formatUploadDate = (uploadDate) => {
    const now = new Date();
    const uploadTime = new Date(uploadDate);
    const timeDiff = now - uploadTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return days === 1 ? "1 day ago" : `${days} days ago`;
    if (hours > 0) return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
    if (minutes > 0) return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
    return "Just now";
  };

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        // Use the channelId from videolist props to fetch channel data
        const response = await axios.get(`http://localhost:3700/youtube/channel/${video.channelId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setChannelData(response.data.channel);
      } catch (error) {
        console.log("Error fetching channel data:", error);
        setChannelData(null); // Set channelData to null in case of error
      }
    };

    fetchChannelData();
  }, [video.channelId]); // Dependency on video.channelId to refetch if it changes

  return (
    <div className="w-full p-1 mb-2 items-start space-y-2">

      <Link to={`/videoplayer/${video.videoId}`}
      >

        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
          <img
            src={video.thumbnailUrl} // Use the thumbnail URL from the video object
            alt={video.title} // Alt text for accessibility
            className="absolute rounded-lg top-0 left-0 w-full h-full object-cover"
            style={{ borderRadius: '8px' }} 
          />

        </div>
      </Link>

      {/* Video details with avatar */}
      <div className="flex items-center w-full space-x-3">
        {/* Avatar Image */}
        <Link to={`/channelpage/${video.channelId}`}>
          <img
            src={channelData?.profilePicture || image[6].logo} // Use profile picture if available, else fallback image
            alt="Channel Avatar"
            className="w-16 h-8 lg:w-14 xl:w-20 rounded-full"
          /></Link>

        {/* Title and other details */}
        <Link to={`/channelpage/${video.channelId}`}>
          <div className="text-left w-full">
            <h3 className="text-lg font-semibold">{video.title}</h3>
            <p className="text-sm sm:block text-gray-500 inline">{video.channelName}</p>
            <p className="text-sm inline text-gray-600 ml-1">
              <span className="sm:hidden">•</span>
              <span className="sm:relative sm:right-1">{video.views} views</span>
              <span> • {formatUploadDate(video.uploadDate)}</span>
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default VideoCard;
