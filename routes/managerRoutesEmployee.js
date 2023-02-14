const express = require("express");
const router = express.Router();
const {
  getAllEmployees,
  newEmployee,
  specificEmployee,
  updateEmployee,
  deleteEmployee,
  newTask,
} = require("../controllers/manager");
const {
  isAuthenticatatedUser,
  authorizeRoles,
} = require("../middlewares/authentication");

router.get("/", isAuthenticatatedUser, authorizeRoles, getAllEmployees);
router.post("/new", newEmployee);
router
  .route("/:id")
  .get(isAuthenticatatedUser, authorizeRoles, specificEmployee)
  .put(isAuthenticatatedUser, authorizeRoles, updateEmployee)
  .delete(isAuthenticatatedUser, authorizeRoles, deleteEmployee);

router.post("/:id/tasks/new", isAuthenticatatedUser, authorizeRoles, newTask);

module.exports = router;
