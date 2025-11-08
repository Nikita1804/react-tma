import { Users, Zap } from 'lucide-react';

const Header = () => {
    return (
        <header className="card">
            <div className="container">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ margin: 0 }}>NeuralNetworkPro</h1>
                        <p style={{ color: 'var(--text-light)', margin: 0 }} className="text-sm">
                            Зарабатывай с нейросетями
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Users size={16} />
                            <span className="text-sm">1,247</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Zap size={16} />
                            <span className="text-sm">Online</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;