const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    }, 
    email: {
        type: email,
        required: true,
      },
    mobile: {
      type: Number,
      default: 0,
    }, 
    password: {
        type: string,
        required: true,
      }
  });
  
  const User = mongoose.model("User", UserSchema);

  module.exports = User;
  