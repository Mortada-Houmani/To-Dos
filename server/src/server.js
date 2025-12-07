require("reflect-metadata");
const express = require("express");
const cors = require("cors");
const { AppDataSource } = require("./data-source");
const tasksRouter = require("./routes/tasks");

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

// Router group
app.use("/tasks", tasksRouter);

AppDataSource.initialize().then(() => {
  console.log("Database connected");
  app.listen(3000, () => console.log("Server running on port 3000"));
});
