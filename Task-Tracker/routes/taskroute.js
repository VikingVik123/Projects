const Task = require('../models/task.js');
const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
  try {
    // Fetch tasks for the authenticated user using req.userId
    const tasks = await Task.find({ user: req.userId });
    res.status(200).json(tasks);  // Send tasks in the response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/add", authMiddleware, async (req, res) => {
  const { title, description } = req.body;
  try {
    const task = new Task({ title, description, user: req.userId });
    await task.save(); // Save the task properly using await
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/update/:id", authMiddleware, async (req, res) => {
  const { title, description, completed } = req.body;
  try {
    // Update task with new data
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true }
    );
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/delete/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
