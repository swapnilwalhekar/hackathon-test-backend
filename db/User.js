const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
  },
  role: String,
  status: String,
  contact: Number,
  password: String,
});

module.exports = mongoose.model("users", userSchema);
