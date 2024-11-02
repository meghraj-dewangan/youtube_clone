import mongoose from "mongoose";

const channelSchema = new mongoose.Schema({

    channelName: {
        type: String, required: true, unique: true, trim: true,
    },
    channelId: {
        type: String, required: true, unique: true, trim: true,
    },

    description: {
        type: String, default: '', trim: true,

    },

    bannerImage: {
        type: String, default: '', // URL for banner image

    },
    profilePicture: {
        type: String, default: '',// URL for profile picture


    },
   
    subscriberCount: {
        type: Number, default: 0, min: 0,//  can't be negative

    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
    },
    videoCount: {
        type: Number, default: 0, min: 0,


    },

    videos: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Video', // Reference to a Video model

    }],
    createdAt: {
        type: Date, default: Date.now, // Automatically set the date when the channel is created

    },

   
});



// Middleware to update the updatedAt field before saving
channelSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
  });

const Channel = mongoose.model('Channel', channelSchema);

export default Channel;