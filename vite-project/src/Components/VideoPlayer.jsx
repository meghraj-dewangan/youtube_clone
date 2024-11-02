import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShare, faDownload,faTrash,faPenToSquare,faCheck,faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import { useUserAuth } from "./UserContext";




function VideoPlayer() {
    const { id: videoId } = useParams();
    const { userData, authenticated } = useUserAuth();
    const [errorMsg, setErrorMsg] = useState('');

    const [videoData, setVideoData] = useState(null); // Initialize with null to handle loading state
    const [relatedVideos, setRelatedVideos] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]); // State to store comments
    const [updatingCommentId, setUpdatingCommentId] = useState(null);
    const [updatedText, setUpdatedText] = useState("");


    // Fetch video data and comments on component mount

    const fetchVideoData = async () => {
        try {
            const response = await axios.get(`http://localhost:3700/youtube/video/${videoId}`);
            setVideoData(response.data);
            // Fetch comments for the video
            setComments(response.data.comments || []);
           
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    useEffect(() => {

        fetchVideoData();
    }, [videoId]);



    // Fetch related videos based on the video's category
    useEffect(() => {
        const fetchRelatedVideos = async () => {
            if (videoData && videoData.category) {
                try {
                    const relatedResponse = await axios.get(`http://localhost:3700/youtube/video/category/${videoData.category}`);
                    setRelatedVideos(relatedResponse.data);
                } catch (error) {
                    console.error("Error fetching related videos:", error);
                }
            }
        };

        fetchRelatedVideos();
    }, [videoData]);

    // Handle comment submission
    const handleCommentSubmit = async () => {
        if (newComment.trim() === "") return;
        if (authenticated) {
            try {
                const response = await axios.post(
                    `http://localhost:3700/comment/addcomment/${videoId}/comments`,
                    { text: newComment, username: userData?.username, avatar: userData?.avatar, userId: userData?._id }
                );
                setComments((prevComments) => [...prevComments, response.data.comment]); // Update comments with new comment
                setNewComment(""); // Clear the input field
                fetchVideoData();
            } catch (error) {
                console.error("Error posting comment:", error);
                setErrorMsg(error.message);
            }
        } else {
            setErrorMsg("Please login!");
        }
    };



    const handleCancel = () => {
        setUpdatingCommentId(null); // Cancel editing
        setUpdatedText("");
    };

    const handleEditClick = (comment) => {
        setUpdatingCommentId(comment._id);
        setUpdatedText(comment.text); // Set the initial text to the comment's current text
    };

    const handleUpdate = async (commentId) => {
        console.log(commentId);
        if (updatedText.trim() === "") return;  // Use `updatedText` instead of `newComment`
        if (authenticated) {
            try {
                const response = await axios.put(
                    `http://localhost:3700/comment/updatecomment/${videoId}/comments`,
                    { text: updatedText, userId: userData?._id, commentId: commentId }
                );

                // Update comment in local state
                setComments((prevComments) =>
                    prevComments.map((comment) =>
                        comment._id === commentId ? { ...comment, text: updatedText } : comment
                    )
                );

                setUpdatingCommentId(null);  // Reset updating comment ID
                setUpdatedText("");  // Clear the input field
                fetchVideoData();
            } catch (error) {
                console.error("Error updating comment:", error.message);
                setErrorMsg(error.message);
            }
        } else {
            setErrorMsg("Please login!");
        }
    };

    const handleDelete = async (commentId) => {
        if (authenticated) {
            try {
                const response = await axios.delete(
                    `http://localhost:3700/comment/deletecomment/${videoId}/comments`,
                    { data: { userId: userData?._id, commentId: commentId } }
                );

              
                setComments((prevComments) =>
                    prevComments.filter((comment) => comment._id !== commentId)
                );
            } catch (error) {
                console.error("Error deleting comment:", error.message);
                setErrorMsg(error.message.includes('403') ? 'invalid' : error.message);
            }
        } else {
            setErrorMsg("Please login!");
        }
    };


    const handleLike = async () => {
        if (!authenticated) return setErrorMsg("Please login to like videos!");
    
        try {
            const response = await axios.post(`http://localhost:3700/youtube/video/like/${videoId}`, { userId: userData?._id });
            console.log("Like response:", response.data);
            fetchVideoData(); 
        } catch (error) {
            console.error("Error in liking video:", error.message);
            setErrorMsg(error.message); // Display the error message
        }
    };
    
    const handleDislike = async () => {
        if (!authenticated) return setErrorMsg("Please login to dislike videos!");
    
        try {
            const response = await axios.post(`http://localhost:3700/youtube/video/dislike/${videoId}`, { userId: userData?._id });
            fetchVideoData(); 
        } catch (error) {
            console.error("Error disliking video:", error.message);
            setErrorMsg(error.message); // Display the error message
        }
    };
    


    const timeAgo = (uploadDate) => {
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

    if (!videoData) {
        return <div>Loading...</div>; // Show loading state
    }

    return (
        <div className="flex flex-col mt-28 mb-40 lg:flex-row w-full p-4 space-y-8 sm:space-y-0 sm:space-x-8 lg:space-x-8">
            <div className="w-full sm:w-3/4 sm:ml-20 lg:w-3/4">
                <div className="aspect-w-16 aspect-[5/3] w-full">

                    <iframe
                        className="w-full h-full rounded-lg"
                        src={`https://www.youtube.com/embed/${videoData.videoId}?autoplay=1&rel=0`}
                        title={videoData.title}
                        allow="accelerometer; autoplay; clipboard-write; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>



                <h2 className="text-2xl font-semibold mt-4">{videoData.title}</h2>
                <span className="text-gray-500 text-sm">{videoData.views} Views</span> <span className="text-gray-500 ml-2 text-sm">{timeAgo(videoData.uploadDate)}</span>

                <div>
                    <div className="flex ">
                        <p className="text-black font-bold text-base">{videoData.channelName}</p>
                        <div className='bg-black w-28 p-1 ml-6 sm:ml-16 text-center rounded-2xl hover:cursor-pointer'>
                            <span className='inline-block text-base text-white'>Subscribe</span>
                        </div>
                    </div>

                    <p className="text-gray-700 mt-1">{videoData.description}</p>
                </div>

                <div className="flex items-center space-x-4 mt-4">
                    <button onClick={handleLike} className="px-4 py-1 bg-gray-200 rounded-md">👍 ({videoData.likes})</button>
                    <button onClick={handleDislike} className="px-4 py-1 bg-gray-200 rounded-md">👎 ({videoData.dislikes})</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-500"><FontAwesomeIcon icon={faShare} className="mr-2" /> Share</button>
                    <button className="px-4 py-2 bg-gray-200 rounded-md text-gray-500"><FontAwesomeIcon icon={faDownload} className="mr-2" /> Download</button>
                </div>

                <div className="mt-6">

                    <h3 className="text-xl font-semibold mb-3">Comments</h3>
                    <div className="flex items-center space-x-2 mb-4">
                        <input
                            type="text"
                            placeholder="Add a comment..."
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                        <button
                            onClick={handleCommentSubmit}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                            Comment
                        </button>
                    </div>
                    {errorMsg && <p className="text-red-600">{errorMsg}</p>}

                    <div className="space-y-2">
                        {comments.map((comment) => (
                            <div key={comment._id} className="p-2 w-full bg-gray-100 rounded-md">
                                {updatingCommentId === comment._id ? (
                                    <div className=" flex w-full justify-between">
                                        <input
                                            type="text"
                                            value={updatedText}
                                            onChange={(e) => setUpdatedText(e.target.value)}
                                            className="p-1 border rounded-md"
                                        />
                                        <div>
                                            <button onClick={() => handleUpdate(comment._id)} className="ml-2 bg-green-500 text-white p-1 rounded-md">
                                            <FontAwesomeIcon  icon={faCheck} />
                                            </button>
                                            <button onClick={handleCancel} className="ml-2 bg-gray-300 p-1 rounded-md">
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-row items-center justify-between px-4 ">
                                        <div className="flex flex-row gap-5 items-center">
                                            <img className="w-9 h-9 rounded-full" src={comment?.avatar} alt="avatar" />

                                            <div className="flex flex-col">
                                                <p className="font-semibold text-sm">{comment?.username}</p>
                                                <p>{comment?.text}</p>
                                            </div>


                                        </div>
                                        <div>
                                            <button onClick={() => handleEditClick(comment)} className="text-blue-500 text-sm mt-1">
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                            </button>
                                            <button onClick={() => handleDelete(comment._id)} className="text-red-500 text-sm mt-1 ml-4">
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </div>

                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="w-full sm:w-1/3 lg:w-1/3 space-y-4">
                <h3 className="text-xl font-semibold mb-4">Up Next</h3>
                {relatedVideos.length > 0 ? (
                    relatedVideos.map((video) => (
                        <Link key={video._id} to={`/videoplayer/${video.videoId}`}>
                            <div className="flex items-start space-x-4 p-2 border-b border-gray-200">
                                <div className="w-1/3">
                                    <img
                                        src={video.thumbnailUrl || "https://via.placeholder.com/150"}
                                        alt={video.title}
                                        className="rounded-lg w-full"
                                    />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-semibold">{video.title}</h4>
                                    <p className="text-gray-400 text-xs">{video.views} views • {timeAgo(video.uploadDate)}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p>No related videos available.</p>
                )}
            </div>


        </div>
    );
}

export default VideoPlayer;
