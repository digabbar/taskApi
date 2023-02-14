const User = require("../models/UserModel");
const sendToken = require("../utils.js/sendToken");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  sendToken(user, StatusCodes.OK, res);
};

const getUserProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    status: "success",
    user,
  });
};
const logout = async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    status: "success",
  });
};

module.exports = { login, getUserProfile, logout };
