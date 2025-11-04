
import { HashRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram.js';
import './styles/globals.css';
import Telegram from "@/Telegram.tsx";
import AdminLogin from "@/admin/pages/AdminLogin.tsx";
import AdminDashboard from "@/admin/pages/AdminDashboard.tsx";

function App() {
    const { isTelegram } = useTelegram();
    // const { isAdmin, isLoading } = useAuth();

    // Если в Telegram - показываем основное приложение
    if (isTelegram) {
        return <Telegram />;
    }

    // В браузере - показываем админку или основное приложение
    return (
        <Router>
            <Routes>
                {/* Админские маршруты*/}
                {/*<Route*/}
                {/*    path="/admin/login"*/}
                {/*    element={<AdminLogin />}*/}
                {/*/>*/}
                {/*<Route*/}
                {/*    path="/admin/*"*/}
                {/*    element={*/}
                {/*        true ? <AdminDashboard /> : <Navigate to="/admin/login" />*/}
                {/*    }*/}
                {/*/>*/}

                {/* Основное приложение для пользователей */}
                <Route path="/*" element={<Telegram />} />
            </Routes>
        </Router>
    );
}

export default App;