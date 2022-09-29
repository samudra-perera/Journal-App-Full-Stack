const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  refreshToken,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
// router.get('/refresh', refreshToken, verifyToken, getUser)
//Verify Token
module.exports = router;
