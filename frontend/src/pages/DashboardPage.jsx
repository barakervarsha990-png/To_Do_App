// pages/DashboardPage.jsx
// Main dashboard. Orchestrates the sidebar, navbar, stat cards, search/filter
// bar, task list, and task modal. Fetches tasks on mount and re-fetches
// whenever search/filter state changes.

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTasks } from '../hooks/useTasks';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';
import StatCards from '../components/tasks/StatCards';
import TaskFilters from '../components/tasks/TaskFilters';
import TaskList from '../components/tasks/TaskList';
import TaskModal from '../components/tasks/TaskModal';
import Spinner from '../components/common/Spinner';

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, stats, loading, fetchTasks, addTask, editTask, removeTask, toggleStatus } = useTasks();

  const [filters, setFilters] = useState({ search: '', status: '', priority: '', sort: 'createdAt' });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const loadTasks = useCallback(() => {
    // Strip empty params
    const params = Object.fromEntries(
      Object.entries(filters).filter(([, v]) => v)
    );
    fetchTasks(params);
  }, [filters, fetchTasks]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleOpenAdd = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const handleModalSubmit = async (taskData) => {
    if (editingTask) {
      await editTask(editingTask._id, taskData);
    } else {
      await addTask(taskData);
    }
    setModalOpen(false);
    loadTasks();
  };

  return (
    <div className="dashboard-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dashboard-main">
        <Navbar
          onMenuClick={() => setSidebarOpen(true)}
          onAddTask={handleOpenAdd}
        />

        <div className="dashboard-content">
          {/* Welcome header */}
          <div className="welcome-header">
            <div>
              <h1 className="welcome-title">
                Good {getGreeting()},{' '}
                <span className="welcome-name">{user?.name?.split(' ')[0]}</span> 👋
              </h1>
              <p className="welcome-sub">
                {stats.pending === 0
                  ? 'All caught up! Great work.'
                  : `You have ${stats.pending} pending task${stats.pending !== 1 ? 's' : ''} to complete.`}
              </p>
            </div>
            <button className="btn btn-primary add-task-hero" onClick={handleOpenAdd}>
              <span>+</span> New Task
            </button>
          </div>

          <StatCards stats={stats} />

          <TaskFilters filters={filters} onChange={handleFilterChange} />

          {loading ? (
            <Spinner />
          ) : (
            <TaskList
              tasks={tasks}
              onEdit={handleOpenEdit}
              onDelete={removeTask}
              onToggle={toggleStatus}
            />
          )}
        </div>
      </div>

      {modalOpen && (
        <TaskModal
          task={editingTask}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
    </div>
  );
}

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'morning';
  if (h < 17) return 'afternoon';
  return 'evening';
}
