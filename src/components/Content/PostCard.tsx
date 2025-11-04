import React from 'react';
import { Calendar, Eye } from 'lucide-react';

const PostCard = ({ post }) => {
    const getTypeColor = (type) => {
        const colors = {
            article: 'var(--primary-color)',
            video: 'var(--secondary-color)',
            announcement: 'var(--success-color)',
            webinar: 'var(--warning-color)',
            update: 'var(--primary-dark)'
        };
        return colors[type] || 'var(--primary-color)';
    };

    return (
        <div className="card">
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{
                    fontSize: '32px',
                    padding: '12px',
                    background: 'rgba(139, 92, 246, 0.1)',
                    borderRadius: '12px'
                }}>
                    {post.image}
                </div>

                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span
                className="badge"
                style={{
                    background: `${getTypeColor(post.type)}20`,
                    color: getTypeColor(post.type)
                }}
            >
              {post.type}
            </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Calendar size={14} color="var(--text-light)" />
                            <span className="text-sm" style={{ color: 'var(--text-light)' }}>
                {post.date}
              </span>
                        </div>
                    </div>

                    <h3 style={{ marginBottom: '8px' }}>{post.title}</h3>
                    <p style={{ color: 'var(--text-light)', marginBottom: '12px' }} className="text-sm">
                        {post.excerpt}
                    </p>

                    <button className="btn btn-outline" style={{ padding: '8px 16px' }}>
                        <Eye size={16} />
                        Читать
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PostCard;