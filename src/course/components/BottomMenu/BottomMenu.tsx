// import { useNavigate } from 'react-router-dom';
import './BottomMenu.css';

const BottomMenu = () => {
    // const navigate = useNavigate();

    const menuItems = [
        {
            id: 'home',
            label: 'Главная',
            icon: '🏠',
            path: '/',
        },
        {
            id: 'tasks',
            label: 'Задачи',
            icon: '✅',
            path: '/tasks',
        },
        {
            id: 'messages',
            label: 'Курсы',
            icon: '💬',
            path: '/messages',
        },
        {
            id: 'profile',
            label: 'Написать мне',
            icon: '👤',
            path: '/profile',
        },
    ];

    const handleClick = (path) => {
        // navigate(path);
    };

    return (
        <nav className="bottom-menu">
            {menuItems.map((item) => (
                    <button
                        key={item.id}
                className="menu-item"
                onClick={() => handleClick(item.path)}
    aria-label={item.label}
    >
    <span className="menu-icon">{item.icon}</span>
        <span className="menu-label">{item.label}</span>
        </button>
))}
    </nav>
);
};

export default BottomMenu;
