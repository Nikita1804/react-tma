import Header from './Header.tsx';
import BottomNavigation from './BottomNavigation.tsx';

const Layout = ({ children, activeTab, onTabChange }: any) => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-light)' }}>
            <Header />
            <main className="main-content">
                {children}
            </main>
            <BottomNavigation activeTab={activeTab} onTabChange={onTabChange} />
        </div>
    );
};

export default Layout;