import React, { useState, useEffect } from 'react';
import PostCard from '../components/Content/PostCard';

const News = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Имитация загрузки постов из канала
    useEffect(() => {
        // Здесь будет реальный API call к вашему бэкенду
        const mockPosts = [
            {
                id: 1,
                title: 'Новый курс по ChatGPT для MLM',
                excerpt: 'Мы запустили полностью обновленный курс по работе с ChatGPT специально для MLM-бизнеса...',
                date: '2 часа назад',
                type: 'announcement',
                image: '🎯',
                content: 'Полный текст поста...'
            },
            {
                id: 2,
                title: 'Вебинар: Автоматизация привлечения',
                excerpt: 'Приглашаем на бесплатный вебинар по автоматизации процессов привлечения новых партнеров...',
                date: '5 часов назад',
                type: 'webinar',
                image: '📅'
            },
            {
                id: 3,
                title: 'Обновление маркетинг-плана',
                excerpt: 'Важные изменения в системе вознаграждений. Увеличили бонусы за активность...',
                date: '1 день назад',
                type: 'update',
                image: '📈'
            }
        ];

        setTimeout(() => {
            setPosts(mockPosts);
            setLoading(false);
        }, 1000);
    }, []);

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: '40px' }}>
                <div>Загрузка новостей...</div>
            </div>
        );
    }

    return (
        <div>
            <h1>Новости канала</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
                Все последние обновления из нашего Telegram-канала
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {posts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default News;