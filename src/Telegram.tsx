import { useEffect, useState } from 'react';
// @ts-ignore
import { useTelegram } from './hooks/useTelegram.js';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Content from './pages/Content';
import Courses from './pages/Courses';
import Team from './pages/Team';
import News from './pages/News';
import './styles/globals.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import AdminLogin from "@/admin/pages/AdminLogin.tsx";
import AdminDashboard from "@/admin/pages/AdminDashboard.tsx";

const Telegram = () => {
    const { user } = useTelegram();
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();
    const location = useLocation();

    // Синхронизация activeTab с текущим маршрутом
    useEffect(() => {
        const path = location.pathname;

        if (path === '/admin' || path.startsWith('/admin/')) {
            setActiveTab('admin');
        } else {
            // Определяем активный таб из пути
            const pathWithoutSlash = path.replace('/', '');
            if (['dashboard', 'content', 'courses', 'team', 'news'].includes(pathWithoutSlash)) {
                setActiveTab(pathWithoutSlash);
            } else if (path === '/') {
                setActiveTab('dashboard');
            }
        }
    }, [location.pathname]);

    // Обработка перехода на админку
    useEffect(() => {
        if (activeTab === 'admin' && !location.pathname.startsWith('/admin')) {
            navigate('/admin/login');
        }
    }, [activeTab, navigate, location.pathname]);

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);

        if (tab === 'admin') {
            navigate('/admin/login');
        } else if (tab === 'dashboard') {
            navigate('/');
        } else {
            navigate(`/${tab}`);
        }
    };

    return (
        <Layout
            activeTab={activeTab}
            onTabChange={handleTabChange}
            user={user}
        >
            <Routes>
                {/* Основные маршруты */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/content" element={<Content />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/team" element={<Team />} />
                <Route path="/news" element={<News />} />

                {/* Админские маршруты */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                    path="/admin/*"
                    element={
                        true ? <AdminDashboard /> : <AdminLogin />
                    }
                />
            </Routes>
        </Layout>
    );
}

export default Telegram;