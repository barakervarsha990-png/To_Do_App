import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar({ onMenuClick, onAddTask }) {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="navbar">
      <button className="icon-btn" onClick={onMenuClick} style={{ fontSize: '1.3rem' }}>
        ☰
      </button>

      <div className="navbar-brand">
        <span className="logo-icon">✓</span>
        TaskFlow
      </div>

      <div className="navbar-right">
        <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
          {isDark ? '☀️' : '🌙'}
        </button>

        <button className="btn btn-primary" onClick={onAddTask}>
          + New Task
        </button>

        <div className="user-avatar" title={user?.name}>
          {user?.name?.charAt(0).toUpperCase()}
        </div>

        <button className="btn btn-ghost" onClick={logout} style={{ fontSize: '0.8rem' }}>
          Logout
        </button>
      </div>
    </nav>
  );
}