// hooks/useTasks.js
// Custom hook that wraps the tasksAPI service.
// Manages tasks state, loading, stats, search/filter params.
// Exposes fetchTasks, addTask, editTask, removeTask, toggleStatus
// so components stay clean and free of API logic.

import { useState, useCallback } from 'react';
import { tasksAPI } from '../services/api';
import toast from 'react-hot-toast';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const data = await tasksAPI.getTasks(filters);
      setTasks(data.tasks);
      setStats(data.stats);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addTask = async (taskData) => {
    try {
      const data = await tasksAPI.createTask(taskData);
      setTasks((prev) => [data.task, ...prev]);
      setStats((prev) => ({
        ...prev,
        total: prev.total + 1,
        pending: prev.pending + 1,
      }));
      toast.success('Task created!');
      return data.task;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const editTask = async (id, taskData) => {
    try {
      const data = await tasksAPI.updateTask(id, taskData);
      setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
      toast.success('Task updated!');
      return data.task;
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const removeTask = async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      const task = tasks.find((t) => t._id === id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setStats((prev) => ({
        total: prev.total - 1,
        completed: task?.status === 'completed' ? prev.completed - 1 : prev.completed,
        pending: task?.status === 'pending' ? prev.pending - 1 : prev.pending,
      }));
      toast.success('Task deleted!');
    } catch (err) {
      toast.error(err.message);
      throw err;
    }
  };

  const toggleStatus = async (id) => {
    try {
      const data = await tasksAPI.toggleStatus(id);
      const wasCompleted = tasks.find((t) => t._id === id)?.status === 'completed';
      setTasks((prev) => prev.map((t) => (t._id === id ? data.task : t)));
      setStats((prev) => ({
        ...prev,
        completed: wasCompleted ? prev.completed - 1 : prev.completed + 1,
        pending: wasCompleted ? prev.pending + 1 : prev.pending - 1,
      }));
      toast.success(data.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return { tasks, stats, loading, error, fetchTasks, addTask, editTask, removeTask, toggleStatus };
};
