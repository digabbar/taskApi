const mongoose = require("mongoose");

const connectDB = async (url) => {
  mongoose.set("strictQuery", false);
  return mongoose
    .connect(url)
    .then((res) => {
      console.log("db is connected successfully");
      return res;
    })
    .catch((e) => {
      console.log(e);
      console.log("db is not connected");
    });
};
module.exports = connectDB;
