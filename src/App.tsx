import React, { useState } from 'react';
import { useTelegram } from './hooks/useTelegram';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Content from './pages/Content';
import Courses from './pages/Courses';
import Team from './pages/Team';
import News from './pages/News';
import './styles/globals.css';

function App() {
    const { user } = useTelegram();
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <Dashboard />;
            case 'content':
                return <Content />;
            case 'courses':
                return <Courses />;
            case 'team':
                return <Team />;
            case 'news':
                return <News />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <Layout
            activeTab={activeTab}
            onTabChange={setActiveTab}
            user={user}
        >
            {renderContent()}
        </Layout>
    );
}

export default App;