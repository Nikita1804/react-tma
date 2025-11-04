import { Home, PlayCircle, BookOpen, Users, Newspaper, Magnet } from 'lucide-react';

const BottomNavigation = ({ activeTab, onTabChange }: any) => {
    const tabs = [
        { id: 'dashboard', label: 'Главная', icon: Home },
        { id: 'content', label: 'Обучение', icon: PlayCircle },
        { id: 'courses', label: 'Курсы', icon: BookOpen },
        { id: 'team', label: 'Команда', icon: Users },
        { id: 'news', label: 'Новости', icon: Newspaper },
        { id: 'admin', label: 'Admin', icon: Magnet }
    ];

    return (
        <nav className="bottom-nav">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                    <button
                        key={tab.id}
                        className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => onTabChange(tab.id)}
                    >
                        <Icon className="nav-icon" />
                        <span className="nav-label">{tab.label}</span>
                    </button>
                );
            })}
        </nav>
    );
};

export default BottomNavigation;