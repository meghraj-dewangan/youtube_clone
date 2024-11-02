
import mongoose from 'mongoose';
import Video from '../Model/Video.js';






//add comment
export const addComment = async (req, res) => {
    const { videoId } = req.params; // Video ID from URL
    const { userId, text, username, avatar } = req.body; // User ID and comment text from request body

  

    try {
        const video = await Video.findOne({ videoId });

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const newComment = {
            userId: userId,
            text: text,
            username: username,
            avatar: avatar,
            timestamp: Date.now()
        };

        // Add the new comment to the comments array in the video document
        video.comments.push(newComment);
        await video.save();

        res.status(201).json({ message: "Comment added successfully!", comment: newComment });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};



// Controller to update a comment on a video
export const updateComment = async (req, res) => {
    const { videoId } = req.params;
    const { text, userId, commentId } = req.body;

    try {
        // Find the video document by videoId
        const video = await Video.findOne({ videoId });
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Find the specific comment by commentId
        const comment = video.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if the user is authorized to update the comment
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Update the comment text and timestamp
        comment.text = text;
        comment.timestamp = new Date();

        await video.save();
        res.status(200).json({ message: "Comment updated successfully!", comment });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};





export const deleteComment = async (req, res) => {
    const { videoId } = req.params; // Video ID from URL
    const { userId, commentId } = req.body; // User ID and comment ID from request body

    try {
        // Find the video containing the comment
        const video = await Video.findOne({ videoId });
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        // Find the comment within the video by ID
        const comment = video.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        // Check if the user is authorized to delete the comment
        if (comment.userId.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // Remove the comment and save the video document
        video.comments.pull(commentId);
        await video.save();

        res.status(200).json({ message: "Comment deleted successfully!" });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
