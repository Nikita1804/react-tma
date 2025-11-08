import { Block } from '../../types';

interface RightPanelProps {
    selectedBlock: Block | null;
    onUpdateBlock: (blockId: string, updates: Partial<Block>) => void;
    onDeleteBlock: (blockId: string) => void;
    onAddChild: (parentId: string, type: Block['type']) => void;
}

export function RightPanel({
                               selectedBlock,
                               onUpdateBlock,
                               onDeleteBlock,
                               onAddChild
                           }: RightPanelProps) {
    if (!selectedBlock) {
        return (
            <div className="block-settings">
                <h3>Настройки</h3>
                <p>Выберите блок для редактирования</p>
            </div>
        );
    }

    const handleStyleChange = (property: string, value: string) => {
        onUpdateBlock(selectedBlock.id, {
            styles: {
                ...selectedBlock.styles,
                [property]: value
            }
        });
    };

    return (
        <div className="block-settings">
            <h3>Настройки блока</h3>

            <div style={{ marginBottom: '16px' }}>
                <label>Тип: {selectedBlock.type}</label>
                {selectedBlock.parentId && (
                    <div style={{ fontSize: '12px', color: '#666' }}>
                        Родитель: {selectedBlock.parentId.slice(0, 8)}
                    </div>
                )}
            </div>

            {selectedBlock.type !== 'container' && (
                <div style={{ marginBottom: '16px' }}>
                    <label>Содержимое:</label>
                    {selectedBlock.type === 'text' ? (
                        <textarea
                            className="textarea"
                            value={selectedBlock.content}
                            onChange={(e) => onUpdateBlock(selectedBlock.id, { content: e.target.value })}
                            rows={4}
                        />
                    ) : (
                        <input
                            className="input"
                            type="text"
                            value={selectedBlock.content}
                            onChange={(e) => onUpdateBlock(selectedBlock.id, { content: e.target.value })}
                        />
                    )}
                </div>
            )}

            <h4>Стили</h4>
            <div className="style-controls">
                {selectedBlock.type === 'container' && (
                    <>
                        <div className="style-row">
                            <label>Display:</label>
                            <select
                                className="select"
                                value={selectedBlock.styles.display || 'block'}
                                onChange={(e) => handleStyleChange('display', e.target.value)}
                            >
                                <option value="block">Block</option>
                                <option value="flex">Flex</option>
                                <option value="grid">Grid</option>
                            </select>
                        </div>

                        {selectedBlock.styles.display === 'flex' && (
                            <div className="style-row">
                                <label>Направление flex:</label>
                                <select
                                    className="select"
                                    value={selectedBlock.styles.flexDirection || 'row'}
                                    onChange={(e) => handleStyleChange('flexDirection', e.target.value)}
                                >
                                    <option value="row">Row</option>
                                    <option value="column">Column</option>
                                    <option value="row-reverse">Row Reverse</option>
                                    <option value="column-reverse">Column Reverse</option>
                                </select>
                            </div>
                        )}
                    </>
                )}

                <div className="style-row">
                    <label>Размер шрифта:</label>
                    <input
                        className="input"
                        type="text"
                        value={selectedBlock.styles.fontSize || ''}
                        onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                        placeholder="16px"
                    />
                </div>

                <div className="style-row">
                    <label>Цвет текста:</label>
                    <input
                        className="input"
                        type="text"
                        value={selectedBlock.styles.color || ''}
                        onChange={(e) => handleStyleChange('color', e.target.value)}
                        placeholder="#000000"
                    />
                </div>

                <div className="style-row">
                    <label>Фон:</label>
                    <input
                        className="input"
                        type="text"
                        value={selectedBlock.styles.backgroundColor || ''}
                        onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                        placeholder="transparent"
                    />
                </div>

                <div className="style-row">
                    <label>Отступы:</label>
                    <input
                        className="input"
                        type="text"
                        value={selectedBlock.styles.padding || ''}
                        onChange={(e) => handleStyleChange('padding', e.target.value)}
                        placeholder="10px"
                    />
                </div>

                <div className="style-row">
                    <label>Внешние отступы:</label>
                    <input
                        className="input"
                        type="text"
                        value={selectedBlock.styles.margin || ''}
                        onChange={(e) => handleStyleChange('margin', e.target.value)}
                        placeholder="5px 0"
                    />
                </div>
            </div>

            {selectedBlock.type === 'container' && (
                <div style={{ marginBottom: '16px' }}>
                    <h4>Дочерние блоки</h4>
                    <div className="child-blocks-controls">
                        <button
                            className="btn-secondary"
                            onClick={() => onAddChild(selectedBlock.id, 'text')}
                        >
                            + Текст
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => onAddChild(selectedBlock.id, 'image')}
                        >
                            + Изображение
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => onAddChild(selectedBlock.id, 'contact')}
                        >
                            + Контакты
                        </button>
                        <button
                            className="btn-secondary"
                            onClick={() => onAddChild(selectedBlock.id, 'container')}
                        >
                            + Контейнер
                        </button>
                    </div>
                </div>
            )}

            <button
                className="btn btn-danger"
                onClick={() => onDeleteBlock(selectedBlock.id)}
            >
                Удалить блок
            </button>
        </div>
    );
}