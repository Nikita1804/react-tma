import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/AdminLayout.tsx';
import PostManager from './PostManager.tsx';
// import UserManager from './UserManager';
// import Analytics from './Analytics';
import {PlusCircle} from "lucide-react";

const AdminDashboard = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="posts" element={<PostManager />} />
                {/*<Route path="users" element={<UserManager />} />*/}
                {/*<Route path="analytics" element={<Analytics />} />*/}
            </Route>
        </Routes>
    );
};

const DashboardHome = () => {
    return (
        <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1>Админ-дашборд</h1>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn btn-primary">
                        <PlusCircle size={20} />
                        Создать пост
                    </button>
                </div>
            </div>

            <div className="grid grid-2" style={{ gap: '24px', marginBottom: '32px' }}>
                <div className="card">
                    <h3>Статистика канала</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                        1,247
                    </div>
                    <p style={{ color: 'var(--text-light)' }}>подписчиков</p>
                </div>

                <div className="card">
                    <h3>Посты за месяц</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--secondary-color)' }}>
                        24
                    </div>
                    <p style={{ color: 'var(--text-light)' }}>опубликовано</p>
                </div>

                <div className="card">
                    <h3>Активные пользователи</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--success-color)' }}>
                        892
                    </div>
                    <p style={{ color: 'var(--text-light)' }}>в приложении</p>
                </div>

                <div className="card">
                    <h3>Конверсия</h3>
                    <div style={{ fontSize: '32px', fontWeight: 'bold', color: 'var(--warning-color)' }}>
                        12.4%
                    </div>
                    <p style={{ color: 'var(--text-light)' }}>в покупки курсов</p>
                </div>
            </div>

            <div className="card">
                <h3>Последние действия</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                        { action: 'Новый пост', user: 'Админ', time: '2 часа назад' },
                        { action: 'Пользователь зарегистрировался', user: 'Иван Петров', time: '5 часов назад' },
                        { action: 'Продажа курса', user: 'Мария Сидорова', time: '1 день назад' },
                    ].map((item, index) => (
                        <div key={index} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '12px',
                            background: 'var(--bg-light)',
                            borderRadius: '8px'
                        }}>
                            <div>
                                <div style={{ fontWeight: '600' }}>{item.action}</div>
                                <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>{item.user}</div>
                            </div>
                            <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>{item.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;