export default function StatCards({ stats }) {
  const cards = [
    { label: 'Total Tasks', value: stats.total, icon: '📋', color: '#6366f1' },
    { label: 'Pending', value: stats.pending, icon: '⏳', color: '#f59e0b' },
    { label: 'Completed', value: stats.completed, icon: '✅', color: '#10b981' },
    {
      label: 'Progress',
      value: stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) + '%' : '0%',
      icon: '📈',
      color: '#8b5cf6'
    },
  ];

  return (
    <div className="stat-cards">
      {cards.map((card) => (
        <div key={card.label} className="stat-card">
          <div className="stat-card-icon">{card.icon}</div>
          <div className="stat-card-value" style={{ color: card.color }}>
            {card.value}
          </div>
          <div className="stat-card-label">{card.label}</div>
        </div>
      ))}
    </div>
  );
}