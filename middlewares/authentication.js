const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const isAuthenticatatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(
      new UnauthenticatedError("login first to access this resourse")
    );
  }
  console.log("load");

  const decorded = jwt.verify(token, process.env.JWT_SECRET);
  const { userId } = decorded;
  req.user = await User.findById(userId);
  next();
};

const authorizeRoles = (req, res, next) => {
  if (req.user.isManager === false) {
    return next(
      new UnauthenticatedError(
        `Employee is not allowed to access this resource`
      )
    );
  }
  next();
};

module.exports = { isAuthenticatatedUser, authorizeRoles };
