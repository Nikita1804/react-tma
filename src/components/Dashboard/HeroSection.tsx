import React from 'react';
import { Rocket, Star, TrendingUp } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="card" style={{
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
            color: 'white'
        }}>
            <div style={{ textAlign: 'center' }}>
                <h1 style={{ color: 'white', marginBottom: '12px' }}>
                    Зарабатывай на нейросетях
                </h1>
                <p style={{ marginBottom: '20px', opacity: 0.9 }}>
                    Автоматизируй бизнес и увеличивай доход с помощью ИИ
                </p>

                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                        <TrendingUp size={24} />
                        <div style={{ fontSize: '14px', marginTop: '4px' }}>+247%</div>
                        <div style={{ fontSize: '12px', opacity: 0.8 }}>Рост команды</div>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <Star size={24} />
                        <div style={{ fontSize: '14px', marginTop: '4px' }}>4.9/5</div>
                        <div style={{ fontSize: '12px', opacity: 0.8 }}>Рейтинг</div>
                    </div>
                </div>

                <button className="btn" style={{
                    background: 'white',
                    color: 'var(--primary-color)',
                    width: '100%',
                    justifyContent: 'center'
                }}>
                    <Rocket size={20} />
                    Начать зарабатывать
                </button>
            </div>
        </div>
    );
};

export default HeroSection;