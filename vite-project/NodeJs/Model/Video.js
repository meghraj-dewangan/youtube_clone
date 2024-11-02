import mongoose from "mongoose";

// Comment Schema
const commentSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  username: {type: String, required:true},
  avatar:{type: String, required: true},
  text: { type: String, required: true },
  timestamp: { type: Date, required: true }
});


const videoSchema = new mongoose.Schema({
  videoId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String, required: true },
  channelId: { type: String, required: true },
  channelName: { type: String },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'channelId', required: true },

  views: { type: Number, default: 0 },

  likes: { type: Number, default: 0 },
  likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // Track users who liked
  dislikes: { type: Number, default: 0 },
  dislikedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] }, // Track users who disliked
  uploadDate: { type: Date, required: true },
  comments: { type: [commentSchema], default: [] },
  category: { type: String, required: true },


});



// Create the model
const Video = mongoose.model('Video', videoSchema);
export default Video;