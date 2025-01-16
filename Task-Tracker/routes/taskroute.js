const Task = require('../models/task.js');
const express = require('express');
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authMiddleware, async (req, res) => {
    const {title, description} = req.body;
    try {
        const task = new Task({title, description, user: req.user._id});
        task.save();
        res.status(201).json({message: "Task added successfully"});
    } catch(error) {
        res.status(400).json({error: error.message})
    }
})

router.post("/", authMiddleware, async (req, res) => {
    const {title, description} = req.body;
    try {
        const task = await new Task({title, description, user: req.user._id});
        task.save();
        res.status(201).json({message: "Task added successfully"});
    } catch(error) {
        res.status(400).json({error: error.message})
    }
})

router.put("/:id", authMiddleware, async (req, res) => {
    const {title, description} = req.body;
    try {
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

router.delete("/:id", authMiddleware, async (req, res) => {
    try {
      await Task.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  module.exports = router;