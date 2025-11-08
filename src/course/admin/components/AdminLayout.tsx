import { Link, useLocation, Outlet } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    Users,
    BarChart3,
    LogOut,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth.tsx';

const AdminLayout = () => {
    const location = useLocation();
    const { logout } = useAuth();

    const menuItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Дашборд' },
        { path: '/admin/posts', icon: FileText, label: 'Управление постами' },
        { path: '/admin/users', icon: Users, label: 'Пользователи' },
        { path: '/admin/analytics', icon: BarChart3, label: 'Аналитика' },
    ];

    const handleLogout = () => {
        logout();
        window.location.href = '/admin/login';
    };

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar */}
            <div style={{
                width: '250px',
                background: 'var(--bg-white)',
                borderRight: '1px solid var(--border-color)',
                padding: '24px 0'
            }}>
                <div style={{ padding: '0 24px 24px', borderBottom: '1px solid var(--border-color)' }}>
                    <h2 style={{ margin: 0 }}>NeuralNetworkPro</h2>
                    <p style={{ color: 'var(--text-light)', margin: 0 }} className="text-sm">
                        Админ-панель
                    </p>
                </div>

                <nav style={{ padding: '24px 0' }}>
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '12px 24px',
                                    color: isActive ? 'var(--primary-color)' : 'var(--text-dark)',
                                    background: isActive ? 'rgba(139, 92, 246, 0.1)' : 'transparent',
                                    borderRight: isActive ? '3px solid var(--primary-color)' : 'none',
                                    textDecoration: 'none',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <Icon size={20} />
                                <span style={{ fontWeight: isActive ? '600' : '400' }}>
                  {item.label}
                </span>
                            </Link>
                        );
                    })}
                </nav>

                <div style={{ padding: '24px', borderTop: '1px solid var(--border-color)' }}>
                    <button
                        onClick={handleLogout}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            width: '100%',
                            padding: '12px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-light)',
                            cursor: 'pointer',
                            borderRadius: '8px',
                            transition: 'background 0.3s ease'
                        }}
                        onMouseOver={(e) =>  e.target instanceof HTMLElement ?  e.target.style.background = 'rgba(239, 68, 68, 0.1)' : null}
                        onMouseOut={(e) =>  e.target instanceof HTMLElement ? e.target.style.background = 'none' : null}
                    >
                        <LogOut size={20} />
                        <span>Выйти</span>
                    </button>
                </div>
            </div>

            {/* Main content */}
            <div style={{ flex: 1, background: 'var(--bg-light)' }}>
                <Outlet />
            </div>
        </div>
    );
};

export default AdminLayout;