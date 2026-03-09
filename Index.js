require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoute = require("./Router/AuthRouter");
const GoalRouter = require("./Router/GoalRouter");
const errormiddleware = require("./Middlewares/errormiddleware");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection (no extra options needed in Mongoose v7+)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

// Routes
app.use("/", authRoute);        // Auth routes: /signup, /login
app.use("/goals", GoalRouter);  // Goal routes: /goals, /goals/:id

// Global error middleware
app.use(errormiddleware);

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});