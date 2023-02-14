const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const User = require("../models/UserModel");

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  employee: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
module.exports = mongoose.model("Task", taskSchema);
