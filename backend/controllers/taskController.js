const Task = require('../models/Task');
const { validationResult } = require('express-validator');

const getTasks = async (req, res, next) => {
  try {
    const { search, status, priority, category, sort } = req.query;
    const query = { userId: req.user.id };
    if (status && ['pending', 'completed'].includes(status)) query.status = status;
    if (priority && ['low', 'medium', 'high'].includes(priority)) query.priority = priority;
    if (category) query.category = { $regex: category, $options: 'i' };
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    let sortOption = { createdAt: -1 };
    if (sort === 'dueDate') sortOption = { dueDate: 1 };
    if (sort === 'priority') sortOption = { priority: -1 };
    if (sort === 'title') sortOption = { title: 1 };
    const tasks = await Task.find(query).sort(sortOption);
    const total = await Task.countDocuments({ userId: req.user.id });
    const completed = await Task.countDocuments({ userId: req.user.id, status: 'completed' });
    const pending = total - completed;
    res.status(200).json({
      success: true,
      count: tasks.length,
      stats: { total, completed, pending },
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array()[0].msg });
    }
    const { title, description, priority, dueDate, category, status } = req.body;
    const task = await Task.create({
      userId: req.user.id,
      title, description, priority,
      dueDate: dueDate || null,
      category: category || 'General',
      status: status || 'pending',
    });
    res.status(201).json({ success: true, message: 'Task created successfully!', task });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    let task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    const { title, description, priority, dueDate, category, status } = req.body;
    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (priority !== undefined) task.priority = priority;
    if (dueDate !== undefined) task.dueDate = dueDate || null;
    if (category !== undefined) task.category = category;
    if (status !== undefined) task.status = status;
    await task.save();
    res.status(200).json({ success: true, message: 'Task updated successfully!', task });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    await task.deleteOne();
    res.status(200).json({ success: true, message: 'Task deleted successfully!' });
  } catch (error) {
    next(error);
  }
};

const toggleTaskStatus = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, userId: req.user.id });
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found.' });
    }
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await task.save();
    res.status(200).json({ success: true, message: `Task marked as ${task.status}!`, task });
  } catch (error) {
    next(error);
  }
};

module.exports = { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus };