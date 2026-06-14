// routes/taskRoutes.js
// Defines /api/tasks routes: GET, POST, PUT /:id, DELETE /:id, PATCH /:id/status.
// All routes are protected by the auth middleware.

const express = require('express');
const { body } = require('express-validator');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
} = require('../controllers/taskController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All task routes require authentication
router.use(protect);

// Validation rules for task creation/update
const taskValidation = [
  body('title')
    .trim()
    .notEmpty().withMessage('Task title is required')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional({ nullable: true })
    .custom((value) => {
      if (value && isNaN(Date.parse(value))) {
        throw new Error('Invalid due date');
      }
      return true;
    }),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'completed']).withMessage('Status must be pending or completed'),
];

const updateValidation = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty')
    .isLength({ max: 100 }).withMessage('Title cannot exceed 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('dueDate')
    .optional({ nullable: true })
    .custom((value) => {
      if (value && isNaN(Date.parse(value))) {
        throw new Error('Invalid due date');
      }
      return true;
    }),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters'),
  body('status')
    .optional()
    .isIn(['pending', 'completed']).withMessage('Status must be pending or completed'),
];

router.get('/', getTasks);
router.post('/', taskValidation, createTask);
router.put('/:id', updateValidation, updateTask);
router.delete('/:id', deleteTask);
router.patch('/:id/status', toggleTaskStatus);

module.exports = router;
