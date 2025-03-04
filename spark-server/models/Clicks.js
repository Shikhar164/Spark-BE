const mongoose = require("mongoose");
const { link } = require("../routes/user.routes");
const Schema = mongoose.Schema;

const ClicksSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  linkId: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  linkType: {
    type: String,
    required: true,
  },
  viewType: {
    type: String,
    required: true,
    enum: ["EXTERNAL", "INTERNAL"],
    required: true,
  },
  deviceInfo: {
    type: String,
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Clicks", ClicksSchema);