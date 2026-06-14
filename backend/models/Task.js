const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: [true, 'Task title is required'], trim: true, maxlength: 100 },
    description: { type: String, trim: true, maxlength: 500, default: '' },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: Date, default: null },
    category: { type: String, trim: true, maxlength: 50, default: 'General' },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

taskSchema.pre('save', function (next) {
  if (this.isModified('status')) {
    this.completedAt = this.status === 'completed' ? new Date() : null;
  }
  next();
});

module.exports = mongoose.model('Task', taskSchema);