
import { HashRouter  as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTelegram } from './hooks/useTelegram.js';
import '@/course/styles/globals.css';
import Telegram from "@/course/Telegram.tsx";
import AdminLogin from "@/course/admin/pages/AdminLogin.tsx";
import AdminDashboard from "@/course/admin/pages/AdminDashboard.tsx";

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