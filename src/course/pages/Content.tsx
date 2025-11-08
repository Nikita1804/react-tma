import { PlayCircle, Download, BookOpen } from 'lucide-react';

const Content = () => {
    const resources = [
        {
            id: 1,
            title: 'Основы нейросетей для новичков',
            type: 'video',
            duration: '15 мин',
            icon: PlayCircle,
            description: 'Базовые принципы работы нейросетей'
        },
        {
            id: 2,
            title: 'Шаблоны промптов для ChatGPT',
            type: 'document',
            icon: Download,
            description: '50+ готовых промптов'
        },
        {
            id: 3,
            title: 'Гайд по автоматизации MLM',
            type: 'guide',
            icon: BookOpen,
            description: 'Пошаговое руководство'
        }
    ];

    return (
        <div>
            <h1>Бесплатное обучение</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
                Освойте нейросети с нуля
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {resources.map(resource => {
                    const Icon = resource.icon;
                    return (
                        <div key={resource.id} className="card">
                            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                <div style={{
                                    padding: '12px',
                                    background: 'rgba(139, 92, 246, 0.1)',
                                    borderRadius: '12px'
                                }}>
                                    <Icon size={24} color="var(--primary-color)" />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{ marginBottom: '8px' }}>{resource.title}</h3>
                                    <p style={{ color: 'var(--text-light)', marginBottom: '12px' }} className="text-sm">
                                        {resource.description}
                                    </p>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span className="badge badge-success">{resource.type}</span>
                                        <button className="btn btn-primary" style={{ padding: '8px 16px' }}>
                                            Открыть
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Content;