const Task = require("../models/TaskModel");
const User = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const { StatusCodes } = require("http-status-codes");
const getAllEmployees = async (req, res) => {
  const allUser = await User.find({ isManager: false });
  res.status(StatusCodes.OK).json({
    status: "success",
    allUser,
  });
};
const newEmployee = async (req, res) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const isManager = isFirstAccount ? true : false;
  const user = await User.create({ ...req.body, isManager });
  res.status(StatusCodes.CREATED).json({ status: "success" });
};
const specificEmployee = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    user,
  });
};
const updateEmployee = async (req, res) => {
  const { id } = req.params;
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    req.body.password = hash;
  }
  const user = await User.findOneAndUpdate(id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({
    status: "success",
  });
};
const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  await user.remove();
  res.status(StatusCodes.OK).json({
    status: "success",
  });
};
const allTasks = async (req, res) => {
  const allTasks = await Task.find({});
  res.status(StatusCodes.OK).json({
    status: "success",
    allTasks,
  });
};
const newTask = async (req, res) => {
  const { id } = req.params;
  const filteredData = { ...req.body, employee: id };
  const newTask = await await await Task.create(filteredData);
  // .populate('employee')
  res.status(StatusCodes.CREATED).json({
    status: "success",
  });
};
const taskDetails = async (req, res) => {
  const { id } = req.params;
  const taskDetail = await Task.findById(id);
  res.status(StatusCodes.OK).json({
    status: "success",
    taskDetail,
  });
};
const updateTask = async (req, res) => {
  const { id } = req.params;
  const updatedTask = await Task.findByIdAndUpdate(id, req.body);
  res.status(StatusCodes.OK).json({
    status: "success",
  });
};
const deleteTask = async (req, res) => {
  const { id } = req.params;
  const deleteTask = await Task.findByIdAndDelete(id);
  res.status(StatusCodes.OK).json({
    status: "success",
  });
};

module.exports = {
  getAllEmployees,
  newEmployee,
  specificEmployee,
  updateEmployee,
  deleteEmployee,
  allTasks,
  newTask,
  taskDetails,
  updateTask,
  deleteTask,
};
