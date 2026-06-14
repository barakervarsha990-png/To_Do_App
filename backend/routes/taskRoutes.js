const express = require('express');
const { body } = require('express-validator');
const { getTasks, createTask, updateTask, deleteTask, toggleTaskStatus } = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

const taskValidation = [
  body('title').trim().notEmpty().withMessage('Task title is required').isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('status').optional().isIn(['pending', 'completed']).withMessage('Status must be pending or completed'),
];

router.get('/', getTasks);
router.post('/', taskValidation, createTask);
router.put('/:id', taskValidation, updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', toggleTaskStatus);

module.exports = router;