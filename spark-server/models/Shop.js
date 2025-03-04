const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShopSchema = new Schema({
  userId: {
    ref: "User",
    type: Schema.Types.ObjectId,
    required: true,
  },
  shopTitle: {
    type: String,
    required: true,
  },
  shopUrl: {
    type: String,
    required: true,
  },
  shopLinkClicks: {
    default: 0,
    type: Number,
  },
  linkType: {
    type: String,
    enum: ["OT"],  //OT - Other
    default: "OT",  
  }, 
  show: {
    default: false,
    type: Boolean,
  }
});

module.exports = mongoose.model("Shop", ShopSchema);