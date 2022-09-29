const express = require("express");
const {
  signup,
  login,
  verifyToken,
  getUser,
  logout,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post('/logout', verifyToken, logout)
// router.get('/refresh', refreshToken, verifyToken, getUser)
//Verify Token
module.exports = router;
