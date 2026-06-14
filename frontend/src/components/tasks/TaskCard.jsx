export default function TaskCard({ task, onEdit, onDelete, onToggle }) {
  const isCompleted = task.status === 'completed';

  const formatDate = (date) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const handleDelete = () => {
    if (window.confirm('Delete this task?')) onDelete(task._id);
  };

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>
      {/* Checkbox */}
      <button
        className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
        onClick={() => onToggle(task._id)}
        title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
      >
        {isCompleted ? '✓' : ''}
      </button>

      {/* Content */}
      <div className="task-body">
        <div className="task-title">{task.title}</div>
        {task.description && (
          <div className="task-desc">{task.description}</div>
        )}
        <div className="task-meta">
          <span className={`badge badge-${task.priority}`}>
            {task.priority?.toUpperCase()}
          </span>
          {task.category && (
            <span className="badge badge-category">📁 {task.category}</span>
          )}
          {task.dueDate && (
            <span className="badge badge-due">📅 {formatDate(task.dueDate)}</span>
          )}
          {isCompleted && (
            <span className="badge" style={{ background: '#dcfce7', color: '#16a34a' }}>
              ✅ Done
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="task-actions">
        <button className="icon-btn" onClick={() => onEdit(task)} title="Edit">
          ✏️
        </button>
        <button className="icon-btn delete" onClick={handleDelete} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}