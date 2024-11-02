import React from "react";
import Video from "../Model/Video.js";


// Like a video
export const likeVideo = async (req, res) => {
    const { videoId } = req.params; // Video ID from URL
    const { userId } = req.body; // User ID from request body
    
    try {
        const video = await Video.findOne({ videoId });

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Check if the user has already liked the video
        if (video.likedBy.includes(userId)) {
            // User already liked the video, remove the like
            video.likedBy.pull(userId);
            video.likes--; // Decrement the count
        } else {
            // Add user's ID to the likes
            video.likedBy.push(userId);
            video.likes++; // Increment the count

            // If the user had disliked the video, remove the dislike
            if (video.dislikedBy.includes(userId)) {
                video.dislikedBy.pull(userId);
                video.dislikes--; // Decrement dislike count
            }
        }

        await video.save();
        res.status(200).json({ likes: video.likes, dislikedBy: video.dislikedBy.length });
    } catch (error) {
        console.log("Error liking video:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Dislike a video
export const dislikeVideo = async (req, res) => {
    const { videoId } = req.params; // Video ID from URL
    const { userId } = req.body; // User ID from request body

    try {
        const video = await Video.findOne({ videoId });

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Check if the user has already disliked the video
        if (video.dislikedBy.includes(userId)) {
            // User already disliked the video, remove the dislike
            video.dislikedBy.pull(userId);
            video.dislikes--; // Decrement the count
        } else {
            // Add the user to the dislikedBy array and update the dislike count
            video.dislikedBy.push(userId);
            video.dislikes++;

            // If the user had liked the video, remove the like
            if (video.likedBy.includes(userId)) {
                video.likedBy.pull(userId);
                video.likes--; // Decrement like count
            }
        }

        await video.save();
        res.status(200).json({ message: "Video disliked successfully!", likes: video.likes, dislikes: video.dislikes });
    } catch (error) {
        console.error("Error disliking video:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};