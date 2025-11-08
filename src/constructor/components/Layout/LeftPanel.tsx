import { Block } from '../../types';

interface LeftPanelProps {
    blocks: Block[];
    onAddBlock: (type: Block['type']) => void;
    onSelectBlock: (block: Block) => void;
    selectedBlock: Block | null;
}

function BlockTreeItem({
                           block,
                           level = 0,
                           onSelectBlock,
                           selectedBlock
                       }: {
    block: Block;
    level?: number;
    onSelectBlock: (block: Block) => void;
    selectedBlock: Block | null;
}) {
    const paddingLeft = 16 + level * 16;

    return (
        <div>
            <div
                onClick={() => onSelectBlock(block)}
                style={{
                    paddingLeft: `${paddingLeft}px`
                }}
                className={`block-tree-item ${selectedBlock?.id === block.id ? 'selected' : ''}`}
            >
                {block.type === 'container' ? '📁 ' : ''}
                {block.type} - {block.id.slice(0, 6)}
                {block.children.length > 0 && ` (${block.children.length})`}
            </div>

            {block.children.map(child => (
                <BlockTreeItem
                    key={child.id}
                    block={child}
                    level={level + 1}
                    onSelectBlock={onSelectBlock}
                    selectedBlock={selectedBlock}
                />
            ))}
        </div>
    );
}

export function LeftPanel({ blocks, onAddBlock, onSelectBlock, selectedBlock }: LeftPanelProps) {
    const flattenBlocks = (blocks: Block[]): Block[] => {
        const result: Block[] = [];

        function traverse(block: Block) {
            result.push(block);
            block.children.forEach(traverse);
        }

        blocks.forEach(traverse);
        return result;
    };

    return (
        <div>
            <h3>Доступные блоки</h3>
            <button
                className="btn btn-primary"
                onClick={() => onAddBlock('text')}
            >
                + Текстовый блок
            </button>
            <button
                className="btn btn-primary"
                onClick={() => onAddBlock('image')}
            >
                + Блок с изображением
            </button>
            <button
                className="btn btn-primary"
                onClick={() => onAddBlock('contact')}
            >
                + Контактный блок
            </button>
            <button
                className="btn btn-primary"
                onClick={() => onAddBlock('container')}
            >
                + Контейнер
            </button>

            <h3 style={{ marginTop: '20px' }}>Дерево блоков</h3>
            <div className="block-tree">
                {blocks.map((block) => (
                    <BlockTreeItem
                        key={block.id}
                        block={block}
                        onSelectBlock={onSelectBlock}
                        selectedBlock={selectedBlock}
                    />
                ))}
            </div>

            <h3 style={{ marginTop: '20px' }}>Все блоки ({flattenBlocks(blocks).length})</h3>
            <div style={{ fontSize: '11px', maxHeight: '200px', overflowY: 'auto' }}>
                {flattenBlocks(blocks).map((block) => (
                    <div
                        key={block.id}
                        onClick={() => onSelectBlock(block)}
                        className={`block-tree-item ${selectedBlock?.id === block.id ? 'selected' : ''}`}
                        style={{ fontSize: '11px', padding: '4px' }}
                    >
                        {block.parentId ? '└─ ' : ''}{block.type} - {block.id.slice(0, 6)}
                    </div>
                ))}
            </div>
        </div>
    );
}