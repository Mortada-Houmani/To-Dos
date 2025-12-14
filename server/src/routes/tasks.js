const express = require("express");
const router = express.Router();
const { AppDataSource } = require("../data-source");
const Task = require("../entities/task");
const { Like } = require("typeorm"); 
const repo = AppDataSource.getRepository("Task");

router
  .route("/")
  .get(async (req, res) => {
    const { query } = req.query;        
    console.log("Query parameters:", query);

    const where = query
      ? { text: Like(`%${query}%`) }   
      : {};

    const tasks = await repo.find({ where });
    res.json(tasks);
  })
  .post(async (req, res) => {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Text is required" });

    const task = repo.create({ text, completed: false });
    const saved = await repo.save(task);
    res.json(saved);
  });

router
  .route("/:id")
  .put(async (req, res) => {
    const { id } = req.params;
    const { text, completed } = req.body;

    const task = await repo.findOneBy({ id });
    if (!task) return res.status(404).json({ error: "Task not found" });

    task.text = text;
    task.completed = completed;

    const updated = await repo.save(task);
    res.json(updated);
  })
  .delete(async (req, res) => {
    const { id } = req.params;
    await repo.delete(id);
    res.sendStatus(204);
  });

module.exports = router;
