import mongoose from "mongoose";

import Video from "../Model/Video.js";




// Add video to mongodb


export const addVideo = async (req, res) => {
    try {
        const {
            videoId,
            title,
            channelId,
            channelName,
            thumbnailUrl,
            views = 0,
            uploadDate,
            description,
            comments = [],
            category,
            uploader,
            dislikes = 0,
            likes = 0,
            
            
           
        } = req.body;

        const newVideo = new Video({
            videoId,
            title,
            thumbnailUrl,
            channelName,
            category,
            description,
            channelId,
            uploadDate,
            dislikes,
            comments,
            uploader,
            views,
            likes,
           
            
           
        });

        const savedVideo = await newVideo.save();

        res.status(201).json({
            message: 'Video added successfully!',
            video: savedVideo,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error adding video',
            error: error.message,
        });
    }
};


// Get all videos from mongodb
export const getAllVideos = async (req, res) => {
    try {
        // Fetch all videos from the database
        const videos = await Video.find()

        // Check if videos exist
        if (!videos.length) {
            return res.status(404).json({ message: 'No videos found' });
        }

        return res.status(200).json(videos);
    } catch (error) {

        return res.status(500).json({
            message: 'Error fetching videos',
            error: error.message,
        });
    }
};



// Controller to get video by ID
export const getVideoById = async (req, res) => {
    const { id } = req.params; // Get the video ID from the request parameters

    try {
        // Find the video by ID
        const video = await Video.findOne({ videoId: id }); 

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        
        return res.status(200).json(video);
    } catch (error) {
        console.error("Error fetching video:", error);
        return res.status(500).json({ message: "Server error" });
    }
};


// Fetch all videos by a specific category
export const getVideosByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const videos = await Video.find( {category} );
        
        if (!videos || videos.length === 0) {
            return res.status(404).json({ message: "No videos found for this category" });
        }

        res.status(200).json(videos);
    } catch (error) {
        console.error("Error fetching videos by category:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch all distinct categories
export const getAllCategories = async (req, res) => {
    try {
        const categories = await Video.distinct("category");

        if (!categories || categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }

        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching all categories:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Fetch related videos with the same category as a specific video
export const getRelatedVideosByCategory = async (req, res) => {
    try {
        const videoId = req.params.id;
        const video = await Video.findById(videoId); 
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }

        const relatedVideos = await Video.find({ category: video.category, _id: { $ne: videoId } });
        res.json(relatedVideos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching related videos", error });
    }
};


// Controller for fetching videos by channelId
export const getVideosByChannelId = async (req, res) => {
    const { channelId } = req.params;
    try {
        const videos = await Video.find({ channelId:channelId }); // Assuming Video model has a channelId field
        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller to get video by ID
export const getVideoByTitle = async (req, res) => {
    const  title  = req.params.title; // Get the video ID from the request parameters

    try {
        // Find the video by ID
        const videos = await Video.find({ title:{$regex: title , $options:"i"}}); 

        if (videos.length === 0) {
            return res.status(404).json({ message: "Video not found" });
        }

    
        return res.status(200).json(videos);
    } catch (error) {
        console.error("Error fetching video:", error);
        return res.status(500).json({ message: "Server error" });
    }
};