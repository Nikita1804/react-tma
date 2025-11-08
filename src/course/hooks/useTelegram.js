import { useEffect, useState } from 'react';

export const useTelegram = () => {
    const [user, setUser] = useState(null);
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        if (window.Telegram?.WebApp) {
            const tg = window.Telegram.WebApp;

            // Инициализация
            tg.ready();
            tg.expand();

            // Получаем данные пользователя
            setUser(tg.initDataUnsafe?.user);

            // Устанавливаем тему
            setTheme(tg.colorScheme);

            // Следим за изменением темы
            tg.onEvent('themeChanged', () => {
                setTheme(tg.colorScheme);
            });
        }
    }, []);

    return {
        user,
        theme,
        isTelegram: !!window.Telegram?.WebApp
    };
};