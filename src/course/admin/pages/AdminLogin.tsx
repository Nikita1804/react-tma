import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth.tsx';

const AdminLogin = () => {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = (e: any) => {
        e.preventDefault();
        setError('');

        if (login(password)) {
            window.location.href = '/admin';
        } else {
            setError('Неверный пароль');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))'
        }}>
            <div className="card" style={{ width: '400px', maxWidth: '90vw' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        padding: '16px',
                        background: 'rgba(139, 92, 246, 0.1)',
                        borderRadius: '50%',
                        display: 'inline-block',
                        marginBottom: '16px'
                    }}>
                        <Lock size={32} color="var(--primary-color)" />
                    </div>
                    <h1>Админ-панель</h1>
                    <p style={{ color: 'var(--text-light)' }}>NeuralNetworkPro</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '8px',
                            fontWeight: '600'
                        }}>
                            Пароль администратора
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '12px 45px 12px 16px',
                                    border: '2px solid var(--border-color)',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    transition: 'border-color 0.3s ease'
                                }}
                                placeholder="Введите пароль..."
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: 'var(--text-light)'
                                }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div style={{
                            padding: '12px',
                            background: '#FEE2E2',
                            color: '#DC2626',
                            borderRadius: '8px',
                            marginBottom: '16px',
                            textAlign: 'center'
                        }}>
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        Войти в админ-панель
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;