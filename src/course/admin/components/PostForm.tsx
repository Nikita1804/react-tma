import React, { useState, useEffect } from 'react';
import { X, Image, Calendar, Tag } from 'lucide-react';
import { Post } from '@/course/types';

interface PostFormProps {
    post?: Post | null;
    onSubmit: (data: Omit<Post, 'id' | 'views' | 'date'>) => void;
    onCancel: () => void;
}

const PostForm: React.FC<PostFormProps> = ({ post, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        type: 'article' as Post['type'],
        status: 'draft' as Post['status'],
        image: '',
        tags: [] as string[]
    });

    const [newTag, setNewTag] = useState('');

    useEffect(() => {
        if (post) {
            setFormData({
                title: post.title,
                content: post.content,
                excerpt: post.excerpt,
                type: post.type,
                status: post.status,
                image: post.image || '',
                tags: post.tags || []
            });
        }
    }, [post]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTag();
        }
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h1>{post ? 'Редактировать пост' : 'Создать новый пост'}</h1>
                <button
                    onClick={onCancel}
                    className="btn btn-outline"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <X size={20} />
                    Отмена
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Основная информация</h3>

                    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                Тип контента *
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as Post['type'] }))}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '2px solid var(--border-color)',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    background: 'white'
                                }}
                                required
                            >
                                <option value="article">Статья</option>
                                <option value="video">Видео</option>
                                <option value="announcement">Анонс</option>
                                <option value="webinar">Вебинар</option>
                                <option value="update">Обновление</option>
                            </select>
                        </div>

                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                Статус *
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as Post['status'] }))}
                                style={{
                                    width: '100%',
                                    padding: '12px 16px',
                                    border: '2px solid var(--border-color)',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    background: 'white'
                                }}
                                required
                            >
                                <option value="draft">Черновик</option>
                                <option value="published">Опубликован</option>
                                <option value="scheduled">Запланирован</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                            Заголовок *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                            placeholder="Введите заголовок поста..."
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid var(--border-color)',
                                borderRadius: '12px',
                                fontSize: '16px'
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                            Краткое описание *
                        </label>
                        <textarea
                            value={formData.excerpt}
                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                            placeholder="Краткое описание, которое будет показано в списке..."
                            rows={3}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid var(--border-color)',
                                borderRadius: '12px',
                                fontSize: '16px',
                                resize: 'vertical',
                                minHeight: '80px'
                            }}
                            required
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                            Ссылка на изображение
                        </label>
                        <div style={{ position: 'relative' }}>
                            <Image
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
                                type="url"
                                value={formData.image}
                                onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                                placeholder="https://example.com/image.jpg"
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    border: '2px solid var(--border-color)',
                                    borderRadius: '12px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Содержание</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                            Полный текст *
                        </label>
                        <textarea
                            value={formData.content}
                            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                            placeholder="Полное содержание поста..."
                            rows={12}
                            style={{
                                width: '100%',
                                padding: '12px 16px',
                                border: '2px solid var(--border-color)',
                                borderRadius: '12px',
                                fontSize: '16px',
                                resize: 'vertical',
                                minHeight: '200px',
                                fontFamily: 'monospace'
                            }}
                            required
                        />
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '24px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Теги</h3>

                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                            Добавить теги
                        </label>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <Tag
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
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Введите тег и нажмите Enter..."
                                    style={{
                                        width: '100%',
                                        padding: '12px 12px 12px 40px',
                                        border: '2px solid var(--border-color)',
                                        borderRadius: '12px',
                                        fontSize: '16px'
                                    }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleAddTag}
                                className="btn btn-outline"
                                style={{ whiteSpace: 'nowrap' }}
                            >
                                Добавить тег
                            </button>
                        </div>
                    </div>

                    {formData.tags.length > 0 && (
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600' }}>
                                Добавленные теги
                            </label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {formData.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="badge badge-success"
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => handleRemoveTag(tag)}
                                    >
                    {tag}
                                        <X size={14} />
                  </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                    <button
                        type="button"
                        onClick={onCancel}
                        className="btn btn-outline"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        {post ? 'Обновить пост' : 'Создать пост'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PostForm;