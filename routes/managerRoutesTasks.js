const express = require("express");
const router = express.Router();

const {
  allTasks,
  taskDetails,
  updateTask,
  deleteTask,
} = require("../controllers/manager");
const {
  isAuthenticatatedUser,
  authorizeRoles,
} = require("../middlewares/authentication");

router.get("/", isAuthenticatatedUser, authorizeRoles, allTasks);

router
  .route("/:id")
  .get(isAuthenticatatedUser, authorizeRoles, taskDetails)
  .put(isAuthenticatatedUser, authorizeRoles, updateTask)
  .delete(isAuthenticatatedUser, authorizeRoles, deleteTask);

module.exports = router;
