import { Block } from '../../types';
import { TextBlock } from './TextBlock';
import { ImageBlock } from './ImageBlock';
import { ContactBlock } from './ContactBlock';
import { ContainerBlock as ContainerBlockComponent } from './ContainerBlock';

interface ContainerBlockProps {
    block: Block;
    onClick: () => void;
    isSelected: boolean;
    onAddChild: (parentId: string, type: Block['type']) => void;
    onSelectBlock: (block: Block) => void;
    selectedBlock: Block | null;
    onDragStart: (e: React.DragEvent, block: Block, index: number) => void;
    onDragOver: (e: React.DragEvent, parentId?: string) => void;
    onDragLeave: () => void;
    onDrop: (e: React.DragEvent, parentId?: string, index?: number) => void;
    onDragEnd: () => void;
    dragOverParent: string | null;
    draggedItem: any;
    index?: number;
}

export function ContainerBlock({
                                   block,
                                   onClick,
                                   isSelected,
                                   onAddChild,
                                   onSelectBlock,
                                   selectedBlock,
                                   onDragStart,
                                   onDragOver,
                                   onDragLeave,
                                   onDrop,
                                   onDragEnd,
                                   dragOverParent,
                                   draggedItem,
                                   index = 0
                               }: ContainerBlockProps) {
    const isDragOver = dragOverParent === block.id;
    const isBeingDragged = draggedItem?.id === block.id;

    const renderChildBlock = (childBlock: Block, childIndex: number) => {
        const props = {
            block: childBlock,
            onClick: () => onSelectBlock(childBlock),
            isSelected: selectedBlock?.id === childBlock.id,
            onAddChild,
            onSelectBlock,
            selectedBlock,
            onDragStart,
            onDragOver,
            onDragLeave,
            onDrop,
            onDragEnd,
            dragOverParent,
            draggedItem,
            index: childIndex
        };

        switch (childBlock.type) {
            case 'text':
                return <TextBlock key={childBlock.id} {...props} />;
            case 'image':
                return <ImageBlock key={childBlock.id} {...props} />;
            case 'contact':
                return <ContactBlock key={childBlock.id} {...props} />;
            case 'container':
                return <ContainerBlockComponent key={childBlock.id} {...props} />;
            default:
                return null;
        }
    };

    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, block, index)}
            onDragOver={(e) => onDragOver(e, block.id)}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, block.id)}
            onDragEnd={onDragEnd}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            style={{
                display: block.styles.display,
                flexDirection: block.styles.flexDirection,
                backgroundColor: block.styles.backgroundColor,
                padding: block.styles.padding,
                margin: block.styles.margin
            }}
            className={`
        block container-block 
        ${isSelected ? 'selected' : ''} 
        ${isBeingDragged ? 'dragging' : ''}
        ${isDragOver ? 'drop-zone active' : ''}
        draggable
      `}
        >
            <div className="container-header">
                <span>📁 Контейнер</span>
                <div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddChild(block.id, 'text');
                        }}
                        className="container-btn"
                    >
                        + Текст
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddChild(block.id, 'container');
                        }}
                        className="container-btn blue"
                    >
                        + Контейнер
                    </button>
                </div>
            </div>

            <div
                className="container-children"
                onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDragOver(e, block.id);
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDrop(e, block.id, block.children.length);
                }}
            >
                <div
                    className={`
            drop-zone 
            ${isDragOver ? 'before' : ''}
          `}
                    style={{ height: isDragOver ? '4px' : '2px' }}
                />

                {block.children.length > 0 ? (
                    block.children.map((child, i) => (
                        <div key={child.id}>
                            <div
                                className={`
                  drop-zone 
                  ${isDragOver ? 'after' : ''}
                `}
                                style={{ height: isDragOver ? '4px' : '2px' }}
                                onDragOver={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDragOver(e, block.id);
                                }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    onDrop(e, block.id, i);
                                }}
                            />
                            {renderChildBlock(child, i)}
                        </div>
                    ))
                ) : (
                    <div
                        className="container-placeholder"
                        onDragOver={(e) => onDragOver(e, block.id)}
                        onDrop={(e) => onDrop(e, block.id, 0)}
                    >
                        Перетащите блоки сюда или добавьте новые
                    </div>
                )}

                <div
                    className={`
            drop-zone 
            ${isDragOver ? 'after' : ''}
          `}
                    style={{ height: isDragOver ? '4px' : '2px' }}
                />
            </div>
        </div>
    );
}