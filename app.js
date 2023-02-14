require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDB = require("./db/connectDB");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
//middleware
const notFound = require("./middlewares/notFound");
const errorMiddleware = require("./middlewares/error-handler");

const employeeRoutes = require("./routes/employeeRoutes");
const managerRoutesEmployee = require("./routes/managerRoutesEmployee");
const managerRoutesTasks = require("./routes/managerRoutesTasks");

const loginRoutes = require("./routes/loginRoutes");
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// routes

app.use("/api/v1/manager/employee", managerRoutesEmployee);
app.use("/api/v1/manager/tasks", managerRoutesTasks);
app.use("/api/v1/employee/tasks", employeeRoutes);
app.use("/api/v1", loginRoutes);

app.use("*", notFound);
app.use(errorMiddleware);

const start = async () => {
  try {
    const url = process.env.MONGO_URI;
    const port = process.env.PORT;
    await connectDB(url);
    app.listen(port, () => {
      console.log(`app is listen at port ${port}`);
    });
  } catch (e) {}
};
start();
