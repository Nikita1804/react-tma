import { Star, Clock, Users } from 'lucide-react';

const Courses = () => {
    const courses = [
        {
            id: 1,
            title: 'Нейросети для MLM',
            price: '12,900 ₽',
            originalPrice: '19,900 ₽',
            rating: 4.9,
            students: 1247,
            duration: '6 недель',
            description: 'Полный курс по автоматизации MLM-бизнеса с помощью нейросетей',
            image: '🚀'
        },
        {
            id: 2,
            title: 'Профессия AI-Специалист',
            price: '24,900 ₽',
            originalPrice: '34,900 ₽',
            rating: 4.8,
            students: 892,
            duration: '8 недель',
            description: 'Освойте востребованную профессию будущего',
            image: '🎯'
        }
    ];

    return (
        <div>
            <h1>Платные курсы</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
                Глубокое обучение с поддержкой куратора
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {courses.map(course => (
                    <div key={course.id} className="card">
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div style={{
                                fontSize: '48px',
                                padding: '16px',
                                background: 'rgba(139, 92, 246, 0.1)',
                                borderRadius: '12px'
                            }}>
                                {course.image}
                            </div>

                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: '8px' }}>{course.title}</h3>
                                <p style={{ color: 'var(--text-light)', marginBottom: '12px' }} className="text-sm">
                                    {course.description}
                                </p>

                                <div style={{ display: 'flex', gap: '12px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Star size={16} color="var(--warning-color)" />
                                        <span className="text-sm">{course.rating}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Users size={16} color="var(--primary-color)" />
                                        <span className="text-sm">{course.students}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={16} color="var(--secondary-color)" />
                                        <span className="text-sm">{course.duration}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                    <span style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--primary-color)' }}>
                      {course.price}
                    </span>
                                        <span style={{
                                            textDecoration: 'line-through',
                                            color: 'var(--text-light)',
                                            marginLeft: '8px',
                                            fontSize: '14px'
                                        }}>
                      {course.originalPrice}
                    </span>
                                    </div>
                                    <button className="btn btn-primary">
                                        Купить курс
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Courses;