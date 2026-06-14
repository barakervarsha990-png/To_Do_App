export default function TaskFilters({ filters, onChange }) {
  return (
    <div className="task-filters">
      <div className="search-input-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search tasks..."
          value={filters.search}
          onChange={(e) => onChange('search', e.target.value)}
        />
      </div>

      <select
        className="filter-select"
        value={filters.status}
        onChange={(e) => onChange('status', e.target.value)}
      >
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
      </select>

      <select
        className="filter-select"
        value={filters.priority}
        onChange={(e) => onChange('priority', e.target.value)}
      >
        <option value="">All Priority</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select
        className="filter-select"
        value={filters.sort}
        onChange={(e) => onChange('sort', e.target.value)}
      >
        <option value="createdAt">Newest First</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
        <option value="title">Title A-Z</option>
      </select>
    </div>
  );
}