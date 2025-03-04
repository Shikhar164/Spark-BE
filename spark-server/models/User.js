const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const categoryEnum = [
  "BU", // Business
  "CR", // Creative
  "ED", // Education
  "EN", // Entertainment
  "FA", // Fashion & Beauty
  "FO", // Food & Beverage
  "GO", // Government & Politics
  "HE", // Health & Wellness
  "NP", // Non-Profit
  "TE", // Tech
  "OT", // Other
  "TR", // Travel & Tourism
];

const themeStyleEnum = ["AIR_SNOW", "AIR_GREY", "AIR_SMOKE", "AIR_BLACK", "MINERAL_BLUE", "MINERAL_GREEN", "MINERAL_ORANGE", "NONE"];

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  terms: { 
    type: Boolean, 
    required:true 
  },
  username: { type: String, unique: true, sparse: true, default: uuidv4 },
  isUserNameAdded: { type: Boolean, default: false },
  image: { type: String },
  bio: { type: String },
  userTheme: {
    type: Object,
    default: {
      bannerColor: "#000000",
      layoutType: "STACK",
      button: {
        fill: "",
        outline: "",
        hardShadow: "",
        softShadow: "",
        special: "",
        backgroundColor: "#28A263",
        color: "#FFFFFF"
      },
    },
  },
  fontInfo: {
    fontType: {
       type: String, default: "Poppins"},
    color: {
        type: String, default: "#000000"
    },
  },
  themeStyle: {
    type: String,
    enum: themeStyleEnum,
    default: "NONE"
  },
});

UserSchema.methods.generateAuthToken = function () {
  const payload = {
    _id: this._id
  };

  const options = {
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, options);
};

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);
