const mongoose = require("mongoose");

const appUserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    required: [true, "Please enter a valid email address"],
  },
  role: String,
  status: String,
  contact: Number,
});

module.exports = mongoose.model("appUser", appUserSchema);
