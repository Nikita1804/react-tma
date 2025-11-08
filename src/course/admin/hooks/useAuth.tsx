import { useState, useEffect } from 'react';

interface UseAuthReturn {
    isAdmin: boolean;
    isLoading: boolean;
    login: (password: string) => boolean;
    logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const token = localStorage.getItem('admin_token');
        if (token) {
            setIsAdmin(true);
        }
        setIsLoading(false);
    }, []);

    const login = (password: string): boolean => {
        // if (password === process.env.REACT_APP_ADMIN_PASSWORD || password === 'admin123') {
        if (password === 'admin') {
            const token = 'admin_' + Date.now();
            localStorage.setItem('admin_token', token);
            setIsAdmin(true);
            return true;
        }
        return false;
    };

    const logout = (): void => {
        localStorage.removeItem('admin_token');
        setIsAdmin(false);
    };

    return { isAdmin, isLoading, login, logout };
};