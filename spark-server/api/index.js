require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("../routes/user.routes");
const analyticsRoutes = require("../routes/analytics.routes");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: "*", optionsSuccessStatus:200 }));
// test route
app.get("/test", (req, res) => {
  res.send("Hello World! This is Spark Server");
});

// user routes
app.use("/", userRoutes);
app.use("/analytics", analyticsRoutes);


const port = process.env.PORT || 8080;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
