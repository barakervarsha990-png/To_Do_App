import { useAuth } from '../../context/AuthContext';

export default function Sidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 50,
            display: 'none'
          }}
        />
      )}

      <aside className="sidebar">
        <div className="sidebar-logo">
          <span className="logo-icon">✓</span>
          TaskFlow
        </div>

        <button className="sidebar-item active">
          📋 All Tasks
        </button>

        <button className="sidebar-item">
          ⏳ Pending
        </button>

        <button className="sidebar-item">
          ✅ Completed
        </button>

        <button className="sidebar-item">
          🔴 High Priority
        </button>

        <button className="sidebar-item">
          📅 Due Today
        </button>

        <div className="sidebar-bottom">
          <div style={{
            padding: '0.75rem',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            marginBottom: '0.5rem'
          }}>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginBottom: '0.25rem' }}>
              Logged in as
            </div>
            <div style={{ fontSize: '0.875rem', color: 'white', fontWeight: '500' }}>
              {user?.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
              {user?.email}
            </div>
          </div>

          <button className="sidebar-item" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </aside>
    </>
  );
}