const StatsCard = ({ title, value, subtitle, trend, icon: Icon }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>{title}</h3>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '4px' }}>
                        {value}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span className="text-sm" style={{ color: 'var(--text-light)' }}>
              {subtitle}
            </span>
                        {trend && (
                            <span className={`badge ${trend > 0 ? 'badge-success' : 'badge-warning'}`}>
                {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
              </span>
                        )}
                    </div>
                </div>
                {Icon && (
                    <div style={{
                        padding: '12px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '12px'
                    }}>
                        <Icon size={24} color="var(--primary-color)" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StatsCard;