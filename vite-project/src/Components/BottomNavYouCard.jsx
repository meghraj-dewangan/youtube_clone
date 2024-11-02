import React, { useEffect, useState } from "react";
import axios from "axios";
import { image } from "../Utils/images";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

function BottomNavYouCard({ video }) {
  const { id: videoId } = useParams();
  const [channelData, setChannelData] = useState(null);
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchChannelData = async () => {
      try {
        const response = await axios.get(`http://localhost:3700/youtube/channel/${video.channelId}`);
        setChannelData(response.data.channel);

        const response1 = await axios.get(`http://localhost:3700/youtube/video/${video.videoId}`);
        setVideoData(response1.data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
        setChannelData(null);
        setVideoData(null);
      }
    };

    fetchChannelData();
  }, [video.channelId, videoId]);

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

  const formatLastWatchedDate = (lastWatchedDate) => {
    if (!lastWatchedDate) return "Never watched";
    const now = new Date();
    const watchedTime = new Date(lastWatchedDate);
    const timeDiff = now - watchedTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) return hours === 1 ? "Watched 1 hour ago" : `Watched ${hours} hours ago`;
    if (minutes > 0) return minutes === 1 ? "Watched 1 minute ago" : `Watched ${minutes} minutes ago`;
    return "Watched just now";
  };

  return (
    <div className="w-full px-2 mb-3 flex flex-col h-52 space-y-2">
      <Link to={`/videoplayer/${video.videoId}`} className="w-full block overflow-hidden rounded-lg relative">
        <div className="relative" style={{ paddingBottom: '56.25%' }}>
          <img
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
            src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
            alt="Video thumbnail"
          />
        </div>
      </Link>

      <div className="flex w-full items-start space-x-3">
        <img
          src={channelData?.profilePicture || image[6].logo}
          alt="Channel Avatar"
          className="w-10 h-10 rounded-full"
        />
        <Link to={`/channelpage/${video.channelId}`} className="flex-1 overflow-hidden">
          <h3 className="text-sm font-medium text-ellipsis overflow-hidden whitespace-nowrap">
            {video.title}
          </h3>
          <p className="text-xs text-gray-600">{channelData ? channelData.name : "Loading Channel..."}</p>
          <div className="text-xs text-gray-500">
            <span>{video.views} views</span>
            <span className="mx-1">•</span>
            <span>{formatUploadDate(video.uploadedAt)}</span>
            <span className="mx-1">•</span>
            <span>{formatLastWatchedDate(video.lastWatchedAt)}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default BottomNavYouCard;
