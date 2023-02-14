const Task = require("../models/TaskModel");
const User = require("../models/UserModel");

const getAllAssignedTasks = async (req, res) => {
  const task = await Task.find({ employee: req.user._id });
  res.status(200).json({
    status: "success",
    task,
  });
};

module.exports = { getAllAssignedTasks };
