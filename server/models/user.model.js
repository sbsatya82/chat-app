import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: { 
    type: String, 
    required: true 
  }
  ,
  password: { 
    type: String, 
    required: true 
  },
  userProfilePic: {
    type: String,
    default: ""  // default profile picture
  },
}, {timestamps: true});


const User = mongoose.model("User", userSchema);  


export default User;