const express = require("express");
const router = express.Router();
const { getAllAssignedTasks } = require("../controllers/employee");
const { isAuthenticatatedUser } = require("../middlewares/authentication");
router.get("/", isAuthenticatatedUser, getAllAssignedTasks);

module.exports = router;
