import mongoose from "mongoose";

import Shorts from "../Model/Shorts.js";




// Add Shorts to mongodb


export const addShorts = async (req, res) => {
    try {
        const {
            shortsId,
            channelName,
            title,
            channelId,
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

        const newShorts = new Shorts({
            shortsId,
            channelName,
            title,
            thumbnailUrl,
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

        const savedShorts = await newShorts.save();

        res.status(201).json({
            message: 'shorts added successfully!',
            shorts: savedShorts,
        });
    } catch (error) {
        res.status(400).json({
            message: 'Error adding shorts',
            error: error.message,
        });
    }
};


// Get all Shorts from mongodb
export const getAllShorts = async (req, res) => {
    try {
        // Fetch all shorts from the database
        const shorts = await Shorts.find()

        // Check if shorts exist
        if (!shorts.length) {
            return res.status(404).json({ message: 'No shorts found' });
        }

        return res.status(200).json(shorts);
    } catch (error) {

        return res.status(500).json({
            message: 'Error fetching shorts',
            error: error.message,
        });
    }
};


// Fetch shorts by channel Id

export const getShortsByChannelId = async (req, res) => {
    const { channelId } = req.query;
    try {
        const shorts = await Shorts.find({ channelId }); // Assuming Shorts model has a channelId field
        res.status(200).json(shorts);
    } catch (error) {
        console.error('Error fetching shorts:', error);
        res.status(500).json({ message: 'Internal server error' });
    }


};


// Controller to get shorts by ID
export const getShortsById = async (req, res) => {
    const { id } = req.params; // Get the video ID from the request parameters

    try {
        // Find the video by ID
        const short = await Shorts.findOne({ shortsId: id }); // Use videoId to find the video

        if (!short) {
            return res.status(404).json({ message: "short not found" });
        }

        // If found, return the video data
        return res.status(200).json(short);
    } catch (error) {
        console.error("Error fetching short:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
