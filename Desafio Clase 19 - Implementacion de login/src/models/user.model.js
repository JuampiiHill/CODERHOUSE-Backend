import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
    required: true,
    index: true,
  },
  password: String,
  img: String,
  role: {
    type: String,
    default: 'usuario'
  },
  });

const userModel = mongoose.model("userForChallenge19", userSchema);

export default userModel;
