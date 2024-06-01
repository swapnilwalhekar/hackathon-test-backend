const mongoose = require("mongoose");

const appUserSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  status: String,
  contact: Number,
});

module.exports = mongoose.model("appUser", appUserSchema);
