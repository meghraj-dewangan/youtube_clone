import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

function ChannelPage() {
    const [channelData, setChannelData] = useState([]);
    const [videos, setVideos] = useState([]);
    const { channelId: channelId } = useParams();
    const [shortsVideos, setShortsVideos] = useState([]);
    const [activeTab, setActiveTab] = useState('videos'); // State to manage active tab

    // Function to format upload date
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

    // Fetch channel data and videos from the API
    useEffect(() => {
        const fetchChannelData = async () => {
            try {
                // Fetch channel details by channel id
                const channelResponse = await axios.get(`http://localhost:3700/youtube/channel/${channelId}`);
                setChannelData(channelResponse.data.channel); 

                // Fetch videos
                const videoResponse = await axios.get('http://localhost:3700/youtube/video');
                const allVideos = videoResponse.data; 
                // Filter videos for this channel
                const channelVideos = allVideos.filter(video => video.channelId === channelId);
                setVideos(channelVideos);

                // Fetch shorts
                const shortsResponse = await axios.get('http://localhost:3700/youtube/shorts');
                const allShorts = shortsResponse.data; 
                // Filter shorts for  channel
                const channelShorts = allShorts.filter(short => short.channelId === channelId);
                setShortsVideos(channelShorts);
                
            } catch (error) {
                console.error('Error fetching channel or video data:', error);
            }
        };

        fetchChannelData();
    }, [channelId]);

    return (
        <div className="w-full mb-40">
            <div className="mt-28 mx-4 sm:mx-8 lg:mx-20">
                {/* Banner Image */}
                <div>
                    <img src={channelData.bannerImage} alt="Banner" className="w-full h-auto" />
                </div>

                {/* Channel Info */}
                <div className="flex flex-col md:flex-row items-center mt-4">
                    <img src={channelData.profilePicture} alt="Profile" className="w-24 h-24 rounded-full border-2 border-white" />
                    <div className="ml-4 text-center md:text-left">
                        <h1 className="text-2xl font-bold">{channelData.channelName}</h1>
                        <span className="text-gray-600 text-xs"> • {channelData.subscriberCount} Subscribers</span>
                        <p className="mt-2 text-gray-800">{channelData.description}</p>
                    </div>
                </div>
                <div className='bg-black w-28 p-1 mt-5 text-center rounded-2xl mx-auto md:mx-0 hover:cursor-pointer'>
                    <span className='inline-block text-base text-white'>Subscribe</span>
                </div>

                <div className='mt-3'>
                    <ul className='flex justify-center md:justify-start p-2'>
                        <li
                            className={`mx-4 cursor-pointer ${activeTab === 'videos' ? 'font-bold' : ''}`}
                            onClick={() => setActiveTab('videos')}
                        >
                            Videos
                        </li>
                        <li
                            className={`mx-4 cursor-pointer ${activeTab === 'shorts' ? 'font-bold' : ''}`}
                            onClick={() => setActiveTab('shorts')}
                        >
                            Shorts
                        </li>
                    </ul>
                </div>
                <hr />

                {/* Conditional Rendering for Videos and Shorts */}
                {activeTab === 'videos' && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold">Videos</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {videos.map(video => (
                                <Link to={`/videoplayer/${video.videoId}`} key={video._id}>
                                    <div className="border rounded-lg overflow-hidden shadow-md">
                                        <img src={video.thumbnailUrl} alt={video.title} className="w-full h-36 object-cover" />
                                        <div className="p-2">
                                            <h3 className="font-semibold">{video.title}</h3>
                                            <p className="text-gray-500">{video.views} views • {formatUploadDate(video.uploadDate)}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'shorts' && (
                    <div className="mt-6">
                        <h2 className="text-xl font-semibold text-white">Shorts</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                            {shortsVideos.map(short => (
                                <div key={short._id} className="relative w-full h-44 lg:h-72 xl:h-96 mb-4">
                                    <img
                                        src={short.thumbnailUrl}
                                        alt={short.title}
                                        className="rounded-lg w-full h-full object-cover shadow-md transition-transform duration-200 transform hover:scale-105"
                                    />
                                    {/* Short title */}
                                    <div className="absolute bottom-2 left-2 right-2 bg-black bg-opacity-50 text-white text-xs sm:text-sm rounded p-1">
                                        <p className="font-bold">{short.title}</p>
                                        <p className="text-gray-300">{short.views} views</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ChannelPage;
