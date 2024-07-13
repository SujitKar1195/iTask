const router = require('express').Router();
let Task = require('../models/task.model');

// Get all tasks
router.route('/').get(async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Add a new task
router.route('/add').post(async (req, res) => {
  try {
    const {title, description, dueDate, priority, status, history} = req.body;
    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      history,
    });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask); // Respond with saved task data
  } catch (error) {
    console.error('Error adding task:', error);
    res.status(500).json({error: 'Failed to add task'});
  }
});

// Update task
router.route('/update/:id').put(async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {...req.body, $push: {history: {change: 'Task updated'}}},
      {
        new: true,
      }
    );
    if (!updatedTask) {
      return res.status(404).json({error: 'Task not found'});
    }
    res.json(updatedTask); // Respond with updated task data
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Update task status
router.route('/update/:id/status').put(async (req, res) => {
  try {
    const {status} = req.body;
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {status, $push: {history: {change: `Status updated to ${status}`}}},
      {new: true}
    );
    if (!updatedTask) {
      return res.status(404).json({error: 'Task not found'});
    }
    res.json(updatedTask); // Respond with updated task data
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// Delete task
router.route('/delete/:id').delete(async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({error: 'Task not found'});
    }
    res.json('Task deleted.');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

module.exports = router;
