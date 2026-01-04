require("reflect-metadata");
const dotenv = require('dotenv');
dotenv.config();
const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./data-source");
const tasksRouter = require("./routes/tasks");
const authRouter = require("./routes/auth");
const jwt = require("jsonwebtoken");
const app = express();
app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  const start = Date.now();
  console.log(`${req.method} ${req.url}`);

  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`Handled in ${ms}ms`);
  });

  next();
});

// Auth routes
app.use("/auth", authRouter);
app.use((req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired.' });
    }
    return res.status(403).json({ message: `Invalid token: ${error.message}` });
  }
});


// Router group
app.use("/tasks", tasksRouter);

AppDataSource.initialize().then(() => {
  console.log("Database connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
