import { DollarSign, Users, Video, BookOpen } from 'lucide-react';
import HeroSection from '../components/Dashboard/HeroSection';
import StatsCard from '../components/Dashboard/StatsCard';
import PostCard from '../components/Content/PostCard';

const Dashboard = () => {
    const latestPosts = [
        {
            id: 1,
            title: 'Как нейросети помогут в MLM бизнесе',
            excerpt: 'Разбираем реальные кейсы использования ИИ для автоматизации...',
            date: '2 часа назад',
            type: 'article',
            image: '📊'
        },
        {
            id: 2,
            title: 'Обзор новой нейросети для создания контента',
            excerpt: 'Новый инструмент, который ускорит вашу работу в 3 раза...',
            date: '5 часов назад',
            type: 'video',
            image: '🎥'
        }
    ];

    return (
        <div>
            <HeroSection />

            <div style={{ marginTop: '16px' }}>
                <h2>Ваша статистика</h2>
                <div className="grid grid-2">
                    <StatsCard
                        title="Доход"
                        value="12,500 ₽"
                        subtitle="за месяц"
                        trend={15}
                        icon={DollarSign}
                    />
                    <StatsCard
                        title="Команда"
                        value="24"
                        subtitle="участников"
                        trend={8}
                        icon={Users}
                    />
                    <StatsCard
                        title="Обучение"
                        value="8/10"
                        subtitle="уроков пройдено"
                        icon={Video}
                    />
                    <StatsCard
                        title="Курсы"
                        value="2"
                        subtitle="активных"
                        icon={BookOpen}
                    />
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2>Последние новости</h2>
                    <button className="btn btn-outline" style={{ padding: '8px 16px' }}>
                        Все новости
                    </button>
                </div>

                {latestPosts.map(post => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;