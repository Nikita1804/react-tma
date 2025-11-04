import React from 'react';
import { Share2, Users, TrendingUp, Award } from 'lucide-react';

const Team = () => {
    return (
        <div>
            <h1>Ваша команда</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
                Управляйте структурой и зарабатывайте вместе
            </p>

            <div className="card">
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2>Приглашайте и зарабатывайте</h2>
                    <p style={{ color: 'var(--text-light)', marginBottom: '20px' }}>
                        Получайте до 30% с каждого приглашенного партнера
                    </p>
                    <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                        <Share2 size={20} />
                        Поделиться ссылкой
                    </button>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--primary-color)' }}>24</div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Партнера</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--success-color)' }}>8</div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Активных</div>
                    </div>
                    <div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--warning-color)' }}>3</div>
                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>Лидера</div>
                    </div>
                </div>
            </div>

            <div style={{ marginTop: '24px' }}>
                <h2>Материалы для команды</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {[
                        { icon: Users, title: 'Презентация для партнеров', description: 'Готовая презентация о возможностях' },
                        { icon: TrendingUp, title: 'Скрипты продаж', description: 'Готовые диалоги для привлечения' },
                        { icon: Award, title: 'Маркетинг-план', description: 'Подробное описание системы заработка' }
                    ].map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div key={index} className="card">
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Icon size={20} color="var(--primary-color)" />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: '600' }}>{item.title}</div>
                                        <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>{item.description}</div>
                                    </div>
                                    <button className="btn btn-outline" style={{ padding: '8px 16px' }}>
                                        Скачать
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Team;