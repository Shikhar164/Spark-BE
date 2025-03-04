const multer = require("multer");
const {
  createUser,
  loginUser,
  updateUser,
  getUser,
  updateUserPreferences,
  getShareLink,
} = require("../controllers/user.controllers");
const { isAuth } = require("../middlewares/auth");
const router = require("express").Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fieldSize: 25 * 1024 * 1024 }
});

router.post("/signup", createUser);
router.post("/login", loginUser);
router.get("/user", isAuth, getUser);
router.put("/update", isAuth, updateUser);
router.put(
  "/updateUserPreferences",
  isAuth,
  upload.single("image"),
  updateUserPreferences
);
router.get("/user/:id", getUser);
router.get("/share", isAuth, getShareLink);

module.exports = router;
