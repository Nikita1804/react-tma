import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import PostForm from '../components/PostForm.tsx';
import { Post } from '@/course/types';

const PostManager: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async (): Promise<void> => {
        // Здесь будет реальный API call
        const mockPosts: Post[] = [
            {
                id: 1,
                title: 'Как нейросети помогут в MLM бизнесе',
                content: 'Полный текст статьи...',
                excerpt: 'Разбираем реальные кейсы использования ИИ для автоматизации...',
                type: 'article',
                status: 'published',
                date: '2024-01-15T10:00:00Z',
                views: 1247,
                tags: ['нейросети', 'MLM', 'автоматизация'],
                image: '📊'
            },
            {
                id: 2,
                title: 'Новый курс по ChatGPT',
                content: 'Полный текст анонса...',
                excerpt: 'Мы запустили полностью обновленный курс по работе с ChatGPT...',
                type: 'announcement',
                status: 'draft',
                date: '2024-01-14T15:30:00Z',
                views: 0,
                tags: ['курс', 'ChatGPT', 'обучение'],
                image: '🎯'
            }
        ];
        setPosts(mockPosts);
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleEdit = (post: Post): void => {
        setEditingPost(post);
        setShowForm(true);
    };

    const handleDelete = (postId: number): void => {
        if (window.confirm('Удалить этот пост?')) {
            setPosts(posts.filter(post => post.id !== postId));
        }
    };

    const handleFormSubmit = (postData: Omit<Post, 'id' | 'views' | 'date'>): void => {
        if (editingPost) {
            // Обновление существующего поста
            setPosts(posts.map(post =>
                post.id === editingPost.id
                    ? { ...post, ...postData, id: post.id }
                    : post
            ));
        } else {
            // Создание нового поста
            const newPost: Post = {
                ...postData,
                id: Date.now(),
                date: new Date().toISOString(),
                views: 0
            };
            setPosts([newPost, ...posts]);
        }
        setShowForm(false);
        setEditingPost(null);
    };

    const getStatusBadge = (status: Post['status']): string => {
        switch (status) {
            case 'published': return 'badge-success';
            case 'draft': return 'badge-warning';
            case 'scheduled': return 'badge-success';
            default: return 'badge-success';
        }
    };

    const getStatusText = (status: Post['status']): string => {
        switch (status) {
            case 'published': return 'Опубликован';
            case 'draft': return 'Черновик';
            case 'scheduled': return 'Запланирован';
            default: return status;
        }
    };

    if (showForm) {
        return (
            <div style={{ padding: '32px' }}>
                <PostForm
                    post={editingPost}
                    onSubmit={handleFormSubmit}
                    onCancel={() => {
                        setShowForm(false);
                        setEditingPost(null);
                    }}
                />
            </div>
        );
    }

    return (
        <div style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1>Управление постами</h1>
                <button
                    className="btn btn-primary"
                    onClick={() => setShowForm(true)}
                >
                    <Plus size={20} />
                    Создать пост
                </button>
            </div>

            {/* Поиск */}
            <div style={{ position: 'relative', marginBottom: '24px' }}>
                <Search
                    size={20}
                    style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-light)'
                    }}
                />
                <input
                    type="text"
                    placeholder="Поиск постов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '12px 12px 12px 40px',
                        border: '2px solid var(--border-color)',
                        borderRadius: '12px',
                        fontSize: '16px'
                    }}
                />
            </div>

            {/* Таблица постов */}
            <div className="card">
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                        <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                            <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Заголовок</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Тип</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Статус</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Дата</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Просмотры</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Теги</th>
                            <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredPosts.map(post => (
                            <tr key={post.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                <td style={{ padding: '12px', fontWeight: '500', maxWidth: '300px' }}>
                                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>{post.title}</div>
                                    <div style={{ color: 'var(--text-light)', fontSize: '14px' }}>
                                        {post.excerpt.slice(0, 60)}...
                                    </div>
                                </td>
                                <td style={{ padding: '12px' }}>
                    <span className="badge badge-success">
                      {post.type}
                    </span>
                                </td>
                                <td style={{ padding: '12px' }}>
                    <span className={`badge ${getStatusBadge(post.status)}`}>
                      {getStatusText(post.status)}
                    </span>
                                </td>
                                <td style={{ padding: '12px', color: 'var(--text-light)' }}>
                                    {new Date(post.date).toLocaleDateString('ru-RU')}
                                </td>
                                <td style={{ padding: '12px', color: 'var(--text-light)' }}>
                                    {post.views.toLocaleString()}
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', maxWidth: '200px' }}>
                                        {post.tags.slice(0, 3).map(tag => (
                                            <span key={tag} className="badge badge-success" style={{ fontSize: '11px' }}>
                          {tag}
                        </span>
                                        ))}
                                        {post.tags.length > 3 && (
                                            <span className="badge badge-success" style={{ fontSize: '11px' }}>
                          +{post.tags.length - 3}
                        </span>
                                        )}
                                    </div>
                                </td>
                                <td style={{ padding: '12px' }}>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        <button
                                            className="btn btn-outline"
                                            style={{ padding: '6px' }}
                                            onClick={() => handleEdit(post)}
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            className="btn btn-outline"
                                            style={{ padding: '6px', color: '#EF4444', borderColor: '#EF4444' }}
                                            onClick={() => handleDelete(post.id)}
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    {filteredPosts.length === 0 && (
                        <div style={{
                            padding: '40px',
                            textAlign: 'center',
                            color: 'var(--text-light)'
                        }}>
                            {posts.length === 0 ? 'Нет постов' : 'Посты не найдены'}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostManager;