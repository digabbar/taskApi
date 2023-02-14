const express = require("express");
const router = express.Router();
const { login, getUserProfile, logout } = require("../controllers/login");
const { isAuthenticatatedUser } = require("../middlewares/authentication");
router.post("/login", login);
router.get("/me", isAuthenticatatedUser, getUserProfile);
router.get("/logout", isAuthenticatatedUser, logout);

module.exports = router;
