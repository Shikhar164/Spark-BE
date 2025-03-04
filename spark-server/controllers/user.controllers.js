const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const { bucket } = require("../config/firebase.config");
const Link = require("../models/Link");
const Shop = require("../models/Shop");

exports.getUser = async (req, res) => {
  try {

    let userDoc;

    if (req.params.id) {
      userDoc = await User.findOne({ _id: req.params.id });
    } else {
      userDoc = await User.findOne({ _id: req.user._id });
    }

    if (!userDoc) {
      return res.status(404).json({ message: "User not found" });
    }

    // Convert to plain object before modifying
    const user = userDoc.toObject();
    delete user.password; // Now safe to remove

    // Fetch user's links and shops
    const [links, shops] = await Promise.all([
      Link.find({ userId: user._id }),
      Shop.find({ userId: user._id }),
    ]);

    // Attach links and shops to user object
    user.links = links;
    user.shops = shops;

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update fields if provided in request
    if (req.body.username) {
      user.username = req.body.username;
      user.isUserNameAdded = true;
    }
    if (req.body.firstName) {
      user.firstName = req.body.firstName;
    }
    if (req.body.lastName) {
      user.lastName = req.body.lastName; // Fixed issue here
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.terms) {
      user.terms = req.body.terms;
    }

    // Handle password update with hashing
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    await user.save();

    // Convert to object before deleting password
    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json(userObj);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { userNameOrEmail, password } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ username: userNameOrEmail }, { email: userNameOrEmail }],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "The password you entered is incorrect*" });
    }
    const token = await user.generateAuthToken();

    res.status(200).json({
      token,
      user: {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        isUserNameAdded: user.isUserNameAdded,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, email, password, terms } = req.body;
  const user = new User({
    firstName,
    lastName,
    email,
    password,
    terms,
  });
  try {
    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    // hash the password
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).json({
      token,
      user: {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.image,
        isUserNameAdded: user.isUserNameAdded,
      },
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updateUserPreferences = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const image = req.file;
    if (image) {
      const fileName = `profile_${Date.now()}_${req.user.firstName}_${
        req.user.lastName
      }_${uuidv4()}`;
      const file = bucket.file(fileName);

      // Save file to Google Cloud Storage
      await file.save(req.file.buffer, { contentType: req.file.mimetype });

      // Make the file public
      await file.makePublic();

      // Assign the generated public URL
      let profileImageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      user.image = profileImageUrl;
    } else {
      user.image = null;
    }

    const links = req.body.links ? JSON.parse(req.body.links) : [];
    if (Array.isArray(links)) {
      for (const link of links) {
        if (link._id) {
          await Link.findByIdAndUpdate(link._id, {
            linkTitle: link.linkTitle,
            linkUrl: link.linkUrl,
            linkType: link.linkType,
            show: link.show,
          });
        } else {
          const newLink = new Link({
            linkTitle: link.linkTitle,
            linkUrl: link.linkUrl,
            linkType: link.linkType,
            show: link.show,
            userId: user._id, // ✅ Include userId
          });
          await newLink.save();
        }
      }
      if (links.length === 0) {
        await Link.deleteMany({ userId: user._id });
      }
    }

    // Parse shops and update accordingly
    const shops = req.body.shops ? JSON.parse(req.body.shops) : [];
    if (Array.isArray(shops)) {
      for (const shop of shops) {
        if (shop._id) {
          await Shop.findByIdAndUpdate(shop._id, {
            shopTitle: shop.shopTitle,
            shopUrl: shop.shopUrl,
            linkType: shop.linkType,
            show: shop.show,
          });
        } else {
          const newShop = new Shop({
            shopTitle: shop.shopTitle,
            shopUrl: shop.shopUrl,
            linkType: shop.linkType,
            show: shop.show,
            userId: user._id, // ✅ Include userId
          });
          await newShop.save();
        }
      }

      if (shops.length === 0) {
        await Shop.deleteMany({ userId: user._id });
      }
    }

    // Update user preferences
    const fieldsToUpdate = ["username", "bio", "userTheme"];

    fieldsToUpdate.forEach((field) => {
      if (field === "userTheme") {
        user[field] = JSON.parse(req.body[field]);
      } else if (req.body[field]) {
        user[field] = req.body[field];
      }
    });

    console.log(req.body.themeStyle, req.body.fontInfo);

    if (req.body.themeStyle) {
      user.themeStyle = req.body.themeStyle;
    }
    if (req.body.fontInfo) {
      user.fontInfo = JSON.parse(req.body.fontInfo);
    }

    console.log(user);

    // failing
    await user.save();
    res.status(200).json({ message: "User preferences updated successfully" });
  } catch (err) {
    console.error("Error updating user preferences:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getShareLink = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });

    if (!user) {
      return res.status(404).json({ message: "Incorrect Link" });
    }

    res.status(200).json({
      shareLink: `${process.env.CLIENT_URL}/share/${user._id}`
    });

  } catch (err) {
    res.status(500).json(err);
  }
};
