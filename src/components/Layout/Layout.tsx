import Header from './Header';
import BottomNavigation from './BottomNavigation';

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