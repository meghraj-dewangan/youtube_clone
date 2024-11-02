import Channel from "../Model/Channel.js";
import User from "../Model/User.js";
import Video from "../Model/Video.js";

// Create  new channel
export const createChannel = async (req, res) => {
    const { userId, channelName, description, profilePicture, bannerImage,channelId } = req.body;

    try {
        // Check if a channel with the given name already exists
        const existingChannel = await Channel.findOne({ channelName });
        if (existingChannel) {
            return res.status(409).json({ message: 'Channel already exists!' });
        }

         // Generate a custom unique channel ID if not provided
         const uniqueChannelId = channelId || `chnl_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

        // Create and save the new channel
        const newChannel = await Channel.create({
            owner: userId,
            channelName,
            description,
            profilePicture,
            channelId:uniqueChannelId,
            bannerImage,
        });

        // Update the user's channels array with the new channel's ID and name
        await User.findByIdAndUpdate(
            userId,
            { $push: { channels: { id: newChannel._id,channelId:newChannel.channelId, name: newChannel.channelName } } },
            { new: true  } // Return the updated document
        );

        return res.status(201).json({ message: 'Channel created successfully', newChannel });
    } catch (error) {
        return res.status(500).json({ message: 'Error creating channel', error: error.message });
    }
};

// Get channel data by channel ID

export const getChannelData = async (req, res) => {
    const { channelId } = req.params;

    try {
        const channel = await Channel.findOne({ channelId }); // Find by channelId field, not _id
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        return res.status(200).json({ message: 'Channel data fetched successfully', channel });
    } catch (error) {
        return res.status(500).json({ message: 'Error fetching channel data', error: error.message });
    }
};



// Get all channeldata from mongodb
export const getChannelDetail = async (req, res) => {
    try {
        // Fetch all videos from the database
        const channel = await Channel.find();

        // Check if videos exist
        if (!channel.length) {
            return res.status(404).json({ message: 'No channel found' });
        }

        return res.status(200).json(channel);
    } catch (error) {

        return res.status(500).json({
            message: 'Error fetching channel detail',
            error: error.message,
        });
    }
};



//find channel by user id



// Find channel by user ID
export const findChannelByUserId = async (req, res) => {
    const { owner } = req.params; // Assuming the user ID is passed as a URL parameter

    try {
        // Find the channel where the owner matches the userId
        const channel = await Channel.findOne({owner:owner});

        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        return res.status(200).json(channel);
    } catch (error) {
        console.error('Error fetching channel:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};



// Controller function to get channel details by video ID
export const getChannelByVideoId = async (req, res) => {
    const { videoId } = req.params;

    try {
        // Find the video by video ID
        const video = await Video.findOne({ videoId });

        // If video not found, return a 404 response
        if (!video) {
            return res.status(404).json({ message: 'Video not found' });
        }

        // Fetch the channel details using the channelId from the video
        const channel = await Channel.findOne({ channelId: video.channelId });

        // If channel not found, return a 404 response
        if (!channel) {
            return res.status(404).json({ message: 'Channel not found' });
        }

        // Return the channel details
        res.json({ channel });
    } catch (error) {
        console.error('Error fetching channel by video ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
