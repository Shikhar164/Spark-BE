const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const applicationEnum = ["IN", "FB", "YT", "TW"];

const LinkSchema = new Schema({
  userId: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  linkTitle: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  linkClicks: {
    default: 0,
    type: Number,
  },
  linkType: {
    type: String,
    enum: applicationEnum,
    default: "IN",
  }, 
  show: {
    default: false,
    type: Boolean,
  }
});

module.exports = mongoose.model("Link", LinkSchema);