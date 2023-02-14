const bcrypt = require("bcryptjs");
require("dotenv").config();
const connectDB = require("../db/connectDB");
const User = require("../models/UserModel");
const data = require("./data");
const start = async () => {
  try {
    let { password } = data;
    console.log(password);
    await connectDB(process.env.MONGO_URI);
    await User.deleteMany({});
    await User.create({ ...data, password });
    console.log("data is seeded successfully");
    process.exit();
  } catch (e) {
    console.log(e);
    process.exit();
  }
};
start();
