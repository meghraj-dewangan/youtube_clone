import mongoose from "mongoose";


// Comment Schema
const commentSchema = new mongoose.Schema({
    commentId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    text: { type: String, required: true },
    timestamp: { type: Date, required: true }
  });
  

const shortsSchema = new mongoose.Schema({
    shortsId: { type: String, required: true },
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  description: { type: String, required: true },
  channelId: { type: String, required: true },
  uploader: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  comments: { type: [commentSchema], default: [] },
  views: { type: Number, default: 0 },

  likes: { type: Number, default: 0 },

  dislikes: { type: Number, default: 0 },

  uploadDate: { type: Date, required: true },
 
  category: {type: String, required: true},
  channelName:{type:String, required:true}

});


// Create the model
const Shorts = mongoose.model('Shorts', shortsSchema);
export default Shorts;