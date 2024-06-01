const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: String,
  status: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Role", roleSchema);
