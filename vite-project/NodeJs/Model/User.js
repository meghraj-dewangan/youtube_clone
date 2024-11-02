import mongoose from "mongoose";
// Define the User schema

const userSchema = new mongoose.Schema({

    username:{type:String , required:true, unique:true},
    email:{type:String , required:true, unique:true},
    password:{type:String , required:true},
    avatar:{type:String, default:"https://static.vecteezy.com/system/resources/previews/013/659/054/large_2x/human-avatar-user-ui-account-round-clip-art-icon-vector.jpg" },
    channels: [
        {
            id: { type: mongoose.Schema.Types.ObjectId, ref: 'Channel' },
            channelId: { type: String },  // Add channelId field here
            name: { type: String }
        }
    ]
});

const User= mongoose.model('User',userSchema);
export default User;
