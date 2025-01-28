const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  l_name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  logimage: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Skill", skillSchema);
